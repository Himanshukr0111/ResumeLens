import { NextRequest, NextResponse } from "next/server";
import { extractTextFromBuffer } from "@/lib/parser";
import { analyzeWithGemini } from "@/lib/gemini";
import { AnalysisResult } from "@/lib/types/analysis";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Allow sufficient time for AI generation

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
            { status: 400 }
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
            { status: 422 }
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
        { status: 400 }
      );
    }

    if (!jobDescription || jobDescription.length < 30) {
      return NextResponse.json(
        {
          error: "JOB_DESCRIPTION_REQUIRED",
          message:
            "Please provide the target job description or requirements (minimum 30 characters).",
        },
        { status: 400 }
      );
    }

    // Strict Gemini API Key requirement check
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY_MISSING",
          message:
            "GEMINI_API_KEY is not configured in the server environment. Please add your GEMINI_API_KEY to .env.local to perform real Gemini AI resume analysis.",
          instructions:
            "Add `GEMINI_API_KEY=your_key_here` to .env.local in the project root, then restart the application.",
        },
        { status: 503 }
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

    return NextResponse.json({
      success: true,
      data: analysis,
      metadata: {
        filename,
        resumeWordCount: resumeText.split(/\s+/).length,
        promptVersion,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[POST /api/analyze Error]:", err);
    return NextResponse.json(
      {
        error: "ANALYSIS_FAILED",
        message: err.message || "An unexpected error occurred during resume analysis.",
      },
      { status: 500 }
    );
  }
}
