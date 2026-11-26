/**
 * Content model for the whole site.
 *
 * Every indexable page is a landing page: unique SEO title, unique meta
 * description, exactly one H1, WhatsApp CTA, FAQ where relevant.
 */

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceBenefit {
  title: string;
  body: string;
}

export interface ServiceUseCase {
  title: string;
  body: string;
}

export interface ServiceStep {
  title: string;
  body: string;
}

export type ServiceGroup =
  | "AI & Agent Development"
  | "Marketing & CRM Automation"
  | "Security & Reliability";

export interface Service {
  slug: string;
  /** Display name used in nav, cards and H1 context. */
  name: string;
  /** Short label for compact UI (nav dropdown). */
  shortName: string;
  group: ServiceGroup;
  /** Lucide icon name resolved by <ServiceIcon />. */
  icon: "bot" | "brain" | "sparkles" | "layers" | "plug" | "server" | "crm" | "chart" | "terminal" | "shield";
  order: number;
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  benefits: ServiceBenefit[];
  useCases: ServiceUseCase[];
  process: ServiceStep[];
  integrations: string[];
  technologies: string[];
  faqs: ServiceFaq[];
  /** Project slugs (repository names) shown as evidence on this page. */
  relatedProjects: string[];
  /** Article slugs shown as further reading. */
  relatedArticles: string[];
  ctaHeading: string;
  ctaBody: string;
}

export interface Project {
  slug: string;
  name: string;
  url: string;
  description: string;
  topics: string[];
  language: string;
  stars: number;
  updated: string;
  featured: boolean;
  service: string;
  /** Curated copy — every claim restates a verified repo fact. */
  tagline: string;
  summary: string;
  problem: string;
  approach: string[];
  capabilities: string[];
}

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingMinutes: number;
  tag: string;
  /** Markdown body. Internal links use root-relative URLs like /services/ai-automation/. */
  content: string;
  relatedArticles: string[];
  relatedServices: string[];
}

export interface LegalPage {
  slug: "privacy" | "terms";
  title: string;
  seoTitle: string;
  metaDescription: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

export interface BreadcrumbItem {
  name: string;
  href?: string;
}
