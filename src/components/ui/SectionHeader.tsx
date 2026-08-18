import { Reveal } from "./Reveal";

type Props = {
  /** Two-digit editorial index, e.g. "02". */
  index: string;
  /** id for the <h2>, so the section can reference it via aria-labelledby. */
  headingId?: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "ink" | "inv";
  className?: string;
};

/**
 * Shared section masthead: a numbered rule, a label, a display heading and an
 * optional lede. Repeating this exactly is what makes the page feel designed.
 */
export function SectionHeader({ index, headingId, label, title, intro, tone = "ink", className }: Props) {
  const muted = tone === "inv" ? "text-inv-muted" : "text-muted";
  const line = tone === "inv" ? "bg-inv-line-strong" : "bg-line-strong";

  return (
    <header className={className}>
      <Reveal className="flex items-center gap-4">
        <span className={`font-mono text-[0.6875rem] tracking-[0.16em] ${muted}`}>{index}</span>
        <span aria-hidden="true" className={`h-px w-8 ${line}`} />
        <h2 id={headingId} className={`font-mono text-[0.6875rem] uppercase tracking-[0.16em] ${muted}`}>{label}</h2>
      </Reveal>

      <Reveal delay={0.06} className="mt-7 max-w-4xl">
        <p className="display text-[clamp(2.15rem,1.3rem+3.6vw,4rem)]">{title}</p>
      </Reveal>

      {intro ? (
        <Reveal delay={0.12} className="mt-6 max-w-2xl">
          <p className={`prose-lede ${tone === "inv" ? "text-inv-muted" : ""}`}>{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
