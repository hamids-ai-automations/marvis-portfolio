import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "ai-integration",
  name: "AI Integration Services",
  shortName: "AI Integration",
  group: "AI & Agent Development",
  icon: "plug",
  order: 5,
  seoTitle: "AI Integration Services for Existing Stacks — Muhammad Hamid",
  metaDescription:
    "AI integration services that wire models into CRMs, spreadsheets and ad platforms — with OAuth, idempotency and MCP handled properly. WhatsApp Muhammad Hamid.",
  eyebrow: "AI Systems Integration",
  h1: "AI wired into the systems you already run",
  intro:
    "The hard part of putting AI into a business is rarely the model. It is the plumbing: getting data out of the CRM, keeping OAuth tokens alive, making webhook delivery idempotent, and giving AI clients a safe, typed surface to work through. I build that layer — and where an AI client needs access, I expose it through MCP, the Model Context Protocol, instead of ad-hoc scripts.",
  benefits: [
    {
      title: "Integrations that survive retries",
      body: "Idempotency keys, canonical event ids and replay protection, so a duplicate webhook delivery does not become a duplicate record. Every write path is safe to run twice.",
    },
    {
      title: "OAuth handled like production state",
      body: "Minimum scopes, persisted refresh tokens, and single-flight refresh so concurrent runs cannot invalidate each other. Token expiry is a handled case, not a mystery 401.",
    },
    {
      title: "Deduplication designed in",
      body: "One canonical event identity generated at the source of truth and reused across every destination, so browser and server events reconcile instead of double-counting.",
    },
    {
      title: "MCP as the AI-facing surface",
      body: "Where AI clients such as Claude or Cursor need access, it comes through a Model Context Protocol server with typed tools — read-only by default, writes in separate scopes.",
    },
    {
      title: "Error budgets instead of silent decay",
      body: "Explicit failure states, dead-letter paths and structured run logs. When a connected API changes behaviour, the system tells you — it does not quietly produce slightly wrong data.",
    },
  ],
  useCases: [
    {
      title: "CRM enrichment and routing",
      body: "Lead signals deduplicated, enriched and routed into the right pipeline, with approval gates on anything that contacts a customer.",
    },
    {
      title: "Spreadsheet-to-system flows",
      body: "Sheets as a source or destination with validation on both ends, so a typo in row 402 does not become a bad write to production.",
    },
    {
      title: "Inbox-driven workflows",
      body: "Email parsed, classified and routed with attachments extracted — the model reads a normalised representation, not raw MIME.",
    },
    {
      title: "Reporting across ad platforms",
      body: "GA4, Google Ads and Meta data pulled through their APIs, normalised into one schema, and delivered as a checked report.",
    },
    {
      title: "AI clients inside your operations",
      body: "An MCP server exposing your systems' capabilities to AI agents as typed tools — with permission gating, audit logging, and no raw credentials handed to the model.",
    },
  ],
  process: [
    {
      title: "Map the systems and the truth",
      body: "Where the data of record lives, which flows read and write, and which failure each connection already has in production.",
    },
    {
      title: "Choose the surface deliberately",
      body: "Background automation, webhook pipeline, or MCP server for AI clients — the choice is documented with its trade-offs, not defaulted.",
    },
    {
      title: "Build the plumbing first",
      body: "Auth, retries, idempotency and dead-letter paths exist before any model call. The AI step is added onto a layer that already works.",
    },
    {
      title: "Add the model behind contracts",
      body: "Schema-validated model output feeding typed write functions. Dry runs and previews before the first real write.",
    },
    {
      title: "Watch it with error budgets",
      body: "Structured logs, alerting on failure states, and a runbook. The integration degrades loudly and stays diagnosable after the fact.",
    },
  ],
  integrations: [
    "GoHighLevel",
    "Google Workspace (Drive, Sheets, Gmail, Calendar)",
    "Shopify",
    "ServiceNow",
    "GA4 & Google Ads",
    "Meta Conversions API",
    "MCP clients (Claude, Cursor, VS Code)",
    "Zapier-compatible webhooks",
  ],
  technologies: [
    "Python 3.12",
    "TypeScript",
    "Model Context Protocol",
    "OAuth 2.0",
    "HMAC-signed webhooks",
    "Pydantic v2",
    "GitHub Actions",
    "Docker",
  ],
  faqs: [
    {
      question: "We already use Zapier. Why build a custom integration?",
      answer:
        "Zapier is the right answer for simple, low-volume flows. It gets shaky when correctness matters: idempotency, retry semantics, pagination and data volume are hard to control there. Custom integration earns its cost the first time a silent duplicate or a truncated import has a real consequence.",
    },
    {
      question: "What is MCP, and do we need it?",
      answer:
        "The Model Context Protocol is a standard way for AI clients — Claude, Cursor, VS Code — to call typed tools on your systems. If people work with assistants that should operate your CRM or your files, MCP is the clean surface for that. If AI runs purely in the background, plain pipelines are simpler, and I will say so.",
    },
    {
      question: "How do you prevent duplicate records?",
      answer:
        "A canonical id is generated at the source of truth and carried through to every destination, with idempotency keys on write endpoints and replay protection on webhooks. My conversionbridge project exists because this exact problem breaks conversion counts; the same pattern applies to any record flow.",
    },
    {
      question: "Who manages the OAuth and API credentials?",
      answer:
        "I set up the scopes, the refresh flow and the storage, then hand it over with the runbook. Scopes are minimised, refresh tokens persist safely, and refresh is single-flight so parallel runs cannot invalidate each other. You own the credentials from day one.",
    },
    {
      question: "What happens when a connected API changes?",
      answer:
        "Contracts are asserted in tests, so a changed response shape fails loudly instead of corrupting data downstream. Client versions are pinned where the platform allows it, and the failure path is a dead-letter queue with a diagnosis attached, not a silent gap.",
    },
  ],
  relatedProjects: ["google-services-mcp", "ghl-automation-engine", "conversionbridge", "servicenow-ultimate-mcp"],
  relatedArticles: ["building-mcp-servers-for-ai-agents", "server-side-conversion-tracking", "gohighlevel-api-integration"],
  ctaHeading: "Connect AI to the systems that hold your data",
  ctaBody:
    "Tell me which system has the data and which system needs the outcome. I will map the plumbing — auth, retries, idempotency — before a single webhook is wired, and say plainly if the integration is not worth its complexity.",
};
