/**
 * Prose that states facts about Tenzing rather than decorating the page.
 *
 * It lives here, not inside components, because it has to render into three
 * representations that must never disagree: the HTML site, the Markdown
 * representations under /*.md, and /llms.txt + /llms-full.txt. One source,
 * many renderings — see src/content/render/markdown.ts.
 */

/** The hero headline, as the lines it is set in. */
export const headline = {
  lines: ["Backend systems,", "developer tools, and", "agents that know"],
  emphasis: "what they can prove.",
  /** The same statement as one sentence, for metadata and Markdown. */
  plain:
    "Backend systems, developer tools, and agents that know what they can prove.",
};

export const heroLede =
  "7+ years building event-driven Java and Spring Boot services, Python agent orchestration, and full-stack TypeScript products — currently at Arch Capital Group, working on Kafka-backed microservices, release automation and the pipelines that gate both.";

/**
 * A direct, factual answer to "who is this and what do they do" — written to be
 * usable as a standalone summary by a person or a retrieval system.
 */
export const professionalSummary =
  "Tenzing Sherpa is a senior software engineer based in Los Angeles, California, working remotely, with over seven years of professional experience. He builds event-driven backend services in Java and Spring Boot, Python services with FastAPI, and full-stack TypeScript products with React and Angular. Since November 2021 he has been a Senior Software Engineer at Arch Capital Group, where he designs Kafka-based event-streaming microservices, architected a multi-agent GenAI release-automation platform in Python and FastAPI, and integrated security and quality gates into GitHub Actions pipelines. Previously he was a Full Stack Engineer at FastSpring, building B2B and B2C payment and invoicing systems. He is also a co-founder and engineer on two products: CashOnCash, an underwriting workbench for rental real estate, and Payload, a Model Context Protocol layer that pays developers when their AI coding agent uses a sponsored recommendation. He holds a B.S. in Computer Science from the University of California, Santa Barbara.";

export const aboutParagraphs = [
  "I’m a senior engineer at Arch Capital Group. Most of my time goes to backend services and the delivery pipelines around them, and more recently to a multi-agent platform that automates release workflows. Before that, three and a half years at FastSpring building payment and invoicing systems — a good place to learn that “mostly correct” is not a state a system is allowed to be in.",
  "The problems I find interesting are almost always about where a boundary goes. Whether authorization belongs in the client or in the database. Whether a call is allowed to be asynchronous, or whether someone is sitting there waiting for it. Whether a model gets to assert something it cannot cite. Those calls are cheap to make at the start and expensive to move later, which is most of why I care about them.",
  "Outside of work I build things small enough to actually finish. Wander exists because planning a trip with six friends is worse than it needs to be. Telos exists because I wanted to know whether an end-to-end suite really covers the journey it claims to. Both are more interesting to me as arguments than as products — which is also the honest reason they get finished.",
  "Two of them stopped being side projects. I co-founded CashOnCash, an underwriting tool for rental property built on the position that every number in a report should trace back to an input you can edit, and Payload, which pays developers when their coding agent takes a sponsored recommendation and is built on the position that it should manage that without ever reading their prompts. Both are opinionated in the same direction: the constraint is the product.",
];

export const quickFacts: [string, string][] = [
  ["Based", "Los Angeles, California"],
  ["Working", "Remote since 2021"],
  ["Studied", "B.S. Computer Science, UCSB"],
  ["Writing", "Mostly Java, TypeScript, Python"],
];

export const heroRail: [string, string][] = [
  ["Currently", "Arch Capital Group"],
  ["Focus", "Backend · Platform · AI"],
  ["Based", "Los Angeles, CA"],
  ["Open to", "Senior / Staff engineering"],
];

export const contactLede =
  "Open to senior and staff engineering roles, and always happy to talk about event-driven systems, developer tooling, or where agents genuinely earn their keep.";
