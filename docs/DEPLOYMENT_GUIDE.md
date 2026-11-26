# Deployment Guide

How a push to `main` becomes https://marvis.web.app.

**Target:** Firebase Hosting site `marvis`, project `my-1st-web-app-ef52d` (Spark plan — hosting only, no Cloud Functions).
**Main pipeline:** `.github/workflows/firebase-deploy.yml`.

## 1. Pipeline

```
push to main (site files changed)
        ↓
GitHub Actions triggers (firebase-deploy.yml)
        ↓
bun install
        ↓
bun run lint
        ↓
bun run typecheck
        ↓
bun run og                (generate og.png + apple-touch-icon.png)
        ↓
bun run build:export      (NEXT_OUTPUT=export next build → out/)
        + 404.html copy fallback
        ↓
bun run validate          (SEO / links / machine-surface gate — exit 1 blocks deploy)
        ↓
deploy auth (dual mode)
   WIF (secrets WIF_PROVIDER + WIF_SERVICE_ACCOUNT)   ← preferred
   or service-account JSON (secret FIREBASE_SERVICE_ACCOUNT)
   or neither → deploy SKIPPED, build still validated
        ↓
firebase deploy --only hosting:marvis --non-interactive --project my-1st-web-app-ef52d
        ↓
live verification (curl homepage + key pages + sitemap/robots/llms.txt,
expect content markers)
        ↓
deployment summary (Actions job summary)
```

**Trigger rules:**

- `push` to `main`, **ignoring** changes under `docs/**`, `**.md`, `.gitignore`, `LICENSE` — documentation-only pushes do not deploy.
- `workflow_dispatch` — manual run from the Actions tab.
- Pull requests run `ci.yml` instead (same build + validate, **no deploy**).

**Concurrency:** the deploy job runs in concurrency group `firebase-deploy-marvis` with `cancel-in-progress: true`. If you push twice in quick succession, the older run is cancelled and only the newest commit deploys — an outdated deployment can never overwrite a newer release.

**Failure behavior:** any failed step (lint, typecheck, build, validate, deploy, live verification) fails the run and nothing reaches production. The validator's full error list is printed in the job log.

## 2. Deploy authentication — pick ONE mode

### Mode A — Workload Identity Federation (preferred)

No long-lived key. GitHub proves its identity to Google via OIDC.

**One-time setup with `gcloud`** (requires project admin on `my-1st-web-app-ef52d`):

```bash
# 0. Set project
gcloud config set project my-1st-web-app-ef52d

# 1. Get the project number (needed below)
gcloud projects describe my-1st-web-app-ef52d --format="value(projectNumber)"

# 2. Create the workload identity pool
gcloud iam workload-identity-pools create github-marvis \
  --location=global \
  --display-name="GitHub Actions (marvis-portfolio)"

# 3. Create the OIDC provider, restricted to this repository
gcloud iam workload-identity-pools providers create-oidc github-marvis-oidc \
  --location=global \
  --workload-identity-pool=github-marvis \
  --display-name="GitHub OIDC" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='hamids-ai-automations/marvis-portfolio'"

# 4. Create a dedicated deploy service account
gcloud iam service-accounts create marvis-github-deploy \
  --display-name="marvis-portfolio GitHub deploy"

# 5. Grant Firebase Hosting Admin (scope it to the "marvis" hosting site with the
#    condition, or drop --condition for a simple project-level grant)
gcloud projects add-iam-policy-binding my-1st-web-app-ef52d \
  --member="serviceAccount:marvis-github-deploy@my-1st-web-app-ef52d.iam.gserviceaccount.com" \
  --role="roles/firebaseHostingAdmin" \
  --condition='expression=resource.name=="projects/-/sites/marvis",title=marvis-site-only'

# 6. Allow GitHub OIDC identities from this repo to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding \
  marvis-github-deploy@my-1st-web-app-ef52d.iam.gserviceaccount.com \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-marvis/attribute.repository/hamids-ai-automations/marvis-portfolio"
```

Replace `PROJECT_NUMBER` with the value from step 1.

**Then set two GitHub repository secrets** (Repo → Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `WIF_PROVIDER` | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-marvis/providers/github-marvis-oidc` |
| `WIF_SERVICE_ACCOUNT` | `marvis-github-deploy@my-1st-web-app-ef52d.iam.gserviceaccount.com` |

Done — the next push to `main` deploys automatically.

### Mode B — Service-account JSON (simple path)

If a `FIREBASE_SERVICE_ACCOUNT` secret from the previous setup already exists, **it still works — do nothing.**

To create it fresh:

1. In the Google Cloud console, open **IAM & Admin → Service Accounts** for project `my-1st-web-app-ef52d`.
2. Create (or reuse) a service account and grant it **Firebase Hosting Admin** (`roles/firebaseHostingAdmin`).
3. Create a **JSON key** for that service account (Keys → Add key → Create new key → JSON).
4. Add the **entire JSON file contents** as the GitHub repository secret **`FIREBASE_SERVICE_ACCOUNT`** (Repo → Settings → Secrets and variables → Actions → New repository secret).

Done — the next push to `main` deploys automatically.

> Prefer Mode A when possible: it removes the long-lived key and scopes trust to exactly this repository.

## 3. What happens with NO credentials

If neither `WIF_PROVIDER`+`WIF_SERVICE_ACCOUNT` nor `FIREBASE_SERVICE_ACCOUNT` is set:

- The pipeline still runs the **full** install → lint → typecheck → og → build → validate sequence.
- The deploy and verification steps are **skipped**, and a notice is emitted: *"No deploy credentials configured. … The build is fully validated; only the deploy step is skipped."*
- The run ends green with a summary stating the build passed and deployment was skipped.

This state is safe: it means the code is verified, but https://marvis.web.app will not update until a secret is added (Mode A or B above).

## 4. Local deploy (from your machine)

Requires the Firebase CLI and a locally authenticated Google account with hosting admin on the project:

```bash
bun install
bun run deploy          # full ci gate (lint → typecheck → og → build:export → validate),
                        # then firebase deploy to hosting:marvis
```

You can also run the pieces by hand:

```bash
bun run build:export
npx firebase-tools deploy --only hosting:marvis --non-interactive --project my-1st-web-app-ef52d
```

**Preview channels** (temporary, expiring URLs, useful for reviewing a design before it ships):

```bash
bun run deploy:preview  # same validation, then a temporary Firebase Hosting preview channel
```

## 5. Checking run status

- **Runs list:** https://github.com/hamids-ai-automations/marvis-portfolio/actions
- **Deploy runs:** filter by the *Deploy to Firebase Hosting* workflow; the job runs in the `production` environment and links https://marvis.web.app.
- **Job summary:** each deploy run ends with a "Deployment status" panel — ✅ built, validated, deployed, and verified live; or ⚠️ build passed, deploy skipped (no credentials).
- **Live verification detail:** the "Verify live website" step prints `OK <label> (<status>)` for the homepage, `/about/`, a service page, `/projects/`, `/articles/`, `sitemap.xml`, `robots.txt`, and `llms.txt`, and fails the run if any response is not `200` or misses its expected content marker.

## 6. After the first successful automated deploy

1. Open https://marvis.web.app and confirm the new design is live.
2. Confirm the sitemap: https://marvis.web.app/sitemap.xml.
3. Submit the sitemap in Google Search Console (owner authentication required) — see [NEXT_STEPS.md](NEXT_STEPS.md).
4. Watch the daily health check (06:15 UTC / 11:15 PKT) on the *Live site health check* workflow.

Rolling back: see [ROLLBACK_GUIDE.md](ROLLBACK_GUIDE.md).
