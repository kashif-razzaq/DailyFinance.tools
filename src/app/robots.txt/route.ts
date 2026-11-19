/**
 * /robots.txt — served by a route handler (not MetadataRoute.Robots) because
 * the framework build spec requires Content-Signal directives, which Next's
 * robots() type cannot emit. Keep in sync with llms.txt and the sitemap.
 *
 * Crawler stance (honest, deliberate):
 * - Search engines + AI answer engines: welcome everywhere public (AEO/GEO).
 * - Mediapartners-Google (AdSense crawler): explicitly allowed — required
 *   for a future AdSense review even though no ad code runs today.
 * - Private/app paths stay disallowed for every agent.
 * - Content-Signal: search + AI citation yes; AI model training no.
 */
const PRIVATE_PATHS = ["/dashboard/", "/login", "/auth/", "/api/", "/embed/"]

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "cohere-ai",
]

function group(userAgents: string[], extraAllow: string[] = []): string {
  const lines = userAgents.map((ua) => `User-agent: ${ua}`)
  lines.push("Allow: /", "Allow: /api/og", ...extraAllow)
  for (const p of PRIVATE_PATHS) lines.push(`Disallow: ${p}`)
  return lines.join("\n")
}

export async function GET() {
  const body = [
    "# robots.txt — DailyFinance.tools",
    "",
    group(["*"]),
    "",
    "# AdSense crawler — explicitly allowed (no ad code runs today; this is",
    "# for a future AdSense review). Private paths stay off-limits.",
    "User-agent: Mediapartners-Google",
    "Allow: /",
    ...PRIVATE_PATHS.map((p) => `Disallow: ${p}`),
    "",
    "# AI answer-engine crawlers are explicitly welcome: the site publishes",
    "# llms.txt and structured data so its calculators and guides can be cited.",
    group(AI_CRAWLERS),
    "",
    "# Content-Signal: search indexing and AI citation welcome; using this",
    "# site's content to train AI models is not consented.",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "",
    "Sitemap: https://www.dailyfinance.tools/sitemap.xml",
    "",
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
