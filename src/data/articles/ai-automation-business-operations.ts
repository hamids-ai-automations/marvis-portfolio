import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "ai-automation-business-operations",
  title: "AI automation for business operations: where it actually pays off",
  seoTitle: "AI automation for business operations: where it pays off",
  metaDescription:
    "A four-part framework for choosing what to automate with AI, where LLMs beat plain code, approval gates, and how to measure ROI without fooling yourself.",
  excerpt:
    "A four-question framework for choosing what to automate, where language models genuinely beat plain code, and how to measure the return without flattery.",
  date: "2026-11-25",
  readingMinutes: 6,
  tag: "AI Automation",
  content: `Most AI automation projects do not fail because the model is weak. They fail because the work was chosen for the wrong tool: judgement-heavy tasks automated end to end, or rule-shaped work handed to a model when a hundred lines of Python would have done it deterministically. This is a framework for deciding where AI automation genuinely pays off in business operations, and how to keep score once it is running.

## The four-question framework

Before automating anything, score the task on four axes:

- **Volume.** How often does this run? A task done twenty times a week is a rounding error in human cost; a task done two thousand times a day is where automation compounds.
- **Error cost.** What happens when it goes wrong once? A typo in an internal digest is trivial; a wrong refund to a customer is not. Error cost decides how much scaffolding the automation needs, not whether to build it.
- **Structure.** How consistent are inputs and outputs? Form submissions and CSV exports are structured; free-text emails and call transcripts are not.
- **Human judgement.** How much discretion does the task need? Sizing an invoice needs none; approving a disputed charge needs plenty.

Then apply a decision rule:

\`\`\`python
from dataclasses import dataclass


@dataclass
class TaskProfile:
    weekly_volume: int
    error_cost: int   # 1-5: cost of a single wrong outcome
    structure: int    # 1-5: consistency of inputs and outputs
    judgement: int    # 1-5: discretion the task requires


def automation_plan(p: TaskProfile) -> str:
    if p.weekly_volume < 50:
        return "leave it manual; payback is too slow"
    if p.structure >= 4 and p.judgement <= 2:
        return "automate with plain code, no model required"
    if p.structure >= 3 and p.judgement <= 3:
        if p.error_cost >= 4:
            return "automate with a model and an approval gate"
        return "automate with a model, sample outputs for review"
    return "assist only: draft, summarise, hand off to a human"
\`\`\`

The exact thresholds matter less than the shape of the logic: volume decides whether the project is worth building, while error cost and judgement decide how much autonomy it should ever get. If you cannot fill in the four numbers for a proposed automation, you are not ready to build it.

## Where LLMs earn their cost — and where they do not

Language models pay off at the boundary where data is unstructured:

- Extracting structured fields from emails, PDFs, support tickets and call transcripts.
- Classifying and routing: intent, urgency, topic, language.
- Drafting: replies, summaries, first-pass descriptions, translations.
- Reconciling messy input to a schema — matching "ACME Ltd" against "Acme Limited (Leeds)".

Everything else is usually better as plain code:

- Arithmetic, totals, date handling, deduplication — deterministic by nature.
- Routing on fields you already have. If the CRM record contains a stage, branch on the stage.
- Validation: range checks, required fields, permissions.
- Scheduling, retries and moving records between systems.

### The line between the two

The test I use is simple: if you can write the rule, write the rule. A model call adds cost, latency and a new failure mode, so spend it only where the input is too messy for rules to survive. In practice, the [AI automation](/services/ai-automation/) systems I build end up as a small number of model calls surrounded by a large amount of ordinary, testable code — and that ratio is a feature, not a compromise.

## The reporting pipeline pattern

Most business automations converge on one shape — a reporting pipeline with five stages:

- **Extract.** Read the sources: inboxes, ticket queues, PDFs, CRM exports. This is where the LLM lives, and it stays read-only.
- **Normalise.** Map whatever the model produced into typed records with fixed fields. Plain code.
- **Validate.** Reject records with bad amounts, unknown categories or missing IDs. Every rejection is loud and logged.
- **Load.** Write to the destination — a database, a spreadsheet, the CRM. Idempotent writes, so retries cannot duplicate.
- **Surface.** A dashboard or digest that a human actually reads.

Keeping the model at the extraction stage is what makes the rest of the pipeline testable: validation is deterministic, so regressions get caught by unit tests instead of by a customer. When the pipeline needs to act rather than report, the bar rises sharply — read [building reliable AI agent workflows](/articles/reliable-ai-agent-workflows/) for the harness that keeps actions safe.

## Approval gates

When automation writes to systems of record — refunds, invoices, outbound messages — autonomy is earned, not granted:

- Start read-only. The automation runs and reports; humans keep pressing the buttons.
- Move to shadow mode: it drafts the action it would take, a human approves, and you compare outcomes over a fixed period.
- Graduate to auto-approval for low-value, reversible actions, with sampling: a human reviews a random slice of decisions forever, not once.
- Escalate on low confidence. A model that is unsure should say so, and the pipeline should treat that as signal, not noise.
- Log every automated action with its inputs, the decision and the approver. When something goes wrong you want an audit trail, not archaeology.

The rule of thumb: the cost of an error multiplied by the rate at which it happens must stay below the cost of the human you removed. Approval gates exist to keep that product small while the error rate is still unknown.

## Measuring ROI honestly

Most ROI claims for AI automation are quietly dishonest, usually by omission rather than intent. To measure honestly:

- Cost the automation fully: model spend, infrastructure, human review time, and the maintenance tax — eval sets to update, prompts to fix, edge cases to triage. Maintenance is the line item people forget, and it never shrinks to zero.
- Baseline the human process honestly too, including the rework that manual errors create. Inflating one side while flattering the other is how dashboards become fiction.
- Run the automation in shadow mode before cutover, so you hold error rates in your hand. Then compare time saved per task, error rate before and after, and rework cost — throughput and quality together, never one alone. Faster and wronger is a net loss with better graphs.
- Re-measure after the honeymoon. Model updates and prompt drift change behaviour months later, and a process you cannot re-measure is one you cannot defend.

If the numbers survive that treatment, the automation is real. If they do not, you have found out cheaply, and the framework will point you at the next candidate instead. For the systems that do clear the bar, [AI agent development](/services/ai-agent-development/) and the practices in [evaluating AI agents](/articles/evaluating-ai-agents/) are where the long-term value lives — evaluation is what keeps the ROI from quietly decaying.`,
  relatedArticles: [
    "reliable-ai-agent-workflows",
    "evaluating-ai-agents",
    "gemini-api-automation-guide",
  ],
  relatedServices: ["ai-automation", "ai-agent-development", "python-automation"],
};
