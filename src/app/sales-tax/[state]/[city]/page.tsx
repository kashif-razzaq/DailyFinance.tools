import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { US_CITIES, getCity, getCitiesByState } from "@/data/locations/us-cities"
import { getStateBySlug, taxOn } from "@/data/locations/us-states"
import { ArrowRight } from "lucide-react"

export function generateStaticParams() {
  return US_CITIES.map((c) => ({ state: c.stateSlug, city: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state, city } = await params
  const c = getCity(state, city)
  const s = getStateBySlug(state)
  if (!c || !s) return { title: "City Not Found" }
  return {
    title: `Sales Tax in ${c.name}, ${s.abbr} — ${c.combinedRate}% Combined Rate, Examples & Calculator`,
    description: `The combined sales tax rate in ${c.name}, ${s.name} is about ${c.combinedRate}% (state ${s.salesTaxBase}% + local). See tax on $50–$1,000 purchases, how the rate is built, grocery rules and a free calculator.`,
    alternates: { canonical: `https://dailyfinance.tools/sales-tax/${s.slug}/${c.slug}` },
    keywords: [`sales tax in ${c.name.toLowerCase()}`, `${c.name.toLowerCase()} sales tax rate`, `${c.name.toLowerCase()} ${s.abbr.toLowerCase()} tax calculator`],
  }
}

export default async function CitySalesTaxPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params
  const c = getCity(state, city)
  const s = getStateBySlug(state)
  if (!c || !s) notFound()

  const baskets = [50, 100, 500, 1000]
  const diff = Math.round((c.combinedRate - s.salesTaxAvgCombined) * 100) / 100
  const siblings = getCitiesByState(s.slug).filter((x) => x.slug !== c.slug)
  const faqs = [
    { question: `What is the sales tax rate in ${c.name}?`, answer: `The combined sales tax rate in ${c.name} is approximately ${c.combinedRate}% — the ${s.name} state rate of ${s.salesTaxBase}% plus county, city and district taxes. Rates can vary by exact address and special district, so treat this as the typical in-city rate.` },
    { question: `How much tax do I pay on a $100 purchase in ${c.name}?`, answer: `At ${c.combinedRate}%, a $100 taxable purchase in ${c.name} carries about $${taxOn(100, c.combinedRate).toFixed(2)} in sales tax, for a total of $${(100 + taxOn(100, c.combinedRate)).toFixed(2)}.` },
    { question: `Why is ${c.name}'s rate different from the ${s.name} average?`, answer: `The statewide average combined rate in ${s.name} is about ${s.salesTaxAvgCombined}%. ${c.name} is ${diff > 0 ? `about ${diff} points higher` : diff < 0 ? `about ${Math.abs(diff)} points lower` : "right at the average"} because of its local layers. ${c.fact}` },
    { question: `Are groceries taxed in ${c.name}?`, answer: s.groceriesNote },
  ]
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dailyfinance.tools/" },
    { "@type": "ListItem", position: 2, name: "Locations", item: "https://dailyfinance.tools/locations" },
    { "@type": "ListItem", position: 3, name: `${s.name} Sales Tax`, item: `https://dailyfinance.tools/sales-tax/${s.slug}` },
    { "@type": "ListItem", position: 4, name: c.name, item: `https://dailyfinance.tools/sales-tax/${s.slug}/${c.slug}` },
  ] }

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id={`schema-city-faq-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`schema-city-crumb-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container mx-auto px-4 md:px-8 py-14">
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground">Home</Link><span className="text-border">/</span>
          <Link href="/locations" className="hover:text-foreground">Locations</Link><span className="text-border">/</span>
          <Link href={`/sales-tax/${s.slug}`} className="hover:text-foreground">{s.name} Sales Tax</Link><span className="text-border">/</span>
          <span className="text-foreground">{c.name}</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Sales Tax in {c.name}, {s.abbr}: {c.combinedRate}% Combined Rate</h1>
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 max-w-4xl mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Quick Answer</h2>
          <p className="leading-relaxed">Shoppers in {c.name} pay about <strong>{c.combinedRate}%</strong> combined sales tax — {s.salesTaxBase}% {s.name} state tax plus local county, city and district taxes. A $100 purchase carries roughly <strong>${taxOn(100, c.combinedRate).toFixed(2)}</strong> tax ({(diff !== 0) ? <>the {s.name} average is {s.salesTaxAvgCombined}%</> : <>matching the {s.name} average</>}).</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none">
            <h2>How {c.name}&apos;s {c.combinedRate}% rate is built</h2>
            <p>{c.fact}</p>
            <h2>What you pay in {c.name} — worked examples</h2>
            <table>
              <thead><tr><th>Purchase</th><th>Tax at {c.combinedRate}%</th><th>Total</th></tr></thead>
              <tbody>
                {baskets.map((amt) => (
                  <tr key={amt}><td>${amt.toLocaleString()}</td><td>${taxOn(amt, c.combinedRate).toFixed(2)}</td><td>${(amt + taxOn(amt, c.combinedRate)).toFixed(2)}</td></tr>
                ))}
              </tbody>
            </table>
            <h2>{c.name} vs the {s.name} average</h2>
            <p>The average combined rate across {s.name} is about {s.salesTaxAvgCombined}%, so {c.name} at {c.combinedRate}% is {diff > 0 ? "above" : diff < 0 ? "below" : "at"} the state norm{diff !== 0 ? ` by roughly ${Math.abs(diff)} percentage points` : ""}. On a $30,000 car (where vehicle tax rules allow the general rate), that gap alone is about ${Math.abs(Math.round(30000 * (diff / 100))).toLocaleString()} — one reason big purchases are planned around exact addresses, not state averages.</p>
            <h2>Calculate with your exact rate</h2>
            <p>District boundaries inside {c.name} can shift the rate street by street. For an exact figure — or to extract tax from a tax-inclusive total — use the full calculator with your precise local rate:</p>
            <p>
              <Link href="/ecommerce/sales-tax-vat-calculator" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-primary/90">Open the Sales Tax Calculator <ArrowRight className="h-4 w-4" /></Link>
            </p>
            <p className="text-sm">Rates are reviewed approximations for a typical in-city address (Tax Foundation city data, cross-checked — see <Link href="/methodology">Methodology</Link>). Verify your exact rate with the {s.name} Department of Revenue before filing or a major purchase.</p>
          </article>
          <aside className="lg:col-span-4 bg-card border rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4">{c.name} Sales Tax FAQs</h3>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.question}>
                  <h4 className="font-semibold text-sm mb-1">{f.question}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border/40 space-y-2">
              <Link href={`/sales-tax/${s.slug}`} className="block text-sm text-primary font-semibold">Full {s.name} sales tax guide →</Link>
              <Link href={`/locations/${s.slug}`} className="block text-sm text-primary font-semibold">{s.name} tax &amp; finance guide →</Link>
              {siblings.map((x) => (
                <Link key={x.slug} href={`/sales-tax/${s.slug}/${x.slug}`} className="block text-sm text-primary font-semibold">Sales tax in {x.name} →</Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
