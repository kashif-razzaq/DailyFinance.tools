import Link from "next/link"
import Script from "next/script"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight, Calculator } from "lucide-react"
import { US_STATES, taxOn, type USState } from "@/data/locations/us-states"
import { US_CITIES } from "@/data/locations/us-cities"
import { AVG_COMBINED, AVG_PROPERTY, combinedRank, closestByCombined, highestCombined, lowestCombined, overallMeaning, pointsDiff, propertyRank } from "@/data/locations/stats"

export function generateStaticParams() {
  return US_STATES.map((s) => ({ state: s.slug }))
}

const getState = (slug: string) => US_STATES.find((s) => s.slug === slug)

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params
  const s = getState(state)
  if (!s) return {}
  return {
    title: `${s.name} Tax Guide 2026: Sales, Income & Property Tax Rates`,
    description: `How taxes work in ${s.name}: ${s.salesTaxBase}% state sales tax (${s.salesTaxAvgCombined}% average combined), ${s.incomeTax === "none" ? "no state income tax" : s.incomeTaxNote} and an average ${s.propertyTaxAvg}% property tax rate — with worked examples.`,
    alternates: { canonical: `https://dailyfinance.tools/guides/states/${s.slug}` },
  }
}

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US")

function incomeTaxParagraph(s: USState): string {
  if (s.incomeTax === "none")
    return `${s.name} levies no state income tax on wages. That raises take-home pay compared with an identical salary in a taxing state, but the revenue shows up elsewhere — in ${s.name} that usually means some mix of sales and property taxes, which is why the three taxes on this page should be read together.`
  if (s.incomeTax === "flat")
    return `${s.name} taxes income at a single flat rate. ${s.incomeTaxNote} A flat structure makes take-home pay easy to estimate: state tax is close to a fixed share of taxable income, after the state's own deductions and exemptions.`
  return `${s.name} taxes income progressively, in brackets, like the federal system. ${s.incomeTaxNote} Because brackets tax slices of income at rising rates, your effective state rate is always below your top (marginal) rate.`
}

