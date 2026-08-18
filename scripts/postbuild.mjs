import { copyFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Runs after `next build`. Two jobs:
 *
 *   1. Turn Next's extension-less `opengraph-image` output into a real .png.
 *   2. Assert that everything this site promises actually resolves — the
 *      Markdown twins, llms.txt, the alternate links, the crawler policy — and
 *      that the HTML and Markdown representations still agree. A portfolio that
 *      silently stops advertising its machine-readable layer is worse than one
 *      that never had it, so these are build failures, not warnings.
 */

const OUT = "out";
const BASE = "/personal-site";
const problems = [];
const checks = [];

const ok = (label) => checks.push(label);
const fail = (label) => problems.push(label);

const read = (rel) => readFileSync(join(OUT, rel), "utf8");
const has = (rel) => existsSync(join(OUT, rel));

/* -------------------------------------------------- 1. og.png ------------ */
const ogSrc = join(OUT, "opengraph-image");
if (!existsSync(ogSrc)) {
  fail("opengraph-image was not generated");
} else {
  copyFileSync(ogSrc, join(OUT, "og.png"));
  const bytes = readFileSync(join(OUT, "og.png"));
  const isPng = bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (isPng) ok(`og.png (${(bytes.length / 1024).toFixed(0)} KB)`);
  else fail("og.png is not a PNG");
}

/* ------------------------------------------- 2. required artefacts ------- */
const projectSlugs = readdirSync(join(OUT, "work"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const required = [
  "index.html", "404.html", "robots.txt", "sitemap.xml",
  "llms.txt", "llms-full.txt",
  "index.md", "about.md", "experience.md", "engineering.md", "contact.md", "resume.md",
  "resume/index.html",
  ...projectSlugs.flatMap((s) => [`work/${s}/index.html`, `work/${s}/index.md`]),
];

for (const rel of required) {
  if (!has(rel)) fail(`missing ${rel}`);
  else if (read(rel).trim().length < 40) fail(`${rel} is suspiciously empty`);
}
ok(`${required.length} required files present and non-empty`);

/* ------------------------------------------ 3. alternate links resolve --- */
const htmlPages = ["index.html", "resume/index.html", ...projectSlugs.map((s) => `work/${s}/index.html`)];
let alternates = 0;
for (const page of htmlPages) {
  const html = read(page);

  const alt = html.match(/<link rel="alternate" type="text\/markdown" href="([^"]+)"/);
  if (!alt) {
    fail(`${page} does not advertise a text/markdown alternate`);
  } else {
    const rel = alt[1].replace(/^https?:\/\/[^/]+/, "").replace(new RegExp(`^${BASE}`), "").replace(/^\//, "");
    if (!has(rel)) fail(`${page} advertises ${alt[1]} which does not exist in out/`);
    else alternates++;
  }

  if (!/<link rel="canonical"/.test(html)) fail(`${page} has no canonical link`);
  if (!/<meta property="og:image" content="[^"]*\/og\.png"/.test(html)) fail(`${page} og:image does not point at og.png`);
}
ok(`${alternates}/${htmlPages.length} pages advertise a resolving Markdown alternate`);

/* ------------------------------- 4. HTML and Markdown say the same thing - */
const strip = (s) =>
  s.replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&rsquo;|&#8217;/g, "'")
    .replace(/&amp;/g, "&").replace(/&mdash;|&#8212;/g, "—")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/\s+/g, " ");

for (const slug of projectSlugs) {
  const html = strip(read(`work/${slug}/index.html`));
  const md = read(`work/${slug}/index.md`).replace(/\s+/g, " ");

  // A sentence long enough to be a real claim, taken from the Markdown.
  for (const heading of ["## Overview", "## Problem", "## Solution"]) {
    const section = md.split(heading)[1];
    if (!section) { fail(`work/${slug}/index.md missing ${heading}`); continue; }
    const sentence = section.split("##")[0].trim().split(". ")[0].trim();
    if (sentence.length > 40 && !html.includes(sentence.slice(0, 60))) {
      fail(`work/${slug}: "${heading}" content is in the Markdown but not the HTML`);
    }
  }
}
ok(`${projectSlugs.length} case studies: Overview/Problem/Solution present in both HTML and Markdown`);

/* ---------------------------------- 5. content is there without JS ------- */
// Crude but decisive: strip every <script> and check the facts survive.
const noScript = strip(read("index.html").replace(/<script[\s\S]*?<\/script>/g, ""));
const mustSurvive = [
  "Tenzing Sherpa", "Senior Software Engineer", "Arch Capital Group", "FastSpring",
  "Spring Boot", "Kafka", "React", "TypeScript", "Wander", "Telos",
  "tashidelektenzing@gmail.com", "University of California, Santa Barbara",
];
const missing = mustSurvive.filter((f) => !noScript.includes(f));
if (missing.length) fail(`facts absent from script-free HTML: ${missing.join(", ")}`);
else ok(`${mustSurvive.length} key facts present in HTML with all <script> removed`);

/* ------------------------------------------------ 6. crawler policy ------ */
const robots = read("robots.txt");
if (!/^Content-Signal: search=yes, ai-input=yes, ai-train=(yes|no)$/m.test(robots))
  fail("robots.txt has no valid Content-Signal line");
if (!robots.includes("Sitemap: ")) fail("robots.txt has no Sitemap line");

for (const agent of ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Googlebot", "Bingbot"]) {
  const group = robots.split(`User-agent: ${agent}`)[1];
  if (!group) fail(`robots.txt never mentions ${agent}`);
  else if (!group.split("User-agent:")[0].includes("Allow: /")) fail(`robots.txt does not allow ${agent}`);
}
ok("robots.txt: Content-Signal set, all retrieval and search agents allowed");

/* ----------------------------------------------------- 7. llms.txt ------- */
const llms = read("llms.txt");
if (!llms.startsWith("# ")) fail("llms.txt does not begin with an H1");
if (!/^> /m.test(llms)) fail("llms.txt has no blockquote summary");

const internal = [...llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)]
  .map((m) => m[1])
  .filter((u) => u.includes(BASE));
const broken = internal.filter((u) => {
  const rel = u.replace(/^https?:\/\/[^/]+/, "").replace(new RegExp(`^${BASE}`), "").replace(/^\//, "");
  return !has(rel) && !has(join(rel, "index.html"));
});
if (broken.length) fail(`llms.txt links to missing files: ${broken.join(", ")}`);
else ok(`llms.txt: valid structure, ${internal.length} internal links all resolve`);

/* ------------------------------------------------ 8. structured data ----- */
const ld = [...read("index.html").matchAll(/application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (!ld.length) fail("no JSON-LD on the homepage");
for (const [, raw] of ld) {
  try {
    const data = JSON.parse(raw);
    const person = (data["@graph"] ?? [data]).find((n) => n["@type"] === "Person");
    if (person) {
      if (!Array.isArray(person.sameAs) || person.sameAs.length < 2) fail("Person schema has no sameAs profiles");
      if (!person.jobTitle || !person.url) fail("Person schema is missing jobTitle or url");
    }
  } catch {
    fail("JSON-LD does not parse");
  }
}
ok("JSON-LD parses; Person carries jobTitle, url and sameAs");

/* ----------------------------------------------------------- report ----- */
console.log("\npostbuild —");
for (const c of checks) console.log(`  ✓ ${c}`);
if (problems.length) {
  console.error("\npostbuild failed:");
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log("");
