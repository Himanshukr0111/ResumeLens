export type DocumentFormat = "pdf" | "docx" | "txt";

export interface ParsedDocument {
  text: string;
  wordCount: number;
  format: DocumentFormat;
  filename: string;
  pageCount?: number;
}

export type SkillImportance = "critical" | "preferred" | "bonus";
export type SkillGapImpact = "high" | "medium" | "low";

export interface MatchedSkill {
  name: string;
  category: string;
  contextInResume: string;
  importance: SkillImportance;
}

export interface MissingSkill {
  name: string;
  category: string;
  impact: SkillGapImpact;
  reason: string;
  recommendation: string;
}

export interface BulletImprovement {
  original: string;
  improved: string;
  issue: string;
  explanation: string;
  metricsAdded: boolean;
}

export interface MatchScores {
  overall: number; // 0-100
  hardSkills: number; // 0-100
  experienceAlignment: number; // 0-100
  impactMetrics: number; // 0-100
  formattingClarity: number; // 0-100
}

export interface AtsFeedback {
  score: number; // 0-100
  parseQuality: "excellent" | "good" | "needs-improvement";
  strengths: string[];
  warnings: string[];
}

export interface EthicalSafeguard {
  safeToApply: boolean;
  nonFabricationAffirmation: string;
  candidateTruthPreserved: boolean;
  notes: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  targetRole: string;
  summary: string;
  scores: MatchScores;
  matchedSkills: MatchedSkill[];
  missingSkills: MissingSkill[];
  bulletImprovements: BulletImprovement[];
  atsFeedback: AtsFeedback;
  ethicalSafeguard: EthicalSafeguard;
  engine: "gemini-ai" | "deterministic-engine";
  modelUsed?: string;
  promptVersion: string;
}

export interface AnalysisInput {
  resumeText: string;
  jobDescription: string;
  targetRole?: string;
  promptVersion?: string;
}
