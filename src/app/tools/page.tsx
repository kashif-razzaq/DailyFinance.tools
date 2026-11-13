import type { Metadata } from "next"
import Link from "next/link"
import { itemList, stringifyJsonLd } from "@/lib/schema"
import { searchEntries } from "@/lib/tool-search"
import { TOOL_REGISTRY, EXTRA_LIVE_TOOLS, REGISTRY_HUBS, LIVE_TOOLS, PLANNED_TOOLS, type RegistryTool } from "@/config/tool-registry"
import { ArrowRight, CheckCircle2, SearchX } from "lucide-react"

export const metadata: Metadata = {
  title: "All 100+ Free Financial Calculators — Complete Directory",
  description: "The complete DailyFinance directory: the Top 100 financial calculators across personal finance, mortgages, loans, tax, retirement and freelance.",
  alternates: { canonical: "https://www.dailyfinance.tools/tools" },
  openGraph: {
    title: "All 100+ Free Financial Calculators — Complete Directory",
    description: "The complete DailyFinance directory: the Top 100 financial calculators across personal finance, mortgages, loans, tax, retirement and freelance.",
    url: "https://www.dailyfinance.tools/tools",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "All 100+ Free Financial Calculators — Complete Directory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All 100+ Free Financial Calculators — Complete Directory",
    description: "The complete DailyFinance directory: the Top 100 financial calculators across personal finance, mortgages, loans, tax, retirement and freelance.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
  keywords: ["financial calculators", "all calculators", "free finance tools", "calculator directory"],
}

// Directory entries for search: registry tools (with their target keyword as
// the keywords field) plus the extra live tools (no keyword field).
type DirectoryEntry =
  | { kind: "registry"; tool: RegistryTool }
  | { kind: "extra"; tool: (typeof EXTRA_LIVE_TOOLS)[number] }

const ALL_ENTRIES: DirectoryEntry[] = [
  ...TOOL_REGISTRY.map((tool): DirectoryEntry => ({ kind: "registry", tool })),
  ...EXTRA_LIVE_TOOLS.map((tool): DirectoryEntry => ({ kind: "extra", tool })),
]

function entryFields(entry: DirectoryEntry) {
  if (entry.kind === "registry") {
    return { title: entry.tool.name, keywords: [entry.tool.keyword], categoryName: entry.tool.hub }
  }
  return { title: entry.tool.name, categoryName: entry.tool.hub }
}

// One card renderer shared by the hub directory and the search results, so
// both views show the same card for the same tool.
function DirectoryToolCard({ entry }: { entry: DirectoryEntry }) {
  if (entry.kind === "extra") {
    const t = entry.tool
    return (
      <Link href={t.url} className="group bg-card border rounded-2xl p-5 hover:border-primary/40 transition-colors">
        <span className="flex items-center justify-between gap-2">
          <span className="font-bold group-hover:text-primary transition-colors leading-snug">{t.name}</span>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">Live</span>
        </span>
        <span className="block text-xs text-muted-foreground mt-2">Bonus tool — live now</span>
      </Link>
    )
  }
  const t = entry.tool
  if (t.status === "live") {
    return (
      <Link href={t.url} className="group bg-card border rounded-2xl p-5 hover:border-primary/40 transition-colors">
        <span className="flex items-center justify-between gap-2">
          <span className="font-bold group-hover:text-primary transition-colors leading-snug">{t.name}</span>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">Live</span>
        </span>
        <span className="block text-xs text-muted-foreground mt-2">Targets “{t.keyword}” · {t.tier}</span>
      </Link>
    )
  }
  return (
    <div className="bg-muted/20 border border-dashed rounded-2xl p-5" aria-label={`${t.name} — in production`}>
      <span className="flex items-center justify-between gap-2">
        <span className="font-semibold text-muted-foreground leading-snug">{t.name}</span>
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted rounded-full px-2 py-0.5">In Production</span>
      </span>
      <span className="block text-xs text-muted-foreground mt-2">Targets “{t.keyword}” · est. {t.volume}/mo · {t.tier}</span>
    </div>
  )
}

export default async function ToolsDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const params = await searchParams
  const rawQ = Array.isArray(params?.q) ? params.q[0] : params?.q
  const query = (rawQ ?? "").trim()
  const isSearching = query.length > 0

  // Search uses the SAME matching rules as the live home search dropdown
  // (src/lib/tool-search) — the dropdown and this route can never disagree
  // about what matches a query.
  const results = isSearching ? searchEntries(query, ALL_ENTRIES, entryFields) : []
  const liveResults = results.filter((e) => e.tool.status === "live")

  // ItemList stays honest for whatever list is shown: the full live
  // directory, or just the live tools matching the query. No list is
  // emitted for an empty result set.
  const listItems = isSearching
    ? liveResults.map((e) => ({ name: e.tool.name, url: `https://www.dailyfinance.tools${e.tool.url}` }))
    : [...LIVE_TOOLS, ...EXTRA_LIVE_TOOLS].map((t) => ({
        name: t.name,
        url: `https://www.dailyfinance.tools${t.url}`,
      }))
  const toolsListSchema =
    listItems.length > 0
      ? itemList({
          name: isSearching
            ? `Search results for "${query}" — DailyFinance tools`
            : "DailyFinance Top 100 Financial Calculators",
          items: listItems,
        })
      : null

  return (
    <main className="w-full bg-background min-h-screen">
      {toolsListSchema && (
        <script id="schema-tools-directory" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(toolsListSchema) }} />
      )}
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          {isSearching ? (
            <>
              <Link href="/tools" className="shrink-0 hover:text-foreground">All Tools</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span><span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">Results for “{query}”</span>
            </>
          ) : (
            <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">All Tools</span>
          )}
        </nav>

        {isSearching ? (
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Results for “{query}”</h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-10">
              {results.length} {results.length === 1 ? "tool" : "tools"} matching “{query}” —{" "}
              <Link href="/tools" className="font-semibold text-foreground underline underline-offset-2 hover:text-primary">
                clear search and browse all tools
              </Link>
              .
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map((entry) => (
                  <DirectoryToolCard
                    key={entry.kind === "registry" ? `r-${entry.tool.rank}` : `e-${entry.tool.url}`}
                    entry={entry}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-3xl border border-dashed bg-card px-6 py-16 text-center">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <SearchX className="h-6 w-6" />
                </span>
                <p className="text-lg font-bold">No calculators match “{query}”.</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Try a different word — “tax”, “loan” or “ROI” — or{" "}
                  <Link href="/tools" className="font-semibold text-foreground underline underline-offset-2 hover:text-primary">
                    browse the full directory
                  </Link>
                  .
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">The Top 100 Financial Calculators</h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6">
              This is the complete, researched DailyFinance roadmap — the 100 highest-value financial calculators, selected from keyword demand data and organised into six hubs. Every tool is free and ready to use — each one shows its formula, a worked example with real numbers, and answers to the questions people actually ask about it.
            </p>
            <div className="flex flex-wrap gap-3 mb-14">
              <span className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 text-primary" /> {LIVE_TOOLS.length} of the Top 100 live</span>
              <span className="inline-flex items-center gap-2 bg-card border rounded-full px-4 py-2 text-sm font-semibold">+ {EXTRA_LIVE_TOOLS.length} extra live tools</span>
              <Link href="/locations" className="inline-flex items-center gap-2 bg-card border rounded-full px-4 py-2 text-sm font-semibold hover:border-primary/40 transition-colors">State &amp; city tax guides <ArrowRight className="h-4 w-4 text-primary" /></Link>
            </div>

            {REGISTRY_HUBS.map((hub) => {
              const tools = TOOL_REGISTRY.filter((t) => t.hub === hub)
              const extras = EXTRA_LIVE_TOOLS.filter((t) => t.hub === hub)
              if (tools.length === 0 && extras.length === 0) return null
              return (
                <section key={hub} className="mb-14">
                  <h2 className="text-2xl font-bold tracking-tight mb-1.5">{hub}</h2>
                  <p className="text-sm text-muted-foreground mb-5">{tools.filter((t) => t.status === "live").length + extras.length} live tools</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {tools.map((t) => (
                      <DirectoryToolCard key={t.rank} entry={{ kind: "registry", tool: t }} />
                    ))}
                    {extras.map((t) => (
                      <DirectoryToolCard key={t.url} entry={{ kind: "extra", tool: t }} />
                    ))}
                  </div>
                </section>
              )
            })}
          </>
        )}
      </div>
    </main>
  )
}
