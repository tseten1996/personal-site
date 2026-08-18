import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { renderProjectMd } from "@/content/render/markdown";
import { markdown } from "@/lib/markdownResponse";

export const dynamic = "force-static";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = renderProjectMd(slug);
  if (!body) notFound();
  return markdown(body);
}
