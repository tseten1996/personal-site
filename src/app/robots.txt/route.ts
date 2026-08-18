import { site } from "@/content/site";
import {
  allowTraining,
  contentSignal,
  retrievalAgents,
  trainingAgents,
} from "@/content/crawlers";
import { plainText } from "@/lib/markdownResponse";

export const dynamic = "force-static";

/**
 * Written by hand rather than through Next's robots metadata helper, because
 * that helper cannot emit the `Content-Signal` line and the per-agent comments
 * that make this policy legible to a person reading it.
 */
export function GET() {
  const signal = Object.entries(contentSignal)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");

  const lines = [
    `# ${site.name} — ${site.role}`,
    `# ${site.url}`,
    "#",
    "# Content usage preferences, per the Content Signals Policy",
    "# (https://contentsignals.org):",
    "#",
    "#   search=yes    — index this site and link to it.",
    "#   ai-input=yes  — retrieve it to answer questions, and cite it.",
    `#   ai-train=${contentSignal["ai-train"]}${
      allowTraining ? "  — may be used to train models." : "   — do not train models on it."
    }`,
    "#",
    "# A curated map for AI tools is at /llms.txt; every page also has a",
    "# Markdown representation at the same path plus /index.md.",
    "",
    "User-agent: *",
    `Content-Signal: ${signal}`,
    "Allow: /",
    "",
    "# --- Search and live retrieval: explicitly welcome ---",
    ...retrievalAgents.flatMap((a) => [`# ${a.note}`, `User-agent: ${a.name}`, "Allow: /", ""]),
  ];

  if (!allowTraining) {
    lines.push(
      "# --- Model training: not granted (see Content-Signal above) ---",
      ...trainingAgents.flatMap((a) => [`# ${a.note}`, `User-agent: ${a.name}`, "Disallow: /", ""]),
    );
  }

  lines.push(`Sitemap: ${site.url}/sitemap.xml`, "");

  return plainText(lines.join("\n"));
}
