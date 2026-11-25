# Agent Instructions — marvis-portfolio

## Standing authorization

This repository is maintained by an autonomous agent under the account owner's standing
authorization for routine development work (see `docs/AUTONOMY.md`). Do not request approval for
routine steps: editing files, running builds and tests, committing, pushing to `main`, and deploying
to Firebase Hosting site `marvis`.

## Non-negotiable facts

| Fact | Value |
| --- | --- |
| Production URL | https://marvis.web.app |
| Firebase project | `my-1st-web-app-ef52d` (Spark plan — no billing, no Cloud Functions) |
| Hosting site / target | `marvis` |
| Deploy command | `firebase deploy --only hosting:marvis` |
| Source of truth for data | `hamids-ai-automations/github-profile-master-record` (`MASTER_DATABASE.json`) |
| Sole contact channel | WhatsApp `+923167417135` |
| Do not touch | `abouthamid.web.app`, sites `seoauditpro`, `medicalstore`, `fb-ai-starter-kit` |

## Rules

1. Never hand-edit anything under `dist/`. It is generated.
2. Never invent data. Every project claim must trace to `MASTER_DATABASE.json` or a curated override
   in `src/content/project-overrides.js` that restates a verified fact from that file.
3. Never add an email, phone-call, Telegram, or contact-form CTA. WhatsApp only.
4. Never commit secrets. Deployment credentials live in GitHub Actions secrets.
5. Every page needs a unique title, unique meta description, canonical URL, and a WhatsApp CTA.
6. Run `npm run ci` before every push. A failing build must never reach `main`.
7. Keep generated data reproducible: `data/master-record.json` is a committed snapshot.

## Workflow

```bash
npm run sync      # refresh data/master-record.json from the master record repo
npm run build     # render dist/
npm run validate  # link, SEO, and sitemap checks
npm test          # unit + smoke tests
npm run ci        # all of the above, in order
```
