import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "gemini-development",
  name: "Gemini AI Development",
  shortName: "Gemini Development",
  group: "AI & Agent Development",
  icon: "sparkles",
  order: 3,
  seoTitle: "Gemini AI Developer for Production Agents — Muhammad Hamid",
  metaDescription:
    "A Gemini AI developer who ships the boring parts: tool-calling contracts, structured output, long-context workflows and cost control. WhatsApp Muhammad Hamid.",
  eyebrow: "Gemini API Engineering",
  h1: "Gemini development that treats the API as a component, not the product",
  intro:
    "The Gemini API gives you long context, native tool calling and schema-constrained output. What it does not give you is argument validation, retry discipline, step budgets, or a way to know that a prompt change broke your agent. That is the part I build. My open-source Gemini tooling — a reliability kit for tool-calling agents, an automation toolkit, and a secure Firebase starter — exists because those gaps appear in every project.",
  benefits: [
    {
      title: "Tool calling that holds up",
      body: "Tools are declared once, typed, and validated against argument contracts before execution. When the model picks the wrong tool or invents an argument, the failure is scored — not silently passed downstream.",
    },
    {
      title: "Structured output you can rely on",
      body: "Gemini supports schema-constrained responses. I still validate at the boundary, because a schema hint is not a guarantee. Malformed output gets a repair path or a typed error, never a crash in the middle of a pipeline.",
    },
    {
      title: "Long context with cost discipline",
      body: "A large context window is not permission to paste everything. Contexts are assembled deliberately, chunking is chosen for the task, and every run reports token usage so the bill is a known quantity.",
    },
    {
      title: "Vertex AI or API key — decided on evidence",
      body: "The choice is driven by compliance, quotas and access control, not preference. Either way the model sits behind a thin interface, so the decision can be revisited without a rewrite.",
    },
    {
      title: "Reliability measured, not assumed",
      body: "Labelled task suites with expected tool sequences, deterministic scoring, and CI gating. My gemini-agent-reliability-kit applies this pattern offline: regressions block the change instead of reaching users.",
    },
  ],
  useCases: [
    {
      title: "Tool-calling agents over Google services",
      body: "An agent that reads mail, calendar and documents through typed tools — read-only by default, with approval gates before anything is written back.",
    },
    {
      title: "Long-context document workflows",
      body: "Contracts, reports and catalogues processed into normalised records, cross-checked against source data, with a chunking strategy chosen for cost as much as recall.",
    },
    {
      title: "Gemini features inside Firebase apps",
      body: "Model calls behind callable functions with App Check enforced, per-user rate limits, and a typed client so the front end cannot drift from the contract — the firebase-ai-starter-kit pattern.",
    },
    {
      title: "Batch enrichment and classification",
      body: "Large backlogs processed with model tiering: the cheap tier handles routine classification, larger models handle escalations, and a step budget bounds each run.",
    },
    {
      title: "Document and image extraction",
      body: "Scans, screenshots and mixed documents converted into structured records, with validation catching what the model misreads.",
    },
  ],
  process: [
    {
      title: "Choose the access path",
      body: "API key or Vertex AI, decided first on compliance, quotas and IAM needs. The SDK is wired behind a thin interface so the choice stays reversible.",
    },
    {
      title: "Define the contracts",
      body: "Tool definitions and output schemas written in code before any prompt is tuned. Validation sits at every boundary between the model and the rest of the system.",
    },
    {
      title: "Build the reliability harness",
      body: "A labelled task suite with expected tool sequences and deterministic scoring, running in CI so behaviour changes surface at review time.",
    },
    {
      title: "Control cost and latency",
      body: "Model tiering per task, deliberate context assembly, token budgets per step, and a per-run report of spend and latency.",
    },
    {
      title: "Ship behind guardrails",
      body: "Read-only first, writes behind approval gates, structured logs for every run, and a handover that leaves the system operable without me.",
    },
  ],
  integrations: [
    "Google Gemini API",
    "Vertex AI",
    "Google AI Studio",
    "Firebase (Auth, App Check, Functions)",
    "Google Workspace",
    "MCP clients",
    "GitHub Actions",
  ],
  technologies: [
    "Python 3.12",
    "google-genai SDK",
    "Pydantic v2",
    "Vertex AI",
    "Model Context Protocol",
    "Firebase App Check",
    "GitHub Actions",
    "Docker",
  ],
  faqs: [
    {
      question: "API key or Vertex AI — which should my project use?",
      answer:
        "An API key from Google AI Studio is the right start for prototypes and internal tools: fastest path, generous free tier. Vertex AI earns its complexity when you need enterprise quotas, IAM-based access, or data governance commitments. I make the call on your requirements, and keep it reversible either way.",
    },
    {
      question: "How do you keep Gemini calls from getting expensive?",
      answer:
        "Three levers: context is assembled deliberately instead of pasted wholesale, model tiering sends routine work to cheaper models, and step and token budgets bound each run while every run reports actual usage. Cost becomes a monitored number, not a month-end surprise.",
    },
    {
      question: "Does Gemini not already support structured output?",
      answer:
        "It does, and I use it. But a schema constraint on the request is a hint, not a contract. Output is still validated at the boundary, with a repair path for malformed responses. The difference shows up in the first week of production.",
    },
    {
      question: "Can Gemini handle our documents, or do we need a retrieval pipeline?",
      answer:
        "Often, yes — the long context window takes whole documents directly, which removes an entire retrieval layer for many document workflows. For large corpora or repeated queries, chunking and retrieval win on cost. I measure both against your actual documents rather than argue from principle.",
    },
    {
      question: "How do you test an agent that chooses its own tools?",
      answer:
        "With labelled task suites: each task defines the expected tool sequence and acceptable arguments, and scoring is deterministic. The suite runs in CI, so a prompt or model change that regresses tool choice blocks the merge. My gemini-agent-reliability-kit is this pattern, packaged.",
    },
    {
      question: "We already have a Gemini prototype. Can you productionise it?",
      answer:
        "That is the most common shape of the work. The prototype is kept as the behaviour reference; around it go contracts, validation, retries, budgets, evals and logging. You get back the same feature, operable.",
    },
  ],
  relatedProjects: ["gemini-agent-reliability-kit", "gemini-agent-automation-toolkit", "firebase-ai-starter-kit"],
  relatedArticles: ["building-ai-agents-with-google-gemini", "gemini-api-automation-guide", "common-ai-agent-development-mistakes"],
  ctaHeading: "Bring your Gemini project to production",
  ctaBody:
    "Message me with what you are building on Gemini — an agent, a document workflow or a product feature. I will tell you what the API gives you for free, what you must build yourself, and what a first increment looks like.",
};
