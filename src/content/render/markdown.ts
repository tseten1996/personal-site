/**
 * The machine-readable representations of this site.
 *
 * Every string below is derived from the same typed content the React
 * components render, so the HTML page and its `.md` twin cannot drift apart —
 * see scripts/postbuild.mjs, which fails the build if they do. Nothing here
 * adds a fact that is not already on the visible site; only the representation
 * changes.
 */

import { site } from "@/content/site";
import { projects, getProject, type Project } from "@/content/projects";
import { roles, education, yearsOfExperience } from "@/content/experience";
import { focusAreas, stackGroups } from "@/content/focus";
import { repos, exploring } from "@/content/building";
import {
  aboutParagraphs,
  contactLede,
  headline,
  heroLede,
  professionalSummary,
  quickFacts,
} from "@/content/about";

const abs = (path: string) =>
  path.startsWith("http") ? path : `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Absolute URL of the Markdown twin for a given HTML route. */
export const markdownFor = (htmlPath: string) => {
  if (htmlPath === "/") return "/index.md";
  return `${htmlPath.replace(/\/$/, "")}/index.md`;
};

const join = (...blocks: (string | undefined | false)[]) =>
  blocks.filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

/** Shared trailer so any single Markdown file is self-describing. */
const identity = () =>
  [
    `**Name:** ${site.name}`,
    `**Role:** ${site.role}`,
    `**Location:** ${site.location} (${site.availability})`,
    `**Website:** ${site.url}`,
    `**GitHub:** ${site.github}`,
    `**LinkedIn:** ${site.linkedin}`,
    `**Email:** ${site.email}`,
  ].join("  \n");

const sourceNote = (htmlPath: string) =>
  `---\n\n*Markdown representation of ${abs(htmlPath)}. Same information, different format.*`;

/* -------------------------------------------------------------------------- */
/*  Sections                                                                  */
/* -------------------------------------------------------------------------- */

const experienceSection = () =>
  roles
    .map((role) =>
      join(
        `### ${role.company} — ${role.title}`,
        `*${role.period} · ${role.location}*`,
        role.lede,
        role.highlights.map((h) => `- **${h.heading}.** ${h.body}`).join("\n"),
        `**Technologies:** ${role.stack.join(", ")}`,
      ).trim(),
    )
    .join("\n\n");

const focusSection = () =>
  focusAreas
    .map((area) =>
      join(
        `### ${area.title}`,
        `*${area.statement}*`,
        area.body,
        `**Technologies:** ${area.tools.join(", ")}`,
        `**Evidence:** ${area.evidence}${
          area.evidenceLinks.length
            ? ` — ${area.evidenceLinks.map((l) => `[${l.label}](${abs(l.href)})`).join(", ")}`
            : ""
        }`,
      ).trim(),
    )
    .join("\n\n");

const stackSection = () =>
  stackGroups.map((g) => `- **${g.label}:** ${g.items.join(", ")}`).join("\n");

const projectBrief = (p: Project) =>
  join(
    `### ${p.name}`,
    `*${p.kicker} · ${p.year} · ${p.status}*`,
    p.whatItIs,
    `**Technologies:** ${p.stack.flatMap((s) => s.items).join(", ")}`,
    `**Case study:** ${abs(`/work/${p.slug}/`)}`,
    p.links.length
      ? `**Links:** ${p.links.map((l) => `[${l.label}](${l.href})`).join(" · ")}`
      : "**Repository:** private, no public link",
  ).trim();

/* -------------------------------------------------------------------------- */
/*  Page representations                                                      */
/* -------------------------------------------------------------------------- */

export const renderIndexMd = () =>
  join(
    `# ${site.name}`,
    `> ${site.role} in ${site.location}. ${headline.plain}`,
    identity(),
    `## Summary`,
    professionalSummary,
    `## What I work on`,
    heroLede,
    `## Selected work (2026)`,
    projects.map(projectBrief).join("\n\n"),
    `## Experience`,
    experienceSection(),
    `## Engineering focus`,
    focusSection(),
    `## Technologies`,
    stackSection(),
    `## Education`,
    `${education.degree} — ${education.school}`,
    `## Contact`,
    bullets([
      `Email: ${site.email}`,
      `GitHub: ${site.github}`,
      `LinkedIn: ${site.linkedin}`,
      `Résumé: ${abs("/resume/")}`,
    ]),
    sourceNote("/"),
  );

