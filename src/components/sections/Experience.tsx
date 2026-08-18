import { roles, education } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Editorial timeline. The company sticks to the top of the viewport while its
 * highlights scroll past, so the reader always knows whose work they are in.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="02"
          headingId="experience-heading"
          label="Experience"
          title={
            <>
              Seven years of shipping into systems that{" "}
              <span className="display-serif">people depend on.</span>
            </>
          }
        />

        <ol className="mt-20">
          {roles.map((role, i) => (
            <li key={role.company} className="border-t border-line pt-10 first:border-t-0 first:pt-0 sm:pt-14">
              <div className="grid grid-cols-1 gap-x-12 gap-y-8 pb-14 lg:grid-cols-12 sm:pb-20">
                {/* ------------------------------------------------ marker */}
                <Reveal className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <p className="flex items-center gap-3">
                      <span className="font-mono text-[0.6875rem] text-ember">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                      <time className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                        {role.period}
                      </time>
                    </p>

                    <h3 className="display mt-5 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)]">
                      {role.company}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] tracking-[-0.012em] text-ink-soft">
                      {role.title}
                    </p>
                    <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                      {role.location}
                    </p>

                    <p className="prose-body mt-6 max-w-sm text-[0.9375rem]">{role.lede}</p>

                    <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2">
                      {role.stack.map((t) => (
                        <li
                          key={t}
                          className="font-mono text-[0.6875rem] text-muted after:ml-3 after:text-line-strong after:content-['/'] last:after:content-['']"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {/* -------------------------------------------- highlights */}
                <div className="lg:col-span-8">
                  <ul>
                    {role.highlights.map((h, j) => (
                      <Reveal as="li" key={h.heading} delay={0.04 * j} className="border-b border-line py-6 first:pt-0">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-12">
                          <h4 className="text-[0.9375rem] tracking-[-0.012em] text-ink sm:col-span-4">
                            {h.heading}
                          </h4>
                          <p className="prose-body text-[0.9375rem] sm:col-span-8">{h.body}</p>
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Reveal className="border-t border-line pt-10">
          <div className="grid grid-cols-1 gap-x-12 gap-y-3 lg:grid-cols-12">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted lg:col-span-4">
              Education
            </p>
            <p className="text-[0.9375rem] tracking-[-0.012em] text-ink lg:col-span-8">
              {education.degree}
              <span className="text-muted"> — {education.school}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
