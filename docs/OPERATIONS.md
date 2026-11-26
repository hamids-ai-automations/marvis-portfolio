# Operations

The runbook for running https://marvis.web.app day to day.

## 1. Commands

| Command | Purpose |
| --- | --- |
| `bun install` | install dependencies from `bun.lock` |
| `bun run dev` | local dev server (http://localhost:3000) |
| `bun run lint` | ESLint |
| `bun run typecheck` | TypeScript check |
| `bun run og` | generate `public/og.png` (1200×630) + `public/apple-touch-icon.png` (180×180) from committed SVG templates |
| `bun run build` | standard Next build |
| `bun run build:export` | static export → `out/` (sets `NEXT_OUTPUT=export`) |
| `bun run validate` | validate the built `out/` directory (SEO, links, machine surfaces) |
| `bun run ci` | lint → typecheck → og → build:export → validate — the full local gate |
| `bun run deploy` | `ci` + `firebase deploy --only hosting:marvis` |
| `bun run deploy:preview` | `ci` + temporary Firebase Hosting preview channel |

## 2. CI/CD overview

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `firebase-deploy.yml` | push to `main` (ignoring `docs/**`, `**.md`, `.gitignore`, `LICENSE`) + manual dispatch | install → lint → typecheck → og → build → **validate** → deploy (if credentials) → live verify → summary. Concurrency group `firebase-deploy-marvis`, cancel-in-progress |
| `ci.yml` | pull requests to `main` + manual dispatch | the same build + validate chain, **no deploy** |
| `live-check.yml` | daily at 06:15 UTC (11:15 PKT) + manual dispatch | HTTP + content-marker checks of 19 production endpoints |

## 3. Secrets

| GitHub secret | Mode | Notes |
| --- | --- | --- |
| `WIF_PROVIDER` + `WIF_SERVICE_ACCOUNT` | Workload Identity Federation (preferred) | provider name + service account; no long-lived key |
| `FIREBASE_SERVICE_ACCOUNT` | service-account JSON | full key JSON with Firebase Hosting Admin; may already exist from the previous setup |
| *(none set)* | — | pipeline validates the build and **skips deploy** with a notice |

All runs use minimal permissions (`contents: read`; the deploy run additionally needs `id-token: write` for WIF). No credentials ever live in the repository. Setup: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

## 4. Monitoring

- **After every deploy:** the "Verify live website" step curls the homepage, `/about/`, a service page, `/projects/`, `/articles/`, `sitemap.xml`, `robots.txt`, and `llms.txt`, and fails unless each returns 200 with the expected content marker.
- **Daily:** `live-check.yml` probes 19 endpoints at 06:15 UTC / 11:15 PKT and turns the run red on any failure.
- **Where to look:** https://github.com/hamids-ai-automations/marvis-portfolio/actions — each deploy run ends with a "Deployment status" summary panel.
- Analytics (GA4) is **not** integrated — see [NEXT_STEPS.md](NEXT_STEPS.md); the current CSP blocks external analytics scripts by design.

## 5. Troubleshooting

| Symptom | Fix |
| --- | --- |
| CI build fails | Reproduce locally: `bun run ci`. Fix lint/typecheck errors it reports, in that order; then rebuild. Never force a push past a red build. |
| Deploy step skipped with "No deploy credentials configured" | Add `WIF_PROVIDER` + `WIF_SERVICE_ACCOUNT` (preferred) or `FIREBASE_SERVICE_ACCOUNT` — see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) §2. The build itself was already validated. |
| `bun run og` or CI font/OG step fails | Usually transient (sharp/font fetch, network). Re-run the job. If it persists locally, `rm -rf node_modules && bun install`. |
| Validation gate fails | Read the error list — every line names the file in `out/` and the exact problem (duplicate title, missing canonical, two H1s, broken link, missing WhatsApp CTA, sitemap mismatch). Fix the corresponding `src/` data or page, not `out/`. |
| Live check fails | Distinguish outage vs. content drift: `curl -sI https://marvis.web.app/` — if 200 but a marker is missing, the expected content changed (update the check or restore the content). If non-200, treat as an incident: [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md). |
| Deploy succeeded, site serves old content | CDN caching: HTML is served with `must-revalidate` and refreshes within seconds; force-refresh or wait a minute. Still stale → check the Hosting release list (`firebase hosting:releases:list`). |
| Deploy auth fails (`mode=wif` or `mode=sa` errors) | WIF: verify pool/provider names and the `principalSet` member string. SA: verify the secret is the full JSON key of an account holding `roles/firebaseHostingAdmin` on `my-1st-web-app-ef52d`. |

## 6. Incident quick path

1. Roll back Hosting: `npx firebase-tools hosting:rollback --site marvis --project my-1st-web-app-ef52d`.
2. Verify: `curl -s https://marvis.web.app/ | grep "Muhammad Hamid"`.
3. Revert the bad commit on `main`; the pipeline redeploys the good state.
4. Full detail: [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md).
