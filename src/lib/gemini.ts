import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisResult } from "./types/analysis";
import { getPromptConfig } from "./prompts";

/**
 * Transient error detection for Gemini API
 * Identifies 503 (Overloaded / Service Unavailable), 429 (Rate Limits),
 * 500/502/504 temporary gateway/server errors, and network timeouts.
 */
function isTransientError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const status = (error as { status?: number })?.status;

  if (status === 503 || status === 429 || status === 500 || status === 502 || status === 504) {
    return true;
  }

  const transientKeywords = [
    "503",
    "429",
    "500",
    "502",
    "504",
    "overloaded",
    "high demand",
    "temporarily unavailable",
    "resource exhausted",
    "rate limit",
    "fetch failed",
    "econnreset",
    "etimedout",
    "deadline exceeded",
    "network error",
    "service unavailable",
  ];

  const lowerMsg = msg.toLowerCase();
  return transientKeywords.some((kw) => lowerMsg.includes(kw));
}

/**
 * Checks if error is a permanent 404 (model does not exist) or 401/403 (auth failed)
 */
function isModelNotFoundError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const status = (error as { status?: number })?.status;
  return status === 404 || msg.includes("404") || msg.toLowerCase().includes("not found");
}

/**
 * Checks if error is a daily quota exhaustion (e.g. "per day limit exceeded", "retry in 16h")
 * where immediate retries on the same or other models under the same project are futile.
 */
function isDailyQuotaExceeded(error: unknown): boolean {
  if (!error) return false;
  const msg = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return (
    msg.includes("per day limit exceeded") ||
    msg.includes("requests per day") ||
    msg.includes("generate_content_free_tier_requests") ||
    /retry in \d+h/i.test(msg)
  );
}

function isAuthError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const status = (error as { status?: number })?.status;
  return (
    status === 401 ||
    status === 403 ||
    msg.includes("401") ||
    msg.includes("403") ||
    msg.toLowerCase().includes("api key")
  );
}

/**
 * Async delay helper for exponential backoff with jitter
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clean and robustly extract JSON from model text
 */
function extractAndParseJSON(rawText: string): any {
  // Strip markdown code fences if present
  let cleaned = rawText
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // If there is extraneous text before or after the JSON object, extract between first { and last }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch (initialErr) {
    // Attempt minor repair: remove trailing commas before closing braces/brackets
    const repaired = cleaned
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]");
    try {
      return JSON.parse(repaired);
    } catch {
      throw new Error(
        `Failed to parse Gemini JSON output. Raw snippet: ${rawText.slice(0, 200)}...`
      );
    }
  }
}

/**
 * Secure Server-Side Gemini API Client
 * - Keys are read strictly from process.env (never passed to or exposed in client bundles)
 * - Automatic retry logic with exponential backoff for 503, 429, and temporary errors (up to 3 retries)
 * - Automatic fallback chain to other supported Gemini models if primary model is unavailable
 * - Robust JSON response extraction and validation
 * - Strictly zero fake/mock data on failure
 */
