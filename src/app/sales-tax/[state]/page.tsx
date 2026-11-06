import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { US_STATES, getStateBySlug, taxOn } from "@/data/locations/us-states"
import { getCitiesByState } from "@/data/locations/us-cities"
import { ArrowRight } from "lucide-react"

export function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params
  const s = getStateBySlug(state)
  if (!s) return { title: "State Not Found" }
  return {
    title: `${s.name} Sales Tax Calculator & Rate Guide — ${s.salesTaxBase}% State, ~${s.salesTaxAvgCombined}% Combined`,
    description: `How sales tax works in ${s.name}: ${s.salesTaxBase}% state rate, about ${s.salesTaxAvgCombined}% average combined with local taxes, grocery treatment, worked examples for $50–$1,000 purchases, and a free calculator for your exact local rate.`,
    alternates: { canonical: `https://dailyfinance.tools/sales-tax/${s.slug}` },
    keywords: [`${s.name.toLowerCase()} sales tax rate`, `${s.name.toLowerCase()} sales tax calculator`, `sales tax in ${s.name.toLowerCase()}`, `how much is sales tax in ${s.name.toLowerCase()}`],
  }
}

export default async function StateSalesTaxPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params
  const s = getStateBySlug(state)
  if (!s) notFound()

  const baskets = [50, 100, 500, 1000]
  const faqs = [
    { question: `How do I calculate sales tax in ${s.name}?`, answer: `Multiply the price by the combined rate where you buy. At ${s.name}'s average combined rate of ${s.salesTaxAvgCombined}%, tax = price × ${(s.salesTaxAvgCombined / 100).toFixed(4)} — so a $100 purchase carries about $${taxOn(100, s.salesTaxAvgCombined).toFixed(2)} tax, $${(100 + taxOn(100, s.salesTaxAvgCombined)).toFixed(2)} total. Use the calculator for your exact city/county rate.` },
    { question: `What is the combined sales tax rate in ${s.name}?`, answer: `The state rate is ${s.salesTaxBase}%, and with county, city and district taxes the average combined rate is about ${s.salesTaxAvgCombined}%. Rates vary inside ${s.name} — ${s.majorCities.slice(0, 3).join(", ")} can each differ — so confirm your local rate before pricing a large purchase.` },
    { question: `Are groceries taxed in ${s.name}?`, answer: s.groceriesNote },
    { question: `Do online purchases get taxed in ${s.name}?`, answer: s.salesTaxBase === 0 ? `${s.name} has no statewide sales tax to collect on online orders shipped there, though sellers follow the rules of the delivery state.` : `Yes — since the Wayfair decision, remote sellers with economic nexus in ${s.name} (commonly $100,000+ of sales) must collect ${s.name} sales tax at the rate for the delivery address.` },
  ]
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }
  const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: `How to Calculate Sales Tax in ${s.name}`, step: [
    { "@type": "HowToStep", name: "Find your combined rate", text: `Add the ${s.salesTaxBase}% state rate to your county, city and district rates (state average combined ≈ ${s.salesTaxAvgCombined}%).` },
    { "@type": "HowToStep", name: "Multiply price by the rate", text: "Tax = taxable price × (combined rate ÷ 100)." },
    { "@type": "HowToStep", name: "Add tax to the price", text: "Total = price + tax. To extract tax from a tax-inclusive total, divide the total by (1 + rate ÷ 100)." },
  ] }
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dailyfinance.tools/" },
    { "@type": "ListItem", position: 2, name: "Locations", item: "https://dailyfinance.tools/locations" },
    { "@type": "ListItem", position: 3, name: `${s.name} Sales Tax`, item: `https://dailyfinance.tools/sales-tax/${s.slug}` },
  ] }

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id={`schema-st-faq-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`schema-st-howto-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Script id={`schema-st-crumb-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container mx-auto px-4 md:px-8 py-14">
        <nav className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground">Home</Link><span className="text-border">/</span>
          <Link href="/locations" className="hover:text-foreground">Locations</Link><span className="text-border">/</span>
          <Link href={`/locations/${s.slug}`} className="hover:text-foreground">{s.name}</Link><span className="text-border">/</span>
          <span className="text-foreground">Sales Tax</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{s.name} Sales Tax: Rates, Examples &amp; Calculator</h1>
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 max-w-4xl mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Quick Answer</h2>
          <p className="leading-relaxed">{s.salesTaxBase === 0 ? <>{s.name} has <strong>no statewide sales tax</strong>{s.salesTaxAvgCombined > 0 ? <> — but local jurisdictions add their own, averaging about <strong>{s.salesTaxAvgCombined}% combined</strong></> : ""}. On a $100 purchase you would typically pay <strong>${taxOn(100, s.salesTaxAvgCombined).toFixed(2)}</strong> in tax.</> : <>The {s.name} state sales tax rate is <strong>{s.salesTaxBase}%</strong>. Adding county, city and district taxes, the average combined rate is about <strong>{s.salesTaxAvgCombined}%</strong> — so a $100 purchase carries roughly <strong>${taxOn(100, s.salesTaxAvgCombined).toFixed(2)}</strong> in tax, <strong>${(100 + taxOn(100, s.salesTaxAvgCombined)).toFixed(2)}</strong> in total.</>}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none">
            <h2>{s.name} sales tax at a glance</h2>
            <table>
              <tbody>
                <tr><td><strong>State base rate</strong></td><td>{s.salesTaxBase}%</td></tr>
                <tr><td><strong>Average combined rate</strong></td><td>~{s.salesTaxAvgCombined}% (state + county + city + districts)</td></tr>
                <tr><td><strong>Groceries</strong></td><td>{s.groceries === "exempt" ? "Generally exempt" : s.groceries === "reduced" ? "Reduced rate" : "Taxed at full rate"}</td></tr>
                <tr><td><strong>Major cities</strong></td><td>{s.majorCities.join(", ")}</td></tr>
              </tbody>
            </table>
            <h2>Worked examples — what you actually pay in {s.name}</h2>
            <p>Using the average combined rate of {s.salesTaxAvgCombined}% (your exact city rate may be higher or lower):</p>
            <table>
              <thead><tr><th>Purchase</th><th>Tax</th><th>Total</th></tr></thead>
              <tbody>
                {baskets.map((amt) => (
                  <tr key={amt}><td>${amt.toLocaleString()}</td><td>${taxOn(amt, s.salesTaxAvgCombined).toFixed(2)}</td><td>${(amt + taxOn(amt, s.salesTaxAvgCombined)).toFixed(2)}</td></tr>
                ))}
              </tbody>
            </table>
            <h2>How to calculate {s.name} sales tax (3 steps)</h2>
            <ol>
              <li><strong>Find your combined rate.</strong> Start with the {s.salesTaxBase}% state rate, then add your county, city and any special-district rates for the exact purchase location.</li>
              <li><strong>Multiply.</strong> Tax = taxable price × (combined rate ÷ 100). Shipping and discounts change the taxable base in some cases — discounts usually reduce it, delivery charges vary.</li>
              <li><strong>Add (or extract).</strong> Total = price + tax. Working backwards from a tax-inclusive price: pre-tax price = total ÷ (1 + rate ÷ 100). Our calculator does both directions instantly.</li>
            </ol>
            <h2>Groceries and exemptions in {s.name}</h2>
            <p>{s.groceriesNote} Prescription medicines are exempt in almost every state; clothing, services and digital goods follow state-specific rules, so check the {s.name} Department of Revenue for category detail before assuming an item is tax-free.</p>
            {getCitiesByState(s.slug).length > 0 && (
              <>
                <h2>Sales tax in major {s.name} cities</h2>
                <p>Combined rates inside {s.name} are set city by city:</p>
                <ul>
                  {getCitiesByState(s.slug).map((city) => (
                    <li key={city.slug}><Link href={`/sales-tax/${s.slug}/${city.slug}`}>{city.name} sales tax — {city.combinedRate}% combined</Link></li>
                  ))}
                </ul>
              </>
            )}
            <h2>Selling into {s.name}? Read this</h2>
            <p>If you sell online and ship to {s.name}, economic nexus rules generally require you to collect tax once your {s.name} sales pass the state&apos;s threshold (commonly $100,000). You collect at the rate for the buyer&apos;s delivery address — which is why combined-rate accuracy matters more than the state base rate. The full calculator lets you test any rate, extract tax from totals, and model VAT for international sales.</p>
            <p>
              <Link href="/ecommerce/sales-tax-vat-calculator" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-primary/90">Open the Sales Tax Calculator <ArrowRight className="h-4 w-4" /></Link>
            </p>
            <p className="text-sm">Rates are reviewed approximations (see <Link href="/methodology">Methodology</Link>); combined averages hide real local variation. Verify your exact rate with the {s.name} Department of Revenue.</p>
          </article>
          <aside className="lg:col-span-4 bg-card border rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4">{s.name} Sales Tax FAQs</h3>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.question}>
                  <h4 className="font-semibold text-sm mb-1">{f.question}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-border/40">
              <h4 className="font-semibold text-sm mb-2">More for {s.name}</h4>
              <Link href={`/locations/${s.slug}`} className="text-sm text-primary font-semibold">Full {s.name} tax &amp; finance guide →</Link>
            </div>
          </aside>
        </div>

        <h2 className="text-xl font-bold tracking-tight mt-14 mb-4">Sales tax in other states</h2>
        <div className="flex flex-wrap gap-2">
          {US_STATES.filter((o) => o.slug !== s.slug).map((o) => (
            <Link key={o.slug} href={`/sales-tax/${o.slug}`} className="text-xs bg-card border rounded-full px-3 py-1.5 hover:border-primary/40 hover:text-primary transition-colors">{o.name} sales tax</Link>
          ))}
        </div>
      </div>
    </main>
  )
}
