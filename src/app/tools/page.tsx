import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { TOOL_REGISTRY, EXTRA_LIVE_TOOLS, REGISTRY_HUBS, LIVE_TOOLS, PLANNED_TOOLS } from "@/config/tool-registry"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "All 100 Free Financial Calculators — The Complete Directory | DailyFinance",
  description: "The complete DailyFinance directory: the Top 100 financial calculators across personal finance, mortgages, loans, tax, retirement and freelance.",
  alternates: { canonical: "https://dailyfinance.tools/tools" },
  openGraph: {
    title: "All 100 Free Financial Calculators — The Complete Directory | DailyFinance",
    description: "The complete DailyFinance directory: the Top 100 financial calculators across personal finance, mortgages, loans, tax, retirement and freelance.",
    url: "https://dailyfinance.tools/tools",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "All 100 Free Financial Calculators — The Complete Directory | DailyFinance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All 100 Free Financial Calculators — The Complete Directory | DailyFinance",
    description: "The complete DailyFinance directory: the Top 100 financial calculators across personal finance, mortgages, loans, tax, retirement and freelance.",
    images: ["https://dailyfinance.tools/images/og-base.jpg"],
  },
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
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span><span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">All Tools</span>
        </nav>
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
      </div>
    </main>
  )
}
