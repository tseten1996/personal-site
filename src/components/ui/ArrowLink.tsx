import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  tone?: "ink" | "inv";
};

function Glyph({ external }: { external?: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className="arrow size-3 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      {external ? (
        <>
          <path d="M2.5 9.5 9.5 2.5" strokeLinecap="square" />
          <path d="M4.2 2.5H9.5V7.8" strokeLinecap="square" />
        </>
      ) : (
        <>
          <path d="M1.5 6h9" strokeLinecap="square" />
          <path d="M6.8 2.2 10.6 6l-3.8 3.8" strokeLinecap="square" />
        </>
      )}
    </svg>
  );
}

/**
 * The site's standard action link: label, animated underline, stepping arrow.
 * External links get a diagonal glyph and the usual rel hardening.
 */
export function ArrowLink({ href, children, external, className, tone = "ink" }: Props) {
  const classes = `group/link inline-flex items-center gap-2 text-sm tracking-[-0.01em] ${
    tone === "inv" ? "text-inv-fg" : "text-ink"
  } ${className ?? ""}`;

  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <span
        className={`transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1 ${
          external ? "group-hover/link:-translate-y-[3px] group-focus-visible/link:-translate-y-[3px]" : ""
        }`}
      >
        <Glyph external={external} />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
