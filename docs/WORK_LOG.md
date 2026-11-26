# Work Log

Append-only record of the Next.js 16 revamp. Dates are Pakistan time (UTC+5).

---

## 2026-11-25 — Audit, rebuild, content, SEO, CI/CD

### Audit

- Read the full legacy repository: custom zero-dependency Node SSG (38 routes), master-record data flow, single-stylesheet design, old workflows.
- Verdict: rebuild presentation/tooling, keep URLs, redirects, honesty rules, WhatsApp-only policy.
- Output: [PROJECT_AUDIT.md](PROJECT_AUDIT.md) (before/after table, decisions, preserved invariants).

### Rebuild

- Scaffolded **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui**; static export via `NEXT_OUTPUT=export`, `trailingSlash: true`, `images.unoptimized: true` (`next.config.ts`).
- Content model in `src/lib/types.ts` (`Service`, `Project`, `Article`, `LegalPage`); site identity/facts in `src/lib/site.ts`; metadata builder in `src/lib/seo.ts`.
- Components: sticky header with grouped services dropdown + mobile sheet menu, sticky footer (flex column + `mt-auto`), cards, FAQ accordions, breadcrumbs, markdown renderer, JSON-LD emitter, WhatsApp CTA, brief builder, section, framer-motion scroll reveal, theme toggle/provider, service icons, legal page.
- Design: dark-first emerald-on-charcoal theme; Space Grotesk / Inter / JetBrains Mono self-hosted via `next/font` (font-display swap); light mode via next-themes.

### Content migration & data freeze

- Migrated all 10 existing articles with **URLs preserved**; wrote **4 new articles** (2026-11-25): GoHighLevel API integration, AI automation for business operations, reliable AI agent workflows, Gemini API automation guide.
- Curated 19 project case pages in `src/data/projects.ts` — stats (98 public repos, stars, topics, language, updated) from the GitHub API **as of 2026-11-25**; every claim restates a verified repo fact.
- Authored 10 service landing pages; privacy + terms in `src/data/legal.ts`.
- Deleted: legacy generator `src/`, old scripts, `tests/`, `data/master-record.json` (1.3 MB), old workflows. Preserved: `.firebaserc`, `.gitattributes`, `firebase.json` (public dir `dist` → `out`; all 36 redirects kept).

### SEO infrastructure

- Per-page metadata through the Next metadata API (`src/lib/seo.ts`): unique title/description/canonical, OG + Twitter cards, article published time.
- JSON-LD: Person, WebSite, ProfilePage, BreadcrumbList, FAQPage, Service, BlogPosting, SoftwareSourceCode, ContactPage.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`, `public/llms.txt`, custom 404 (`not-found.tsx`).
- `scripts/generate-og.mjs`: sharp rasterizes committed SVG templates → `public/og.png` (1200×630) + `public/apple-touch-icon.png` (180×180); PNGs gitignored.

### CI/CD

- `firebase-deploy.yml`: push to `main` (paths-ignore docs) → bun install → lint → typecheck → og → build:export (+ 404.html copy) → validate → dual-mode deploy auth (WIF or `FIREBASE_SERVICE_ACCOUNT`, else skip with notice) → `firebase deploy --only hosting:marvis --non-interactive --project my-1st-web-app-ef52d` → live verification → summary. Concurrency `firebase-deploy-marvis`, cancel-in-progress.
- `ci.yml`: same build + validate on pull requests, no deploy.
- `live-check.yml`: daily cron 06:15 UTC (11:15 PKT), 19 production endpoints.
- `scripts/validate.mjs`: dependency-free gate over `out/` (unique titles/descriptions, canonicals, single H1, OG tags, WhatsApp CTA, machine surfaces, internal links, sitemap↔pages).

---

## 2026-11-26 — Verification

- **Build gate:** `bun run lint` clean; `bun run typecheck` clean; `bun run build:export` produced `out/` (static export, 404 copy fallback applied); `bun run validate` passed — no duplicate titles/descriptions, canonicals absolute, exactly one H1 per page, all internal links resolved, sitemap URLs matched generated pages, `wa.me/923167417135` present on every page.
- **All routes 200:** served `out/` locally and checked every page in the inventory (home, about, contact, services index + 10, projects index + 19, articles index + 14, privacy, terms) plus `sitemap.xml`, `robots.txt`, `llms.txt`, `manifest.webmanifest`, `404.html`.
- **E2E interactions:** header dropdown navigation, mobile sheet menu, FAQ accordions, scroll reveals, breadcrumb links.
- **Brief builder deep link:** selected service/timeline, typed a goal, confirmed the CTA opens `wa.me/923167417135?text=…` with the prefilled multi-line brief; confirmed nothing is stored or sent (pure client-side; CSP `form-action 'none'`).
- **Theme toggle:** dark ↔ light persists across reloads (next-themes); sticky header and **sticky footer** (flex column + `mt-auto`) verified on short and long pages.
- **VLM visual QA:** reviewed rendered pages across desktop/tablet/mobile widths — layout, spacing, contrast, no horizontal overflow, no broken images.
- **Push to GitHub:** committed to `main`; pipeline (lint → typecheck → og → build → validate) green in Actions.
- **Deploy outcome:** deployment step is credential-gated; with no verifiable secret available from this environment, the run validates the build and either deploys (if `FIREBASE_SERVICE_ACCOUNT` from the previous setup is still configured) or skips deploy with a notice. Either way the build itself is verified. Owner action for the first confirmed automated deploy: [NEXT_STEPS.md](NEXT_STEPS.md) #1.

---

## Template for future entries

```
## YYYY-MM-DD — <title>
### Changed
- <files/areas>
### Tested
- <what and result>
### Status
- <deploy state / blockers>
```
