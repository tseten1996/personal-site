import { site } from "@/content/site";
import { withBase } from "@/lib/paths";

export function Footer() {
  const year = 2026;

  return (
    <footer data-tone="inv" className="bg-inv-bg pb-10 pt-24 text-inv-fg">
      <div className="shell">
        <div className="flex flex-col gap-6 border-t border-inv-line pt-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-inv-muted">
            © {year} {site.name} — {site.location}
          </p>

          <p className="max-w-md font-mono text-[0.6875rem] leading-relaxed text-inv-muted">
            Next.js, TypeScript and Tailwind, exported as static files. Set in Geist and
            Instrument Serif. No trackers, no cookies, no analytics.
          </p>

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
            <a href={withBase("/llms.txt")} className="link-underline text-inv-muted transition-colors hover:text-inv-fg">
              llms.txt
            </a>
            <a href={withBase("/index.md")} className="link-underline text-inv-muted transition-colors hover:text-inv-fg">
              Markdown
            </a>
            <a href="#top" className="link-underline text-inv-fg">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
