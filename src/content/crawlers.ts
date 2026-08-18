/**
 * Crawler policy, stated explicitly rather than inherited from a copied
 * template. Three separate concerns, decided separately:
 *
 *   search    — indexing this site and linking to it        → allowed
 *   ai-input  — retrieving it live to answer and cite it    → allowed
 *   ai-train  — using it to train or fine-tune a model      → not granted
 *
 * The trade-off is real and deliberate. Allowing retrieval keeps this site
 * eligible to be cited by ChatGPT Search, Claude, Perplexity and Copilot when
 * someone asks about Tenzing. Withholding training means a model is less likely
 * to recall him from parametric memory without visiting the site. To opt into
 * training instead, set `allowTraining` to true — the robots.txt and the
 * Content-Signal line both follow from it.
 */
export const allowTraining = false;

export const contentSignal = {
  search: "yes",
  "ai-input": "yes",
  "ai-train": allowTraining ? "yes" : "no",
} as const;

/** Live retrieval, search indexing and user-triggered fetches. Always allowed. */
export const retrievalAgents: { name: string; note: string }[] = [
  { name: "Googlebot", note: "Google Search" },
  { name: "Bingbot", note: "Bing, and the index behind Copilot" },
  { name: "DuckDuckBot", note: "DuckDuckGo" },
  { name: "Applebot", note: "Apple search and Siri" },
  { name: "OAI-SearchBot", note: "ChatGPT Search index" },
  { name: "ChatGPT-User", note: "ChatGPT fetching a page a user asked about" },
  { name: "Claude-SearchBot", note: "Claude search index" },
  { name: "Claude-User", note: "Claude fetching a page a user asked about" },
  { name: "PerplexityBot", note: "Perplexity index" },
  { name: "Perplexity-User", note: "Perplexity fetching a page a user asked about" },
];

/** Bulk collection for model training. Disallowed unless `allowTraining`. */
export const trainingAgents: { name: string; note: string }[] = [
  { name: "GPTBot", note: "OpenAI model training" },
  { name: "ClaudeBot", note: "Anthropic model training" },
  { name: "anthropic-ai", note: "legacy Anthropic training agent" },
  { name: "Google-Extended", note: "Gemini model training" },
  { name: "Applebot-Extended", note: "Apple Intelligence model training" },
  { name: "meta-externalagent", note: "Meta model training" },
  { name: "Amazonbot", note: "Amazon model training" },
  { name: "Bytespider", note: "ByteDance model training" },
  { name: "CCBot", note: "Common Crawl, widely used as a training corpus" },
];
