/**
 * SEO primitives and rendered page invariants.
 *
 * These tests are the cheap, fast half of the quality gate: they catch regressions
 * in titles, canonicals, structured data and the WhatsApp-only contact policy
 * without needing a full build.
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import { SITE } from '../src/lib/config.js';
import {
  breadcrumbSchema,
  buildSeo,
  normalizePath,
  renderHead,
  renderRobots,
  renderSitemap,
  truncate,
} from '../src/lib/seo.js';
import { renderHome } from '../src/pages/home.js';
import { renderContact } from '../src/pages/about.js';
import { renderServiceDetail } from '../src/pages/services.js';
import { loadModel } from './helpers.js';

const { model } = await loadModel();

test('buildSeo appends the site suffix and an absolute canonical', () => {
  const seo = buildSeo({ title: 'Example page', description: 'A description long enough to be useful.', path: '/example/' });
  assert.match(seo.title, /Example page \| /);
  assert.equal(seo.canonical, `${SITE.url}/example/`);
});

test('buildSeo honours noindex pages', () => {
  const seo = buildSeo({ title: 'Not found', description: 'Nothing here.', path: '/404.html', noindex: true });
  const head = renderHead(seo);
  assert.match(head, /<meta name="robots" content="noindex/);
  assert.doesNotMatch(head, /rel="canonical"/);
});

test('descriptions never exceed the configured limit', () => {
  const seo = buildSeo({ title: 'Long', description: 'a '.repeat(400), path: '/' });
  assert.ok(seo.description.length <= 160, `description was ${seo.description.length} chars`);
});

test('truncate respects a hard maximum', () => {
  assert.equal(truncate('abcdefghij', 5).length <= 6, true);
  assert.equal(truncate('short', 50), 'short');
});

test('normalizePath always yields a trailing slash', () => {
  assert.equal(normalizePath('/projects'), '/projects/');
  assert.equal(normalizePath('/projects/'), '/projects/');
  assert.equal(normalizePath(''), '/');
});

test('breadcrumbSchema emits positions in order', () => {
  const schema = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
  ]);
  assert.equal(schema.itemListElement[0].position, 1);
  assert.equal(schema.itemListElement[1].position, 2);
});

test('sitemap entries use absolute urls', () => {
  const xml = renderSitemap([
    { path: '/', priority: 1, changefreq: 'weekly' },
    { path: '/projects/', priority: 0.8, changefreq: 'weekly' },
  ]);
  assert.match(xml, new RegExp(`<loc>${SITE.url}/</loc>`));
  assert.match(xml, new RegExp(`<loc>${SITE.url}/projects/</loc>`));
});

test('robots.txt points at the sitemap', () => {
  assert.match(renderRobots(), /Sitemap: https:\/\//);
});

test('the home page keeps WhatsApp as the only contact channel and carries schema', () => {
  const page = renderHome(model);
  assert.match(page.html, /<h1[ >]/);
  assert.equal((page.html.match(/<h1[ >]/g) ?? []).length, 1, 'exactly one h1 on the home page');
  assert.match(page.html, /wa\.me\/923167417135/);
  assert.doesNotMatch(page.html, /mailto:/i);
  assert.doesNotMatch(page.html, /<form[ >]/i);
  assert.match(page.html, /"@type":\s*"Person"/);
  assert.match(page.html, /rel="canonical"/);
});

test('the contact brief stays a client-side WhatsApp handoff', () => {
  const page = renderContact(model);
  const form = page.html.match(/<form[\s\S]*?<\/form>/i)?.[0] ?? '';
  assert.ok(form, 'contact page renders the brief form');
  assert.match(form, /data-brief-form/);
  assert.match(form, /data-wa-number="923167417135"/);
  assert.match(form, /data-brief-status/);
  assert.doesNotMatch(form, /\baction=/i, 'the form must not post anywhere');
  assert.doesNotMatch(form, /\bmethod=/i, 'the form must not declare a transport');
  assert.doesNotMatch(page.html, /<input[^>]+type="hidden"/i, 'no silent data collection');
  assert.match(page.html, /wa\.me\/923167417135/);
});

test('the home page declares what is proven and what is not', () => {
  const page = renderHome(model);
  assert.match(page.html, /evidence--proven/);
  assert.match(page.html, /evidence--open/);
  assert.match(page.html, /diagram__node/);
  assert.match(page.html, /No client logos/);
  assert.doesNotMatch(page.html, /ISO 27001 certified/i);
});

test('service detail pages carry an internal WhatsApp CTA mid-page', () => {
  const service = model.services[0];
  const page = renderServiceDetail(service, model);
  assert.match(page.html, /cta-inline/);
  assert.match(page.html, /wa\.me\/923167417135\?text=/);
  assert.equal((page.html.match(/<h1[ >]/g) ?? []).length, 1);
});
