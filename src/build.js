#!/usr/bin/env node
/**
 * Static site generator.
 *
 *   node src/build.js            # use the committed master-record snapshot
 *   node src/build.js --live     # refresh the snapshot from GitHub first
 *
 * Output: dist/ — deployable to Firebase Hosting without a build step at runtime.
 */

import { mkdir, readFile, writeFile, copyFile, readdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE } from './lib/config.js';
import { escapeHtml, isoDate } from './lib/html.js';
import {
  buildSiteModel,
  CURATED_COUNT,
} from './lib/model.js';
import {
  loadMasterRecordFile,
  loadMasterRecordUrl,
  masterRecordHash,
} from './lib/master-record.js';
import { renderLlmsTxt, renderRobots, renderSitemap } from './lib/seo.js';
import { renderAbout, renderContact } from './pages/about.js';
import { renderArticleDetail, renderArticlesIndex } from './pages/articles.js';
import { renderHome } from './pages/home.js';
import { renderPrivacy, renderTerms } from './pages/legal.js';
import { renderNotFound } from './pages/notfound.js';
import { renderProjectDetail, renderProjectsIndex } from './pages/projects.js';
import { renderServiceDetail, renderServicesIndex } from './pages/services.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SNAPSHOT = path.join(ROOT, 'data', 'master-record.json');

const args = new Set(process.argv.slice(2));
const live = args.has('--live');

main().catch((error) => {
  console.error(`\nBuild failed: ${error.message}`);
  if (error.stack) console.error(error.stack);
  process.exitCode = 1;
});

async function main() {
  const started = Date.now();

  const db = await loadRecord();
  const hash = await masterRecordHash(db);
  const model = buildSiteModel(db);

  const pages = [];
  pages.push(renderHome(model));
  pages.push(renderServicesIndex(model));
  for (const service of model.services) pages.push(renderServiceDetail(service, model));
  pages.push(renderProjectsIndex(model));
  for (const project of model.detailProjects) pages.push(renderProjectDetail(project, model));
  pages.push(renderArticlesIndex(model));
  for (const article of model.articles) pages.push(renderArticleDetail(article));
  pages.push(renderAbout(model));
  pages.push(renderContact(model));
  pages.push(renderPrivacy(model));
  pages.push(renderTerms(model));
  const notFound = renderNotFound(model);

  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });

  const written = [];
  for (const page of pages) written.push(await writePage(page));
  await writePage(notFound);

  await copyAssets();
  await writeGeneratedFiles(model, pages, hash);

  const broken = await checkInternalLinks(pages, model);
  report({ model, pages, written, hash, started, broken });
}

/**
 * Snapshot first, network only when asked (or when the snapshot is missing).
 */
async function loadRecord() {
  if (!live && existsSync(SNAPSHOT)) {
    const db = await loadMasterRecordFile(SNAPSHOT);
    console.log(`Master record: snapshot (${db.repositories.length} repositories)`);
    return db;
  }

  console.log('Master record: fetching from GitHub…');
  const db = await loadMasterRecordUrl(SITE.github.masterRecordRaw);
  await mkdir(path.dirname(SNAPSHOT), { recursive: true });
  await writeFile(SNAPSHOT, `${JSON.stringify(db, null, 2)}\n`, 'utf8');
  console.log(`Master record: snapshot updated (${db.repositories.length} repositories)`);
  return db;
}

/**
 * @param {{path: string, html: string}} page
 */
