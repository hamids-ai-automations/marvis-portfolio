import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "ai-security",
  name: "AI Application Security",
  shortName: "AI Security",
  group: "Security & Reliability",
  icon: "shield",
  order: 10,
  seoTitle: "AI Application Security & Prompt Injection — Muhammad Hamid",
  metaDescription:
    "AI application security that assumes hostile input: prompt injection defence, permission-gated tools, secrets hygiene and eval gates. WhatsApp Muhammad Hamid.",
  eyebrow: "AI Security Engineering",
  h1: "AI applications that assume hostile input",
  intro:
    "An agent with tools and a model key is an attack surface. A document it reads, an email it processes or a page it fetches can carry instructions that are not yours — that is prompt injection — and an injected agent with write access to your CRM is a bad day. I build AI systems the way I build my own open-source ones: read-only by default, permissions gated per tool, keys on the server, rate limits before the model call, and adversarial cases in the eval suite so the defences are tested like everything else.",
  benefits: [
    {
      title: "Read-only by default",
      body: "Read and write tools live in separate scopes, and nothing is modified without a deliberate scope change. My google-services-mcp server applies this to Google Workspace: useful by default, destructive by opt-in.",
    },
    {
      title: "Permission-gated tool surfaces",
      body: "Every tool an agent can call sits behind an explicit permission. The agent gets the minimum set for the job, and writes require separate authorisation rather than one all-powerful credential.",
    },
    {
      title: "Injection treated as a design constraint",
      body: "Untrusted content is treated as data, not instructions. Tool outputs and outbound destinations are constrained, so an instruction smuggled into a document cannot simply walk your secrets out the door.",
    },
    {
      title: "Keys and secrets where they belong",
      body: "Model keys stay server-side behind authenticated callable functions, never in a client bundle. Configuration is validated at startup without ever printing values — the envscope approach.",
    },
    {
      title: "Abuse control before the model call",
      body: "Authentication, attestation and per-user rate limits run before a single token is spent. Runaway loops and scripted abuse hit a ceiling, not your invoice.",
    },
    {
      title: "Security behaviour under eval",
      body: "Adversarial cases sit in the same CI-gated suite as functional ones. A defence that silently stops working blocks the merge instead of waiting to be discovered.",
    },
  ],
  useCases: [
    {
      title: "Hardening an agent before it gets write access",
      body: "Audit the tool surface, cut it to the minimum, split read from write, and put approval gates in front of anything that modifies business data.",
    },
    {
      title: "Securing AI features in Firebase apps",
      body: "Model calls behind callable functions with App Check enforced, per-user rate limits, and Firestore rules tied to ownership — the firebase-ai-starter-kit pattern.",
    },
    {
      title: "Reviewing MCP servers for safe defaults",
      body: "Tool-by-tool review of scope separation, OAuth breadth, audit logging and failure behaviour for servers you run or plan to deploy.",
    },
    {
      title: "Protecting document-processing pipelines",
      body: "Untrusted documents flow through validation into structured records — extraction cannot trigger actions, and external content never reaches an execution path.",
    },
    {
      title: "Closing exfiltration paths",
      body: "Outbound calls constrained to allow-listed destinations, tool results filtered for secrets, and logs written so a human can read them without leaking values.",
    },
  ],
  process: [
    {
      title: "Threat-model the agent",
      body: "Map what it reads, what it can call, and what it can write. Most of the risk concentrates in a handful of tools, and the map shows which.",
    },
    {
      title: "Reduce the surface",
      body: "Remove tools that are not needed, split read from write scopes, and move the default posture to read-only. The cheapest defence is a capability the agent never had.",
    },
    {
      title: "Move trust to the perimeter",
      body: "Authentication, attestation and rate limits run before the model call. Input validation happens where the request enters, not after tokens are spent.",
    },
    {
      title: "Constrain outputs and destinations",
      body: "Validation at every boundary, allow-lists for outbound calls, and logging designed never to print secret values.",
    },
    {
      title: "Add adversarial evals",
      body: "Injection and exfiltration attempts become labelled cases in the CI suite. Defences are regression-tested like features, because a defence that decays silently is worse than none.",
    },
    {
      title: "Verify the security tooling itself",
      body: "Scanner output is validated against its contract — sarif-verify exists because malformed security reports break pipelines in ways that look like findings — and environment contracts are checked before deploy.",
    },
  ],
  integrations: [
    "Firebase (Auth, App Check, Firestore rules)",
    "Google OAuth 2.0 scopes",
    "MCP tool surfaces",
    "GitHub Actions code scanning",
    "Cloud Functions",
    "Env & secrets pipelines",
  ],
  technologies: [
    "Python 3.12",
    "Firebase App Check",
    "OAuth 2.0",
    "Model Context Protocol",
    "Pydantic v2",
    "GitHub Actions",
    "SARIF 2.1.0",
  ],
  faqs: [
    {
      question: "What is prompt injection, in plain terms?",
      answer:
        "Models do not reliably distinguish instructions from data. If your agent reads emails, documents or web pages, text inside them can act as instructions — an email containing a request for your customer list is an attack. It matters the moment an agent has tools and access worth abusing.",
    },
    {
      question: "Is read-only access actually enough?",
      answer:
        "It is the right default, not a complete answer. Read-only caps the blast radius for writes, but a readable surface can still leak if tool results can reach an attacker-controlled channel. That is why exfiltration paths and output constraints sit next to the read/write split.",
    },
    {
      question: "Where should the model API key live?",
      answer:
        "Server-side, behind an authenticated endpoint — a callable function, not the client bundle. In Firebase terms that means App Check plus auth before the model call. The configuration holding those keys is validated at startup without printing values, which is exactly what envscope does.",
    },
    {
      question: "How do rate limits improve security, not just cost?",
      answer:
        "They put a ceiling on abuse. A leaked endpoint, a scripted client or a model stuck in a tool loop all hit the limit instead of compounding. Per-user limits before the model call protect the budget and the downstream systems at the same time.",
    },
    {
      question: "Can you secure a system that is already live?",
      answer:
        "Yes, and that is the common case. The work starts with an audit of the attack surface, then hardens in increments — scope splits, perimeter controls, output constraints. Eval gates keep each increment from breaking behaviour the system already has.",
    },
    {
      question: "How do you prove the defences work?",
      answer:
        "The same way you prove features work: adversarial cases in a labelled suite, run in CI with deterministic scoring. An injection attempt that succeeds becomes a failing test and blocks the merge. Defence quality becomes a tracked number instead of an opinion.",
    },
  ],
  relatedProjects: ["envscope", "sarif-verify", "google-services-mcp", "firebase-ai-starter-kit"],
  relatedArticles: ["building-secure-ai-applications", "mcp-servers-that-fail-in-production"],
  ctaHeading: "Secure the AI you are about to ship",
  ctaBody:
    "Send the architecture or a repository link. You get a direct read on where the attack surface is — key exposure, injection paths, unbounded tool permissions — and what to close first, before the agent earns write access.",
};
