import Link from "next/link";
import { focusAreas, stackGroups } from "@/content/focus";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/**
 * What kind of engineer this is. Four positions, each with the work that
 * earned it named underneath — not a skills matrix.
 */
export function Focus() {
  return (
    <section
      id="focus"
      aria-labelledby="focus-heading"
      data-tone="inv"
      className="scroll-mt-20 bg-inv-bg py-24 text-inv-fg sm:py-32"
    >
      <div className="shell">
        <SectionHeader
          index="03"
          headingId="focus-heading"
          label="Engineering focus"
          tone="inv"
          title={
            <>
              Four positions I keep{" "}
              <span className="display-serif text-inv-ember">arguing for</span> in code review.
            </>
          }
        />

        <ul className="mt-20 border-t border-inv-line">
          {focusAreas.map((area, i) => (
            <Reveal as="li" key={area.index} delay={0.04 * i} className="border-b border-inv-line">
              <div className="grid grid-cols-1 gap-x-12 gap-y-6 py-10 lg:grid-cols-12 sm:py-14">
                <div className="lg:col-span-4">
                  <p className="flex items-center gap-3">
                    <span className="font-mono text-[0.6875rem] text-inv-ember">{area.index}</span>
                    <span aria-hidden="true" className="h-px w-8 bg-inv-line-strong" />
                  </p>
                  <h3 className="display mt-5 text-[clamp(1.5rem,1.15rem+1.4vw,2.125rem)] text-inv-fg">
                    {area.title}
                  </h3>
                </div>

                <div className="lg:col-span-8">
                  <p className="display-serif text-[clamp(1.375rem,1.1rem+1.1vw,1.875rem)] leading-[1.25] text-inv-fg">
                    {area.statement}
                  </p>
                  <p className="prose-body mt-5 max-w-2xl text-inv-muted">{area.body}</p>

                  <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {area.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.6875rem] text-inv-muted after:ml-3 after:text-inv-line-strong after:content-['/'] last:after:content-['']"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-inv-muted">
                    <span className="text-inv-ember">Evidence —</span>
                    <span>{area.evidence}</span>
                    {area.evidenceLinks.map((l) =>
                      l.href.startsWith("http") ? (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link-underline text-inv-fg"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link key={l.href} href={l.href} className="link-underline text-inv-fg">
                          {l.label}
                        </Link>
                      ),
                    )}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* -------------------------------------------------------- stack */}
        <Reveal className="mt-20">
          <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-inv-muted">
            Working vocabulary
          </h3>
          <dl className="mt-6 grid grid-cols-1 gap-px border border-inv-line bg-inv-line sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.label} className="bg-inv-bg p-6">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-inv-ember">
                  {group.label}
                </dt>
                <dd className="mt-3 text-[0.875rem] leading-[1.9] tracking-[-0.008em] text-inv-fg">
                  {group.items.map((item) => (
                    <span key={item} className="block">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
