import type { Project } from "@/lib/types";

/**
 * Curated portfolio projects.
 *
 * Copy originates from the previous site's verified project overrides;
 * repository stats (stars, topics, language, dates) come from the GitHub API
 * as of 2026-11-25. Never invent adoption numbers, customers or outcomes.
 */
export const PROJECTS: Project[] = [
  {
    slug: "shopify-growth-mcp",
    name: "shopify-growth-mcp",
    url: "https://github.com/hamids-ai-automations/shopify-growth-mcp",
    description:
      "Production-grade Shopify Growth MCP Server: 61 MCP tools for AI store operations, SEO audits, GEO readiness, deterministic analytics, inventory intelligence, feed quality and safe marketing workflows. Model Context Protocol for Claude, Cursor, VS Code, Codex. TypeScript, MIT.",
    topics: [
      "mcp",
      "mcp-server",
      "model-context-protocol",
      "shopify",
      "ai-agents",
      "seo",
      "typescript",
      "ecommerce",
    ],
    language: "TypeScript",
    stars: 1,
    updated: "2026-11-20",
    featured: true,
    service: "mcp-development",
    tagline: "A production MCP server exposing 61 Shopify tools to AI agents.",
    summary:
      "Store operations, product and collection management, and SEO auditing exposed as a typed MCP tool surface, so an agent can work inside a Shopify storefront without ad-hoc scripting.",
    problem:
      "Shopify automation usually means a private app, a custom script, and a new integration every time a merchant wants an agent to do one more thing. The tool surface, not the model, becomes the bottleneck.",
    approach: [
      "Consolidate store operations into intent-shaped tools rather than mirroring every REST endpoint.",
      "Keep write tools behind explicit scopes so an agent cannot mutate a live storefront by accident.",
      "Ship SEO audit tooling alongside operations, because growth work and store data live in the same place.",
    ],
    capabilities: [
      "61 MCP tools spanning catalogue, orders, and growth workflows",
      "Typed JSON Schema arguments validated before any call",
      "Documented install path for MCP clients",
      "SEO auditing integrated into the tool surface",
    ],
  },
  {
    slug: "servicenow-ultimate-mcp",
    name: "servicenow-ultimate-mcp",
    url: "https://github.com/hamids-ai-automations/servicenow-ultimate-mcp",
    description:
      "Enterprise operations console and reference control plane for the ServiceNow Ultimate MCP server - ITSM, CMDB, workflows, analytics and an LLM-powered natural-language query console.",
    topics: [
      "mcp",
      "model-context-protocol",
      "servicenow",
      "itsm",
      "cmdb",
      "ai-agents",
      "typescript",
      "nextjs",
    ],
    language: "TypeScript",
    stars: 1,
    updated: "2026-11-25",
    featured: true,
    service: "mcp-development",
    tagline: "A reference control plane for ServiceNow exposed over MCP.",
    summary:
      "Enterprise operations console plus a reference control plane that maps ServiceNow capability onto an MCP tool surface, with the permission boundaries an ITSM system demands.",
    problem:
      "ServiceNow holds the operational record for an entire company. Exposing it to an agent without scoping is not an option, and exposing it badly produces an unusable haystack of endpoints.",
    approach: [
      "Model the tool surface around operator intent: incident triage, change review, request handling.",
      "Treat the platform permission model as the boundary, and keep the agent inside it.",
      "Document the control plane so the same pattern can be reused across enterprise systems.",
    ],
    capabilities: [
      "Reference implementation of an enterprise MCP control plane",
      "Tool surface aligned to real ITSM workflows",
      "Explicit permission scoping per tool group",
      "Operational console for inspecting agent activity",
    ],
  },
  {
    slug: "google-services-mcp",
    name: "google-services-mcp",
    url: "https://github.com/hamids-ai-automations/google-services-mcp",
    description:
      "MCP server for Google Drive, Sheets, Gmail, Calendar and Docs - 44 tools, read-only by default, OAuth, permission gating, audit logging.",
    topics: [
      "mcp",
      "model-context-protocol",
      "google-workspace",
      "google-drive",
      "google-sheets",
      "gmail",
      "oauth2",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-21",
    featured: true,
    service: "mcp-development",
    tagline: "44 read-only Google Workspace and services tools for AI clients.",
    summary:
      "A Python MCP server giving an agent structured access to Google services — mail, calendar, and documents — read-only by default so nothing is modified without a deliberate scope change.",
    problem:
      "Agents need context that lives in a workspace account, but handing an agent write access to email and calendar is an unacceptable default. Read-only-first design makes the useful case safe.",
    approach: [
      "Start read-only, and keep read and write tools in separate scopes.",
      "Normalise Google API responses into compact structured content a model can reason about.",
      "Fail with actionable messages, since OAuth scope errors are the most common client-side problem.",
    ],
    capabilities: [
      "44 tools across Google services",
      "Read-only by default with opt-in write scopes",
      "OAuth handling with refresh-token persistence",
      "Python, packaged for local stdio clients",
    ],
  },
  {
    slug: "gemini-agent-reliability-kit",
    name: "gemini-agent-reliability-kit",
    url: "https://github.com/hamids-ai-automations/gemini-agent-reliability-kit",
    description:
      "Offline-first reliability harness for Gemini tool-calling agents: schema, tool choice, argument contracts, retry telemetry, latency and cost report cards.",
    topics: [
      "gemini",
      "google-gemini",
      "ai-agents",
      "llm-eval",
      "tool-calling",
      "reliability",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-21",
    featured: true,
    service: "ai-agent-development",
    tagline: "An offline-first harness for scoring agent behaviour.",
    summary:
      "A reliability kit for Gemini-based agents: run a labelled task suite offline, score tool choice and argument validity, and detect regressions before they reach users.",
    problem:
      "Agent quality is usually assessed by trying a few prompts. That produces no regression signal, so every prompt or model change is a coin flip.",
    approach: [
      "Define tasks with expected tool sequences and acceptable answers.",
      "Score deterministically: tool choice, argument validity, schema conformance, refusal behaviour.",
      "Run the suite in CI so a regression blocks the change instead of shipping it.",
    ],
    capabilities: [
      "Labelled task suite model with fixtures",
      "Deterministic scoring and failure taxonomy",
      "Provider abstraction so the model is configuration",
      "Report output suitable for CI gating",
    ],
  },
  {
    slug: "gemini-agent-automation-toolkit",
    name: "gemini-agent-automation-toolkit",
    url: "https://github.com/hamids-ai-automations/gemini-agent-automation-toolkit",
    description:
      "Production-grade toolkit for Gemini-powered agents in Python: tool calling, structured output, human-in-the-loop approvals and multi-step workflows.",
    topics: [
      "gemini",
      "google-genai",
      "agent-framework",
      "structured-output",
      "human-in-the-loop",
      "tool-calling",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-20",
    featured: false,
    service: "ai-agent-development",
    tagline: "A production toolkit for building Gemini-powered automation.",
    summary:
      "Reusable primitives for agent-based automation: typed tool definitions, structured output validation, retries, and the plumbing that turns a prototype into something operable.",
    problem:
      "Every agent prototype reinvents the same scaffolding — tool registration, output validation, retry policy, logging — and each reinvention has its own bugs.",
    approach: [
      "Provide the boring parts: tool registry, schema validation, step limits, structured logs.",
      "Keep the model behind an interface so providers can change without a rewrite.",
      "Make the default configuration the safe one.",
    ],
    capabilities: [
      "Typed tool registration and dispatch",
      "Structured output validation with repair paths",
      "Step and token budget enforcement",
      "Structured execution logs",
    ],
  },
  {
    slug: "ai-agent-testing-lab",
    name: "ai-agent-testing-lab",
    url: "https://github.com/hamids-ai-automations/ai-agent-testing-lab",
    description:
      "AI agent evaluation and reliability harness: labelled suites, CI integration, accuracy/calibration/cost/latency reporting. Python, pytest, MCP.",
    topics: [
      "agent-evaluation",
      "ai-agents",
      "evals",
      "llm-evaluation",
      "pytest",
      "mcp",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-20",
    featured: false,
    service: "ai-agent-development",
    tagline: "Experiments in evaluating agents before trusting them.",
    summary:
      "A lab for agent evaluation patterns: deterministic assertions over multi-step runs, adversarial cases, and the scoring methods that survive contact with real tasks.",
    problem:
      "Evaluation methods that work for single-turn classification break down for agents that choose their own control flow across many steps.",
    approach: [
      "Test trajectory properties, not only final answers.",
      "Include adversarial and ambiguous inputs, since those drive most production failures.",
      "Keep scoring deterministic so a diff is meaningful.",
    ],
    capabilities: [
      "Trajectory assertions across multi-step runs",
      "Adversarial case library",
      "Reusable scoring helpers",
      "Notes on what each metric actually predicts",
    ],
  },
  {
    slug: "ghl-automation-engine",
    name: "ghl-automation-engine",
    url: "https://github.com/hamids-ai-automations/ghl-automation-engine",
    description:
      "Contract-first HighLevel (GoHighLevel) engine: honest pagination, single-flight OAuth refresh, PII-safe logging, signed webhook intake with replay protection, and an offline mock with fault injection. 83 tests, zero runtime dependencies.",
    topics: [
      "gohighlevel",
      "highlevel",
      "api-client",
      "webhooks",
      "idempotency",
      "pagination",
      "crm",
      "python",
    ],
    language: "Python",
    stars: 1,
    updated: "2026-11-22",
    featured: true,
    service: "gohighlevel-automation",
    tagline: "Contract-first automation engine for GoHighLevel.",
    summary:
      "A Python engine for GoHighLevel automation: typed API client, honest pagination, single-flight OAuth refresh, and idempotent webhook handling.",
    problem:
      "HighLevel automations fail quietly. Truncated pagination, invalidated refresh tokens, and duplicate webhook processing all present as slightly wrong data rather than errors.",
    approach: [
      "Treat the API as a contract and assert it: page termination, record counts, token lifecycle.",
      "Make every webhook handler idempotent with a dead-letter path.",
      "Keep an audit trail per run so failures are diagnosable after the fact.",
    ],
    capabilities: [
      "Typed HighLevel API client with pagination guardrails",
      "Single-flight OAuth refresh with persisted state",
      "Idempotent webhook ingestion with replay",
      "Structured run logs and audit trail",
    ],
  },
  {
    slug: "ghl-devops-toolkit",
    name: "ghl-devops-toolkit",
    url: "https://github.com/hamids-ai-automations/ghl-devops-toolkit",
    description:
      "The Open-Source Developer Platform for GoHighLevel Automations. Inspect APIs, debug webhooks, simulate workflows, run automated tests, and troubleshoot with AI.",
    topics: [
      "gohighlevel",
      "ghl",
      "leadconnector",
      "webhook-inspector",
      "workflow-simulator",
      "devops",
      "typescript",
      "nextjs",
    ],
    language: "TypeScript",
    stars: 0,
    updated: "2026-11-22",
    featured: true,
    service: "gohighlevel-automation",
    tagline: "Developer platform tooling for GoHighLevel agencies.",
    summary:
      "Open-source DevOps tooling for HighLevel: environment management, deployment and versioning support, and the developer ergonomics the platform does not ship with.",
    problem:
      "Agencies operate HighLevel accounts like production systems, but without the versioning, environments, and deployment discipline that production systems get.",
    approach: [
      "Introduce environment separation and versioned configuration.",
      "Automate the repetitive parts of shipping changes across locations.",
      "Keep everything inspectable from the command line.",
    ],
    capabilities: [
      "Multi-location configuration management",
      "Versioned deployment workflow",
      "CLI-driven operations",
      "TypeScript implementation with published tooling",
    ],
  },
  {
    slug: "leadflow-sentinel",
    name: "leadflow-sentinel",
    url: "https://github.com/hamids-ai-automations/leadflow-sentinel",
    description:
      "Read-only GoHighLevel CRM observability engine: deterministic findings, explainable health score, optional AI narrative layer.",
    topics: ["gohighlevel", "crm", "observability", "read-only", "python"],
    language: "Python",
    stars: 0,
    updated: "2026-11-22",
    featured: true,
    service: "gohighlevel-automation",
    tagline: "Read-only observability for GoHighLevel lead pipelines.",
    summary:
      "A monitoring layer that reports pipeline health in a HighLevel account — stale opportunities, broken workflows, diverging configuration — without modifying anything.",
    problem:
      "Lead pipelines degrade silently. Opportunities stall, workflows stop matching, and the first signal is a revenue conversation that went cold.",
    approach: [
      "Read-only by design so it can run against live accounts immediately.",
      "Report findings as a prioritised list with the evidence behind each one.",
      "Track the same checks over time to distinguish noise from drift.",
    ],
    capabilities: [
      "Stale-opportunity and stuck-stage detection",
      "Workflow and configuration divergence checks",
      "Read-only operation, safe for production accounts",
      "Scheduled report output",
    ],
  },
  {
    slug: "firebase-ai-starter-kit",
    name: "firebase-ai-starter-kit",
    url: "https://github.com/hamids-ai-automations/firebase-ai-starter-kit",
    description:
      "Secure Gemini AI on Firebase: Auth, Firestore ownership rules, hardened Cloud Functions, emulator-first tests, CI and guarded deploys.",
    topics: [
      "firebase",
      "gemini",
      "cloud-functions",
      "security",
      "react",
      "typescript",
      "starter-kit",
    ],
    language: "TypeScript",
    stars: 0,
    updated: "2026-11-21",
    featured: false,
    service: "ai-automation",
    tagline: "Secure Gemini AI on Firebase, wired end to end.",
    summary:
      "A starter kit for serving Gemini features through Firebase with the security model in place: callable functions, App Check, rate limiting, and typed client contracts.",
    problem:
      "Shipping an AI feature on Firebase usually means putting a model key somewhere it should not be, then retrofitting abuse controls after the first bill.",
    approach: [
      "Keep the model behind a callable function with App Check enforced.",
      "Add per-user rate limiting and input validation before the model is called.",
      "Provide a typed client so the front end cannot drift from the backend contract.",
    ],
    capabilities: [
      "Callable function wrapper for Gemini calls",
      "App Check and auth enforcement",
      "Rate limiting and request validation",
      "Typed client SDK and deployment scripts",
    ],
  },
  {
    slug: "conversionbridge",
    name: "conversionbridge",
    url: "https://github.com/hamids-ai-automations/conversionbridge",
    description:
      "Server-side conversion gateway for Meta Conversions API and Google Analytics 4 with privacy controls. Python, Firebase.",
    topics: [
      "conversion-tracking",
      "meta-conversions-api",
      "ga4",
      "server-side-tracking",
      "attribution",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-20",
    featured: true,
    service: "marketing-technology",
    tagline: "Server-side conversion tracking with deduplication built in.",
    summary:
      "A server-side gateway that forwards conversions to GA4 and ad platforms with a shared event identity, so browser and server events reconcile instead of double-counting.",
    problem:
      "Client-side tags lose events to blockers and browser policy. Moving to the server fixes loss and creates duplication unless identity is designed first.",
    approach: [
      "Generate one canonical event id at the source of truth and reuse it everywhere.",
      "Hash and normalise identifiers before forwarding.",
      "Verify against a real conversion traced from click to CRM record.",
    ],
    capabilities: [
      "GA4 Measurement Protocol forwarding",
      "Meta Conversions API forwarding",
      "Shared event-id deduplication",
      "Consent-aware routing",
    ],
  },
  {
    slug: "ppc-waste-detector",
    name: "ppc-waste-detector",
    url: "https://github.com/hamids-ai-automations/ppc-waste-detector",
    description:
      "Free, open-source PPC budget leak detector for Google & Meta Ads. Detects negative keyword gaps, search query bleed, click fraud, and zero-conversion spend.",
    topics: [
      "ppc-optimization",
      "google-ads",
      "meta-ads",
      "negative-keywords",
      "search-query-mining",
      "python",
    ],
    language: "Python",
    stars: 1,
    updated: "2026-11-20",
    featured: false,
    service: "marketing-technology",
    tagline: "Finds where paid search budget is being wasted.",
    summary:
      "An auditing tool that analyses search term and placement data to surface negative-keyword candidates and structurally wasteful spend, and writes the output as a change list.",
    problem:
      "Waste hides in the long tail. Reviewing search terms by hand does not scale, and dashboards report spend without proposing an action.",
    approach: [
      "Score terms on spend, conversion evidence, and intent mismatch.",
      "Output a prioritised change list rather than another chart.",
      "Keep the thresholds configurable per account.",
    ],
    capabilities: [
      "Search term waste scoring",
      "Negative keyword candidate lists",
      "Placement and audience analysis",
      "Exportable change list",
    ],
  },
  {
    slug: "meta-lead-quality-analyzer",
    name: "meta-lead-quality-analyzer",
    url: "https://github.com/hamids-ai-automations/meta-lead-quality-analyzer",
    description:
      "Open-source lead quality scoring & CRM revenue feedback engine for Meta Ads. Detects fake leads, disposable emails, bot form fatigue, and optimizes Cost-Per-Qualified-Lead (CPQL).",
    topics: [
      "lead-quality",
      "lead-scoring",
      "meta-ads",
      "crm-integration",
      "offline-conversions",
      "python",
    ],
    language: "Python",
    stars: 1,
    updated: "2026-11-20",
    featured: false,
    service: "marketing-technology",
    tagline: "Lead quality analysis for Meta campaigns.",
    summary:
      "Connects campaign spend to downstream lead quality so bidding decisions are based on qualified outcomes rather than raw form fills.",
    problem:
      "Meta optimises toward form fills. If the CRM says most of those leads never qualify, the platform is optimising for the wrong event.",
    approach: [
      "Join CRM lead outcomes with campaign and ad-set spend.",
      "Report cost per qualified lead instead of cost per lead.",
      "Identify which creative and audience combinations produce downstream quality.",
    ],
    capabilities: [
      "Spend-to-outcome joining across CRM and ads",
      "Cost per qualified lead reporting",
      "Creative and audience quality breakdown",
      "Configurable qualification rules",
    ],
  },
  {
    slug: "ai-search-visibility-auditor",
    name: "ai-search-visibility-auditor",
    url: "https://github.com/hamids-ai-automations/ai-search-visibility-auditor",
    description:
      "GEO toolkit: validate AI crawler access in robots.txt, generate and lint llms.txt, check AI-citation readiness of web content. Python, Streamlit.",
    topics: [
      "generative-engine-optimization",
      "geo",
      "llms-txt",
      "ai-search",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-20",
    featured: false,
    service: "marketing-technology",
    tagline: "Audits how a site appears to AI answer engines.",
    summary:
      "Checks whether a site is legible to AI crawlers and answer engines: robots directives, structured data, llms.txt, and content shape, reported as concrete fixes.",
    problem:
      "Search visibility increasingly depends on being citable by answer engines, and most sites have no idea whether they are crawlable, parseable, or quotable.",
    approach: [
      "Check crawler directives and structured data first, since those gate everything else.",
      "Assess content shape: are claims attributable, and is there a canonical summary to cite?",
      "Report fixes in priority order with the evidence for each.",
    ],
    capabilities: [
      "Crawler and robots directive audit",
      "Structured data coverage check",
      "llms.txt and content-shape review",
      "Prioritised fix list",
    ],
  },
  {
    slug: "geo-visibility-lab",
    name: "geo-visibility-lab",
    url: "https://github.com/hamids-ai-automations/geo-visibility-lab",
    description:
      "Open-source Local SEO & Google Business Profile (GBP) proximity rank tracker. Audits 5x5 geo-grids, aggregator NAP citation drift, review velocity decay, and exports Schema.org JSON-LD.",
    topics: [
      "local-seo",
      "google-business-profile",
      "geo-grid",
      "rank-tracker",
      "nap-consistency",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-20",
    featured: false,
    service: "marketing-technology",
    tagline: "Experiments in generative engine optimisation.",
    summary:
      "A lab for testing how content structure affects citation by generative answer engines: prompt sets, citation tracking, and structural comparisons.",
    problem:
      "GEO advice is largely anecdotal. Without a repeatable test, nobody can tell which structural change actually affects citation.",
    approach: [
      "Define a fixed prompt set per topic and record citations over time.",
      "Compare structural variants of the same content.",
      "Report effects, not opinions.",
    ],
    capabilities: [
      "Fixed prompt-set evaluation",
      "Citation tracking across engines",
      "Structural variant comparison",
      "Documented methodology",
    ],
  },
  {
    slug: "envscope",
    name: "envscope",
    url: "https://github.com/hamids-ai-automations/envscope",
    description:
      "CLI that audits .env files against .env.example and a JSON schema without ever printing secrets. DevSecOps, Python.",
    topics: ["devsecops", "dotenv", "secrets-scanning", "cli", "python"],
    language: "Python",
    stars: 0,
    updated: "2026-11-20",
    featured: true,
    service: "python-automation",
    tagline: "Configuration and environment inspection for Python projects.",
    summary:
      "A small CLI that reports which environment variables a project actually reads, which are missing, and which are declared but unused — before a deployment finds out.",
    problem:
      "Configuration errors surface at runtime, in production, as a stack trace from a library rather than a message about the missing key.",
    approach: [
      "Validate configuration at startup against a declarative contract.",
      "Report missing, extra, and unused variables.",
      "Never print values, only presence and shape.",
    ],
    capabilities: [
      "Declarative environment contract",
      "Missing and unused variable reporting",
      "Secret-safe output",
      "CI-friendly exit codes",
    ],
  },
  {
    slug: "searchpulse-ai",
    name: "searchpulse-ai",
    url: "https://github.com/hamids-ai-automations/searchpulse-ai",
    description:
      "Google Search Console intelligence: traffic-drop diagnostics, content decay detection and evidence-based SEO decisions. Python, FastAPI, pytest.",
    topics: [
      "google-search-console",
      "seo-analytics",
      "fastapi",
      "data-analytics",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-20",
    featured: true,
    service: "python-automation",
    tagline: "Technical SEO auditing, automated end to end.",
    summary:
      "A pipeline that crawls a site, checks technical SEO conditions, and produces a prioritised report with the specific URLs affected by each issue.",
    problem:
      "Technical SEO findings arrive as a list of issues without scope. \"Missing canonical tags\" is not actionable until you know which 400 URLs and why.",
    approach: [
      "Crawl and classify pages before running checks, so findings inherit scope.",
      "Attach affected URLs to every issue.",
      "Rank by impact and effort rather than by check order.",
    ],
    capabilities: [
      "Crawl with page classification",
      "Technical check suite with per-URL evidence",
      "Prioritised reporting",
      "Scheduled re-runs for regression detection",
    ],
  },
  {
    slug: "conversion-tracking-doctor",
    name: "conversion-tracking-doctor",
    url: "https://github.com/hamids-ai-automations/conversion-tracking-doctor",
    description:
      "Open-source conversion tracking diagnostic suite for GA4, Google Ads, Meta Pixel/CAPI, and GTM. Fixes duplicate events, PII leaks, broken Enhanced Conversions, and CAPI drops.",
    topics: [
      "conversion-tracking",
      "ga4",
      "google-ads",
      "gtm",
      "meta-pixel",
      "conversions-api",
      "python",
    ],
    language: "Python",
    stars: 1,
    updated: "2026-11-20",
    featured: false,
    service: "marketing-technology",
    tagline: "Diagnoses broken conversion tracking.",
    summary:
      "An inspector that traces a conversion path and reports where tracking breaks: missing tags, duplicated events, mismatched ids, or parameters that never arrive.",
    problem:
      "When platform conversions disagree with reality, the cause is usually one of four things, and finding which one by hand takes hours of tag debugging.",
    approach: [
      "Check event presence, duplication, and parameter integrity in order.",
      "Compare what the browser sends against what the platform receives.",
      "Report the specific break, not a general warning.",
    ],
    capabilities: [
      "Event presence and duplication checks",
      "Parameter integrity validation",
      "Browser-versus-platform comparison",
      "Actionable diagnosis output",
    ],
  },
  {
    slug: "sarif-verify",
    name: "sarif-verify",
    url: "https://github.com/hamids-ai-automations/sarif-verify",
    description:
      "Validate SARIF 2.1.0 logs against the GitHub code-scanning contract before uploading them. Zero-dependency CLI + Docker, 34 tests.",
    topics: [
      "sarif",
      "code-scanning",
      "devsecops",
      "github-actions",
      "security-tools",
      "python",
    ],
    language: "Python",
    stars: 0,
    updated: "2026-11-20",
    featured: false,
    service: "python-automation",
    tagline: "Verifies SARIF output from security scanners.",
    summary:
      "A validator for SARIF reports that checks schema conformance and result integrity, so scan output can be trusted by the pipeline that consumes it.",
    problem:
      "Scanner output is consumed by automation. A malformed SARIF file fails the pipeline in a way that looks like a security finding rather than a format problem.",
    approach: [
      "Validate against the SARIF schema and report precise locations for violations.",
      "Check result integrity: rules referenced, locations resolvable, severity present.",
      "Produce output a CI job can act on.",
    ],
    capabilities: [
      "SARIF schema validation",
      "Result integrity checks",
      "CI-friendly reporting",
      "Python implementation",
    ],
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsForService(serviceSlug: string): Project[] {
  return PROJECTS.filter((p) => p.service === serviceSlug);
}
