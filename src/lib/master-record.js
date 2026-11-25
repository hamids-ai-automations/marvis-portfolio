/**
 * Loading and structural validation of the GitHub master record.
 *
 * The master record is produced by hamids-ai-automations/github-profile-master-record.
 * This module never mutates the input shape; it only reads and reports.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const DEFAULT_SNAPSHOT = path.resolve('data/master-record.json');

/**
 * @typedef {Object} MasterRecord
 * @property {object} metadata
 * @property {object} profile
 * @property {Array<object>} repositories
 * @property {Array<object>} projects
 * @property {Array<object>} technology_stack
 * @property {object} contribution_summary
 */

/**
 * Read a master record from disk.
 * @param {string} [file]
 * @returns {Promise<MasterRecord>}
 */
export async function loadMasterRecordFile(file = DEFAULT_SNAPSHOT) {
  const raw = await readFile(file, 'utf8');
  return parseMasterRecord(raw, file);
}

/**
 * Fetch a master record over HTTPS (used by the sync script and by CI).
 * @param {string} url
 * @param {{ fetchImpl?: typeof fetch, timeoutMs?: number }} [opts]
 * @returns {Promise<MasterRecord>}
 */
export async function loadMasterRecordUrl(url, opts = {}) {
  const fetchImpl = opts.fetchImpl ?? globalThis.fetch;
  const timeoutMs = opts.timeoutMs ?? 30_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl(url, {
      signal: controller.signal,
      headers: { 'user-agent': 'marvis-portfolio-sync', accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Master record fetch failed: HTTP ${res.status} for ${url}`);
    }
    const text = await res.text();
    return parseMasterRecord(text, url);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * @param {string} text
 * @param {string} source
 * @returns {MasterRecord}
 */
export function parseMasterRecord(rawText, source = 'inline') {
  // Snapshots saved from Windows editors often carry a UTF-8 BOM.
  const text = String(rawText).replace(/^\uFEFF/, '');
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new Error(`Master record is not valid JSON (${source}): ${err.message}`);
  }
  const { errors } = validateMasterRecord(parsed);
  if (errors.length) {
    throw new Error(
      `Master record failed structural validation (${source}):\n- ${errors.join('\n- ')}`,
    );
  }
  return parsed;
}

/**
 * Structural checks that must hold before any page is rendered.
 * Returns errors (fatal) and warnings (reported, not fatal).
 *
 * @param {any} db
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function validateMasterRecord(db) {
  const errors = [];
  const warnings = [];

  if (!db || typeof db !== 'object' || Array.isArray(db)) {
    return { errors: ['Root value must be an object'], warnings };
  }

  if (!db.metadata || typeof db.metadata !== 'object') {
    errors.push('Missing "metadata" object');
  } else if (!db.metadata.generated_at) {
    warnings.push('metadata.generated_at is missing — freshness cannot be reported');
  }

  if (!db.profile || typeof db.profile !== 'object') {
    errors.push('Missing "profile" object');
  } else {
    // The exporter nests identity under profile.profile_details; older snapshots put it flat.
    const identity = db.profile.profile_details ?? db.profile;
    const username = identity.username ?? identity.login ?? db.profile.username;
    if (!username) errors.push('profile.username is required');
    if (!identity.display_name && !identity.name) warnings.push('profile.display_name is empty');
  }

  if (!Array.isArray(db.repositories)) {
    errors.push('"repositories" must be an array');
  } else {
    const seen = new Set();
    for (const repo of db.repositories) {
      if (!repo || typeof repo !== 'object') {
        errors.push('repositories contains a non-object entry');
        continue;
      }
      if (!repo.name) errors.push('A repository entry is missing "name"');
      if (!repo.url) errors.push(`Repository "${repo.name ?? '?'}" is missing "url"`);
      if (repo.name) {
        if (seen.has(repo.name)) errors.push(`Duplicate repository name: ${repo.name}`);
        seen.add(repo.name);
      }
    }
    if (db.repositories.length === 0) warnings.push('repositories is empty');
  }

  if (!Array.isArray(db.projects)) {
    warnings.push('"projects" is missing or not an array — falling back to repositories');
  }

  if (!Array.isArray(db.technology_stack)) {
    warnings.push('"technology_stack" is missing or not an array');
  }

  return { errors, warnings };
}

/**
 * Stable SHA-256 of a master record, used to detect "nothing changed" syncs.
 * @param {any} db
 * @returns {Promise<string>}
 */
export async function masterRecordHash(db) {
  const { createHash } = await import('node:crypto');
  const canonical = JSON.stringify(sortDeep(db));
  return createHash('sha256').update(canonical).digest('hex');
}

/**
 * Deterministically sort object keys so hashes are stable across runs.
 * @param {any} value
 * @returns {any}
 */
export function sortDeep(value) {
  if (Array.isArray(value)) return value.map(sortDeep);
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortDeep(value[key]);
        return acc;
      }, {});
  }
  return value;
}
