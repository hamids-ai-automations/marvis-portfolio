import type { Metadata } from "next";
import { SITE } from "@/lib/site";

interface PageMeta {
  title: string;
  description: string;
  path: string; // root-relative, e.g. "/services/ai-automation/"
  ogType?: "website" | "article";
  publishedTime?: string;
  robots?: { index?: boolean; follow?: boolean };
}

/**
 * Consistent per-page metadata: unique title + description, canonical URL,
 * Open Graph and Twitter card, correct language.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogType = "website",
  publishedTime,
  robots,
}: PageMeta): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${SITE.name} — ${SITE.role}`,
      locale: "en",
      type: ogType,
      ...(ogType === "article" && publishedTime
        ? { publishedTime: `${publishedTime}T00:00:00+05:00` }
        : {}),
      images: [
        {
          url: `${SITE.url}${SITE.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${SITE.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE.url}${SITE.ogImage}`],
    },
    ...(robots ? { robots } : {}),
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Muhammad Hamid — AI Automation Engineer | MCP, Agents, Gemini",
    template: "%s",
  },
  description: SITE.description,
  applicationName: "Marvis Portfolio",
  authors: [{ name: SITE.name, url: SITE.github.url }],
  creator: SITE.name,
  keywords: [
    "AI Automation Engineer",
    "AI Automation Developer",
    "Gemini AI Developer",
    "AI Agent Development",
    "GoHighLevel Developer",
    "GHL Automation",
    "MCP Server Developer",
    "AI Integration Developer",
    "LLM Application Development",
    "Muhammad Hamid",
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    siteName: `${SITE.name} — ${SITE.role}`,
    locale: "en",
    url: SITE.url,
    title: "Muhammad Hamid — AI Automation Engineer",
    description: SITE.description,
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hamid — AI Automation Engineer",
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};
