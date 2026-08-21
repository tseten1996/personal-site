/**
 * "What am I building lately" — verified against the repositories on 19 Aug 2026.
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
    description: "Collaborative trip planner for friends. React 19 + Supabase, and one server-side function that holds no credential.",
    note: "Latest work: an AI layer with no API key — a Cloudflare Pages Function on Workers AI, quota'd per trip, logged through a SECURITY DEFINER RPC.",
    updated: "Aug 2026",
    caseStudy: "wander",
  },
  {
    name: "Telos",
    href: null,
    visibility: "private",
    language: "TypeScript",
    description: "Code-graph engine for end-to-end test intelligence. Four packages, 70 tests.",
    note: "Foundation landed: byte-identical rescans, cited edges, an Angular adapter. Next is the backend adapter, where an edge first spans two stacks.",
    updated: "Aug 2026",
    caseStudy: "telos",
  },
];

export const exploring = [
  "Deterministic code graphs as a substrate for agents — provable edges instead of retrieved guesses.",
  "Where multi-agent orchestration actually pays for itself in a release pipeline, and where a script is still better.",
  "Postgres row-level security as the primary authorization boundary in small-team products.",
  "Platform-authenticated bindings instead of API keys — how much of a feature's risk is really the credential it needs.",
];
