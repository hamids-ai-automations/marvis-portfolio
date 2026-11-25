/**
 * Site-wide editorial copy: home page and about page.
 * Numbers are injected from the master record at build time — never hardcoded.
 */

export const HOME = {
  seoTitle: 'Muhammad Hamid — AI Automation Engineer | MCP, Agents, Python',
  eyebrow: 'AI Automation Engineer · Lahore, Pakistan',
  headline: 'I build the automation layer between AI models and real business systems.',
  standfirst:
    'Open-source MCP servers, evaluated AI agents, and Python tooling that runs against production data. Eight years in growth marketing taught me what breaks; the last two have been spent building the infrastructure that stops it.',
  primaryCta: { label: 'Start on WhatsApp', href: 'whatsapp' },
  secondaryCta: { label: 'See the work', href: '/projects/' },
  proofPoints: [
    { label: 'Published repositories', value: 'repos' },
    { label: 'Technologies in active use', value: 'tech' },
    { label: 'Contributions this year', value: 'contributions' },
  ],
  sections: {
    capabilities: {
      eyebrow: 'What I do',
      heading: 'Six ways I get involved',
      body: 'Most engagements start with one of these and expand as the system around it becomes visible.',
    },
    work: {
      eyebrow: 'Selected work',
      heading: 'Repositories, not case studies',
      body: 'Everything below is public. Read the code, check the commit history, decide for yourself.',
      cta: { label: 'All projects', href: '/projects/' },
    },
    principles: {
      eyebrow: 'How I work',
      heading: 'Four rules that shape every build',
      items: [
        {
          number: '01',
          title: 'Fail loudly, never silently',
          body: 'A pipeline that reports success on partial data is more dangerous than one that crashes. Explicit failure states, typed errors, and structured logs are not optional extras.',
        },
        {
          number: '02',
          title: 'Measure before trusting',
          body: 'Agents and automations ship with an evaluation suite. If I cannot demonstrate that a change did not regress behaviour, the change does not ship.',
        },
        {
          number: '03',
          title: 'Read-only until proven',
          body: 'Audits and first deployments run without write access. Writes are added per workflow, with previews and approval gates where the risk actually lives.',
        },
        {
          number: '04',
          title: 'Hand over something operable',
          body: 'You get the repository, the runbook, and a recorded walkthrough. The goal is a system your team can run without me on retainer.',
        },
      ],
    },
    stack: {
      eyebrow: 'Tooling',
      heading: 'What the work is built with',
      body: 'Chosen for durability rather than novelty: typed Python, explicit schemas, and infrastructure your team already operates.',
    },
    contact: {
      eyebrow: 'Contact',
      heading: 'One channel, and it is WhatsApp',
      body: 'WhatsApp is the fastest route. The project brief on the contact page takes two minutes and opens WhatsApp with your answers already written out.',
      note: 'Typically replies within one working day, Pakistan time (UTC+5).',
    },
  },
};

export const ABOUT = {
  metaTitle: 'About Muhammad Hamid — from growth marketing to AI automation',
  metaDescription:
    'Eight years leading digital growth, now building AI automation engineering: MCP servers, agent evaluation harnesses, and Python tooling. Based in Lahore, working worldwide.',
  eyebrow: 'About',
  headline: 'Eight years in growth, now building the engineering underneath it.',
  standfirst:
    'I spent most of my career on the marketing side of the dashboard, and kept running into the same wall: the systems producing the numbers were held together with scripts nobody owned.',
  sections: [
    {
      heading: 'The shift',
      body: [
        'As a digital marketing lead I owned pipelines, tracking, and reporting across paid search, paid social, and lifecycle automation. The recurring failure was never creative or strategy — it was instrumentation. Conversions that did not fire, CRM records that disagreed with ad platforms, reports assembled by hand every Monday.',
        'Fixing those problems properly meant writing software. What started as scripts became APIs, then services, then agents once language models made unstructured operational work tractable. The transition from marketing leadership to AI automation engineering was not a career change so much as following the work to where it actually lived.',
      ],
    },
    {
      heading: 'What I build now',
      body: [
        'Today the work is concentrated in three areas: Model Context Protocol servers that let AI clients operate real business systems safely, agent implementations that come with evaluation harnesses instead of promises, and Python automation that replaces manual operational labour.',
        'The marketing background is not incidental. It means I know which questions a reporting pipeline actually has to answer, which metrics people act on, and why a technically correct dashboard often gets ignored.',
      ],
    },
    {
      heading: 'How I work with clients',
      body: [
        'Engagements start with an audit, not a proposal template. I map the current process, measure where the time goes, and tell you which parts are worth automating — including the parts that should be deleted instead.',
        'Builds are incremental and reversible. Read-only first, dry runs by default, write access added deliberately. You own the repository and the credentials at handover, with a runbook and a recorded walkthrough.',
        'I work directly with the person who owns the problem. No account managers, no discovery phase that bills for a document you already know the contents of.',
      ],
    },
  ],
  stackGroups: [
    {
      title: 'AI and agents',
      items: ['Gemini', 'OpenAI-compatible APIs', 'Model Context Protocol', 'Function calling', 'Structured output', 'Evaluation harnesses'],
    },
    {
      title: 'Languages and runtime',
      items: ['Python 3.12', 'TypeScript', 'Node.js', 'Pydantic v2', 'httpx', 'Playwright'],
    },
    {
      title: 'Platforms and infrastructure',
      items: ['Firebase', 'Google Cloud', 'Cloudflare Workers', 'GitHub Actions', 'Docker', 'BigQuery'],
    },
    {
      title: 'Marketing systems',
      items: ['GoHighLevel', 'GA4', 'Google Tag Manager', 'Meta CAPI', 'Google Ads API', 'Search Console API'],
    },
  ],
  timeline: [
    {
      period: '2024 — present',
      title: 'AI automation engineering',
      body: 'Building MCP servers, agent tooling, and evaluation harnesses as open source. Client work spans CRM automation, measurement infrastructure, and agent reliability.',
    },
    {
      period: '2021 — 2024',
      title: 'Digital marketing leadership',
      body: 'Owned growth programmes end to end: paid acquisition, lifecycle automation, tracking architecture, and the reporting that leadership actually used.',
    },
    {
      period: '2017 — 2021',
      title: 'Performance marketing and analytics',
      body: 'Hands-on campaign management, technical SEO, and the first automations built to stop rebuilding the same reports every week.',
    },
  ],
  contactNote:
    'Lahore, Pakistan (UTC+5). Working with teams across Europe, the Middle East, and North America.',
};
