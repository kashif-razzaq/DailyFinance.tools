import type { Metadata } from "next"
import Link from "next/link"
import { US_STATES } from "@/data/locations/us-states"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Financial Calculators by State — Sales, Property & Income Tax",
  description: "State-by-state finance guides: sales tax, average combined and property tax rates and income tax structure for all 50 states and DC, with calculators.",
  alternates: { canonical: "https://dailyfinance.tools/locations" },
  openGraph: {
    title: "Financial Calculators by State — Sales, Property & Income Tax",
    description: "State-by-state finance guides: sales tax, average combined and property tax rates and income tax structure for all 50 states and DC, with calculators.",
    url: "https://dailyfinance.tools/locations",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Financial Calculators by State — Sales, Property & Income Tax" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Calculators by State — Sales, Property & Income Tax",
    description: "State-by-state finance guides: sales tax, average combined and property tax rates and income tax structure for all 50 states and DC, with calculators.",
    images: ["https://dailyfinance.tools/images/og-base.jpg"],
  },
  keywords: ["sales tax by state", "property tax by state", "income tax by state", "state tax calculators"],
}

export default function LocationsIndexPage() {
  const noSalesTax = US_STATES.filter((s) => s.salesTaxBase === 0)
  const noIncomeTax = US_STATES.filter((s) => s.incomeTax === "none")
  return (
    <main className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-14">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span><span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">Locations</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Financial Calculators &amp; Tax Guides by State</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6">
          Taxes are local. The sales tax on the same $100 purchase ranges from $0 in Oregon to over $9 in Tennessee and Louisiana, property taxes average under 0.4% in Hawaii and over 2.4% in New Jersey, and nine states charge no tax on wages at all. Pick your state for its real rates — and the calculators that use them.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 max-w-4xl mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Quick Answer</h2>
          <p className="leading-relaxed">Five states have <strong>no statewide sales tax</strong> ({noSalesTax.map((s) => s.name).join(", ")}), and {noIncomeTax.length} entries below have <strong>no tax on wage income</strong>. Every state page shows the state base rate, the average combined rate shoppers actually pay, how groceries are treated, the average effective property tax rate, and the state&apos;s income-tax structure — with worked examples.</p>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-5">All 50 states + District of Columbia</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14">
          {US_STATES.map((s) => (
            <Link key={s.slug} href={`/locations/${s.slug}`} className="group bg-card border rounded-2xl p-5 hover:border-primary/40 transition-colors">
              <span className="flex items-center gap-2 font-bold group-hover:text-primary transition-colors"><MapPin className="h-4 w-4 text-primary" /> {s.name} <span className="text-xs text-muted-foreground font-semibold">({s.abbr})</span></span>
              <span className="block text-xs text-muted-foreground mt-2 leading-relaxed">
                Sales tax {s.salesTaxBase === 0 ? "— none statewide" : `${s.salesTaxBase}% state · ~${s.salesTaxAvgCombined}% combined`} · Property tax avg {s.propertyTaxAvg}% · Income tax: {s.incomeTax === "none" ? "none on wages" : s.incomeTax}
              </span>
            </Link>
          ))}
        </div>

        <div className="content-prose max-w-none">
          <h2>How these state pages work</h2>
          <p>Each state page is generated from a single reviewed dataset (see our <Link href="/methodology">Methodology</Link>). State base rates are statutory; combined rates are averages — your exact rate depends on your county, city and any special districts, which is why every page links to the full calculator where you can enter your exact local rate. Pages exist for the calculations where location genuinely changes the answer: <Link href="/sales-tax/alabama">sales tax by state</Link> first, with property-tax and paycheck variants built on the same system as those tools roll out.</p>
          <h2>Which state taxes should you check?</h2>
          <p><strong>Moving or working remotely:</strong> compare income-tax structure and property tax together — a no-income-tax state like Texas offsets it with ~1.6% property taxes, while Oregon pairs no sales tax with income tax up to 9.9%. <strong>Selling online:</strong> your nexus states&apos; combined rates decide what you collect. <strong>Buying a home:</strong> the property-tax average on your state page, applied to your price, is the fastest sanity check on a listing&apos;s tax bill.</p>
        </div>
      </div>
    </main>
  )
}
