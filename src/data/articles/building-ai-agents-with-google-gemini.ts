import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "building-ai-agents-with-google-gemini",
  title: "How to build AI agents with Google Gemini",
  seoTitle: "How to Build AI Agents With Google Gemini: A Practical Guide",
  metaDescription: "The Gemini primitives that matter for agents \u2014 function calling, response schemas, chat state \u2014 plus typed tool contracts, argument repair, and evaluation.",
  excerpt: "The Gemini API supplies the raw material \u2014 function calling, structured output, chat state. The production agent loop around it is your engineering: strict schemas, validated arguments, errors that teach, and an evaluation suite.",
  date: "2026-11-17",
  readingMinutes: 7,
  tag: "Gemini",
  content: `Most Gemini agent tutorials end at the moment the model calls a function. That moment is where the work starts. A production agent is a loop built around it: tools declared with strict schemas, arguments validated before anything executes, failures returned in a shape the model can act on, and a suite that notices regressions when the prompt or the model changes. The Gemini API gives you serviceable raw material for all four parts. The engineering around that material is yours.

This is the pattern I use for agent builds, and the shape of the [gemini-agent-automation-toolkit](/projects/gemini-agent-automation-toolkit/) — the repository where the boring parts of the loop live so they stop being reinvented per project.

## The three primitives that matter

Three Gemini API features carry almost all of the weight in agent work.

**Function calling.** You declare functions with a name, a description, and typed parameters. When the model decides a function is relevant, the response contains a function call part with the name and a JSON object of arguments. The model does not execute anything — you run the call, return the result as a function response part on the next turn, and the loop continues until the model produces a final answer. Everything dangerous or interesting happens on your side of the fence, which is exactly where you want it.

**Structured output.** A response schema constrains the model's own output: attach a JSON Schema to the request along with a response MIME type of application/json, and the model is required to answer in that shape. For agents this matters more than it first appears, because an agent's final answer usually feeds a downstream system, and roughly-JSON is not a contract. Declare the shape, then validate the result anyway — schemas raise conformance, they do not guarantee it.

**Chat state.** The SDK maintains conversations: create a chat, send messages, and the history is managed for you. Convenient, but be clear about what it does not do. It does not run your tool loop, enforce your budgets, or decide what happens when a tool call fails. Chat state saves you from serialising the transcript by hand; it is not an agent framework.

## Designing typed tool contracts

A tool declaration has two readers: the model, which decides when and how to call it, and your runtime, which must validate what actually arrives. Both should consume the same definition. Maintaining one JSON Schema for the model and a separate validator for the runtime is how the two drift apart, and drift is where malformed arguments survive.

A declaration I would trust in production:

\`\`\`python
from google.genai import types

search_orders = types.FunctionDeclaration(
    name="search_orders",
    description=(
        "Search orders by customer email and status. "
        "Returns at most limit newest matching orders."
    ),
    parameters=types.Schema(
        type="OBJECT",
        properties={
            "customer_email": types.Schema(
                type="STRING",
                description="Exact customer email address, lowercase.",
            ),
            "status": types.Schema(
                type="STRING",
                enum=["open", "shipped", "cancelled", "any"],
                description="Order status filter. Use 'any' unless told otherwise.",
            ),
            "limit": types.Schema(
                type="INTEGER",
                description="Maximum number of orders to return.",
            ),
        },
        required=["customer_email"],
    ),
)
\`\`\`

The details doing the real work:

- The name is verb plus object, with a domain prefix when more than one integration is in play. \`search_orders\` beats \`search\`, and \`shopify_search_orders\` beats both when a Shopify tool set sits next to a warehouse tool set.
- The description states scope and limits, not just intent. "Returns at most limit newest matching orders" prevents the model from assuming completeness and inventing older records.
- Enums are closed. If four statuses are valid, the schema lists four. A free-text status string is a validation failure queued to happen.
- Bounds exist on numeric parameters, and optional parameters carry defaults, so the model is not forced to invent values it was never given.
- Only \`customer_email\` is required. Every extra required field is an invitation to guess rather than ask.

The same schema that goes to Gemini should drive runtime validation. In the toolkit, a tool is registered once with its JSON Schema, and dispatch validates arguments against that schema before any handler runs. One definition, two consumers, no drift.

## Validate arguments, then repair

Model-emitted arguments are untrusted input in the same sense as HTTP form data. In practice, most agent failures I debug are not wrong tool choices — they are the right tool with malformed arguments: an email with trailing whitespace, a date without a year, a status the schema never allowed.

The response to invalid arguments is not an exception. It is a tool result that tells the model what to fix:

\`\`\`python
def run_tool(name: str, args: dict) -> dict:
    result = REGISTRY.validate(name, args)
    if not result.ok:
        return {
            "error": "invalid_arguments",
            "field": result.field,
            "detail": result.detail,
            "hint": result.hint,
            "retry": True,
        }
    return REGISTRY.dispatch(name, args)
\`\`\`

The \`retry\` flag is the important part. It turns a validation failure from a dead end into a self-correction path: the model reads the message, repairs the argument, and calls again. Budget the loop — one repair round, at most two. A model that needs three repairs is not converging, and the honest move is to stop and surface the failure to the user instead of burning tokens in a circle.

The same honesty applies to execution failures. A rate-limited upstream is retryable after a pause. A missing record is not retryable at all, and should say so. A permission error is terminal, and the model cannot fix it by trying harder. Encode that distinction in the error payload and the agent behaves better with no model change at all.

## The SDK or plain REST

Use the \`google-genai\` SDK, in Python or JavaScript, unless you have a specific reason not to. It is the current official client — it replaced the older \`google-generativeai\` package, which Google has deprecated — and it handles the parts that are tedious to get right: retries with backoff, chat history, and the request shapes for tool declarations and response schemas. The same SDK also speaks to Vertex AI, which keeps the client code portable if your hosting or compliance story points that way. It can even execute function calls automatically if you hand it local callables — fine for prototypes, wrong for production, because automatic execution bypasses the validation and budgeting layer the agent depends on.

REST is the right choice when you want no client dependency: an edge function proxying Gemini with fetch, a runtime the SDK does not support, or a minimal container where every dependency is a review burden. The REST surface mirrors the SDK — contents, parts, function call and function response objects — at the cost of verbosity and owning your own retry logic. Nothing is hidden, which is sometimes exactly what a security review wants to hear.

## Evaluate before you trust

An agent with no evaluation suite is a coin flip that re-lands on every prompt edit, schema change, or model version bump. Trying five prompts tells you about five prompts.

What works is a labelled task suite run offline: each case states the input, the expected tool sequence, and assertions over arguments and the final answer. Score tool choice, argument validity, schema conformance, and refusal behaviour deterministically — the dimensions the [gemini-agent-reliability-kit](/projects/gemini-agent-reliability-kit/) is built around, because "it seems better now" is not a release criterion. Keep the model behind an interface so swapping models is a configuration change, and re-run the suite on every change that touches the prompt, the tools, or the model. Model versions shift behaviour in ways release notes do not fully describe; the suite is how you find out what actually moved.

If you are scoping this for a team rather than a repository, my [AI agent development](/services/ai-agent-development/) work covers the full loop, and [Gemini development](/services/gemini-development/) covers the API-specific parts. The [articles index](/articles/) has the deeper write-ups on evaluation design.

The model does the interesting part. Everything else is interface design: strict declarations, validated arguments, errors that teach, and a suite that fails the build. Gemini supplies the primitives; the discipline is on you.`,
  relatedArticles: ["evaluating-ai-agents", "common-ai-agent-development-mistakes", "gemini-api-automation-guide"],
  relatedServices: ["gemini-development", "ai-agent-development"],
};
