import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "evaluating-ai-agents",
  title: "Evaluating AI agents: the five things actually worth measuring",
  seoTitle: "Evaluating AI Agents: 5 Metrics Actually Worth Measuring",
  metaDescription: "Agent quality is not a vibe. Tool choice, argument validity, schema conformance, refusal correctness, and step cost can all be scored before release.",
  excerpt: "\"The agent feels better now\" is not a release criterion. Five dimensions \u2014 tool choice, argument validity, output conformance, refusal correctness, step cost \u2014 can all be scored without a human in the loop.",
  date: "2026-11-14",
  readingMinutes: 2,
  tag: "AI Agents",
  content: `"The agent feels better now" is not a release criterion. It is a description of the last five prompts you happened to try. Agents are programs whose control flow is chosen at runtime, which makes behavioural regression the default outcome of any change unless something measures it.

Five dimensions cover most of the ground, and all five can be scored without a human in the loop.

## 1. Tool choice accuracy

Given a task, did the agent select the right tool? This is a classification problem with a known answer per case, and it is the highest-signal metric for most business agents. A wrong tool produces a confidently wrong outcome, which is worse than an error.

Score it as: chosen tool equals expected tool, with an explicit allowance for acceptable alternatives when two tools genuinely overlap.

## 2. Argument validity

Selecting the right tool with malformed arguments is the most common failure I find in existing agents. Validate arguments against the tool schema and score three states: valid, valid-after-repair, invalid.

The middle state matters. If a retry loop fixes it in one extra turn, the cost is latency and tokens rather than correctness — a different problem with a different fix.

## 3. Output conformance

If the downstream system expects JSON matching a schema, then "mostly JSON" is a failure. Parse and validate against the real schema. Measure conformance separately from semantic accuracy, because they fail for different reasons and get fixed in different places.

## 4. Refusal correctness

An agent that answers when it should refuse is a liability; one that refuses when it should answer is useless. Both directions need labelled cases, including:

- Missing required information in the request.
- Requests outside the tool's permission scope.
- Requests that look valid but reference entities that do not exist.

Refusals are cheap to test and rarely tested.

## 5. Step cost

Accuracy at any price is not a product. Track tool calls per task, tokens per task, and wall-clock latency. A change that lifts accuracy from 82% to 84% while tripling cost is a decision, not an improvement — and someone should have to defend it.

## Making it a gate, not a report

A dashboard nobody checks has no effect on quality. The suite belongs in CI, with thresholds:

\`\`\`python
THRESHOLDS = {
    "tool_choice_accuracy": 0.95,
    "argument_validity": 0.98,
    "output_conformance": 1.00,
    "refusal_accuracy": 0.90,
    "mean_steps": 4.5,
}
\`\`\`

Build fails, PR is blocked, someone investigates. The threshold values matter less than the fact that they exist.

## Start small

Twenty well-chosen cases outperform two hundred scraped ones. I start with five per capability, drawn from real conversations or real tickets, including the ugly ones: ambiguous intent, conflicting instructions, empty fields, hostile input.

The suite grows when a production failure appears. Every incident becomes a permanent case, which is how the suite becomes valuable without anyone writing test cases for its own sake.`,
  relatedArticles: ["common-ai-agent-development-mistakes", "building-ai-agents-with-google-gemini", "reliable-ai-agent-workflows"],
  relatedServices: ["ai-agent-development", "llm-development"],
};