export default async function StateGuidePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params
  const s = getState(state)
  if (!s) notFound()

  const examplePrice = 100
  const taxAtBase = (examplePrice * s.salesTaxBase) / 100
  const taxAtCombined = (examplePrice * s.salesTaxAvgCombined) / 100
  const homeValue = 400000
  const propertyTaxYear = (homeValue * s.propertyTaxAvg) / 100
  const cities = US_CITIES.filter((c) => c.stateSlug === s.slug)
  const sRank = combinedRank(s)
  const pRank = propertyRank(s)
  const vsAvg = pointsDiff(s.salesTaxAvgCombined, AVG_COMBINED)
  const peers = closestByCombined(s)
  const baskets = [25, 100, 500, 1000, 10000]
  const faqs = [
    {
      question: `What is the sales tax rate in ${s.name}?`,
      answer: `The statewide base rate in ${s.name} is ${s.salesTaxBase}%. With local taxes added, the average combined rate is about ${s.salesTaxAvgCombined}%, and the exact rate depends on where the sale takes place.`,
    },
    {
      question: `Does ${s.name} have a state income tax?`,
      answer: s.incomeTax === "none" ? `No. ${s.name} does not tax wage income at the state level.` : `Yes. ${s.incomeTaxNote}`,
    },
    {
      question: `Are groceries taxed in ${s.name}?`,
      answer: s.groceriesNote,
    },
    {
      question: `How does ${s.name} rank for sales tax nationally?`,
      answer: `${s.name}'s average combined rate of ${s.salesTaxAvgCombined}% ranks ${sRank} of 51 states and DC (1 = highest) — ${vsAvg > 0 ? `${vsAvg} points above` : vsAvg < 0 ? `${Math.abs(vsAvg)} points below` : "equal to"} the all-state average of ${AVG_COMBINED}%. The highest average combined rate is ${highestCombined(1)[0].name} at ${highestCombined(1)[0].salesTaxAvgCombined}%; the lowest is ${lowestCombined(1)[0].name} at ${lowestCombined(1)[0].salesTaxAvgCombined}%.`,
    },
    {
      question: `How much property tax do you pay in ${s.name}?`,
      answer: `The average effective property tax rate in ${s.name} is about ${s.propertyTaxAvg}% of a home's value per year — rank ${pRank} of 51, against an all-state average of ${AVG_PROPERTY}%. On a $400,000 home that is roughly ${money((400000 * s.propertyTaxAvg) / 100)} a year. County assessors set actual bills, and exemptions can reduce them.`,
    },
    {
      question: `Where can I verify ${s.name} tax rates?`,
      answer: `The rates in this guide are reviewed averages for planning. For a filing or a specific address, confirm the current rate with the ${s.name} Department of Revenue (sales and income tax) or the county assessor (property tax).`,
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
      <Script id={`schema-faq-state-${s.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="container mx-auto px-4 md:px-8 py-12 max-w-3xl">
        <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex-nowrap overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-6">
          <Link href="/" className="shrink-0 hover:text-foreground">Home</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/guides" className="shrink-0 hover:text-foreground">Guides</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <Link href="/guides/states" className="shrink-0 hover:text-foreground">States</Link><span aria-hidden="true" className="text-border shrink-0 select-none">›</span>
          <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-none text-foreground">{s.name}</span>
        </nav>
        <h1 className="text-3xl md:text-[2.6rem] font-extrabold tracking-tight leading-tight mb-5">{s.name} tax guide</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          Three taxes decide most everyday money calculations in {s.name}: what you pay at the register, what leaves
          your paycheck, and what your home costs each year. This guide sets out each one with the current figures,
          then links to the calculators that apply them. Rates are reviewed against state sources; confirm a
          specific transaction with the {s.name} Department of Revenue.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2">The short answer</h2>
          <p className="leading-relaxed">
            {s.name}: <strong>{s.salesTaxBase}%</strong> state sales tax, about <strong>{s.salesTaxAvgCombined}%</strong>{" "}
            average combined (rank <strong>{sRank} of 51</strong> — {vsAvg > 0 ? `${vsAvg} points above` : vsAvg < 0 ? `${Math.abs(vsAvg)} points below` : "equal to"} the {AVG_COMBINED}% all-state average),{" "}
            {s.incomeTax === "none" ? <strong>no state income tax</strong> : <>a <strong>{s.incomeTax}</strong> income tax</>}, and an
            average effective property tax of <strong>{s.propertyTaxAvg}%</strong> (rank {pRank} of 51). On a $100
            purchase at the average combined rate, the tax is {money(taxOn(100, s.salesTaxAvgCombined))}.
          </p>
        </div>

        <div className="content-prose">
          <h2>Sales tax in {s.name}</h2>
          <p>
            The statewide base rate is <strong>{s.salesTaxBase}%</strong>. Counties, cities and special districts add
            their own layers, bringing the average combined rate to about <strong>{s.salesTaxAvgCombined}%</strong> —
            and the rate at a specific address can sit well above or below that average. On a {money(examplePrice)}{" "}
            purchase, the tax is {money(taxAtBase)} at the base rate and roughly {money(taxAtCombined)} at the
            average combined rate. The difference is local tax, which is why two towns in the same state can charge
            noticeably different totals on the same item.
          </p>
          <p>{s.groceriesNote}</p>
          <h3>Worked examples at the average combined rate</h3>
          <p>What the {s.salesTaxAvgCombined}% average combined rate adds to purchases of different sizes:</p>
          <div className="overflow-x-auto -mx-1 px-1"><table>
            <thead>
              <tr><th>Purchase</th><th>Tax</th><th>Total</th></tr>
            </thead>
            <tbody>
              {baskets.map((amt) => (
                <tr key={amt}><td>{money(amt)}</td><td>{money(taxOn(amt, s.salesTaxAvgCombined))}</td><td>{money(amt + taxOn(amt, s.salesTaxAvgCombined))}</td></tr>
              ))}
            </tbody>
          </table></div>
          <p>
            If you sell into {s.name} from another state, economic nexus rules can oblige you to collect its tax once
            your sales pass the state&apos;s threshold — the exact threshold and what counts toward it are in the{" "}
            <Link href={`/sales-tax/${s.slug}`}>{s.name} sales tax calculator and rate page</Link>, and the data hub
            for the state is the <Link href={`/locations/${s.slug}`}>{s.name} locations page</Link>.
          </p>

          <h2>Income tax in {s.name}</h2>
          <p>{incomeTaxParagraph(s)}</p>
          <p>
            Federal tax applies the same everywhere; the state layer is what changes a paycheck between two states.
            Run the same salary through the{" "}
            <Link href="/tax/paycheck-calculator">paycheck calculator</Link> and the{" "}
            <Link href="/tax/take-home-pay-calculator">take-home pay calculator</Link> with and without a state rate
            to see the size of the difference before negotiating a move or a remote-work arrangement.
          </p>

          <h2>Property tax in {s.name}</h2>
          <p>
            The average effective property tax rate in {s.name} is about <strong>{s.propertyTaxAvg}%</strong> of a
            home&apos;s value per year. On a {money(homeValue)} home that is roughly {money(propertyTaxYear)} a year, or{" "}
            {money(propertyTaxYear / 12)} a month — a real line in the housing budget, collected through escrow in
            most mortgages. Averages hide wide local variation: the county and school district set most of the rate,
            and homestead exemptions can cut the taxable value for owner-occupiers.
          </p>

          <h2>How {s.name} compares</h2>
          <p>
            The states closest to {s.name} on average combined sales tax, with the national extremes for scale. The
            all-state averages across the 51 entries are {AVG_COMBINED}% for combined sales tax and {AVG_PROPERTY}%
            for property tax.
          </p>
          <div className="overflow-x-auto -mx-1 px-1"><table>
            <thead>
              <tr><th>State</th><th>Combined sales tax</th><th>Property tax</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>{s.name} (this guide)</strong></td><td><strong>{s.salesTaxAvgCombined}%</strong></td><td><strong>{s.propertyTaxAvg}%</strong></td></tr>
              {peers.map((o) => (
                <tr key={o.slug}><td><Link href={`/guides/states/${o.slug}`}>{o.name}</Link></td><td>{o.salesTaxAvgCombined}%</td><td>{o.propertyTaxAvg}%</td></tr>
              ))}
              {highestCombined(1).map((o) => o.slug !== s.slug && (
                <tr key={o.slug}><td><Link href={`/guides/states/${o.slug}`}>{o.name}</Link> — highest combined</td><td>{o.salesTaxAvgCombined}%</td><td>{o.propertyTaxAvg}%</td></tr>
              ))}
              {lowestCombined(1).map((o) => o.slug !== s.slug && (
                <tr key={o.slug}><td><Link href={`/guides/states/${o.slug}`}>{o.name}</Link> — lowest combined</td><td>{o.salesTaxAvgCombined}%</td><td>{o.propertyTaxAvg}%</td></tr>
              ))}
            </tbody>
          </table></div>

          <h2>What this means for your money</h2>
          {overallMeaning(s).map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>Key figures</h2>
          <div className="overflow-x-auto -mx-1 px-1"><table>
            <thead>
              <tr><th>Figure</th><th>{s.name}</th></tr>
            </thead>
            <tbody>
              <tr><td>State sales tax (base)</td><td>{s.salesTaxBase}%</td></tr>
              <tr><td>Average combined sales tax</td><td>{s.salesTaxAvgCombined}%</td></tr>
              <tr><td>Groceries</td><td>{s.groceries === "exempt" ? "Exempt (state level)" : s.groceries === "reduced" ? "Reduced rate" : "Taxed"}</td></tr>
              <tr><td>Income tax structure</td><td>{s.incomeTax === "none" ? "None" : s.incomeTax === "flat" ? "Flat rate" : "Progressive brackets"}</td></tr>
              <tr><td>Average effective property tax</td><td>{s.propertyTaxAvg}%</td></tr>
              <tr><td>Capital</td><td>{s.capital}</td></tr>
              <tr><td>Largest city</td><td>{s.largestCity}</td></tr>
            </tbody>
          </table></div>

          {cities.length > 0 && (
            <>
              <h2>City guides in {s.name}</h2>
              <p>Combined rates inside the largest cities, and how each is built:</p>
              <ul>
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/guides/states/${s.slug}/${c.slug}`}>{c.name} sales tax guide</Link> — {c.combinedRate}% combined
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-5">{s.name} tax FAQs</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold mb-1">{f.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="mt-12 bg-[#064E3B] text-white rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold mb-1 flex items-center gap-2"><Calculator className="h-5 w-5" /> Calculators for {s.name}</h2>
          <p className="text-white/80 text-sm mb-5">Apply these rates to your own numbers.</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/sales-tax/${s.slug}`} className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
              {s.name} sales tax <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/ecommerce/sales-tax-vat-calculator" className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
              Sales tax calculator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/tax/paycheck-calculator" className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
              Paycheck calculator <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/real-estate/mortgage-amortization-calculator" className="inline-flex items-center gap-2 bg-white text-[#064E3B] text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-emerald-50 transition-colors">
              Mortgage calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        <p className="mt-10 text-sm text-muted-foreground">
          Rates are approximations for a typical address and are reviewed on the cadence described in our{" "}
          <Link href="/methodology" className="underline underline-offset-2">methodology</Link>. For a filing
          decision, confirm with the {s.name} Department of Revenue.
        </p>
      </article>
    </main>
  )
}
