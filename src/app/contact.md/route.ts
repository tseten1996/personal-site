import { renderContactMd } from "@/content/render/markdown";
import { markdown } from "@/lib/markdownResponse";

export const dynamic = "force-static";

export function GET() {
  return markdown(renderContactMd());
}
