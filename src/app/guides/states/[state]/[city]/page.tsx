import Link from "next/link"
import { ReviewLine } from "@/components/locations/ReviewLine"
import { TaxCompareChart } from "@/components/locations/TaxCompareChart"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import Script from "next/script"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, Calculator } from "lucide-react"
import { US_STATES } from "@/data/locations/us-states"
import { US_CITIES, getCitiesByState } from "@/data/locations/us-cities"
import { AVG_CITY_COMBINED, AVG_COMBINED, AVG_PROPERTY, cityRank, highestCities, lowestCities, pointsDiff } from "@/data/locations/stats"

export function generateStaticParams() {
  return US_CITIES.map((c) => ({ state: c.stateSlug, city: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state, city } = await params
  const c = US_CITIES.find((x) => x.stateSlug === state && x.slug === city)
  const s = US_STATES.find((x) => x.slug === state)
  if (!c || !s) return {}
  return {
    title: `${c.name} Sales Tax Rate 2026: ${c.combinedRate}% Combined Rate Explained`,
    description: `${c.name}'s combined sales tax rate is ${c.combinedRate}%. See how the rate is built, what it adds to real purchases, vs the ${s.name} average.`,
    alternates: { canonical: `https://dailyfinance.tools/guides/states/${state}/${city}` },
    openGraph: {
      title: `${c.name} Sales Tax Rate 2026: ${c.combinedRate}% Combined Rate Explained`,
      description: `${c.name}'s combined sales tax rate is ${c.combinedRate}%. See how the rate is built, what it adds to real purchases, vs the ${s.name} average.`,
      url: `https://dailyfinance.tools/guides/states/${state}/${city}`,
      siteName: "DailyFinance.tools",
      locale: "en_US",
      type: "website",
      images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: `${c.name} Sales Tax Rate 2026: ${c.combinedRate}% Combined Rate Explained` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.name} Sales Tax Rate 2026: ${c.combinedRate}% Combined Rate Explained`,
      description: `${c.name}'s combined sales tax rate is ${c.combinedRate}%. See how the rate is built, what it adds to real purchases, vs the ${s.name} average.`,
      images: ["https://dailyfinance.tools/images/og-base.jpg"],
    },
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
  const rank = cityRank(c)
  const vsNational = pointsDiff(c.combinedRate, AVG_COMBINED)
  const stateCities = getCitiesByState(s.slug).slice().sort((a, b) => b.combinedRate - a.combinedRate)
  const baskets = [25, 100, 500, 1000, 10000]
  const faqs = [
    {
      question: `What is the sales tax rate in ${c.name}?`,
      answer: `The combined sales tax rate in ${c.name} is approximately ${c.combinedRate}%, made up of the ${s.name} state rate plus county, city and district taxes. ${c.fact}`,
    },
    {
      question: `How much tax do I pay on a $100 purchase in ${c.name}?`,
      answer: `At ${c.combinedRate}%, a $100 taxable purchase in ${c.name} carries about ${money(taxOn(100))} in sales tax, for a total of ${money(100 + taxOn(100))}. On $1,000 the tax is ${money(taxOn(1000))}; on $10,000 it is ${money(taxOn(10000))}.`,
    },
    {
      question: `Why is the ${c.name} rate different from the rest of ${s.name}?`,
      answer: `Sales tax is stacked: the state sets a base rate and local governments add their own. ${c.name} adds local layers that bring the combined rate to ${c.combinedRate}%, compared with a statewide average combined rate of about ${s.salesTaxAvgCombined}% — a gap of ${Math.abs(diff)} points.`,
    },
    {
      question: `How does ${c.name} compare with other US cities?`,
      answer: `${c.name} ranks ${rank} of the 30 major cities in our dataset by combined rate (dataset average ${AVG_CITY_COMBINED}%). The highest is ${highestCities(1)[0].name} at ${highestCities(1)[0].combinedRate}% and the lowest is ${lowestCities(1)[0].name} at ${lowestCities(1)[0].combinedRate}%. Against the all-state average combined rate of ${AVG_COMBINED}%, ${c.name} is ${vsNational > 0 ? `${vsNational} points higher` : vsNational < 0 ? `${Math.abs(vsNational)} points lower` : "exactly level"}.`,
    },
    {
      question: `Are groceries taxed in ${c.name}?`,
      answer: s.groceriesNote,
    },
    {
      question: `Where can I verify the exact rate for a ${c.name} address?`,
      answer: `The ${c.combinedRate}% figure is the typical combined rate inside city limits; district taxes can shift it block by block. Verify the rate for a specific address with the ${s.name} Department of Revenue before a major purchase or a filing.`,
    },
  ]
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id={`schema-faq-city-${c.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="container mx-auto px-4 md:px-8 py-12 max-w-3xl">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/guides/states" className="shrink-0 hover:text-foreground">States</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href={`/guides/states/${s.slug}`} className="shrink-0 hover:text-foreground">{s.name}</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">{c.name}</span>
        </nav>
        <h1 className="text-3xl md:text-[2.6rem] font-extrabold tracking-tight leading-tight mb-5">
          {c.name} sales tax guide
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          Shopping in {c.name} means paying one of the {diff >= 0 ? "higher" : "lower"} combined sales tax rates in{" "}
          {s.name}: <strong className="text-foreground">{c.combinedRate}%</strong>, against a statewide average
          combined rate of {s.salesTaxAvgCombined}%. Among the 30 major US cities we track, {c.name} ranks{" "}
          <strong className="text-foreground">{rank}</strong> by combined rate. This guide shows how the rate is
          built and what it adds to real purchases.
        </p>

        <div className="content-prose">
          <h2>How the {c.name} rate is built</h2>
          <p>{c.fact}</p>
          <p>
            No single government sets the {c.combinedRate}% figure. The state of {s.name} sets the base rate of{" "}
            {s.salesTaxBase}%, and county, city and special-district taxes stack on top of it. That stacking is why
            the rate can change across a city boundary — and why the address of the sale, not the seller&apos;s home
            address, decides the tax on most transactions.
          </p>

          <h2>What the rate does to real purchases</h2>
          <div className="overflow-x-auto -mx-1 px-1"><table>
            <thead>
              <tr><th>Purchase</th><th>Tax at {c.combinedRate}%</th><th>Total</th></tr>
            </thead>
            <tbody>
              {baskets.map((amt) => (
                <tr key={amt}><td>{money(amt)} purchase</td><td>{money(taxOn(amt))}</td><td>{money(amt + taxOn(amt))}</td></tr>
              ))}
              <tr><td>$35,000 car (where vehicles are taxed at sale)</td><td>{money(taxOn(35000))}</td><td>{money(35000 + taxOn(35000))}</td></tr>
            </tbody>
          </table></div>
          <p>
            Groceries: {s.groceriesNote} Prepared food and restaurant meals are taxed at the full rate in most
            jurisdictions, even where groceries for home consumption are exempt or reduced.
          </p>

          {stateCities.length > 1 ? (
            <>
              <h2>{c.name} vs other {s.name} cities</h2>
              <p>
                Every city below shares the same {s.salesTaxBase}% {s.name} base rate — the differences are local
                layers. {c.name} sits {diff > 0 ? `${diff} points above` : diff < 0 ? `${Math.abs(diff)} points below` : "exactly at"} the
                statewide average combined rate of {s.salesTaxAvgCombined}%.
              </p>
              <div className="overflow-x-auto -mx-1 px-1"><table>
                <thead>
                  <tr><th>City</th><th>Combined rate</th><th>Tax on $1,000</th></tr>
                </thead>
                <tbody>
                  {stateCities.map((x) => (
                    <tr key={x.slug}>
                      <td>{x.slug === c.slug ? <strong>{x.name} (this guide)</strong> : <Link href={`/guides/states/${s.slug}/${x.slug}`}>{x.name}</Link>}</td>
                      <td>{x.combinedRate}%</td>
                      <td>{money((1000 * x.combinedRate) / 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
            </>
          ) : (
            <>
              <h2>{c.name} vs other major US cities</h2>
              <p>
                {c.name} is the {s.name} city we track in detail. Set against the extremes of the 30-city dataset
                (average {AVG_CITY_COMBINED}%), its position is clear:
              </p>
              <div className="overflow-x-auto -mx-1 px-1"><table>
                <thead>
                  <tr><th>City</th><th>Combined rate</th><th>Tax on $1,000</th></tr>
                </thead>
                <tbody>
                  <tr><td><strong>{c.name} (this guide)</strong></td><td><strong>{c.combinedRate}%</strong></td><td><strong>{money(taxOn(1000))}</strong></td></tr>
                  {highestCities(2).filter((x) => x.slug !== c.slug).map((x) => (
                    <tr key={x.slug}><td><Link href={`/guides/states/${x.stateSlug}/${x.slug}`}>{x.name}</Link> — among the highest</td><td>{x.combinedRate}%</td><td>{money((1000 * x.combinedRate) / 100)}</td></tr>
                  ))}
                  {lowestCities(2).filter((x) => x.slug !== c.slug).map((x) => (
                    <tr key={x.slug}><td><Link href={`/guides/states/${x.stateSlug}/${x.slug}`}>{x.name}</Link> — among the lowest</td><td>{x.combinedRate}%</td><td>{money((1000 * x.combinedRate) / 100)}</td></tr>
                  ))}
                </tbody>
              </table></div>
            </>
          )}

          <h2>What this means in {c.name}</h2>
          <p>
            {c.combinedRate === 0
              ? <>There is no sales tax to budget for in {c.name}: the shelf price is the till price. Against the all-state average combined rate of {AVG_COMBINED}%, that saves {money((10000 * AVG_COMBINED) / 100)} on a $10,000 purchase — the saving is structural, and it applies to residents and visitors alike.</>
              : <>On planned purchases the rate is a line item, not a rounding error: {money(taxOn(10000))} on $10,000, which is {money(Math.abs(taxOn(10000) - (10000 * s.salesTaxAvgCombined) / 100))} {c.combinedRate >= s.salesTaxAvgCombined ? "more" : "less"} than the same purchase at the {s.name} average rate. Households near a lower-rate city boundary sometimes route vehicles, appliances and furniture purchases accordingly; on weekly spending, the difference is a few dollars a month and rarely worth a trip.</>}
          </p>

          <h2>Selling in {c.name}</h2>
          <p>
            If your business delivers into {c.name}, the rate your customer pays is generally the combined rate at
            their address. Once your {s.name} sales pass the state&apos;s economic-nexus threshold you must register,
            collect and remit — the threshold and filing basics are covered on the{" "}
            <Link href={`/sales-tax/${s.slug}/${c.slug}`}>{c.name} sales tax page</Link>, and the statewide picture is
            in the <Link href={`/guides/states/${s.slug}`}>{s.name} tax guide</Link>.
          </p>
        </div>

        <section className="mt-12">
          <TaxCompareChart title={`How ${c.name} compares`} groups={[
                { heading: "Sales tax · combined rate", bars: [
                  { label: c.name, value: c.combinedRate, highlight: true },
                  { label: `${s.name} average`, value: s.salesTaxAvgCombined },
                  { label: "US average", value: AVG_COMBINED },
                ]},
                { heading: "Property tax · average effective", bars: [
                  { label: s.name, value: s.propertyTaxAvg, highlight: true },
                  { label: "US average", value: AVG_PROPERTY },
                ]},
              ]} />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-5">{c.name} sales tax FAQs</h2>
<FaqAccordion items={faqs} />
        </section>

        <ReviewLine deptName={`${s.name} Department of Revenue`} />

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
            <Link href={`/locations/${s.slug}`} className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
              {s.name} taxes &amp; finance <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>

      </article>
    </main>
  )
}
