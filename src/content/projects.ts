/**
 * Case studies for work done in 2026. Nothing here is estimated or invented,
 * and each entry records where its claims can be checked:
 *
 * - Wander and Telos are written from repositories Tenzing owns — README,
 *   architecture docs, migrations, commit history and source.
 * - CashOnCash and Payload are products he co-founded whose source is private.
 *   They are written from what those products publish about themselves, so the
 *   write-ups stay at the level of product behaviour and engineering position
 *   and make no claim about internal implementation.
 *
 * `sourceNote` on each project states which of the two applies.
 */

export type ProjectStat = { label: string; value: string };
export type ProjectLink = { label: string; href: string; kind: "repo" | "live" | "case" };

export type Project = {
  slug: string;
  /** Two-digit index rendered as editorial metadata. */
  index: string;
  name: string;
  kicker: string;
  /** One outcome-oriented line. Shown under the project name. */
  summary: string;
  /**
   * A plain, factual statement of what the thing is and who it is for —
   * written so a person or a retrieval system can answer "what is this?"
   * without reading the rest of the case study.
   */
  whatItIs: string;
  /** What was genuinely hard to build, as distinct from what was decided. */
  challenges: { title: string; body: string }[];
  /** Tenzing's role on the project. */
  role: string;
  year: string;
  status: string;
  visibility: "public" | "private";
  /** Presentation variant — drives which layout the homepage uses. */
  layout: "editorial" | "trace" | "grid";
  accentSection: "light" | "dark";
  problem: string;
  approach: string;
  architecture: string;
  decisions: { title: string; body: string }[];
  stack: { group: string; items: string[] }[];
  stats: ProjectStat[];
  links: ProjectLink[];
  /** Nodes for the architecture visualisation, top to bottom. */
  trace: { id: string; label: string; detail: string; meta: string }[];
  /**
   * Where this write-up's claims come from, rendered with the status line.
   * Defaults to the repository-verification note when absent.
   */
  sourceNote?: string;
  /** Structured-data type for this project's page. */
  schemaType: "SoftwareSourceCode" | "WebApplication" | "CreativeWork";
  seoKeywords: string[];
};

