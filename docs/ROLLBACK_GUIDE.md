# Rollback Guide

How to restore https://marvis.web.app to a known-good state.

There are two independent layers:

| Layer | What it controls | Recovery |
| --- | --- | --- |
| **Git** (`main`) | what gets built on the next push | revert the bad commit |
| **Firebase Hosting releases** | what is being served right now | `firebase hosting:rollback` |

A Hosting rollback is **immediate** and needs no rebuild; a git revert fixes the cause and redeploys cleanly through the pipeline. For a live incident, do the Hosting rollback first, then the git revert.

## 1. Immediate rollback (Hosting release)

**Identify the last good release:**

```bash
npx firebase-tools hosting:releases:list \
  --site marvis \
  --project my-1st-web-app-ef52d
```

The list is newest-first with release times and the commit that produced each. Note the release **before** the bad one.

**Roll back one release:**

```bash
npx firebase-tools hosting:rollback \
  --site marvis \
  --project my-1st-web-app-ef52d
```

`firebase hosting:rollback` promotes the previous release to current without uploading anything. Repeat the command to step back further. You can also specify a target release explicitly:

```bash
npx firebase-tools hosting:rollback \
  --site marvis \
  --project my-1st-web-app-ef52d \
  --release <RELEASE_ID>
```

**Verify** (same checks the deploy workflow runs):

```bash
curl -s https://marvis.web.app/ | grep -q "Muhammad Hamid" && echo "homepage OK"
curl -s https://marvis.web.app/sitemap.xml | grep -q "urlset" && echo "sitemap OK"
```

## 2. Fix the cause (git revert)

Once the site is stable, remove the bad commit from `main`:

```bash
git clone https://github.com/hamids-ai-automations/marvis-portfolio.git
cd marvis-portfolio
git revert <BAD_COMMIT_SHA>
git push origin main
```

The push triggers `firebase-deploy.yml`, which rebuilds, revalidates, redeploys, and re-verifies the live site. Because the revert is a normal commit, history stays linear and auditable.

> Do **not** force-push `main` to erase the commit — a revert is safer, and force-pushing can break the branch protection and audit trail.

## 3. Emergency: stop the bleeding

**Pause deploys** (e.g. a broken commit is on `main` and keeps deploying):

1. Open https://github.com/hamids-ai-automations/marvis-portfolio/actions/workflows/firebase-deploy.yml
2. Click the **⋯** menu → **Disable workflow**.
3. Roll back Hosting (§1) or revert (§2) at leisure.
4. Re-enable the workflow afterwards; the next push resumes normal deploys.

Note that deploy runs already serialize in concurrency group `firebase-deploy-marvis` (cancel-in-progress), so an in-flight bad run can be superseded by a newer good push — pushing a revert is itself an effective way to cancel a bad deploy.

**Secrets are never the emergency lever** — do not delete GitHub secrets to stop deploys; disabling the workflow is reversible and does not destroy the setup.

## 4. Decision table

| Situation | Action |
| --- | --- |
| Bad release is live, traffic is affected | `firebase hosting:rollback` immediately, then git revert |
| Bad commit on `main`, deploy hasn't finished | Push a revert immediately (concurrency cancels the bad run), or disable the workflow first |
| Deploy failed mid-run | Nothing changed in production; fix locally with `bun run ci`, then push |
| Live verification failed but deploy succeeded | Roll back (§1), investigate the failing endpoint, redeploy after the fix |
| Validate gate failed | Production was never touched; fix the reported errors in `out/` terms (see [OPERATIONS.md](OPERATIONS.md) troubleshooting) |

## 5. Command reference

| Command | Purpose |
| --- | --- |
| `npx firebase-tools hosting:releases:list --site marvis --project my-1st-web-app-ef52d` | list Hosting releases, newest first |
| `npx firebase-tools hosting:rollback --site marvis --project my-1st-web-app-ef52d` | roll back one release |
| `npx firebase-tools hosting:rollback --site marvis --project my-1st-web-app-ef52d --release <ID>` | roll back to a specific release |
| `git revert <SHA> && git push origin main` | fix the cause; pipeline redeploys |
| Actions → *Deploy to Firebase Hosting* → ⋯ → *Disable workflow* | pause all automatic deploys |
