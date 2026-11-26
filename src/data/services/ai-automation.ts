import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "ai-automation",
  name: "AI Automation Development",
  shortName: "AI Automation",
  group: "AI & Agent Development",
  icon: "bot",
  order: 1,
  seoTitle: "AI Automation Development Services — Muhammad Hamid",
  metaDescription:
    "AI automation connecting LLMs to production business systems: typed pipelines, guardrails, evaluation suites and Python code. Hire Muhammad Hamid on WhatsApp.",
  eyebrow: "AI Automation Engineering",
  h1: "AI automation that runs against production, not demos",
  intro:
    "Most AI automation fails between the demo and the second week in production. I build the part that survives that gap: typed pipelines that pull from the tools you already use, a model step with validation and retries around it, guardrails before anything is written back, and an evaluation suite so changes can be trusted.",
  benefits: [
    {
      title: "Automation that reports failure loudly",
      body: "A pipeline that reports success on partial data is more dangerous than one that crashes. Every build ships with explicit failure states, typed errors and structured logs, so you find out when — and where — it broke.",
    },
    {
      title: "Model calls wrapped in contracts",
      body: "Structured output validated against a schema, retries with backoff, step and token budgets. The language model is a component behind an interface, not the architecture.",
    },
    {
      title: "Evaluation before trust",
      body: "Automations ship with a labelled task suite and deterministic scoring. If a change regresses behaviour, the suite catches it before your users do.",
    },
    {
      title: "You own the result",
      body: "The repository, the runbook, the credentials and a recorded walkthrough are handed over. The goal is a system your team can run without me on retainer.",
    },
  ],
  useCases: [
    {
      title: "Operational reporting",
      body: "Weekly reports assembled from CRMs, ad platforms and spreadsheets — normalised into one schema, checked, and delivered without anyone rebuilding it by hand.",
    },
    {
      title: "Lead intake and routing",
      body: "Forms, inbox and webhook signals deduplicated, enriched and routed to the right pipeline with human approval where the risk lives.",
    },
    {
      title: "Content and catalogue operations",
      body: "Bulk enrichment, tagging, SEO checks and quality gates over product catalogues and content libraries, with dry runs before any write.",
    },
    {
      title: "Back-office workflows",
      body: "The repetitive middle of a process — verification, cross-checks, follow-ups — automated so the people in the loop handle only exceptions.",
    },
  ],
  process: [
    {
      title: "Audit the process first",
      body: "Map the current workflow, measure where the time goes, and identify which parts are worth automating — including the parts that should be deleted instead.",
    },
    {
      title: "Build read-only",
      body: "First deployments run without write access. Dry runs by default, previews of every mutation, and writes added per workflow once the read path is proven.",
    },
    {
      title: "Add the evaluation loop",
      body: "Labelled fixtures from real failure cases, deterministic scoring in CI, and a report you can read without a data science background.",
    },
    {
      title: "Hand over something operable",
      body: "Repository, runbook, structured logs and a recorded walkthrough. Reversible increments, no black boxes.",
    },
  ],
  integrations: [
    "GoHighLevel",
    "Google Workspace",
    "GA4 & Google Ads",
    "Meta Conversions API",
    "Shopify",
    "ServiceNow",
    "Zapier-compatible webhooks",
  ],
  technologies: [
    "Python 3.12",
    "Pydantic v2",
    "Model Context Protocol",
    "Gemini & OpenAI-compatible APIs",
    "GitHub Actions",
    "Docker",
  ],
  faqs: [
    {
      question: "How long does a first automation take to ship?",
      answer:
        "A scoped, single-workflow automation typically reaches a read-only or dry-run deployment within one to two weeks, with the evaluation loop and write access following once the read path is proven. Larger multi-workflow systems are built as reversible increments rather than one big release.",
    },
    {
      question: "Do I need to change my existing tools?",
      answer:
        "No. The work starts from the tools you already operate — CRM, spreadsheets, inbox, ad platforms — and adds the automation layer on top. Replacement is only recommended when a system is the actual source of the failure.",
    },
    {
      question: "What happens when the model gets something wrong?",
      answer:
        "That is treated as a designed failure mode, not an exception. Schema validation rejects malformed output, retries handle transient errors, and high-risk actions sit behind human approval gates. Failed runs become new evaluation cases so the same failure does not recur.",
    },
    {
      question: "Who owns the code?",
      answer:
        "You do. Engagements deliver the repository, the runbook and the credentials. Everything is documented so your team can operate and extend the system without the original author.",
    },
    {
      question: "How do we start?",
      answer:
        "Send a WhatsApp message describing the process that hurts the most. You get an honest assessment of whether it is worth automating — including the parts that are cheaper to delete than to automate.",
    },
  ],
  relatedProjects: ["firebase-ai-starter-kit", "searchpulse-ai", "envscope"],
  relatedArticles: ["ai-automation-business-operations", "reliable-ai-agent-workflows"],
  ctaHeading: "Discuss your automation project",
  ctaBody:
    "Tell me which process eats the most hours. I will tell you what is worth automating, what is not, and what a first increment would look like — before anything is billed.",
};
