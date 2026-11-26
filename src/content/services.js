/**
 * Service landing pages.
 *
 * Copy rules for this file:
 *  - Claims must be demonstrable through the linked open-source projects.
 *  - No client names, no invented metrics, no testimonials.
 *  - One paragraph per idea; the layout handles the visual hierarchy.
 */

export const SERVICES = [
  {
    slug: 'ai-automation',
    path: '/services/ai-automation/',
    serviceType: 'AI automation engineering',
    nav: 'AI Automation',
    title: 'AI automation for operations that cannot afford silent failures',
    metaTitle: 'AI Automation Engineer for Business Operations',
    metaDescription:
      'Design and ship AI automation that replaces manual ops work: typed workflows, human approval gates, and audit trails. Built in Python and deployed against your real systems.',
    eyebrow: 'Service 01',
    lede: 'I replace repetitive operational work with automation that fails loudly, logs everything, and keeps a human in the loop where the risk lives.',
    intro: [
      'Most automation projects stall for the same reason: the happy path demos well, then production traffic finds the exceptions, the duplicate records, and the half-written API response. The result is a script nobody trusts, maintained by nobody.',
      'My approach is to treat automation as a small production system. Every step has a contract, every external call has a retry and a timeout, every irreversible action passes a gate, and the whole run leaves an audit trail you can read without opening the source.',
    ],
    problems: [
      {
        title: 'Automation that quietly half-works',
        body: 'A script that crashes is easy to find. A script that writes 80% of a record and reports success is expensive. I build idempotent steps and explicit failure states so bad data never looks like good data.',
      },
      {
        title: 'Nobody knows what the agent did',
        body: 'When an automated decision affects a customer, "the model decided" is not an answer. Every run emits a structured event log: input, chosen action, tool result, and approval reference.',
      },
      {
        title: 'Integrations that rot',
        body: 'APIs change, tokens expire, rate limits bite. Connectors are written with typed responses, pagination that terminates, and single-flight token refresh instead of a cron job that silently dies.',
      },
    ],
    deliverables: [
      { title: 'Workflow map', body: 'A written map of the current process, the decisions inside it, and the exact steps worth automating versus the ones worth deleting.' },
      { title: 'Working automation', body: 'Python services and CLIs with typed interfaces, structured logging, retries, and a documented environment contract.' },
      { title: 'Approval gates', body: 'Human-in-the-loop checkpoints for anything irreversible, wired to the channel your team already uses.' },
      { title: 'Runbook', body: 'How to deploy, how to read a failure, how to replay a batch, and what to check when a vendor changes an API.' },
    ],
    process: [
      { step: '01', title: 'Audit', body: 'We walk the process end to end and measure where time actually goes. Usually the biggest win is a step nobody needed.' },
      { step: '02', title: 'Contract', body: 'Inputs, outputs, and failure semantics get written down before code exists. This is the step that prevents rework.' },
      { step: '03', title: 'Build', body: 'Small vertical slices against real data, deployed behind a flag, with a dry-run mode by default.' },
      { step: '04', title: 'Harden', body: 'Retries, idempotency, rate limits, and observability added while the surface area is still small.' },
      { step: '05', title: 'Handover', body: 'Repository, runbook, and a recorded walkthrough. You own the code and the credentials.' },
    ],
    stack: ['Python', 'Pydantic', 'httpx', 'Playwright', 'Firebase', 'Google Apps Script', 'Docker'],
    useCases: [
      { title: "Operations teams drowning in manual steps", body: "Lead enrichment, routing, reporting, reconciliation — processes where someone rebuilds the same spreadsheet every week and one missed row quietly corrupts the month." },
      { title: "Agencies running multi-tool pipelines", body: "Forms, CRMs, ad platforms, and WhatsApp hand-offs wired together with scripts nobody owns. Consolidation into one typed, logged pipeline with approval gates." },
      { title: "Founders evaluating what to automate at all", body: "A short paid audit that maps the process, times each step, and says which parts earn automation — and which should be deleted instead." },
    ],
    proofSlugs: ['ai-marketing-growth-os', 'leadflow-sentinel', 'whatsapp-attribution-router'],
    faqs: [
      {
        question: 'Do you automate the whole process or just parts of it?',
        answer:
          'Whichever survives the audit. Automating a broken process makes the breakage faster. I will tell you which steps should be removed or kept manual before writing code.',
      },
      {
        question: 'How do you handle approvals for risky actions?',
        answer:
          'Irreversible actions — sending, deleting, paying, changing a live record — route through an explicit approval step with a payload preview. The default mode is a dry run.',
      },
      {
        question: 'What happens when an API changes?',
        answer:
          'Connectors are isolated behind typed adapters with contract tests, so a vendor change surfaces as a failing test rather than a silent data loss.',
      },
    ],
    cta: {
      heading: 'Have a process that eats hours every week?',
      body: 'Send me the steps and the tools involved on WhatsApp. I will tell you honestly whether automation is worth it.',
      message: 'Hi Muhammad, I want to discuss AI automation for a process in my business.',
    },
  },

  {
    slug: 'ai-agent-development',
    path: '/services/ai-agent-development/',
    serviceType: 'AI agent development and evaluation',
    nav: 'AI Agent Development',
    title: 'AI agents that are measured before they are trusted',
    metaTitle: 'AI Agent Development with Evaluation Harnesses',
    metaDescription:
      'Build LLM agents with tool calling, structured output, and a real evaluation suite. Offline-first harnesses, deterministic scoring, and CI gates before anything reaches users.',
    eyebrow: 'Service 02',
    useCases: [
      { title: "Teams shipping a first production agent", body: "A prototype exists; the evaluation harness, tool contracts, and regression suite do not. The gap between demo and dependable is exactly this work." },
      { title: "Products adding agent features that must not embarrass", body: "Extraction, triage, or drafting features where wrong output costs trust — gated by validation, budgets, and human review where the risk lives." },
      { title: "Platforms with agents already misbehaving", body: "Retry storms, silent partial failures, unbounded spend. An audit plus a harness that turns \"it feels flaky\" into a failing test with a name." },
    ],
    lede: 'I build agents the way you build software: with test suites, regression detection, and a clear answer to "how do we know it still works?"',
    intro: [
      'An agent is a program that chooses its own control flow, which makes it the hardest kind of program to test. Most agent projects skip the hard part: they demo a chain, ship it, and discover the failure modes in production.',
      'The fix is unglamorous. You collect a labelled set of realistic tasks, score every run against deterministic assertions, and refuse to ship a change that moves the score backwards. Tool selection, argument validity, refusal behaviour, and schema conformance are all measurable. I build that measurement layer first, then the agent on top of it.',
    ],
    problems: [
      {
        title: '"It worked yesterday"',
        body: 'Prompt and model changes move behaviour. Without a regression suite every deploy is a coin flip. I ship a harness that runs the same tasks offline and reports a diff.',
      },
      {
        title: 'Tool calls that look right',
        body: 'A model that calls the correct tool with a malformed argument is worse than one that refuses. Argument schemas get validated at the boundary, and violations are scored, not logged and ignored.',
      },
      {
        title: 'No cost or latency budget',
        body: 'Agents burn tokens through loops. Step limits, token budgets, and timeout policies are part of the design, not a post-incident patch.',
      },
    ],
    deliverables: [
      { title: 'Task suite', body: 'Labelled, realistic tasks per capability, with expected tool sequences and acceptable answers.' },
      { title: 'Scoring harness', body: 'Deterministic assertions over tool choice, arguments, output schema, and refusals; runnable locally and in CI.' },
      { title: 'Agent implementation', body: 'Typed tool definitions, provider abstraction, structured output validation, and explicit stopping conditions.' },
      { title: 'Regression report', body: 'Per-release accuracy, failure taxonomy, and the specific cases that changed.' },
    ],
    process: [
      { step: '01', title: 'Define capability', body: 'One narrow job with a clear success condition. Broad agents fail to evaluate.' },
      { step: '02', title: 'Collect cases', body: 'Real inputs, including the awkward ones: missing fields, hostile input, ambiguous intent.' },
      { step: '03', title: 'Build the harness', body: 'Offline runners, fixtures, and scoring before the prompt gets tuned.' },
      { step: '04', title: 'Implement', body: 'Tools, prompting, and guardrails, iterated against the suite rather than intuition.' },
      { step: '05', title: 'Gate releases', body: 'CI fails on accuracy regressions and schema violations.' },
    ],
    stack: ['Python', 'Gemini', 'OpenAI-compatible APIs', 'Pydantic v2', 'pytest', 'GitHub Actions'],
    proofSlugs: [
      'gemini-agent-reliability-kit',
      'gemini-agent-automation-toolkit',
      'ai-agent-testing-lab',
    ],
    faqs: [
      {
        question: 'Which models do you work with?',
        answer:
          'Provider-agnostic. The harness and tool layer stay stable while the model is a configuration value. Most of my published work is Gemini and OpenAI-compatible endpoints through a shared abstraction.',
      },
      {
        question: 'Can you evaluate an agent we already built?',
        answer:
          'Yes, and that is often the fastest way to find out why it behaves inconsistently. I start by building the suite against your current implementation, then report the failure taxonomy before proposing changes.',
      },
      {
        question: 'Do we need a vector database?',
        answer:
          'Only if the task needs retrieval over a corpus that does not fit in context. Most business agents need reliable tool calls, not RAG. I will say so if retrieval is not the bottleneck.',
      },
    ],
    cta: {
      heading: 'Shipping an agent without a test suite?',
      body: 'Describe the task and the tools it needs. I will scope the evaluation layer and the build.',
      message: 'Hi Muhammad, I want to build or evaluate an AI agent and need help with the design.',
    },
  },

  {
    slug: 'gemini-development',
    path: '/services/gemini-development/',
    serviceType: 'Gemini AI development',
    nav: 'Gemini Development',
    title: 'Gemini AI development with the reliability layer the quickstart skips',
    metaTitle: 'Gemini AI Development Services — Google Gemini API',
    metaDescription:
      'Build production features on the Google Gemini API: typed function calling, validated structured output, cost budgets, and evals that gate every release.',
    eyebrow: 'Service 03',
    lede: 'I build Gemini-powered features in Python and TypeScript with the parts the quickstart leaves out: output schemas, tool contracts, budgets, and a suite that gates releases.',
    intro: [
      'The Gemini quickstart gets you a working API call in an afternoon. What it does not get you is the layer that makes the feature safe to own: what happens when the model returns malformed JSON, when a function call arrives with half its arguments, or when token spend doubles because a loop stopped terminating. That layer is the difference between a demo and a feature your team can maintain.',
      'I build Gemini integrations as ordinary production code. Tool declarations are typed, responses are validated against a schema with a repair path before they reach your database, and every change runs against a labelled task suite offline — so a model upgrade or a prompt edit shows up as a score diff in CI, not as a support ticket. Latency and cost get report cards, not guesses.',
    ],
    problems: [
      {
        title: 'Structured output that is only mostly structured',
        body: 'The model promises JSON; production traffic sends prose with braces in it. Responses are parsed against a typed schema at the boundary, and failures go through a repair path before they become bad rows in your database.',
      },
      {
        title: 'Function calling without contracts',
        body: 'A tool call with a plausible argument and the wrong shape is worse than a refusal. Arguments are validated at the boundary, violations are scored in the suite, and the model receives errors it can act on.',
      },
      {
        title: 'No idea what the feature costs',
        body: 'Token spend should be a meter, not a mystery. Step and token budgets stop runaway loops, retry telemetry explains the rest, and the evaluation report includes latency and cost per task.',
      },
    ],
    deliverables: [
      { title: 'Integration blueprint', body: 'What the feature may call, what it must never call, response schemas, failure semantics, and the budget it has to live inside — written before implementation.' },
      { title: 'Working Gemini integration', body: 'A Python or TypeScript service with typed tool declarations, validated structured output, retry policies, and structured execution logs.' },
      { title: 'Evaluation suite', body: 'A labelled task suite with deterministic scoring for tool choice and argument validity, runnable offline and wired into CI.' },
      { title: 'Cost and latency report', body: 'Per-task token usage, retry telemetry, and step counts, so releases are gated on cost as well as correctness.' },
    ],
    process: [
      { step: '01', title: 'Scope the feature', body: 'What the model is responsible for and what stays in ordinary code. The narrowest Gemini surface that solves the problem is the one that ships.' },
      { step: '02', title: 'Define contracts', body: 'Tool declarations, response schemas, and failure semantics written down before the first API call.' },
      { step: '03', title: 'Build the harness', body: 'Labelled tasks and deterministic scoring, so the integration is measured from the first day it runs.' },
      { step: '04', title: 'Implement and iterate', body: 'Typed tools, validation with repair paths, budgets, and logs — tuned against the suite, not intuition.' },
      { step: '05', title: 'Gate and hand over', body: 'CI blocks regressions in correctness and in cost. You get the repository, the suite, and the runbook.' },
    ],
    stack: ['Python', 'TypeScript', 'Google Gemini API', 'google-genai SDK', 'Pydantic', 'JSON Schema', 'pytest', 'GitHub Actions', 'Firebase', 'Docker'],
    proofSlugs: ['gemini-agent-reliability-kit', 'gemini-agent-automation-toolkit', 'firebase-ai-starter-kit'],
    useCases: [
      { title: 'SaaS teams adding a Gemini feature', body: 'You have a product and a backlog item that reads "add AI". The work is wiring Gemini into contracts you already own — schemas, validation, budgets — without turning the codebase into a prompt repository.' },
      { title: 'Teams shipping their first tool-using agent', body: 'An agent that reads context and calls tools is the classic Gemini use case. The engagement covers typed tool registration, approval gates for risky steps, and execution logs that make the agent reviewable.' },
      { title: 'Product owners watching the bill', body: 'Gemini pricing is cheap until a loop does not terminate. Step and token budgets, retry telemetry, and per-task cost reporting make spend a design decision instead of a surprise.' },
    ],
    faqs: [
      {
        question: 'Do you work with multimodal input — images, PDFs, audio?',
        answer:
          'When the task needs it, yes. The same rules apply: input types are part of the contract, and the fixture suite includes the malformed files that break naive pipelines.',
      },
      {
        question: 'We already have a Gemini prototype. Can you productionise it?',
        answer:
          'That is a common engagement. I write down the contracts your prototype implies, build the task suite around its current behaviour, and fix what the suite exposes — in that order.',
      },
      {
        question: 'What happens when Google ships a new model version?',
        answer:
          'The model is a configuration value, not an import. Switching versions is a one-line change; whether it is safe to ship is answered by re-running the suite, not by hoping.',
      },
    ],
    cta: {
      heading: 'Building on the Gemini API?',
      body: 'Tell me the feature and where it breaks today. I will tell you what the reliability layer looks like for your case.',
      message: 'Hi Muhammad, I want to build a feature on the Google Gemini API and need it production-ready.',
    },
  },

  {
    slug: 'llm-application-development',
    path: '/services/llm-application-development/',
    serviceType: 'LLM application development',
    nav: 'LLM Applications',
    title: 'LLM features with tests, budgets, and a model you can swap',
    metaTitle: 'LLM Application Development — Production AI Features',
    metaDescription:
      'Ship LLM features into an existing product: tested prompt pipelines, schema-validated output, caching, cost budgets, and graceful degradation on failure.',
    eyebrow: 'Service 04',
    lede: 'I ship LLM-powered features into existing products: extraction, classification, and generation with schemas, tests, cost budgets, and fallbacks, so the model is a component rather than a single point of failure.',
    intro: [
      'Most products do not need an autonomous agent. They need a feature: extract these fields, classify this ticket, draft this reply, summarise this thread. The failure pattern is always the same — it works on the demo inputs, then real traffic arrives with attachments, mixed languages, and cases that look nothing like the examples, and output quality quietly degrades.',
      'I build these features the way I build everything else. Prompts live in version control with fixture-driven tests over realistic inputs. Output is validated against a typed schema, with a defined repair and rejection path before anything reaches the database. The provider sits behind an interface, so the model is configuration, not architecture. Caching and cost budgets are set before launch, and when the model fails, the feature degrades to a known-good path instead of throwing.',
    ],
    problems: [
      {
        title: 'Prompt changes break things silently',
        body: 'A prompt is a program nobody reviewed. Prompts and schemas are versioned together, and every change runs the fixture suite before it reaches production.',
      },
      {
        title: 'Free text flowing into typed systems',
        body: 'Model prose does not belong in a structured column. Every output passes schema validation, so a bad generation becomes a rejected request instead of a bad record.',
      },
      {
        title: 'One provider outage becomes a product outage',
        body: 'The model sits behind an abstraction with timeouts, retries, and a fallback path. When the API degrades, the feature degrades to something users can still use.',
      },
    ],
    deliverables: [
      { title: 'Feature specification', body: 'The task, the input distribution, the output schema, and the fallback when the model fails — agreed before any prompt is written.' },
      { title: 'Prompt pipeline', body: 'Versioned prompts, fixture-driven tests, schema validation with repair paths, and caching where inputs repeat.' },
      { title: 'Provider abstraction', body: 'The model behind one interface, so switching or adding providers is configuration rather than a rewrite.' },
      { title: 'Observability', body: 'Structured logs per request — latency, tokens, validation outcomes, and fallback hits — so quality drift is visible before users complain.' },
    ],
    process: [
      { step: '01', title: 'Define the task', body: 'Extraction, classification, or generation — with the output schema and the failure fallback written down first.' },
      { step: '02', title: 'Collect fixtures', body: 'Real inputs with the mess left in: the ambiguous, the malformed, and the adversarial.' },
      { step: '03', title: 'Build the pipeline', body: 'Prompts, validation, caching, and budgets, tested against fixtures from the first commit.' },
      { step: '04', title: 'Add the fallbacks', body: 'Timeouts, retries, and the degraded path users hit when the model is unavailable or over budget.' },
      { step: '05', title: 'Ship and observe', body: 'Deploy behind a flag, watch the validation and drift numbers, then hand over the suite and the runbook.' },
    ],
    stack: ['Python', 'TypeScript', 'Gemini API', 'google-genai SDK', 'OpenAI-compatible APIs', 'Pydantic v2', 'JSON Schema', 'pytest', 'GitHub Actions', 'Firebase'],
    proofSlugs: ['gemini-agent-automation-toolkit', 'ai-agent-testing-lab', 'gemini-agent-reliability-kit'],
    useCases: [
      { title: 'Product teams shipping their first AI feature', body: 'You have users, a roadmap, and a ticket that says "AI". The deliverable is a feature held to the same standard as the rest of the codebase: tested, reviewed, and observable.' },
      { title: 'Teams replacing a fragile prompt hack', body: 'A prompt pasted into production months ago, maintained by whoever remembers it. The work is extracting the contract it implies, adding validation, and making it maintainable before it breaks.' },
      { title: 'Platforms preparing for model churn', body: 'Model prices and capabilities move quarterly. Provider abstraction keeps the model a configuration value, so the next switch is a release and a test run, not a project.' },
    ],
    faqs: [
      {
        question: 'How is this different from agent development?',
        answer:
          'Agents choose their own control flow across many steps. This service covers features with a fixed shape — extract, classify, generate — where the model is one step in a deterministic pipeline. Many products need exactly this and nothing more.',
      },
      {
        question: 'Can you add LLM features to an existing codebase?',
        answer:
          'That is the default engagement. The model layer arrives as a module with typed interfaces and its own tests, not as a rewrite of your application.',
      },
      {
        question: 'How do you keep costs predictable?',
        answer:
          'Caching where inputs repeat, token budgets per request, and per-feature cost visibility in the logs. Spend becomes a monitored number instead of an end-of-month surprise.',
      },
    ],
    cta: {
      heading: 'Have a feature that needs a model in it?',
      body: 'Describe the input and the output you need. I will tell you whether it needs an LLM at all — sometimes it needs a parser.',
      message: 'Hi Muhammad, I want to add an LLM-powered feature to my product.',
    },
  },

  {
    slug: 'mcp-development',
    path: '/services/mcp-development/',
    serviceType: 'Model Context Protocol server development',
    nav: 'MCP Development',
    title: 'MCP servers that expose your systems safely',
    metaTitle: 'Model Context Protocol (MCP) Server Development',
    metaDescription:
      'Production MCP servers with typed tool schemas, permission scoping, and honest error surfaces. Connect Claude, Gemini, and other MCP clients to your real business systems.',
    eyebrow: 'Service 05',
    useCases: [
      { title: "Teams bringing AI clients to internal systems", body: "CRM, ERP, ticketing, or inventory exposed as MCP tools with typed schemas, permission gating, and audit logs — read-only until write access earns trust." },
      { title: "SaaS products shipping MCP integrations", body: "Your product becomes a tool surface that Claude, Cursor, and other MCP clients can operate safely, with conformance tests before release." },
      { title: "Agencies automating client stacks", body: "One MCP server that bridges the client's systems to agent workflows, deployed per client with scoped credentials and rollback." },
    ],
    lede: 'The Model Context Protocol is how agents touch real systems. I build servers that are safe to point at production data.',
    intro: [
      'MCP turns a pile of internal APIs into a tool surface an agent can reason about. The protocol is simple; the hard parts are schema design, permission boundaries, and making failures legible to a model that will otherwise retry the wrong thing forever.',
      'I design tool surfaces the way I design APIs for humans: narrow verbs, explicit arguments, pagination that actually terminates, and errors that say what to do next. Read-only by default, writes behind explicit scoping, and a conformance test that runs the server against the protocol contract.',
    ],
    problems: [
      {
        title: 'Too many tools, too little meaning',
        body: 'A one-to-one wrapper around every endpoint gives the model a haystack. Tools get consolidated around user intent, with parameters that carry their own constraints.',
      },
      {
        title: 'Write access with no boundary',
        body: 'Read and write scopes are separated at the server level. Destructive verbs require explicit opt-in and return a preview before committing.',
      },
      {
        title: 'Errors a model cannot recover from',
        body: 'Stack traces in tool results teach an agent to retry blindly. Errors are typed, actionable, and bounded: what failed, why, and whether retrying can help.',
      },
    ],
    deliverables: [
      { title: 'Tool specification', body: 'Every tool documented with intent, arguments, side effects, and rate limits before implementation.' },
      { title: 'Server implementation', body: 'stdio and HTTP transports, JSON Schema validation, structured logging, and configurable scopes.' },
      { title: 'Conformance tests', body: 'Protocol-level tests plus per-tool contract tests that fail when an upstream API drifts.' },
      { title: 'Client setup guide', body: 'Exact configuration for Claude Desktop, IDE clients, or your own agent runtime.' },
    ],
    process: [
      { step: '01', title: 'System map', body: 'What the agent needs to read, what it may write, and where the blast radius is.' },
      { step: '02', title: 'Tool design', body: 'Consolidate endpoints into intent-shaped tools; drop the ones that only exist because the UI needed them.' },
      { step: '03', title: 'Implementation', body: 'Typed schemas, transport wiring, auth, and structured errors.' },
      { step: '04', title: 'Verification', body: 'Conformance and contract tests, plus a manual run against a real client.' },
      { step: '05', title: 'Distribution', body: 'Packaging, versioning, and a README a stranger can install from.' },
    ],
    stack: ['Python', 'TypeScript', 'MCP SDK', 'JSON Schema', 'Pydantic', 'OAuth 2.0'],
    proofSlugs: [
      'shopify-growth-mcp',
      'servicenow-ultimate-mcp',
      'google-services-mcp',
      'ghl-devops-toolkit',
    ],
    faqs: [
      {
        question: 'Which MCP clients does this work with?',
        answer:
          'Any client that speaks the protocol: Claude Desktop, IDE-integrated clients, and custom agent runtimes. Transports are stdio and streamable HTTP.',
      },
      {
        question: 'Can you expose an internal API that has no documentation?',
        answer:
          'Yes. Reverse-engineering an undocumented internal API is common work: I map the real behaviour from traffic and build the tool surface from observed contracts, not from the docs that do not exist.',
      },
      {
        question: 'Is it safe to give a model write access?',
        answer:
          'Only with scoping and previews. Default deployments are read-only; write tools are opt-in per session with an explicit confirmation path for destructive actions.',
      },
    ],
    cta: {
      heading: 'Want your system available to an AI client?',
      body: 'Tell me which system and what the agent should be able to do with it.',
      message: 'Hi Muhammad, I need an MCP server built for a system I use.',
    },
  },

  {
    slug: 'gohighlevel-automation',
    path: '/services/gohighlevel-automation/',
    serviceType: 'GoHighLevel (HighLevel) automation',
    nav: 'GoHighLevel Automation',
    title: 'GoHighLevel automation you can audit',
    metaTitle: 'GoHighLevel API Automation and DevOps Tooling',
    metaDescription:
      'Contract-first GoHighLevel automation: reliable API clients, honest pagination, OAuth refresh that survives production, webhook debugging, and read-only CRM observability.',
    eyebrow: 'Service 06',
    lede: 'HighLevel is powerful and under-documented. I build the tooling layer that makes its API predictable.',
    intro: [
      'GoHighLevel agencies hit the same wall: the platform does most of what they need, but the API is where automation either becomes reliable or becomes a support ticket generator. Pagination that hides records, OAuth tokens that expire mid-batch, webhooks that fire twice.',
      'I build against the API as a contract: every endpoint wrapped with explicit pagination semantics, single-flight token refresh, retry policies that respect rate limits, and an observability layer that answers "is this location healthy?" without opening the UI.',
    ],
    problems: [
      {
        title: 'Silent truncation',
        body: 'A paginated call that stops early looks like a complete dataset. Pagination is explicit and terminates on a documented condition, with a record count assertion.',
      },
      {
        title: 'Token refresh races',
        body: 'Parallel workers refreshing the same token invalidate each other. Refresh is single-flight and shared across the process.',
      },
      {
        title: 'Duplicate webhook processing',
        body: 'Webhooks retry. Handlers are idempotent, keyed on event identity, with a dead-letter path for the ones that fail permanently.',
      },
    ],
    deliverables: [
      { title: 'Typed API client', body: 'A documented wrapper over the endpoints you actually use, with pagination and rate-limit handling built in.' },
      { title: 'Observability report', body: 'Read-only health findings across locations: broken workflows, stale pipelines, configuration drift.' },
      { title: 'Webhook pipeline', body: 'Idempotent ingestion with replay and dead-letter handling.' },
      { title: 'Runbook', body: 'Credential rotation, failure recovery, and what to check when HighLevel ships a change.' },
    ],
    process: [
      { step: '01', title: 'Map the account', body: 'Locations, pipelines, and workflows, read-only. No changes before the map exists.' },
      { step: '02', title: 'Find the gaps', body: 'Where automation is silently failing: stale opportunities, duplicate contacts, dead workflows.' },
      { step: '03', title: 'Build the client', body: 'Typed, paginated, rate-limit aware, with observable token lifecycle.' },
      { step: '04', title: 'Automate selectively', body: 'Only the workflows with a clear definition of correct.' },
      { step: '05', title: 'Operate', body: 'Monitoring, alerts, and a documented recovery path.' },
    ],
    stack: ['Python', 'TypeScript', 'HighLevel API v2', 'OAuth 2.0', 'Cloudflare Workers', 'Firebase'],
    useCases: [
      { title: "Agencies at the workflow-builder ceiling", body: "HighLevel workflows handle the happy path; the API v2 takes over for bulk operations, custom routing logic, and anything with real error handling." },
      { title: "Ops teams burning hours on contact hygiene", body: "Deduplication, merging, custom-field sync, and pipeline reconciliation across locations — done with idempotent scripts instead of manual sweeps." },
      { title: "Agencies whose webhooks misfire silently", body: "Duplicate processing, token refresh races, truncated imports. A read-only audit first, then the tooling layer that makes it predictable." },
    ],
    proofSlugs: ['ghl-automation-engine', 'ghl-devops-toolkit', 'leadflow-sentinel'],
    faqs: [
      {
        question: 'Do you work inside the HighLevel marketplace as an app?',
        answer:
          'I build internal tooling and standalone integrations against the public API. Marketplace app distribution is a separate process I can scope if you need it.',
      },
      {
        question: 'Can you fix an existing broken automation?',
        answer:
          'Yes. The read-only audit usually locates the failure in hours: truncation, token expiry, or a workflow condition that no longer matches the data.',
      },
      {
        question: 'Read-only or write access?',
        answer:
          'Audits start read-only. Write operations are added per workflow with explicit scoping and a dry-run mode, because CRM damage is expensive and hard to reverse.',
      },
    ],
    cta: {
      heading: 'Automation in HighLevel not behaving?',
      body: 'Tell me what it should do and what it does instead. I will start with a read-only audit.',
      message: 'Hi Muhammad, I need help with GoHighLevel automation or an API integration.',
    },
  },

  {
    slug: 'ai-security-engineering',
    path: '/services/ai-security-engineering/',
    serviceType: 'AI application security engineering',
    nav: 'AI Security',
    title: 'AI security engineering for features that touch real systems',
    metaTitle: 'AI Application Security — LLM Security Engineering',
    metaDescription:
      'AI security engineering: key management, permission-gated tools, read-only defaults, rate limits, secrets hygiene, and scanner output CI can trust.',
    eyebrow: 'Service 07',
    lede: 'I make AI features safe to point at production: keys behind authenticated boundaries, permission-gated tools, read-only defaults, and abuse controls before launch.',
    intro: [
      'AI features fail in ways conventional features do not. A model key shipped to the browser becomes an API budget for whoever finds it. An agent with write access to a workspace becomes a compliance incident. A prompt endpoint without rate limiting becomes a bill. None of this is exotic — it is the standard gap between a prototype and something a security review would pass.',
      'My MCP work is permission-gated automation: read-only by default, writes behind explicit scopes, and audit logs that answer who did what. The same discipline applies at the application layer — model keys stay behind authenticated callable functions with App Check enforced, environment configuration is validated at startup without ever printing values, and the scanner output your pipeline consumes is itself verified against a schema before it gates a release.',
    ],
    problems: [
      {
        title: 'Model keys in the wrong place',
        body: 'A Gemini key in a client bundle is a shared credit card. Keys live behind authenticated server boundaries with App Check and rate limiting in front of the model call.',
      },
      {
        title: 'Agents with more access than the task needs',
        body: 'Read and write are separate scopes. Deployments start read-only, destructive verbs are opt-in with a preview, and every tool call lands in an audit log.',
      },
      {
        title: 'Secrets drift and scanner output misleads',
        body: 'Environments are validated against a declared contract that reports presence and shape, never values. SARIF scanner reports are verified against the schema before a pipeline acts on them, so a format error cannot impersonate a finding.',
      },
    ],
    deliverables: [
      { title: 'Security review', body: 'Where the keys live, what the agent can touch, which endpoints are exposed, and where the blast radius is — written findings with concrete fixes.' },
      { title: 'Hardened boundaries', body: 'Callable function wrappers with App Check and auth enforcement, per-user rate limiting, and input validation before the model is called.' },
      { title: 'Permission model', body: 'Read-only defaults, gated write scopes, preview-before-commit on destructive actions, and audit logging per tool call.' },
      { title: 'Pipeline trust layer', body: 'Environment contract checks and SARIF validation in CI, so configuration errors and malformed scanner output fail loudly with precise locations.' },
    ],
    process: [
      { step: '01', title: 'Audit', body: 'Map the keys, scopes, endpoints, and write paths the AI feature touches today. Read-only; nothing changes.' },
      { step: '02', title: 'Define boundaries', body: 'What the feature may read, what it may write, and which actions require a human — written down as a contract.' },
      { step: '03', title: 'Read-only build', body: 'The feature runs end to end against production data with no write capability at all.' },
      { step: '04', title: 'Guarded write access', body: 'Write scopes added per action, behind gates, rate limits, and audit logs.' },
      { step: '05', title: 'Handover', body: 'Runbook, credential rotation procedures, and the CI checks that keep the guarantees from drifting.' },
    ],
    stack: ['Python', 'TypeScript', 'Firebase', 'App Check', 'MCP', 'JSON Schema', 'SARIF 2.1.0', 'Pydantic', 'GitHub Actions', 'Docker'],
    proofSlugs: ['envscope', 'sarif-verify', 'firebase-ai-starter-kit', 'google-services-mcp'],
    useCases: [
      { title: 'Platform teams hardening AI features', body: 'You shipped the prototype and the security review is coming. The work: move keys behind real boundaries, gate the writes, and make the logs answer questions.' },
      { title: 'Teams shipping AI behind Firebase', body: 'Callable functions with App Check enforced, per-user rate limits, and typed clients — the hardened pattern applied to your feature instead of retrofitting abuse controls after the first bill.' },
      { title: 'Agencies automating client systems', body: 'Automation that touches a client CRM, workspace, or ads account needs permission gating and audit trails by default. Read-only until a specific write proves itself.' },
    ],
    faqs: [
      {
        question: 'Can you secure an AI feature we already shipped?',
        answer:
          'Yes, and that is often the fastest engagement. The audit locates the real exposure — a key in the client, an ungated write path, an endpoint without limits — and the fixes are scoped per finding.',
      },
      {
        question: 'Do you do red-teaming and adversarial testing?',
        answer:
          'Adversarial inputs are part of my evaluation work: hostile prompts and malformed arguments are fixtures in the test suite. Broader organisational red-teaming is a separate discipline, and I will say so rather than stretch the scope.',
      },
      {
        question: 'Is read-only actually useful?',
        answer:
          'It is enough to be valuable: reporting, monitoring, search, and summarisation all read. Writes are added per action once the read path is proven, with previews and audit logs attached.',
      },
    ],
    cta: {
      heading: 'AI feature due for a security review?',
      body: 'Describe the feature and where its keys and write paths live today. I will start with a read-only audit.',
      message: 'Hi Muhammad, I need help making an AI feature safe to ship.',
    },
  },

  {
    slug: 'marketing-technology',
    path: '/services/marketing-technology/',
    serviceType: 'Marketing technology and measurement engineering',
    nav: 'Marketing Technology',
    title: 'Measurement infrastructure instead of marketing guesswork',
    metaTitle: 'Marketing Technology, Attribution and SEO Engineering',
    metaDescription:
      'Server-side conversion tracking, attribution routing, PPC waste detection, and technical SEO automation — built as engineering, measured against your own data.',
    eyebrow: 'Service 08',
    useCases: [
      { title: "Growth teams whose numbers get challenged", body: "Conversion tracking, server-side tagging, and attribution that the finance team and the ad platforms can both live with — instrumented, not asserted." },
      { title: "Agencies proving ROI to retained clients", body: "Reporting pipelines that reconcile platform data with CRM reality, so the monthly review is about decisions rather than whose spreadsheet is right." },
      { title: "E-commerce teams leaking spend", body: "Waste audits and long-tail analysis on Google and Meta accounts, with the tracking fixes that make the next audit trustworthy." },
    ],
    lede: 'Eight years in growth taught me the real bottleneck: the numbers are wrong, and nobody can prove it.',
    intro: [
      'Ad platforms are optimistic. Analytics is lossy. When the two disagree, budget decisions get made on whichever dashboard the person in the room trusts. Fixing measurement is engineering work: event contracts, server-side collection, attribution logic that survives iOS, and audits that produce a list of concrete fixes.',
      'My background is digital marketing leadership, and my day-to-day is now automation engineering. That combination means I do not just build the pipeline — I know which questions the pipeline has to answer, and which reports people will actually act on.',
    ],
    problems: [
      {
        title: 'Conversion data you cannot defend',
        body: 'Client-side tags lose events to blockers, consent, and browser policy. Server-side collection with a deduplicated event contract gives you a number you can reconcile.',
      },
      {
        title: 'Attribution that credits the wrong channel',
        body: 'Lead-source capture, UTM discipline, and WhatsApp/offline conversions routed into the CRM instead of dying in a spreadsheet.',
      },
      {
        title: 'Spend leaking in the long tail',
        body: 'Waste detection on search terms, placements, and audiences, with the output written as a change list rather than a dashboard nobody opens.',
      },
    ],
    deliverables: [
      { title: 'Measurement audit', body: 'Event coverage, duplication, consent handling, and platform-versus-analytics reconciliation.' },
      { title: 'Tracking implementation', body: 'Server-side GA4 and Meta CAPI gateway with deduplication and privacy controls.' },
      { title: 'Attribution pipeline', body: 'Lead source capture through to CRM with UTM normalisation and offline conversion feedback.' },
      { title: 'Reporting', body: 'A small number of decision-grade reports, automated, with definitions written down.' },
    ],
    process: [
      { step: '01', title: 'Reconcile', body: 'Platform numbers against analytics against CRM. The gaps tell you where to work.' },
      { step: '02', title: 'Design events', body: 'A small, named event contract with owners and meanings.' },
      { step: '03', title: 'Implement', body: 'Server-side collection, dedupe keys, consent handling, and QA in debug mode.' },
      { step: '04', title: 'Verify', body: 'End-to-end test purchases and form submissions traced from click to CRM record.' },
      { step: '05', title: 'Automate reporting', body: 'Scheduled reports that update themselves and flag anomalies.' },
    ],
    stack: ['GA4', 'Google Tag Manager', 'Meta CAPI', 'Google Ads API', 'Search Console API', 'BigQuery', 'Python'],
    proofSlugs: [
      'conversionbridge',
      'ppc-waste-detector',
      'meta-lead-quality-analyzer',
      'ai-search-visibility-auditor',
      'geo-visibility-lab',
    ],
    faqs: [
      {
        question: 'Is this a marketing retainer or a build engagement?',
        answer:
          'Primarily a build engagement: I implement the measurement layer and the automation, then hand it over. Ongoing retainers exist for teams that want continuous iteration.',
      },
      {
        question: 'Do you run ad campaigns?',
        answer:
          'No. I build the measurement and automation around campaigns. That separation keeps the reporting honest.',
      },
      {
        question: 'Will this work with our existing stack?',
        answer:
          'The implementations are stack-agnostic at the edges: GA4, GTM, Meta, Google Ads, Search Console, and any CRM with an API. Nothing requires you to migrate platforms.',
      },
    ],
    cta: {
      heading: 'Do your numbers reconcile?',
      body: 'Send the platform numbers and your analytics export on WhatsApp. The gap is usually diagnosable in one pass.',
      message: 'Hi Muhammad, I want to fix tracking and attribution for my marketing.',
    },
  },

  {
    slug: 'python-automation',
    path: '/services/python-automation/',
    serviceType: 'Python automation and tooling',
    nav: 'Python Automation',
    title: 'Python tooling that replaces spreadsheets and copy-paste',
    metaTitle: 'Python Automation, Scripts and Internal Tooling',
    metaDescription:
      'Custom Python CLIs and pipelines for reporting, data reconciliation, and repetitive operations. Typed, tested, and documented so your team can run it without me.',
    eyebrow: 'Service 09',
    useCases: [
      { title: "Teams with critical logic in a spreadsheet", body: "Pricing, payouts, reconciliation — moved into tested CLI tools with typed inputs, CI runs, and output you can defend in a meeting." },
      { title: "Dev teams missing boring but vital tooling", body: "Environment checks, SARIF validation, release hygiene: small utilities that fail loudly in CI instead of mysteriously in production." },
      { title: "Anyone maintaining scripts only one person can run", body: "Documentation, tests, and packaging so the tool survives its author's vacation — or their departure." },
    ],
    lede: 'Small, sharp command-line tools that do one job correctly, run in CI, and stop being a tax on your week.',
    intro: [
      'Not every problem needs an agent or a platform. A surprising amount of operational drag is a missing script: reconciling two exports, validating a batch before upload, turning a folder of reports into one number.',
      'I build these as real tools: a typed interface, a dry-run mode, a fixture-based test suite, and a README that explains the one command that matters. No notebooks left running on a laptop, no credentials pasted into a cell.',
    ],
    problems: [
      {
        title: 'Critical logic living in a spreadsheet',
        body: 'A workbook that three people maintain by hand is a single point of failure. It becomes a versioned program with tests and an explicit input contract.',
      },
      {
        title: 'Secrets in the wrong place',
        body: 'Config is read from the environment and validated at startup. Nothing sensitive is printed, logged, or committed.',
      },
      {
        title: 'Tools nobody else can run',
        body: 'If only the author can run it, it is a liability. Every deliverable includes setup instructions and safe defaults for a first run.',
      },
    ],
    deliverables: [
      { title: 'CLI or service', body: 'A single entry point with help text, validation, and predictable exit codes.' },
      { title: 'Test suite', body: 'Fixture-driven tests covering the shapes of data that actually occur, including malformed input.' },
      { title: 'CI pipeline', body: 'Lint, type-check, and test on every push; a tagged release when it matters.' },
      { title: 'Documentation', body: 'Install, configure, run, and troubleshoot — written for the person who inherits it.' },
    ],
    process: [
      { step: '01', title: 'Sample data', body: 'Real inputs, with the mess left in. Fixtures are built from them.' },
      { step: '02', title: 'Contract', body: 'Define the command, its flags, and what it writes where.' },
      { step: '03', title: 'Build and test', body: 'Implementation against fixtures, with a dry-run default.' },
      { step: '04', title: 'Package', body: 'Pinned dependencies, a clean entry point, and a reproducible install.' },
      { step: '05', title: 'Hand over', body: 'Walkthrough recording plus the runbook.' },
    ],
    stack: ['Python 3.12', 'Typer / argparse', 'Pydantic v2', 'pytest', 'ruff', 'mypy', 'GitHub Actions'],
    proofSlugs: ['envscope', 'searchpulse-ai', 'conversion-tracking-doctor', 'sarif-verify'],
    faqs: [
      {
        question: 'Can you take over a messy existing script?',
        answer:
          'Yes. The usual path is: characterise what it actually does today, add tests around the behaviour worth keeping, then refactor in place so nothing breaks mid-flight.',
      },
      {
        question: 'Do you build GUIs?',
        answer:
          'Only when the user genuinely will not use a terminal. A CLI plus a scheduled job covers most operational needs and costs far less to maintain.',
      },
      {
        question: 'Where does it run?',
        answer:
          'Locally, on a server, or in CI. Deployment follows whatever your team already operates — I avoid introducing new infrastructure for a script.',
      },
    ],
    cta: {
      heading: 'Still doing it by hand every week?',
      body: 'Describe the task and the files involved. Most of these tools take days, not months.',
      message: 'Hi Muhammad, I need a Python tool to automate a repetitive task.',
    },
  },
];

/**
 * @param {string} slug
 */
export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}
