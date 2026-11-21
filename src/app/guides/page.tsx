import Link from "next/link"
import { GuideCard } from "@/components/shared/GuideCard"
import { breadcrumb, itemList, stringifyJsonLd } from "@/lib/schema"
import type { Metadata } from "next"
import { ArrowRight, BookOpen, MapPin } from "lucide-react"
import { GUIDES, GUIDE_HUBS, HUB_DESCRIPTIONS, guidesByHub, hubAnchor } from "@/data/guides"

export const metadata: Metadata = {
  title: "Personal Finance Guides: Clear Answers With Real Numbers",
  description:
    "Personal finance guides with real numbers: compound interest, mortgages, debt payoff, taxes and Social Security — each one links to a free calculator.",
  alternates: { canonical: "https://www.dailyfinance.tools/guides" },
  openGraph: {
    title: "Personal Finance Guides: Clear Answers With Real Numbers",
    description: "Personal finance guides with real numbers: compound interest, mortgages, debt payoff, taxes and Social Security — each one links to a free calculator.",
    url: "https://www.dailyfinance.tools/guides",
    siteName: "Daily Finance Tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Personal Finance Guides: Clear Answers With Real Numbers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Finance Guides: Clear Answers With Real Numbers",
    description: "Personal finance guides with real numbers: compound interest, mortgages, debt payoff, taxes and Social Security — each one links to a free calculator.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function GuidesIndexPage() {
  const itemListSchema = itemList({
    name: "DailyFinance.tools guides",
    items: GUIDES.map((g) => ({
      name: g.title,
      url: `https://www.dailyfinance.tools/guides/${g.slug}`,
    })),
  })
  const guidesCrumbSchema = breadcrumb([
    { name: "Home", url: "https://www.dailyfinance.tools/" },
    { name: "Guides", url: "https://www.dailyfinance.tools/guides" },
  ])
  return (
    <main className="w-full bg-background min-h-screen">
      <script id="schema-guides-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(itemListSchema) }} />
      <script id="schema-guides-crumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(guidesCrumbSchema) }} />
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4" /> Guides
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 max-w-3xl">Finance, explained with the numbers left in</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">
          Most money content either sells something or pads a word count. These guides do neither: each one states the
          rule, works a real example with real figures, and links to the calculator that runs the same math on your
          own numbers.
        </p>
        <p className="text-muted-foreground max-w-3xl mb-8">
          Looking for tax and cost rules where you live? The{" "}
          <Link href="/guides/states" className="text-[#064E3B] dark:text-emerald-400 font-medium underline underline-offset-2">state-by-state guides</Link>{" "}
          cover sales tax, income tax and property tax for all 50 states and DC, plus the largest cities.
        </p>

        {/* Category nav — each hub has its own indexable page. */}
        <nav aria-label="Guide categories" className="flex flex-wrap gap-2.5 mb-12">
          {GUIDE_HUBS.map((hub) => (
            <Link
              key={hub}
              href={`/guides/category/${hubAnchor(hub)}`}
              title={HUB_DESCRIPTIONS[hub]}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#064E3B]/50 hover:text-[#064E3B]"
            >
              {hub}
            </Link>
          ))}
        </nav>

        {GUIDE_HUBS.map((hub) => (
          <section key={hub} id={hubAnchor(hub)} className="mb-12 scroll-mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
              <h2 className="text-2xl font-extrabold tracking-tight">{hub}</h2>
              <Link href={`/guides/category/${hubAnchor(hub)}`} className="text-sm font-semibold text-[#064E3B] dark:text-emerald-400 inline-flex items-center gap-1 hover:underline underline-offset-2">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {guidesByHub(hub).map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </section>
        ))}

        <section className="bg-[#064E3B] text-white rounded-2xl p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight mb-2 flex items-center gap-2"><MapPin className="h-6 w-6" /> Guides for every state and major city</h2>
            <p className="text-white/80 leading-relaxed">
              Sales tax rates, income tax structures, grocery rules and property taxes differ by where you live and sell.
              51 state guides and 30 city guides lay out the figures that change your calculations.
            </p>
          </div>
          <Link href="/guides/states" className="shrink-0 inline-flex items-center gap-2 bg-white text-[#064E3B] font-semibold px-5 py-3 rounded-full hover:bg-emerald-50 transition-colors">
            Browse state guides <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </section>
    </main>
  )
}
