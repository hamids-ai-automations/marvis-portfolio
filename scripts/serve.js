#!/usr/bin/env node
/**
 * Local preview server for dist/.
 * Mimics Firebase Hosting's cleanUrls + trailingSlash behaviour so links behave
 * locally exactly as they will in production.
 *
 *   node scripts/serve.js          # http://localhost:4000
 *   node scripts/serve.js 5050
 */

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.argv[2] ?? process.env.PORT ?? 4000);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json',
};

/** @param {string} urlPath */
function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = [
    path.join(DIST, clean),
    path.join(DIST, clean, 'index.html'),
    path.join(DIST, `${clean}.html`),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

createServer((req, res) => {
  const urlPath = (req.url ?? '/').split('?')[0];
  const file = resolveFile(urlPath);

  // Mirror Firebase Hosting: a directory without a trailing slash is redirected.
  if (file && !path.extname(urlPath) && !urlPath.endsWith('/')) {
    res.writeHead(301, { Location: `${urlPath}/` });
    return res.end();
  }

  const target = file ?? path.join(DIST, '404.html');
  const ext = path.extname(target);

  res.writeHead(file ? 200 : 404, { 'content-type': TYPES[ext] ?? 'application/octet-stream' });
  createReadStream(target).pipe(res);
}).listen(PORT, () => {
  console.log(`Preview: http://localhost:${PORT}  (serving ${path.relative(ROOT, DIST)})`);
});