export const renderAboutMd = () =>
  join(
    `# About ${site.name}`,
    `> ${site.role} in ${site.location}. ${yearsOfExperience} years across event-driven backends, cloud platforms and agentic systems.`,
    identity(),
    `## Summary`,
    professionalSummary,
    `## In his own words`,
    aboutParagraphs.join("\n\n"),
    `## Quick facts`,
    quickFacts.map(([k, v]) => `- **${k}:** ${v}`).join("\n"),
    `## Currently exploring`,
    bullets([...exploring]),
    `## Related`,
    bullets([
      `[Experience](${abs("/experience.md")})`,
      `[Engineering focus](${abs("/engineering.md")})`,
      `[Selected work](${abs("/index.md")})`,
    ]),
    sourceNote("/#about"),
  );

export const renderExperienceMd = () =>
  join(
    `# Professional experience — ${site.name}`,
    `> ${yearsOfExperience} years of professional software engineering across insurance technology and payments.`,
    identity(),
    `## Roles`,
    experienceSection(),
    `## Education`,
    `${education.degree} — ${education.school}`,
    `## Technologies`,
    stackSection(),
    sourceNote("/#experience"),
  );

export const renderEngineeringMd = () =>
  join(
    `# Engineering focus — ${site.name}`,
    `> The kinds of systems ${site.name} builds, and the work that demonstrates each one.`,
    identity(),
    `## Focus areas`,
    focusSection(),
    `## Technologies`,
    stackSection(),
    `## Projects demonstrating this work`,
    projects.map((p) => `- **${p.name}** — ${p.summary} ${abs(`/work/${p.slug}/`)}`).join("\n"),
    sourceNote("/#focus"),
  );

export const renderContactMd = () =>
  join(
    `# Contact — ${site.name}`,
    `> ${contactLede}`,
    identity(),
    `## Channels`,
    bullets([
      `**Email:** ${site.email}`,
      `**GitHub:** ${site.github}`,
      `**LinkedIn:** ${site.linkedin}`,
      `**Résumé:** ${abs("/resume/")} (also available as Markdown at ${abs("/resume.md")})`,
    ]),
    `## Currently`,
    `${site.role} at Arch Capital Group, working remotely from ${site.location}.`,
    sourceNote("/#contact"),
  );

export const renderResumeMd = () =>
  join(
    `# ${site.name} — Résumé`,
    `> ${site.role} · ${site.location} · ${site.availability}`,
    identity(),
    `## Summary`,
    professionalSummary,
    `## Experience`,
    experienceSection(),
    `## Selected projects (2026)`,
    projects.map(projectBrief).join("\n\n"),
    `## Technologies`,
    stackSection(),
    `## Education`,
    `${education.degree} — ${education.school}`,
    sourceNote("/resume/"),
  );

export const renderProjectMd = (slug: string) => {
  const p = getProject(slug);
  if (!p) return null;

  return join(
    `# ${p.name}`,
    `> ${p.summary}`,
    [
      `**Built by:** ${site.name} (${site.role}) — ${site.url}`,
      `**Role:** ${p.role}`,
      `**Year:** ${p.year}`,
      `**Status:** ${p.status}`,
      `**Repository:** ${
        p.links.find((l) => l.kind === "repo")?.href ?? "private, no public link"
      }`,
    ].join("  \n"),
    `## Overview`,
    p.whatItIs,
    `## Problem`,
    p.problem,
    `## Solution`,
    p.approach,
    `## Architecture`,
    p.architecture,
    `### Request path`,
    p.trace.map((s, i) => `${i + 1}. **${s.label}** (${s.meta}) — ${s.detail}`).join("\n"),
    `## Technologies`,
    p.stack.map((g) => `- **${g.group}:** ${g.items.join(", ")}`).join("\n"),
    `## Engineering challenges`,
    p.challenges.map((c) => `### ${c.title}\n\n${c.body}`).join("\n\n"),
    `## Key decisions`,
    p.decisions.map((d) => `### ${d.title}\n\n${d.body}`).join("\n\n"),
    `## Current status`,
    `${p.status}. ${p.stats.map((s) => `${s.label}: ${s.value}`).join(" · ")}. ${
      p.sourceNote ?? "Figures verified against the repository on 19 August 2026."
    }`,
    `## Links`,
    bullets([
      `[Case study](${abs(`/work/${p.slug}/`)})`,
      ...p.links.map((l) => `[${l.label}](${l.href})`),
      `[${site.name} — portfolio](${site.url})`,
    ]),
    sourceNote(`/work/${p.slug}/`),
  );
};

