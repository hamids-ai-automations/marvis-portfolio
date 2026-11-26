/**
 * Post-build validation gate — runs against the static export in out/.
 *
 * Checks, per HTML page:
 *   - unique, non-empty <title>
 *   - non-empty meta description (unique per page)
 *   - canonical link present and absolute
 *   - exactly one <h1>
 *   - Open Graph title/description/image
 *   - WhatsApp CTA (wa.me/923167417135)
 *
 * Site-wide:
 *   - sitemap.xml, robots.txt, 404.html, manifest, og.png exist
 *   - every internal href resolves to a file in out/
 *   - sitemap URLs match generated pages
 *
 * Zero dependencies. Exit code 1 fails the CI gate.
 */
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(
  path.dirname(path.dirname(fileURLToPath(import.meta.url))),
  "out"
);

const WHATSAPP = "wa.me/923167417135";
const errors = [];
const warnings = [];

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

function stripHash(href) {
  return href.split("#")[0].split("?")[0];
}

function resolveInternal(href) {
  const clean = stripHash(href);
  if (!clean || clean === "/") return path.join(OUT, "index.html");
  if (clean.endsWith("/")) return path.join(OUT, clean, "index.html");
  const noSlash = path.join(OUT, clean);
  if (existsSync(noSlash)) return noSlash;
  return path.join(OUT, `${clean}.html`);
}

async function main() {
  if (!existsSync(OUT)) {
    errors.push("out/ directory not found — run the build first");
    return report();
  }

  // Site-wide machine surfaces
  for (const file of ["sitemap.xml", "robots.txt", "404.html", "manifest.webmanifest", "og.png", "llms.txt", "favicon.svg"]) {
    if (!existsSync(path.join(OUT, file))) errors.push(`missing ${file} in out/`);
  }

  const files = await walk(OUT);
  const htmlFiles = files.filter((f) => f.endsWith(".html") && !f.endsWith("404.html"));

  const titles = new Map();
  const descriptions = new Map();
  const allLinks = new Set();

  for (const file of htmlFiles) {
    const rel = path.relative(OUT, file);
    const html = await readFile(file, "utf8");

    const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1]?.trim();
    if (!title) errors.push(`${rel}: missing <title>`);
    else {
      if (titles.has(title)) errors.push(`${rel}: duplicate title "${title}" (also ${titles.get(title)})`);
      titles.set(title, rel);
      if (title.length > 75) warnings.push(`${rel}: title longer than 75 chars (${title.length})`);
    }

    const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1];
    if (!desc || desc.trim().length < 50) errors.push(`${rel}: missing or short meta description`);
    else {
      if (descriptions.has(desc)) warnings.push(`${rel}: duplicate meta description (also ${descriptions.get(desc)})`);
      descriptions.set(desc, rel);
      if (desc.length > 165) warnings.push(`${rel}: meta description longer than 165 chars (${desc.length})`);
    }

    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)?.[1];
    if (!canonical || !canonical.startsWith("https://marvis.web.app")) {
      errors.push(`${rel}: missing or relative canonical URL`);
    }

    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    if (h1Count !== 1) errors.push(`${rel}: expected exactly one <h1>, found ${h1Count}`);

    const ogTitle = html.match(/property="og:title"\s+content="([^"]*)"/)?.[1];
    const ogDesc = html.match(/property="og:description"\s+content="([^"]*)"/)?.[1];
    const ogImage = html.match(/property="og:image"\s+content="([^"]*)"/)?.[1];
    if (!ogTitle || !ogDesc) errors.push(`${rel}: missing Open Graph title/description`);
    if (!ogImage) errors.push(`${rel}: missing og:image`);

    if (!html.includes(WHATSAPP)) warnings.push(`${rel}: no WhatsApp CTA found`);

    // Collect internal links
    const hrefs = html.matchAll(/href="(\/[^"]*)"/g);
    for (const m of hrefs) allLinks.add(m[1]);
  }

  // Internal link resolution
  for (const href of allLinks) {
    const target = resolveInternal(href);
    if (!existsSync(target)) errors.push(`broken internal link: ${href} (no file at ${path.relative(OUT, target)})`);
  }

  // Sitemap cross-check
  const sitemap = await readFile(path.join(OUT, "sitemap.xml"), "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (sitemapUrls.length < 40) warnings.push(`sitemap has only ${sitemapUrls.length} URLs`);
  for (const url of sitemapUrls) {
    const p = new URL(url).pathname;
    if (!existsSync(resolveInternal(p === "/" ? "/" : p))) {
      errors.push(`sitemap URL does not resolve to a page: ${url}`);
    }
  }

  return report();
}

function report() {
  if (warnings.length) {
    console.log("\nWarnings:");
    for (const w of warnings) console.log(`  - ${w}`);
  }
  if (errors.length) {
    console.error(`\nValidation FAILED with ${errors.length} error(s):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log("\nValidation passed: SEO, links and machine surfaces are consistent.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
