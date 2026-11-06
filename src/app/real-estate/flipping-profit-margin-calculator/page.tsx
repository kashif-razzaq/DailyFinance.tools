import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'House Flipping Calculator: 70% Rule, Profit Margin & Maximum Offer',
  description: 'Calculate flip profit, ROI and profit margin, and your maximum offer with the 70% rule: ARV × 70% minus rehab. Includes holding, buying and selling costs.',
  keywords: ['house flipping calculator', '70 percent rule calculator', 'flip calculator', 'house flip profit calculator', 'maximum allowable offer calculator'],
  slug: "real-estate/flipping-profit-margin-calculator",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the House Flipping & 70% Rule Calculator?",
    "answer": "Start with ARV from sold comparables of renovated homes \u2014 never from the listing price. Enter a rehab budget built from contractor quotes, plus contingency. The calculator flags whether your purchase price respects the 70% rule maximum. Add honest holding months and selling costs, then judge profit and ROI \u2014 not gross spread."
  },
  {
    "question": "What is the formula behind the House Flipping & 70% Rule Calculator?",
    "answer": "Maximum Offer = (ARV \u00d7 0.70) \u2212 Rehab \u00b7 Profit = ARV \u2212 Purchase \u2212 Rehab \u2212 Holding \u2212 Buying \u2212 Selling Costs \u2014 Selling costs are typically 6\u201310% of ARV (agent commissions, closing, concessions). Holding costs accrue monthly: loan interest, tax, insurance and utilities for every month you own the property."
  },
  {
    "question": "Worked example: what does a realistic House Flipping result look like?",
    "answer": "ARV $400,000 and rehab $50,000 give a maximum offer of $230,000. Buy at $230,000, spend the $50,000, hold six months at $1,200 a month ($7,200), pay 2% buying costs ($4,600) and 8% selling costs ($32,000). Total in is $323,800 against a $400,000 sale: profit about $76,200, an ROI of about 26% on total cash in for six months of risk. The rule worked because every cost the 30% cushion was designed to absorb actually fit inside it."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Estimating ARV from active listings: Flips are valued on sold comparables. Listed prices are hopes; closed prices are evidence \u2014 and your buyer's appraisal will use closed prices."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='House Flipping & 70% Rule Calculator' description='Calculate flip profit, ROI and profit margin, and your maximum offer with the 70% rule: ARV × 70% minus rehab. Includes holding, buying and selling costs.' slug="flipping-profit-margin-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">The 70% rule sets your maximum offer: after-repair value times 70%, minus rehab costs. The missing 30% is meant to absorb holding costs, buying and selling costs and your profit. True flip profit is ARV minus purchase, rehab, holding, buying and selling costs — and ROI divides that profit by all the cash you put in.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Flipping compresses a year of real estate risk into a few months: you buy a problem, fund a renovation, and resell into a market that owes you nothing. The investors who survive it are not the boldest — they are the ones whose purchase price already accounted for everything that could go wrong. That is the entire purpose of the 70% rule: it prices the property so that holding costs, transaction costs and a real profit all fit between your all-in cost and the resale value.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Understand what the rule's 30% must cover, because on expensive homes it may not be enough and on cheap homes it may be generous. Selling a $400,000 home costs roughly $32,000 in commissions and closing; six months of holding might cost $8,000–$15,000; buying costs add several thousand more. What remains is profit and contingency. On a $150,000 ARV the same percentages leave a far thinner cushion in dollars, which is why many flippers tighten to 65% on low-price properties.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">Maximum Offer = (ARV × 0.70) − Rehab · Profit = ARV − Purchase − Rehab − Holding − Buying − Selling Costs</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">Selling costs are typically 6–10% of ARV (agent commissions, closing, concessions). Holding costs accrue monthly: loan interest, tax, insurance and utilities for every month you own the property.</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Start with ARV from sold comparables of renovated homes — never from the listing price.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter a rehab budget built from contractor quotes, plus contingency.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">The calculator flags whether your purchase price respects the 70% rule maximum.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Add honest holding months and selling costs, then judge profit and ROI — not gross spread.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Rehab is where flips are won operationally. Cosmetic renovations (paint, flooring, fixtures, kitchen refresh) return value reliably; structural surprises (foundations, sewer lines, unpermitted additions) consume it. Get the inspection, scope the work in writing, sequence trades properly, and resist upgrading beyond the neighbourhood's ceiling — the most expensive mistake in flipping is building the nicest house on the street and asking buyers to fund your taste.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Financing changes the maths materially. Cash avoids interest but concentrates capital; hard-money loans at 10–14% plus points make the hold period a meter running at thousands per month, which the calculator's holding-cost field must reflect honestly. Run the deal at your real cost of money and a realistic timeline — then run it again two months longer, because that second run is the one reality most often delivers.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Finally, know your market's exit temperature before you buy: days on market for renovated homes, price reductions in the segment, and the depth of the buyer pool at your ARV. A flip is a short position on local housing demand. When the calculator shows strong profit at a disciplined price with a contingency intact, you have a deal worth pursuing — with contracts, permits and insurance handled as carefully as the numbers.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A textbook 70% rule flip</h3><p className="text-neutral-600 font-light leading-relaxed m-0">ARV $400,000 and rehab $50,000 give a maximum offer of $230,000. Buy at $230,000, spend the $50,000, hold six months at $1,200 a month ($7,200), pay 2% buying costs ($4,600) and 8% selling costs ($32,000). Total in is $323,800 against a $400,000 sale: profit about $76,200, an ROI of about 26% on total cash in for six months of risk. The rule worked because every cost the 30% cushion was designed to absorb actually fit inside it.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Paying $20,000 over the maximum</h3><p className="text-neutral-600 font-light leading-relaxed m-0">Buy the same house at $250,000 'because the market is hot' and profit falls to about $56,000 — if rehab and timeline hold. Now let rehab overrun by $10,000 and the hold stretch to nine months: profit shrinks toward $42,000 and ROI toward 13%, for a project carrying contractor, appraisal and market risk throughout. The 70% rule is not superstition; it is pre-purchased forgiveness for the overruns that flipping reliably produces.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Estimating ARV from active listings</strong><span className="text-neutral-600 font-light leading-relaxed">Flips are valued on sold comparables. Listed prices are hopes; closed prices are evidence — and your buyer's appraisal will use closed prices.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">A rehab budget without contingency</strong><span className="text-neutral-600 font-light leading-relaxed">Open a wall and the budget changes. Carry at least 10–20% contingency, more on older homes and first projects.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting selling costs</strong><span className="text-neutral-600 font-light leading-relaxed">Commissions and closing costs take 6–10% of the sale price. Spreadsheets that end at 'ARV minus purchase minus rehab' overstate profit by tens of thousands.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">No exit if it doesn't sell</strong><span className="text-neutral-600 font-light leading-relaxed">Price reductions and a rental fallback should be planned before purchase. A flip that cannot sell at ARV becomes a very expensive long-term rental.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
