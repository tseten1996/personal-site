import type { Project } from "@/content/projects";
import { ArrowLink } from "@/components/ui/ArrowLink";

type Tone = "ink" | "inv";

const tones = (tone: Tone) => ({
  fg: tone === "inv" ? "text-inv-fg" : "text-ink",
  muted: tone === "inv" ? "text-inv-muted" : "text-muted",
  body: tone === "inv" ? "text-inv-muted" : "text-muted",
  border: tone === "inv" ? "border-inv-line" : "border-line",
  divide: tone === "inv" ? "divide-inv-line" : "divide-line",
});

/**
 * Labelled prose block — "Problem", "Approach", "Architecture".
 *
 * The heading level is a prop because the same block sits at two different
 * depths: under an <h3> project name on the homepage, and directly under the
 * <h1> on a case-study page. Hard-coding it would skip a level on one of them.
 */
export function Field({
  label,
  children,
  tone = "ink",
  className,
  headingLevel = 4,
}: {
  label: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  headingLevel?: 2 | 3 | 4;
}) {
  const c = tones(tone);
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <div className={className}>
      <H className={`font-mono text-[0.6875rem] uppercase tracking-[0.16em] ${c.muted}`}>{label}</H>
      <p className={`prose-body mt-3 ${c.body}`}>{children}</p>
    </div>
  );
}

/** Technology, grouped. A list, not a logo wall. */
export function StackList({ stack, tone = "ink" }: { stack: Project["stack"]; tone?: Tone }) {
  const c = tones(tone);
  return (
    <dl className={`divide-y ${c.divide} border-y ${c.border}`}>
      {stack.map((group) => (
        <div key={group.group} className="grid grid-cols-3 gap-4 py-3.5">
          <dt className={`font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${c.muted}`}>
            {group.group}
          </dt>
          <dd className={`col-span-2 text-[0.8125rem] leading-relaxed tracking-[-0.008em] ${c.fg}`}>
            {group.items.join(", ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Verified repository facts only — commits, migrations, packages, tests. */
export function StatRow({ stats, tone = "ink" }: { stats: Project["stats"]; tone?: Tone }) {
  const c = tones(tone);
  return (
    <dl className={`flex flex-wrap gap-x-10 gap-y-4 border-t ${c.border} pt-5`}>
      {stats.map((s) => (
        <div key={s.label}>
          <dt className={`font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${c.muted}`}>
            {s.label}
          </dt>
          <dd className={`mt-1.5 font-mono text-[1.375rem] tracking-[-0.02em] ${c.fg}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectLinks({ project, tone = "ink" }: { project: Project; tone?: Tone }) {
  const c = tones(tone);
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      <ArrowLink href={`/work/${project.slug}/`} tone={tone}>
        Read the case study
      </ArrowLink>
      {project.links.map((l) => (
        <ArrowLink key={l.href} href={l.href} external tone={tone}>
          {l.label}
        </ArrowLink>
      ))}
      {project.visibility === "private" ? (
        <span className={`font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${c.muted}`}>
          Private repository
        </span>
      ) : null}
    </div>
  );
}

/** Project masthead — index, name, one-line outcome. */
export function ProjectMasthead({ project, tone = "ink" }: { project: Project; tone?: Tone }) {
  const c = tones(tone);
  return (
    <>
      <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className={`font-mono text-[0.6875rem] ${tone === "inv" ? "text-inv-ember" : "text-ember"}`}>
          {project.index}
        </span>
        <span aria-hidden="true" className={`h-px w-8 ${tone === "inv" ? "bg-inv-line-strong" : "bg-line-strong"}`} />
        <span className={`font-mono text-[0.6875rem] uppercase tracking-[0.16em] ${c.muted}`}>
          {project.kicker}
        </span>
      </p>
      <h3 className={`display mt-6 text-[clamp(2.4rem,1.2rem+4.6vw,4.5rem)] ${c.fg}`}>
        {project.name}
      </h3>
      <p className={`prose-lede mt-6 max-w-2xl ${tone === "inv" ? "text-inv-muted" : ""}`}>
        {project.summary}
      </p>
    </>
  );
}
