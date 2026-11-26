# Architecture

**Marvis Portfolio** — the personal portfolio of **Muhammad Hamid** (AI Automation Engineer, Lahore, Pakistan), served at **https://marvis.web.app** on Firebase Hosting.

The site is a **static export**: Next.js 16 (App Router) renders every page at build time into `out/`, and Firebase Hosting serves those files. There is no server runtime, no database, and no client-side data fetching.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16, App Router, React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + shadcn/ui (Radix primitives) |
| Animation | framer-motion (scroll reveals) |
| Theming | next-themes (dark-first, light mode supported) |
| Content rendering | react-markdown (article bodies) |
| Icons | lucide-react |
| Fonts | Space Grotesk, Inter, JetBrains Mono — self-hosted via `next/font`, `font-display: swap` |
| Package manager | Bun (`bun install` in CI; commit `bun.lock` locally for frozen installs) |
| Hosting | Firebase Hosting, site `marvis`, project `my-1st-web-app-ef52d` (Spark plan) |

## Layers and data flow

```
src/data/                 typed content: the single source of truth for every page
  ├─ services/            10 service definitions + index
  ├─ articles/            14 article bodies + index
  ├─ projects.ts          19 curated project case studies
  └─ legal.ts             privacy + terms copy
        │
        ▼
src/lib/                  config and builders over the data
  ├─ site.ts              identity, WhatsApp deep links, verified facts
  ├─ types.ts             content model (Service, Project, Article, LegalPage)
  ├─ seo.ts               buildMetadata(): title/description/canonical/OG/Twitter
  └─ utils.ts             cn() and small helpers
        │
        ▼
src/components/site/      presentation layer
  ├─ site-header / site-footer        sticky chrome, grouped services dropdown, mobile sheet
  ├─ cards / faq / breadcrumbs / markdown / json-ld / whatsapp-cta / brief-builder
  ├─ section / reveal / theme-* / service-icon / legal-page
        │
src/components/ui/        shadcn primitives in use: accordion, badge, button, card,
                          navigation-menu, select, sheet, textarea
        │
        ▼
src/app/                  App Router routes
  ├─ page.tsx (home) · layout.tsx · not-found.tsx · globals.css
  ├─ about/ contact/ privacy/ terms/
  ├─ services/page.tsx + services/[slug]/page.tsx   (generateStaticParams)
  ├─ projects/page.tsx + projects/[slug]/page.tsx   (generateStaticParams)
  ├─ articles/page.tsx + articles/[slug]/page.tsx   (generateStaticParams)
  └─ sitemap.ts · robots.ts · manifest.ts            generated from the same data
        │
        ▼  NEXT_OUTPUT=export next build
out/                      fully static HTML: 46 indexable URLs + 404.html +
                          sitemap.xml + robots.txt + llms.txt + manifest + assets
        │
        ▼  firebase deploy --only hosting:marvis
Firebase Hosting          https://marvis.web.app
```

Because routes, sitemap, and internal links all read the same `src/data/` modules, adding a service, article, or project automatically updates the sitemap, the indexes, and every cross-link. Nothing is maintained twice.

## Content model (`src/lib/types.ts`)

| Type | Where defined | Key fields |
| --- | --- | --- |
| `Service` | `src/data/services/<slug>.ts` | slug, name, group, icon, order, seoTitle, metaDescription, h1, intro, benefits, useCases, process, integrations, technologies, faqs, relatedProjects, relatedArticles, ctaHeading/ctaBody |
| `Project` | `src/data/projects.ts` | slug, name, url, description, topics, language, stars, updated, featured, service, tagline, summary, problem, approach, capabilities |
| `Article` | `src/data/articles/<slug>.ts` | slug, title, seoTitle, metaDescription, excerpt, date, readingMinutes, tag, content (markdown), relatedArticles, relatedServices |
| `LegalPage` | `src/data/legal.ts` | slug (`privacy` \| `terms`), title, seoTitle, metaDescription, updated, intro, sections |

Every project entry carries curated copy (tagline, summary, problem, approach, capabilities) that restates **verified GitHub repo facts** — repository stats come from the GitHub API as of **2026-11-25**. Nothing is invented.

## Static export mechanics

- `next.config.ts` enables `output: "export"` **only when `NEXT_OUTPUT=export`** is set (CI and `bun run build:export`); local `next dev` runs normally.
- `trailingSlash: true` produces directory URLs (`/services/ai-automation/` → `out/services/ai-automation/index.html`), matching the legacy URL structure.
- `images.unoptimized: true` — the export is pure static files; no image optimizer is needed at runtime.
- CI copies `out/404/index.html` to `out/404.html` (Firebase Hosting's expected not-found path) if Next did not emit it directly.
- `scripts/generate-og.mjs` rasterizes a committed SVG template with **sharp** into `public/og.png` (1200×630) and `public/apple-touch-icon.png` (180×180). The PNGs are **gitignored build artifacts** — regenerated locally and in CI; never committed.

## Firebase serving

`firebase.json` (target `marvis`, public directory `out/`):

- `cleanUrls` + trailing slashes — no `.html` extensions.
- Cache headers — static assets cached 7 days; HTML/XML/TXT/JSON served with `must-revalidate`.
- Security headers on every response — `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (geolocation, microphone, camera denied) and a strict CSP: `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'none'`.
- **All 36 legacy 301 redirects** from the previous site are preserved, so every old URL still resolves.

## Rendering model

- Content is rendered by React Server Components at build time — crawlers and no-JS users receive full HTML.
- Client components are used only for interaction: theme toggle (`next-themes`), the services dropdown and mobile sheet menu (navigation-menu, sheet), FAQ accordions, scroll reveals (`framer-motion`), and the contact page's **project brief builder** (select, textarea) — a purely client-side widget that composes a prefilled `wa.me` message. Nothing is stored, no network call is made, and CSP `form-action 'none'` blocks any form submission.

## Invariants

These hold on every page and are enforced by `scripts/validate.mjs` in CI:

1. **WhatsApp only** — `wa.me/923167417135` is the only contact channel; no forms, email links, or phone-call CTAs.
2. **No invented data** — every project claim traces to `src/data/projects.ts` (curated from GitHub API facts, frozen 2026-11-25). No invented clients, testimonials, or metrics.
3. **Exactly one `<h1>` per page**, semantic HTML elsewhere.
4. **Unique title, meta description, and canonical URL per page**, plus OG tags and a WhatsApp CTA.
5. **No secrets in the repository** — deploy credentials live only in GitHub Actions secrets.
6. `out/` is generated output — never hand-edited; `public/og.png` and `public/apple-touch-icon.png` are generated artifacts — never committed.
