---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: a60f8e46820ea466ef0868a20e79d739_bbaddf97e89e11f1961f525400f8a581
    ReservedCode1: yQrWB4KbL+E1uLdn7vTT+M6ez8F1rIynIDROnjg0CDd+WpKyvAuu0HnSBQaD9LKOpPQyB5cGC9cAd5e5dsiTcPwe2PMUH9tiQ2fOUI28aVo2AFX5lWA1NR7kKixArH68hN/NbEICxpVusNJ6fl/qLTwRlRMHbHyH9USG1TmZLZinPO+hK6WiuuzVqG8=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: a60f8e46820ea466ef0868a20e79d739_bbaddf97e89e11f1961f525400f8a581
    ReservedCode2: yQrWB4KbL+E1uLdn7vTT+M6ez8F1rIynIDROnjg0CDd+WpKyvAuu0HnSBQaD9LKOpPQyB5cGC9cAd5e5dsiTcPwe2PMUH9tiQ2fOUI28aVo2AFX5lWA1NR7kKixArH68hN/NbEICxpVusNJ6fl/qLTwRlRMHbHyH9USG1TmZLZinPO+hK6WiuuzVqG8=
---

# Final report — Marvis portfolio rebuild

Date: 2026-11-25
Owner: Muhammad Hamid

## Deliverables

| Item | Where |
| --- | --- |
| Source repository | https://github.com/hamids-ai-automations/marvis-portfolio |
| Production site | https://marvis.web.app |
| Firebase project / hosting site | `my-1st-web-app-ef52d` / site `marvis` (Spark, hosting only) |
| Previous site backup | `D:\Firebase plus github profile building\backups\live-marvis-20261125-0727` |
| Operations runbook | `docs/OPERATIONS.md` |
| Agent rules | `AGENTS.md` |
| Content architecture | `docs/ARCHITECTURE.md`, `docs/CONTENT.md` |

## What was built

- Dependency-free static generator (Node 20/22, ES modules, zero npm packages) rendering 38 routes:
  home, about, contact, 6 service landing pages, 19 project case pages, 4 long-form articles,
  privacy, terms, 404.
- GitHub master record (`hamids-ai-automations/github-profile-master-record`) is the single source of
  truth: 96 repositories, snapshot hash-gated so content cannot drift from the repositories.
- Machine surfaces: `/sitemap.xml` (35 URLs), `/robots.txt`, `/llms.txt`, `/data/projects.json`,
  `/site.webmanifest`.
- Conversions: contextual WhatsApp CTAs on every page plus a fixed floating button, all pointing to
  `+92 316 741 7135` (verified: 38/38 pages, no other numbers present).

## Automation

| Workflow | Trigger | Status |
| --- | --- | --- |
| `ci.yml` | push, PR, manual | green — build → validate → test |
| `deploy.yml` | push, `repository_dispatch`, manual | green — quality gate, Google auth, deploy live |
| `sync-master-record.yml` | daily 05:00 UTC, dispatch, manual | green — refresh snapshot, commit, which triggers deploy |
| `live-check.yml` | Mondays 06:30 UTC, manual | green — probe live routes, verify 301s |

Loop prevention: the sync job only commits when the record hash changes, and its commit triggers
`deploy.yml` (not `sync-master-record.yml`), so no cycle is possible.

Failure recovery:
- Sync fetches the record with 3 attempts and exponential backoff; if the upstream stays unreachable
  and a verified snapshot exists, the job keeps the snapshot and exits green instead of failing.
- `deploy.yml` detects a missing `FIREBASE_SERVICE_ACCOUNT` and skips deploy with a notice rather
  than failing the push; local `npm run deploy` remains the fallback.
- Rollback is `git revert` + redeploy, plus Firebase Hosting release history.

## CI credentials

Service account `github-deploy@my-1st-web-app-ef52d.iam.gserviceaccount.com` with
`roles/firebasehosting.admin`, key stored only as the GitHub secret `FIREBASE_SERVICE_ACCOUNT`
(local key file deleted, unused keys revoked — exactly one active key remains).

