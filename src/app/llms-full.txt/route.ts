import { renderLlmsFullTxt } from "@/content/render/markdown";
import { plainText } from "@/lib/markdownResponse";

export const dynamic = "force-static";

export function GET() {
  return plainText(renderLlmsFullTxt());
}
