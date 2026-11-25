# Operations

## Local commands

| Command | What it does |
| --- | --- |
| `npm run sync` | Fetch `MASTER_DATABASE.json`, verify it, write `data/master-record.json` if the hash changed |
| `npm run sync:check` | Dry run — report whether the snapshot is stale without writing |
| `npm run build` | Render `dist/` (38 routes + sitemap, robots, llms.txt) |
| `npm run validate` | Quality gate over `dist/` (links, SEO, contact policy, sitemap) |
| `npm test` | Unit tests (`node:test`, 30 tests) |
| `npm run ci` | build → validate → test, in that order |
| `npm run serve` | Serve `dist/` locally with Firebase-equivalent routing |
| `npm run deploy` | `ci` then deploy to hosting site `marvis` |
| `npm run deploy:preview` | `ci` then deploy a 7-day preview channel |

A change is shippable only when `npm run ci` exits 0. A red gate never reaches `main`.

## Deploying

Production is Firebase Hosting site `marvis` in project `my-1st-web-app-ef52d` (Spark plan: hosting
only — no Cloud Functions, no billing).

```bash
firebase login --reauth      # only when the CLI session is missing or expired
npm run deploy                # builds, validates, tests, then deploys
```

Manual equivalent:

```bash
npm run ci
firebase deploy --only hosting:marvis --project my-1st-web-app-ef52d
```

`.firebaserc` maps the target: `hosting.marvis → "marvis"`. Never deploy the default site of the
project and never touch the sites listed under "Do not touch" in `AGENTS.md`.

## CI/CD

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `ci.yml` | push to `main`, pull requests, manual | build, validate, test; uploads `dist/` artifact |
| `deploy.yml` | push to `main`, `repository_dispatch: master-record-updated`, manual | `npm run ci`, Google auth, deploy live |
| `sync-master-record.yml` | daily 05:00 UTC, manual | refresh the snapshot; commits and pushes when it changes (which triggers deploy) |
| `live-check.yml` | Mondays 06:30 UTC, manual | probe production routes for 200s and verify 301s |

### Required GitHub configuration

- Secret `FIREBASE_SERVICE_ACCOUNT`: JSON key of a service account with the **Firebase Hosting
  Admin** role on `my-1st-web-app-ef52d`. Create it in Google Cloud Console → IAM → Service accounts
  → Keys, paste the whole JSON into the secret. Never commit it.
- Environment `production` (used by `deploy.yml`) may carry protection rules; keep it unrestricted for
  autonomous pushes to `main`.

## Refresh cadence

The snapshot is refreshed daily by `sync-master-record.yml`. To trigger an immediate rebuild after the
master record changes, either run the workflow manually or send a dispatch:

```bash
gh api repos/hamids-ai-automations/marvis-portfolio/dispatches \
  -f event_type=master-record-updated
```

## Adding or retiring a route

1. Add a renderer under `src/pages/` and register it in the `pages` array in `src/build.js`.
2. Add navigation entries in `src/lib/config.js` (`NAV`); every nav target must resolve.
3. Run `npm run ci`. `validate.js` fails on a route with a missing title, duplicate description, absent
   canonical, zero or multiple `<h1>`, an unresolvable internal link, or a missing sitemap entry.
4. When retiring a route, add a 301 in `firebase.json` and drop it from `NAV` and the sitemap in the
   same commit so no link rots.

## Troubleshooting

| Symptom | Cause | Action |
| --- | --- | --- |
| `validate` reports a placeholder | Copy still contains `example.com`, `lorem`, `TODO` outside code samples | Fix the source copy in `src/content/` and rebuild |
| `validate` reports an internal link | A nav or card target has no page | Fix the path or add the redirect |
| Build fails on hash mismatch | `data/master-record.json` is malformed or truncated | Re-run `npm run sync`; commit only a verified snapshot |
| Deploy fails with 403 | CLI session expired or wrong project | `firebase login --reauth`, confirm `.firebaserc` |
| Deploy fails in Actions | Missing or expired `FIREBASE_SERVICE_ACCOUNT` | Rotate the key, update the secret |
| Site serves stale HTML | `cleanUrls`/cache expectations | HTML is `must-revalidate`; hard refresh, then check headers |
| 404 on an old URL | Redirect missing | Add a 301 entry in `firebase.json` |

## Rollback

Hosting keeps release history: Firebase Console → Hosting → release history, or

```bash
firebase hosting:releases:list --project my-1st-web-app-ef52d
firebase hosting:clone marvis:live marvis:live --project my-1st-web-app-ef52d   # only via console for rollback
```

The reliable rollback is `git revert <bad-commit>` followed by a normal deploy — the build is
deterministic from the committed snapshot.
