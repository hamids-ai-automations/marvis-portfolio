# Architecture

A dependency-free static site generator. Node 20+, ES modules, zero npm dependencies. The build
reads a committed JSON snapshot of the owner's GitHub master record and renders `dist/`, which
Firebase Hosting serves with `cleanUrls` and `trailingSlash: true`.

```
data/master-record.json      committed snapshot of MASTER_DATABASE.json (source of truth)
        │
        ▼
src/lib/master-record.js     parse + integrity checks (schema, counts, hash)
src/lib/normalize.js         repositories → project view models, categories, titles, metrics
src/lib/model.js             assemble the site model (projects, articles, services, stats)
        │
        ▼
src/pages/*.js               one renderer per page family
src/templates/components.js  cards, headers, CTAs
src/lib/layout.js            document shell, nav, footer
src/lib/seo.js               meta tags, canonical, JSON-LD, sitemap, robots, llms.txt
src/lib/markdown.js          minimal Markdown subset renderer (no dependency)
        │
        ▼
src/build.js                 writes dist/ (38 routes) + sitemap.xml + robots.txt + llms.txt
scripts/validate.js          post-build quality gate
tests/*.test.js              node:test unit tests over the model and SEO helpers
```

## Layers

| Layer | Files | Responsibility |
| --- | --- | --- |
| Data | `data/`, `scripts/sync-data.js` | Fetch, verify, and freeze the master record |
| Domain | `src/lib/master-record.js`, `src/lib/normalize.js`, `src/lib/model.js` | Turn raw repositories into typed view models; enforce inclusion rules |
| Presentation | `src/pages/`, `src/templates/`, `src/lib/layout.js`, `src/styles.css` | Render HTML and the single stylesheet |
| Discovery | `src/lib/seo.js`, `src/lib/config.js` | Titles, descriptions, canonicals, JSON-LD, sitemap, robots, `llms.txt` |
| Delivery | `src/build.js`, `firebase.json`, `.github/workflows/` | Write `dist/`, apply headers/redirects, deploy |

## Data flow

1. `npm run sync` fetches `MASTER_DATABASE.json` from `hamids-ai-automations/github-profile-master-record`,
   validates it, computes a SHA-256 hash, and writes `data/master-record.json` only when the hash
   changes. A stale or malformed payload is rejected rather than committed.
2. `npm run build` reads the snapshot, builds the model, and renders every route. Curated copy in
   `src/content/project-overrides.js` may refine a project's prose, but every factual claim must
   restate a verified field from the snapshot.
3. `npm run validate` re-reads `dist/` and enforces the gate: required files, unique titles and
   descriptions, canonical URLs, one `<h1>` per page, no forms, no `mailto:`/`tel:` contact routes,
   WhatsApp as the only contact channel, resolvable internal links, sitemap coverage.
4. `npm test` covers the model, normalisation, and SEO helpers with `node:test`.

## Inclusion rules for projects

Enforced in `src/lib/normalize.js`:

- forks are never projects;
- the profile-README repository (`hamids-ai-automations`) is never a project;
- a repository with no description and no README is skipped;
- a `homepage` that points back at this site, at the repository itself, or at a bare GitHub owner page
  is discarded as a demo link (no circular demos).

## Routing

`firebase.json` owns the HTTP surface:

- `cleanUrls` + `trailingSlash` — every canonical route ends in `/`; file routes (`404.html`,
  `sitemap.xml`) never do;
- 301 redirects for retired paths (`/work`, `/writing/*`, `/open-source`, `/sitemap`, project slugs
  that were de-curated);
- security headers on every response (CSP, `X-Frame-Options`, `nosniff`, referrer and permissions
  policies) and a one-week cache for immutable assets, revalidation for HTML.

## Invariants

- No runtime JavaScript is required for content, navigation, or contact.
- No forms, no email, no phone-call CTAs — WhatsApp `+923167417135` is the sole contact channel.
- `dist/` is generated; never hand-edited.
- The snapshot in `data/` is reproducible and committed.
