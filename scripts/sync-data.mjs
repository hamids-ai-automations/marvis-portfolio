import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_CONFIG = path.join(ROOT, "src", "lib", "site.ts");
const DATA_DIR = path.join(ROOT, "data");
const SYNC_STATE = path.join(DATA_DIR, "sync-state.json");
const MASTER_RECORD_URL =
  "https://raw.githubusercontent.com/hamids-ai-automations/github-profile-master-record/main/MASTER_DATABASE.json";

async function main() {
  console.log("Fetching GitHub master record from:", MASTER_RECORD_URL);

  const res = await fetch(MASTER_RECORD_URL, {
    headers: {
      "User-Agent": "marvis-portfolio-sync/1.0",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch master record: HTTP ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const repoCount =
    data.profile?.profile_details?.public_repos ?? data.repositories?.length ?? 98;
  const generatedAt = data.metadata?.generated_at ?? new Date().toISOString();

  console.log(`Fetched master record (generated: ${generatedAt}, repos: ${repoCount})`);

  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }

  const state = {
    last_synced_at: new Date().toISOString(),
    master_record_generated_at: generatedAt,
    public_repos: repoCount,
    total_repositories: data.repositories?.length ?? 0,
    source: MASTER_RECORD_URL,
  };

  await writeFile(SYNC_STATE, JSON.stringify(state, null, 2) + "\n", "utf8");
  console.log("Updated data/sync-state.json");

  // Update publicRepos in src/lib/site.ts if changed
  if (existsSync(SITE_CONFIG)) {
    let siteTs = await readFile(SITE_CONFIG, "utf8");
    const regex = /publicRepos:\s*\d+/;
    if (regex.test(siteTs)) {
      const currentMatch = siteTs.match(regex)[0];
      const newEntry = `publicRepos: ${repoCount}`;
      if (currentMatch !== newEntry) {
        siteTs = siteTs.replace(regex, newEntry);
        await writeFile(SITE_CONFIG, siteTs, "utf8");
        console.log(`Updated src/lib/site.ts -> ${newEntry}`);
      } else {
        console.log(`src/lib/site.ts already has ${newEntry}`);
      }
    }
  }

  console.log("Sync completed successfully.");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
