import type { Metadata } from "next"
import { ReviewLine } from "@/components/locations/ReviewLine"
import { TaxCompareChart } from "@/components/locations/TaxCompareChart"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import Link from "next/link"
import { notFound } from "next/navigation"
import { breadcrumb, CONTENT_REVIEWED, faq, stringifyJsonLd, webPage } from "@/lib/schema"
import { US_STATES, getStateBySlug, taxOn } from "@/data/locations/us-states"
import { AVG_COMBINED, AVG_PROPERTY, combinedRank, closestByCombined, overallMeaning, pointsDiff, propertyRank } from "@/data/locations/stats"
import { ArrowRight, MapPin } from "lucide-react"

export function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }))
}

// Closed param set: every valid state is in generateStaticParams, so an
// unknown state must 404 at the routing level. Without this, Next renders
// unknown states dynamically and notFound() can resolve inside a streamed
// shell — the browser gets HTTP 200 with the home title/canonical (a
// soft-404) instead of a real 404 (ARB TH14, 2026-11-22).
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params
  const s = getStateBySlug(state)
  if (!s) return { title: "State Not Found" }
  return {
    title: `${s.name} Tax Guide: Sales Tax ${s.salesTaxBase}%, Property & Income Tax`,
    description: `${s.name} finance guide: ${s.salesTaxBase}% state sales tax (~${s.salesTaxAvgCombined}% combined), ${s.propertyTaxAvg}% average property tax, ${s.incomeTax === "none" ? "no tax on wage income" : s.incomeTax + " income tax"} — with calculators.`,
    alternates: { canonical: `https://www.dailyfinance.tools/locations/${s.slug}` },
    openGraph: {
      title: `${s.name} Tax Guide: Sales Tax ${s.salesTaxBase}%, Property & Income Tax`,
      description: `${s.name} finance guide: ${s.salesTaxBase}% state sales tax (~${s.salesTaxAvgCombined}% combined), ${s.propertyTaxAvg}% average property tax, ${s.incomeTax === "none" ? "no tax on wage income" : s.incomeTax + " income tax"} — with calculators.`,
      url: `https://www.dailyfinance.tools/locations/${s.slug}`,
      siteName: "Daily Finance Tools",
      locale: "en_US",
      type: "website",
      images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: `${s.name} Tax Guide: Sales Tax ${s.salesTaxBase}%, Property & Income Tax` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${s.name} Tax Guide: Sales Tax ${s.salesTaxBase}%, Property & Income Tax`,
      description: `${s.name} finance guide: ${s.salesTaxBase}% state sales tax (~${s.salesTaxAvgCombined}% combined), ${s.propertyTaxAvg}% average property tax, ${s.incomeTax === "none" ? "no tax on wage income" : s.incomeTax + " income tax"} — with calculators.`,
      images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
    },
    keywords: [`${s.name.toLowerCase()} sales tax`, `${s.name.toLowerCase()} property tax`, `${s.name.toLowerCase()} income tax`, `${s.name.toLowerCase()} tax calculator`],
  }
}

export default async function StateHubPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params
  const s = getStateBySlug(state)
  if (!s) notFound()

  const homePrice = 350000
  const annualPropertyTax = Math.round(homePrice * (s.propertyTaxAvg / 100))
  const sRank = combinedRank(s)
  const pRank = propertyRank(s)
  const localGap = Math.round((s.salesTaxAvgCombined - s.salesTaxBase) * 100) / 100
  const peers = closestByCombined(s)
  const faqs = [
    {
      question: `What is the sales tax rate in ${s.name}?`,
      answer: s.salesTaxBase === 0
        ? `${s.name} has no statewide sales tax${s.salesTaxAvgCombined > 0 ? `, though some local areas levy their own, giving an average combined rate of about ${s.salesTaxAvgCombined}%` : " at state or local level in most areas"}.`
        : `The statewide sales tax rate in ${s.name} is ${s.salesTaxBase}%. ${localGap === 0 ? `There is no local layer on top of the state rate, so the average combined rate shoppers actually pay is the same ${s.salesTaxAvgCombined}% statewide — the rate is the same wherever in ${s.name} you buy.` : localGap >= 1.5 ? `County, city and district taxes add about ${localGap} points on top of the state rate, bringing the average combined rate shoppers actually pay to about ${s.salesTaxAvgCombined}%. Your exact rate depends on where in ${s.name} you buy.` : `With county, city and district taxes added, the average combined rate shoppers actually pay is about ${s.salesTaxAvgCombined}%. Your exact rate depends on where in ${s.name} you buy.`}`,
    },
    {
      question: `Does ${s.name} tax groceries?`,
      answer: s.groceriesNote,
    },
    {
      question: `How high are property taxes in ${s.name}?`,
      answer: `The average effective property tax rate in ${s.name} is about ${s.propertyTaxAvg}% of a home's value per year. On a $${homePrice.toLocaleString()} home that is roughly $${annualPropertyTax.toLocaleString()} per year ($${Math.round(annualPropertyTax / 12).toLocaleString()} per month) — actual bills depend on county, assessments and exemptions.`,
    },
    {
      question: `Does ${s.name} have a state income tax?`,
      answer: s.incomeTax === "none" ? `${s.name} does not tax wage income at the state level.` : s.incomeTaxNote,
    },
    {
      question: `How do ${s.name}'s taxes compare with the rest of the US?`,
      answer: `${s.name}'s average combined sales tax of ${s.salesTaxAvgCombined}% ranks ${sRank} of 51 (all-state average ${AVG_COMBINED}%), and its average effective property tax of ${s.propertyTaxAvg}% ranks ${pRank} of 51 (all-state average ${AVG_PROPERTY}%). Its income tax is ${s.incomeTax === "none" ? "none at state level" : s.incomeTax === "flat" ? "a single flat rate" : "progressive, in brackets"}. ${s.propertyTaxAvg >= 1.5 ? `No state is cheapest on all three — in ${s.name} the property tax is the line to weigh heaviest if you own a home.` : s.incomeTax === "none" ? `No state is cheapest on all three — and a no-income-tax state can still be expensive overall if its sales and property taxes run high.` : `No state is cheapest on all three — the comparison that matters depends on whether you earn, spend or own property there.`}`,
    },
    {
      question: `Where can I verify ${s.name} tax rates before filing or buying?`,
      answer: s.salesTaxBase === 0 ? `${s.name} has no statewide sales tax, so the figures to verify are property tax with the county assessor and any local sales taxes with the ${s.name} Department of Revenue before filing, pricing or a major purchase.` : `The figures here are reviewed averages for planning. ${localGap >= 1.5 ? `Combined sales tax varies by exact address, with about ${localGap} points of local tax on average, and property tax bills are set by the county.` : `Combined sales tax varies by exact address, and property tax bills are set by the county.`} Verify a specific rate or bill with the ${s.name} Department of Revenue or the county assessor before filing, pricing or a major purchase.`,
    },
  ]
  const faqSchema = faq(faqs)
  const breadcrumbSchema = breadcrumb([
    { name: "Home", url: "https://www.dailyfinance.tools/" },
    { name: "Locations", url: "https://www.dailyfinance.tools/locations" },
    { name: s.name, url: `https://www.dailyfinance.tools/locations/${s.slug}` },
  ])
  const pageSchema = webPage({
    name: `${s.name} Tax Guide: Sales Tax ${s.salesTaxBase}%, Property & Income Tax`,
    url: `https://www.dailyfinance.tools/locations/${s.slug}`,
    datePublished: CONTENT_REVIEWED,
    dateModified: CONTENT_REVIEWED,
  })
  const others = US_STATES.filter((o) => o.slug !== s.slug)

  return (
    <main className="w-full bg-background min-h-screen">
      <script id={`schema-state-faq-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(faqSchema) }} />
      <script id={`schema-state-crumb-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }} />
      <script id={`schema-state-page-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(pageSchema) }} />
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/locations" className="shrink-0 hover:text-foreground">Locations</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">{s.name}</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 flex items-start gap-3"><MapPin className="h-9 w-9 text-primary shrink-0 mt-1" /> {s.name} Taxes &amp; Finance Guide</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-10">
          The money facts for {s.name} ({s.abbr}) — capital {s.capital}, largest city {s.largestCity}. {s.incomeTax === "none" && s.propertyTaxAvg >= 1.5 ? `With no state income tax, the property bill carries much of the comparison — this guide prices it against real home values, alongside the sales tax.` : s.incomeTax === "none" ? `With no state income tax, the register and the property bill carry the whole comparison — this guide weighs those two heaviest.` : sRank <= 10 ? `Its combined sales tax sits near the top nationally, so the register gets the closest look here — alongside property and income tax, all with real numbers.` : `Sales tax, property tax and income tax explained with real numbers, plus the DailyFinance calculators that use ${s.name} rates.`}
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 max-w-4xl mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">Quick Answer</h2>
          <p className="leading-relaxed">
            In {s.name} you pay <strong>{s.salesTaxBase === 0 ? "no state sales tax" : `${s.salesTaxBase}% state sales tax`}</strong> (about <strong>{s.salesTaxAvgCombined}% combined</strong> with local taxes — rank <strong>{sRank} of 51</strong>, {pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED) > 0 ? `${pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED)} points above` : pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED) < 0 ? `${Math.abs(pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED))} points below` : "equal to"} the {AVG_COMBINED}% all-state average), an average effective property tax of <strong>{s.propertyTaxAvg}%</strong> (rank {pRank} of 51), and {s.incomeTax === "none" ? <strong>no state income tax on wages</strong> : <>a <strong>{s.incomeTax}</strong> state income tax</>}. The takeaway: {s.incomeTax === "none" ? `${s.name} takes nothing from the paycheck at state level — judge it on what you spend and what you own.` : s.propertyTaxAvg >= 1.5 ? `owning property is the expensive part in ${s.name} — price the tax bill into any home purchase.` : s.salesTaxAvgCombined >= AVG_COMBINED + 1 ? `the register is where ${s.name} costs more — its combined sales tax is near the top nationally.` : `${s.name} sits near the middle on all three taxes — no single levy dominates the cost of living here.`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="bg-card border rounded-3xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Sales Tax</h2>
            <p className="text-3xl font-extrabold font-mono">{s.salesTaxBase === 0 ? "None" : `${s.salesTaxBase}%`}</p>
            <p className="text-sm text-muted-foreground mt-2">State base rate · average combined ≈ {s.salesTaxAvgCombined}%. Tax on $100: ${taxOn(100, s.salesTaxAvgCombined).toFixed(2)} at the average combined rate.</p>
            <Link href={`/sales-tax/${s.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4">{s.name} sales tax guide <ArrowRight className="h-4 w-4" /></Link>
            <Link href={`/guides/states/${s.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4 ml-5">{s.name} tax guide — income &amp; property <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Property Tax</h2>
            <p className="text-3xl font-extrabold font-mono">~{s.propertyTaxAvg}%</p>
            <p className="text-sm text-muted-foreground mt-2">Average effective rate. ≈ ${annualPropertyTax.toLocaleString()}/yr on a ${homePrice.toLocaleString()} home.</p>
            <Link href="/real-estate/property-tax-assessor-calculator" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4">Property tax calculator <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Income Tax</h2>
            <p className="text-3xl font-extrabold capitalize">{s.incomeTax === "none" ? "None" : s.incomeTax}</p>
            <p className="text-sm text-muted-foreground mt-2">{s.incomeTaxNote}</p>
            <Link href="/freelance/quarterly-estimated-tax-calculator" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4">Estimated tax calculator <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 content-prose max-w-none">
            <h2>How taxes work in {s.name}</h2>
            <p><strong>Sales tax.</strong> {s.salesTaxBase === 0 ? `${s.name} levies no statewide sales tax${s.salesTaxAvgCombined > 0 ? ", although some local jurisdictions add their own, which is why the average combined figure is not zero" : ""}.` : sRank <= 10 ? `${s.name} charges a ${s.salesTaxBase}% statewide sales tax, and local layers push the average combined rate to about ${s.salesTaxAvgCombined}% — one of the highest in the country (rank ${sRank} of 51). The combined figure, not the state rate, is the number that matters at the till.` : localGap >= 1.5 ? `${s.name} charges a ${s.salesTaxBase}% statewide sales tax, and county, city and district taxes add about ${localGap} points on top — which is why the average combined rate of about ${s.salesTaxAvgCombined}% is the number that matters at the till.` : `${s.name} charges a ${s.salesTaxBase}% statewide sales tax, and counties, cities and special districts add their own on top — which is why the average combined rate of about ${s.salesTaxAvgCombined}% is the number that matters at the till.`} {s.groceriesNote}</p>
            <p><strong>Property tax.</strong> At an average effective rate of about {s.propertyTaxAvg}%, a ${homePrice.toLocaleString()} home in {s.name} carries roughly ${annualPropertyTax.toLocaleString()} a year in property tax before exemptions. {s.propertyTaxAvg >= 1.5 ? `${s.name} is a high-property-tax state — factor the tax bill into affordability, not just the mortgage payment.` : s.propertyTaxAvg <= 0.6 ? `${s.name} is a low-property-tax state, which quietly lowers the true cost of owning there.` : "That is near the middle of US states."} {s.propertyTaxAvg >= 1.5 ? `County assessors set the actual bill, so check the county figure before you budget — the state average hides wide local gaps.` : s.propertyTaxAvg <= 0.6 ? `The county assessor's figure is the one that counts for a specific home — the state average is only a starting point.` : s.incomeTax === "none" ? `Local assessors set actual bills, so verify with the county for any specific property — in a no-income-tax state the property bill is one of the few state-level charges a homeowner sees.` : `Local assessors set actual bills, so verify with the county for any specific property.`}</p>
            <p><strong>Income tax.</strong> {s.incomeTaxNote} {s.incomeTax === "none" ? s.propertyTaxAvg >= 1.5 ? `Remember that 'no income tax' states fund services through other taxes — in ${s.name} the property tax does much of that work, so compare the full picture (sales, property) before assuming a move saves money.` : `Remember that 'no income tax' states fund services through other taxes — compare the full picture (sales, property) before assuming a move saves money.` : s.incomeTax === "flat" ? `If you are self-employed in ${s.name}, you still owe federal self-employment tax plus quarterly state estimates where applicable — the flat rate makes the state part easy to estimate.` : `If you are self-employed in ${s.name}, you still owe federal self-employment tax plus quarterly state estimates where applicable — and the top bracket is not your effective rate.`}</p>
            <div className="not-prose my-8">
              <TaxCompareChart title={`How ${s.name} compares with the US average`} groups={[
                { heading: "Sales tax · average combined", bars: [
                  { label: s.name, value: s.salesTaxAvgCombined, highlight: true },
                  { label: "US average", value: AVG_COMBINED },
                ]},
                { heading: "Property tax · average effective", bars: [
                  { label: s.name, value: s.propertyTaxAvg, highlight: true },
                  { label: "US average", value: AVG_PROPERTY },
                ]},
              ]} />
            </div>
            <h2>How {s.name} compares with similar states</h2>
            <p>{sRank <= 10 ? `The states closest to ${s.name} on average combined sales tax, near the top of the national table. Property tax is the average effective rate; income tax is shown as a structure, not a single rate.` : sRank >= 42 ? `The states closest to ${s.name} on average combined sales tax, near the bottom of the national table. Property tax is the average effective rate; income tax shows the structure — flat, progressive or none — not a single rate.` : s.propertyTaxAvg >= 1.5 ? `The states closest to ${s.name} on average combined sales tax. Property tax is the average effective rate — the heavier line in ${s.name} — and income tax shows the structure, not a single rate.` : `The states closest to ${s.name} on average combined sales tax. Property tax is the average effective rate; income tax shows the structure, not a single rate.`}</p>
            <div className="overflow-x-auto -mx-1 px-1"><table>
              <thead><tr><th>State</th><th>Combined sales tax</th><th>Property tax</th><th>Income tax</th></tr></thead>
              <tbody>
                <tr><td><strong>{s.name} (this page)</strong></td><td><strong>{s.salesTaxAvgCombined}%</strong></td><td><strong>{s.propertyTaxAvg}%</strong></td><td><strong>{s.incomeTax === "none" ? "None" : s.incomeTax === "flat" ? "Flat" : "Progressive"}</strong></td></tr>
                {peers.map((o) => (
                  <tr key={o.slug}><td><Link href={`/locations/${o.slug}`}>{o.name}</Link></td><td>{o.salesTaxAvgCombined}%</td><td>{o.propertyTaxAvg}%</td><td>{o.incomeTax === "none" ? "None" : o.incomeTax === "flat" ? "Flat" : "Progressive"}</td></tr>
                ))}
                <tr><td>All-state average (51 entries)</td><td>{AVG_COMBINED}%</td><td>{AVG_PROPERTY}%</td><td>—</td></tr>
              </tbody>
            </table></div>
            <h2>What this means for your money in {s.name}</h2>
            {overallMeaning(s).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <h2>Major cities in {s.name}</h2>
            <p>{s.majorCities.join(", ")}. {sRank <= 10 ? `The combined rate is not the same in every ${s.name} city — it can differ by more than a full percentage point inside the same state, because county and city layers stack on the state base. In a high-rate state that stacking is worth checking city by city. The ${s.name} sales tax guide breaks down the calculation city by city and links the calculator where you can enter your exact local rate.` : localGap >= 1.5 ? `The combined rate differs between these cities — sometimes by more than a full percentage point inside the same state — because about ${localGap} points of local tax stack on the state base. The ${s.name} sales tax guide breaks down the calculation and links the calculator — enter your exact local rate there.` : `Combined sales-tax rates differ between these cities — sometimes by more than a full percentage point inside the same state — because county and city layers stack on the state base. The ${s.name} sales tax guide breaks down the calculation and links the calculator where you can enter your exact local rate.`}</p>
            <h2>Calculators for {s.name} residents</h2>
            <ul>
              <li><Link href={`/sales-tax/${s.slug}`}>{s.name} Sales Tax Guide &amp; Examples</Link> — what you actually pay, with worked amounts.</li>
              <li><Link href="/ecommerce/sales-tax-vat-calculator">Sales Tax &amp; VAT Calculator</Link> — {localGap >= 1.5 ? `add or extract tax at any rate; with about ${localGap} points of local tax in ${s.name}, the exact local rate matters here.` : `add or extract tax at any rate, including your exact ${s.name} local rate.`}</li>
              <li><Link href="/real-estate/mortgage-amortization-calculator">Mortgage Calculator</Link> — include {s.name} property tax in the monthly payment.</li>
              <li><Link href="/real-estate/property-tax-assessor-calculator">Property Tax Calculator</Link> — estimate a specific property&apos;s bill.</li>
              <li><Link href="/freelance/self-employment-tax-calculator">Self-Employment Tax Calculator</Link> — federal SE tax for {s.name} freelancers.</li>
            </ul>
          </article>
          <aside className="lg:col-span-4 bg-card border rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4">{s.name} FAQs</h3>
<FaqAccordion items={faqs} variant="compact" />
          </aside>
        </div>

        <ReviewLine deptName={`${s.name} Department of Revenue`} />

        <h2 className="text-xl font-bold tracking-tight mt-14 mb-4">Other states</h2>
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/locations/${o.slug}`} className="text-xs bg-card border rounded-full px-3 py-1.5 hover:border-primary/40 hover:text-primary transition-colors">{o.name}</Link>
          ))}
        </div>
      </div>
    </main>
  )
}
