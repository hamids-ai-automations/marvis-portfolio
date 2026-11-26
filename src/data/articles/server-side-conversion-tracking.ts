import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "server-side-conversion-tracking",
  title: "Server-side conversion tracking without inflating your numbers",
  seoTitle: "Server-Side Conversion Tracking Without Inflating Numbers",
  metaDescription: "Moving conversions server-side fixes data loss but creates duplication if deduplication, event identity, and consent handling are not designed first.",
  excerpt: "The first thing most server-side tracking implementations do is double-count. Design event identity, deduplication, and consent handling before the transport.",
  date: "2026-10-30",
  readingMinutes: 2,
  tag: "Marketing Technology",
  content: `Server-side tracking is usually sold as a fix for browser restrictions. It is, but the first thing most implementations do is double-count. Pixel plus server event, no shared identity, no deduplication — and suddenly the platform reports 160 conversions for 100 sales.

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
  relatedArticles: ["ai-automation-business-operations", "gohighlevel-workflow-automation-explained"],
  relatedServices: ["marketing-technology", "ai-integration"],
};
