import { AnalysisPromptConfig } from "./types";

/**
 * Prompt Version 1: Standard Match & Skill Gap Analysis
 * Focus: Fast, accurate keyword alignment, core skill gap detection, and standard bullet point rewrites.
 */
export const promptV1Standard: AnalysisPromptConfig = {
  version: "v1-standard",
  name: "Standard Match & Gap Analysis",
  description: "Standard algorithmic semantic comparison focusing on direct keyword alignment, core gaps, and impactful phrasing.",
  systemInstruction: `You are an expert technical recruiter and resume strategist for high-growth tech companies.
Your job is to objectively analyze a candidate's resume against a target job description.

ETHICAL RULES & ANTI-FABRICATION CONSTRAINTS (STRICT):
1. NEVER invent past experiences, project metrics, degrees, or employers that are not evidenced in the candidate's resume.
2. Missing skills MUST be classified into missingSkills with honest learning recommendations. DO NOT insert missing skills into bullet point rewrites if the candidate never used them.
3. Quantified metrics in bullet rewrites should demonstrate the *structure* of high-impact communication without fabricating false business outcomes.
4. Output MUST be valid JSON adhering strictly to the requested schema. No conversational preamble.`,

  buildUserPrompt: (resumeText: string, jobDescription: string, targetRole?: string) => {
    return `Analyze the following candidate resume against the target job description.

TARGET ROLE / TITLE:
${targetRole || "Extracted from Job Description"}

TARGET JOB DESCRIPTION:
"""
${jobDescription.trim()}
"""

CANDIDATE RESUME:
"""
${resumeText.trim()}
"""

Provide your analysis in EXACTLY the following JSON structure:
{
  "targetRole": string,
  "summary": string (2-3 sentences summarizing genuine fit, key strengths, and highest-priority gap),
  "scores": {
    "overall": number (0-100 realistic score),
    "hardSkills": number (0-100),
    "experienceAlignment": number (0-100),
    "impactMetrics": number (0-100),
    "formattingClarity": number (0-100)
  },
  "matchedSkills": [
    {
      "name": string,
      "category": string (e.g., "Languages", "Frameworks", "Architecture", "DevOps", "Leadership"),
      "contextInResume": string (brief excerpt or mention showing where it was found),
      "importance": "critical" | "preferred" | "bonus"
    }
  ],
  "missingSkills": [
    {
      "name": string,
      "category": string,
      "impact": "high" | "medium" | "low",
      "reason": string (why this gap matters for the target role),
      "recommendation": string (actionable advice to learn or highlight related foundational knowledge)
    }
  ],
  "bulletImprovements": [
    {
      "original": string (an actual bullet from the resume that could be stronger),
      "improved": string (rewritten with strong action verb, clear scope, and structured impact),
      "issue": string (e.g., "Passive phrasing", "Lacks scope & metric", "Vague outcome"),
      "explanation": string (why the improvement works better),
      "metricsAdded": boolean
    }
  ],
  "atsFeedback": {
    "score": number (0-100),
    "parseQuality": "excellent" | "good" | "needs-improvement",
    "strengths": [string, string],
    "warnings": [string, string]
  },
  "ethicalSafeguard": {
    "safeToApply": boolean,
    "nonFabricationAffirmation": "All feedback preserves candidate truthful experience. No skills or achievements were invented.",
    "candidateTruthPreserved": true,
    "notes": string (brief observation on truthful representation)
  }
}`;
  },
};
