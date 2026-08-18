# tenzingsherpa — personal site

Personal portfolio for **Tenzing Sherpa**, Senior Software Engineer.
Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion, exported as static
files and deployed to GitHub Pages at
<https://tseten1996.github.io/personal-site>.

```bash
npm install
npm run dev      # http://localhost:3000/personal-site
npm run build    # static export to out/ + og.png verification
```

## Editing content

All copy lives in `src/content/` as typed data. Components render it; none of
them hold their own text.

| File | Holds |
|---|---|
| `site.ts` | Name, role, canonical URL, email, GitHub, LinkedIn, résumé link, SEO keywords, nav items |
| `projects.ts` | The three 2026 case studies — problem/approach/architecture, decisions, stack, verified stats, architecture trace, per-project schema type |
| `experience.ts` | Roles, highlights, technologies, education |
| `focus.ts` | The four engineering positions, plus the categorised technology list |
| `building.ts` | The "currently" repository snapshots and what's being explored |
| `about.ts` | Hero headline and lede, professional summary, About prose, contact lede |
| `crawlers.ts` | Crawler policy — which agents may index, retrieve, or train |
| `render/markdown.ts` | Every Markdown / llms.txt representation, rendered from the files above |

Adding a fourth project is one entry in `projects.ts`: it appears in the hero
index, the Selected Work section, the résumé, the sitemap, and gets its own
`/work/<slug>/` page with structured data. Pick its `layout` (`editorial`,
`trace`, or `grid`) to control which presentation it uses.

Components hold no professional facts of their own. `src/content/render/markdown.ts`
renders the same data into `/llms.txt`, `/llms-full.txt` and the `.md` twins, so
the HTML and Markdown representations cannot disagree — and `npm run build`
fails if they do.

**Everything in these files is traceable to the résumé or to a repository.**
No metric is estimated. Keep it that way — `stats` in particular are real
commit, migration, package and test counts, verified 17 Aug 2026.

## Résumé

`/resume/` is a real HTML page generated from the same data — crawlable,
linkable and print-optimised (`@media print` in `globals.css` strips the
chrome). It carries no phone number.

To offer a PDF as well: drop the file at `public/resume.pdf` and set
`resumePdf: "/resume.pdf"` in `src/content/site.ts`. A "Download PDF" link
appears automatically; while the value is `null` nothing broken is rendered.
Regenerate that PDF without the phone number first — it becomes publicly
crawlable.

## Machine-readable layer

Alongside the HTML, the build emits a Markdown representation of every page and
a curated map for AI tools and agents:

| URL | What it is |
|---|---|
| `/llms.txt` | Curated map of the highest-value pages, per [llmstxt.org](https://llmstxt.org) |
| `/llms-full.txt` | The whole site as one Markdown document (~2,700 words) |
| `/index.md` | The homepage |
| `/about.md`, `/experience.md`, `/engineering.md`, `/contact.md`, `/resume.md` | Section representations |
| `/work/<slug>/index.md` | Full case study — Overview, Problem, Solution, Architecture, Technologies, Engineering challenges, Key decisions, Status, Links |

Each HTML page advertises its twin with
`<link rel="alternate" type="text/markdown" href="…">`, and the footer links
`llms.txt` visibly — no hidden-for-bots markup anywhere on the site.

**Content negotiation on `Accept: text/markdown` is not implemented**, and
deliberately so: GitHub Pages is a static file host with no way to vary a
response on a request header. Static `.md` routes are the reliable equivalent.
If this ever moves behind a server or a Cloudflare Worker, add the negotiation
there and remember `Vary: Accept`.

GitHub Pages serves `.md` as `text/markdown; charset=utf-8` — verified against
a live `github.io` deployment, not assumed.

### Crawler policy

`src/content/crawlers.ts` states three decisions separately, and
`app/robots.txt/route.ts` renders them:

```
Content-Signal: search=yes, ai-input=yes, ai-train=no
```

Search engines and every live-retrieval agent (OAI-SearchBot, ChatGPT-User,
Claude-SearchBot, Claude-User, PerplexityBot, Googlebot, Bingbot, Applebot) are
explicitly allowed, so the site stays eligible to be cited in AI answers.
Bulk training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
CCBot and others) are disallowed. **Flip `allowTraining` to `true` in
`crawlers.ts` to reverse that** — robots.txt and the Content-Signal line both
follow from the one constant.

