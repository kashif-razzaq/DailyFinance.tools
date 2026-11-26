/**
 * /robots.txt — served by a route handler (not MetadataRoute.Robots) because
 * the build spec requires Content-Signal directives, which Next's robots()
 * type cannot emit. Keep in sync with llms.txt and the sitemap.
 *
 * Structure matches plantedshelf.blog/robots.txt (Kashif, 2026-11-21): one
 * group per crawler family, each carrying its own Content-Signal line.
 * DF keeps its own exclusions in EVERY group — a crawler matching a named
 * group ignores the default "*" group, so repeating the private disallows
 * is what keeps /dashboard, /login, /auth, /api and /embed off-limits to
 * every agent. /api/og stays explicitly allowed (share-card rendering).
 *
 * Crawler stance: search engines + AI answer engines welcome everywhere
 * public (AEO/GEO). Content-Signal is search=yes, ai-input=yes,
 * ai-train=no — AI citation welcome, AI model training not consented,
 * matching the ai_training policy in .well-known/ai-catalog.json.
 * (The Planted Shelf file this structure was modelled on says ai-train=yes;
 * Kashif asked to drop the training consent for DF on 2026-11-21.)
 */
const PRIVATE_PATHS = ["/dashboard/", "/login", "/auth/", "/api/", "/embed/"]

const CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=no"

function group(userAgent: string): string {
  return [
    `User-agent: ${userAgent}`,
    CONTENT_SIGNAL,
    "Allow: /",
    "Allow: /api/og",
    ...PRIVATE_PATHS.map((p) => `Disallow: ${p}`),
  ].join("\n")
}

function section(comment: string, userAgents: string[]): string {
  return `# ${comment}\n\n${userAgents.map((ua) => group(ua)).join("\n\n")}`
}

// Static: the body is built from constants and only changes on deploy.
// The handler already sets a Cache-Control header; force-static makes the
// route build-time generated instead of executing per request.
export const dynamic = 'force-static'

export async function GET() {
  const body = [
    "# DailyFinance.tools (www.dailyfinance.tools) robots.txt",
    "",
    "# Optimized for Google, Bing, Claude, ChatGPT, Perplexity & Gemini",
    "# Specification: RFC 9309 + Cloudflare/IETF Content Signals Policy",
    "",
    "# Default crawler policy",
    "",
    group("*"),
    "",
    section("Google Search & Generative AI crawlers", [
      "Googlebot",
      "Google-Extended",
      "Mediapartners-Google",
      "AdsBot-Google",
    ]),
    "",
    section("Microsoft Bing & Copilot crawlers", ["Bingbot"]),
    "",
    section("OpenAI ChatGPT Search & Browsing crawlers", [
      "OAI-SearchBot",
      "ChatGPT-User",
      "GPTBot",
    ]),
    "",
    section("Anthropic Claude Search & User crawlers", [
      "Claude-SearchBot",
      "Claude-User",
      "ClaudeBot",
    ]),
    "",
    section("Perplexity AI Search crawler", ["PerplexityBot"]),
    "",
    section("Apple Intelligence & Safari Search", ["Applebot", "Applebot-Extended"]),
    "",
    section("Additional AI crawlers (kept from the previous DF file)", [
      "Perplexity-User",
      "CCBot",
      "Meta-ExternalAgent",
      "cohere-ai",
    ]),
    "",
    "# Agent Resource Discovery & llms.txt declarations",
    "# Agentmap: https://www.dailyfinance.tools/.well-known/ai-catalog.json",
    "",
    "# Sitemap",
    "Sitemap: https://www.dailyfinance.tools/sitemap.xml",
    "",
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
