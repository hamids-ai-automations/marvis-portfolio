import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "gohighlevel-api-pagination-traps",
  title: "GoHighLevel API: the pagination and token traps that break automations",
  seoTitle: "GoHighLevel API: The Pagination and Token Traps That Bite",
  metaDescription: "HighLevel automations rarely fail loudly. They truncate datasets, race on token refresh, and reprocess webhooks. Here is how to detect and prevent each one.",
  excerpt: "GoHighLevel automations rarely fail loudly: they truncate datasets, race on token refresh, and reprocess webhooks. Three issues account for most of the failures I have debugged in agency accounts.",
  date: "2026-11-08",
  readingMinutes: 3,
  tag: "GoHighLevel",
  content: `GoHighLevel is a large platform with an API that covers a fraction of what the UI does, and the gap is where automations break. Three issues account for most of the failures I have debugged in agency accounts.

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
  relatedArticles: ["gohighlevel-workflow-automation-explained", "gohighlevel-api-integration"],
  relatedServices: ["gohighlevel-automation", "ai-integration"],
};
