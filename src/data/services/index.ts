import type { Service, ServiceGroup } from "@/lib/types";

import { service as aiAutomation } from "./ai-automation";
import { service as aiAgentDevelopment } from "./ai-agent-development";
import { service as mcpDevelopment } from "./mcp-development";
import { service as geminiDevelopment } from "./gemini-development";
import { service as llmDevelopment } from "./llm-development";
import { service as aiIntegration } from "./ai-integration";
import { service as gohighlevelAutomation } from "./gohighlevel-automation";
import { service as marketingTechnology } from "./marketing-technology";
import { service as pythonAutomation } from "./python-automation";
import { service as aiSecurity } from "./ai-security";

export const SERVICES: Service[] = [
  aiAutomation,
  aiAgentDevelopment,
  geminiDevelopment,
  llmDevelopment,
  aiIntegration,
  mcpDevelopment,
  gohighlevelAutomation,
  marketingTechnology,
  pythonAutomation,
  aiSecurity,
].sort((a, b) => a.order - b.order);

export const SERVICE_GROUPS: ServiceGroup[] = [
  "AI & Agent Development",
  "Marketing & CRM Automation",
  "Security & Reliability",
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesInGroup(group: ServiceGroup): Service[] {
  return SERVICES.filter((s) => s.group === group);
}
