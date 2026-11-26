import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "llm-development",
  name: "LLM Application Development",
  shortName: "LLM Development",
  group: "AI & Agent Development",
  icon: "layers",
  order: 4,
  seoTitle: "LLM Application Development Services — Muhammad Hamid",
  metaDescription:
    "LLM application development beyond chatbots: provider-neutral pipelines, schema-validated output, eval harnesses and approval gates. Message Muhammad Hamid.",
  eyebrow: "LLM Application Engineering",
  h1: "LLM applications where the model is a swappable component",
  intro:
    "Most LLM projects are a model wrapped in a demo. A production LLM application is the reverse: deterministic pipelines where the model is one component behind an interface, every output is validated against a schema, behaviour is measured by an eval harness, and a human approves anything that writes to the real world. Which provider you use — Gemini, an OpenAI-compatible endpoint, or something local — becomes configuration, not architecture.",
  benefits: [
    {
      title: "Provider-neutral from the first commit",
      body: "The model sits behind a thin interface with typed contracts on both sides. Switching provider or tier is a configuration change, and the eval suite proves the replacement behaves before it ships.",
    },
    {
      title: "Structured output, validated at the boundary",
      body: "Every model response is checked against a schema before it touches your data. Malformed output follows a repair path or fails as a typed error — the pipeline neither crashes on it nor propagates it.",
    },
    {
      title: "Eval harnesses built with the feature",
      body: "Labelled tasks, deterministic scoring, and CI gating from the start — not bolted on after the first incident. When a prompt or model change regresses behaviour, the suite says so at review time.",
    },
    {
      title: "Retrieval treated as measured engineering",
      body: "Where grounding matters, chunking and retrieval are chosen against your documents and scored, not adopted because a vector database was purchased.",
    },
    {
      title: "Humans in the loop where the risk lives",
      body: "Model output drafts, people decide. Writes to business systems sit behind approval gates, and every decision leaves an audit trail.",
    },
  ],
  useCases: [
    {
      title: "Document processing pipelines",
      body: "Extraction and classification into typed records, with validation catching misreads and a repair queue for the exceptions.",
    },
    {
      title: "Enrichment over business data",
      body: "CRM records, product catalogues and lead data enriched and normalised before write-back — dry-run previews first, writes gated.",
    },
    {
      title: "Internal tools with a model step",
      body: "Search, summarisation and verification over internal knowledge, with outputs cited back to source documents.",
    },
    {
      title: "Quality control with a model as judge",
      body: "Content and data quality checks where the model scores against a rubric and deterministic assertions do the gating.",
    },
    {
      title: "Workflows with approval steps",
      body: "The repetitive middle automated, exceptions queued for a person, and an audit trail connecting every automated action to its approval.",
    },
  ],
  process: [
    {
      title: "Define the job, not the model",
      body: "Inputs, volumes, latency needs, and what counts as correct — written down before any provider is chosen. The cheapest model that passes the eval suite wins.",
    },
    {
      title: "Put the model behind an interface",
      body: "A thin provider abstraction with typed request and response contracts. Model tiering and switching stay configuration changes forever after.",
    },
    {
      title: "Validate at every boundary",
      body: "Schemas on every model output, typed errors, repair paths. The model is the least reliable component in the system and is treated that way.",
    },
    {
      title: "Build the eval harness",
      body: "Fixtures from real cases — including the failures — with deterministic scoring, running in CI as a regression gate.",
    },
    {
      title: "Add retrieval and approvals where they belong",
      body: "Retrieval measured against your corpus; approval gates on writes. Neither is added by default. Both are added deliberately.",
    },
    {
      title: "Hand over operable code",
      body: "Repository, runbook, structured logs, and a per-run report of cost and latency. Your team can run the system without me.",
    },
  ],
  integrations: [
    "Gemini API",
    "OpenAI-compatible APIs",
    "Vertex AI",
    "Ollama (local models)",
    "PostgreSQL",
    "Google Sheets",
    "Google Workspace",
    "Webhook consumers",
  ],
  technologies: [
    "Python 3.12",
    "Pydantic v2",
    "Gemini & OpenAI-compatible SDKs",
    "pytest",
    "FastAPI",
    "Model Context Protocol",
    "GitHub Actions",
    "Docker",
  ],
  faqs: [
    {
      question: "Which model should we build on?",
      answer:
        "Start from the task, not the model. Define what correct looks like, then let the eval suite decide: the cheapest tier that passes is the right one. Because the model sits behind an interface, that answer can change later without a rewrite.",
    },
    {
      question: "How is this different from a chatbot project?",
      answer:
        "A chatbot is an interface. LLM application development is pipeline engineering: schema-validated outputs, retries, budgets, evals, and approval gates. Chat can be one front end on top of that; the value is in the pipeline underneath.",
    },
    {
      question: "How do you handle hallucination?",
      answer:
        "By refusing to trust raw output. Responses are schema-constrained and validated, high-stakes fields are cross-checked against source data, and retrieval grounds generation where the task needs it. The residual error rate is then a measured number in the eval report, not a surprise.",
    },
    {
      question: "Can we switch providers later without a rewrite?",
      answer:
        "Yes, if the abstraction is built in from the start. The model is behind an interface with typed contracts, so a switch is a configuration change plus an eval run to prove parity. My gemini-agent-reliability-kit uses exactly this pattern to compare behaviour across providers.",
    },
    {
      question: "What does an eval harness actually give us?",
      answer:
        "A regression signal. Labelled tasks with deterministic scoring run in CI, so prompt, model or pipeline changes are judged by behaviour, not impressions. Failures become new cases, and the suite only grows more representative over time.",
    },
    {
      question: "Do we need fine-tuning?",
      answer:
        "Usually not. Schema-constrained output, careful prompts and a retrieval layer solve most tasks that people assume need fine-tuning. If the eval suite shows a persistent gap that those levers cannot close, that is the honest moment to consider it.",
    },
  ],
  relatedProjects: ["gemini-agent-reliability-kit", "gemini-agent-automation-toolkit", "ai-agent-testing-lab"],
  relatedArticles: ["evaluating-ai-agents", "common-ai-agent-development-mistakes", "reliable-ai-agent-workflows"],
  ctaHeading: "Start with the job, not the model",
  ctaBody:
    "Describe the work the application has to do — inputs, volumes, and what counts as correct. I will map the pipeline, the validation layer and the eval plan, and tell you honestly which model tier the job needs.",
};
