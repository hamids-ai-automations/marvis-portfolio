import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "mcp-development",
  name: "MCP Server Development",
  shortName: "MCP Development",
  group: "AI & Agent Development",
  icon: "server",
  order: 6,
  seoTitle: "MCP Server Development for AI Agents — Muhammad Hamid",
  metaDescription:
    "Production MCP servers with typed tool schemas, permission scoping and honest error surfaces. Connect Claude, Gemini and other MCP clients to your systems.",
  eyebrow: "Model Context Protocol Engineering",
  h1: "MCP servers that expose your systems safely",
  intro:
    "The Model Context Protocol is how agents touch real systems: it turns a pile of internal APIs into a tool surface a model can reason about. The protocol itself is simple; the hard parts are schema design, permission boundaries, and making failures legible to a model that will otherwise retry the wrong thing forever. I design tool surfaces the way I design APIs for humans — narrow verbs, explicit arguments, pagination that terminates, and errors that say what to do next. Read-only by default, writes behind explicit scoping, and a conformance test that runs the server against the protocol contract.",
  benefits: [
    {
      title: "Tools shaped around intent, not endpoints",
      body: "A one-to-one wrapper around every endpoint gives the model a haystack. Tools are consolidated around user intent, with parameters that carry their own constraints.",
    },
    {
      title: "Read and write kept apart",
      body: "Read and write scopes are separated at the server level. Destructive verbs require explicit opt-in and return a preview before committing.",
    },
    {
      title: "Errors a model can act on",
      body: "Stack traces in tool results teach an agent to retry blindly. Errors are typed, actionable and bounded: what failed, why, and whether retrying can help.",
    },
    {
      title: "Upstream drift caught by tests",
      body: "Protocol-level conformance tests plus per-tool contract tests fail when an upstream API changes, so a vendor update surfaces as a failing build rather than silent breakage.",
    },
    {
      title: "A server a stranger can install",
      body: "Packaging, versioning and a README written for someone who has never met the author, plus exact client configuration for Claude Desktop, IDE clients or your own agent runtime.",
    },
  ],
  useCases: [
    {
      title: "Teams bringing AI clients to internal systems",
      body: "CRM, ERP, ticketing or inventory exposed as MCP tools with typed schemas, permission gating and audit logs — read-only until write access earns trust.",
    },
    {
      title: "SaaS products shipping MCP integrations",
      body: "Your product becomes a tool surface that Claude, Cursor and other MCP clients can operate safely, with conformance tests run before each release.",
    },
    {
      title: "Agencies automating client stacks",
      body: "One MCP server that bridges a client’s systems to agent workflows, deployed per client with scoped credentials and rollback.",
    },
    {
      title: "Undocumented internal APIs",
      body: "No docs, no spec, no owner. The real behaviour gets mapped from traffic and the tool surface is built from observed contracts rather than documentation that does not exist.",
    },
    {
      title: "A first server that grew into a haystack",
      body: "Dozens of tools with overlapping verbs, where the model picks the wrong one and retries forever. The surface gets redesigned around intent and re-verified against a conformance suite.",
    },
  ],
  process: [
    {
      title: "System map",
      body: "What the agent needs to read, what it may write, and where the blast radius is.",
    },
    {
      title: "Tool design",
      body: "Consolidate endpoints into intent-shaped tools; drop the ones that only exist because the UI needed them.",
    },
    {
      title: "Implementation",
      body: "Typed schemas, transport wiring, auth and structured errors.",
    },
    {
      title: "Verification",
      body: "Conformance and contract tests, plus a manual run against a real client.",
    },
    {
      title: "Distribution",
      body: "Packaging, versioning and a README a stranger can install from.",
    },
  ],
  integrations: [
    "Claude Desktop",
    "Gemini MCP clients",
    "Cursor & IDE MCP clients",
    "Custom agent runtimes",
    "Shopify Admin API",
    "ServiceNow",
    "Google Workspace",
    "GoHighLevel",
    "OAuth 2.0-protected APIs",
  ],
  technologies: [
    "Python",
    "TypeScript",
    "MCP SDK",
    "JSON Schema",
    "Pydantic",
    "OAuth 2.0",
    "stdio & streamable HTTP transports",
    "GitHub Actions",
  ],
  faqs: [
    {
      question: "Which MCP clients does this work with?",
      answer:
        "Any client that speaks the protocol: Claude Desktop, IDE-integrated clients and custom agent runtimes. Transports are stdio and streamable HTTP, so the same server serves local and remote deployments.",
    },
    {
      question: "Can you expose an internal API that has no documentation?",
      answer:
        "Yes, and that is common work. I map the real behaviour from traffic and build the tool surface from observed contracts, not from the docs that do not exist — with contract tests pinning down what was observed.",
    },
    {
      question: "Is it safe to give a model write access?",
      answer:
        "Only with scoping and previews. Default deployments are read-only; write tools are opt-in per session, and destructive actions have an explicit confirmation path with a payload preview before commit.",
    },
    {
      question: "What is the difference between an MCP server and an API wrapper?",
      answer:
        "An API wrapper maps endpoints one-to-one and leaves the model to cope. An MCP server is designed for a model as the consumer: intent-shaped tools, constrained arguments, recoverable errors and a surface small enough to choose from reliably.",
    },
    {
      question: "How is an MCP server tested?",
      answer:
        "Two layers. Protocol conformance tests check the server against the MCP contract; per-tool contract tests pin each tool’s behaviour against the upstream API. Both run in CI, so drift fails a build instead of a user.",
    },
    {
      question: "Do you build servers for one team or for distribution?",
      answer:
        "Both. A single internal system gets a server scoped to one deployment. Products shipping MCP integrations to customers get versioned packaging, documented scopes and a conformance suite that gates each release.",
    },
  ],
  relatedProjects: ["shopify-growth-mcp", "servicenow-ultimate-mcp", "google-services-mcp", "ghl-devops-toolkit"],
  relatedArticles: ["mcp-servers-that-fail-in-production", "building-mcp-servers-for-ai-agents"],
  ctaHeading: "Want your system available to an AI client?",
  ctaBody:
    "Tell me which system, and what the agent should be able to do with it. Read-only access is where we start; writes earn their place with previews, scoping and audit logs.",
};
