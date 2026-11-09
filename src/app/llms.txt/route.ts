import { navigationCategories, getToolUrl } from "@/config/navigation"
import { US_STATES } from "@/data/locations/us-states"
import { US_CITIES } from "@/data/locations/us-cities"
import { GUIDES } from "@/data/guides"
import { HUBS } from "@/data/hubs"

const BASE = "https://dailyfinance.tools"

/**
 * llms.txt — a plain-language map of the site for AI answer engines (AEO/GEO).
 * Lists every calculator with a one-line statement of what it computes, the
 * topic hubs, the editorial guides, and the state and city tax guides, so AI
 * systems can cite the right page. Generated from the same data as the
 * navigation and the sitemap.
 */
export async function GET() {
  const lines: string[] = []
  lines.push("# DailyFinance.tools")
  lines.push("")
  lines.push("> 100+ free financial calculators and plain-language finance guides for personal finance, mortgages, loans, taxes, retirement, freelancers, creators and e-commerce sellers. Calculators return instant estimates from the numbers you enter. Guides explain the underlying rules with worked examples. Reviewed by Tahir Shehzad, ACMA. Educational estimates, not financial advice.")
  lines.push("")
  lines.push("## Key pages")
  lines.push(`- [All tools directory](${BASE}/tools): every calculator on the site, grouped by topic`)
  lines.push(`- [Guides](${BASE}/guides): plain-language explainers on interest, mortgages, debt, taxes, retirement and pricing`)
  lines.push(`- [State tax guides](${BASE}/guides/states): how sales tax, income tax and property tax work in each US state`)
  lines.push(`- [Locations](${BASE}/locations): state-by-state tax rates and the calculators that use them`)
  lines.push(`- [About](${BASE}/about)`)
  lines.push(`- [Methodology — sources & review process](${BASE}/methodology)`)
  lines.push(`- [Disclaimer](${BASE}/disclaimer)`)
  lines.push("")
  for (const cat of navigationCategories) {
    lines.push(`## ${cat.name} calculators`)
    lines.push(`Hub: ${BASE}/${cat.slug} — ${cat.description}`)
    for (const calc of cat.calculators) {
      lines.push(`- [${calc.title}](${BASE}${getToolUrl(calc.slug)}): ${calc.description}`)
    }
    lines.push("")
  }
  lines.push("## Topic hubs")
  for (const h of HUBS) {
    lines.push(`- [${h.title}](${BASE}/hubs/${h.slug}): ${h.description}`)
  }
  lines.push("")
  lines.push("## Guides")
  for (const g of GUIDES) {
    lines.push(`- [${g.title}](${BASE}/guides/${g.slug}): ${g.description}`)
  }
  lines.push("")
  lines.push("## State tax guides (programmatic)")
  lines.push(`- [All states index](${BASE}/guides/states)`)
  for (const s of US_STATES) {
    lines.push(`- [${s.name} tax guide](${BASE}/guides/states/${s.slug}): sales tax ${s.salesTaxBase}% state (~${s.salesTaxAvgCombined}% combined), property tax avg ${s.propertyTaxAvg}%, income tax ${s.incomeTax}. State finance page: ${BASE}/locations/${s.slug}. Sales tax detail: ${BASE}/sales-tax/${s.slug}`)
  }
  lines.push("")
  lines.push("## City sales tax guides (programmatic)")
  for (const c of US_CITIES) {
    const s = US_STATES.find((x) => x.slug === c.stateSlug)
    lines.push(`- [${c.name}, ${s ? s.abbr : c.stateSlug} sales tax guide](${BASE}/guides/states/${c.stateSlug}/${c.slug}): combined rate ${c.combinedRate}%. Calculator: ${BASE}/sales-tax/${c.stateSlug}/${c.slug}`)
  }
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
