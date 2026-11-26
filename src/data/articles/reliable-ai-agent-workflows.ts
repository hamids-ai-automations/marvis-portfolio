import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "reliable-ai-agent-workflows",
  title: "Building reliable AI agent workflows",
  seoTitle: "How to build reliable AI agent workflows in production",
  metaDescription:
    "Step budgets, typed tool contracts, repair paths, idempotent side effects, trajectory evals and debuggable logs — how to make AI agent workflows reliable.",
  excerpt:
    "Reliability is a property of the harness, not the model: step budgets, typed tool contracts, idempotent writes, trajectory evaluation and logs you can actually debug from.",
  date: "2026-11-25",
  readingMinutes: 6,
  tag: "AI Agents",
  content: `Model reliability is mostly an illusion created by good demos. What actually makes an agent trustworthy is the harness around it: budgets that bound the worst case, contracts that validate what the model says, side effects that survive retries, and logs that explain the failure at two in the morning. None of that comes from the model — it comes from engineering. Here is the checklist I apply to every agent workflow, in roughly the order I add it.

## Step budgets: bound the worst case

An agent loop is a while-loop whose exit condition is a model's opinion, so the first thing to install is a hard budget:

- Cap total model calls and tool calls per run. When the budget is exhausted, stop and return a partial result with an explicit status, not a hang.
- Budget wall-clock time and money too: kill runs that exceed a deadline, and alert when a run's token spend crosses a threshold.
- Treat a run that hits the cap as a data point, not an embarrassment. Count them, and go find the prompt or tool that causes loops.

Degrading gracefully matters as much as stopping. A workflow that returns "three of five steps completed, and here is why" is recoverable; one that spins until the platform kills it is not.

## Typed tool contracts with argument validation

Tools are the interface between a stochastic component and your systems, so the contract needs teeth. Declare every tool with typed parameters, validate arguments before execution, and reject invalid ones by returning the validation error to the model as the tool result:

\`\`\`python
from pydantic import BaseModel, ValidationError


class CreateInvoiceArgs(BaseModel):
    customer_id: str
    amount_cents: int
    currency: str = "USD"
    idempotency_key: str


def call_tool(name: str, raw_args: dict) -> dict:
    if name != "create_invoice":
        return {"error": "unknown tool: " + name}
    try:
        args = CreateInvoiceArgs(**raw_args)
    except ValidationError as exc:
        # Returned to the model so it can correct and retry the call.
        return {"error": exc.errors(include_url=False)}
    if args.amount_cents <= 0:
        return {"error": "amount_cents must be positive"}
    return create_invoice(
        customer_id=args.customer_id,
        amount_cents=args.amount_cents,
        currency=args.currency,
        idempotency_key=args.idempotency_key,
    )
\`\`\`

Two properties fall out of this. The model gets a correction path instead of a crash, and your systems never execute a call you did not validate. The same schemas double as documentation and as the basis for mocks in tests, which is most of the way to a usable contract suite.

## Structured output with a repair path

Final answers deserve the same treatment as tool arguments: parse against a schema, check the business rules, and if validation fails, retry once with the validation error included in the prompt. One repair attempt, then raise.

Unbounded repair loops are just step budgets failing quietly, and silent fallbacks are worse: a workflow that cannot produce a valid answer should say so loudly. "Escalated to human: could not produce valid output" is an honest failure. A guess with a confident tone is not.

## Idempotent side effects

Retries and agents mix, so every write must be safe to repeat:

- Give each logical action an idempotency key — derived from the run and step — and make the receiving operation deduplicate on it.
- Store the outcome of completed actions so a resumed run skips work that already happened.
- Prefer create-or-update semantics over bare create, so a replay cannot produce duplicate records.

The scenario to design for: a network error lands after the write succeeded but before you saw the response. A blind retry doubles the effect. Idempotency is the difference between an awkward log entry and a double charge.

## Deterministic evaluation of trajectories

Anecdotes do not scale, so evaluation has to. Record every run as a trajectory — the model calls, the tool calls with their arguments, and the results — then assert on the trajectory, not just the final answer:

- Did it call the right tools in a sane order?
- Did it pass valid arguments, or did it lean on the repair path every run?
- Did it stop inside the budget, and how close to the cap?
- On known failure inputs, did it escalate instead of guessing?

Replay the recorded tool results during tests so the harness runs offline, fast and free. The model layer is stochastic; the contract checks — schema validity, routing, budget compliance, escalation — are deterministic and belong in CI. I treat a workflow without a replay harness as unfinished, and [evaluating AI agents](/articles/evaluating-ai-agents/) covers the harness itself in more depth.

## A failure taxonomy you can act on

Not all failures are equal, and a workflow that treats them identically will retry what it should escalate and swallow what it should surface. Four classes cover most of what you will meet:

- **Transient.** API 429s, timeouts, network blips. Retry with backoff, then give up loudly.
- **Model contract violation.** Invalid arguments, unparseable output. Repair once, then escalate to a human.
- **Harness bug.** Your code mis-scheduled a step or dropped a field. Fix the code; retrying cannot help.
- **Policy violation.** The model attempted something out of bounds — a tool it must not call, data it must not read. Block, audit, alert. Never retry.

Route each class differently, in code, at the boundary where the failure occurs. The taxonomy is small enough to live in one exception hierarchy and specific enough to drive alert routing — an on-call engineer should be able to tell from the alert class whether it is a "wait and see" or a "get up now".

## Logging you can actually debug from

Post-mortems live or die on logs. Emit structured events — one JSON object per line, queryable — for every model request, tool call and decision:

\`\`\`python
import json
import time
import uuid


def log_step(run_id: str, step: int, event: str, **fields) -> None:
    print(json.dumps({
        "ts": time.time(),
        "run_id": run_id,
        "step": step,
        "event": event,
        **fields,
    }, default=str))
\`\`\`

Attach the raw request, the raw response, token counts and latency to each event, and keep the payloads. "Agent answered incorrectly" is a debugging dead end; the actual prompt and response pair usually makes the cause obvious within minutes. Redact secrets and customer data at the boundary — [building secure AI applications](/articles/building-secure-ai-applications/) covers where that line sits — but never redact the model's own behaviour out of the logs.

## The pattern behind the checklist

Every item above exists because its absence has cost someone a weekend: the loop that ran all night, the write that doubled, the failure that was swallowed. These mistakes are common enough to catalogue — [common AI agent development mistakes](/articles/common-ai-agent-development-mistakes/) collects them — and every fix is cheaper than its incident. The stance that ties it together: agents are read-only until proven, budgeted always, and loud on every failure. That is the discipline behind the [AI agent development](/services/ai-agent-development/) work I do, and it is the difference between an agent that demos well and one you can leave running.`,
  relatedArticles: [
    "evaluating-ai-agents",
    "common-ai-agent-development-mistakes",
    "building-secure-ai-applications",
  ],
  relatedServices: ["ai-agent-development", "ai-automation", "llm-development"],
};