> **Caveat worth knowing:** crawlers only read `robots.txt` at a domain root.
> On a GitHub Pages *project* site it lives at `/personal-site/robots.txt`,
> which is **not** the path crawlers fetch — so this policy is documentation
> until the site moves to a custom domain or a `tseten1996.github.io` user-site
> repository. `/llms.txt` has no such limitation: the llms.txt spec scopes a
> file to its own path.

### AI referral analytics

Not implemented. GitHub Pages exposes no server logs, so there is no way to see
requests to `/llms.txt` or `*.md` without adding a third-party client-side
tracker — which would contradict the "no trackers, no cookies, no analytics"
promise in the footer and cost performance for little return. If this matters
later, the honest options are a Cloudflare Worker in front of Pages (log
`endpoint`, `timestamp`, User-Agent category, referrer domain — nothing
personal), or moving the deployment to a host with request logs.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `out/` on every push to
`main`. In the repository: **Settings → Pages → Source: GitHub Actions**.

Moving to a custom domain means three edits: `site.url` in
`src/content/site.ts`, and `basePath` + the `withBase` prefix in
`next.config.ts` / `src/lib/paths.ts` (set both to `""`).

## Notes for future changes

- **Motion is opt-in per component.** `Reveal`, `MaskReveal` and `Magnetic` all
  return their resting state under `prefers-reduced-motion`, so the site is
  fully readable with animation disabled. Verify that before shipping motion
  changes.
- **`MaskReveal` observes its wrapper, not the moving child.** The child starts
  translated outside the wrapper's `overflow: hidden` box; an observer on it
  would report zero intersection forever and the line would never reveal.
- **Colour-setting classes live in `@layer components`.** `.prose-lede`,
  `.prose-body` and `.eyebrow` set a colour, and Tailwind's utilities layer is
  emitted after `components` — which is what lets `text-inv-muted` override
  them on dark sections. Move them out of that layer and every inverted section
  silently renders body copy in the light-mode ink.
- **Dark sections are marked `data-tone="inv"`.** `useHeaderTone` samples the
  element under the fixed header and inverts the navigation over them. A new
  dark band needs that attribute or the header will float over it as a pale bar.
- **`npm run build` is a validation gate.** `scripts/postbuild.mjs` asserts that
  the Markdown twins exist, that every advertised alternate resolves, that the
  HTML and Markdown still agree on each case study, that key facts survive with
  every `<script>` stripped, that robots.txt allows the retrieval agents, that
  llms.txt links resolve, and that the Person schema parses. It exits non-zero
  on any of these. Do not weaken it to make a build pass.
- **`scripts/postbuild.mjs` produces `og.png`.** Next's `opengraph-image`
  convention emits an extension-less file, which a static host serves with the
  wrong Content-Type and crawlers reject. Route-level metadata points at
  `/og.png`; the script copies the bytes and asserts the PNG magic number.

## Measured

Static export, served from a plain file server:

- LCP 1.20 s · CLS 0 · FCP 0.13 s (home, 1440×900)
- 16.5k characters of readable text on the homepage with JavaScript disabled
- Every `.md`, `llms.txt`, `robots.txt`, `sitemap.xml` and `og.png` URL returns 200 with the correct MIME type
- No horizontal overflow at 375 / 390 / 430 / 768 / 1024 / 1440 / 1920 px
- Single `<h1>` per page, no heading-level skips
- Body and secondary text ≥ 4.9:1 contrast in both colour schemes
