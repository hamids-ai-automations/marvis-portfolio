import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "gemini-api-automation-guide",
  title: "Gemini API automation: a practical developer guide",
  seoTitle: "Gemini API automation: a practical developer guide",
  metaDescription:
    "Keys, structured output, tool calling, batching, retries and offline evals: a practical Gemini API automation guide with google-genai Python examples.",
  excerpt:
    "The parts of Gemini API automation that decide whether a prototype survives production: key hygiene, structured output, tool-calling loops, token budgets, retries and offline evaluation.",
  date: "2026-11-25",
  readingMinutes: 6,
  tag: "Gemini",
  content: `Getting a first response from the Gemini API takes minutes. Getting an automation you can actually trust takes a bit more: credential hygiene, schemas that hold, loops that terminate, costs that are visible, and a way to test prompt changes before they reach production. This guide walks through the parts of Gemini API automation that decide whether a prototype survives contact with reality, with Python examples using the google-genai SDK.

## API key setup and project hygiene

The google-genai package is the successor to the older google-generativeai SDK, which is in maintenance mode. Start new work on google-genai and stay there. On top of that choice, a few rules of key hygiene pay for themselves immediately:

- One key per environment. A development key with a hard spend cap, separate keys for staging and production, so a single leak cannot drain the whole budget.
- Keep keys in environment variables or a secret manager, never in source. If a key has ever been committed to a repository, treat it as compromised: rotate it and check its usage history.
- Isolate automation workloads in their own Google Cloud project with billing alerts enabled. A key tied to a dedicated project limits the blast radius of both spend and access.
- Log a short key suffix with each request so you can tell which credential made which call — never the key itself.

None of this is glamorous. All of it is cheaper than the incident it prevents.

## Structured output with response schemas

Most automation is not chat. It is turning messy input into records a system can store, which means you want JSON you can validate, not prose you can regex. The API supports response schemas for exactly this:

\`\`\`python
import os

from google import genai
from pydantic import BaseModel


class Ticket(BaseModel):
    category: str
    urgency: int
    needs_human: bool
    summary: str


client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Ticket: invoice download has failed since Tuesday's release.",
    config={
        "response_mime_type": "application/json",
        "response_schema": Ticket,
    },
)

ticket = Ticket.model_validate_json(response.text)
\`\`\`

Note that the example still parses and validates after the model has done its work. That is deliberate, and it is the habit that matters.

### The schema is not the validation

- A response schema constrains shape, not sense. An urgency of 9 on a 1-to-5 scale is schema-valid and business-invalid, so check ranges and allowed values in your own code.
- Reject loudly. An automation that quietly accepts a malformed record ships the error downstream, where it costs more to find.
- Version the schema in source control. It is the contract with every downstream consumer, and changing it deserves the same review as a database migration.

## The function calling loop

Tool calling turns the model into the decision layer of a loop: it requests a function call, your code executes it, you return the result as a function response, and the loop continues until the model produces a final answer. The rules that keep the loop sane:

- Declare tools with typed parameters and precise, terse descriptions.
- Validate arguments before executing anything with side effects. The model asking to call a tool is a request, not a fact.
- Cap iterations. A model that has not finished in N rounds is stuck, and stuck is a status to report, not a reason to keep paying.
- Return tool errors as tool results so the model can correct course, and log every call either way.

The underlying discipline is to treat the model as a component behind an interface. The tools are the interface, and they should behave identically whether called by a cron job, a test, or the model. If you want that loop built out end to end, [building AI agents with Google Gemini](/articles/building-ai-agents-with-google-gemini/) covers it in detail.

## Batching and rate limits

Rate limits are enforced per project and per model, in requests per minute and tokens per minute, and they vary by tier. Plan for them before deploy rather than after the first 429:

- For fan-out work, use the async client (client.aio) with a semaphore that caps concurrency, so 500 queued tasks become 20 in-flight requests.
- For workloads that do not need an answer in seconds — overnight enrichment, weekly digests, backfills — use the batch mode the Gemini API offers: submit a job containing many prompts, collect the results later, and pay a lower rate than interactive requests.
- Honour 429 responses with backoff. Retrying a throttled endpoint immediately makes the throttling worse.

## Cost control with token budgets

Automation spend is output tokens multiplied by volume, plus the input tokens you keep re-sending. Controls, in order of how cheap they are:

- Set max_output_tokens on every call. A model that has decided to be verbose should not be able to quietly triple the cost of a job that runs ten thousand times a day.
- Log response.usage_metadata per request and store it. Cost drift is the earliest visible symptom of prompt rot: an edit that doubles output length shows up in token counts long before it shows up on the invoice.
- Trim context before sending. If the task needs the last five messages, ship the last five, not the whole thread.
- For jobs that repeat the same long instructions, use context caching so a static preamble is not billed at full input price on every call.

## Retries with exponential backoff

Transient failure is normal. Retry the transient statuses with exponential backoff and jitter, and never retry a 400 — an invalid request stays invalid no matter how patiently you ask:

\`\`\`python
import random
import time

RETRYABLE = {429, 500, 503}


def generate_with_retry(prompt: str, *, max_attempts: int = 5) -> str:
    for attempt in range(1, max_attempts + 1):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
                config={"max_output_tokens": 512},
            )
            return response.text
        except genai.errors.APIError as exc:
            if exc.code not in RETRYABLE or attempt == max_attempts:
                raise
            time.sleep(min(2 ** attempt, 30) + random.random())
    raise RuntimeError("unreachable")
\`\`\`

The same skeleton works with the async client and an asyncio.sleep. One rule is not negotiable: never swallow the final error. An automation that silently returns nothing is worse than one that raises. The exception lands in your monitoring where somebody sees it; the silent version lands in somebody's inbox three weeks later as a complaint. Fail loudly, always.

## Offline evaluation before you trust a prompt change

The last piece is the one most teams skip, and it is the one that makes everything above sustainable. A prompt change is a code change to a system with no compiler, and the only thing standing between you and a quiet regression is an eval set:

- Build a golden set of representative inputs with expected outputs — records, not vibes.
- Assert on schema validity, field ranges and key content checks, and fail the run rather than the log.
- Run it in CI on every prompt, model or schema change. If the change beats the old version on the harness, ship it; if not, you found out for free.

Prompts drift, models are deprecated and replaced, and nothing announces that as a breaking change. A small offline harness turns those events from emergencies into routine maintenance. I go deeper on the mechanics in [evaluating AI agents](/articles/evaluating-ai-agents/).

That is the whole stack: scoped keys, typed outputs, bounded loops, visible costs, sane retries and a harness that gates change. It is unglamorous by design — that is the difference between a demo and a dependency. If you want it built for you, this is bread-and-butter [Gemini development](/services/gemini-development/), usually wrapped in straightforward [Python automation](/services/python-automation/).`,
  relatedArticles: [
    "building-ai-agents-with-google-gemini",
    "evaluating-ai-agents",
    "automating-google-workspace-with-ai",
  ],
  relatedServices: ["gemini-development", "python-automation", "llm-development"],
};