export const projects: Project[] = [
  {
    slug: "wander",
    index: "01",
    name: "Wander",
    kicker: "Collaborative product · React 19 · Supabase · Workers AI",
    summary:
      "A group trip planner where only one person needs an account — and Postgres, not the browser, decides what everyone is allowed to see.",
    whatItIs:
      "Wander is a collaborative trip-planning web application for small groups of friends. One person creates a trip and everyone else joins through an invite link without creating an account. It replaces the group chat with shared polls, an itinerary, a budget with multi-currency settle-up, checklists, packing lists, notes and a map. A narrow AI layer sits on top — it turns a pasted booking confirmation into an itinerary item and suggests a better order for a day — and it is only ever allowed to propose: every accepted suggestion is applied by the same mutation a human tap would use.",
    challenges: [
      {
        title: "Authorizing users who never signed up",
        body: "Friends join through an invite link, so there is no account to attach permissions to. The solution was to give every participant a real Supabase identity — an anonymous session created invisibly on first open — so Row Level Security policies always have an auth.uid() to check, and the permission model has no special case for guests.",
      },
      {
        title: "Non-recursive Postgres policies",
        body: "Policies that ask \"is this user a member of this trip?\" naturally read the members table, which is itself protected by a policy that asks the same question. Resolving that required SECURITY DEFINER helper functions (is_trip_member, is_trip_owner, my_member_id) that break the recursion while keeping the check server-side.",
      },
      {
        title: "Realtime cache invalidation with no server to push from",
        body: "With no server to push from, Supabase Realtime streams Postgres change data capture straight to the client and invalidates the specific TanStack Query keys affected, so optimistic local writes and other members' changes converge without a full refetch.",
      },
      {
        title: "Deep links on a host with no rewrite rules",
        body: "GitHub Pages serves static files and cannot rewrite unknown paths to an SPA entry point. Hash routing plus a relative Vite base means an invite link resolves under any repository name with zero deploy configuration.",
      },
      {
        title: "Adding AI without adding a secret",
        body: "Every credential in Wander until this point was public by design, bounded by Row Level Security rather than by secrecy. A model provider key is the opposite: a bearer token carrying billing authority, which cannot ship in a static bundle. Running the endpoint as a Cloudflare Pages Function against the Workers AI binding removed the problem instead of managing it — the platform authenticates the call, so there is no key to store, scope, rotate or leak. The usage ledger is written through a SECURITY DEFINER RPC rather than a service-role key, so the new runtime holds no database credential either.",
      },
      {
        title: "Rate-limiting people who can mint identities on demand",
        body: "An invite link creates an anonymous session on demand, so anyone holding one can produce unlimited distinct user ids and a per-user quota means nothing. The quota is therefore counted per trip — the only identity in the system that costs something to create — and a quota that cannot be read refuses the request rather than allowing it, because failing open would remove the only bound on what a leaked link can spend.",
      },
    ],
    role: "Sole engineer — schema, policies, client and deployment",
    year: "2026",
    status: "Live · actively developed",
    visibility: "public",
    layout: "editorial",
    accentSection: "light",
    problem:
      "Planning a trip with friends collapses into a four-hundred-message group chat. Every planner that fixes this asks each friend to create an account first — which is exactly where a group of six turns into a group of two.",
    approach:
      "Invert the cost. The trip owner signs in once with an email magic link. Everyone else opens an invite link, types a display name, picks a colour, and is planning in under fifteen seconds. Behind that is a real, invisible anonymous session, persisted on the device, so every participant still has a genuine identity the database can reason about.",
    architecture:
      "A React 19 single-page app served as static files, talking straight to Supabase. Authorization lives in Postgres Row Level Security, so there is no server that could be trusted-but-wrong: every table carries a trip_id and is readable only by someone holding a members row for that trip. Joining happens exclusively through a join_trip RPC so invite codes are validated server-side, and the policy helpers are SECURITY DEFINER functions to keep the checks non-recursive. TanStack Query owns all server state; Supabase Realtime streams Postgres changes back and invalidates the cache, so every member watches the plan change under their hands. The single piece of server-side code is /api/ai, a Cloudflare Pages Function holding the AI layer's kill switch, per-trip quota and usage ledger. It reads trip data as the caller rather than with a privileged key, so Row Level Security — not the function — still decides what the model is allowed to see.",
    decisions: [
      {
        title: "Authorization is a database concern",
        body: "Row Level Security is the only security boundary. The Supabase URL and publishable key ship in the bundle because they are public by design — a hostile client still cannot read a trip it has no membership row for.",
      },
      {
        title: "Hash routing, deliberately",
        body: "A static host has no rewrite rules. Hash routing plus a relative Vite base means an invite deep link resolves under any repository name, with zero deploy configuration. Cloudflare could rewrite now, so the constraint has lifted — but every invite link, share link, bookmark and installed PWA already in circulation points at a hash URL, so the change is tracked as its own decision rather than folded into a hosting move.",
      },
      {
        title: "Every external service fails soft",
        body: "Weather, geocoding, map tiles and currency conversion all come from free, keyless APIs. Each one degrades to an explicit 'unavailable' state rather than taking down the field it feeds.",
      },
      {
        title: "Schema moves forward only",
        body: "Thirty-two incremental migrations rather than an edited baseline — multi-city legs, multi-currency budgets, availability polls, notifications, revocable public share links and the AI usage ledger each arrived as their own reviewable step.",
      },
      {
        title: "A second host, not a migration",
        body: "Cloudflare Pages runs alongside GitHub Pages rather than replacing it, for the two things a static GitHub host cannot do: set cache headers, and build a preview per pull request. GitHub Pages stays canonical, so every URL already in circulation keeps working and abandoning either direction costs one deleted file.",
      },
      {
        title: "The AI feature ships without a secret",
        body: "Workers AI is a platform-authenticated binding, not an API credential, and the ledger write goes through a SECURITY DEFINER RPC instead of a service-role key. A credential that does not exist cannot leak, cannot be rotated late, and cannot be laundered into the bundle by a well-meaning environment variable.",
      },
      {
        title: "Deterministic first; the model only judges",
        body: "If a question can be answered by SQL, a rule or arithmetic, it is answered that way and no model is called — a sum() is right every time. The model handles the residue, returns schema-validated proposed actions capped in the schema rather than in the prompt, and never writes to a table. Measurement then narrowed its job further: asked to improve a day, two models three tiers apart made the same scheduling-collision error, so the feature was reshaped to generate candidate changes deterministically and let the model only select and explain one.",
      },
    ],
    stack: [
      { group: "Client", items: ["React 19", "TypeScript", "Vite", "Tailwind v4", "TanStack Query", "Motion"] },
      { group: "Data", items: ["Supabase", "PostgreSQL", "Row Level Security", "PL/pgSQL", "Realtime"] },
      { group: "AI", items: ["Cloudflare Pages Functions", "Workers AI", "Zod", "Structured output"] },
      { group: "Platform", items: ["GitHub Actions", "GitHub Pages", "Cloudflare Pages", "PWA", "Leaflet"] },
    ],
    stats: [
      { label: "Commits", value: "300" },
      { label: "Migrations", value: "32" },
      { label: "AI credentials", value: "0" },
    ],
    links: [
      { label: "Live app", href: "https://tseten1996.github.io/wander/", kind: "live" },
      { label: "Source", href: "https://github.com/tseten1996/wander", kind: "repo" },
    ],
    trace: [
      { id: "spa", label: "React SPA", detail: "Static bundle on GitHub Pages, mirrored to Cloudflare Pages for cache headers and per-PR previews. TanStack Query holds server state; optimistic writes land instantly.", meta: "client" },
      { id: "auth", label: "Auth", detail: "Magic link for the owner, invisible anonymous session for invited friends. Both produce a real auth.uid().", meta: "supabase" },
      { id: "rls", label: "Row Level Security", detail: "Every policy asks one question: does this uid hold a members row for this trip_id? SECURITY DEFINER helpers keep it non-recursive.", meta: "postgres" },
      { id: "rpc", label: "join_trip RPC", detail: "The only path into a trip. Invite codes are validated server-side, so a guessed code fails in the database, not the UI.", meta: "postgres" },
      { id: "realtime", label: "Realtime", detail: "Postgres change data capture streams back over websockets and invalidates the exact queries affected.", meta: "websocket" },
      { id: "ai", label: "/api/ai", detail: "The only server-side code. Kill switch, per-trip quota and usage ledger; reads trip data as the caller, so RLS still bounds what the model sees. No key, on either side of it.", meta: "cloudflare" },
    ],
    schemaType: "WebApplication",
    seoKeywords: [
      "collaborative trip planner",
      "React 19",
      "Supabase",
      "PostgreSQL Row Level Security",
      "TypeScript",
      "realtime web application",
      "Cloudflare Pages Functions",
      "Cloudflare Workers AI",
    ],
  },
  {
    slug: "telos",
    index: "02",
    name: "Telos",
    kicker: "Developer tooling · TypeScript + SQLite",
    summary:
      "A code-graph engine for end-to-end test intelligence that will only tell you things it can cite back to a file and a position.",
    whatItIs:
      "Telos is a local-first command-line tool and library for engineering teams that maintain large end-to-end test suites. It reads a codebase through stack adapters, builds a queryable graph of how the application actually fits together, and attaches a file citation to every fact it reports, so impact analysis can be audited rather than trusted. The graph is the foundation of a larger design — a registry of human-approved business journeys, generated Playwright tests, and validation gates a test must clear before anyone is asked to review it — of which the graph engine and the first adapter are what exist today.",
    challenges: [
      {
        title: "Telling a fact from a coincidence",
        body: "Two classes in a large codebase routinely share a name. Resolving edges by matching bare identifiers produces a graph that looks complete and is quietly wrong, so resolution follows the real import graph — through aliases, to the true exported name — and an edge that cannot be resolved is dropped rather than guessed.",
      },
      {
        title: "Making rescans byte-identical",
        body: "A graph is only usable as a CI signal if two scans of an unchanged tree diff to nothing. That meant content-addressed identifiers, locale-independent ordering (a default sort silently changes with the machine's locale), and resetting the store per scan so counts come from the store rather than from accumulated state.",
      },
      {
        title: "Keeping the core free of any framework",
        body: "Angular is the first adapter, not the architecture. Route, component, service and dependency-injection knowledge lives entirely in the adapter package, so adding a second stack does not touch the scan pipeline or the graph store.",
      },
      {
        title: "Bounding what a language model may assert",
        body: "Models are allowed to name semantics — what a journey means — but never to introduce an edge. The deterministic graph is the only source of structural truth, which is what makes the output citable instead of plausible.",
      },
      {
        title: "Knowing, and publishing, what the extractor cannot see",
        body: "The dangerous failure of a static analyser is not a wrong answer but a quiet one: a shape it does not recognise produces no edge, and an empty result reads like an empty codebase. Every unresolved case — a namespace import, a URL assembled by concatenation, a route declared with satisfies rather than a type annotation — fails closed and is written down at the call site, with the measured coverage beside it, so \"no routes found\" can never be mistaken for \"there are no routes\".",
      },
    ],
    role: "Sole engineer — design, graph store, Angular adapter and CLI",
    year: "2026",
    status: "Graph foundation complete · in development · private",
    visibility: "private",
    layout: "trace",
    accentSection: "dark",
    problem:
      "End-to-end suites drift away from the application they were written to protect. Generating more tests is easy; knowing which business journey is actually covered, and which test breaks when a route changes, is the part nobody can answer. Ask a language model directly and it will answer confidently and sometimes wrongly.",
    approach:
      "Build the boring, deterministic thing first. Telos ingests a codebase through stack adapters and produces a factual graph where every node and edge records the file it was derived from. Impact analysis then becomes a traversal with citations attached rather than a plausible-sounding paragraph. Models are permitted to name semantics; they are never permitted to invent an edge. Everything above the graph inherits that shape: agents read and emit typed proposals, deterministic code validates and applies them, and a generated test only reaches a human after it has cleared gates that no model gets a vote in.",
    architecture:
      "A pnpm TypeScript monorepo with a deliberately thin core. @telos/graph is a SQLite-backed store with a Zod-validated schema, content-addressed identifiers and deterministic export. @telos/core holds the adapter registry and scan pipeline and knows nothing about any particular framework. @telos/adapter-angular resolves routes, components, services and dependency-injection edges through the real import graph, using ts-morph over the TypeScript AST. @telos/cli exposes telos scan, which produces a cited inventory report. The design around those packages separates four planes — versioned knowledge artifacts, a reasoning plane of typed agents, a deterministic execution plane, and the stack adapters — under a single invariant: the reasoning plane may read knowledge and emit typed proposals, and may never write. Every mutation passes through execution-plane code that validates first, which is what turns guardrails into enforced properties rather than instructions in a prompt.",
    decisions: [
      {
        title: "Adapters, not a hard-coded stack",
        body: "Angular is the first adapter, not the architecture. The core resolves nothing framework-specific, so adding Spring Boot or Playwright never touches it.",
      },
      {
        title: "Resolve by true exported name",
        body: "Edges are resolved through imports and aliases rather than matching bare class names. That distinction is the entire difference between a fact and a coincidence in a large codebase.",
      },
      {
        title: "Byte-identical rescans",
        body: "Locale-independent ordering, a store reset per scan and stable IDs mean two scans of the same tree diff to nothing — which is what makes the graph usable as a CI signal.",
      },
      {
        title: "Local-first, with the seam already cut",
        body: "Everything runs on a developer machine today. The persistence boundary is designed for a control plane that does not exist yet, so adding one later is not a rewrite.",
      },
      {
        title: "No supervisor agent",
        body: "A model that chooses which specialist runs next was considered and rejected. It makes runs non-reproducible, degrades the audit trail from a record into a transcript, and — decisively — converts every hard limit into a request the model is free to ignore. Agents reason; code enforces; the pipeline is fixed.",
      },
      {
        title: "Proven and inferred edges are never blended",
        body: "An edge derived from an AST is a fact. An edge a model resolved from genuine ambiguity is a hypothesis. Both are stored, both are labelled, and a query that mixes them says so — a confidence figure that quietly averages the two is exactly the laundered guess the tool exists to prevent.",
      },
      {
        title: "Humans own the intent; the graph owns the citations",
        body: "In the journey registry a person writes what the business expects and how critical it is; the code references beneath it are derived and regenerated on every scan. A refactor updates the citations and raises a review request — it never rewrites what a human said the business does. A registry agents may edit is one that eventually describes the bug instead of the requirement.",
      },
      {
        title: "A generated test has to be reviewable in thirty seconds",
        body: "Selectors live in human-owned action files and nowhere else, so a generated test reads as business intent rather than as locators. And a test that stays green when a precondition its outcome depends on is deliberately broken is rejected as vacuous — mechanically, before a person sees it. Without both, human approval is theatre.",
      },
    ],
    stack: [
      { group: "Core", items: ["TypeScript", "Node 22", "pnpm workspaces", "ts-morph"] },
      { group: "Storage", items: ["better-sqlite3", "Zod"] },
      { group: "Interface", items: ["Commander", "CLI reports"] },
      { group: "Quality", items: ["Vitest", "Design docs", "Written plans"] },
    ],
    stats: [
      { label: "Packages", value: "4" },
      { label: "Tests", value: "70" },
      { label: "Started", value: "Aug 2026" },
    ],
    links: [],
    trace: [
      { id: "source", label: "Source tree", detail: "Any repository, read-only. Nothing is written back into the codebase being analysed.", meta: "input" },
      { id: "adapter", label: "Stack adapter", detail: "Angular first: routes, components, services and DI edges, each resolved through the import graph rather than by name.", meta: "@telos/adapter-angular" },
      { id: "core", label: "Scan pipeline", detail: "Adapter registry plus a fixed pipeline. The core stays framework-agnostic so a second adapter costs nothing.", meta: "@telos/core" },
      { id: "graph", label: "Cited graph", detail: "SQLite store, Zod-validated schema, content-addressed IDs. Every edge carries the file it came from.", meta: "@telos/graph" },
      { id: "cli", label: "telos scan", detail: "A cited inventory report. Two scans of an unchanged tree export byte-identical JSON, which is what makes the graph usable as a CI signal rather than a snapshot.", meta: "@telos/cli" },
    ],
    schemaType: "SoftwareSourceCode",
    seoKeywords: [
      "static analysis",
      "code graph",
      "developer tooling",
      "TypeScript monorepo",
      "end-to-end testing",
      "SQLite",
      "Playwright",
      "test intelligence",
    ],
  },
  {
    slug: "cashoncash",
    index: "03",
    name: "CashOnCash",
    kicker: "Real-estate underwriting · Co-founder",
    summary:
      "An underwriting workbench for rental property, where every number on the report traces back to an input you can edit and defend.",
    whatItIs:
      "CashOnCash is a web application for underwriting rental real estate. An investor drops in an address, MLS link or Zillow URL; the property hydrates with beds, baths, taxes and a current listing rent; and from there every assumption is editable. Cash-on-cash return, NOI, DSCR, IRR, equity multiple and payback recompute as the model changes, alongside a ten-year pro forma. The finished analysis leaves as a live shared link or a lender-ready PDF or Excel export. It is built for operators and small investors who have been underwriting deals on a spreadsheet inherited from someone else.",
    challenges: [
      {
        title: "A spreadsheet that quietly disagrees with itself",
        body: "The product exists because of one specific failure: a tab breaks, a formula drifts, and the workbook keeps producing a confident number that is wrong. Nothing in a shared spreadsheet catches that, so it surfaces in front of a lender instead. Replacing it means every figure has to be derived from an assumption rather than stored beside one, because a stored result is exactly what can fall out of step with the model around it.",
      },
      {
        title: "Every KPI has to be defensible line by line",
        body: "A return figure is only worth anything if the person reading it can be shown where it came from. Each KPI on a CashOnCash report resolves back to the editable input that produced it, which is a real constraint rather than a feature: it rules out the hand-entered override, which is the single most convenient thing to allow and the thing that makes the next reader unable to reconstruct the number.",
      },
      {
        title: "Recomputing the whole deal on every edit",
        body: "Changing the purchase price moves the loan, the debt service, the operating statement, every headline metric and all ten years of the pro forma. Doing that as the assumption is typed — with no recalculation the user has to wait on — is what separates a tool someone explores a deal inside from a tool they open once at the end to produce a number they had already decided on.",
      },
      {
        title: "One model, several readers",
        body: "Sending a partner or a lender a PDF starts a version problem the moment the next assumption changes. A CashOnCash link resolves to the same live model its author is looking at, which means the shared view, the export and the editing session all have to describe one state rather than three snapshots of it taken at different times.",
      },
    ],
    role: "Co-founder and engineer",
    year: "2026",
    status: "Live · in active development",
    visibility: "private",
    layout: "grid",
    accentSection: "light",
    problem:
      "Rental underwriting runs on spreadsheets forked from other people's spreadsheets. They work until a tab breaks, a formula silently drifts, or the wrong version reaches a lender — and none of those failures announce themselves. The number still looks exactly like a number.",
    approach:
      "Make the report the product rather than the file. Underwriting starts from real listing data instead of a blank sheet, every assumption stays editable and owned by the person making it, and the output is one live document rather than a file that is copied and diverges. The rule the team states plainly is that every number can be traced, edited and trusted — which is a commitment about what the software is not allowed to do as much as what it does.",
    architecture:
      "A property is hydrated from an address, MLS link or Zillow URL, then held as a set of editable assumptions — purchase price, rent, vacancy, taxes, operating expenses — from which everything else is derived. The operating statement, debt service, the metric set and the ten-year pro forma are all outputs of those inputs and recompute on edit. Scenarios (base, optimistic, stress and custom) are variations over the same input set rather than duplicated workbooks, and that one model is what a shared link renders, what a PDF prints and what an Excel export writes.",
    decisions: [
      {
        title: "The report is the unit, not the file",
        body: "An analysis lives at a URL that partners and lenders open, so there is one current version by construction. Export still exists for the people who need paper, but it is a rendering of the live model rather than the thing being passed around.",
      },
      {
        title: "No number without an input behind it",
        body: "Every metric resolves to an editable assumption, which forbids the hand-entered result. That is the constraint the whole product rests on: it is why a figure survives being questioned in a credit memo instead of needing its author present to explain it.",
      },
      {
        title: "Start from real data, not a blank sheet",
        body: "Pulling beds, baths, taxes and listing rent from an address means the first version of a model is already close enough to argue with. A blank template is where most underwriting stalls, and it is also where the borrowed spreadsheet gets reached for.",
      },
      {
        title: "Scenarios are variations, not copies",
        body: "Base, optimistic, stress and custom run against one input set. Duplicating a workbook per scenario is how versions diverge in the first place, so the feature that would most obviously be built as a copy is deliberately not one.",
      },
      {
        title: "Built by operators, not by finance",
        body: "The team underwrote its own deals on borrowed spreadsheets before building this. The product's opinions — traceability ahead of flexibility, one live report ahead of many files — come from that experience rather than from what underwriting software conventionally looks like.",
      },
    ],
    stack: [
      { group: "Web", items: ["TypeScript", "React", "Vite", "Tailwind CSS"] },
      { group: "Accounts", items: ["Google sign-in", "Email magic links", "Saved reports"] },
      { group: "Reporting", items: ["Shared live links", "PDF export", "Excel export"] },
    ],
    stats: [
      { label: "Pro forma", value: "10-year" },
      { label: "Scenarios", value: "4" },
      { label: "Tracked metrics", value: "6" },
    ],
    links: [{ label: "Live product", href: "https://cashoncash.io", kind: "live" }],
    trace: [
      { id: "hydrate", label: "Address in", detail: "A street address, MLS link or Zillow URL. Beds, baths, taxes and a current listing rent arrive in seconds, so the model starts from real figures.", meta: "input" },
      { id: "assume", label: "Editable assumptions", detail: "Price, rent, vacancy, taxes and operating expenses are the inputs the user owns. Nothing downstream of them is hand-entered.", meta: "model" },
      { id: "compute", label: "Recompute on edit", detail: "Operating statement, debt service, cash-on-cash, NOI, DSCR, IRR, equity multiple, payback and ten years of pro forma, all derived and all live.", meta: "derived" },
      { id: "scenario", label: "Scenarios", detail: "Base, optimistic, stress and custom as variations over one input set rather than four copies of a workbook.", meta: "model" },
      { id: "share", label: "Share or export", detail: "A link a partner or lender opens onto the same live model, or a lender-ready PDF or Excel rendered from it.", meta: "output" },
    ],
    sourceNote:
      "Written from what the product publishes at cashoncash.io, read on 21 August 2026. The source repository is private, so nothing here describes its internals.",
    schemaType: "WebApplication",
    seoKeywords: [
      "rental property underwriting",
      "real estate pro forma software",
      "cash-on-cash return",
      "DSCR",
      "net operating income",
      "real estate investment analysis",
    ],
  },
  {
    slug: "payload",
    index: "04",
    name: "Payload",
    kicker: "Agent monetization · Co-founder",
    summary:
      "An MCP layer that pays developers when their coding agent takes a sponsored recommendation — and that never sees the prompt it was recommending against.",
    whatItIs:
      "Payload is a monetization layer for developers who build with AI coding agents. It installs as an MCP server into Claude Code, Codex or Cursor with a single command. When an agent is planning work that needs a third-party service — a database, an auth provider, a payments API — Payload returns one recommendation, explicitly marked sponsored, which the agent is free to take or ignore. If it is taken, the developer keeps 50% of what the advertiser paid, withdrawn through Stripe. The product's stated shape is \"no banners, no spinner swaps, no prompt uploads\": the agent's own tool call is the entire surface.",
    challenges: [
      {
        title: "Being relevant without reading the prompt",
        body: "A recommendation is only worth paying for if it fits what someone is actually building, and the obvious way to achieve that is to ship the model's context to the ad server. Payload does the opposite: it receives a brief service-category summary and nothing else. Fields carrying prompt, text, query or file content are rejected rather than trimmed, so the narrow input is enforced at the boundary instead of depending on every caller to respect it. Source code, filenames, project structure and chat history are never collected.",
      },
      {
        title: "Leaving the decision with the agent",
        body: "At most one recommendation comes back and it is labelled sponsored. The agent chooses whether to use it. That rules out the entire family of designs in which the advertisement wins by being indistinguishable from the tool's own output — which is also the only version of this product a developer would leave installed after the first week.",
      },
      {
        title: "Attribution without an identity to track",
        body: "Earnings have to reach the right developer across machines and sessions, but the contents of a coding session are exactly what the product has promised not to collect. Attribution rides on a device-scoped token issued at install and revocable from the dashboard, rather than on anything derived from the work itself — so the thing that identifies the earner is deliberately unrelated to the thing that earned.",
      },
      {
        title: "Paying for real work rather than for farming",
        body: "A per-use payout is an open invitation to automate the trigger. Qualifying requires that a relevant recommendation surfaced, that the agent actually used it, that the account is properly connected, and that the coding was human-initiated; balances then clear fraud review and a hold period before Stripe will release them. The cost of getting this wrong lands on the honest developers, because they are the ones the advertiser budget has to keep paying.",
      },
    ],
    role: "Co-founder and engineer",
    year: "2026",
    status: "Live · in active development",
    visibility: "private",
    layout: "editorial",
    accentSection: "dark",
    problem:
      "Developers now pay for the agent that writes their code, and the meter runs whether or not the session produced anything worth keeping. Meanwhile the tools those agents reach for — the database, the auth provider, the queue — get chosen inside the session, by the agent, at a moment no one outside it can reach. Both halves are stuck for the same reason: nothing about that moment is legible from the outside.",
    approach:
      "Put the recommendation where the decision already happens, and give the developer the upside. Payload ships as an MCP server, so it is a tool the agent calls rather than a surface bolted onto the editor — no banners, no spinner swaps, no prompt uploads. It answers with a single sponsored suggestion the agent can decline, and it splits the advertiser's payment with the developer whose session produced it.",
    architecture:
      "An MCP server registered once against the developer's agent over HTTP transport, after which it is available to Claude Code, Codex or Cursor as an ordinary tool. When an agent is planning a build that needs a third-party service it calls payload.recommend with a short service-category summary. The server refuses any field carrying prompt, text, query or file content, matches the category against advertiser campaigns that have been reviewed by hand, and returns at most one result, marked sponsored. A device-scoped token issued at install carries attribution, so the right developer is credited without the session itself being recorded. Qualified earnings accumulate against the account and are withdrawn through Stripe Connect once they clear fraud review.",
    decisions: [
      {
        title: "MCP, not an editor plugin",
        body: "Shipping as a tool the agent may call means Payload never intercepts, wraps or re-renders anything the editor is doing. It also means uninstalling is one config line or a revoked token — which is what makes \"opt-in\" a property of the integration rather than a promise in the marketing.",
      },
      {
        title: "Reject the field, do not sanitise it",
        body: "Anything carrying prompt, text, query or file content is refused outright rather than stripped. A filter that cleans its input keeps quietly succeeding when the input changes shape; a filter that refuses it fails loudly. On the boundary that carries the product's entire privacy claim, loud is the correct failure.",
      },
      {
        title: "One recommendation, and it says so",
        body: "A single sponsored result the agent can ignore. More results, or unlabelled ones, would raise revenue per call immediately and destroy the reason anyone installed it — and the second effect is permanent while the first is not.",
      },
      {
        title: "Advertisers are reviewed by hand",
        body: "Every advertiser is reviewed before a campaign can run. It does not scale, and at this stage that is deliberate: what is being sold to the developer is that the recommendation is worth taking, and that claim cannot be underwritten by a self-serve form.",
      },
      {
        title: "The payout is a share, not a bounty",
        body: "50% of what the advertiser paid, tied to a recommendation the agent actually used. Paying per impression would make volume the product and point the incentive directly against every decision above it.",
      },
    ],
    stack: [
      { group: "Integration", items: ["Model Context Protocol", "HTTP transport", "Claude Code", "Codex", "Cursor"] },
      { group: "Platform", items: ["Device-scoped tokens", "Category matching", "Reviewed campaigns", "Fraud review"] },
      { group: "Payouts", items: ["Stripe Connect"] },
    ],
    stats: [
      { label: "Developer share", value: "50%" },
      { label: "Agents supported", value: "3" },
      { label: "Prompt data collected", value: "None" },
    ],
    links: [{ label: "Live product", href: "https://getpayload.ai", kind: "live" }],
    trace: [
      { id: "install", label: "One-line install", detail: "An MCP server registered against Claude Code, Codex or Cursor. A device-scoped token issued at sign-in carries attribution from then on.", meta: "setup" },
      { id: "call", label: "payload.recommend", detail: "The agent calls it while planning a build that needs a third-party service, passing a short service-category summary.", meta: "mcp" },
      { id: "boundary", label: "Field rejection", detail: "Fields carrying prompt, text, query or file content are refused rather than trimmed. Source, filenames, project structure and chat history never arrive.", meta: "server" },
      { id: "match", label: "Matched campaign", detail: "The category is matched against hand-reviewed advertisers. At most one result returns, explicitly marked sponsored.", meta: "server" },
      { id: "decide", label: "The agent decides", detail: "The recommendation is a suggestion the agent may decline. Nothing is inserted into the editor or into the model's prompt.", meta: "client" },
      { id: "payout", label: "Stripe Connect", detail: "A used recommendation qualifies, clears fraud review and a hold period, and pays the developer half of what the advertiser paid.", meta: "payouts" },
    ],
    sourceNote:
      "Written from what the product publishes at getpayload.ai, including its FAQ, read on 21 August 2026. The source repository is private, so nothing here describes its internals.",
    schemaType: "WebApplication",
    seoKeywords: [
      "Model Context Protocol",
      "MCP server",
      "AI coding agents",
      "developer monetization",
      "Claude Code",
      "agent tooling",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
