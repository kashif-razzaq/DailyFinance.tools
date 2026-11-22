import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen, Calculator, ChevronRight, Search as SearchIcon } from "lucide-react"
import { searchEntries } from "@/lib/tool-search"
import { navigationCategories, getToolUrl } from "@/config/navigation"
import { GUIDES } from "@/data/guides"
import { GuideCard } from "@/components/shared/GuideCard"

/**
 * Unified search results (/search?q=): calculators and guides in one
 * place, using the SAME matching rules as the live dropdowns
 * (src/lib/tool-search), so the page and the dropdowns can never disagree.
 * Search-result pages are thin by nature and must not be indexed
 * (Google's guidance) — robots noindex, and the page stays out of the
 * sitemaps.
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}): Promise<Metadata> {
  const params = await searchParams
  const rawQ = Array.isArray(params?.q) ? params.q[0] : params?.q
  const query = (rawQ ?? "").trim()
  return {
    title: query ? `Search results for "${query}" | Daily Finance Tools` : "Search | Daily Finance Tools",
    description: query
      ? `Calculators and guides matching "${query}" on Daily Finance Tools.`
      : "Search Daily Finance Tools — calculators and guides.",
    // Self-referencing canonical (bare /search, no query): without this the
    // page inherits the root layout's homepage canonical, which is wrong
    // for an indexed-by-nothing search page.
    alternates: { canonical: "https://www.dailyfinance.tools/search" },
    robots: { index: false, follow: true },
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const params = await searchParams
  const rawQ = Array.isArray(params?.q) ? params.q[0] : params?.q
  const query = (rawQ ?? "").trim()

  const allTools = navigationCategories.flatMap((category) =>
    category.calculators.map((tool) => ({ tool, category }))
  )
  const toolResults = query
    ? searchEntries(query, allTools, ({ tool, category }) => ({
        title: tool.title,
        keywords: tool.slug.split("-"),
        categoryName: category.name,
        description: tool.description,
      }))
    : []
  const guideResults = query
    ? searchEntries(query, GUIDES, (g) => ({
        title: g.title,
        keywords: [...g.slug.split("-"), ...g.hub.toLowerCase().split(/[^a-z0-9]+/)],
        categoryName: g.hub,
        description: g.description,
      }))
    : []
  const total = toolResults.length + guideResults.length

  return (
    <main className="w-full bg-background min-h-screen">
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 mb-3 flex items-center gap-2">
          <SearchIcon className="h-4 w-4" /> Search
        </p>
        {query ? (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              {total} result{total === 1 ? "" : "s"} for “{query}”
            </h1>
            <p className="text-muted-foreground mb-10">
              {toolResults.length > 0 && `${toolResults.length} calculator${toolResults.length === 1 ? "" : "s"}`}
              {toolResults.length > 0 && guideResults.length > 0 && " · "}
              {guideResults.length > 0 && `${guideResults.length} guide${guideResults.length === 1 ? "" : "s"}`}
              {total === 0 && "Try a shorter word — “tax”, “loan”, “mortgage” or “ROI”."}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Search</h1>
            <p className="text-muted-foreground mb-10">
              Type in the search box above, or browse{" "}
              <Link href="/tools" className="text-[#064E3B] dark:text-emerald-400 font-medium underline underline-offset-2">all calculators</Link>{" "}
              and{" "}
              <Link href="/guides" className="text-[#064E3B] dark:text-emerald-400 font-medium underline underline-offset-2">all guides</Link>.
            </p>
          </>
        )}

        {toolResults.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight mb-5 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-[#064E3B] dark:text-emerald-400" /> Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {toolResults.map(({ tool, category }) => {
                const Icon = tool.icon || Calculator
                return (
                  <Link
                    key={tool.slug}
                    href={getToolUrl(tool.slug)}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-[#064E3B]/40 transition-colors"
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${category.colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold group-hover:text-[#064E3B] dark:group-hover:text-emerald-400 transition-colors">{tool.title}</span>
                      <span className="block truncate text-sm text-muted-foreground">{category.name}</span>
                    </span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/60" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {guideResults.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight mb-5 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-[#064E3B] dark:text-emerald-400" /> Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {guideResults.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}
