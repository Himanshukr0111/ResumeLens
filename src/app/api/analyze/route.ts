import { NextRequest, NextResponse } from "next/server";
import { extractTextFromBuffer } from "@/lib/parser";
import { analyzeWithGemini } from "@/lib/gemini";
import { AnalysisResult } from "@/lib/types/analysis";

export const dynamic = "force-dynamic";
// 15 seconds is the maximum supported duration for Serverless Functions on Vercel Hobby plan
export const maxDuration = 15;

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

/**
 * POST /api/analyze
 * Accepts multipart/form-data (file upload) or application/json (pasted text)
 * Securely calls Gemini AI on the server using process.env.GEMINI_API_KEY
 */
export async function POST(req: NextRequest) {
  try {
    let resumeText = "";
    let jobDescription = "";
    let targetRole = "";
    let promptVersion = "v2-deep-audit";
    let filename = "pasted-resume.txt";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const textParam = formData.get("resumeText") as string | null;
      const jobParam = formData.get("jobDescription") as string | null;
      const roleParam = formData.get("targetRole") as string | null;
      const promptParam = formData.get("promptVersion") as string | null;

      if (jobParam) jobDescription = jobParam.trim();
      if (roleParam) targetRole = roleParam.trim();
      if (promptParam) promptVersion = promptParam.trim();

      if (file && file.size > 0) {
        // Enforce max 10MB file limit
        if (file.size > 10 * 1024 * 1024) {
          return NextResponse.json(
            { error: "FILE_TOO_LARGE", message: "File exceeds 10MB limit." },
            { status: 400, headers: JSON_HEADERS }
          );
        }

        filename = file.name;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        try {
          const parsed = await extractTextFromBuffer(buffer, file.name, file.type);
          resumeText = parsed.text;
        } catch (parseErr: unknown) {
          const err = parseErr as Error;
          return NextResponse.json(
            {
              error: "PARSING_FAILED",
              message: `Could not extract text from "${file.name}": ${err.message}`,
            },
            { status: 422, headers: JSON_HEADERS }
          );
        }
      } else if (textParam) {
        resumeText = textParam.trim();
      }
    } else {
      // JSON payload
      const body = await req.json();
      resumeText = (body.resumeText || "").trim();
      jobDescription = (body.jobDescription || "").trim();
      targetRole = (body.targetRole || "").trim();
      if (body.promptVersion) promptVersion = body.promptVersion.trim();
    }

    // Input Validations
    if (!resumeText || resumeText.length < 50) {
      return NextResponse.json(
        {
          error: "RESUME_REQUIRED",
          message:
            "Please upload a readable resume document (.pdf, .docx, .txt) or paste your resume text (minimum 50 characters).",
        },
        { status: 400, headers: JSON_HEADERS }
      );
    }

    if (!jobDescription || jobDescription.length < 30) {
      return NextResponse.json(
        {
          error: "JOB_DESCRIPTION_REQUIRED",
          message:
            "Please provide the target job description or requirements (minimum 30 characters).",
        },
        { status: 400, headers: JSON_HEADERS }
      );
    }

    // Strict Gemini API Key requirement check
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY_MISSING",
          message:
            "GEMINI_API_KEY is not configured in the server environment. If running locally, add it to .env.local. If deployed on Vercel, configure it in Vercel Project Settings > Environment Variables.",
          instructions:
            "In Vercel: Go to your Project Dashboard -> Settings -> Environment Variables. Add GEMINI_API_KEY with your Google AI Studio API key, ensure 'Production' is checked, then Redeploy.",
        },
        { status: 503, headers: JSON_HEADERS }
      );
    }

    // Run real Gemini AI analysis
    const analysis: AnalysisResult = await analyzeWithGemini(
      resumeText,
      jobDescription,
      {
        targetRole: targetRole || undefined,
        promptVersion,
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: analysis,
        metadata: {
          filename,
          resumeWordCount: resumeText.split(/\s+/).length,
          promptVersion,
        },
      },
      { status: 200, headers: JSON_HEADERS }
    );
  } catch (error: unknown) {
    const err = error as Error;
    const rawMessage = err.message || "";
    console.error("[POST /api/analyze Error]:", rawMessage);

    // Differentiate transient overload / rate limits / auth issues
    const isOverload =
      rawMessage.includes("503") ||
      rawMessage.toLowerCase().includes("overloaded") ||
      rawMessage.toLowerCase().includes("high demand") ||
      rawMessage.toLowerCase().includes("service unavailable") ||
      rawMessage.toLowerCase().includes("timed out") ||
      rawMessage.toLowerCase().includes("timeout");

    const isRateLimit =
      rawMessage.includes("429") ||
      rawMessage.toLowerCase().includes("rate limit") ||
      rawMessage.toLowerCase().includes("resource exhausted");

    const isAuth =
      rawMessage.toLowerCase().includes("authentication failed") ||
      rawMessage.includes("401") ||
      rawMessage.includes("403");

    if (isOverload) {
      return NextResponse.json(
        {
          error: "AI_SERVICE_OVERLOADED",
          message:
            "The Gemini AI service is currently experiencing high demand. Automatic retries and model fallbacks were attempted, but the service is temporarily busy. Your inputs are preserved — please wait a moment and try again.",
          isTransient: true,
        },
        { status: 503, headers: JSON_HEADERS }
      );
    }

    if (isRateLimit) {
      return NextResponse.json(
        {
          error: "RATE_LIMIT_EXCEEDED",
          message:
            "Gemini API request limit reached. Automatic retries were attempted. Please wait a moment before trying again.",
          isTransient: true,
        },
        { status: 429, headers: JSON_HEADERS }
      );
    }

    if (isAuth) {
      return NextResponse.json(
        {
          error: "GEMINI_AUTH_FAILED",
          message:
            "Gemini API authentication failed. Please check that your GEMINI_API_KEY in Vercel Environment Variables or .env.local is valid and active.",
          instructions:
            "Verify your API key at https://aistudio.google.com and ensure GEMINI_API_KEY is correctly set in your deployment environment.",
        },
        { status: 401, headers: JSON_HEADERS }
      );
    }

    return NextResponse.json(
      {
        error: "ANALYSIS_FAILED",
        message:
          "Unable to complete live resume analysis. Please verify your inputs and try again.",
        details: process.env.NODE_ENV === "development" ? rawMessage : undefined,
      },
      { status: 500, headers: JSON_HEADERS }
    );
  }
}
