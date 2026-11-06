import { navigationCategories, getToolUrl } from "@/config/navigation"
import { US_STATES } from "@/data/locations/us-states"

/**
 * llms.txt — a plain-language map of the site for AI answer engines (AEO/GEO).
 * Lists every hub, tool and state guide with its URL so AI systems can cite
 * the right page. Generated from the same data as navigation + sitemap.
 */
export async function GET() {
  const lines: string[] = []
  lines.push("# DailyFinance.tools")
  lines.push("")
  lines.push("> Free financial calculators with transparent formulas for freelancers, creators, e-commerce sellers, real estate investors and personal wealth builders. Every calculator shows its formula, worked examples and FAQs. Reviewed by Tahir Shehzad, ACMA. Educational estimates, not financial advice.")
  lines.push("")
  lines.push("## Key pages")
  lines.push("- [All tools directory](https://dailyfinance.tools/tools)")
  lines.push("- [About](https://dailyfinance.tools/about)")
  lines.push("- [Methodology — sources & review process](https://dailyfinance.tools/methodology)")
  lines.push("- [Disclaimer](https://dailyfinance.tools/disclaimer)")
  lines.push("")
  for (const cat of navigationCategories) {
    lines.push(`## ${cat.name} calculators`)
    lines.push(`Hub: https://dailyfinance.tools/${cat.slug} — ${cat.description}`)
    for (const calc of cat.calculators) {
      lines.push(`- [${calc.title}](https://dailyfinance.tools${getToolUrl(calc.slug)}): ${calc.description}`)
    }
    lines.push("")
  }
  lines.push("## State tax guides (programmatic)")
  lines.push("- [All states index](https://dailyfinance.tools/locations)")
  for (const s of US_STATES) {
    lines.push(`- [${s.name} finance guide](https://dailyfinance.tools/locations/${s.slug}): sales tax ${s.salesTaxBase}% state (~${s.salesTaxAvgCombined}% combined), property tax avg ${s.propertyTaxAvg}%, income tax ${s.incomeTax}. Sales tax detail: https://dailyfinance.tools/sales-tax/${s.slug}`)
  }
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
