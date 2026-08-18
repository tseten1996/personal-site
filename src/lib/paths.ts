/**
 * Static export + a GitHub Pages base path means anything referenced outside
 * of next/link or next/image (og:image, JSON-LD, manifest) needs the prefix
 * applied by hand.
 */
export const BASE_PATH = "/personal-site";

export const withBase = (path: string) =>
  path.startsWith("http") ? path : `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
