import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { aboutParagraphs, quickFacts } from "@/content/about";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-24 sm:py-32">
      <div className="shell">
        <SectionHeader index="05" headingId="about-heading" label="About" title="Where the boundaries go." />

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="space-y-6 text-[clamp(1rem,0.94rem+0.3vw,1.125rem)] leading-[1.72] tracking-[-0.008em] text-ink-soft">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-line border-y border-line">
              {quickFacts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 py-3.5">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{k}</dt>
                  <dd className="col-span-2 text-[0.8125rem] tracking-[-0.008em] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
