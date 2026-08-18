/**
 * Static export writes these route handlers to disk as real files, so the host
 * ultimately assigns the Content-Type by extension — GitHub Pages already
 * serves `.md` as `text/markdown; charset=utf-8`. The header is still set here
 * so `next dev` and any future non-static host behave identically.
 */
export const markdown = (body: string) =>
  new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });

/** llms.txt is Markdown-formatted but conventionally served as plain text. */
export const plainText = (body: string) =>
  new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
