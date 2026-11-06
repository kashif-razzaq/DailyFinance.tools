import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { TOOL_REGISTRY, EXTRA_LIVE_TOOLS, REGISTRY_HUBS, LIVE_TOOLS, PLANNED_TOOLS } from "@/config/tool-registry"
import { ArrowRight, CheckCircle2, Hammer } from "lucide-react"

export const metadata: Metadata = {
  title: "All 100 Free Financial Calculators — The Complete Directory | DailyFinance",
  description: "The complete DailyFinance directory: the researched Top 100 financial calculators across personal finance, mortgages, loans, tax, retirement, freelance, creator and e-commerce — see what's live and what's in production.",
  alternates: { canonical: "https://dailyfinance.tools/tools" },
  keywords: ["financial calculators", "all calculators", "free finance tools", "calculator directory"],
}

export default function ToolsDirectoryPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DailyFinance Top 100 Financial Calculators",
    numberOfItems: LIVE_TOOLS.length + EXTRA_LIVE_TOOLS.length,
    itemListElement: [...LIVE_TOOLS, ...EXTRA_LIVE_TOOLS].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `https://dailyfinance.tools${t.url}`,
    })),
  }

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id="schema-tools-directory" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <div className="container mx-auto px-4 md:px-8 py-14">
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground">Home</Link><span className="text-border">/</span><span className="text-foreground">All Tools</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">The Top 100 Financial Calculators</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6">
          This is the complete, researched DailyFinance roadmap — the 100 highest-value financial calculators, selected from keyword demand data and organised into six hubs. Every tool is free. Tools marked <strong className="text-foreground">Live</strong> are ready to use; tools marked <strong className="text-foreground">In Production</strong> are researched, keyword-mapped and being built to the same standard — listed for transparency, and never linked until the real page exists.
        </p>
        <div className="flex flex-wrap gap-3 mb-14">
          <span className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full px-4 py-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 text-primary" /> {LIVE_TOOLS.length} of the Top 100 live</span>
          <span className="inline-flex items-center gap-2 bg-card border rounded-full px-4 py-2 text-sm font-semibold"><Hammer className="h-4 w-4 text-primary" /> {PLANNED_TOOLS.length} in production</span>
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
              <p className="text-sm text-muted-foreground mb-5">{tools.filter((t) => t.status === "live").length + extras.length} live · {tools.filter((t) => t.status === "planned").length} in production</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tools.map((t) =>
                  t.status === "live" ? (
                    <Link key={t.rank} href={t.url} className="group bg-card border rounded-2xl p-5 hover:border-primary/40 transition-colors">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-bold group-hover:text-primary transition-colors leading-snug">{t.name}</span>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">Live</span>
                      </span>
                      <span className="block text-xs text-muted-foreground mt-2">Targets “{t.keyword}” · {t.tier}</span>
                    </Link>
                  ) : (
                    <div key={t.rank} className="bg-muted/20 border border-dashed rounded-2xl p-5" aria-label={`${t.name} — in production`}>
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-muted-foreground leading-snug">{t.name}</span>
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted rounded-full px-2 py-0.5">In Production</span>
                      </span>
                      <span className="block text-xs text-muted-foreground mt-2">Targets “{t.keyword}” · est. {t.volume}/mo · {t.tier}</span>
                    </div>
                  )
                )}
                {extras.map((t) => (
                  <Link key={t.url} href={t.url} className="group bg-card border rounded-2xl p-5 hover:border-primary/40 transition-colors">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-bold group-hover:text-primary transition-colors leading-snug">{t.name}</span>
                      <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-full px-2 py-0.5">Live</span>
                    </span>
                    <span className="block text-xs text-muted-foreground mt-2">Bonus tool — live now</span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 max-w-4xl">
          <h2 className="font-bold text-xl mb-2">How this list was built</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Each entry earned its place from keyword research: search demand, ranking difficulty, and whether a calculator (not an article) is what the searcher actually wants. Tools are then built to one standard — a working calculator above the fold, the formula in plain text, verified worked examples, and answers written so people and AI search engines can cite them. Browse by category from the hubs: <Link href="/freelance" className="text-primary font-semibold">Freelance</Link>, <Link href="/creator" className="text-primary font-semibold">Creator</Link>, <Link href="/ecommerce" className="text-primary font-semibold">E-Commerce</Link>, <Link href="/real-estate" className="text-primary font-semibold">Real Estate</Link>, <Link href="/personal-wealth" className="text-primary font-semibold">Personal Wealth</Link>.
          </p>
        </div>
      </div>
    </main>
  )
}
