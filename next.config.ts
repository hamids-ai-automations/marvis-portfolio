import type { NextConfig } from "next";

/**
 * Marvis Portfolio — Next.js 16 configuration.
 *
 * Static export for Firebase Hosting: `NEXT_OUTPUT=export` (set in CI)
 * produces `out/` which is deployed to Hosting site "marvis".
 * Locally, `next dev` runs the normal development server.
 */
const isExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" as const } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
