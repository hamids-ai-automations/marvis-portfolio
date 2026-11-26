# Marvis Portfolio — Muhammad Hamid

> **AI Automation Engineer | Gemini Developer | AI Agent Builder | GoHighLevel Automation Developer**

[![Deploy to Firebase Hosting](https://github.com/hamids-ai-automations/marvis-portfolio/actions/workflows/firebase-deploy.yml/badge.svg)](https://github.com/hamids-ai-automations/marvis-portfolio/actions/workflows/firebase-deploy.yml)
[![CI](https://github.com/hamids-ai-automations/marvis-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/hamids-ai-automations/marvis-portfolio/actions/workflows/ci.yml)

**Live site: <https://marvis.web.app>** — the personal portfolio of **Muhammad Hamid** (Lahore, Pakistan).

This repository is the single source of truth for the site: every push to `main` that changes site files runs the full quality gate (lint → typecheck → OG generation → static export → SEO/link validation) and, if the checks pass, deploys itself to Firebase Hosting and verifies the live URLs.

> **Screenshots:** coming soon — binaries can't be committed from every environment; capture and add them to the README per [NEXT_STEPS.md](docs/NEXT_STEPS.md) #5.

## What this is

A **Next.js 16 static export** — no server runtime, no database, no client-side data fetching. The site presents 46 indexable URLs:

- **10 service landing pages** — AI automation, AI agent development, Gemini development, LLM development, AI integration, MCP development, GoHighLevel automation, marketing technology, Python automation, AI security — each with benefits, use cases, process, evidence, FAQ, and structured data.
- **19 project case pages** — real open-source repositories (98 public repos on [GitHub](https://github.com/hamids-ai-automations)), with facts curated from the GitHub API (frozen 2026-11-25). No invented clients, testimonials, or metrics.
- **14 technical articles** — long-form, internally linked, funneling readers to the matching services.
- Home, about, contact, privacy, terms — every existing URL from the previous site preserved, with all legacy 301 redirects kept.

**Conversion is WhatsApp-only:** contextual CTAs throughout, plus a client-side project brief builder on the contact page that opens `wa.me` with a prefilled message. Nothing is stored, nothing is sent — enforced by CSP `form-action 'none'`.

## Technology stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19, static export (`NEXT_OUTPUT=export`) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix primitives) |
| Animation | framer-motion |
| Theming | next-themes (dark-first emerald-on-charcoal, light mode) |
| Content | react-markdown, typed content model in `src/data/` |
| Fonts | Space Grotesk / Inter / JetBrains Mono — self-hosted via `next/font` |
| Icons | lucide-react |
| Build/OG | sharp (rasterizes committed SVG → `og.png` 1200×630 + touch icon) |
| Tooling | Bun (`bun.lock`), ESLint, `tsc` |
| Hosting | Firebase Hosting — site `marvis`, project `my-1st-web-app-ef52d` (Spark plan) |

## Features

- **Every page is a landing page** — unique title, meta description, canonical URL, OG/Twitter cards, exactly one H1, WhatsApp CTA.
- **Structured data** — JSON-LD: Person, WebSite, ProfilePage, BreadcrumbList, FAQPage, Service, BlogPosting, SoftwareSourceCode, ContactPage.
- **Machine surface** — `sitemap.xml` and `robots.txt` generated from the same data as the pages, `llms.txt` for AI crawlers, manifest, custom 404.
- **Enforced, not promised** — a dependency-free validation gate (`scripts/validate.mjs`) checks the built `out/`: metadata uniqueness, canonicals, single H1, OG tags, WhatsApp presence, internal link resolution, sitemap↔page match. Exit 1 blocks deploy.
- **Fast by default** — fully static HTML, self-hosted fonts with `font-display: swap`, ~zero CLS.
- **Secure headers** — strict CSP, nosniff, frame protection, referrer policy; no forms, no external scripts.

## Page inventory (46 routes)

| Section | Routes |
| --- | --- |
| Home | `/` |
| About / Contact | `/about/`, `/contact/` (project brief → WhatsApp handoff, no storage) |
| Services index | `/services/` |
| Services | 10 landing pages — `/services/ai-automation/`, `/services/ai-agent-development/`, `/services/gemini-development/`, `/services/llm-development/`, `/services/ai-integration/`, `/services/mcp-development/`, `/services/gohighlevel-automation/`, `/services/marketing-technology/`, `/services/python-automation/`, `/services/ai-security/` |
| Projects index | `/projects/` |
| Projects | 19 case pages — `/projects/<repo-slug>/` (shopify-growth-mcp, servicenow-ultimate-mcp, google-services-mcp, gemini-agent-reliability-kit, gemini-agent-automation-toolkit, ai-agent-testing-lab, ghl-automation-engine, ghl-devops-toolkit, leadflow-sentinel, firebase-ai-starter-kit, conversionbridge, ppc-waste-detector, meta-lead-quality-analyzer, ai-search-visibility-auditor, geo-visibility-lab, envscope, searchpulse-ai, conversion-tracking-doctor, sarif-verify) |
| Articles index | `/articles/` |
| Articles | 14 long-form pieces — `/articles/<slug>/` (10 migrated with URLs preserved, 4 new) |
| Legal | `/privacy/`, `/terms/` |
| Machine surfaces | `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/manifest.webmanifest`, `/404.html` |

## Quick start

```bash
git clone https://github.com/hamids-ai-automations/marvis-portfolio.git
cd marvis-portfolio
bun install
bun run dev        # http://localhost:3000
bun run ci         # lint → typecheck → og → build:export → validate — run before every push
```

## Project structure

```
src/app/            App Router routes (page.tsx, layout.tsx, about/ contact/
                    services/[slug]/ projects/[slug]/ articles/[slug]/ privacy/ terms/,
                    not-found.tsx, sitemap.ts, robots.ts, manifest.ts, globals.css)
src/components/site/ header, footer, cards, faq, breadcrumbs, markdown, json-ld,
                    whatsapp-cta, brief-builder, section, reveal, theme-*,
                    service-icon, legal-page
src/components/ui/  shadcn components in use: accordion, badge, button, card,
                    navigation-menu, select, sheet, textarea
src/lib/            site.ts (config/facts), types.ts (content model),
                    seo.ts (metadata builder), utils.ts
src/data/           projects.ts (19), services/ (10 + index),
                    articles/ (14 + index), legal.ts
public/             favicon.svg, llms.txt (og.png + apple-touch-icon.png are
                    generated at build time — gitignored)
scripts/            generate-og.mjs, validate.mjs
docs/               full documentation set
```

## SEO implementation

- Unique metadata per page via the Next.js Metadata API (`src/lib/seo.ts`): title, description, canonical, Open Graph, Twitter cards.
- 9 JSON-LD types with verified facts only; visible breadcrumbs mirrored by `BreadcrumbList`.
- `sitemap.xml` / `robots.txt` generated from the same data modules that render the pages.
- All 36 legacy 301 redirects preserved; all migrated article URLs unchanged.
- One H1 per page, semantic HTML, crawlable navigation — all enforced by the validation gate.

Details: [docs/SEO_IMPLEMENTATION.md](docs/SEO_IMPLEMENTATION.md) · Keyword targeting: [docs/SEO_KEYWORD_MAP.md](docs/SEO_KEYWORD_MAP.md)

## Automated deployment

```
push to main → GitHub Actions → bun install → lint → typecheck → generate OG
             → next build (static export) → validate out/ → deploy to Firebase
             Hosting "marvis" → verify live URLs → summary
```

- Deploy credentials live in GitHub Actions secrets only — Workload Identity Federation (`WIF_PROVIDER` + `WIF_SERVICE_ACCOUNT`, preferred) or a service-account JSON (`FIREBASE_SERVICE_ACCOUNT`). With neither set, the build is still validated and deploy is skipped with a notice.
- Concurrency group `firebase-deploy-marvis` (cancel-in-progress) so an outdated run can never overwrite a newer release.
- Pull requests run the same build + validate with no deploy; a daily health check probes 19 production endpoints at 06:15 UTC (11:15 PKT).

Setup and runbook: [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) · Rollback: [docs/ROLLBACK_GUIDE.md](docs/ROLLBACK_GUIDE.md) · Operations: [docs/OPERATIONS.md](docs/OPERATIONS.md)

## Documentation

| Document | Contents |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Layers, data flow, content model, static export, invariants |
| [docs/PROJECT_AUDIT.md](docs/PROJECT_AUDIT.md) | Pre-revamp audit and rebuild decisions |
| [docs/SEO_IMPLEMENTATION.md](docs/SEO_IMPLEMENTATION.md) | Metadata, structured data, crawl surface, redirects, validation gate |
| [docs/SEO_KEYWORD_MAP.md](docs/SEO_KEYWORD_MAP.md) | Keyword → page mapping for all 46 pages |
| [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) | Pipeline, WIF + service-account setup, local deploy, preview channels |
| [docs/ROLLBACK_GUIDE.md](docs/ROLLBACK_GUIDE.md) | Hosting rollback, git revert, pausing deploys |
| [docs/WEBSITE_MAINTENANCE.md](docs/WEBSITE_MAINTENANCE.md) | Adding services/articles/projects, content rules, monthly checklist |
| [docs/OPERATIONS.md](docs/OPERATIONS.md) | Commands, CI/CD, secrets, monitoring, troubleshooting |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Local setup, PR expectations, content rules |
| [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) | Success criteria, phase summary — read this first when resuming |
| [docs/WORK_LOG.md](docs/WORK_LOG.md) | Dated record of the revamp and verification |
| [docs/NEXT_STEPS.md](docs/NEXT_STEPS.md) | Ranked follow-ups (deploy secret, GSC, GA4, …) |
| [AGENTS.md](AGENTS.md) | Hard facts and rules for agents and contributors |

## Contact

WhatsApp: [+92 316 7417135](https://wa.me/923167417135) — the **only** contact channel.

## License

UNLICENSED — private project. All rights reserved.
