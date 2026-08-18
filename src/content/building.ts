/**
 * "What am I building lately" — verified against the GitHub API on 17 Aug 2026.
 * These are snapshots, not live counters: nothing here pretends to be a
 * real-time statistic.
 */

export type Repo = {
  name: string;
  href: string | null;
  visibility: "public" | "private";
  language: string;
  description: string;
  note: string;
  updated: string;
  caseStudy?: string;
};

export const repos: Repo[] = [
  {
    name: "tseten1996/wander",
    href: "https://github.com/tseten1996/wander",
    visibility: "public",
    language: "TypeScript · PL/pgSQL",
    description: "Collaborative trip planner for friends. React 19 + Supabase, no custom backend.",
    note: "Latest work: AI usage accounting and a public recap share link, both behind their own migrations.",
    updated: "Aug 2026",
    caseStudy: "wander",
  },
  {
    name: "Telos",
    href: null,
    visibility: "private",
    language: "TypeScript",
    description: "Code-graph engine for end-to-end test intelligence. Four packages, 70 tests.",
    note: "Currently: making rescans byte-identical so the graph can be diffed in CI.",
    updated: "Aug 2026",
    caseStudy: "telos",
  },
  {
    name: "tseten1996/daily-ai-news",
    href: "https://github.com/tseten1996/daily-ai-news",
    visibility: "public",
    language: "HTML",
    description: "A trends board and a sixteen-module field manual, extended by a scheduled agent.",
    note: "In flight: an Astro migration recorded as an ADR, so scheduled runs keep shipping to the live site meanwhile.",
    updated: "Jul 2026",
    caseStudy: "field-manual",
  },
];

export const exploring = [
  "Deterministic code graphs as a substrate for agents — provable edges instead of retrieved guesses.",
  "Where multi-agent orchestration actually pays for itself in a release pipeline, and where a script is still better.",
  "Postgres row-level security as the primary authorization boundary in small-team products.",
];
