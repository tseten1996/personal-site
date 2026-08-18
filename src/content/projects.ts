/**
 * Case studies for work done in 2026. Every claim below is traceable to a
 * repository Tenzing owns — README, architecture docs, migrations, commit
 * history or source. No metrics are estimated or invented; where a repository
 * is private, the write-up stays at the level of engineering approach and no
 * link is offered.
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
  /** Structured-data type for this project's page. */
  schemaType: "SoftwareSourceCode" | "WebApplication" | "CreativeWork";
  seoKeywords: string[];
};

export const projects: Project[] = [
  {
    slug: "wander",
    index: "01",
    name: "Wander",
    kicker: "Collaborative product · React 19 + Supabase",
    summary:
      "A group trip planner where only one person needs an account — and Postgres, not the browser, decides what everyone is allowed to see.",
    whatItIs:
      "Wander is a collaborative trip-planning web application for small groups of friends. One person creates a trip and everyone else joins through an invite link without creating an account. It replaces the group chat with shared polls, an itinerary, a budget with multi-currency settle-up, checklists, packing lists, notes and a map.",
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
        title: "Realtime cache invalidation without a backend",
        body: "With no server to push from, Supabase Realtime streams Postgres change data capture straight to the client and invalidates the specific TanStack Query keys affected, so optimistic local writes and other members' changes converge without a full refetch.",
      },
      {
        title: "Deep links on a host with no rewrite rules",
        body: "GitHub Pages serves static files and cannot rewrite unknown paths to an SPA entry point. Hash routing plus a relative Vite base means an invite link resolves under any repository name with zero deploy configuration.",
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
      "A React 19 single-page app served as static files from GitHub Pages, talking straight to Supabase. There is no custom backend, which means there is no server that could be trusted-but-wrong: authorization lives in Postgres Row Level Security. Every table carries a trip_id and is readable only by someone holding a members row for that trip. Joining happens exclusively through a join_trip RPC so invite codes are validated server-side, and the policy helpers are SECURITY DEFINER functions to keep the checks non-recursive. TanStack Query owns all server state; Supabase Realtime streams Postgres changes back and invalidates the cache, so every member watches the plan change under their hands.",
    decisions: [
      {
        title: "Authorization is a database concern",
        body: "Row Level Security is the only security boundary. The Supabase URL and publishable key ship in the bundle because they are public by design — a hostile client still cannot read a trip it has no membership row for.",
      },
      {
        title: "Hash routing, deliberately",
        body: "A static host has no rewrite rules. Hash routing plus a relative Vite base means an invite deep link resolves under any repository name, with zero deploy configuration.",
      },
      {
        title: "Every external service fails soft",
        body: "Weather, geocoding, map tiles and currency conversion all come from free, keyless APIs. Each one degrades to an explicit 'unavailable' state rather than taking down the field it feeds.",
      },
      {
        title: "Schema moves forward only",
        body: "Thirty incremental migrations rather than an edited baseline — multi-currency budgets, availability polls, notifications and revocable public share links each arrived as their own reviewable step.",
      },
    ],
    stack: [
      { group: "Client", items: ["React 19", "TypeScript", "Vite", "Tailwind v4", "TanStack Query", "Motion"] },
      { group: "Data", items: ["Supabase", "PostgreSQL", "Row Level Security", "PL/pgSQL", "Realtime"] },
      { group: "Platform", items: ["GitHub Actions", "GitHub Pages", "PWA", "Leaflet"] },
    ],
    stats: [
      { label: "Commits", value: "290" },
      { label: "Migrations", value: "30" },
      { label: "First commit", value: "Jul 2026" },
    ],
    links: [
      { label: "Live app", href: "https://tseten1996.github.io/wander/", kind: "live" },
      { label: "Source", href: "https://github.com/tseten1996/wander", kind: "repo" },
    ],
    trace: [
      { id: "spa", label: "React SPA", detail: "Static bundle on GitHub Pages. TanStack Query holds server state; optimistic writes land instantly.", meta: "client" },
      { id: "auth", label: "Auth", detail: "Magic link for the owner, invisible anonymous session for invited friends. Both produce a real auth.uid().", meta: "supabase" },
      { id: "rls", label: "Row Level Security", detail: "Every policy asks one question: does this uid hold a members row for this trip_id? SECURITY DEFINER helpers keep it non-recursive.", meta: "postgres" },
      { id: "rpc", label: "join_trip RPC", detail: "The only path into a trip. Invite codes are validated server-side, so a guessed code fails in the database, not the UI.", meta: "postgres" },
      { id: "realtime", label: "Realtime", detail: "Postgres change data capture streams back over websockets and invalidates the exact queries affected.", meta: "websocket" },
    ],
    schemaType: "WebApplication",
    seoKeywords: [
      "collaborative trip planner",
      "React 19",
      "Supabase",
      "PostgreSQL Row Level Security",
      "TypeScript",
      "realtime web application",
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
      "Telos is a local-first command-line tool and library for engineering teams that maintain large end-to-end test suites. It reads a codebase through stack adapters, builds a queryable graph of how the application actually fits together, and attaches a file citation to every fact it reports, so impact analysis can be audited rather than trusted.",
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
    ],
    role: "Sole engineer — design, graph store, Angular adapter and CLI",
    year: "2026",
    status: "In development · private",
    visibility: "private",
    layout: "trace",
    accentSection: "dark",
    problem:
      "End-to-end suites drift away from the application they were written to protect. Generating more tests is easy; knowing which business journey is actually covered, and which test breaks when a route changes, is the part nobody can answer. Ask a language model directly and it will answer confidently and sometimes wrongly.",
    approach:
      "Build the boring, deterministic thing first. Telos ingests a codebase through stack adapters and produces a factual graph where every node and edge records the file it was derived from. Impact analysis then becomes a traversal with citations attached rather than a plausible-sounding paragraph. Models are permitted to name semantics; they are never permitted to invent an edge.",
    architecture:
      "A pnpm TypeScript monorepo with a deliberately thin core. @telos/graph is a SQLite-backed store with a Zod-validated schema, content-addressed identifiers and deterministic export. @telos/core holds the adapter registry and scan pipeline and knows nothing about any particular framework. @telos/adapter-angular resolves routes, components, services and dependency-injection edges through the real import graph. @telos/cli exposes telos scan, which produces a cited inventory report.",
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
    ],
    stack: [
      { group: "Core", items: ["TypeScript", "Node 22", "pnpm workspaces"] },
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
      { id: "cli", label: "telos scan", detail: "A cited inventory report — deterministic enough to diff between runs and put in front of a reviewer.", meta: "@telos/cli" },
    ],
    schemaType: "SoftwareSourceCode",
    seoKeywords: [
      "static analysis",
      "code graph",
      "developer tooling",
      "TypeScript monorepo",
      "end-to-end testing",
      "SQLite",
    ],
  },
  {
    slug: "field-manual",
    index: "03",
    name: "Agentic Systems Field Manual",
    kicker: "Autonomous publishing · GitHub Actions",
    summary:
      "A technical site that extends itself on a schedule, where the repository is the only memory the agent gets.",
    whatItIs:
      "A public technical publication — a daily AI trends board plus a sixteen-module field manual on building agentic systems — that is written and extended by a scheduled AI agent rather than by hand. It is a working demonstration of how to give a stateless automated run enough context to extend a body of work without repeating or contradicting itself.",
    challenges: [
      {
        title: "Giving a stateless run a memory",
        body: "Each scheduled run starts with no knowledge of any previous one. The repository itself carries the state: front-matter metadata on every page, an append-only ledger of published topics for deduplication, a roadmap, and architecture decision records that a run must read before it is allowed to write.",
      },
      {
        title: "Publishing safely during a refactor",
        body: "An in-flight migration to Astro would normally mean either freezing publication or writing into a pipeline that does not ship. Recording the migration as an ADR with an explicit rule — keep authoring in the format that is actually deployed until the new one is wired into CI — turned a half-finished refactor into a documented boundary.",
      },
      {
        title: "Pages that still render in five years",
        body: "Every page is self-contained: inline CSS and JavaScript, no external dependencies, light and dark handled by prefers-color-scheme. Nothing on the site can break because a CDN moved or a package was unpublished.",
      },
    ],
    role: "Sole engineer — repository design, run contract and page architecture",
    year: "2026",
    status: "Live · publishing on schedule",
    visibility: "public",
    layout: "grid",
    accentSection: "light",
    problem:
      "A scheduled agent starts every run with no memory of the last one. Point that at a publishing task and it either repeats yesterday's topic or quietly contradicts it, and the site degrades a little with each run.",
    approach:
      "Treat the repository as the state and the run prompt as a contract. Each run reads what already exists — front-matter blocks on every page, an append-only ledger of published topics, a roadmap and architecture decision records — before it is allowed to write anything. Constraints that would otherwise be polite prompt requests become artefacts on disk that the next run has to read.",
    architecture:
      "Self-contained static HTML: inline CSS and JavaScript, no external dependencies, light and dark handled by prefers-color-scheme. A trends board and a sixteen-module field manual are published by GitHub Actions to GitHub Pages. Decisions are recorded as ADRs, including an in-flight migration to Astro that is deliberately described as in transition — so scheduled runs keep shipping to what is actually live instead of writing into a pipeline that is not wired up yet.",
    decisions: [
      {
        title: "The repository is the memory",
        body: "Front-matter on every page and an append-only ledger give a stateless run enough context to extend the site instead of restarting it.",
      },
      {
        title: "Architecture-in-transition is written down",
        body: "The Astro migration is an ADR with an explicit rule about what runs may and may not touch until it lands. A half-finished refactor becomes a documented boundary rather than a trap.",
      },
      {
        title: "Zero runtime dependencies",
        body: "Every page is self-contained. Nothing on the site can break because a CDN moved, and it will still render years from now.",
      },
    ],
    stack: [
      { group: "Output", items: ["HTML", "CSS", "Vanilla JS"] },
      { group: "Pipeline", items: ["GitHub Actions", "GitHub Pages", "Scheduled runs"] },
      { group: "Process", items: ["ADRs", "Roadmap", "Append-only ledger"] },
      { group: "In migration", items: ["Astro"] },
    ],
    stats: [
      { label: "Modules", value: "16" },
      { label: "Dependencies", value: "0" },
      { label: "Started", value: "Jul 2026" },
    ],
    links: [
      { label: "Live site", href: "https://tseten1996.github.io/daily-ai-news/", kind: "live" },
      { label: "Source", href: "https://github.com/tseten1996/daily-ai-news", kind: "repo" },
    ],
    trace: [
      { id: "cron", label: "Scheduled run", detail: "Starts with no memory of any previous run.", meta: "trigger" },
      { id: "read", label: "Read the repo", detail: "Front-matter, ledger, roadmap and ADRs are read before a single line is written.", meta: "state" },
      { id: "write", label: "Extend", detail: "One increment: a trends entry, a module, or an article — never a rewrite of what exists.", meta: "output" },
      { id: "deploy", label: "Actions → Pages", detail: "Commit triggers the build; the live site is the only definition of done.", meta: "ci" },
    ],
    schemaType: "CreativeWork",
    seoKeywords: [
      "agentic systems",
      "AI automation",
      "GitHub Actions",
      "static site",
      "scheduled agents",
      "architecture decision records",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
