import Link from "next/link"
import type { Metadata } from "next"
import { MapPin } from "lucide-react"
import { US_STATES } from "@/data/locations/us-states"
import { US_CITIES } from "@/data/locations/us-cities"

export const metadata: Metadata = {
  title: "State Tax Guides: Sales, Income & Property Tax by State",
  description:
    "Taxes in every US state and DC: sales tax rates and grocery rules, income tax structure and average property tax — plus guides for 30 major cities.",
  alternates: { canonical: "https://dailyfinance.tools/guides/states" },
  openGraph: {
    title: "State Tax Guides: Sales, Income & Property Tax by State",
    description: "Taxes in every US state and DC: sales tax rates and grocery rules, income tax structure and average property tax — plus guides for 30 major cities.",
    url: "https://dailyfinance.tools/guides/states",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "State Tax Guides: Sales, Income & Property Tax by State" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "State Tax Guides: Sales, Income & Property Tax by State",
    description: "Taxes in every US state and DC: sales tax rates and grocery rules, income tax structure and average property tax — plus guides for 30 major cities.",
    images: ["https://dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function StateGuidesIndexPage() {
  const stateName = (slug: string) => US_STATES.find((s) => s.slug === slug)?.name ?? slug
  return (
    <main className="w-full bg-background min-h-screen">
      <section className="container mx-auto px-4 md:px-8 py-14 max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#064E3B] dark:text-emerald-400 mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4" /> State guides
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 max-w-3xl">Tax guides for every state</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">
          The same purchase, paycheck or house is taxed differently in every state. Each guide below sets out the
          three taxes that change your calculations — sales tax, income tax and property tax — with the current
          rates for that state and links to the calculators that use them.
        </p>

        <h2 className="text-2xl font-extrabold tracking-tight mb-5">All 50 states and DC</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-14">
          {US_STATES.map((s) => (
            <Link key={s.slug} href={`/guides/states/${s.slug}`} className="border rounded-2xl p-5 hover:border-[#064E3B] hover:shadow-md transition-all bg-card group">
              <h3 className="font-bold group-hover:text-[#064E3B] dark:group-hover:text-emerald-400">{s.name} tax guide</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Sales tax {s.salesTaxBase === 0 ? "none statewide" : `${s.salesTaxBase}% base`} · Income tax: {s.incomeTax === "none" ? "none" : s.incomeTax}
              </p>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight mb-5">City guides</h2>
        <p className="text-muted-foreground max-w-3xl mb-6">
          Combined rates inside city limits often run well above the state average. These guides cover the 30
          largest cities, with the exact combined rate and how it is built.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {US_CITIES.map((c) => (
            <Link key={c.slug} href={`/guides/states/${c.stateSlug}/${c.slug}`} className="border rounded-2xl p-5 hover:border-[#064E3B] hover:shadow-md transition-all bg-card group">
              <h3 className="font-bold group-hover:text-[#064E3B] dark:group-hover:text-emerald-400">{c.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{stateName(c.stateSlug)} · {c.combinedRate}% combined</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
