import type { Article } from "@/lib/types";

import { article as mcpServersThatFailInProduction } from "./mcp-servers-that-fail-in-production";
import { article as buildingAiAgentsWithGoogleGemini } from "./building-ai-agents-with-google-gemini";
import { article as evaluatingAiAgents } from "./evaluating-ai-agents";
import { article as commonAiAgentDevelopmentMistakes } from "./common-ai-agent-development-mistakes";
import { article as gohighlevelApiPaginationTraps } from "./gohighlevel-api-pagination-traps";
import { article as gohighlevelWorkflowAutomationExplained } from "./gohighlevel-workflow-automation-explained";
import { article as serverSideConversionTracking } from "./server-side-conversion-tracking";
import { article as buildingMcpServersForAiAgents } from "./building-mcp-servers-for-ai-agents";
import { article as buildingSecureAiApplications } from "./building-secure-ai-applications";
import { article as automatingGoogleWorkspaceWithAi } from "./automating-google-workspace-with-ai";
import { article as geminiApiAutomationGuide } from "./gemini-api-automation-guide";
import { article as aiAutomationBusinessOperations } from "./ai-automation-business-operations";
import { article as reliableAiAgentWorkflows } from "./reliable-ai-agent-workflows";
import { article as gohighlevelApiIntegration } from "./gohighlevel-api-integration";

export const ARTICLES: Article[] = [
  mcpServersThatFailInProduction,
  geminiApiAutomationGuide,
  buildingAiAgentsWithGoogleGemini,
  evaluatingAiAgents,
  reliableAiAgentWorkflows,
  commonAiAgentDevelopmentMistakes,
  gohighlevelWorkflowAutomationExplained,
  gohighlevelApiIntegration,
  gohighlevelApiPaginationTraps,
  aiAutomationBusinessOperations,
  serverSideConversionTracking,
  buildingMcpServersForAiAgents,
  automatingGoogleWorkspaceWithAi,
  buildingSecureAiApplications,
].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getLatestArticles(count: number): Article[] {
  return ARTICLES.slice(0, count);
}
