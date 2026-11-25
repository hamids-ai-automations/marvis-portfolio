/**
 * Articles. Bodies are Markdown rendered by src/lib/markdown.js.
 * Each piece is grounded in a repository in the master record.
 */

export const ARTICLES = [
  {
    slug: 'mcp-servers-that-fail-in-production',
    path: '/articles/mcp-servers-that-fail-in-production/',
    title: 'Why MCP servers fail in production (and the four checks that prevent it)',
    description:
      'Most MCP servers work in a demo and degrade in production. The failures cluster around schema strictness, error legibility, pagination, and permission scope.',
    date: '2026-11-20',
    tags: ['MCP', 'AI Engineering', 'Reliability'],
    relatedProject: 'shopify-growth-mcp',
    relatedService: 'mcp-development',
    body: `The Model Context Protocol is a small specification. A server exposes tools, a client calls them, results come back as content. Getting a server to answer in a demo takes an afternoon. Getting one to survive an agent that retries, guesses, and passes partial arguments takes considerably longer.

Four failure modes account for most of the production incidents I have seen, including my own.

## 1. Schemas that accept too much

A JSON Schema with loose types will accept almost anything, and the model will supply almost anything. \`{"limit": "twenty"}\` passes when the schema says \`string\`, then the handler throws a \`ValueError\` that the agent reads as a transient problem and retries.

Strict schemas with enums, bounds, and \`additionalProperties: false\` are not pedantry — they are the contract that lets a model self-correct. When the client validates locally, a bad argument becomes a fast, cheap error instead of a wasted turn.

\`\`\`python
class ListOrdersArgs(BaseModel):
    model_config = ConfigDict(extra="forbid")
    limit: int = Field(default=20, ge=1, le=100)
    status: Literal["open", "closed", "any"] = "any"
\`\`\`

The same rule applies to output. If the agent must parse what comes back, return structured content, not a paragraph the model has to interpret.

## 2. Errors a model cannot act on

Tool errors travel to the model as text. A stack trace teaches it nothing except that something went wrong, which encourages blind retries. The useful shape is: what failed, whether retrying can help, and what to change.

| Instead of | Return |
| --- | --- |
| \`KeyError: 'shop_id'\` | \`Missing required argument shop_id. Call list_shops to obtain it.\` |
| \`500 Internal Server Error\` | \`Upstream returned 500. Retry once, then report to the user.\` |
| \`Rate limited\` | \`Rate limit reached. Retry after 30 seconds; do not loop.\` |

This is not cosmetic. An agent that knows a retry cannot succeed will stop, and stopping is usually the correct behaviour.

## 3. Pagination that stops early

Cursor pagination implemented as "loop until the response is empty" breaks quietly when an upstream API returns an empty page with a non-null cursor, or when the cursor is a timestamp that does not advance on ties. The dataset looks complete and is not.

The defensive pattern is a termination predicate plus an invariant:

- Terminate on an explicit \`has_more === false\`, never on page length.
- Assert that the cursor changes between pages; abort if it repeats.
- When the caller expects a known total, assert the collected count against it.

I have seen a 4,000-record export truncate at 250 because the third page happened to return an empty array.

## 4. Write tools with no boundary

The fastest way to make a server dangerous is to expose every endpoint symmetrically. Reads and writes deserve different treatment: separate scopes, explicit opt-in, and a preview before any destructive action.

A practical default: the stdio transport starts read-only. Write tools register only when the environment declares a write scope, and every destructive tool returns a dry-run preview when called without a confirmation flag.

## The checks worth automating

Before a server goes anywhere near a real system:

1. Every tool has a schema with bounds and no additional properties.
2. Every error path returns an actionable sentence, not an exception dump.
3. Every paginated tool has a test that fails when pagination truncates.
4. Every write tool is disabled unless a scope is explicitly configured.

None of these are interesting. All of them are cheaper than the incident.`,
  },

  {
    slug: 'evaluating-ai-agents',
    path: '/articles/evaluating-ai-agents/',
    title: 'Evaluating AI agents: the five things actually worth measuring',
    description:
      'Agent quality is not a vibe. Tool choice, argument validity, schema conformance, refusal correctness, and step cost can all be scored deterministically before release.',
    date: '2026-11-14',
    tags: ['AI Agents', 'Evaluation', 'Testing'],
    relatedProject: 'gemini-agent-reliability-kit',
    relatedService: 'ai-agent-development',
    body: `"The agent feels better now" is not a release criterion. It is a description of the last five prompts you happened to try. Agents are programs whose control flow is chosen at runtime, which makes behavioural regression the default outcome of any change unless something measures it.

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
  },

  {
    slug: 'gohighlevel-api-pagination-traps',
    path: '/articles/gohighlevel-api-pagination-traps/',
    title: 'GoHighLevel API: the pagination and token traps that break automations',
    description:
      'HighLevel automations rarely fail loudly. They truncate datasets, race on token refresh, and reprocess webhooks. Here is how to detect and prevent each one.',
    date: '2026-11-08',
    tags: ['GoHighLevel', 'API', 'Automation'],
    relatedProject: 'ghl-automation-engine',
    relatedService: 'gohighlevel-automation',
    body: `GoHighLevel is a large platform with an API that covers a fraction of what the UI does, and the gap is where automations break. Three issues account for most of the failures I have debugged in agency accounts.

## Trap 1: the dataset that looks complete

HighLevel list endpoints paginate. A naive client does this:

\`\`\`python
page = 1
while True:
    res = get(f"/contacts/?locationId={loc}&page={page}")
    contacts.extend(res["contacts"])
    if not res["contacts"]:
        break
    page += 1
\`\`\`

This is fine until the API returns a page with fewer items than the page size but more data still available, or until records created between page requests shift the offsets. The export looks complete, the report is wrong, and nobody notices for a month.

The fix is to stop trusting page emptiness:

- Use the documented page limit and record the total when the API provides one.
- Assert that the number of collected records matches the expected count where a count endpoint exists.
- Log the last cursor and the timestamp of the run so a later audit can reproduce it.
- Prefer filtering by \`dateUpdated\` windows for incremental syncs — offsets shift, time windows do not.

## Trap 2: two workers, one refresh token

OAuth access tokens expire. If three parallel workers notice the expiry at the same time, all three refresh. HighLevel rotates refresh tokens on use, so the second and third refresh calls can invalidate the first — and the account ends up with a token nobody holds.

Single-flight refresh solves it:

\`\`\`python
async def get_token(self) -> str:
    async with self._lock:
        if self._token and time.time() < self._expires_at - 60:
            return self._token
        async with self._refresh_lock:
            if self._token and time.time() < self._expires_at - 60:
                return self._token
            data = await self._refresh()
            self._token = data["access_token"]
            self._expires_at = time.time() + data["expires_in"]
            await self._persist()
            return self._token
\`\`\`

The double check inside the lock is not redundant — it is what stops a queue of waiters from each performing a refresh in turn.

Persistence matters as much as the lock. Token state belongs in a store both workers can read, not in process memory.

## Trap 3: webhooks that arrive twice

Webhook delivery is at-least-once. Handlers that create a contact, send a message, or move an opportunity will duplicate work unless they are idempotent.

The practical pattern:

1. Derive an idempotency key from the event payload — event type plus entity id plus timestamp, hashed.
2. Insert the key into a store with a unique constraint before doing the work.
3. On conflict, acknowledge and skip.
4. Route permanently failing events to a dead-letter table with the raw payload.

Acknowledge quickly and process asynchronously. Slow handlers get retried, and retries compound the duplicate problem.

## A read-only audit first

Before changing an account, run a read-only pass and answer four questions:

| Question | Why it matters |
| --- | --- |
| Does every location have a valid token? | Expired tokens look like empty data, not errors. |
| Do workflow counts match between locations? | Divergence usually means a copy that never finished. |
| Are there opportunities stale beyond the pipeline norm? | Silent automation failure shows up here first. |
| Do contact counts reconcile against the CRM export? | Catches truncation before it reaches a report. |

None of this requires write access, and it finds most broken automation in an afternoon.`,
  },

  {
    slug: 'server-side-conversion-tracking',
    path: '/articles/server-side-conversion-tracking/',
    title: 'Server-side conversion tracking without inflating your numbers',
    description:
      'Moving conversions server-side fixes data loss but creates duplication if deduplication, event identity, and consent handling are not designed first.',
    date: '2026-10-30',
    tags: ['Marketing Technology', 'GA4', 'Meta CAPI'],
    relatedProject: 'conversionbridge',
    relatedService: 'marketing-technology',
    body: `Server-side tracking is usually sold as a fix for browser restrictions. It is, but the first thing most implementations do is double-count. Pixel plus server event, no shared identity, no deduplication — and suddenly the platform reports 160 conversions for 100 sales.

## The design decision that matters

Every event needs a stable identity before it needs a transport. Decide these three things first:

1. **Event name and meaning.** One canonical name per business action. \`purchase\` is a completed payment with a transaction id, not "someone reached the thank-you page".
2. **Event id.** Generated once, at the source of truth, and carried to every destination. Platforms deduplicate on this value.
3. **Attribution inputs.** Click ids, UTMs, and any first-party identifiers captured at landing and stored alongside the order.

Everything else is plumbing.

## Deduplication

GA4 deduplicates on \`event_id\` within a window; Meta deduplicates on \`event_id\` when \`event_name\` and identity also match. Both require the same id to arrive from both browser and server.

\`\`\`json
{
  "event_name": "purchase",
  "event_id": "order_88213",
  "event_time": 1735689600,
  "action_source": "website",
  "user_data": { "em": "<sha256>", "ph": "<sha256>" },
  "custom_data": { "value": 149.0, "currency": "USD" }
}
\`\`\`

The event id comes from the order, not from a random uuid generated in the browser — otherwise the server cannot reproduce it.

## What to hash, what not to

Meta and Google accept hashed identifiers. Hash email and phone with SHA-256 after normalisation: trim, lowercase, strip punctuation from phone numbers. Do not hash click ids, currency, or value — they are matched as-is.

Normalisation failures are the most common cause of "enhanced matching" reporting low coverage. \`Hamid@Example.com \` and \`hamid@example.com\` are different inputs to the hash function.

## Consent and the honesty problem

Server-side does not exempt you from consent. If a user declined marketing cookies, sending their hashed email to an ad platform is still a compliance decision, not a technical one.

A defensible default:

- Collect the event server-side regardless, for your own analytics.
- Gate ad-platform forwarding on the recorded consent state.
- Keep the consent state with the event so a later audit can explain why an event was or was not forwarded.

## Verification

Before trusting the dashboard, trace one real conversion end to end:

- Browser debug view shows the event with its id.
- Server logs show the same id forwarded with a 200 response.
- The platform's event manager shows one event, not two.
- Analytics shows one conversion, matching the CRM.

If any of those four disagree, the implementation is wrong — regardless of what the totals look like.

## The uncomfortable conclusion

Most attribution disputes are not modelling problems. They are duplicated events, mismatched ids, and hashed values that never matched in the first place. Fix identity before adding a data clean room.`,
  },
];

/**
 * @param {string} slug
 */
export function getArticle(slug) {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}
