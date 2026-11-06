import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, Calculator } from "lucide-react"
import { US_STATES } from "@/data/locations/us-states"
import { US_CITIES } from "@/data/locations/us-cities"

export function generateStaticParams() {
  return US_CITIES.map((c) => ({ state: c.stateSlug, city: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state, city } = await params
  const c = US_CITIES.find((x) => x.stateSlug === state && x.slug === city)
  const s = US_STATES.find((x) => x.slug === state)
  if (!c || !s) return {}
  return {
    title: `${c.name} sales tax guide: ${c.combinedRate}% combined rate explained | DailyFinance.tools`,
    description: `The combined sales tax rate in ${c.name}, ${s.name} is ${c.combinedRate}%. How the rate is built, what it does to real purchases, and how it compares with the state average.`,
    alternates: { canonical: `https://dailyfinance.tools/guides/states/${state}/${city}` },
  }
}

const money = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 })

export default async function CityGuidePage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params
  const c = US_CITIES.find((x) => x.stateSlug === state && x.slug === city)
  const s = US_STATES.find((x) => x.slug === state)
  if (!c || !s) notFound()

  const diff = Math.round((c.combinedRate - s.salesTaxAvgCombined) * 100) / 100
  const taxOn = (price: number) => (price * c.combinedRate) / 100
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the sales tax rate in ${c.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The combined sales tax rate in ${c.name} is approximately ${c.combinedRate}%, made up of the ${s.name} state rate plus county, city and district taxes. ${c.fact}`,
        },
      },
      {
        "@type": "Question",
        name: `Why is the ${c.name} rate different from the rest of ${s.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sales tax is stacked: the state sets a base rate and local governments add their own. ${c.name} adds local layers that bring the combined rate to ${c.combinedRate}%, compared with a statewide average combined rate of about ${s.salesTaxAvgCombined}%.`,
        },
      },
    ],
  }

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id={`schema-faq-city-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="container mx-auto px-4 md:px-8 py-12 max-w-3xl">
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground">Home</Link><span>/</span>
          <Link href="/guides/states" className="hover:text-foreground">States</Link><span>/</span>
          <Link href={`/guides/states/${s.slug}`} className="hover:text-foreground">{s.name}</Link><span>/</span>
          <span className="text-foreground">{c.name}</span>
        </nav>
        <h1 className="text-3xl md:text-[2.6rem] font-extrabold tracking-tight leading-tight mb-5">
          {c.name} sales tax guide
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          Shopping in {c.name} means paying one of the {diff >= 0 ? "higher" : "lower"} combined sales tax rates in{" "}
          {s.name}: <strong className="text-foreground">{c.combinedRate}%</strong>, against a statewide average
          combined rate of {s.salesTaxAvgCombined}%. This guide shows how the rate is built and what it adds to real
          purchases.
        </p>

        <div className="content-prose">
          <h2>How the {c.name} rate is built</h2>
          <p>{c.fact}</p>
          <p>
            No single government sets the {c.combinedRate}% figure. The state of {s.name} sets the base rate of{" "}
            {s.salesTaxBase}%, and county, city and special-district taxes stack on top of it. That stacking is why
            the rate can change across a city boundary — and why the address of the sale, not the seller's home
            address, decides the tax on most transactions.
          </p>

          <h2>What the rate does to real purchases</h2>
          <table>
            <thead>
              <tr><th>Purchase</th><th>Tax at {c.combinedRate}%</th><th>Total</th></tr>
            </thead>
            <tbody>
              <tr><td>$50 of taxable goods</td><td>{money(taxOn(50))}</td><td>{money(50 + taxOn(50))}</td></tr>
              <tr><td>$200 appliance</td><td>{money(taxOn(200))}</td><td>{money(200 + taxOn(200))}</td></tr>
              <tr><td>$1,000 laptop</td><td>{money(taxOn(1000))}</td><td>{money(1000 + taxOn(1000))}</td></tr>
              <tr><td>$35,000 car (where vehicles are taxed at sale)</td><td>{money(taxOn(35000))}</td><td>{money(35000 + taxOn(35000))}</td></tr>
            </tbody>
          </table>
          <p>
            Groceries: {s.groceriesNote} Prepared food and restaurant meals are taxed at the full rate in most
            jurisdictions, even where groceries for home consumption are exempt or reduced.
          </p>

          <h2>Selling in {c.name}</h2>
          <p>
            If your business delivers into {c.name}, the rate your customer pays is generally the combined rate at
            their address. Once your {s.name} sales pass the state's economic-nexus threshold you must register,
            collect and remit — the threshold and filing basics are covered on the{" "}
            <Link href={`/sales-tax/${s.slug}/${c.slug}`}>{c.name} sales tax page</Link>, and the statewide picture is
            in the <Link href={`/guides/states/${s.slug}`}>{s.name} tax guide</Link>.
          </p>
        </div>

        <aside className="mt-12 bg-[#064E3B] text-white rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><Calculator className="h-5 w-5" /> Calculate {c.name} tax</h2>
          <p className="text-white/80 text-sm mb-5">Run the rate against any amount.</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/sales-tax/${s.slug}/${c.slug}`} className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
              {c.name} sales tax calculator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/ecommerce/sales-tax-vat-calculator" className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
              Sales tax &amp; VAT calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        <p className="mt-10 text-sm text-muted-foreground">
          Combined rates are approximations for a typical in-city-limits address; district taxes can shift the rate
          block by block. Verify a specific address with the {s.name} Department of Revenue. See our{" "}
          <Link href="/methodology" className="underline underline-offset-2">methodology</Link>.
        </p>
      </article>
    </main>
  )
}
