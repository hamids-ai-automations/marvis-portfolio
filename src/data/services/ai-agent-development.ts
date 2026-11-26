import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "ai-agent-development",
  name: "AI Agent Development",
  shortName: "AI Agents",
  group: "AI & Agent Development",
  icon: "bot",
  order: 2,
  seoTitle: "AI Agent Development & Evaluation — Muhammad Hamid",
  metaDescription:
    "Build AI agents with tool calling, structured output, budgets and a real evaluation suite: labelled tasks, deterministic scoring, CI gates before release.",
  eyebrow: "AI Agent Development & Evaluation",
  h1: "AI agents that are measured before they are trusted",
  intro:
    "An agent is a program that chooses its own control flow, which makes it the hardest kind of program to test. Most agent projects skip the hard part: they demo a chain, ship it, and meet the failure modes in production. I build agents the way you build software — a labelled task suite, deterministic scoring over tool choice, arguments and refusals, and no release that moves the score backwards. The measurement layer comes first; the agent is built on top of it.",
  benefits: [
    {
      title: "Behaviour that is measured, not felt",
      body: "Prompt and model changes move behaviour, so every deploy without a suite is a coin flip. Each agent ships with an offline harness that runs the same tasks and reports a diff, plus a per-release regression report covering accuracy, failure taxonomy and the specific cases that changed.",
    },
    {
      title: "Tool calls validated at the boundary",
      body: "A model that calls the correct tool with a malformed argument is worse than one that refuses. Argument schemas are validated before execution, and violations are scored in the suite — not logged and ignored.",
    },
    {
      title: "Cost and latency as design inputs",
      body: "Agents burn tokens through loops. Step limits, token budgets and timeout policies are part of the design, not a post-incident patch, and the evaluation report includes cost and latency per task.",
    },
    {
      title: "Provider-agnostic by construction",
      body: "The harness and tool layer stay stable while the model is a configuration value. Switching or upgrading models becomes a release validated by re-running the suite, not a rewrite.",
    },
    {
      title: "Agents that stop when they should",
      body: "Refusal behaviour and explicit stopping conditions are part of the contract, not a hope. What the agent may not do is written down and tested alongside what it must do.",
    },
  ],
  useCases: [
    {
      title: "Teams shipping a first production agent",
      body: "A prototype exists; the evaluation harness, tool contracts and regression suite do not. The gap between demo and dependable is exactly this work.",
    },
    {
      title: "Products adding agent features that must not embarrass",
      body: "Extraction, triage or drafting features where wrong output costs trust — gated by validation, budgets and human review where the risk lives.",
    },
    {
      title: "Platforms with agents already misbehaving",
      body: "Retry storms, silent partial failures, unbounded spend. An audit plus a harness that turns “it feels flaky” into a failing test with a name.",
    },
    {
      title: "Agents that must touch internal systems",
      body: "Typed tool definitions, argument validation and explicit stopping conditions over CRM, ticketing or workspace APIs — with approval gates wherever an action is irreversible.",
    },
    {
      title: "Model migrations you need to trust",
      body: "A model upgrade should be a configuration change plus a suite run. The evaluation layer answers whether the new model is safe to ship before your users answer it for you.",
    },
  ],
  process: [
    {
      title: "Define capability",
      body: "One narrow job with a clear success condition. Broad agents fail to evaluate.",
    },
    {
      title: "Collect cases",
      body: "Real inputs, including the awkward ones: missing fields, hostile input, ambiguous intent.",
    },
    {
      title: "Build the harness",
      body: "Offline runners, fixtures and deterministic scoring — before the prompt gets tuned.",
    },
    {
      title: "Implement",
      body: "Tools, prompting and guardrails, iterated against the suite rather than intuition.",
    },
    {
      title: "Gate releases",
      body: "CI fails on accuracy regressions and schema violations. The suite, not the demo, is what ships the change.",
    },
  ],
  integrations: [
    "Google Workspace",
    "GoHighLevel",
    "Shopify",
    "ServiceNow",
    "Model Context Protocol (MCP) tool servers",
    "Internal REST & GraphQL APIs",
    "Zapier-compatible webhooks",
  ],
  technologies: [
    "Python 3.12",
    "Pydantic v2",
    "Google Gemini API",
    "OpenAI-compatible endpoints",
    "Model Context Protocol",
    "JSON Schema",
    "pytest",
    "GitHub Actions",
  ],
  faqs: [
    {
      question: "Which models do you work with?",
      answer:
        "Provider-agnostic. The harness and tool layer stay stable while the model is a configuration value; most of my published work runs Gemini and OpenAI-compatible endpoints through a shared abstraction. The evaluation suite is what makes switching a decision instead of a gamble.",
    },
    {
      question: "Can you evaluate an agent we already built?",
      answer:
        "Yes, and that is often the fastest way to find out why it behaves inconsistently. I build the suite against your current implementation first, then report the failure taxonomy before proposing changes — in that order.",
    },
    {
      question: "Do we need a vector database?",
      answer:
        "Only if the task needs retrieval over a corpus that does not fit in context. Most business agents need reliable tool calls, not RAG, and I will say so when retrieval is not the bottleneck.",
    },
    {
      question: "How do you stop an agent looping or overspending?",
      answer:
        "Step limits, token budgets and timeout policies are designed in from the start. The suite scores runs against those budgets too, so a change that doubles cost fails CI instead of surprising you on the invoice.",
    },
    {
      question: "How is an agent different from a prompt chain?",
      answer:
        "A chain has fixed control flow; an agent chooses its own. That freedom is exactly what needs testing: tool selection, argument validity, refusal behaviour and stopping conditions all become assertions rather than hopes. If your problem is a chain, I will say so — it is the cheaper thing to build.",
    },
    {
      question: "What do we get at handover?",
      answer:
        "The repository, the labelled task suite, the scoring harness wired into CI, and a per-release regression report. Your team can re-run the evaluation and extend the suite without the original author.",
    },
  ],
  relatedProjects: ["gemini-agent-reliability-kit", "gemini-agent-automation-toolkit", "ai-agent-testing-lab"],
  relatedArticles: ["evaluating-ai-agents", "common-ai-agent-development-mistakes", "building-ai-agents-with-google-gemini"],
  ctaHeading: "Shipping an agent without a test suite?",
  ctaBody:
    "Describe the task and the tools it needs on WhatsApp. I will scope the evaluation layer and the build — and tell you honestly if the job does not need an agent at all.",
};
