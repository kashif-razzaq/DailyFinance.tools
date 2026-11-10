import type { Metadata } from "next"
import { CategoryHub } from "@/components/layout/CategoryHub"
import { generateCalculatorMetadata } from "@/config/metadata"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Pro Tools — Advanced Financial Simulators & Analyzers",
  description:
    "DailyFinance Pro tools: Monte Carlo retirement simulator, rental property analyzer, business valuation, IRR & NPV analyzer and portfolio rebalancer.",
  keywords: ["monte carlo retirement simulator", "rental property analyzer", "business valuation calculator", "irr npv analyzer", "portfolio rebalancer"],
  slug: "pro",
  category: "Tools",
})

export default function Page() {
  return (
    <CategoryHub
      categorySlug="pro"
      quickAnswer={
        "The Pro tools are the five advanced instruments on DailyFinance: a Monte Carlo retirement simulator that runs 1,000 market futures instead of one average projection, a rental property analyzer that scores a deal on cash flow, cap rate, cash-on-cash and DSCR together, a business valuation calculator that runs SDE multiples and a discounted cash flow side by side, an IRR & NPV analyzer for arbitrary cash-flow series, and a portfolio rebalancer that outputs the actual buy/sell trade list. Every guide on these pages is free to read; the interactive tools unlock with Pro at $2.99 a month. Every free calculator on the site stays free."
      }
      intro={[
        "Free calculators answer arithmetic questions: what is the payment, what is the total, what does this grow to at a fixed rate? The questions that decide real money are usually one level up — not 'what does my plan grow to at 7%' but 'in how many futures does my plan survive at all'. Averages hide the answer, because a portfolio that averages 7% but crashes in year two of retirement is a different plan from one that averages 7% smoothly. That is the gap the Pro tools exist to close: distributions instead of points, verdicts instead of raw outputs, and several methods on the same question so the disagreement between them becomes part of the answer.",
        "Each tool is built to the same standard as the free library: the formula is shown, a worked example is computed in the guide below it, and the numbers on the page are produced by the same code the tool runs. The Monte Carlo simulator uses a fixed random seed, so the result you read about in its guide is the result on your screen for the same inputs — you can check our maths against your own future inputs before you ever pay. Pro membership also removes ads and unlocks the unlimited Scenario Vault, CSV and Excel exports, PDF reports and cross-data analytics across the free tools.",
        "Nothing here is a sales funnel disguised as a calculator. The rental analyzer will tell you a deal loses money when it loses money; the valuation calculator shows you the lower market-method range next to the flattering DCF, not instead of it; the IRR analyzer says 'no meaningful IRR exists' when a cash-flow pattern has none. Tools that only ever deliver good news are marketing. These are instruments, and instruments are allowed to say no."
      ]}
      decisions={[
        { need: "Will my retirement plan actually survive?", toolSlug: "monte-carlo-retirement-simulator", why: "runs 1,000 futures and reports the success rate and the bad-luck outcomes, in today's dollars." },
        { need: "Judging a rental property before you offer", toolSlug: "rental-property-analyzer", why: "cash flow, cap rate, cash-on-cash, DSCR and GRM in one pass, with every expense line modelled." },
        { need: "Buying, selling or pricing a business", toolSlug: "business-valuation-calculator", why: "market multiples for seven industries next to a full DCF, so you see the negotiation range." },
        { need: "Any investment with uneven cash flows", toolSlug: "irr-npv-analyzer", why: "NPV, IRR, payback and profitability index together, with a verdict when they disagree." },
        { need: "Bringing a drifted portfolio back to target", toolSlug: "portfolio-rebalancer", why: "outputs the exact self-funding trade list, sells first, then buys." },
      ]}
      faqs={[
        { question: "Why are these tools Pro when the others are free?", answer: "The free library answers single-formula questions and always stays free — that is the deal the site is built on. The Pro tools run simulations and multi-method analyses (1,000-path Monte Carlo, dual-method valuation, full deal underwriting) that cost more to build and maintain, and they are the working toolkit of people who make these decisions repeatedly. Pro is $2.99 a month and also removes ads and unlocks the Vault, exports and analytics everywhere else." },
        { question: "Can I read about a Pro tool before paying?", answer: "Yes — every Pro tool page carries its full guide in the open: what it computes, the formula, and a worked example whose numbers match the tool's own output for the example inputs. Only the interactive tool itself is locked." },
        { question: "Do Pro tools work in my currency?", answer: "Yes. Like every calculator on the site, the Pro tools follow the currency switcher in the header — amounts, results and exports all render in the selected currency. The maths is currency-neutral; only the symbol changes." },
      ]}
    />
  )
}
