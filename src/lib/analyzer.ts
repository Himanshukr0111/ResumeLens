import { AnalysisInput, AnalysisResult } from "./types/analysis";
import { analyzeWithGemini } from "./gemini";
import { analyzeWithHeuristics } from "./heuristic-analyzer";

/**
 * Unified ResumeLens Core Analysis Facade
 * 
 * 1. Checks if GEMINI_API_KEY is configured.
 * 2. If present, runs the selected prompt version through Gemini.
 * 3. If missing, offline, or quota exceeded, falls back gracefully to the
 *    deterministic heuristic engine without failing or returning fake static mocks.
 */
export async function analyzeResume(input: AnalysisInput): Promise<AnalysisResult> {
  const { resumeText, jobDescription, targetRole, promptVersion } = input;

  if (!resumeText || resumeText.trim().length < 50) {
    throw new Error("Resume text is required and must contain at least 50 characters.");
  }

  if (!jobDescription || jobDescription.trim().length < 30) {
    throw new Error("Job description is required and must contain at least 30 characters.");
  }

  // Check if Gemini API is available
  if (process.env.GEMINI_API_KEY) {
    try {
      const geminiResult = await analyzeWithGemini(resumeText, jobDescription, {
        targetRole,
        promptVersion,
      });
      return geminiResult;
    } catch (geminiError: unknown) {
      const err = geminiError as Error;
      console.warn(
        `[ResumeLens Analyzer] Gemini execution encountered an issue (${err.message}). Falling back to deterministic engine.`
      );
    }
  } else {
    console.info(
      "[ResumeLens Analyzer] No GEMINI_API_KEY detected in environment. Using deterministic analysis engine."
    );
  }

  // Fallback to deterministic real analysis
  return analyzeWithHeuristics(resumeText, jobDescription, targetRole);
}
