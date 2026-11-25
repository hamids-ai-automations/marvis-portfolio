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
    slug: 'mcp-development',
    path: '/services/mcp-development/',
    serviceType: 'Model Context Protocol server development',
    nav: 'MCP Development',
    title: 'MCP servers that expose your systems safely',
    metaTitle: 'Model Context Protocol (MCP) Server Development',
    metaDescription:
      'Production MCP servers with typed tool schemas, permission scoping, and honest error surfaces. Connect Claude, Gemini, and other MCP clients to your real business systems.',
    eyebrow: 'Service 03',
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
    slug: 'python-automation',
    path: '/services/python-automation/',
    serviceType: 'Python automation and tooling',
    nav: 'Python Automation',
    title: 'Python tooling that replaces spreadsheets and copy-paste',
    metaTitle: 'Python Automation, Scripts and Internal Tooling',
    metaDescription:
      'Custom Python CLIs and pipelines for reporting, data reconciliation, and repetitive operations. Typed, tested, and documented so your team can run it without me.',
    eyebrow: 'Service 04',
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

  {
    slug: 'gohighlevel-automation',
    path: '/services/gohighlevel-automation/',
    serviceType: 'GoHighLevel (HighLevel) automation',
    nav: 'GoHighLevel Automation',
    title: 'GoHighLevel automation you can audit',
    metaTitle: 'GoHighLevel (HighLevel) API Automation and DevOps Tooling',
    metaDescription:
      'Contract-first GoHighLevel automation: reliable API clients, honest pagination, OAuth refresh that survives production, webhook debugging, and read-only CRM observability.',
    eyebrow: 'Service 05',
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
    slug: 'marketing-technology',
    path: '/services/marketing-technology/',
    serviceType: 'Marketing technology and measurement engineering',
    nav: 'Marketing Technology',
    title: 'Measurement infrastructure instead of marketing guesswork',
    metaTitle: 'Marketing Technology, Attribution and SEO Engineering',
    metaDescription:
      'Server-side conversion tracking, attribution routing, PPC waste detection, and technical SEO automation — built as engineering, measured against your own data.',
    eyebrow: 'Service 06',
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
];

/**
 * @param {string} slug
 */
export function getService(slug) {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}
