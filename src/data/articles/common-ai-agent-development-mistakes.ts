import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "common-ai-agent-development-mistakes",
  title: "Seven mistakes I keep seeing in AI agent development",
  seoTitle: "7 AI Agent Development Mistakes I Keep Seeing (and Fixes)",
  metaDescription: "No evaluation suite, single-turn benchmarks, unbounded retries, ambiguous tool schemas, silent partial failures, no budgets \u2014 seven mistakes and fixes.",
  excerpt: "The same seven mistakes appear in agent codebases regardless of stack, model, or vendor. None of them are model problems \u2014 all are engineering discipline problems, and all are fixable.",
  date: "2026-11-11",
  readingMinutes: 6,
  tag: "AI Agents",
  content: `I review agent codebases regularly — my own after a few weeks away, other people's prototypes when they need productionising, and the occasional rescue project that has already eroded someone's trust. The same seven mistakes appear regardless of stack, model, or vendor. None of them are model problems. All of them are engineering discipline problems, which is the good news: every one of them is fixable without waiting on a vendor roadmap. The list is ordered roughly by how expensive each mistake becomes once it reaches production.

## 1. No evaluation suite

The default state of an agent project is that nobody knows whether the last change helped. Quality is assessed by trying a handful of prompts, and regressions ship silently because nothing measures behaviour across changes. The prompt gets "improved", a schema is tightened, the model version moves — one of those made things worse, and there is no signal about which.

The fix is a labelled task suite with deterministic scoring: expected tool choices, argument assertions, output schema conformance, and refusal cases, run in CI. Twenty well-chosen cases beat two hundred scraped ones, and every production failure should become a permanent case so the suite compounds instead of decaying. I built the [gemini-agent-reliability-kit](/projects/gemini-agent-reliability-kit/) around exactly this gap, because the absence of an evaluation suite is the strongest predictor I know of whether an agent project survives its second month.

## 2. Trusting single-turn benchmarks for multi-step work

A model's published benchmark score measures single-turn correctness under fixed conditions. An agent is a multi-step system in which the model chooses its own control flow, and the characteristic agent failures — the wrong tool at step three, a loop between two tools that each return the other's prerequisite, a confidently wrong final answer assembled from individually correct parts — do not exist in a single-turn measurement at all.

A strong single-turn score is necessary and nowhere near sufficient. What predicts agent behaviour is trajectory evaluation: run the whole task, assert on the sequence of tool calls, and score the outcome. When a model swap looks great on paper and degrades the agent in practice, this gap is usually why — and only a trajectory suite shows it before users do. The gap runs the other way too: models that benchmark unremarkably can be steady, dependable agents, because tool selection is a different skill from puzzle-solving, and trajectory data is the only way to see it.

## 3. Unbounded retries

An agent that hits an error and retries forever is a failure nobody notices until the bill or the timeout arrives. Retry loops come from good instincts — transient errors genuinely exist — combined with no ceiling and no classification of which errors are actually transient.

The fix has three parts. Classify errors as retryable or terminal, and make the classification explicit in the error payload each tool returns, so the model is not left guessing. Bound retries per task and per tool, with backoff between attempts — and jitter in the backoff, because synchronised retries hammering a recovering upstream are their own incident. And when the budget is spent, stop cleanly and report what was attempted, what failed, and why — an agent that halts with an honest report is more useful than one that loops until something external kills it.

## 4. Tools with ambiguous names and schemas

The model chooses tools by reading their names, descriptions, and schemas — that is the entire interface. Give it two tools named \`search\` and \`lookup\` with overlapping semantics, descriptions that restate the name, and free-text parameters where enums belong, and it will choose wrongly in ways that look like model failure but are interface failure.

The fixes are cheap and the returns are outsized: verb-object names with a domain prefix, descriptions that say when to use and when not to use a tool, closed enums instead of free text, bounds on every number, and \`additionalProperties: false\` everywhere. Where two tools genuinely overlap, either merge them or make the boundary explicit in both descriptions. The [toolkit](/projects/gemini-agent-automation-toolkit/) treats the declaration as the single source of the contract precisely because schema ambiguity is where argument errors are born.

## 5. Silent partial failures

The agent announces the task is done. It is not done: one step out of five failed, the exception was swallowed by a broad try/except, and the final summary reports success anyway. This is the most expensive mistake on the list because it does not just break a task — it corrupts trust in everything else the system reports afterwards.

Partial failure needs to be a first-class outcome. Aggregate the tool results, verify post-conditions where they exist — the record exists, the row count changed, the message has an id — and make the final report state what succeeded and what did not, in that order. A verification pass at the end of a run is cheaper than the trust it protects: re-read what was written, compare it against the intended state, and report the delta. Where a task is genuinely all-or-nothing, encode that in the tool contract instead of hoping the steps stay aligned on their own.

## 6. No step or token budgets

Agents can loop. Two tools that return each other's inputs, a model that re-derives the same sub-goal, a repair cycle that never converges — all of them run indefinitely without a ceiling, and latency and cost grow quietly until someone reads an invoice. The absence of budgets turns a modelling weakness into an operational incident.

The fix: a hard cap on steps per task, a token ceiling per task, and a defined degradation path when a cap is hit — return partial progress with a note, not an error with no context. Track steps and tokens per task in the logs. A budget that is never approached tells you the task decomposition is right; one that is constantly hit tells you the agent design is wrong. Both are signals you cannot get any other way.

## 7. Write access before read-only proves out

The fastest way to make an agent dangerous is to hand it write access on day one. Read paths get exercised constantly, in the open, where mistakes are cheap. Write paths get exercised rarely, under prompt pressure, and exactly in the conditions where a model is most likely to be confidently wrong.

Ship read-only first and prove the tool choices and argument quality on the read path, where the worst outcome is a wasted turn. When writes are justified, scope them per action rather than per integration, run destructive tools behind a dry-run preview, and keep a confirmation step for anything irreversible. The read-only phase is also where you collect the evidence that justifies the write phase; without it, enabling writes is a decision made on vibes. This is how I structure [agent engagements](/services/ai-agent-development/) too: read, measure, then write — in that order, with proof at each step.

## What good looks like

The agent chooses the right tools for reasons the schemas make obvious, its arguments validate, its failures surface with enough context to act on, its costs have ceilings, and a suite in CI catches regressions before users do. None of that requires a better model. It requires treating the agent as a system with contracts, budgets, and tests — which is to say, treating it as engineering rather than prompting. More of the reasoning behind each point is in the [articles index](/articles/), and the working code is in [the reliability kit on GitHub](https://github.com/hamids-ai-automations/gemini-agent-reliability-kit).`,
  relatedArticles: ["evaluating-ai-agents", "building-ai-agents-with-google-gemini", "reliable-ai-agent-workflows"],
  relatedServices: ["ai-agent-development", "ai-automation"],
};