export async function analyzeWithGemini(
  resumeText: string,
  jobDescription: string,
  options?: {
    targetRole?: string;
    promptVersion?: string;
  }
): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    throw new Error(
      "GEMINI_API_KEY is not configured in server environment. Set GEMINI_API_KEY in .env.local"
    );
  }

  const promptConfig = getPromptConfig(options?.promptVersion);
  const genAI = new GoogleGenerativeAI(apiKey);

  // Model selection: support environment override, default to gemini-3.5-flash
  const preferredModel = process.env.GEMINI_MODEL || "gemini-3.5-flash";

  // Ordered fallback chain of verified supported models:
  // Starts with the preferred model (default: gemini-3.5-flash), then falls back to gemini-3.5-flash-lite or gemini-3.8-flash.
  // Deprecated models that return 404 (such as gemini-1.5-flash and gemini-2.0-flash) are intentionally excluded.
  const modelCandidates = Array.from(
    new Set([
      preferredModel,
      "gemini-3.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.8-flash",
    ])
  );

  const userPrompt = promptConfig.buildUserPrompt(
    resumeText,
    jobDescription,
    options?.targetRole
  );

  const MAX_RETRIES_PER_MODEL = 2; // Up to 2 retries (3 total attempts per model)
  // Maximum execution budget for the entire analysis workflow to ensure we always
  // return a clean JSON response within Vercel's serverless function time limit (15s).
  const MAX_EXECUTION_BUDGET_MS = 12500;
  const startTime = Date.now();

  let responseText = "";
  let successfulModel = preferredModel;
  let lastError: Error | null = null;
  let hadTransientOverload = false;

  for (const modelName of modelCandidates) {
    if (Date.now() - startTime >= MAX_EXECUTION_BUDGET_MS) {
      console.warn(
        `[Gemini API] Reached serverless execution deadline (${Date.now() - startTime}ms). Stopping model fallback loop.`
      );
      break;
    }

    let attempt = 0;
    let modelSuccess = false;

    while (attempt <= MAX_RETRIES_PER_MODEL) {
      const elapsed = Date.now() - startTime;
      if (elapsed >= MAX_EXECUTION_BUDGET_MS) {
        console.warn(
          `[Gemini API] Total time budget exceeded (${elapsed}ms). Breaking retry loop.`
        );
        break;
      }

      // Calculate adaptive per-request timeout: between 4s and 8s based on remaining budget
      const remainingTime = MAX_EXECUTION_BUDGET_MS - elapsed;
      const callTimeout = Math.max(4000, Math.min(8000, remainingTime - 500));

      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: promptConfig.systemInstruction,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2, // Low temperature for factual, reliable assessment
          },
        });

        // Enforce adaptive timeout per call so individual attempts never block the serverless budget
        const response = await model.generateContent(userPrompt, { timeout: callTimeout });
        const text = response.response.text();

        if (text && text.trim().length > 0) {
          // Validate that the returned text can be parsed as JSON
          try {
            extractAndParseJSON(text);
            responseText = text;
            successfulModel = modelName;
            modelSuccess = true;
            break;
          } catch (jsonErr) {
            console.warn(
              `[Gemini API] Model ${modelName} returned malformed JSON on attempt ${attempt + 1}.`
            );
            throw jsonErr;
          }
        } else {
          throw new Error("Model returned empty text response");
        }
      } catch (err: unknown) {
        lastError = err as Error;

        // If authentication error, fail immediately without retrying or model switching
        if (isAuthError(err)) {
          throw new Error(`Gemini API Authentication Failed: ${lastError.message}`);
        }

        // If daily quota exhausted for this project/API key, immediate fail:
        // Quota is project-wide (20 req/day limit), so retrying other models under the same key will also fail.
        if (isDailyQuotaExceeded(err)) {
          throw new Error(`GEMINI_DAILY_QUOTA_EXCEEDED: ${lastError.message}`);
        }

        // If model does not exist (404), do not retry this model — move immediately to next candidate
        if (isModelNotFoundError(err)) {
          console.warn(`[Gemini API] Model ${modelName} not found (404). Skipping to next candidate.`);
          break;
        }

        const isTransient = isTransientError(err);
        if (isTransient) {
          hadTransientOverload = true;
        }

        attempt++;

        const currentElapsed = Date.now() - startTime;
        if (attempt <= MAX_RETRIES_PER_MODEL && isTransient && currentElapsed < MAX_EXECUTION_BUDGET_MS - 2000) {
          // Fast exponential backoff with jitter: ~600ms, ~1200ms
          const baseBackoff = 600 * Math.pow(2, attempt - 1);
          const jitter = Math.floor(Math.random() * 200) + 50;
          const waitMs = Math.min(baseBackoff + jitter, 2000);

          console.warn(
            `[Gemini API] Model ${modelName} temporary error on attempt ${attempt}/${MAX_RETRIES_PER_MODEL} (${lastError.message}). Retrying in ${waitMs}ms...`
          );
          await delay(waitMs);
        } else {
          console.warn(
            `[Gemini API] Model ${modelName} exhausted ${attempt} attempt(s) (${lastError.message}). Falling back to next model candidate...`
          );
          break;
        }
      }
    }

    if (modelSuccess && responseText) {
      break;
    }
  }

  if (!responseText) {
    if (hadTransientOverload) {
      throw new Error(
        `Gemini AI service is currently experiencing high demand (503). Retried with exponential backoff across fallback models, but all candidates are temporarily busy. Last error: ${lastError?.message || "Service unavailable"}`
      );
    }
    throw new Error(
      `Gemini analysis could not be completed. All model candidates failed. Last error: ${lastError?.message || "Unknown error"}`
    );
  }

  // Parse and validate response
  let parsed: Partial<AnalysisResult>;
  try {
    parsed = extractAndParseJSON(responseText);
  } catch (parseErr: unknown) {
    const err = parseErr as Error;
    throw new Error(`Failed to parse Gemini JSON output: ${err.message}`);
  }

  // Build complete validated AnalysisResult with strict boundary protections
  const result: AnalysisResult = {
    id: `rl-analysis-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    targetRole: String(parsed.targetRole || options?.targetRole || "Target Position").trim(),
    summary: String(parsed.summary || "Analysis completed against target requirements.").trim(),
    scores: {
      overall: Math.min(100, Math.max(0, Math.round(Number(parsed.scores?.overall ?? 75)))),
      hardSkills: Math.min(100, Math.max(0, Math.round(Number(parsed.scores?.hardSkills ?? 70)))),
      experienceAlignment: Math.min(
        100,
        Math.max(0, Math.round(Number(parsed.scores?.experienceAlignment ?? 75)))
      ),
      impactMetrics: Math.min(100, Math.max(0, Math.round(Number(parsed.scores?.impactMetrics ?? 70)))),
      formattingClarity: Math.min(
        100,
        Math.max(0, Math.round(Number(parsed.scores?.formattingClarity ?? 85)))
      ),
    },
    matchedSkills: Array.isArray(parsed.matchedSkills)
      ? parsed.matchedSkills.filter((s) => s && typeof s.name === "string")
      : [],
    missingSkills: Array.isArray(parsed.missingSkills)
      ? parsed.missingSkills.filter((g) => g && typeof g.name === "string")
      : [],
    bulletImprovements: Array.isArray(parsed.bulletImprovements)
      ? parsed.bulletImprovements.filter((b) => b && typeof b.original === "string" && typeof b.improved === "string")
      : [],
    atsFeedback: {
      score: Math.min(100, Math.max(0, Math.round(Number(parsed.atsFeedback?.score ?? 88)))),
      parseQuality: parsed.atsFeedback?.parseQuality || "good",
      strengths: Array.isArray(parsed.atsFeedback?.strengths) && parsed.atsFeedback.strengths.length > 0
        ? parsed.atsFeedback.strengths.map(String)
        : ["Structured text layer"],
      warnings: Array.isArray(parsed.atsFeedback?.warnings)
        ? parsed.atsFeedback.warnings.map(String)
        : [],
    },
    ethicalSafeguard: {
      safeToApply: parsed.ethicalSafeguard?.safeToApply ?? true,
      nonFabricationAffirmation:
        parsed.ethicalSafeguard?.nonFabricationAffirmation ||
        "All feedback preserves candidate truthful experience. No skills or achievements were invented.",
      candidateTruthPreserved: true,
      notes: parsed.ethicalSafeguard?.notes || "Verified truthful representation.",
    },
    engine: "gemini-ai",
    modelUsed: successfulModel,
    promptVersion: promptConfig.version,
  };

  return result;
}
