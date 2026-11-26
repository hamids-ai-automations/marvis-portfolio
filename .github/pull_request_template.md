# Pull request

<!-- Link the related issue if one exists: Fixes #N / Refs #N -->

## What

<!-- One or two sentences: what this PR changes and why. -->

## Scope of change

<!-- e.g. new service page, article, project data refresh, component, pipeline. -->

## Checklist

- [ ] `bun run ci` passes locally (lint → typecheck → og → build:export → validate)
- [ ] No invented claims — all project/data statements trace to `src/data/` (verified GitHub facts)
- [ ] New or changed pages have a unique title, meta description, and canonical URL
- [ ] New or changed pages have exactly one H1 and a WhatsApp CTA (`wa.me/923167417135`)
- [ ] WhatsApp-only policy respected — no forms, email links, or other contact channels added
- [ ] No secrets, keys, or tokens in the diff
- [ ] Generated files not committed (`out/`, `public/og.png`, `public/apple-touch-icon.png`)
- [ ] Internal links verified (no broken links — the validator gate checks this)
- [ ] Documentation updated if structure/workflows changed (`docs/`)

## Notes for reviewers

<!-- Anything non-obvious: content sourcing, redirect implications, CSP/headers impact. -->
