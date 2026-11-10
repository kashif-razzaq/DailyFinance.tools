/**
 * check-site — one-command integrity report for DailyFinance.tools.
 * Usage: npm run check-site   (exit code 1 if any check FAILs)
 *
 * Verifies, from the source data files alone (no build needed):
 *   1. Every live registry tool (Top 100 + EXTRA_LIVE_TOOLS) has a page
 *      folder with page.tsx + CalculatorClient.tsx.
 *   2. Every tool page that renders <ToolContent> or <ContentPlaceholder>
 *      has a TOOL_CONTENT entry (tool-content-a.ts / tool-content-b.ts).
 *      Pages with neither (the freelance gold pages) carry inline content
 *      and pass. A page rendering ContentPlaceholder is ALSO a placeholder
 *      failure (check 3).
 *   3. No placeholder text anywhere in src: "being written", "lorem",
 *      "coming soon", "TODO: content" — plus any page.tsx that renders
 *      ContentPlaceholder. The ContentPlaceholder component's own file is
 *      excluded from the text scan (it is the fallback definition; what
 *      matters is whether any page renders it — check 3b).
 *   4. Every navigation tool href resolves to a real page folder.
 *   5. Every guide relatedTools href resolves to a real page folder.
 *   6. Sitemap coverage: src/app/sitemap.ts builds calculator URLs from
 *      navigation (getToolUrl) — every live registry URL must be in that
 *      set or it never reaches sitemap.xml.
 *
 * Data files are parsed with regexes (plain Node, no dependencies). The
 * registry and content files use one-entry-per-line / quoted-key formats —
 * if a parse yields suspiciously few entries the script says so loudly.
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const ROOT = process.cwd()
const read = (p) => readFileSync(join(ROOT, p), "utf8")
const failures = []
const notes = []
const fail = (section, msg) => failures.push(`[${section}] ${msg}`)

const pageExists = (url) => existsSync(join(ROOT, "src/app", url, "page.tsx"))
const clientExists = (url) => existsSync(join(ROOT, "src/app", url, "CalculatorClient.tsx"))

// ---------- parse registry ----------
const registrySrc = read("src/config/tool-registry.ts")
const top100 = [...registrySrc.matchAll(/^\s*(\{"rank".*\}),?$/gm)].map((m) => JSON.parse(m[1]))
const extraStart = registrySrc.indexOf("EXTRA_LIVE_TOOLS")
const extraEnd = registrySrc.indexOf("\n]", extraStart)
const extras = [...registrySrc.slice(extraStart, extraEnd).matchAll(/^\s*(\{"name".*\}),?$/gm)].map((m) => JSON.parse(m[1]))
const liveTools = [
  ...top100.filter((t) => t.status === "live").map((t) => ({ name: t.name, url: t.url })),
  ...extras.map((t) => ({ name: t.name, url: t.url })),
]
if (top100.length < 90 || extras.length < 5) notes.push(`Registry parse looks thin (${top100.length} Top-100, ${extras.length} extras) — check the parser against the file format.`)

// ---------- parse navigation ----------
const navSrc = read("src/config/navigation.ts")
const navItems = [] // { category, slug, url }
let currentCategory = null
for (const line of navSrc.split("\n")) {
  const cat = line.match(/^ {4}slug: "([^"]+)",?\s*$/)
  if (cat) { currentCategory = cat[1]; continue }
  if (line.includes("{ title:") && currentCategory) {
    const slug = line.match(/slug: "([^"]+)"/)
    if (slug) navItems.push({ category: currentCategory, slug: slug[1], url: `/${currentCategory}/${slug[1]}` })
  }
}
if (navItems.length < 90) notes.push(`Navigation parse looks thin (${navItems.length} items) — check the parser.`)

// ---------- parse TOOL_CONTENT keys ----------
const contentKeys = new Set()
for (const f of readdirSync("src/data").filter((n) => /^tool-content-[a-z0-9-]+\.ts$/.test(n)).map((n) => `src/data/${n}`)) {
  for (const m of read(f).matchAll(/^\s{2}"?([a-z0-9][a-z0-9-]*\/[a-z0-9][a-z0-9-]*)"?\s*:/gm)) contentKeys.add(m[1])
}
if (contentKeys.size < 40) notes.push(`TOOL_CONTENT parse looks thin (${contentKeys.size} keys) — check the parser.`)

// ---------- parse guide relatedTools ----------
const guidesSrc = read("src/data/guides.ts")
const guideLinks = [...guidesSrc.matchAll(/\{\s*name: "[^"]+",\s*url: "([^"]+)"\s*\}/g)].map((m) => m[1])

// ---------- check 1: live tools have pages ----------
for (const t of liveTools) {
  if (!pageExists(t.url)) fail("pages", `Live tool "${t.name}" (${t.url}) has no page.tsx`)
  else if (!clientExists(t.url)) fail("pages", `Live tool "${t.name}" (${t.url}) has no CalculatorClient.tsx`)
}

// ---------- checks 2 + 3b: walk tool pages ----------
const appDir = join(ROOT, "src/app")
const pageFiles = []
for (const cat of readdirSync(appDir)) {
  const catPath = join(appDir, cat)
  if (!statSync(catPath).isDirectory() || cat.startsWith("[")) continue
  for (const sub of readdirSync(catPath)) {
    const p = join(catPath, sub, "page.tsx")
    if (!sub.startsWith("[") && existsSync(p)) pageFiles.push({ key: `${cat}/${sub}`, path: p })
  }
}
let inlineContentPages = 0
for (const pf of pageFiles) {
  const src = readFileSync(pf.path, "utf8")
  const rendersPlaceholder = src.includes("ContentPlaceholder")
  const rendersToolContent = src.includes("ToolContent")
  if (rendersPlaceholder) fail("placeholder", `${pf.key}/page.tsx renders ContentPlaceholder (placeholder panel is live on this page)`)
  if (rendersPlaceholder || rendersToolContent) {
    if (!contentKeys.has(pf.key)) fail("content", `${pf.key} renders ToolContent/ContentPlaceholder but has no TOOL_CONTENT entry`)
  } else inlineContentPages++
}

// ---------- check 3: placeholder text scan ----------
const PATTERNS = [/being written/i, /lorem/i, /coming soon/i, /TODO: content/]
const EXCLUDED = join(ROOT, "src/components/shared/ContentPlaceholder.tsx")
const walk = (dir) => readdirSync(dir).flatMap((e) => {
  const p = join(dir, e)
  return statSync(p).isDirectory() ? walk(p) : [p]
})
for (const file of walk(join(ROOT, "src")).filter((f) => /\.(ts|tsx)$/.test(f))) {
  if (file === EXCLUDED) continue
  const lines = readFileSync(file, "utf8").split("\n")
  lines.forEach((line, i) => {
    for (const pat of PATTERNS) {
      if (pat.test(line)) fail("placeholder", `${file.replace(ROOT + "/", "")}:${i + 1} matches ${pat} — "${line.trim().slice(0, 90)}"`)
    }
  })
}

// ---------- check 4: navigation resolves ----------
for (const item of navItems) {
  if (!pageExists(item.url)) fail("navigation", `Navigation item ${item.url} has no page.tsx`)
}

// ---------- check 5: guide relatedTools resolve ----------
for (const url of guideLinks) {
  if (!pageExists(url)) fail("guides", `Guide relatedTools link ${url} has no page.tsx`)
}

// ---------- check 6: sitemap coverage (navigation-derived, as in sitemap.ts) ----------
const sitemapToolUrls = new Set(navItems.map((i) => i.url))
for (const t of liveTools) {
  if (!sitemapToolUrls.has(t.url)) fail("sitemap", `Live tool "${t.name}" (${t.url}) is not in navigation, so sitemap.ts never emits it`)
}

// ---------- check 7: production wiring on every calculator client ----------
// Every non-freelance CalculatorClient must (a) render the standard actions
// bar (Save/Export/Share with the Free/Pro gates + hidden ad slot) and
// (b) take its money symbol from the shared currency helpers so the header
// currency changer works on the page (no hard-coded '$' literals left).
let clientsChecked = 0
for (const file of walk(join(ROOT, "src")).filter((f) => f.endsWith("CalculatorClient.tsx"))) {
  if (file.includes("/freelance/")) continue
  clientsChecked++
  const src = readFileSync(file, "utf8")
  const rel = file.replace(ROOT + "/", "")
  if (!src.includes("ToolActionsBar") && !src.includes("CalculatorActions")) {
    fail("wiring", `${rel} renders no actions bar (ToolActionsBar missing)`)
  }
  if (file.includes("/pro/") && !src.includes("ProGuard")) {
    fail("wiring", `${rel} is a Pro tool but renders no ProGuard paywall`)
  }
  if (/'\$'/.test(src)) {
    fail("wiring", `${rel} still has a hard-coded '$' literal — use curSym()/useCurrencySymbol() from @/lib/currency`)
  }
}

// ---------- report ----------
const bySection = {}
for (const f of failures) {
  const section = f.slice(1, f.indexOf("]"))
  bySection[section] = (bySection[section] || 0) + 1
}
console.log("=== DailyFinance check-site ===")
console.log(`Live registry tools checked : ${liveTools.length} (${top100.length} Top-100 parsed, ${extras.length} extras)`)
console.log(`Tool pages walked           : ${pageFiles.length} (${inlineContentPages} with inline content, no entry needed)`)
console.log(`TOOL_CONTENT entries found  : ${contentKeys.size}`)
console.log(`Navigation items checked    : ${navItems.length}`)
console.log(`Guide relatedTools checked  : ${guideLinks.length}`)
console.log(`Calculator clients wired    : ${clientsChecked} (actions bar + currency helpers)`)
for (const n of notes) console.log(`NOTE: ${n}`)
if (failures.length === 0) {
  console.log("\nRESULT: PASS — all checks green.")
} else {
  console.log(`\nRESULT: FAIL — ${failures.length} problem(s): ${Object.entries(bySection).map(([k, v]) => `${k} ×${v}`).join(", ")}`)
  const MAX = 80
  failures.slice(0, MAX).forEach((f) => console.log(`  FAIL ${f}`))
  if (failures.length > MAX) console.log(`  … and ${failures.length - MAX} more`)
  process.exit(1)
}
