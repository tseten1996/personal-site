/**
 * Single source of truth for identity, metadata and social links.
 * Nothing here is inferred — every value is either provided directly by
 * Tenzing or taken from a public profile that belongs to him.
 */

export const site = {
  name: "Tenzing Sherpa",
  shortName: "Tenzing Sherpa",
  initials: "TS",
  role: "Senior Software Engineer",
  location: "Los Angeles, CA",
  locality: "Los Angeles",
  region: "CA",
  country: "US",
  availability: "Remote",

  /** Canonical origin + base path (GitHub Pages project site). */
  url: "https://tseten1996.github.io/personal-site",

  title: "Tenzing Sherpa — Senior Software Engineer",
  tagline:
    "Senior software engineer working on event-driven backends, developer tooling and agentic systems.",
  description:
    "Tenzing Sherpa is a senior software engineer in Los Angeles building event-driven Java and Spring Boot services, Python agentic systems, and full-stack TypeScript products. Selected work: Wander, Telos, CashOnCash and Payload.",

  email: "tashidelektenzing@gmail.com",
  github: "https://github.com/tseten1996",
  githubHandle: "tseten1996",
  linkedin: "https://www.linkedin.com/in/tenzing-t-sherpa/",

  /**
   * Set to "/resume.pdf" once a PDF is placed in `public/`. While null, the UI
   * links the HTML résumé at /resume instead of rendering a dead download.
   */
  resumePdf: null as string | null,

  /** Used for the Person schema `knowsAbout` field. Kept honest and specific. */
  knowsAbout: [
    "Software engineering",
    "Backend engineering",
    "Distributed systems",
    "Event-driven architecture",
    "Java",
    "Spring Boot",
    "Python",
    "FastAPI",
    "TypeScript",
    "React",
    "Angular",
    "Apache Kafka",
    "PostgreSQL",
    "Cloud engineering",
    "CI/CD",
    "Developer tooling",
    "Agentic AI systems",
    "Model Context Protocol",
  ],
} as const;

export type NavItem = { label: string; href: string; external?: boolean };

export const navItems: NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Focus", href: "#focus" },
  { label: "About", href: "#about" },
];

/** Sections tracked by the header's active-section indicator. */
export const sectionIds = ["work", "experience", "focus", "building", "about", "contact"] as const;
