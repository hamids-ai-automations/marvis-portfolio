# Next Steps

Prioritized follow-ups after the revamp. Items 1–4 are owner-gated; 5–8 are engineering polish. Nothing here blocks the site from being correct and live.

## 1. Add the deploy secret and verify the first automated deploy — 🔑 critical path

**Why:** everything is built and validated; only the credential stands between `main` and production.
**How:** follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) §2 — WIF (`WIF_PROVIDER` + `WIF_SERVICE_ACCOUNT`, preferred) or a service-account JSON (`FIREBASE_SERVICE_ACCOUNT`, possibly already configured from the previous setup). Then push any site-file change (or use *Run workflow*), watch the run, and confirm the live site.
**Done when:** a *Deploy to Firebase Hosting* run ends ✅ with the "Verify live website" step green, and https://marvis.web.app serves the new build. Tick the two open boxes in [PROJECT_STATUS.md](PROJECT_STATUS.md).

## 2. Submit the sitemap in Google Search Console

**Why:** indexing of the 46 URLs and rich results start here; the site emits sitemap, canonicals, and 9 JSON-LD types but nothing is submitted yet.
**How:** owner authenticates at https://search.google.com/search-console, adds/verifies the property `marvis.web.app` (a DNS TXT record or an HTML file via `public/`), submits https://marvis.web.app/sitemap.xml, and validates the JSON-LD types on a few pages.
**Done when:** sitemap status = "Success" and coverage starts reporting.

## 3. Decide on GA4 and adjust the CSP

**Why:** there is no analytics; the current CSP (`script-src 'self' 'unsafe-inline'; connect-src 'self'`) intentionally blocks external analytics scripts.
**How:** if GA4 is wanted, make a deliberate privacy decision (consent, data minimization — legal pages must reflect it), then amend the CSP in `firebase.json` to allow only the specific GA4/GTM origins, and load the tag accordingly. GTM follows the same rule. Track meaningful events only (WhatsApp CTA clicks, service-page engagement).
**Done when:** either analytics works with an updated CSP and updated privacy page, or a documented decision says "no analytics".

## 4. Per-page OG images

**Why:** all pages share one generated `og.png` card; per-page cards improve social/link previews for service and article pages.
**How:** extend `scripts/generate-og.mjs` to render one SVG variant per service/article title (sharp loop), and have `buildMetadata()` reference the per-page image. Keep PNGs gitignored.
**Done when:** distinct 1200×630 images exist per page type and the validator's OG checks still pass.

## 5. README screenshots

**Why:** the README has a screenshots placeholder; binaries cannot be produced reliably from every environment, so they are a manual capture.
**How:** capture 3–4 screenshots (home hero, a service page, a project page, mobile), commit to `docs/screenshots/` (or `public/`), embed in the README, and remove the placeholder note.
**Done when:** README renders real screenshots.

## 6. Update the GitHub repo description and topics — ⏱ 2-minute manual step

**Why:** the repo itself is a showcase; the description and topics cannot be updated with the current tooling.
**How:** Repo → ⚙️ Settings → General → Description: e.g. *"Portfolio of Muhammad Hamid — AI Automation Engineer. Next.js 16 static export, Tailwind 4, automated GitHub Actions → Firebase Hosting. https://marvis.web.app"*; Topics: `nextjs`, `typescript`, `tailwindcss`, `portfolio`, `firebase-hosting`, `static-site`, `seo`, `ai-automation`, `mcp`, `gohighlevel`.
**Done when:** description and topics visible on the repo page.

## 7. Refresh project stats periodically

**Why:** repo facts (stars, topics, updated dates) drift; the current snapshot is frozen 2026-11-25 and honesty rules require accuracy.
**How:** quarterly (or on major repo changes), pull fresh facts from the GitHub API (`https://api.github.com/repos/hamids-ai-automations/<repo>`) and update `src/data/projects.ts` — updating curated copy only where it restates a changed fact. Then `bun run ci`, push.
**Done when:** stats refreshed and deployed.

## 8. Consider PR preview channels

**Why:** PRs currently run build + validate only; a temporary preview URL per PR would make design review easier.
**How:** `bun run deploy:preview` already provides local preview channels; a PR workflow would call the same Firebase CLI behind a credential gate (WIF/SA). Keep it opt-in and secret-gated like production.
**Done when:** PRs (optionally) produce an expiring preview URL.

---

## Explicitly not planned

- **Cloud Functions / any server runtime** — the Firebase project is on the Spark plan (no billing); the site is deliberately a static export.
- **Contact forms / email / other channels** — WhatsApp-only is a standing owner policy, enforced by CSP `form-action 'none'` and the validator.
- **Invented social proof** — no testimonials, client logos, or metrics that do not trace to verified GitHub facts.
