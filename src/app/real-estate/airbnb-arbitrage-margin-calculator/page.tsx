import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Airbnb Calculator: Arbitrage Margin, Occupancy & Short-Term Rental Profit',
  description: 'Calculate Airbnb and short-term rental profit: ADR × occupancy minus rent or mortgage, platform fees, cleaning and running costs. Arbitrage and owned modes included.',
  keywords: ['airbnb calculator', 'airbnb arbitrage calculator', 'short term rental calculator', 'airbnb profit calculator', 'airbnb occupancy calculator'],
  slug: "real-estate/airbnb-arbitrage-margin-calculator",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the Airbnb Arbitrage & STR Margin Calculator?",
    "answer": "Choose arbitrage (you lease the unit) or owned (you hold the mortgage). Enter a realistic ADR from comparable live listings \u2014 not the best weekend rate. Set occupancy conservatively: 60\u201370% is a strong mature listing; new listings ramp slower. Add cleaning by turnover, utilities and supplies. If profit survives conservative inputs, investigate the market seriously."
  },
  {
    "question": "What is the formula behind the Airbnb Arbitrage & STR Margin Calculator?",
    "answer": "Gross = ADR \u00d7 (30 \u00d7 Occupancy) \u00b7 Profit = Gross \u2212 Platform Fees \u2212 Cleaning \u2212 Housing \u2212 Utilities \u2212 Supplies \u00b7 Margin = Profit \u00f7 Gross \u2014 Cleaning cost scales with turnovers, not nights: booked nights divided by average stay length. Revenue per available room (RevPAR = ADR \u00d7 occupancy) is the benchmark hosts compare across markets."
  },
  {
    "question": "Worked example: what does a realistic Airbnb Arbitrage result look like?",
    "answer": "ADR $150 at 70% occupancy books 21 nights and grosses $3,150. Platform fees at 3% take $95; seven turnovers at $75 cleaning cost $525; rent is $1,800; utilities and supplies $370. Profit is about $360 a month \u2014 a margin near 11%. It works, but thinly: a five-point occupancy drop erases most of it, which is why arbitrageurs negotiate rent hard and target corporate-stay demand that holds up midweek."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Arbitrage without written consent: Subletting to short-term guests without the landlord's written permission breaches most leases and can end the tenancy and the business. Get consent, in the lease, naming short-term rental explicitly."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='Airbnb Arbitrage & STR Margin Calculator' description='Calculate Airbnb and short-term rental profit: ADR × occupancy minus rent or mortgage, platform fees, cleaning and running costs. Arbitrage and owned modes included.' slug="airbnb-arbitrage-margin-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">Short-term rental profit is booked revenue — average daily rate times occupied nights — minus platform fees, cleaning, housing cost and running costs. In arbitrage, housing cost is your lease rent; in an owned unit it is PITI. Margin is profit divided by gross revenue, and occupancy is the variable that decides almost everything.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Airbnb arbitrage promises real estate income without real estate ownership: lease a property long-term with the landlord's consent, furnish it, and rent it short-term at a nightly rate that exceeds the monthly rent divided by thirty. The spread between nightly revenue and monthly costs is the business. It is a hospitality business wearing a property costume — reviews, cleaning reliability and response times matter as much as location.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Two numbers drive everything: average daily rate (ADR) and occupancy. Their product is revenue per available night (RevPAR), the figure professional hosts optimise. Raising ADR 10% while holding occupancy beats almost any cost cut, which is why photography, furnishing quality and dynamic pricing tools pay for themselves. But ADR is set by your competition's calendars, not your hopes — underwrite from comparable listings' actual booked rates across seasons.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">Gross = ADR × (30 × Occupancy) · Profit = Gross − Platform Fees − Cleaning − Housing − Utilities − Supplies · Margin = Profit ÷ Gross</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">Cleaning cost scales with turnovers, not nights: booked nights divided by average stay length. Revenue per available room (RevPAR = ADR × occupancy) is the benchmark hosts compare across markets.</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Choose arbitrage (you lease the unit) or owned (you hold the mortgage).</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter a realistic ADR from comparable live listings — not the best weekend rate.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Set occupancy conservatively: 60–70% is a strong mature listing; new listings ramp slower.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Add cleaning by turnover, utilities and supplies. If profit survives conservative inputs, investigate the market seriously.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Costs in short-term rentals behave differently from long-term lets. Cleaning scales with turnovers, so short stays are expensive to serve; utilities are yours; supplies, linen replacement and platform fees recur monthly; and vacancy is not a percentage reserve but entire empty weeks. This calculator forces those costs into the open, by turnover and by month, so a glossy revenue screenshot cannot hide a negative margin.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">If you own the property instead, the same engine applies with PITI in place of rent, and the comparison changes character: monthly profit may be similar, but ownership adds equity paydown, appreciation and tax treatment, at the cost of capital and permanence. Many successful hosts start with one owned unit, prove operations, then scale with arbitrage where the numbers survive conservative occupancy — not the reverse.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Whatever the mode, treat regulation and consent as gate zero. A profitable spreadsheet inside a prohibited use is worth nothing. Secure the landlord's written consent or the city's permit first, confirm insurance covers short-term guests, and only then sign, furnish and list.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: Arbitrage two-bed in a business district</h3><p className="text-neutral-600 font-light leading-relaxed m-0">ADR $150 at 70% occupancy books 21 nights and grosses $3,150. Platform fees at 3% take $95; seven turnovers at $75 cleaning cost $525; rent is $1,800; utilities and supplies $370. Profit is about $360 a month — a margin near 11%. It works, but thinly: a five-point occupancy drop erases most of it, which is why arbitrageurs negotiate rent hard and target corporate-stay demand that holds up midweek.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Owned condo, same numbers, different risk</h3><p className="text-neutral-600 font-light leading-relaxed m-0">The same unit owned with PITI of $1,650 instead of $1,800 rent produces about $510 a month — plus loan paydown and appreciation the arbitrage model never sees. The trade: your capital is committed, you carry vacancy risk in slow seasons, and HOA or city rule changes can end the listing. Arbitrage risks little capital but the landlord or city can end the business; ownership risks more capital with more control. The calculator's two modes exist to make that trade explicit.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Arbitrage without written consent</strong><span className="text-neutral-600 font-light leading-relaxed">Subletting to short-term guests without the landlord's written permission breaches most leases and can end the tenancy and the business. Get consent, in the lease, naming short-term rental explicitly.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Pricing occupancy from peak season</strong><span className="text-neutral-600 font-light leading-relaxed">Annual occupancy includes the dead months. Model the slow season first; peak months are upside, not the plan.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Ignoring regulation</strong><span className="text-neutral-600 font-light leading-relaxed">Many cities require permits, cap nights, or ban non-owner-occupied STRs — and HOAs ban them outright. Verify before signing anything.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Treating cleaning fees as pure profit</strong><span className="text-neutral-600 font-light leading-relaxed">Guests pay cleaning fees, but cleaners charge per turnover and costs rise with stay frequency. Model cleaning as a cost, then treat any fee surplus as a bonus.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
