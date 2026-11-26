# Contributing

Thanks for considering a contribution to the Marvis Portfolio. The project is small and deliberately strict: a static site, honest data, one contact channel.

## Local setup

```bash
git clone https://github.com/hamids-ai-automations/marvis-portfolio.git
cd marvis-portfolio
bun install
bun run dev        # http://localhost:3000
```

**Before every push:** `bun run ci` — this runs lint → typecheck → OG generation → static export → validation. A failing gate must never reach `main`; PRs run the same chain via `ci.yml`.

## Orientation

| Path | Contents |
| --- | --- |
| `src/data/` | all content: services, articles, projects, legal copy |
| `src/lib/` | site config (`site.ts`), content types, metadata builder (`seo.ts`) |
| `src/components/site/` | layout and page components |
| `src/components/ui/` | shadcn/ui primitives in use |
| `src/app/` | App Router routes, sitemap, robots, manifest |
| `scripts/` | `generate-og.mjs` (OG image), `validate.mjs` (build gate) |
| `docs/` | documentation set |

Adding content = editing `src/data/`; routes, sitemap, and cross-links follow automatically. See [WEBSITE_MAINTENANCE.md](WEBSITE_MAINTENANCE.md) for step-by-step recipes.

## Content rules

1. **No invented claims.** Every project statement must trace to `src/data/projects.ts` (curated, verified GitHub repo facts). No invented clients, testimonials, certifications, awards, employment history, or metrics.
2. **WhatsApp only.** `+92 316 7417135` (wa.me/923167417135) is the only contact channel. No forms, email links, phone-call CTAs, or chat widgets.
3. **Every indexable page needs** a unique title, unique meta description, canonical URL, exactly one H1, and a WhatsApp CTA — the validator enforces all of it.
4. **No keyword stuffing, no filler pages.** Write for humans; one primary keyword per page ([SEO_KEYWORD_MAP.md](SEO_KEYWORD_MAP.md)).
5. **Generated files are not content:** never commit `out/` or `public/og.png` / `public/apple-touch-icon.png`.

## Pull request expectations

- Keep PRs focused: one feature, page, or content batch.
- `ci.yml` must pass on your PR (lint, typecheck, build, validate — no deploy from PRs).
- New or changed pages: unique metadata, one H1, WhatsApp CTA, internal links, and an entry in the data layer so the sitemap picks it up.
- Fill in the PR checklist template (`.github/pull_request_template.md`).
- For anything security-relevant, do **not** open a public issue — contact via WhatsApp (see [SECURITY.md](../.github/SECURITY.md)).

## What not to do

- ❌ No email/phone/form/contact-page CTAs beyond the WhatsApp policy.
- ❌ No invented or unverifiable claims, stats, or social proof.
- ❌ No secrets, keys, or tokens in code, examples, or comments — credentials live only in GitHub Actions secrets.
- ❌ No hand-edits to `out/` (build output) or the generated PNGs.
- ❌ No new runtime services (the site is a static export on Firebase Hosting — no server, no database).
