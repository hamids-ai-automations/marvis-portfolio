import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "gohighlevel-api-integration",
  title: "How to integrate external APIs with GoHighLevel",
  seoTitle: "GoHighLevel integration: webhooks, tokens and pagination",
  metaDescription:
    "Webhook signature verification, idempotency, OAuth single-flight token refresh, honest pagination and offline mocks for solid GoHighLevel API integration.",
  excerpt:
    "The GoHighLevel integration pattern that survives live sub-accounts: verified webhook intake, single-flight token refresh, honest cursor pagination and offline mocks before first write.",
  date: "2026-11-25",
  readingMinutes: 6,
  tag: "GoHighLevel",
  content: `Integrating an external API with GoHighLevel is mostly trust engineering. The platform holds live contacts, conversations and pipelines for paying sub-accounts, so the interesting work is not calling endpoints — it is verifying that events really came from GoHighLevel, refreshing access tokens without races, paginating without losing records, and proving all of it against a mock before touching a live account. This is the pattern I use for GoHighLevel integrations, in Python.

## Webhook intake: verify, then trust

GoHighLevel workflows can call your service through webhooks, and the first rule of receiving one is that an unverified webhook is an attacker-controlled function call. GoHighLevel delivers webhooks with a hash signature computed from your secret; verify it with HMAC and a constant-time comparison before you parse anything:

\`\`\`python
import hashlib
import hmac


def verify_signature(secret: bytes, body: bytes, signature: str) -> bool:
    digest = hmac.new(secret, body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(digest, signature)
\`\`\`

Verify the raw request body, byte for byte, and parse only after verification succeeds — JSON parsing of an untrusted payload is attack surface. Check the exact header and hashing scheme against the current documentation for your integration type, and on a mismatch, reject with a 401 and log it. A webhook you cannot verify is a webhook you should not act on.

### Idempotency on top of verification

Delivery is at-least-once: retries and network hiccups mean duplicates will arrive. Deduplicate on a stable event identity — an event ID from the payload, or a hash of the body plus a timestamp bucket — in a store that survives restarts, such as Redis with a TTL or a database table:

- If the event has been seen, return 200 immediately and skip processing. GoHighLevel only needs the acknowledgement.
- Processing itself must be idempotent or guarded by a lock, so two deliveries racing each other cannot both act.

## The token lifecycle: OAuth 2.0 with single-flight refresh

GoHighLevel API access uses OAuth 2.0: a short-lived access token and a long-lived refresh token per integration. Access tokens expire quickly, so refresh proactively — whenever a token is within a few minutes of expiry — and handle the race where a burst of concurrent requests all discover the same expired token at once. The fix is single-flight refresh:

- Acquire a lock before refreshing. If the holder refreshed while you waited, use the new token and skip your own refresh call.
- Store the token and its expiry in one shared place — a database row or cache entry — so every worker reads a single source of truth.
- Persist any newly issued refresh token atomically. GoHighLevel rotates refresh credentials, and losing the current one means reauthorising every connected sub-account.
- Treat a failed refresh as a loud failure. Do not fall back to calling the API with a dead token and hoping.

Build this once, in one module, so every endpoint call goes through a get_access_token call that never returns a token inside its own expiry window. Token handling scattered across a codebase is where duplicates, races and dead-token 401 loops come from.

## Pagination done honestly

List endpoints in the GoHighLevel API are cursor-paginated: you pass a limit and a startAfterId cursor, and receive a page of records plus the cursor for the next one. Honest pagination means three explicit decisions:

- **Page size.** Respect the documented maximum limit rather than guessing. Asking for more than the cap silently truncates results, and truncation looks exactly like "there was no more data".
- **Termination.** Stop when a page comes back empty, or when the next cursor equals the one you just used. A stuck cursor with a full page is an infinite loop that looks like progress on every monitoring graph except the request count.
- **Counting.** Count the records you actually received as you accumulate them. Trust the payload, not the metadata total — totals can lag behind writes, and lagging totals are how records silently go missing from a sync.

These failure modes are quiet, which is why they deserve their own article: I wrote up the specific traps in [GoHighLevel API pagination traps](/articles/gohighlevel-api-pagination-traps/).

## Custom fields and custom objects

Contacts carry standard fields, but real sub-accounts live in custom fields and, increasingly, custom objects. Both require discovery before writes:

- Fetch the custom field definitions for the sub-account first. Keys are per-location: a key that exists in one sub-account may not exist in another, and writes with unknown keys should fail loudly rather than be dropped.
- Map your integration's canonical field names to the sub-account's keys in one place, so the mapping is auditable and testable instead of smeared across the codebase.
- Custom objects require the object schema and its fields before you can create records. Validate against the fetched schema before posting.
- Treat definition drift as routine maintenance: re-fetch definitions on a schedule or on write failure, and alert when a field your pipeline depends on disappears.

## Wiring workflows: inbound and outbound triggers

Integration usually flows both ways:

- **Outbound.** A GoHighLevel workflow step fires a signed webhook to your service — the trigger for enrichment, routing or syncing to another system. This is where the verification and idempotency from earlier do their work.
- **Inbound.** Your service writes back through the API: creating or updating contacts, adding notes and tags, appending to conversations, enrolling contacts in campaigns. Keep each write idempotent, with a stable external key or a check-then-write, so retries from your side cannot duplicate records.

Keep the orchestration in your service, not in the workflow builder. Workflow builders are good at firing events and poor at retries, validation and audit trails; your code is the opposite. The split that works: GoHighLevel emits events, your service owns the logic. [GoHighLevel workflow automation explained](/articles/gohighlevel-workflow-automation-explained/) covers that division of labour in more detail.

## Test against an offline mock first

A live sub-account is somebody's business. Work up a testing ladder instead of debugging against production writes:

- Record real responses — headers included — into fixtures and serve them from a mock. Exercise pagination logic, cursor termination and record counting against fixtures, including the weird pages: one with a repeated cursor, one with a null total, one 429 with a Retry-After header.
- Contract-test the token module: expiry thresholds, single-flight behaviour under contention, rotation persistence. These are pure logic and need no network at all.
- Signature-test the webhook route: a known secret, body and digest, plus a tampered-body case that must be rejected.
- Only then, a read-only smoke run against a live sub-account — list operations, no writes — before the first guarded write.

When the mock and the live API drift apart, refresh the fixtures from a read-only call. This is the same stance I take with any [AI integration](/services/ai-integration/): the untested path is the untrusted path, and the mock is where the trust gets built. For the wider architecture — where an LLM fits into a GoHighLevel pipeline and how it stays read-only until proven — that is the core of the [GoHighLevel automation](/services/gohighlevel-automation/) work I do, and the testing ladder above is non-negotiable in it.`,
  relatedArticles: [
    "gohighlevel-api-pagination-traps",
    "gohighlevel-workflow-automation-explained",
    "server-side-conversion-tracking",
  ],
  relatedServices: ["gohighlevel-automation", "ai-integration", "marketing-technology"],
};
