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

## Known limitations

- Firebase MCP exposes project/app/deploy tooling only; Firestore document or Storage object CRUD is
  not available through it, so content is managed in git rather than a database.
- Spark plan: hosting only, no Cloud Functions, no billing.
- `live-check` is weekly; a broken deploy is caught by the deploy workflow itself first.
