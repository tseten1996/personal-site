import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { roles, education, yearsOfExperience } from "@/content/experience";
import { stackGroups } from "@/content/focus";
import { projects } from "@/content/projects";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé for ${site.name}, ${site.role} in ${site.location}: ${yearsOfExperience} years across event-driven Java and Spring Boot services, Python and FastAPI, Kafka, React and Angular, AWS and CI/CD.`,
  alternates: {
    canonical: "/resume/",
    types: { "text/markdown": `${site.url}/resume.md` },
  },
  openGraph: {
    type: "profile",
    title: `Résumé — ${site.name}`,
    description: `${site.role} — backend, platform and AI systems engineering.`,
    url: `${site.url}/resume/`,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `Résumé — ${site.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Résumé — ${site.name}`,
    description: `${site.role} — backend, platform and AI systems engineering.`,
    images: [`${site.url}/og.png`],
  },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-2 border-b border-line py-6 sm:grid-cols-12">
      <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted sm:col-span-3">
        {label}
      </h3>
      <div className="sm:col-span-9">{children}</div>
    </div>
  );
}

/**
 * An HTML résumé rather than only a PDF: crawlable, linkable, printable, and
 * always in sync with the content that drives the rest of the site.
 */
export default function ResumePage() {
  return (
    <div id="top" className="relative">
      <div className="no-print">
        <SiteHeader />
      </div>

      <main className="relative z-[2] shell pb-24 pt-32 sm:pt-40">
        <header className="border-b border-line pb-10">
          <p className="eyebrow">Résumé</p>
          <h1 className="display mt-6 text-[clamp(2.5rem,1.3rem+4.6vw,4.25rem)]">{site.name}</h1>
          <p className="prose-lede mt-5 max-w-2xl">
            {site.role} — {yearsOfExperience} years across event-driven backends, cloud
            platforms and, more recently, agentic systems. {site.location} · {site.availability}.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <ArrowLink href={`mailto:${site.email}`}>{site.email}</ArrowLink>
            <ArrowLink href={site.github} external>
              GitHub
            </ArrowLink>
            <ArrowLink href={site.linkedin} external>
              LinkedIn
            </ArrowLink>
            {site.resumePdf ? (
              <ArrowLink href={site.resumePdf} external>
                Download PDF
              </ArrowLink>
            ) : null}
          </div>
        </header>

        <section aria-labelledby="r-experience" className="mt-12">
          <h2 id="r-experience" className="display text-[1.75rem]">
            Experience
          </h2>
          <div className="mt-6">
            {roles.map((role) => (
              <article key={role.company} className="border-t border-line py-8 first:border-t-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[1.25rem] tracking-[-0.02em] text-ink">
                    {role.company}
                    <span className="text-muted"> — {role.title}</span>
                  </h3>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                    {role.period} · {role.location}
                  </p>
                </div>

                <ul className="mt-5 space-y-3">
                  {role.highlights.map((h) => (
                    <li key={h.heading} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-ember" />
                      <p className="prose-body text-[0.9375rem]">
                        <strong className="font-medium text-ink">{h.heading}.</strong> {h.body}
                      </p>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-mono text-[0.6875rem] leading-relaxed text-muted">
                  {role.stack.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="r-projects" className="mt-14">
          <h2 id="r-projects" className="display text-[1.75rem]">
            Selected projects (2026)
          </h2>
          <div className="mt-6 border-t border-line">
            {projects.map((p) => (
              <Row key={p.slug} label={p.name}>
                <p className="prose-body text-[0.9375rem]">{p.summary}</p>
                <p className="mt-3 font-mono text-[0.6875rem] text-muted">
                  {p.stack.flatMap((s) => s.items).join(" · ")}
                </p>
                <p className="mt-3 no-print">
                  <Link
                    href={`/work/${p.slug}/`}
                    className="link-underline text-[0.8125rem] text-ink"
                  >
                    Case study
                  </Link>
                </p>
              </Row>
            ))}
          </div>
        </section>

        <section aria-labelledby="r-skills" className="mt-14">
          <h2 id="r-skills" className="display text-[1.75rem]">
            Technologies
          </h2>
          <div className="mt-6 border-t border-line">
            {stackGroups.map((g) => (
              <Row key={g.label} label={g.label}>
                <p className="text-[0.9375rem] leading-relaxed tracking-[-0.008em] text-ink">
                  {g.items.join(", ")}
                </p>
              </Row>
            ))}
          </div>
        </section>

        <section aria-labelledby="r-education" className="mt-14">
          <h2 id="r-education" className="display text-[1.75rem]">
            Education
          </h2>
          <div className="mt-6 border-t border-line">
            <Row label="UCSB">
              <p className="text-[0.9375rem] text-ink">{education.degree}</p>
              <p className="prose-body mt-1 text-[0.875rem]">{education.school}</p>
            </Row>
          </div>
        </section>

        <p className="no-print mt-14 font-mono text-[0.6875rem] leading-relaxed text-muted">
          Printable — use your browser&rsquo;s print dialog for a clean copy.
          {site.resumePdf ? null : " A downloadable PDF can be dropped in at public/resume.pdf."}
        </p>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
