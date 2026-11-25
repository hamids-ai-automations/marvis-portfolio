/**
 * Master-record loading and validation.
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  masterRecordHash,
  parseMasterRecord,
  sortDeep,
  validateMasterRecord,
} from '../src/lib/master-record.js';

const minimal = {
  metadata: { generated_at: '2026-11-24T23:54:04+00:00' },
  profile: { profile_details: { username: 'hamids-ai-automations', display_name: 'Muhammad Hamid' } },
  repositories: [{ name: 'envscope', url: 'https://github.com/hamids-ai-automations/envscope' }],
  projects: [],
  technology_stack: [],
};

test('accepts a minimal valid record', () => {
  const { errors } = validateMasterRecord(minimal);
  assert.deepEqual(errors, []);
});

test('strips a UTF-8 BOM before parsing', () => {
  const parsed = parseMasterRecord(`\uFEFF${JSON.stringify(minimal)}`, 'test');
  assert.equal(parsed.repositories.length, 1);
});

test('rejects a non-object root', () => {
  const { errors } = validateMasterRecord([]);
  assert.match(errors[0], /Root value must be an object/);
});

test('requires profile identity', () => {
  const broken = structuredClone(minimal);
  broken.profile = {};
  const { errors } = validateMasterRecord(broken);
  assert.ok(errors.some((e) => e.includes('profile.username is required')));
});

test('flags duplicate repository names', () => {
  const broken = structuredClone(minimal);
  broken.repositories.push({ name: 'envscope', url: 'https://example.org/envscope' });
  const { errors } = validateMasterRecord(broken);
  assert.ok(errors.some((e) => e.includes('Duplicate repository name')));
});

test('requires repository urls', () => {
  const broken = structuredClone(minimal);
  broken.repositories = [{ name: 'no-url' }];
  const { errors } = validateMasterRecord(broken);
  assert.ok(errors.some((e) => e.includes('missing "url"')));
});

test('hash is stable regardless of key order', async () => {
  const reordered = {
    technology_stack: [],
    projects: [],
    repositories: [{ url: minimal.repositories[0].url, name: 'envscope' }],
    profile: minimal.profile,
    metadata: minimal.metadata,
  };
  assert.equal(await masterRecordHash(minimal), await masterRecordHash(reordered));
});

test('hash changes when content changes', async () => {
  const changed = structuredClone(minimal);
  changed.repositories.push({ name: 'other', url: 'https://github.com/x/other' });
  assert.notEqual(await masterRecordHash(minimal), await masterRecordHash(changed));
});

test('sortDeep keeps arrays ordered and sorts object keys', () => {
  const sorted = sortDeep({ b: 1, a: [{ d: 2, c: 3 }] });
  assert.deepEqual(Object.keys(sorted), ['a', 'b']);
  assert.deepEqual(Object.keys(sorted.a[0]), ['c', 'd']);
});
