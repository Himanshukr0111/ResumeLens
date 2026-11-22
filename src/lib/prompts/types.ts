export interface AnalysisPromptConfig {
  version: string;
  name: string;
  description: string;
  systemInstruction: string;
  buildUserPrompt: (resumeText: string, jobDescription: string, targetRole?: string) => string;
}
