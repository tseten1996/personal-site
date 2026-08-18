import Link from "next/link";
import { site } from "@/content/site";
import { contactLede } from "@/content/about";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { Magnetic } from "@/components/ui/Magnetic";

const channels = [
  { label: "GitHub", value: "github.com/tseten1996", href: site.github, external: true },
  { label: "LinkedIn", value: "in/tenzing-t-sherpa", href: site.linkedin, external: true },
  { label: "Résumé", value: "Full history", href: "/resume/", external: false },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      data-tone="inv"
      className="scroll-mt-20 bg-inv-bg pt-24 text-inv-fg sm:pt-32"
    >
      <div className="shell">
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-inv-muted">06</span>
          <span aria-hidden="true" className="h-px w-8 bg-inv-line-strong" />
          <h2 id="contact-heading" className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-inv-muted">
            Contact
          </h2>
        </Reveal>

        <p className="display mt-10 text-[clamp(2.5rem,1.1rem+6vw,5.25rem)] text-inv-fg">
          <MaskReveal>Let&rsquo;s build something</MaskReveal>
          <MaskReveal delay={0.08}>
            <span className="display-serif text-inv-ember">worth shipping.</span>
          </MaskReveal>
        </p>

        <Reveal delay={0.1} className="mt-10 max-w-xl">
          <p className="prose-lede text-inv-muted">{contactLede}</p>
        </Reveal>

        <Reveal delay={0.16} className="mt-14">
          <Magnetic strength={8}>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex flex-wrap items-baseline gap-x-5 gap-y-2"
            >
              <span className="display link-underline text-[clamp(1.5rem,0.9rem+2.4vw,2.75rem)] text-inv-fg">
                {site.email}
              </span>
              <svg
                viewBox="0 0 12 12"
                aria-hidden="true"
                className="size-4 shrink-0 self-center text-inv-ember transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              >
                <path d="M2.5 9.5 9.5 2.5" strokeLinecap="square" />
                <path d="M4.2 2.5H9.5V7.8" strokeLinecap="square" />
              </svg>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.2} className="mt-16">
          <ul className="grid grid-cols-1 border-t border-inv-line sm:grid-cols-3 sm:border-t-0">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-inv-muted">
                    {c.label}
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-[0.9375rem] tracking-[-0.012em] text-inv-fg">
                    <span className="link-underline">{c.value}</span>
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className="arrow arrow-ne size-3 text-inv-muted"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <path d="M2.5 9.5 9.5 2.5" strokeLinecap="square" />
                      <path d="M4.2 2.5H9.5V7.8" strokeLinecap="square" />
                    </svg>
                  </span>
                </>
              );

              return (
                <li key={c.label} className="group border-b border-inv-line sm:border-t">
                  {c.external ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex flex-col py-6 sm:pr-8"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={c.href} className="flex flex-col py-6 sm:pr-8">
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
