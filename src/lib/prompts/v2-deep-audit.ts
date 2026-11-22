import { AnalysisPromptConfig } from "./types";

/**
 * Prompt Version 2: Deep Architectural Career Audit
 * Focus: High-rigor evaluation with explainable mathematical weighting:
 * - 60% Hard Technical Requirements
 * - 25% Architectural Seniority & Scope Signals
 * - 15% ATS Parsing & Formatting Structure
 * Strict anti-hallucination boundary checks.
 */
export const promptV2DeepAudit: AnalysisPromptConfig = {
  version: "v2-deep-audit",
  name: "Deep Architectural Career Audit",
  description: "Rigorously audited diagnostic assessing architectural scope, seniority signals, and strict requirement weighting.",
  systemInstruction: `You are a Principal Engineering Director and Senior Technical Hiring Bar Raiser.
You perform forensic resume evaluations with mathematical scoring transparency.

METHODOLOGY & WEIGHTINGS:
- Hard Requirements Alignment: 60% of overall score. Directly evaluate must-have vs nice-to-have tools.
- Seniority & Scope Signals: 25% of overall score. Look for ownership, mentorship, scale (QPS, DAU, team size, multi-quarter initiatives).
- ATS Structural Integrity: 15% of overall score. Standard headings, bullet readability, chronological clarity.

TRUTHFULNESS & ANTI-FABRICATION PROTOCOL:
- Under no circumstances shall you hallucinate skills or claim the candidate worked with technologies not supported by evidence.
- If a skill is missing from the resume, acknowledge it transparently in missingSkills.
- For bullet improvements, take real candidate statements and restructure them using the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".
- Maintain absolute professional objectivity. Output strictly valid JSON.`,

  buildUserPrompt: (resumeText: string, jobDescription: string, targetRole?: string) => {
    return `Perform a Deep Architectural Career Audit on the provided resume and target job description.

TARGET ROLE CONTEXT:
${targetRole ? `Role: ${targetRole}` : "Infer target seniority and domain from Job Description"}

JOB SPECIFICATION:
"""
${jobDescription.trim()}
"""

RESUME TEXT CONTENT:
"""
${resumeText.trim()}
"""

Return your diagnostic as a single strictly valid JSON object matching this schema:
{
  "targetRole": string,
  "summary": string (editorial analysis of candidate's positioning relative to target bar),
  "scores": {
    "overall": number (weighted: 0.60*hardSkills + 0.25*experienceAlignment + 0.15*formattingClarity),
    "hardSkills": number (0-100),
    "experienceAlignment": number (0-100),
    "impactMetrics": number (0-100),
    "formattingClarity": number (0-100)
  },
  "matchedSkills": [
    {
      "name": string,
      "category": string,
      "contextInResume": string (exact context found in resume),
      "importance": "critical" | "preferred" | "bonus"
    }
  ],
  "missingSkills": [
    {
      "name": string,
      "category": string,
      "impact": "high" | "medium" | "low",
      "reason": string (architectural or business impact of this gap),
      "recommendation": string (honest bridge strategy without fabricating experience)
    }
  ],
  "bulletImprovements": [
    {
      "original": string (real bullet from candidate resume),
      "improved": string (restructured with Google X-Y-Z formula preserving truthful scope),
      "issue": string (e.g. "Missing quantifiable scale metric", "Lacks explicit ownership verb"),
      "explanation": string (why this conveys seniority more effectively),
      "metricsAdded": boolean
    }
  ],
  "atsFeedback": {
    "score": number (0-100),
    "parseQuality": "excellent" | "good" | "needs-improvement",
    "strengths": [string, string, string],
    "warnings": [string, string]
  },
  "ethicalSafeguard": {
    "safeToApply": boolean,
    "nonFabricationAffirmation": "Audit completed under zero-fabrication protocol. All competencies verified from source document.",
    "candidateTruthPreserved": true,
    "notes": string
  }
}`;
  },
};
