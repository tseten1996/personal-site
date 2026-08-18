/**
 * Professional history, taken from Tenzing's résumé. Descriptions stay at the
 * level his own résumé already states publicly — no internal architecture,
 * system names, URLs or business detail beyond that.
 */

export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  period: string;
  location: string;
  /** One sentence framing what the role is actually about. */
  lede: string;
  highlights: { heading: string; body: string }[];
  stack: string[];
};

export const roles: Role[] = [
  {
    company: "Arch Capital Group",
    title: "Senior Software Engineer",
    start: "2021-11",
    end: "",
    period: "Nov 2021 — Present",
    location: "Remote",
    lede: "Backend and platform work across event-driven services, CI/CD, and an internal multi-agent automation platform.",
    highlights: [
      {
        heading: "Event-driven services",
        body: "Led a cross-functional team designing asynchronous event-streaming patterns on Kafka for a high-volume Motor Vehicle Record microservice in Java 25, integrated alongside the synchronous APIs that users actually wait on.",
      },
      {
        heading: "Multi-agent release automation",
        body: "Architected a GenAI release-automation platform in Python and FastAPI, using Atlassian Rovo agents as orchestrators calling external agents built with PydanticAI and LangGraph to automate SDLC workflows and rollback decisioning.",
      },
      {
        heading: "Modernisation and DevSecOps",
        body: "Ran continuous application migrations and wired JFrog X-Ray and SonarCloud into GitHub Actions pipelines, so security and quality gates fail a build rather than fill a dashboard.",
      },
      {
        heading: "Platform and delivery",
        body: "Spearheaded the Underwriter Workbench platform, reducing processing time by roughly 75%, and optimised CI/CD workflows to cut deployment cycle times in half.",
      },
      {
        heading: "Technical leadership",
        body: "Mentored junior and mid-level engineers, holding a 99.9% service uptime bar while working down technical debt and aligning delivery with enterprise architecture principles.",
      },
    ],
    stack: [
      "Java 21 / 25",
      "Spring Boot",
      "Python",
      "FastAPI",
      "Kafka",
      "Angular",
      "NgRx",
      "TypeScript",
      "AWS",
      "Docker",
      "GitHub Actions",
      "PostgreSQL",
      "LangGraph",
      "PydanticAI",
    ],
  },
  {
    company: "FastSpring",
    title: "Full Stack Engineer",
    start: "2018-06",
    end: "2021-11",
    period: "Jun 2018 — Nov 2021",
    location: "Santa Barbara, CA",
    lede: "Payments and invoicing systems, where correctness is not negotiable and the legacy monolith is not going anywhere.",
    highlights: [
      {
        heading: "Payment platforms",
        body: "Built B2B and B2C payment and invoicing systems on Spring Boot, Angular and PostgreSQL.",
      },
      {
        heading: "Extracting from the monolith",
        body: "Architected a microservice-based invoice processing system that integrated with the existing monolith rather than waiting for it to be replaced — improving reliability while reducing operational complexity.",
      },
    ],
    stack: ["Java", "Spring Boot", "Angular", "PostgreSQL", "REST APIs"],
  },
];

export const education = {
  school: "University of California, Santa Barbara",
  degree: "B.S. Computer Science",
};

export const yearsOfExperience = "7+";