Evidence runs:
- https://github.com/hamids-ai-automations/marvis-portfolio/actions/runs/45556284184 (push deploy, success)
- https://github.com/hamids-ai-automations/marvis-portfolio/actions/runs/45556284194 (push CI, success)
- https://github.com/hamids-ai-automations/marvis-portfolio/actions/runs/45552494513 (manual deploy, success)

## Verification performed

| Area | Result |
| --- | --- |
| Local quality gate `npm run ci` | build 38 routes, validate clean, 30/30 tests pass |
| All sitemap URLs | 35/35 return 200; median HTML 16.8 KB; TTFB median 958 ms, p95 1337 ms |
| Legacy redirects | `/work`→`/projects/`, `/writing`→`/articles/`, `/open-source`→`/sitemap.xml`, 301 |
| Security headers | CSP, Referrer-Policy, X-Content-Type-Options, X-Frame-Options all present |
| SEO audit (all pages) | unique title + description, one `<h1>` per page, canonical, JSON-LD (5 blocks on home), sitemap parity, no missing alt text |
| Mobile | 390×844 viewport: zero horizontal overflow (scrollWidth 390), floating WhatsApp button visible, unobstructed and clickable |
| Responsive CSS | no fixed pixel widths, fluid `clamp()` typography, `overflow-x: auto` for wide blocks |

## Revamp pass (brief: revamp of marvis.web.app)

Scope delivered in this pass: audit → redesign → content rewrite with evidence discipline →
per-page conversion paths → WhatsApp lead system → technical SEO → Core Web Vitals → QA.

| Change | Detail |
| --- | --- |
| Contact briefing form | Client-side handshake only (`data-brief-form`), builds a pre-filled `wa.me/923167417135` message, stores nothing, no network call, no hidden inputs |
| Home `#how-it-runs` | Inline SVG automation diagram (no image request) + "proven / not proven" evidence panels |
| Service detail pages | Mid-page inline WhatsApp CTA plus closing CTA; single `<h1>` preserved |
| GA4 events | `wa_click` and `brief_form_submit` fired on intent, no PII in payload |
| Validator | Relaxed only to allow the client-side briefing form; `action`/`method`/hidden inputs still rejected |
| Tests | 33/33 pass (3 new: form handshake, home evidence block, service inline CTA) |

Lighthouse 11, mobile emulation, local `dist/` over `scripts/serve.js`:

| Route | Environment | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | local `dist/` | 90 | 100 | 100 | 100 | 1.31 s | 0.000 | 407 ms |
| `/contact/` | local `dist/` | 99 | 100 | 100 | 100 | 1.22 s | 0.000 | 144 ms |
| `/` | live `marvis.web.app` | 99 | 100 | 100 | 100 | 1.35 s | 0.000 | 90 ms |
| `/contact/` | live `marvis.web.app` | 100 | 100 | 100 | 100 | 1.29 s | 0.000 | 27 ms |

Fixes applied after the first post-change run: brand link accessible name now derives from its
visible text (WCAG 2.5.3 label-in-name), and `.field__hint` moved from `--text-dim` + 0.85 opacity
(4.27:1) to `--text-muted` (passes 4.5:1). PWA score is intentionally low — no service worker is
shipped, matching the "no offline claim we cannot honour" rule.

Live deploy evidence for this pass (commit `62e6ae5`, workflow run 45616908763): homepage 200 with
`#how-it-runs` diagram, evidence panels and `wa.me/923167417135` CTAs; `/contact/` serves the
briefing form (`data-brief-form`, two hint elements, no hidden inputs); `/services/ai-automation/`
serves the inline CTA with exactly one `<h1>`; CSP header present; 5 JSON-LD blocks on home.

## Known limitations

- Firebase MCP exposes project/app/deploy tooling only; Firestore document or Storage object CRUD is
  not available through it, so content is managed in git rather than a database.
- Spark plan: hosting only, no Cloud Functions, no billing.
- `live-check` is weekly; a broken deploy is caught by the deploy workflow itself first.
*（内容由AI生成，仅供参考）*
