import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "mcp-servers-that-fail-in-production",
  title: "Why MCP servers fail in production (and the four checks that prevent it)",
  seoTitle: "Why MCP Servers Fail in Production (and How to Prevent It)",
  metaDescription: "Most MCP servers work in a demo and degrade in production. The failures cluster around schema strictness, error legibility, pagination, and permission scope.",
  excerpt: "Most MCP servers work in a demo and degrade in production. Four failure modes account for most production incidents: schema strictness, error legibility, pagination, and permission scope.",
  date: "2026-11-20",
  readingMinutes: 3,
  tag: "MCP",
  content: `The Model Context Protocol is a small specification. A server exposes tools, a client calls them, results come back as content. Getting a server to answer in a demo takes an afternoon. Getting one to survive an agent that retries, guesses, and passes partial arguments takes considerably longer.

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
  relatedArticles: ["building-mcp-servers-for-ai-agents", "evaluating-ai-agents", "automating-google-workspace-with-ai"],
  relatedServices: ["mcp-development", "ai-agent-development"],
};
