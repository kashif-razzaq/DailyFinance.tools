import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import { US_STATES, getStateBySlug, taxOn } from "@/data/locations/us-states"
import { AVG_COMBINED, AVG_PROPERTY, combinedRank, closestByCombined, overallMeaning, pointsDiff, propertyRank } from "@/data/locations/stats"
import { ArrowRight, MapPin } from "lucide-react"

export function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params
  const s = getStateBySlug(state)
  if (!s) return { title: "State Not Found" }
  return {
    title: `${s.name} Taxes & Finance Guide — Sales Tax ${s.salesTaxBase}%, Property & Income Tax Explained`,
    description: `${s.name} (${s.abbr}) finance guide: ${s.salesTaxBase}% state sales tax (~${s.salesTaxAvgCombined}% average combined), ${s.propertyTaxAvg}% average property tax, ${s.incomeTax === "none" ? "no tax on wage income" : s.incomeTax + " income tax"}, grocery tax treatment, plus the calculators that use these rates.`,
    alternates: { canonical: `https://dailyfinance.tools/locations/${s.slug}` },
    openGraph: {
      title: `${s.name} Taxes & Finance Guide — Sales Tax ${s.salesTaxBase}%, Property & Income Tax Explained`,
      description: `${s.name} (${s.abbr}) finance guide: ${s.salesTaxBase}% state sales tax (~${s.salesTaxAvgCombined}% average combined), ${s.propertyTaxAvg}% average property tax, ${s.incomeTax === "none" ? "no tax on wage income" : s.incomeTax + " income tax"}, grocery tax treatment, plus the calculators that use these rates.`,
      url: `https://dailyfinance.tools/locations/${s.slug}`,
      siteName: "DailyFinance.tools",
      locale: "en_US",
      type: "website",
      images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: `${s.name} Taxes & Finance Guide — Sales Tax ${s.salesTaxBase}%, Property & Income Tax Explained` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${s.name} Taxes & Finance Guide — Sales Tax ${s.salesTaxBase}%, Property & Income Tax Explained`,
      description: `${s.name} (${s.abbr}) finance guide: ${s.salesTaxBase}% state sales tax (~${s.salesTaxAvgCombined}% average combined), ${s.propertyTaxAvg}% average property tax, ${s.incomeTax === "none" ? "no tax on wage income" : s.incomeTax + " income tax"}, grocery tax treatment, plus the calculators that use these rates.`,
      images: ["https://dailyfinance.tools/images/og-base.jpg"],
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
  const peers = closestByCombined(s)
  const faqs = [
    {
      question: `What is the sales tax rate in ${s.name}?`,
      answer: s.salesTaxBase === 0
        ? `${s.name} has no statewide sales tax${s.salesTaxAvgCombined > 0 ? `, though some local areas levy their own, giving an average combined rate of about ${s.salesTaxAvgCombined}%` : " at state or local level in most areas"}.`
        : `The statewide sales tax rate in ${s.name} is ${s.salesTaxBase}%. With county, city and district taxes added, the average combined rate shoppers actually pay is about ${s.salesTaxAvgCombined}%. Your exact rate depends on where in ${s.name} you buy.`,
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
      answer: `${s.name}'s average combined sales tax of ${s.salesTaxAvgCombined}% ranks ${sRank} of 51 (all-state average ${AVG_COMBINED}%), and its average effective property tax of ${s.propertyTaxAvg}% ranks ${pRank} of 51 (all-state average ${AVG_PROPERTY}%). Its income tax is ${s.incomeTax === "none" ? "none at state level" : s.incomeTax === "flat" ? "a single flat rate" : "progressive, in brackets"}. No state is cheapest on all three — the comparison that matters depends on whether you earn, spend or own property there.`,
    },
    {
      question: `Where can I verify ${s.name} tax rates before filing or buying?`,
      answer: `The figures here are reviewed averages for planning. Combined sales tax varies by exact address, and property tax bills are set by the county. Verify a specific rate or bill with the ${s.name} Department of Revenue or the county assessor before filing, pricing or a major purchase.`,
    },
  ]
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dailyfinance.tools/" },
    { "@type": "ListItem", position: 2, name: "Locations", item: "https://dailyfinance.tools/locations" },
    { "@type": "ListItem", position: 3, name: s.name, item: `https://dailyfinance.tools/locations/${s.slug}` },
  ] }
  const others = US_STATES.filter((o) => o.slug !== s.slug)

  return (
    <main className="w-full bg-background min-h-screen">
      <Script id={`schema-state-faq-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id={`schema-state-crumb-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container mx-auto px-4 md:px-8 py-14">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/locations" className="shrink-0 hover:text-foreground">Locations</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">{s.name}</span>
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 flex items-start gap-3"><MapPin className="h-9 w-9 text-primary shrink-0 mt-1" /> {s.name} Taxes &amp; Finance Guide</h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-10">
          The money facts for {s.name} ({s.abbr}) — capital {s.capital}, largest city {s.largestCity}. Sales tax, property tax and income tax explained with real numbers, plus the DailyFinance calculators that use {s.name} rates.
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
            <p><strong>Sales tax.</strong> {s.salesTaxBase === 0 ? `${s.name} levies no statewide sales tax${s.salesTaxAvgCombined > 0 ? ", although some local jurisdictions add their own, which is why the average combined figure is not zero" : ""}.` : `${s.name} charges a ${s.salesTaxBase}% statewide sales tax, and counties, cities and special districts add their own on top — which is why the average combined rate of about ${s.salesTaxAvgCombined}% is the number that matters at the till.`} {s.groceriesNote}</p>
            <p><strong>Property tax.</strong> At an average effective rate of about {s.propertyTaxAvg}%, a ${homePrice.toLocaleString()} home in {s.name} carries roughly ${annualPropertyTax.toLocaleString()} a year in property tax before exemptions. {s.propertyTaxAvg >= 1.5 ? `${s.name} is a high-property-tax state — factor the tax bill into affordability, not just the mortgage payment.` : s.propertyTaxAvg <= 0.6 ? `${s.name} is a low-property-tax state, which quietly lowers the true cost of owning there.` : "That is near the middle of US states."} Local assessors set actual bills, so verify with the county for any specific property.</p>
            <p><strong>Income tax.</strong> {s.incomeTaxNote} {s.incomeTax === "none" ? "Remember that 'no income tax' states fund services through other taxes — compare the full picture (sales, property) before assuming a move saves money." : "If you are self-employed in " + s.name + ", you still owe federal self-employment tax plus quarterly state estimates where applicable."}</p>
            <h2>How {s.name} compares with similar states</h2>
            <p>The states closest to {s.name} on average combined sales tax. Property tax is the average effective rate; income tax shows the structure, not a single rate.</p>
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
            <p>{s.majorCities.join(", ")}. Combined sales-tax rates differ between these cities — sometimes by more than a full percentage point inside the same state — because county and city layers stack on the state base. The {s.name} sales tax guide breaks down the calculation and links the calculator where you can enter your exact local rate.</p>
            <h2>Calculators for {s.name} residents</h2>
            <ul>
              <li><Link href={`/sales-tax/${s.slug}`}>{s.name} Sales Tax Guide &amp; Examples</Link> — what you actually pay, with worked amounts.</li>
              <li><Link href="/ecommerce/sales-tax-vat-calculator">Sales Tax &amp; VAT Calculator</Link> — add or extract tax at any rate, including your exact {s.name} local rate.</li>
              <li><Link href="/real-estate/mortgage-amortization-calculator">Mortgage Calculator</Link> — include {s.name} property tax in the monthly payment.</li>
              <li><Link href="/real-estate/property-tax-assessor-calculator">Property Tax Calculator</Link> — estimate a specific property&apos;s bill.</li>
              <li><Link href="/freelance/self-employment-tax-calculator">Self-Employment Tax Calculator</Link> — federal SE tax for {s.name} freelancers.</li>
            </ul>
            <p className="text-sm">Rates on this page are reviewed approximations for planning (see <Link href="/methodology">Methodology</Link>). Verify current rates with the {s.name} Department of Revenue before filing or pricing.</p>
          </article>
          <aside className="lg:col-span-4 bg-card border rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4">{s.name} FAQs</h3>
            <div className="space-y-5">
              {faqs.map((f) => (
                <div key={f.question}>
                  <h4 className="font-semibold text-sm mb-1">{f.question}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

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
