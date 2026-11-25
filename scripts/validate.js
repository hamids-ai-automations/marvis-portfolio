#!/usr/bin/env node
/**
 * Post-build validation of dist/.
 *
 * This is the gate between "the generator ran" and "this is safe to deploy".
 * Everything the master prompt asks for before publishing is checked here:
 * required files, page-level SEO, heading structure, internal links, WhatsApp CTAs,
 * and the absence of placeholder text.
 *
 * Exit code 1 on any error. Warnings never fail the build.
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE } from '../src/lib/config.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const REQUIRED_FILES = ['index.html', '404.html', 'styles.css', 'sitemap.xml', 'robots.txt', 'llms.txt'];
const PLACEHOLDERS = [/\blorem ipsum\b/i, /\bTODO\b/, /\bTBD\b/, /example\.com/i, /\{\{[^}]*\}\}/];

const errors = [];
const warnings = [];
const notes = [];

/** @param {string} dir */
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

/** @param {string} message */
function fail(message) {
  errors.push(message);
}

/** @param {string} message */
function warn(message) {
  warnings.push(message);
}

/** @param {string} file */
function routeOf(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/index\.html$/, '')}`;
}

async function checkRequiredFiles() {
  for (const name of REQUIRED_FILES) {
    if (!existsSync(path.join(DIST, name))) fail(`Missing required file: dist/${name} (use /${name})`);
  }
  for (const asset of ['assets/favicon.svg', 'assets/og-default.png', 'assets/apple-touch-icon.png']) {
    const full = path.join(DIST, asset);
    if (!existsSync(full)) fail(`Missing asset: /${asset}`);
  }
}

/** @param {string} html @param {string} route */
function checkPage(html, route) {
  const isNotFound = route === '/404.html';

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
  if (!title) fail(`${route}: missing <title>`);
  else if (title.length < 18) warn(`${route}: title is short (${title.length} chars)`);
  else if (title.length > 75) warn(`${route}: title is long (${title.length} chars)`);

  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim();
  if (!description) fail(`${route}: missing meta description`);
  else if (description.length < 60) warn(`${route}: meta description is short (${description.length} chars)`);
  else if (description.length > 320) warn(`${route}: meta description is long (${description.length} chars)`);

  if (!isNotFound && !/<link rel="canonical" href="https?:\/\//.test(html)) {
    fail(`${route}: missing absolute canonical link`);
  }

  if (!isNotFound && route !== '/' && !/"@type":\s*"BreadcrumbList"/.test(html)) {
    warn(`${route}: no BreadcrumbList structured data`);
  }

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count === 0) fail(`${route}: no <h1>`);
  if (h1Count > 1) fail(`${route}: ${h1Count} <h1> elements (expected exactly 1)`);

  if (!/<html lang="en"/.test(html)) warn(`${route}: <html lang> is not "en"`);

  const waCount = (html.match(/wa\.me\/923167417135/g) ?? []).length;
  if (waCount === 0) fail(`${route}: no WhatsApp CTA to ${SITE.whatsapp.display}`);
  if (waCount < 2) warn(`${route}: only one WhatsApp link`);

  if (/mailto:/i.test(html)) fail(`${route}: contains a mailto: link — WhatsApp is the only authorised channel`);
  if (/href="tel:/i.test(html)) fail(`${route}: contains a tel: link — WhatsApp is the only authorised channel`);
  if (/<form[\s>]/i.test(html)) fail(`${route}: contains a <form> — the site must stay form-free`);

  for (const pattern of PLACEHOLDERS) {
    // Code samples may legitimately contain illustrative example.com addresses.
    const prose = html.replace(/<code[\s\S]*?<\/code>/g, ' ').replace(/<pre[\s\S]*?<\/pre>/g, ' ');
    if (pattern.test(prose)) fail(`${route}: placeholder text detected (${pattern})`);
  }

  if (/<img(?![^>]*\balt=)[^>]*>/i.test(html)) warn(`${route}: <img> without alt attribute`);

  return { title, description };
}

async function checkLinks(files, routes) {
  const assetFiles = new Set(files.map((f) => `/${path.relative(DIST, f).replace(/\\/g, '/')}`));
  const broken = [];

  for (const file of files.filter((f) => f.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const href = match[1];
      const normalised = href === '/' ? '/' : /\.[a-z0-9]+$/i.test(href) ? href : href.replace(/\/?$/, '/');
      if (routes.has(normalised) || assetFiles.has(normalised) || assetFiles.has(href)) continue;
      broken.push(`${routeOf(file)} -> ${href}`);
    }
  }

  const unique = [...new Set(broken)];
  for (const entry of unique.slice(0, 25)) fail(`Broken internal link: ${entry}`);
  if (unique.length > 25) fail(`...and ${unique.length - 25} more broken internal links`);
}

async function checkSitemap(routes) {
  const file = path.join(DIST, 'sitemap.xml');
  if (!existsSync(file)) return;
  const xml = await readFile(file, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) fail('sitemap.xml has no <loc> entries');

  for (const loc of locs) {
    if (!loc.startsWith(SITE.url)) fail(`sitemap.xml contains a foreign URL: ${loc}`);
    const route = loc.replace(SITE.url, '') || '/';
    if (!routes.has(route)) fail(`sitemap.xml lists ${route} but no such page was generated`);
  }

  if (locs.some((loc) => loc.includes('/404'))) fail('sitemap.xml must not include the 404 page');
  notes.push(`sitemap: ${locs.length} URLs`);

  const robots = await readFile(path.join(DIST, 'robots.txt'), 'utf8');
  if (!/Sitemap:\s*https?:\/\//i.test(robots)) fail('robots.txt does not declare a sitemap');
}

async function checkHeroImage() {
  const file = path.join(DIST, 'assets', 'og-default.png');
  if (!existsSync(file)) return;
  const { size } = await stat(file);
  if (size < 10_000) warn(`og-default.png is only ${size} bytes — check it rendered correctly`);
  else notes.push(`og image: ${Math.round(size / 1024)} KB`);
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/ not found — run `npm run build` first.');
    process.exit(1);
  }

  await checkRequiredFiles();

  const files = await walk(DIST);
  const htmlFiles = files.filter((f) => f.endsWith('.html'));
  const routes = new Set(htmlFiles.map(routeOf));

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    checkPage(html, routeOf(file));
  }

  await checkLinks(files, routes);
  await checkSitemap(routes);
  await checkHeroImage();

  notes.unshift(`pages: ${htmlFiles.length}`);
  for (const note of notes) console.log(`  ${note}`);

  if (warnings.length) {
    console.log(`\nWarnings (${warnings.length}):`);
    for (const warning of warnings) console.log(`  - ${warning}`);
  }

  if (errors.length) {
    console.error(`\nValidation failed (${errors.length}):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  console.log('\nValidation passed.');
}

main().catch((error) => {
  console.error(`Validation crashed: ${error.message}`);
  process.exit(1);
});
