import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-17");

  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/resume/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
