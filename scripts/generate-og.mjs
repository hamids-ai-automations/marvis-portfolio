/**
 * Generates raster assets from committed SVG templates:
 *   public/og.png               (1200x630 Open Graph card)
 *   public/apple-touch-icon.png (180x180)
 *
 * Runs locally and in CI before `next build` (output: export).
 * Committed to the repo as text; PNGs are gitignored build artifacts.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PUBLIC = path.join(ROOT, "public");

const FONT = "DejaVu Sans, Arial, Helvetica, sans-serif";
const MONO = "DejaVu Sans Mono, Consolas, monospace";

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#1e2a24"/>
    </pattern>
    <radialGradient id="glow" cx="0.72" cy="0.05" r="0.9">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.16"/>
      <stop offset="55%" stop-color="#34d399" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#101512"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="56" y="56" width="1088" height="518" rx="24" fill="none" stroke="#243a30" stroke-width="2"/>
  <rect x="88" y="120" width="72" height="72" rx="16" fill="#34d399"/>
  <text x="124" y="168" font-family="${MONO}" font-size="30" font-weight="bold" fill="#101512" text-anchor="middle">MH</text>
  <text x="184" y="152" font-family="${FONT}" font-size="56" font-weight="bold" fill="#f2f5f2">Muhammad Hamid</text>
  <text x="184" y="196" font-family="${MONO}" font-size="24" fill="#34d399">AI AUTOMATION ENGINEER</text>
  <text x="88" y="300" font-family="${FONT}" font-size="44" font-weight="bold" fill="#e7ece8">I build the automation layer between</text>
  <text x="88" y="358" font-family="${FONT}" font-size="44" font-weight="bold" fill="#e7ece8">AI models and real business systems.</text>
  <text x="88" y="440" font-family="${MONO}" font-size="22" fill="#8fa398">MCP servers · AI agents · Gemini · GoHighLevel · Python</text>
  <text x="88" y="528" font-family="${MONO}" font-size="22" fill="#34d399">marvis.web.app</text>
  <circle cx="1096" cy="520" r="6" fill="#34d399"/>
  <text x="1076" y="528" font-family="${MONO}" font-size="22" fill="#8fa398" text-anchor="end">open source</text>
</svg>`;

const touchIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#101512"/>
  <path d="M42 132V52h20l17 28 17-28h20v80h-20V95l-17 28-17-28v37z" fill="#34d399"/>
  <rect x="118" y="52" width="20" height="80" rx="4" fill="#34d399" opacity="0.55"/>
</svg>`;

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error(
      "generate-og: sharp is not installed. Raster assets will be skipped; OG falls back to being absent."
    );
    process.exit(1);
  }

  mkdir(PUBLIC, { recursive: true });

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "og.png"));

  await sharp(Buffer.from(touchIconSvg))
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "apple-touch-icon.png"));

  // Sanity marker so validators know generation succeeded.
  await writeFile(
    path.join(PUBLIC, "og.txt"),
    `generated ${new Date().toISOString()}\nog.png 1200x630\napple-touch-icon.png 180x180\n`
  );

  console.log("generate-og: wrote public/og.png and public/apple-touch-icon.png");
}

main().catch((err) => {
  console.error("generate-og failed:", err);
  process.exit(1);
});
