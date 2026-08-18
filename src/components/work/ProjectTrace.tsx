import type { Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SystemTrace } from "./SystemTrace";
import { Field, ProjectLinks, ProjectMasthead, StackList, StatRow } from "./ProjectParts";

/**
 * Presentation 02 — dark section, scroll-anchored architecture trace. Used for
 * the project whose story *is* its pipeline.
 */
export function ProjectTrace({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      data-tone="inv"
      className="scroll-mt-24 bg-inv-bg py-20 text-inv-fg sm:py-28"
    >
      <div className="shell">
        <Reveal>
          <ProjectMasthead project={project} tone="inv" />
        </Reveal>

        <Reveal className="mt-14 max-w-3xl">
          <Field label="Overview" tone="inv">
            {project.whatItIs}
          </Field>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-9 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Field label="Problem" tone="inv">
              {project.problem}
            </Field>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-6">
            <Field label="Approach" tone="inv">
              {project.approach}
            </Field>
          </Reveal>
        </div>
      </div>

      <div className="shell mt-20 sm:mt-24">
        <SystemTrace trace={project.trace} tone="inv" title={project.name} />
      </div>

      <div className="shell mt-20 sm:mt-24">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-inv-muted">
              Decisions
            </h4>
            <ul className="mt-5 border-t border-inv-line">
              {project.decisions.map((d) => (
                <li key={d.title} className="border-b border-inv-line py-5">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-12">
                    <h5 className="text-[0.9375rem] tracking-[-0.012em] text-inv-fg sm:col-span-4">
                      {d.title}
                    </h5>
                    <p className="prose-body text-[0.9375rem] text-inv-muted sm:col-span-8">
                      {d.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <StatRow stats={project.stats} tone="inv" />
            <div className="mt-10">
              <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-inv-muted">
                Stack
              </h4>
              <div className="mt-4">
                <StackList stack={project.stack} tone="inv" />
              </div>
            </div>
            <div className="mt-8">
              <ProjectLinks project={project} tone="inv" />
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
