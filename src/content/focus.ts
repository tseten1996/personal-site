/**
 * What kind of engineer this is — grounded in the roles above and the 2026
 * repositories, not in a skills quiz.
 */

export type Focus = {
  index: string;
  title: string;
  statement: string;
  body: string;
  evidence: string;
  /** Where the claim can actually be checked. Keeps assertions falsifiable. */
  evidenceLinks: { label: string; href: string }[];
  tools: string[];
};

export const focusAreas: Focus[] = [
  {
    index: "01",
    title: "Event-driven backends",
    statement: "Asynchronous by default, synchronous where a person is waiting.",
    body: "Most of the interesting decisions in a backend are about what is allowed to be slow. Kafka-based streaming for the volume, plain synchronous APIs for the screens someone is staring at, and a clear boundary between the two.",
    evidence: "Motor Vehicle Record microservice, Java 25 · Arch Capital",
    evidenceLinks: [{ label: "Experience", href: "/#experience" }],
    tools: ["Java 21 / 25", "Spring Boot", "Kafka", "FastAPI", "PostgreSQL"],
  },
  {
    index: "02",
    title: "Agentic systems with guardrails",
    statement: "The interesting part of an agent is the part that is not the model.",
    body: "Orchestration, tool boundaries, deterministic state and the ability to say 'I cannot verify that' are what make an agent usable in a release pipeline. Telos takes the same position in a different domain: the graph is deterministic, and the model is only allowed to name what the graph already proved.",
    evidence: "Release automation platform · Arch Capital · and Telos",
    evidenceLinks: [
      { label: "Telos case study", href: "/work/telos/" },
      { label: "Experience", href: "/#experience" },
    ],
    tools: ["Python", "LangGraph", "PydanticAI", "Multi-agent orchestration", "Tool calling"],
  },
  {
    index: "03",
    title: "Platform and delivery",
    statement: "A gate that fails the build is worth more than a dashboard nobody opens.",
    body: "Pipelines that enforce rather than report — dependency and static analysis in the critical path, migrations that only move forward, and deployment cycles short enough that shipping stops being an event.",
    evidence: "GitHub Actions, JFrog X-Ray, SonarCloud · Arch Capital",
    evidenceLinks: [
      { label: "Experience", href: "/#experience" },
      { label: "Field Manual case study", href: "/work/field-manual/" },
    ],
    tools: ["GitHub Actions", "Docker", "AWS", "JFrog X-Ray", "SonarCloud", "Liquibase / Flyway"],
  },
  {
    index: "04",
    title: "Product engineering",
    statement: "Own the whole slice: schema, policy, API and the screen.",
    body: "The fastest way to a coherent product is for one person to be able to follow a feature from a Postgres policy to the thing a user taps. Wander is that argument in full: no backend, thirty migrations, and authorization that lives where the data does.",
    evidence: "Wander · React 19, Supabase, Postgres RLS",
    evidenceLinks: [
      { label: "Wander case study", href: "/work/wander/" },
      { label: "Source on GitHub", href: "https://github.com/tseten1996/wander" },
    ],
    tools: ["React", "Angular", "TypeScript", "Tailwind", "Supabase", "PostgreSQL"],
  },
];

export const stackGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Java", "TypeScript", "Python", "JavaScript", "SQL", "PL/pgSQL"] },
  { label: "Backend", items: ["Spring Boot", "FastAPI", "Node.js", "REST APIs", "Kafka", "Event-driven architecture"] },
  { label: "Frontend", items: ["React", "Angular", "NgRx", "RxJS", "Tailwind CSS", "Vite"] },
  { label: "Cloud & delivery", items: ["AWS", "Docker", "GitHub Actions", "Jenkins", "JFrog X-Ray", "SonarCloud"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "SQLite", "Liquibase", "Flyway"] },
  { label: "AI systems", items: ["LangGraph", "PydanticAI", "OpenAI API", "Multi-agent orchestration", "Tool calling"] },
];