async function writePage(page) {
  const clean = page.path === '/' ? '/' : page.path;
  const target =
    clean === '/'
      ? path.join(DIST, 'index.html')
      : clean.endsWith('.html')
        ? path.join(DIST, clean.replace(/^\//, ''))
        : path.join(DIST, clean.replace(/^\//, ''), 'index.html');

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, page.html, 'utf8');
  return path.relative(DIST, target).replace(/\\/g, '/');
}

async function copyAssets() {
  await copyFile(path.join(ROOT, 'src', 'styles.css'), path.join(DIST, 'styles.css'));

  const assetDir = path.join(ROOT, 'src', 'assets');
  if (existsSync(assetDir)) {
    await mkdir(path.join(DIST, 'assets'), { recursive: true });
    for (const file of await readdir(assetDir)) {
      await copyFile(path.join(assetDir, file), path.join(DIST, 'assets', file));
    }
  }
}

/**
 * @param {ReturnType<typeof buildSiteModel>} model
 * @param {Array<{path: string, priority?: number, changefreq?: string, lastmod?: string}>} pages
 * @param {string} hash
 */
async function writeGeneratedFiles(model, pages, hash) {
  const sitemapEntries = pages
    .filter((page) => page.priority !== null && page.priority !== undefined)
    .map((page) => ({
      path: page.path,
      lastmod: page.lastmod ?? isoDate(model.generatedAt) ?? undefined,
      changefreq: page.changefreq,
      priority: page.priority,
    }))
    .sort((a, b) => String(a.path).localeCompare(String(b.path)));

  await writeFile(path.join(DIST, 'sitemap.xml'), renderSitemap(sitemapEntries), 'utf8');
  await writeFile(path.join(DIST, 'robots.txt'), renderRobots(), 'utf8');
  await writeFile(path.join(DIST, 'llms.txt'), renderLlmsTxt(model), 'utf8');
  await writeFile(
    path.join(DIST, 'site.webmanifest'),
    `${JSON.stringify(
      {
        name: `${SITE.name} — ${SITE.role}`,
        short_name: 'M. Hamid',
        start_url: '/',
        display: 'standalone',
        background_color: '#0b1120',
        theme_color: SITE.themeColor,
        icons: [{ src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
      null,
      2,
    )}\n`,
    'utf8',
  );

  // Machine-readable export for other agents and downstream tooling.
  await mkdir(path.join(DIST, 'data'), { recursive: true });
  await writeFile(
    path.join(DIST, 'data', 'projects.json'),
    `${JSON.stringify(
      {
        generated_at: model.generatedAt,
        source: SITE.github.masterRecordRaw,
        record_hash: hash,
        stats: model.stats,
        projects: model.projects.map((p) => ({
          slug: p.slug,
          title: p.title,
          tagline: p.tagline,
          category: p.category,
          language: p.language,
          repoUrl: p.repoUrl,
          demoUrl: p.demoUrl,
          pushedAt: p.pushedAt,
          service: p.service,
          url: p.hasDetail ? `${SITE.url}/projects/${p.slug}/` : null,
        })),
        services: model.services.map((s) => ({
          slug: s.slug,
          title: s.nav,
          url: `${SITE.url}${s.path}`,
          lede: s.lede,
        })),
        articles: model.articles.map((a) => ({
          slug: a.slug,
          title: a.title,
          url: `${SITE.url}${a.path}`,
          date: a.date,
        })),
      },
      null,
      2,
    )}\n`,
    'utf8',
  );
}

/**
 * Guard against broken internal links. Fails the build if any are found.
 * @param {Array<{path: string, html: string}>} pages
 */
async function checkInternalLinks(pages, model) {
  const routes = new Set(pages.map((p) => normalise(p.path)));
  const files = new Set(['/styles.css', '/robots.txt', '/sitemap.xml', '/llms.txt', '/site.webmanifest']);
  const assetDir = path.join(ROOT, 'src', 'assets');
  if (existsSync(assetDir)) {
    for (const file of await readdir(assetDir)) files.add(`/assets/${file}`);
  }
  const broken = new Map();

  for (const page of pages) {
    const hrefs = [...page.html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]);
    for (const href of hrefs) {
      const target = normalise(href);
      if (routes.has(target) || files.has(target)) continue;
      const key = `${page.path} -> ${href}`;
      broken.set(key, true);
    }
  }

  // Curated project links in the footer must exist even before those pages render.
  for (const project of model.detailProjects) {
    if (!routes.has(normalise(`/projects/${project.slug}/`))) {
      broken.set(`(footer) -> /projects/${project.slug}/`, true);
    }
  }

  return [...broken.keys()];
}

function normalise(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return '/';
  if (/\.[a-z0-9]+$/i.test(clean)) return clean; // asset or file, keep extension as-is
  return clean.endsWith('/') ? clean : `${clean}/`;
}

/**
 * @param {{model: ReturnType<typeof buildSiteModel>, pages: Array<object>, written: string[], hash: string, started: number, broken: string[]}} result
 */
function report({ model, pages, written, hash, started, broken }) {
  const ms = Date.now() - started;
  const lines = [
    '',
    `Built ${pages.length + 1} pages in ${ms}ms`,
    `  home / services(${model.services.length}) / projects(${model.detailProjects.length} curated of ${model.projects.length}) / articles(${model.articles.length}) / about / contact / 404`,
    `  master record hash: ${hash.slice(0, 16)}…`,
    `  record generated at: ${model.generatedAt ?? 'unknown'}`,
  ];

  if (broken.length) {
    lines.push('', `Broken internal links (${broken.length}):`);
    for (const link of broken) lines.push(`  - ${link}`);
    console.log(lines.join('\n'));
    throw new Error(`${broken.length} broken internal link(s)`);
  }

  lines.push('  internal links: all resolve');
  lines.push(`  files written: ${written.length + 1}`);
  console.log(lines.join('\n'));
}

export { ROOT, DIST };
