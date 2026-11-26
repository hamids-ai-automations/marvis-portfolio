import type { Service } from "@/lib/types";

export const service: Service = {
  slug: "python-automation",
  name: "Python Automation Engineering",
  shortName: "Python Automation",
  group: "Marketing & CRM Automation",
  icon: "terminal",
  order: 9,
  seoTitle: "Python Automation & Internal Tooling — Muhammad Hamid",
  metaDescription:
    "Custom Python CLIs and pipelines for reporting, reconciliation and repetitive operations. Typed, tested and documented so your team can run them without me.",
  eyebrow: "Python Automation & Tooling",
  h1: "Python tooling that replaces spreadsheets and copy-paste",
  intro:
    "Not every problem needs an agent or a platform. A surprising amount of operational drag is a missing script: reconciling two exports, validating a batch before upload, turning a folder of reports into one number. I build these as real tools — a typed interface, a dry-run mode, a fixture-based test suite and a README that explains the one command that matters. No notebooks left running on a laptop, no credentials pasted into a cell.",
  benefits: [
    {
      title: "Critical logic out of the spreadsheet",
      body: "A workbook three people maintain by hand is a single point of failure. It becomes a versioned program with tests and an explicit input contract.",
    },
    {
      title: "Secrets handled properly",
      body: "Config is read from the environment and validated at startup. Nothing sensitive is printed, logged or committed.",
    },
    {
      title: "Tools anyone on the team can run",
      body: "If only the author can run it, it is a liability. Every deliverable includes setup instructions, safe defaults for a first run and documentation written for the person who inherits it.",
    },
    {
      title: "Dry runs before writes",
      body: "The default mode changes nothing: fixtures prove the logic, dry runs prove the wiring, and write access arrives once both hold.",
    },
    {
      title: "Small utilities that fail loudly",
      body: "Environment checks, batch validators, release hygiene — lint, type-check and test on every push, so failures land in CI instead of mysteriously in production.",
    },
  ],
  useCases: [
    {
      title: "Teams with critical logic in a spreadsheet",
      body: "Pricing, payouts, reconciliation — moved into tested CLI tools with typed inputs, CI runs and output you can defend in a meeting.",
    },
    {
      title: "Dev teams missing boring but vital tooling",
      body: "Environment checks, SARIF validation, release hygiene: small utilities that fail loudly in CI instead of mysteriously in production.",
    },
    {
      title: "Scripts only one person can run",
      body: "Documentation, tests and packaging so the tool survives its author’s vacation — or their departure.",
    },
    {
      title: "Weekly reconciliation between systems",
      body: "Two exports that must match — ad platform against CRM, payment report against ledger — compared by a tool that reports the diff, instead of a person squinting at columns.",
    },
    {
      title: "Batch validation before anything ships",
      body: "Batches checked against a schema before they touch a real system: bad rows quarantined, good rows passed, and a report saying exactly which row failed and why.",
    },
  ],
  process: [
    {
      title: "Sample data",
      body: "Real inputs, with the mess left in. Fixtures are built from them.",
    },
    {
      title: "Contract",
      body: "Define the command, its flags, and what it writes where.",
    },
    {
      title: "Build and test",
      body: "Implementation against fixtures, with a dry-run default.",
    },
    {
      title: "Package",
      body: "Pinned dependencies, a clean entry point and a reproducible install.",
    },
    {
      title: "Hand over",
      body: "Walkthrough recording plus the runbook.",
    },
  ],
  integrations: [
    "Google Sheets",
    "Excel & CSV exports",
    "GA4 & Google Ads data",
    "Google Search Console",
    "SARIF scanner output",
    "Any REST API with a documented contract",
  ],
  technologies: [
    "Python 3.12",
    "Typer / argparse",
    "Pydantic v2",
    "pytest",
    "ruff",
    "mypy",
    "httpx",
    "GitHub Actions",
  ],
  faqs: [
    {
      question: "Can you take over a messy existing script?",
      answer:
        "Yes. The usual path: characterise what it actually does today, add tests around the behaviour worth keeping, then refactor in place so nothing breaks mid-flight.",
    },
    {
      question: "Do you build GUIs?",
      answer:
        "Only when the user genuinely will not use a terminal. A CLI plus a scheduled job covers most operational needs and costs far less to maintain.",
    },
    {
      question: "Where does it run?",
      answer:
        "Locally, on a server, or in CI. Deployment follows whatever your team already operates — I avoid introducing new infrastructure for a script.",
    },
    {
      question: "How do you keep a small tool from rotting?",
      answer:
        "The same way production code is kept: fixtures from real data, tests in CI, pinned dependencies and documentation that covers install, run and troubleshoot. The point is a tool that still works when its author is on holiday.",
    },
    {
      question: "How long does a tool like this take?",
      answer:
        "Most take days, not months. The work is dominated by the data contract and the fixtures, not the code — once the input shape is pinned, the implementation is usually the short part.",
    },
    {
      question: "What do we get at the end?",
      answer:
        "A CLI or service with a single entry point, help text, validation and predictable exit codes; a fixture-driven test suite; a CI pipeline; and documentation written for the person who inherits it.",
    },
  ],
  relatedProjects: ["envscope", "searchpulse-ai", "conversion-tracking-doctor", "sarif-verify"],
  relatedArticles: ["ai-automation-business-operations", "gemini-api-automation-guide"],
  ctaHeading: "Still doing it by hand every week?",
  ctaBody:
    "Describe the task and the files involved on WhatsApp. Most of these tools take days, not months — and the manual version retires as soon as the dry run passes.",
};
