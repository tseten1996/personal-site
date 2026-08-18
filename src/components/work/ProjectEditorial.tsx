import type { Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { Field, ProjectLinks, ProjectMasthead, StackList, StatRow } from "./ProjectParts";

/**
 * Presentation 01 — the long editorial case study. Wide masthead, an asymmetric
 * prose column, and the technical detail set to one side.
 */
export function ProjectEditorial({ project }: { project: Project }) {
  return (
    <article className="shell scroll-mt-24 py-20 sm:py-28" id={project.slug}>
      <Reveal>
        <ProjectMasthead project={project} />
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:pr-8">
          <Reveal className="space-y-9">
            <Field label="Overview">{project.whatItIs}</Field>
            <Field label="Problem">{project.problem}</Field>
            <Field label="Approach">{project.approach}</Field>
            <Field label="Architecture">{project.architecture}</Field>
          </Reveal>

          <Reveal delay={0.05} className="mt-12">
            <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
              Decisions
            </h4>
            <ul className="mt-5 border-t border-line">
              {project.decisions.map((d) => (
                <li key={d.title} className="group border-b border-line py-5">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-12">
                    <h5 className="text-[0.9375rem] tracking-[-0.012em] text-ink sm:col-span-4">
                      {d.title}
                    </h5>
                    <p className="prose-body text-[0.9375rem] sm:col-span-8">{d.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="lg:col-span-5">
          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <StatRow stats={project.stats} />
            <div className="mt-10">
              <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                Stack
              </h4>
              <div className="mt-4">
                <StackList stack={project.stack} />
              </div>
            </div>
            <div className="mt-8">
              <ProjectLinks project={project} />
            </div>
          </Reveal>
        </aside>
      </div>
    </article>
  );
}
