/**
 * Normalisation helpers: slugs, demo URLs, classification, metrics, README summaries.
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  classifyRepo,
  extractMetrics,
  normalizeDemoUrl,
  readmeSummary,
  slugify,
  titleize,
} from '../src/lib/normalize.js';

test('slugify produces url-safe slugs', () => {
  assert.equal(slugify('Shopify Growth MCP'), 'shopify-growth-mcp');
  assert.equal(slugify('  Env Scope!! '), 'env-scope');
  assert.equal(slugify('AI_Agent Testing Lab'), 'ai-agent-testing-lab');
});

test('titleize promotes known acronyms', () => {
  assert.equal(titleize('shopify-growth-mcp'), 'Shopify Growth MCP');
  assert.equal(titleize('ai-agent-testing-lab'), 'AI Agent Testing Lab');
});

test('normalizeDemoUrl drops empty, circular, and self-referential links', () => {
  assert.equal(normalizeDemoUrl(''), null);
  assert.equal(normalizeDemoUrl(null), null);
  assert.equal(normalizeDemoUrl('https://marvis.web.app/'), null);
  assert.equal(
    normalizeDemoUrl('https://github.com/hamids-ai-automations/envscope', 'https://github.com/hamids-ai-automations/envscope'),
    null,
  );
  assert.equal(normalizeDemoUrl('https://github.com/hamids-ai-automations'), null);
  assert.equal(normalizeDemoUrl('https://envscope.hamid.dev'), 'https://envscope.hamid.dev/');
});

test('classifyRepo maps repositories to a service category', () => {
  assert.equal(typeof classifyRepo({ name: 'shopify-growth-mcp', topics: ['mcp'] }), 'string');
});

test('extractMetrics reads the tool count from the description', () => {
  assert.deepEqual(extractMetrics({ description: 'A server with 42 MCP tools' }), { tools: 42 });
  assert.deepEqual(extractMetrics({ description: 'No numbers here' }), { tools: null });
  assert.deepEqual(extractMetrics({}), { tools: null });
});

test('readmeSummary truncates on a word boundary', () => {
  const summary = readmeSummary('# Title\n\n' + 'word '.repeat(120), 80);
  assert.ok(summary.length <= 82, `unexpected length ${summary.length}`);
  assert.ok(!summary.startsWith('#'), 'markdown heading should be stripped');
});
