import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brain,
  ChartLine,
  CircleCheck,
  Server,
  ShieldCheck,
  Sparkles,
  Plug,
  Terminal,
  Workflow,
} from "lucide-react";

import type { Service } from "@/lib/types";

const ICONS: Record<Service["icon"], LucideIcon> = {
  bot: Bot,
  brain: Brain,
  sparkles: Sparkles,
  layers: Workflow,
  plug: Plug,
  server: Server,
  crm: CircleCheck,
  chart: ChartLine,
  terminal: Terminal,
  shield: ShieldCheck,
};

export function ServiceIcon({
  icon,
  className,
}: {
  icon: Service["icon"];
  className?: string;
}) {
  const Icon = ICONS[icon] ?? Bot;
  return <Icon className={className} aria-hidden="true" />;
}
