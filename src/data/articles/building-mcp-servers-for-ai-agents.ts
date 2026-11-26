import type { Article } from "@/lib/types";

export const article: Article = {
  slug: "building-mcp-servers-for-ai-agents",
  title: "Building MCP servers for AI agents: a practical guide",
  seoTitle: "Building MCP Servers for AI Agents: A Practical Guide",
  metaDescription: "Practical guide to building MCP servers: tools, resources, prompts, stdio versus HTTP transports, schemas agents can call, read-only defaults, and testing.",
  excerpt: "The MCP specification is the easy 20% of a server. The remaining 80% is API design for a model making decisions under uncertainty: schemas, permissions, errors, and testing.",
  date: "2026-10-24",
  readingMinutes: 7,
  tag: "MCP",
  content: `The Model Context Protocol standardises the connection between AI applications and the systems those applications need to touch: tools to call, data to read, prompts to reuse. The specification is the easy 20% of an MCP server. The remaining 80% is the same work as any API design — naming, schemas, permissions, errors, and testing — with one difference: the primary consumer is a model making decisions under uncertainty.

This is a practical guide to that 80%. The running example is the [google-services-mcp](/projects/google-services-mcp/) server I maintain, which exposes Gmail, Calendar, Drive, and Sheets to MCP clients, read-only by default.

## The three primitives

MCP servers can expose three things, and the distinction matters more than it first appears:

- **Tools** are model-controlled. The client, on the model's behalf, decides which to call and with what arguments. Tools are actions or queries: send the email, list the events, search the threads.
- **Resources** are application-controlled. The host application decides what to attach to the conversation — a file's contents, a configuration record. Resources are context, not commands.
- **Prompts** are user-controlled: reusable message templates the user selects deliberately, typically surfaced in the client's interface.

The common mistake is exposing things as tools that should be resources, or the reverse. A model given a "get file contents" tool will call it liberally mid-task; the same file exposed as a resource gets attached once, deliberately, by the application. Most integrations need tools first, and resources only when a client actually benefits from attaching context.

## stdio or streamable HTTP

MCP defines multiple transports, and the choice shapes the security model.

**stdio** runs the server as a local subprocess of the client. Configuration is command-line arguments and environment variables; secrets stay on the machine; there is no network surface. It is the right default for personal tooling and anything bound to one user's credentials.

**Streamable HTTP** runs the server remotely, reachable by many clients, which makes authentication, authorization, and multi-tenancy your problems. The current authorization guidance builds on OAuth 2.1. The earlier SSE-based HTTP transport has been superseded by streamable HTTP in newer revisions of the spec — if you are starting now, target the current transport, not the deprecated one.

The decision rule: start with stdio unless multiple users or multiple machines must reach the server, or the host cannot spawn local processes. Remote deployment multiplies surface area; earning that surface area takes actual demand.

One transport-level detail worth knowing: the protocol negotiates its version between client and server, so a server built against a recent revision can still talk to older clients within the negotiated range. Read the negotiated version, log it, and do not assume the client matches the spec revision you coded against.

## Designing schemas an agent can call correctly

The client validates tool arguments against the declared JSON Schema where it can, and the model reads the same schema to decide what to pass. A loose schema wastes that entire channel. The declaration I aim for:

\`\`\`json
{
  "name": "calendar_list_events",
  "description": "List calendar events in a time window. Times are RFC 3339 strings with timezone offsets.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "calendar_id": {
        "type": "string",
        "description": "Calendar identifier. Use 'primary' for the user's main calendar.",
        "default": "primary"
      },
      "time_min": { "type": "string", "description": "Start of the window, inclusive." },
      "time_max": { "type": "string", "description": "End of the window, exclusive." },
      "max_results": { "type": "integer", "minimum": 1, "maximum": 100, "default": 25 }
    },
    "required": ["time_min", "time_max"],
    "additionalProperties": false
  }
}
\`\`\`

The rules that make this work:

- Names are domain-prefixed verb-object. \`calendar_list_events\` disambiguates itself from a Drive file listing in the same server.
- Descriptions carry the units and formats a model gets wrong: RFC 3339, timezone offsets, inclusive versus exclusive bounds.
- Defaults exist for every optional parameter, so a model with partial context is not forced to invent the rest.
- \`additionalProperties: false\` everywhere. Extra keys passing silently is how typos survive until the handler crashes.

Return values deserve the same discipline. Compact, structured content the model can reason over beats a dumped API response: normalise Google's envelope fields away, return the fields the task actually needs, and paginate deliberately rather than dumping a thousand items into context.

## Permission gating and read-only defaults

The dangerous MCP server is the symmetric one — every upstream capability exposed, reads and writes side by side. The design I defend in review:

- Read tools register by default. They are the surface that earns trust.
- Write tools register only when an explicit scope is declared in the environment — an opt-in, not a default.
- Destructive tools require a confirmation argument and return a dry-run preview without it.
- Scopes are per service, so granting Gmail writes does not silently grant Calendar or Drive writes.

OAuth scopes should be the narrowest that support the task: \`gmail.readonly\`, not Gmail's full-access scope, even when a write path is planned later. Scopes are cheap to add and visible to revoke; a broad grant at setup time tends to live forever.

## Errors an agent can recover from

Tool errors travel to the model as content. A stack trace teaches the model exactly one thing: something went wrong. It encourages blind retries, which is the worst possible response to most failures. An error the model can act on has three parts — what failed, whether retrying can help, and what to change:

- Missing refresh token: "Not authenticated. The user must complete the OAuth flow before any Gmail tool can run." Not retryable.
- Rate limit: "Upstream rate limit hit. Retry after a pause; do not loop." Retryable, bounded.
- Invalid argument: "time_max must be after time_min; got a window with a negative duration." Repairable, in the sense that the model can fix the arguments.

Logging belongs in the same place. A tool error the model recovered from is still an event a human should be able to find later: the arguments, the failure, the retry, and the eventual outcome. The cheapest reliable pattern is structured logging per call, keyed by the run, so a bad afternoon in production is a query rather than a reconstruction.

Setting the error flag on the content tells the client this is a tool failure rather than a successful result with an unfortunate payload, which keeps agents from treating error text as data.

## Testing with real clients

Three layers, in order. Unit tests over the handlers, which is ordinary engineering. Protocol-level tests that exercise the server through an MCP client library — listing tools, calling one, checking the content that comes back.

Then real-client testing, which is the layer that finds the interesting failures. Wrong tool choices, schema misreadings, and argument hallucination only appear when a model is actually driving the server. Run the server in a client you use daily, give it the tasks it is for, and watch what the model reaches for. The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) is the official tool for poking at a server manually — listing tools, invoking them with crafted arguments, inspecting the raw messages.

For CI, keep model-in-the-loop tests minimal and deterministic: recorded trajectories, asserted tool sequences, fixture responses. Deterministic does not mean weak — a recorded trajectory with asserted tool sequences catches the regressions that matter: a renamed tool the model now skips, a schema edit that broke argument conformance, an error message that stopped naming the field. The flakiness of live model calls belongs in a scheduled job, not a blocking pipeline.

The pattern generalises: strict schemas, read-only defaults, errors that teach, and tests that include the model. The production failure modes that appear when any of those are missing — pagination that truncates, permissions that sprawl, errors that loop — are documented in an earlier piece in the [articles index](/articles/), and the [MCP development work](/services/mcp-development/) covers building surfaces like this for other systems.`,
  relatedArticles: ["mcp-servers-that-fail-in-production", "automating-google-workspace-with-ai", "building-ai-agents-with-google-gemini"],
  relatedServices: ["mcp-development", "ai-agent-development"],
};
