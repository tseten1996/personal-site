import type { NextConfig } from "next";

/**
 * Deployed as a GitHub Pages project site at
 * https://tseten1996.github.io/personal-site — hence the static export and
 * base path. Keep `site.url` in src/content/site.ts in sync with these.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/personal-site",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
