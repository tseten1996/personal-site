import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject } from "@/content/projects";
import { site } from "@/content/site";
import { withBase } from "@/lib/paths";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal } from "@/components/ui/MaskReveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SystemTrace } from "@/components/work/SystemTrace";
import { Field, StackList, StatRow } from "@/components/work/ProjectParts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} — case study`;
  const url = `${site.url}/work/${project.slug}/`;

  return {
    title,
    description: project.summary,
    keywords: project.seoKeywords,
    alternates: {
      canonical: `/work/${project.slug}/`,
      types: { "text/markdown": `${site.url}/work/${project.slug}/index.md` },
    },
    openGraph: {
      type: "article",
      title: `${project.name} — ${site.name}`,
      description: project.summary,
      url,
      siteName: site.name,
      images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${project.name} — ${site.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${site.name}`,
      description: project.summary,
      images: [`${site.url}/og.png`],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const live = project.links.find((l) => l.kind === "live");
  const repo = project.links.find((l) => l.kind === "repo");

  const schema = {
    "@context": "https://schema.org",
    "@type": project.schemaType,
    name: project.name,
    headline: project.name,
    description: project.summary,
    abstract: project.problem,
    url: `${site.url}/work/${project.slug}/`,
    dateCreated: project.year,
    inLanguage: "en-US",
    keywords: project.seoKeywords.join(", "),
    author: { "@type": "Person", name: site.name, url: site.url },
    creator: { "@type": "Person", name: site.name, url: site.url },
    ...(project.schemaType === "SoftwareSourceCode"
      ? { programmingLanguage: project.stack.flatMap((s) => s.items) }
      : {}),
    ...(project.schemaType === "WebApplication"
      ? { applicationCategory: "TravelApplication", operatingSystem: "Web browser" }
      : {}),
    ...(live ? { url: live.href } : {}),
    ...(repo ? { codeRepository: repo.href } : {}),
    isPartOf: { "@type": "WebSite", url: site.url, name: site.name },
  };

  return (
    <div id="top" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteHeader />

      <main className="relative z-[2]">
        {/* --------------------------------------------------------- head */}
        <header className="shell pt-32 sm:pt-40">
          <Reveal>
            <nav aria-label="Breadcrumb" className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
              <Link href="/" className="link-underline transition-colors hover:text-ink">
                {site.name}
              </Link>
              <span aria-hidden="true" className="mx-2.5 text-line-strong">
                /
              </span>
              <Link href="/#work" className="link-underline transition-colors hover:text-ink">
                Work
              </Link>
              <span aria-hidden="true" className="mx-2.5 text-line-strong">
                /
              </span>
              <span className="text-ink">{project.name}</span>
            </nav>
          </Reveal>

          <h1 className="display mt-10 text-[clamp(2.75rem,1.2rem+6.5vw,5.5rem)]">
            <MaskReveal immediate delay={0.1}>
              {project.name}
            </MaskReveal>
          </h1>

          <Reveal delay={0.3} className="mt-8 max-w-3xl">
            <p className="prose-lede">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.38} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {project.links.map((l) => (
              <ArrowLink key={l.href} href={l.href} external>
                {l.label}
              </ArrowLink>
            ))}
            {project.visibility === "private" ? (
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                Private repository — no public link
              </span>
            ) : null}
            <a
              href={withBase(`/work/${project.slug}/index.md`)}
              className="link-underline font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
            >
              Markdown version
            </a>
          </Reveal>

          <Reveal delay={0.44} className="mt-12">
            <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {[
                ["Year", project.year],
                ["Status", project.status],
                ["Role", project.role],
                ["Type", project.kicker.split(" · ")[0]],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper p-5">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">{k}</dt>
                  <dd className="mt-2 text-[0.875rem] tracking-[-0.01em] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </header>

        {/* --------------------------------------------------------- body */}
        <div className="shell mt-24 sm:mt-32">
          <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-7">
              <Reveal>
                <Field label="Overview" headingLevel={2}>
                  {project.whatItIs}
                </Field>
              </Reveal>
              <Reveal>
                <Field label="Problem" headingLevel={2}>
                  {project.problem}
                </Field>
              </Reveal>
              <Reveal>
                <Field label="Approach" headingLevel={2}>
                  {project.approach}
                </Field>
              </Reveal>
              <Reveal>
                <Field label="Architecture" headingLevel={2}>
                  {project.architecture}
                </Field>
              </Reveal>
            </div>

            <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <StatRow stats={project.stats} />
                <div className="mt-10">
                  <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    Stack
                  </h2>
                  <div className="mt-4">
                    <StackList stack={project.stack} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ------------------------------------------------ architecture */}
        <section className="mt-28 border-y border-line bg-paper-sunk py-20 sm:mt-36 sm:py-28">
          <div className="shell">
            <Reveal>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                How a request moves through it
              </h2>
            </Reveal>
            <div className="mt-14">
              <SystemTrace trace={project.trace} title={project.name} headingLevel={3} />
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- challenges */}
        <section className="shell py-20 sm:py-28">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,1.2rem+2.6vw,3rem)]">
              What was actually <span className="display-serif">hard.</span>
            </h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            {project.challenges.map((c, i) => (
              <Reveal as="li" key={c.title} delay={0.04 * i} className="bg-paper p-7 sm:p-8">
                <span className="font-mono text-[0.6875rem] text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.0625rem] tracking-[-0.014em] text-ink">{c.title}</h3>
                <p className="prose-body mt-3 text-[0.9375rem]">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* ---------------------------------------------------- decisions */}
        <section className="shell py-20 sm:py-28">
          <Reveal>
            <h2 className="display text-[clamp(1.9rem,1.2rem+2.6vw,3rem)]">
              Decisions worth <span className="display-serif">defending.</span>
            </h2>
          </Reveal>
          <ul className="mt-12 border-t border-line">
            {project.decisions.map((d, i) => (
              <Reveal as="li" key={d.title} delay={0.04 * i} className="border-b border-line py-7">
                <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-12">
                  <span className="font-mono text-[0.6875rem] text-ember sm:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.0625rem] tracking-[-0.014em] text-ink sm:col-span-4">
                    {d.title}
                  </h3>
                  <p className="prose-body sm:col-span-7">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* --------------------------------------------------------- next */}
        <section data-tone="inv" className="border-t border-line bg-inv-bg py-16 text-inv-fg">
          <div className="shell">
            <Link href={`/work/${next.slug}/`} className="group block">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-inv-muted">
                Next project — {next.index}
              </p>
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
                <h2 className="display text-[clamp(2rem,1.2rem+3vw,3.5rem)] text-inv-fg">
                  <span className="link-underline">{next.name}</span>
                </h2>
                <span className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-inv-muted">
                  {next.kicker}
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className="arrow size-3.5 text-inv-ember"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M1.5 6h9" strokeLinecap="square" />
                    <path d="M6.8 2.2 10.6 6l-3.8 3.8" strokeLinecap="square" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
