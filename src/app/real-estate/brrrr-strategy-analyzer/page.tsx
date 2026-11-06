import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BRRRR Calculator: Buy, Rehab, Rent, Refinance, Repeat — Model the Deal',
  description: 'Model a BRRRR deal end to end: purchase + rehab, ARV, refinance at 75% LTV, cash left in the deal and cash-on-cash return after refinancing.',
  keywords: ['brrrr calculator', 'brrrr strategy calculator', 'buy rehab rent refinance repeat', 'brrrr refinance calculator', 'cash left in deal'],
  slug: "real-estate/brrrr-strategy-analyzer",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the BRRRR Calculator & Strategy Analyzer?",
    "answer": "Enter purchase price, full rehab budget and holding/buying costs \u2014 your total cash deployed. Enter a conservative ARV from sold comparables, not agent optimism. Set the refinance LTV your lender actually offers (75% is typical for investor refis) and its rate. Check cash left in the deal, then confirm the rented property still cash flows on the new, larger loan."
  },
  {
    "question": "What is the formula behind the BRRRR Calculator & Strategy Analyzer?",
    "answer": "Cash Left = (Purchase + Rehab + Holding + Refi Costs) \u2212 (ARV \u00d7 Refi LTV) \u00b7 Perfect BRRRR: Cash Left \u2264 $0 \u2014 The refinance is underwritten on the new appraised value (ARV), not on what you paid. Seasoning periods (often 6\u201312 months) and appraisal risk are the two variables that break BRRRR plans most often."
  },
  {
    "question": "Worked example: what does a realistic BRRRR Calculator result look like?",
    "answer": "Buy at $180,000, rehab $60,000, holding and buying costs $8,000: total deployed $248,000. The renovated home appraises at $320,000 and the bank lends 75% \u2014 $240,000. After $5,000 of refinance costs, cash left in the deal is $13,000. Rented at $2,250 with a new payment of about $1,597 plus $600 of tax, insurance, vacancy and management costs, it cash flows about $53 a month while you control a $320,000 asset with $80,000 of equity for $13,000 of trapped cash. Recycle and repeat."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Underestimating rehab: Rehab overruns are the norm, not the exception. Get contractor bids before closing and hold a contingency of at least 10\u201315%."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='BRRRR Calculator & Strategy Analyzer' description='Model a BRRRR deal end to end: purchase + rehab, ARV, refinance at 75% LTV, cash left in the deal and cash-on-cash return after refinancing.' slug="brrrr-strategy-analyzer" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">A BRRRR works when the refinance loan — typically 75% of the after-repair value — returns most or all of your purchase, rehab and holding cash. Cash left in the deal is total project cost plus refinance costs minus the new loan. The less cash trapped, the higher your cash-on-cash return on the rented property.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">BRRRR — Buy, Rehab, Rent, Refinance, Repeat — is a velocity strategy. Instead of saving a fresh down payment for every property, you force value through renovation, then ask the bank to return your capital by lending against the new value. Done well, the same $50,000 can seed property after property while each one keeps paying rent and building equity. Done carelessly, it strands your cash in a single mediocre house.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The strategy has three gates, and a deal must pass all of them. Gate one is the buy: you need a purchase price low enough that purchase plus rehab stays comfortably below ARV — the classic screen is the 70% rule (all-in ≤ 70% of ARV). Gate two is the appraisal: the ARV must be real, supported by renovated comparables nearby. Gate three is the rent: after refinancing into a full-size loan, the property must still cash flow with proper reserves, or the machine that was supposed to free you starts billing you monthly.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">Cash Left = (Purchase + Rehab + Holding + Refi Costs) − (ARV × Refi LTV) · Perfect BRRRR: Cash Left ≤ $0</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">The refinance is underwritten on the new appraised value (ARV), not on what you paid. Seasoning periods (often 6–12 months) and appraisal risk are the two variables that break BRRRR plans most often.</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter purchase price, full rehab budget and holding/buying costs — your total cash deployed.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter a conservative ARV from sold comparables, not agent optimism.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Set the refinance LTV your lender actually offers (75% is typical for investor refis) and its rate.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Check cash left in the deal, then confirm the rented property still cash flows on the new, larger loan.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Financing the front end deserves as much care as the refinance. Cash purchases are cleanest; hard-money loans are fast but expensive, with points and double-digit rates that punish slow rehabs; some investors use conventional renovation loans. Whichever you choose, holding costs accrue monthly — interest, tax, insurance, utilities — and belong in the total from day one, as this calculator requires.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The refinance itself is a second underwriting, not a formality. Investment-property refinances typically cap at 75% LTV, price higher than owner-occupied loans, and — with DSCR lenders — test the property's rent against its full PITI payment. Build the relationship and confirm terms with the refinance lender before you buy the property, not after the rehab is finished and the hard-money clock is ticking.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Finally, BRRRR is a repeat game, so protect the machine: keep reserves per property, do not spend the refinanced cash on lifestyle, and track cash left per deal honestly. Three deals that each trap $40,000 have quietly become a conventional portfolio bought at renovation prices — fine, but know that is what happened, and price your time accordingly.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A near-perfect BRRRR</h3><p className="text-neutral-600 font-light leading-relaxed m-0">Buy at $180,000, rehab $60,000, holding and buying costs $8,000: total deployed $248,000. The renovated home appraises at $320,000 and the bank lends 75% — $240,000. After $5,000 of refinance costs, cash left in the deal is $13,000. Rented at $2,250 with a new payment of about $1,597 plus $600 of tax, insurance, vacancy and management costs, it cash flows about $53 a month while you control a $320,000 asset with $80,000 of equity for $13,000 of trapped cash. Recycle and repeat.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: When the appraisal comes in low</h3><p className="text-neutral-600 font-light leading-relaxed m-0">Same deal, but the appraisal lands at $280,000 instead of $320,000. The loan drops to $210,000 and cash left jumps to $43,000. The strategy has not failed — you own a renovated, rented home with $70,000 of equity — but your velocity has: $43,000 is trapped until rent, paydown or a later refinance frees it. This is why BRRRR investors negotiate purchase price as if the appraisal will disappoint, and keep a reserve for exactly this outcome.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Underestimating rehab</strong><span className="text-neutral-600 font-light leading-relaxed">Rehab overruns are the norm, not the exception. Get contractor bids before closing and hold a contingency of at least 10–15%.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Assuming the ARV</strong><span className="text-neutral-600 font-light leading-relaxed">Your refinance lives or dies on someone else's appraisal. Underwrite to the lowest credible comparable, not the highest.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting seasoning and DSCR</strong><span className="text-neutral-600 font-light leading-relaxed">Many lenders require 6–12 months before refinancing on appraised value, and debt-service-coverage lenders require the rent to cover the new payment by 1.2× or more.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Refinancing into negative cash flow</strong><span className="text-neutral-600 font-light leading-relaxed">Pulling all your cash out maximises the loan — and the payment. A 'perfect' BRRRR that loses $200 a month is not perfect.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
