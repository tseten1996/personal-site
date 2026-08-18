import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

/** Typographic card, generated at build time. No photography, no gradients. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f3ee",
          padding: "72px 80px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 40, height: 2, background: "#b8431f" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#605d50",
            }}
          >
            {`${site.role} · ${site.location}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 104,
              letterSpacing: -4,
              lineHeight: 1,
              color: "#14130f",
              fontWeight: 600,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.32,
              letterSpacing: -1,
              color: "#38362d",
              maxWidth: 900,
            }}
          >
            Backend systems, developer tools, and agents that know what they can prove.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #dedacf",
            paddingTop: 26,
            fontSize: 22,
            color: "#605d50",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            {projects.map((p) => (
              <div key={p.slug} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#b8431f" }}>{p.index}</span>
                <span style={{ color: "#14130f" }}>{p.name}</span>
              </div>
            ))}
          </div>
          <div>{site.githubHandle}</div>
        </div>
      </div>
    ),
    size,
  );
}
