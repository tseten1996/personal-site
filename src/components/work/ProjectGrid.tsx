import type { Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { Field, ProjectLinks, ProjectMasthead, StackList, StatRow } from "./ProjectParts";

/**
 * Presentation 03 — one bordered plate divided by hairlines. The run loop is
 * drawn inline, because the loop is the whole point of the project.
 */
export function ProjectGrid({ project }: { project: Project }) {
  return (
    <article className="shell scroll-mt-24 py-20 sm:py-28" id={project.slug}>
      <Reveal>
        <ProjectMasthead project={project} />
      </Reveal>

      <Reveal delay={0.06} className="mt-14">
        <div className="border border-line">
          <div className="grid grid-cols-1 divide-y divide-line lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            <div className="space-y-8 p-6 sm:p-9 lg:col-span-7">
              <Field label="Overview">{project.whatItIs}</Field>
              <Field label="Problem">{project.problem}</Field>
              <Field label="Approach">{project.approach}</Field>
            </div>

            {/* The scheduled run, drawn. */}
            <div className="bg-paper-sunk p-6 sm:p-9 lg:col-span-5">
              <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                One run
              </h4>
              <ol className="mt-6 space-y-0">
                {project.trace.map((step, i) => (
                  <li key={step.id} className="relative pb-7 pl-8 last:pb-0">
                    {i < project.trace.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1 left-[6px] top-5 w-px bg-line-strong"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[5px] size-[13px] rounded-full border border-ember bg-paper-sunk"
                    >
                      <span className="absolute inset-[3px] rounded-full bg-ember" />
                    </span>
                    <p className="text-[0.9375rem] tracking-[-0.012em] text-ink">{step.label}</p>
                    <p className="prose-body mt-1.5 text-[0.8125rem] leading-relaxed">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {project.decisions.map((d) => (
              <div key={d.title} className="p-6 sm:p-7">
                <h5 className="text-[0.9375rem] tracking-[-0.012em] text-ink">{d.title}</h5>
                <p className="prose-body mt-2.5 text-[0.875rem]">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <StatRow stats={project.stats} />
        </Reveal>
        <Reveal delay={0.06} className="lg:col-span-7">
          <StackList stack={project.stack} />
          <div className="mt-8">
            <ProjectLinks project={project} />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
