import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "automating-google-workspace-with-ai",
  title: "Automating Google Workspace with AI, safely",
  seoTitle: "Automating Google Workspace With AI, Safely: The Approach",
  metaDescription: "Automating Google Workspace with AI safely: least-privilege OAuth scopes, read-only defaults, structured API access over scraping, and audit logging.",
  excerpt: "Workspace is where an agent's context lives \u2014 and it is an account with real send authority. Least-privilege scopes, read-only defaults, structured API access, and audit logging are what make it safe.",
  date: "2026-08-27",
  readingMinutes: 6,
  tag: "MCP",
  content: `Workspace is where the context an agent needs actually lives: the inbox it should triage, the calendar it should prepare from, the sheets it should reconcile. It is also an account with real send authority and real documents in it, which is why AI-plus-Workspace projects fail more often from scope creep than from model quality.

This is the approach I use, built into the [google-services-mcp](/projects/google-services-mcp/) server: narrow scopes, read-only defaults, structured API access, and a log of every call.

## Start from the scopes

Google's OAuth scopes are the security model, and they are granular enough to be worth reading closely. The differences matter:

- Gmail: \`gmail.readonly\` reads mail; \`gmail.send\` sends without reading; \`gmail.compose\` manages drafts; \`gmail.modify\` reads and applies labels. Sending and reading are separate grants on purpose.
- Calendar: \`calendar.readonly\` covers listing and reading events, attendees, and recurrence.
- Drive: \`drive.readonly\` lists and reads metadata and content.
- Sheets: \`spreadsheets.readonly\` reads ranges; the write scope is a separate grant.

The principle: choose scopes per task, not per project. An inbox summariser needs \`gmail.readonly\` and nothing else in the mail family; giving it \`gmail.modify\` "for later" is how later arrives early. Google supports incremental authorization — requesting additional scopes when a feature actually needs them — which turns scope minimisation from an aspiration into a workflow.

Scope minimisation is also user-trust engineering. A consent screen that asks for exactly what the feature does is one a user can read; one that asks for everything is one they learn to click through, which helps nobody.

## One decision before the first scope

There is a choice to make before requesting any scope at all: whether the app lives inside your own Workspace domain or is published for external users. Internal apps stay within the domain and skip the verification review; publishing externally — especially with Gmail's sensitive scopes — means Google's verification process, including the security assessment that sensitive scopes can trigger. For a personal automation tool or a single-company deployment, internal is the honest choice. The verification path exists for genuinely public apps, and it is worth budgeting for in advance rather than discovering mid-build.

## Read-only by default

The catastrophic failure class for a Workspace agent is an accidental write: an email sent, an event moved, a row overwritten. So the read path and the write path get different lifecycles:

- Read tools are the default surface. They get exercised constantly, and the worst outcome is a wasted turn or data in the conversation that was already the user's.
- Write tools register only when an explicit scope is declared in the server's environment.
- Destructive actions — sending, deleting, overwriting — require a confirmation flag, and without it return a preview of what they would do.

This is not a compromise of capability; it is sequencing. Weeks of read-only traffic is exactly the evidence you want before enabling a single write, because it shows whether the model is choosing tools and arguments correctly at all.

Tokens are part of the read-only story too. A long-running server holds a refresh token, so where it is stored and what it grants are the same decision as the scopes: an environment-scoped store, one token per service, and refresh handled in a single place. The common shortcut — a broad refresh token in a shared config so any part of the code can call anything — quietly undoes the scope work in one file.

## Structured access, not screen scraping

The alternative some projects reach for — a headless browser driving the Gmail web interface — is worse on every axis. It breaks when Google changes the interface, which is routine; it handles sessions and second factors in ways that are fragile at best; and automated access to consumer accounts outside the official interfaces sits against Google's terms of service.

The APIs are the designed interface, and they happen to be better agent food:

- Gmail: search with the same query syntax users know — \`is:unread newer_than:1d from:client\` — and get threads, messages, labels, and metadata as JSON.
- Calendar: events with attendees, recurrence, and conference data, queried by time window.
- Drive: files with names and MIME types, searchable by name or query.
- Sheets: ranges in A1 notation, read as grids.

A model reasons better over compact structured content than over rendered page text, and the token cost drops accordingly. The MCP layer's job is normalisation: Google's responses carry envelopes the model does not need, so the tools return the fields the task actually uses.

## Audit logging

The Workspace admin console has its own audit logs for mail, Drive, and Calendar activity, and they answer what happened to this record. They do not answer which agent run did it and why, because the admin console cannot see your intent layer.

So the server keeps its own: every tool call logged with the user, the tool, the arguments, the outcome, and the latency; writes logged before execution as well as after. When something looks wrong in an account three weeks later, the difference between "an agent moved this event during the 09:00 prep run, here is the reasoning trace" and "we have no idea" is the difference between an audit and an incident. Retention is worth deciding rather than inheriting: tool-call logs contain arguments, arguments can contain message bodies, so the log needs the same access control as the data it describes and a deletion story that matches.

## Three automations that work

**Inbox triage.** Read the last 24 hours of unread mail, classify by sender history and content into the labels that already exist, and produce a summary with suggested labels. Fully read-only. The write version — applying labels — needs \`gmail.modify\` and is worth enabling only after the read version's suggestions have looked right for a few weeks. Drafting replies is a further step, and needs \`gmail.compose\`; the drafts stay in the drafts folder, which is the correct place for a model's first attempts.

**Meeting prep.** Tomorrow's calendar events, attendees resolved to names, related Drive documents matched by title — all read-only, composed into a brief per meeting. Nothing is modified; the value is entirely in the assembly, and the failure modes are all harmless: an empty brief is just an empty calendar.

**Sheet reconciliation.** Read the tracking sheet and the CRM export, compare on the shared key, and list mismatches with the evidence for each. The read-only version prints the diff; the write version, behind its scope, applies corrections row by row with the diff as its preview. The read version is the one that proves the matching logic, so it runs first, for as long as it needs to. It is also the pattern that generalises to any two sources of truth: read both, diff, then decide — deliberately — who applies the correction.

## The order of operations

Narrow scopes, read-only first, structured access, logged every step — in that order, a Workspace agent is a tool I am willing to let near my own account. Out of order, it is a demo with permissions. The server behind this pattern is [google-services-mcp on GitHub](https://github.com/hamids-ai-automations/google-services-mcp), the approach is what I do under [MCP development](/services/mcp-development/), and the [projects page](/projects/) covers the same discipline applied to other systems.`,
  relatedArticles: ["building-mcp-servers-for-ai-agents", "building-secure-ai-applications", "mcp-servers-that-fail-in-production"],
  relatedServices: ["mcp-development", "ai-security"],
};