/* -------------------------------------------------------------------------- */
/*  llms.txt — a curated map, not a URL dump                                  */
/* -------------------------------------------------------------------------- */

export const renderLlmsTxt = () =>
  join(
    `# ${site.name}`,
    `> ${site.role} in ${site.location}, ${yearsOfExperience} years' experience. Builds event-driven Java and Spring Boot services, Python agent orchestration with LangGraph and PydanticAI, and full-stack TypeScript products with React and Angular. Currently at Arch Capital Group.`,
    `Every page below is also available as Markdown. Figures cited on this site are taken from the repositories they describe; nothing is estimated.`,
    `## Profile`,
    bullets([
      `[About](${abs("/about.md")}): Professional background, engineering philosophy, and what he is currently exploring.`,
      `[Experience](${abs("/experience.md")}): Roles at Arch Capital Group and FastSpring, with technical ownership and technologies for each.`,
      `[Résumé](${abs("/resume.md")}): Full professional history in one document.`,
    ]),
    `## Selected projects (2026)`,
    bullets(
      projects.map(
        (p) => `[${p.name}](${abs(`/work/${p.slug}/index.md`)}): ${p.whatItIs}`,
      ),
    ),
    `## Technical expertise`,
    bullets([
      `[Engineering focus](${abs("/engineering.md")}): Event-driven backends, agentic systems with guardrails, platform and delivery, and product engineering — each with the work that demonstrates it.`,
    ]),
    `## Profiles`,
    bullets([
      `[GitHub](${site.github}): Public repositories, including Wander.`,
      `[LinkedIn](${site.linkedin}): Professional profile.`,
    ]),
    `## Contact`,
    bullets([`[Contact](${abs("/contact.md")}): Email and professional profiles.`]),
    `## Optional`,
    bullets([
      `[Full site as Markdown](${abs("/llms-full.txt")}): Every section of this site consolidated into one document.`,
      `[Currently building](${abs("/index.md")}): Repository activity as of August 2026.`,
    ]),
  );

export const renderLlmsFullTxt = () =>
  join(
    `# ${site.name} — ${site.role}`,
    `> Consolidated Markdown representation of ${site.url}. ${headline.plain}`,
    identity(),
    `## Professional summary`,
    professionalSummary,
    `## About`,
    aboutParagraphs.join("\n\n"),
    `## Experience`,
    experienceSection(),
    `### Education`,
    `${education.degree} — ${education.school}`,
    `## Engineering focus`,
    focusSection(),
    `## Technologies`,
    stackSection(),
    `## Selected projects (2026)`,
    projects
      .map((p) =>
        join(
          `### ${p.name}`,
          `*${p.kicker} · ${p.year} · ${p.status} · ${p.role}*`,
          p.whatItIs,
          `**Problem.** ${p.problem}`,
          `**Solution.** ${p.approach}`,
          `**Architecture.** ${p.architecture}`,
          `**Engineering challenges.** ${p.challenges.map((c) => `${c.title}: ${c.body}`).join(" ")}`,
          `**Technologies:** ${p.stack.flatMap((s) => s.items).join(", ")}`,
          `**Status:** ${p.stats.map((s) => `${s.label} ${s.value}`).join(" · ")}`,
          `**Full case study:** ${abs(`/work/${p.slug}/index.md`)}`,
          p.links.length
            ? `**Links:** ${p.links.map((l) => `${l.label} — ${l.href}`).join(" · ")}`
            : `**Repository:** private, no public link`,
        ).trim(),
      )
      .join("\n\n"),
    `## Currently building`,
    repos
      .map(
        (r) =>
          `- **${r.name}** (${r.visibility}, ${r.language}, updated ${r.updated}) — ${r.description} ${r.note}${r.href ? ` ${r.href}` : ""}`,
      )
      .join("\n"),
    `### Currently exploring`,
    bullets([...exploring]),
    `## Contact`,
    contactLede,
    bullets([
      `Email: ${site.email}`,
      `GitHub: ${site.github}`,
      `LinkedIn: ${site.linkedin}`,
      `Résumé: ${abs("/resume/")}`,
    ]),
  );
