import type { Metadata } from "next"
import { ReviewLine } from "@/components/locations/ReviewLine"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { US_CITIES, getCity, getCitiesByState } from "@/data/locations/us-cities"
import { getStateBySlug, taxOn } from "@/data/locations/us-states"
import { AVG_CITY_COMBINED, AVG_COMBINED, cityRank, highestCities, lowestCities, pointsDiff } from "@/data/locations/stats"
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
    title: `Sales Tax in ${c.name}, ${s.abbr}: ${c.combinedRate}% Combined Rate & Calculator`,
    description: `Combined sales tax in ${c.name}, ${s.name} is about ${c.combinedRate}% (state ${s.salesTaxBase}% + local). Tax on $50–$1,000 purchases, grocery rules and a free calculator.`,
    alternates: { canonical: `https://dailyfinance.tools/sales-tax/${s.slug}/${c.slug}` },
    openGraph: {
      title: `Sales Tax in ${c.name}, ${s.abbr}: ${c.combinedRate}% Combined Rate & Calculator`,
      description: `Combined sales tax in ${c.name}, ${s.name} is about ${c.combinedRate}% (state ${s.salesTaxBase}% + local). Tax on $50–$1,000 purchases, grocery rules and a free calculator.`,
      url: `https://dailyfinance.tools/sales-tax/${s.slug}/${c.slug}`,
      siteName: "DailyFinance.tools",
      locale: "en_US",
      type: "website",
      images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: `Sales Tax in ${c.name}, ${s.abbr}: ${c.combinedRate}% Combined Rate & Calculator` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Sales Tax in ${c.name}, ${s.abbr}: ${c.combinedRate}% Combined Rate & Calculator`,
      description: `Combined sales tax in ${c.name}, ${s.name} is about ${c.combinedRate}% (state ${s.salesTaxBase}% + local). Tax on $50–$1,000 purchases, grocery rules and a free calculator.`,
      images: ["https://dailyfinance.tools/images/og-base.jpg"],
    },
    keywords: [`sales tax in ${c.name.toLowerCase()}`, `${c.name.toLowerCase()} sales tax rate`, `${c.name.toLowerCase()} ${s.abbr.toLowerCase()} tax calculator`],
  }
}

export default async function CitySalesTaxPage({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params
  const c = getCity(state, city)
  const s = getStateBySlug(state)
  if (!c || !s) notFound()

  const baskets = [25, 100, 500, 1000, 10000]
  const diff = Math.round((c.combinedRate - s.salesTaxAvgCombined) * 100) / 100
  const siblings = getCitiesByState(s.slug).filter((x) => x.slug !== c.slug)
  const rank = cityRank(c)
  const vsNational = pointsDiff(c.combinedRate, AVG_COMBINED)
  const stateCities = getCitiesByState(s.slug).slice().sort((a, b) => b.combinedRate - a.combinedRate)
  const faqs = [
    { question: `What is the sales tax rate in ${c.name}?`, answer: `The combined sales tax rate in ${c.name} is approximately ${c.combinedRate}% — the ${s.name} state rate of ${s.salesTaxBase}% plus county, city and district taxes. Rates can vary by exact address and special district, so treat this as the typical in-city rate.` },
    { question: `How much tax do I pay on a $100 purchase in ${c.name}?`, answer: `At ${c.combinedRate}%, a $100 taxable purchase in ${c.name} carries about $${taxOn(100, c.combinedRate).toFixed(2)} in sales tax, for a total of $${(100 + taxOn(100, c.combinedRate)).toFixed(2)}.` },
    { question: `Why is ${c.name}'s rate different from the ${s.name} average?`, answer: `The statewide average combined rate in ${s.name} is about ${s.salesTaxAvgCombined}%. ${c.name} is ${diff > 0 ? `about ${diff} points higher` : diff < 0 ? `about ${Math.abs(diff)} points lower` : "right at the average"} because of its local layers. ${c.fact}` },
    { question: `Are groceries taxed in ${c.name}?`, answer: s.groceriesNote },
    { question: `How does ${c.name} compare with other US cities?`, answer: `${c.name}'s ${c.combinedRate}% combined rate ranks ${rank} of the 30 major cities in our dataset (average ${AVG_CITY_COMBINED}%). The highest is ${highestCities(1)[0].name} at ${highestCities(1)[0].combinedRate}%; the lowest is ${lowestCities(1)[0].name} at ${lowestCities(1)[0].combinedRate}%. Against the all-state average combined rate of ${AVG_COMBINED}%, ${c.name} is ${vsNational > 0 ? `${vsNational} points higher` : vsNational < 0 ? `${Math.abs(vsNational)} points lower` : "exactly level"}.` },
    { question: `Where can I verify the exact sales tax rate for a ${c.name} address?`, answer: `District taxes inside ${c.name} can shift the combined rate street by street, so ${c.combinedRate}% is the typical in-city figure, not a guarantee for every address. Confirm the rate for a specific address with the ${s.name} Department of Revenue before a major purchase or a filing.` },
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
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/locations" className="shrink-0 hover:text-foreground">Locations</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href={`/sales-tax/${s.slug}`} className="shrink-0 hover:text-foreground">{s.name} Sales Tax</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">{c.name}</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Sales Tax in {c.name}, {s.abbr}: {c.combinedRate}% Combined Rate</h1>
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 max-w-4xl mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Quick Answer</h2>
          <p className="leading-relaxed">Shoppers in {c.name} pay about <strong>{c.combinedRate}%</strong> combined sales tax — {s.salesTaxBase}% {s.name} state tax plus local county, city and district taxes. A $100 purchase carries roughly <strong>${taxOn(100, c.combinedRate).toFixed(2)}</strong> tax ({(diff !== 0) ? <>the {s.name} average is {s.salesTaxAvgCombined}%</> : <>matching the {s.name} average</>}). Among the 30 major US cities we track, {c.name} ranks <strong>{rank}</strong> by combined rate.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 content-prose max-w-none">
            <h2>How {c.name}&apos;s {c.combinedRate}% rate is built</h2>
            <p>{c.fact}</p>
            <h2>What you pay in {c.name} — worked examples</h2>
            <div className="overflow-x-auto -mx-1 px-1"><table>
              <thead><tr><th>Purchase</th><th>Tax at {c.combinedRate}%</th><th>Total</th></tr></thead>
              <tbody>
                {baskets.map((amt) => (
                  <tr key={amt}><td>${amt.toLocaleString()}</td><td>${taxOn(amt, c.combinedRate).toFixed(2)}</td><td>${(amt + taxOn(amt, c.combinedRate)).toFixed(2)}</td></tr>
                ))}
              </tbody>
            </table></div>
            <h2>{c.name} vs the {s.name} average</h2>
            <p>The average combined rate across {s.name} is about {s.salesTaxAvgCombined}%, so {c.name} at {c.combinedRate}% is {diff > 0 ? "above" : diff < 0 ? "below" : "at"} the state norm{diff !== 0 ? ` by roughly ${Math.abs(diff)} percentage points` : ""}. On a $30,000 car (where vehicle tax rules allow the general rate), that gap alone is about ${Math.abs(Math.round(30000 * (diff / 100))).toLocaleString()} — one reason big purchases are planned around exact addresses, not state averages.</p>
            {stateCities.length > 1 ? (
              <>
                <h2>{c.name} vs other {s.name} cities</h2>
                <p>Combined rates for the {s.name} cities we track, highest first. The spread inside one state is set entirely by local layers — the state base rate of {s.salesTaxBase}% is the same in every row.</p>
                <div className="overflow-x-auto -mx-1 px-1"><table>
                  <thead><tr><th>City</th><th>Combined rate</th><th>Tax on $1,000</th></tr></thead>
                  <tbody>
                    {stateCities.map((x) => (
                      <tr key={x.slug}>
                        <td>{x.slug === c.slug ? <strong>{x.name} (this page)</strong> : <Link href={`/sales-tax/${s.slug}/${x.slug}`}>{x.name}</Link>}</td>
                        <td>{x.combinedRate}%</td>
                        <td>${taxOn(1000, x.combinedRate).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr><td>{s.name} statewide average</td><td>{s.salesTaxAvgCombined}%</td><td>${taxOn(1000, s.salesTaxAvgCombined).toFixed(2)}</td></tr>
                  </tbody>
                </table></div>
              </>
            ) : (
              <>
                <h2>{c.name} vs other major US cities</h2>
                <p>{c.name} is the {s.name} city we track in detail. Against the extremes of the 30-city dataset:</p>
                <div className="overflow-x-auto -mx-1 px-1"><table>
                  <thead><tr><th>City</th><th>Combined rate</th><th>Tax on $1,000</th></tr></thead>
                  <tbody>
                    <tr><td><strong>{c.name} (this page)</strong></td><td><strong>{c.combinedRate}%</strong></td><td><strong>${taxOn(1000, c.combinedRate).toFixed(2)}</strong></td></tr>
                    {highestCities(2).filter((x) => x.slug !== c.slug).map((x) => (
                      <tr key={x.slug}><td><Link href={`/sales-tax/${x.stateSlug}/${x.slug}`}>{x.name}</Link> — among the highest</td><td>{x.combinedRate}%</td><td>${taxOn(1000, x.combinedRate).toFixed(2)}</td></tr>
                    ))}
                    {lowestCities(2).filter((x) => x.slug !== c.slug).map((x) => (
                      <tr key={x.slug}><td><Link href={`/sales-tax/${x.stateSlug}/${x.slug}`}>{x.name}</Link> — among the lowest</td><td>{x.combinedRate}%</td><td>${taxOn(1000, x.combinedRate).toFixed(2)}</td></tr>
                    ))}
                    <tr><td>Average of the 30 tracked cities</td><td>{AVG_CITY_COMBINED}%</td><td>${taxOn(1000, AVG_CITY_COMBINED).toFixed(2)}</td></tr>
                  </tbody>
                </table></div>
              </>
            )}
            <h2>What this means in {c.name}</h2>
            <p>{c.combinedRate === 0 ? <>{c.name} charges no sales tax, so the price on the shelf is the price at the till. On a $10,000 purchase that saves the full ${taxOn(10000, AVG_COMBINED).toFixed(2)} that the average state&apos;s combined rate of {AVG_COMBINED}% would add — the reason big purchases are routinely planned around a trip here.</> : <>The rate bites hardest on large, planned purchases. At {c.combinedRate}%, a $10,000 purchase carries ${taxOn(10000, c.combinedRate).toFixed(2)} of tax — ${Math.abs(taxOn(10000, c.combinedRate) - taxOn(10000, s.salesTaxAvgCombined)).toFixed(2)} {c.combinedRate >= s.salesTaxAvgCombined ? "more" : "less"} than the same purchase at the {s.name} average rate of {s.salesTaxAvgCombined}%, and ${Math.abs(taxOn(10000, c.combinedRate) - taxOn(10000, AVG_COMBINED)).toFixed(2)} {vsNational >= 0 ? "more" : "less"} than at the all-state average of {AVG_COMBINED}%. On everyday spending the difference is cents; on vehicles, appliances and furniture it decides where people choose to buy.</>}</p>
            <p>{s.groceries === "exempt" ? <>Day-to-day, the grocery exemption keeps the weekly food shop outside this rate in {s.name} — the {c.combinedRate}% applies to general merchandise, electronics and prepared food. Budget the rate into non-food spending, not the food bill.</> : s.groceries === "full" ? <>Day-to-day, {s.name} taxes groceries at the full rate, so the {c.combinedRate}% reaches the weekly food shop as well as general merchandise — a recurring cost that adds up across a year of shopping in {c.name}.</> : <>Day-to-day, groceries in {s.name} are taxed at a reduced rate rather than the full {c.combinedRate}%, so the food shop carries less tax than general merchandise bought in {c.name} — see the grocery note in the FAQs for the current treatment.</>}</p>
            <h2>Calculate with your exact rate</h2>
            <p>District boundaries inside {c.name} can shift the rate street by street. For an exact figure — or to extract tax from a tax-inclusive total — use the full calculator with your precise local rate:</p>
            <p>
              <Link href="/ecommerce/sales-tax-vat-calculator" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-primary/90">Open the Sales Tax Calculator <ArrowRight className="h-4 w-4" /></Link>
            </p>
          </article>
          <aside className="lg:col-span-4 bg-card border rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4">{c.name} Sales Tax FAQs</h3>
<FaqAccordion items={faqs} variant="compact" />
            <ReviewLine compact deptName={`${s.name} Department of Revenue`} />
            <div className="mt-6 pt-5 border-t border-border/40 space-y-2">
              <Link href={`/sales-tax/${s.slug}`} className="block text-sm text-primary font-semibold">Full {s.name} sales tax guide →</Link>
              <Link href={`/locations/${s.slug}`} className="block text-sm text-primary font-semibold">{s.name} tax &amp; finance guide →</Link>
              <Link href={`/guides/states/${s.slug}/${c.slug}`} className="block text-sm text-primary font-semibold">{c.name} sales tax guide →</Link>
              <Link href={`/guides/states/${s.slug}`} className="block text-sm text-primary font-semibold">{s.name} tax guide →</Link>
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
