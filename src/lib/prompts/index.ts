import { AnalysisPromptConfig } from "./types";
import { promptV1Standard } from "./v1-standard";
import { promptV2DeepAudit } from "./v2-deep-audit";

export * from "./types";
export { promptV1Standard, promptV2DeepAudit };

export const PROMPT_REGISTRY: Record<string, AnalysisPromptConfig> = {
  "v1-standard": promptV1Standard,
  "v2-deep-audit": promptV2DeepAudit,
};

export const DEFAULT_PROMPT_VERSION = "v2-deep-audit";

export function getPromptConfig(version?: string): AnalysisPromptConfig {
  if (version && PROMPT_REGISTRY[version]) {
    return PROMPT_REGISTRY[version];
  }
  return PROMPT_REGISTRY[DEFAULT_PROMPT_VERSION];
}
