#!/usr/bin/env node
/**
 * Sync the GitHub master record into data/master-record.json.
 *
 * Behaviour:
 *   - Fetch the published master record over HTTPS (read-only, no token needed for a public repo).
 *   - Validate its structure before it is allowed near the site.
 *   - Hash it; if the hash matches the last sync, exit with "changed=false" so CI can skip a deploy.
 *   - Never overwrite a good snapshot with a record that fails validation.
 *
 * Exit codes: 0 = synced or unchanged, 1 = fetch/validation failure (snapshot left untouched).
 *
 * Usage:
 *   node scripts/sync-data.js             # sync
 *   node scripts/sync-data.js --dry-run   # report what would change
 *   node scripts/sync-data.js --force     # write even when unchanged
 *   node scripts/sync-data.js --file x.json  # use a local file instead of HTTPS
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE } from '../src/lib/config.js';
import {
  loadMasterRecordFile,
  loadMasterRecordUrl,
  masterRecordHash,
  validateMasterRecord,
} from '../src/lib/master-record.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT = path.join(ROOT, 'data', 'master-record.json');
const STATE = path.join(ROOT, 'data', 'sync-state.json');

const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const force = argv.includes('--force');
const fileArgIndex = argv.indexOf('--file');
const localFile = fileArgIndex >= 0 ? argv[fileArgIndex + 1] : null;

/**
 * Write a key=value line to stdout (CI summary) and a human line to stderr.
 * @param {string} message
 * @param {Record<string, string|number|boolean>} [outputs]
 */
function log(message, outputs) {
  if (outputs) {
    for (const [key, value] of Object.entries(outputs)) console.log(`${key}=${value}`);
  }
  console.error(message);
}

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Fetch the master record with bounded exponential backoff.
 * Transient failures (DNS, 5xx, timeouts) must not take the daily job down.
 * @param {string} url
 * @param {number} [attempts]
 * @returns {Promise<object>}
 */
async function loadWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await loadMasterRecordUrl(url);
    } catch (error) {
      lastError = error;
      if (attempt === attempts) break;
      const delay = 2000 * 2 ** (attempt - 1);
      console.error(`Fetch attempt ${attempt} failed (${error.message}); retrying in ${delay}ms`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

async function main() {
  const previousState = (await readJson(STATE)) ?? {};
  const previousSnapshot = existsSync(SNAPSHOT)
    ? await loadMasterRecordFile(SNAPSHOT).catch(() => null)
    : null;
  const previousHash = previousSnapshot ? await masterRecordHash(previousSnapshot) : null;

  const record = localFile
    ? await loadMasterRecordFile(path.resolve(localFile))
    : await loadWithRetry(SITE.github.masterRecordRaw).catch(async (error) => {
        if (!previousSnapshot) throw error;
        // Recovery path: keep serving the last verified snapshot rather than failing the job.
        const state = {
          ...previousState,
          last_checked_at: new Date().toISOString(),
          last_error: error.message,
        };
        await writeFile(STATE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
        log(`Fetch failed after retries (${error.message}); keeping last verified snapshot.`, {
          changed: false,
          stale: true,
        });
        return null;
      });

  if (!record) return;

  const { errors, warnings } = validateMasterRecord(record);
  if (errors.length) {
    log(`Sync aborted — master record failed validation:\n- ${errors.join('\n- ')}`);
    process.exit(1);
  }

  const recordHash = await masterRecordHash(record);
  const changed = recordHash !== previousHash;

  const stats = {
    repositories: record.repositories?.length ?? 0,
    projects: record.projects?.length ?? 0,
    generatedAt: record.metadata?.generated_at ?? 'unknown',
  };

  log(
    `Master record: ${changed ? 'changed' : 'unchanged'} (${stats.repositories} repositories, generated ${stats.generatedAt})`,
  );
  if (warnings.length) log(`Warnings:\n- ${warnings.join('\n- ')}`);

  if (dryRun) {
    log(`Dry run — snapshot ${changed ? 'would be updated' : 'left as is'}.`);
    return log('done', { changed: dryRun ? false : changed, record_hash: recordHash });
  }

  if (!changed && !force) {
    log('Nothing to write: record hash matches the current snapshot.');
    const state = {
      ...previousState,
      last_checked_at: new Date().toISOString(),
      record_hash: recordHash,
    };
    await writeFile(STATE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
    return log('done', { changed: false, record_hash: recordHash });
  }

  await mkdir(path.dirname(SNAPSHOT), { recursive: true });
  await writeFile(SNAPSHOT, `${JSON.stringify(record, null, 2)}\n`, 'utf8');

  const state = {
    last_synced_at: new Date().toISOString(),
    last_checked_at: new Date().toISOString(),
    record_hash: recordHash,
    record_generated_at: stats.generatedAt,
    repository_count: stats.repositories,
    project_count: stats.projects,
    source: localFile ? path.resolve(localFile) : SITE.github.masterRecordRaw,
  };
  await writeFile(STATE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');

  log(`Snapshot written: data/master-record.json`, { changed: true, record_hash: recordHash });
  log('done', { changed: true, record_hash: recordHash });
}

main().catch((error) => {
  log(`Sync failed: ${error.message}`);
  process.exit(1);
});
