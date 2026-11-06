import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Calculator & Amortization Schedule: Payment, PITI & Total Interest',
  description: 'Free mortgage calculator with amortization schedule: monthly payment (PITI), total interest, PMI and the effect of extra payments. The complete mortgage payment calculator.',
  keywords: ['mortgage calculator', 'mortgage payment calculator', 'amortization calculator', 'mortgage amortization calculator', 'mortgage calculator with taxes and insurance', 'extra payment mortgage calculator'],
  slug: "real-estate/mortgage-amortization-calculator",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the Mortgage Calculator & Amortization Schedule?",
    "answer": "Enter home price and down payment \u2014 the difference is the loan the formula amortizes. Add your rate and term, then property tax and insurance to see true PITI, not just P&I. If your down payment is under 20%, note the PMI line; it falls away at 80% loan-to-value. Add an extra monthly payment and watch total interest and payoff time fall \u2014 then read the yearly schedule to see why."
  },
  {
    "question": "What is the formula behind the Mortgage Calculator & Amortization Schedule?",
    "answer": "M = P \u00d7 r(1+r)^n \u00f7 ((1+r)^n \u2212 1) \u00b7 Total Payment = M + Tax + Insurance + PMI + HOA \u2014 P is the loan amount, r the monthly rate (annual rate \u00f7 12) and n the number of payments (years \u00d7 12). Early payments are mostly interest because interest is charged on the outstanding balance, which is highest at the start."
  },
  {
    "question": "Worked example: what does a realistic Mortgage Calculator result look like?",
    "answer": "The loan is $360,000. Principal and interest is $2,359 a month. Tax at 1.1% adds $413 and insurance $150, for a PITI of about $2,922 (no PMI at 20% down, no HOA). Over 30 years you pay roughly $489,000 of interest \u2014 more than the loan itself. The yearly schedule shows year one sending about $24,500 to interest and only $3,800 to principal, which is why early extra payments are so powerful."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Budgeting on P&I alone: Tax, insurance, PMI and HOA commonly add $500\u2013$900 a month. Lenders qualify you on PITI; budget on it too."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='Mortgage Calculator & Amortization Schedule' description='Free mortgage calculator with amortization schedule: monthly payment (PITI), total interest, PMI and the effect of extra payments. The complete mortgage payment calculator.' slug="mortgage-amortization-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">Your monthly mortgage payment is principal and interest on the loan, plus property tax, home insurance, PMI if you put down under 20%, and any HOA dues — together called PITI. Extra monthly payments go entirely to principal, cutting total interest dramatically and shortening the loan by years. The amortization schedule shows exactly how each payment splits.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A mortgage calculator earns its keep by showing the whole payment, not the advertisement version. Lenders advertise principal and interest; households pay PITI. Property tax is set by your county as a percentage of value, insurance has risen sharply in many states, PMI protects the lender (not you) when your down payment is under 20%, and HOA dues are a second housing payment hiding in the fine print. This calculator assembles all of it, then shows the amortization schedule so you can see the loan's inner mechanics year by year.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Amortization explains the most common surprise in home ownership: how little equity the first payments build. Interest each month is the outstanding balance times the monthly rate, so at the start — when the balance is largest — most of the payment is interest. On a $360,000 loan at 6.85%, year one retires under $4,000 of principal. The curve flips slowly, and only in the final years does principal dominate. Nothing is rigged; it is arithmetic. But it means the timing of extra payments matters enormously: $200 extra in year one removes principal that would have charged interest for 29 more years.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">M = P × r(1+r)^n ÷ ((1+r)^n − 1) · Total Payment = M + Tax + Insurance + PMI + HOA</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">P is the loan amount, r the monthly rate (annual rate ÷ 12) and n the number of payments (years × 12). Early payments are mostly interest because interest is charged on the outstanding balance, which is highest at the start.</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter home price and down payment — the difference is the loan the formula amortizes.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Add your rate and term, then property tax and insurance to see true PITI, not just P&I.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">If your down payment is under 20%, note the PMI line; it falls away at 80% loan-to-value.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Add an extra monthly payment and watch total interest and payoff time fall — then read the yearly schedule to see why.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use the extra-payment field as a planning tool, not a guilt trip. Compare three strategies side by side: paying extra monthly, making one lump-sum payment after a bonus, and refinancing to a 15-year term (which forces the issue with a higher required payment but a much lower rate). The right choice depends on your emergency fund, higher-interest debts and job stability — extra mortgage payments are illiquid, so fund the safety net and kill credit-card balances first.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The down-payment decision also deserves the calculator rather than folklore. Twenty percent avoids PMI, but waiting years to save it while prices and rates move can cost more than PMI ever would. Run 5%, 10% and 20% down: compare the payment, the PMI cost until 80% LTV, and the interest difference. PMI on a well-priced home bought sooner is sometimes the cheapest money in the whole transaction.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Finally, treat every output as an estimate with known limits. Tax rates vary by parcel and change with reassessment; insurance quotes differ by carrier; rates move daily until you lock. Get a lender's Loan Estimate for the exact figures before committing — then bring those figures back here to model extra payments, payoff dates and refinance break-evens across the life of the loan.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: $450,000 home, 20% down, 6.85%</h3><p className="text-neutral-600 font-light leading-relaxed m-0">The loan is $360,000. Principal and interest is $2,359 a month. Tax at 1.1% adds $413 and insurance $150, for a PITI of about $2,922 (no PMI at 20% down, no HOA). Over 30 years you pay roughly $489,000 of interest — more than the loan itself. The yearly schedule shows year one sending about $24,500 to interest and only $3,800 to principal, which is why early extra payments are so powerful.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The same loan plus $200 a month</h3><p className="text-neutral-600 font-light leading-relaxed m-0">Add $200 of extra principal monthly and total interest falls by about $119,000, with the loan repaid just over six years early (the calculator shows the exact figure for your inputs). The extra payment works because every dollar of principal removed today stops accruing interest for the remaining decades. Refinancing to a lower rate can achieve similar savings — compare both, and remember refinancing restarts the amortization clock and adds closing costs.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Budgeting on P&I alone</strong><span className="text-neutral-600 font-light leading-relaxed">Tax, insurance, PMI and HOA commonly add $500–$900 a month. Lenders qualify you on PITI; budget on it too.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Comparing loans by rate alone</strong><span className="text-neutral-600 font-light leading-relaxed">Points, lender fees and PMI change the true cost. Compare total payment and five-year cost, not the headline rate.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Refinancing without a break-even</strong><span className="text-neutral-600 font-light leading-relaxed">Closing costs divided by monthly saving = months to break even. If you may move before that month, the refinance loses money however good the rate looks.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Extra payments without telling the servicer</strong><span className="text-neutral-600 font-light leading-relaxed">Mark extra amounts 'apply to principal'. Unmarked overpayments may be held as prepaid future payments instead of reducing the balance.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
