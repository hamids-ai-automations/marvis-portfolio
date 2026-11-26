/**
 * Site-wide configuration and verified facts.
 *
 * Rules (from AGENTS.md, still in force):
 * - WhatsApp +923167417135 is the only contact channel.
 * - Never invent claims. Numbers must be verifiable.
 */

export const SITE = {
  name: "Muhammad Hamid",
  shortName: "Marvis",
  role: "AI Automation Engineer",
  positioning:
    "AI Automation Engineer · Gemini Developer · AI Agent Builder · GoHighLevel Automation Developer",
  tagline: "I build the automation layer between AI models and real business systems.",
  url: "https://marvis.web.app",
  description:
    "Muhammad Hamid is an AI Automation Engineer in Lahore, Pakistan, building MCP servers, evaluated AI agents, Gemini applications and GoHighLevel automations that run against production business systems.",
  locale: "en",
  language: "en",
  whatsapp: {
    number: "923167417135",
    display: "+92 316 7417135",
    href: "https://wa.me/923167417135",
  },
  github: {
    user: "hamids-ai-automations",
    url: "https://github.com/hamids-ai-automations",
    publicRepos: 98,
  },
  location: "Lahore, Pakistan (UTC+5)",
  replyNote: "Typically replies within one working day, Pakistan time (UTC+5).",
  ogImage: "/og.png",
} as const;

export const NAV = {
  services: [
    { label: "Services", href: "/services/" },
    { label: "Projects", href: "/projects/" },
    { label: "Articles", href: "/articles/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],
} as const;

/** Build a WhatsApp deep link with optional prefilled text. */
export function whatsappLink(text?: string): string {
  if (!text) return SITE.whatsapp.href;
  return `${SITE.whatsapp.href}?text=${encodeURIComponent(text)}`;
}
