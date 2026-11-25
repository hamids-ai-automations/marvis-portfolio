/**
 * Shared test fixtures.
 */

import { fileURLToPath } from 'node:url';

import { buildSiteModel } from '../src/lib/model.js';
import { loadMasterRecordFile } from '../src/lib/master-record.js';

export const SNAPSHOT_PATH = fileURLToPath(new URL('../data/master-record.json', import.meta.url));

export async function loadModel() {
  const db = await loadMasterRecordFile(SNAPSHOT_PATH);
  return { db, model: buildSiteModel(db) };
}
