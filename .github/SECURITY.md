# Security Policy

## Supported versions

Only the current `main` branch is supported. There are no versioned releases — the site is a continuous deployment of `main`.

## Reporting a vulnerability

Report privately via **WhatsApp: [+92 316 7417135](https://wa.me/923167417135)** — the only contact channel. Please do not open a public GitHub issue for security reports. Expect a reply within one working day (Pakistan time, UTC+5).

## Security posture

- **Static-only attack surface.** The site is a Next.js 16 static export served by Firebase Hosting — no server runtime, no database, no user accounts, no client-side data fetching, no Cloud Functions.
- **No data collection.** No forms, no analytics, no cookies, no storage. The contact page's project brief builder is purely client-side and CSP `form-action 'none'` blocks any form submission.
- **Strict CSP** on every response: `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'none'`.
- **Standard hardening headers:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying geolocation/microphone/camera.
- **No secrets in the repository.** Deploy credentials exist only as GitHub Actions secrets; the deploy workflow prefers keyless Workload Identity Federation (`WIF_PROVIDER` + `WIF_SERVICE_ACCOUNT`) over service-account keys. Workflow permissions are minimal (`contents: read`; `id-token: write` only for the deploy job's WIF flow).
- **Dependency hygiene:** locked installs (`bun install --frozen-lockfile`), and a dependency-free validation gate (`scripts/validate.mjs`) that must pass before anything deploys.
- **Generated assets** (`public/og.png`, `public/apple-touch-icon.png`) are build artifacts from a committed SVG template — never committed binaries.

## Scope

In scope: this repository and https://marvis.web.app. Out of scope: other Firebase projects or hosting sites under the same account (see AGENTS.md "do not touch"), and social-engineering reports.
