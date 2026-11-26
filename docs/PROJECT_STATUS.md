# Project Status

**Read this first when resuming work.**
**Last updated:** 2026-11-26 · Default branch `main` · Live site https://marvis.web.app

## 1. Snapshot

| Item | State |
| --- | --- |
| Rebuild (Next.js 16 static export) | ✅ complete — 46 indexable URLs, all legacy URLs preserved |
| Content | ✅ 10 services, 19 projects, 14 articles (10 migrated + 4 new), legal pages |
| SEO | ✅ metadata, JSON-LD (9 types), sitemap, robots, llms.txt, 404, redirects |
| Validation gate (`scripts/validate.mjs`) | ✅ passing locally and in CI |
| CI/CD workflows | ✅ `firebase-deploy.yml`, `ci.yml`, `live-check.yml` in place |
| Data snapshot | frozen **2026-11-25** — 98 public repos, 19 documented projects, 14 articles |
| First automated deploy | ⏳ **pending deploy-secret verification** (see blockers) |
| GA4 / Search Console / GTM | ❌ not integrated — no credentials available |

## 2. Success criteria (from the revamp brief)

- [x] Existing repository fully audited — [PROJECT_AUDIT.md](PROJECT_AUDIT.md)
- [x] Website professionally redesigned — dark-first emerald-on-charcoal, Space Grotesk/Inter/JetBrains Mono, framer-motion reveals
- [x] Every important page functions as an independent landing page — hero, benefits, use cases, process, evidence, FAQ, CTA, structured data
- [x] Original SEO content implemented — 14 articles, 10 service pages, 19 project case studies
- [x] Technical SEO implemented — metadata, canonical, OG/Twitter, semantic HTML, breadcrumbs
- [x] XML sitemap generated — `src/app/sitemap.ts`
- [x] robots.txt configured — `src/app/robots.ts`
- [x] Structured data implemented — Person, WebSite, ProfilePage, BreadcrumbList, FAQPage, Service, BlogPosting, SoftwareSourceCode, ContactPage
- [x] Mobile responsiveness verified — E2E + visual QA across breakpoints
- [x] Performance optimized — static export, self-hosted fonts, no client fetching, ~zero CLS
- [x] WhatsApp conversion CTAs implemented — contextual per page + brief builder
- [x] GitHub repository professionally documented — README, docs set, issue templates, security policy, badges
- [x] GitHub Actions CI/CD configured — `firebase-deploy.yml` + `ci.yml` + `live-check.yml`
- [x] Firebase Hosting deployment automated — workflow ready; dual-mode auth (WIF / service account)
- [x] Failed builds prevented from deploying — validate gate exits 1; concurrency `firebase-deploy-marvis` cancel-in-progress
- [ ] Production deployment verified — **blocked: deploy credentials cannot be verified from this environment**
- [ ] Future GitHub pushes automatically update the live website — **same blocker; true once a secret exists**
- [x] Monitoring and rollback documentation completed — [OPERATIONS.md](OPERATIONS.md), [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md), daily live-check
- [x] Persistent work tracking implemented — this file + [WORK_LOG.md](WORK_LOG.md) + [NEXT_STEPS.md](NEXT_STEPS.md)

## 3. Phase summary

| Phase | Scope | State |
| --- | --- | --- |
| 1. Audit | repository, architecture, SEO, content, CI, deployment | ✅ 2026-11-25 — [PROJECT_AUDIT.md](PROJECT_AUDIT.md) |
| 2. Redesign | Next.js 16 + TS + Tailwind 4 + shadcn/ui rebuild, theme, components | ✅ |
| 3. Landing pages | every indexable page as a landing page (10 services, 19 projects, 14 articles) | ✅ |
| 4. Brand & conversion | positioning, contextual WhatsApp CTAs, brief builder | ✅ |
| 5. Technical SEO | metadata, JSON-LD, sitemap, robots, llms.txt, 404, redirects | ✅ |
| 6. Content | 4 new articles (2026-11-25), all content migrated with URLs preserved | ✅ |
| 7. Performance | static export, fonts, caching, zero-CLS layout | ✅ |
| 8. CD pipeline | `firebase-deploy.yml` (WIF/SA dual mode), `ci.yml`, validation gate | ✅ code; ⏳ first deploy |
| 9. Monitoring | post-deploy verification + daily live-check | ✅ workflow; activates with deploys |
| 10. Analytics | GA4 / Search Console / GTM | ❌ blocked on credentials (documented) |
| 11. Repo optimization | README, docs, templates, badges | ✅ (screenshots pending) |
| 12. Release | build, test, push, deploy, verify | ✅ build/test; ⏳ deploy/verify pending secret |

## 4. Known blockers / not done

1. **Firebase deploy credentials** — cannot be verified from this environment. The workflow supports WIF (`WIF_PROVIDER` + `WIF_SERVICE_ACCOUNT` secrets, preferred) or a service-account JSON (`FIREBASE_SERVICE_ACCOUNT` secret, possibly already configured from the previous setup). If the existing secret is still in place, the first push to `main` deploys automatically; otherwise the owner must add one — 5-minute procedure in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) §2.
2. **GA4 / Search Console / GTM** — not integrated; no credentials available. The current CSP (`script-src 'self' 'unsafe-inline'; connect-src 'self'`) blocks external analytics; integrating GA4 later requires a deliberate CSP change and a privacy decision.
3. **GitHub repo description/topics** — cannot be updated with the available tools; 2-minute manual step for the owner ([NEXT_STEPS.md](NEXT_STEPS.md) #6).
4. **Sitemap submission in Search Console** — requires owner authentication ([NEXT_STEPS.md](NEXT_STEPS.md) #2).

## 5. Resume from here (for agents)

1. Read this file, [AGENTS.md](../AGENTS.md) (rules), and [WORK_LOG.md](WORK_LOG.md) (what was already done and tested — do not repeat it).
2. `bun install && bun run ci` — confirm a green baseline before touching anything.
3. Check whether the first automated deploy has happened: https://github.com/hamids-ai-automations/marvis-portfolio/actions (workflow *Deploy to Firebase Hosting*). If runs show "Deployment skipped — no credentials", the next action is [NEXT_STEPS.md](NEXT_STEPS.md) #1 (owner adds a secret).
4. If a deploy ran: verify live state (homepage, sitemap, robots, llms.txt), tick the two open boxes in §2, and update [WORK_LOG.md](WORK_LOG.md).
5. Do not start new features while §4 blockers 1–2 are unresolved — they are the critical path.
6. Everything else is prioritized in [NEXT_STEPS.md](NEXT_STEPS.md).

## 6. Key references

- Facts and rules: [AGENTS.md](../AGENTS.md)
- Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- Deploy: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) · Rollback: [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md)
- Day-to-day changes: [WEBSITE_MAINTENANCE.md](WEBSITE_MAINTENANCE.md) · Runbook: [OPERATIONS.md](OPERATIONS.md)
