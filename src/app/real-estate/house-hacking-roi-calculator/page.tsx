import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'House Hacking Calculator: Live Rent-Free & Calculate Your ROI',
  description: 'Calculate your effective housing cost and ROI house hacking a duplex or multi-family home. See how rent from other units offsets your mortgage (PITI) and what you save versus renting.',
  keywords: ['house hacking calculator', 'house hacking roi calculator', 'house hack mortgage calculator', 'live rent free calculator', 'duplex house hack calculator'],
  slug: "real-estate/house-hacking-roi-calculator",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the House Hacking ROI Calculator?",
    "answer": "Enter the purchase price, down payment and mortgage rate for the whole property. Add annual tax and insurance so PITI is complete \u2014 never judge a hack on principal and interest alone. Enter realistic rent for the other units (use current leases or conservative market rent, not the seller's pro forma). Compare your effective cost with what the same home would cost you as a pure renter."
  },
  {
    "question": "What is the formula behind the House Hacking ROI Calculator?",
    "answer": "Effective Housing Cost = PITI + Utilities You Cover \u2212 Rent From Other Units \u2014 PITI is principal, interest, property tax and insurance on the whole property. Cash-on-cash ROI after you move out compares the property's full-rent cash flow with the cash you invested (down payment plus closing costs)."
  },
  {
    "question": "Worked example: what does a realistic House Hacking ROI Calculator result look like?",
    "answer": "You buy a duplex for $450,000 with 5% down at 6.5%. PITI is about $3,303 a month (principal and interest $2,703, tax $450, insurance $150). The other unit rents for $1,800 and you cover $150 of utilities, so your effective housing cost is roughly $1,653 a month. A comparable rental would cost $2,100, so you save about $447 every month \u2014 $5,364 a year \u2014 while your tenants and appreciation build equity in an asset you control. Your cash in is only about $31,500 including closing costs."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Using the seller's rent numbers: Sellers quote scheduled rent. Use collected rent from leases and bank statements, and haircut vacant or below-market units honestly."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='House Hacking ROI Calculator' description='Calculate your effective housing cost and ROI house hacking a duplex or multi-family home. See how rent from other units offsets your mortgage (PITI) and what you save versus renting.' slug="house-hacking-roi-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">House hacking works when rent from the other units offsets most of your mortgage payment (PITI). Add your full PITI, subtract the rent the other units actually collect, and the remainder is your true housing cost. Compare that remainder with local rent — the monthly difference, compounded over years, is the real return.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">House hacking is the lowest-risk entry point into real estate investing because it attacks the largest line in most budgets: housing. Instead of buying a single-family home and carrying the entire mortgage yourself, you buy a small multi-family property (or a single-family home with rentable space), live in one unit, and let tenants in the other units cover most — sometimes all — of the payment. Lenders reward the arrangement: owner-occupants qualify for residential rates and down payments as low as 3–5%, terms no investor loan will match.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The metric that matters is not the mortgage payment, it is your effective housing cost: what remains after tenant rent is applied. A $3,000 PITI payment sounds heavy until $1,800 of it arrives from the other unit. Compare the remainder with the rent you would otherwise pay for a similar home. If the hack cuts your housing cost by $700 a month, that is $8,400 a year of found money — money that can fund the next down payment years faster than saving from a salary alone.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">Effective Housing Cost = PITI + Utilities You Cover − Rent From Other Units</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">PITI is principal, interest, property tax and insurance on the whole property. Cash-on-cash ROI after you move out compares the property's full-rent cash flow with the cash you invested (down payment plus closing costs).</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter the purchase price, down payment and mortgage rate for the whole property.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Add annual tax and insurance so PITI is complete — never judge a hack on principal and interest alone.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter realistic rent for the other units (use current leases or conservative market rent, not the seller's pro forma).</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Compare your effective cost with what the same home would cost you as a pure renter.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Do not stop at the live-in maths. Run the property as a pure rental as well, because one day you will move out. If the building cannot cash flow at full rent with full reserves, you have bought a subsidised home, not an investment — which may still be worthwhile, but you should know which one you own. The calculator shows both views: effective cost today and cash-on-cash return after move-out.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Financing choice shapes the deal. FHA loans allow 3.5% down on 2–4 unit properties but carry mortgage insurance and a self-sufficiency test on triplexes and fourplexes. VA loans allow eligible veterans to buy with 0% down. Conventional loans at 5% down avoid some FHA friction but are stricter on reserves for multi-unit purchases. Whichever route you take, the down payment is only part of cash in: closing costs, prepaids and initial repairs belong in the ROI denominator.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Finally, house hacking is a management job as well as a maths problem. You are the landlord down the hall. Screen tenants properly, use a written lease even when it feels informal, keep a separate account for rents and reserves, and learn your local rules on deposits, notice periods and owner-occupied exemptions before the first tenant moves in. The investors who fail at house hacking rarely fail on the spreadsheet — they fail on operations.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: Duplex with an FHA loan</h3><p className="text-neutral-600 font-light leading-relaxed m-0">You buy a duplex for $450,000 with 5% down at 6.5%. PITI is about $3,303 a month (principal and interest $2,703, tax $450, insurance $150). The other unit rents for $1,800 and you cover $150 of utilities, so your effective housing cost is roughly $1,653 a month. A comparable rental would cost $2,100, so you save about $447 every month — $5,364 a year — while your tenants and appreciation build equity in an asset you control. Your cash in is only about $31,500 including closing costs.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Triplex, conventional loan, then move out</h3><p className="text-neutral-600 font-light leading-relaxed m-0">A $620,000 triplex bought with 20% down has PITI near $3,900. Two rented units bring in $2,900, leaving an effective cost around $1,150 including utilities you cover. After two years you move out and rent your unit for $1,600. Total rent becomes $4,500 against the same PITI, producing roughly $450 a month of cash flow after utilities — on about $136,000 invested, before counting loan paydown and appreciation. The hack converted a housing expense into an investment with a tenant-funded head start.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Using the seller's rent numbers</strong><span className="text-neutral-600 font-light leading-relaxed">Sellers quote scheduled rent. Use collected rent from leases and bank statements, and haircut vacant or below-market units honestly.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting reserves because you live there</strong><span className="text-neutral-600 font-light leading-relaxed">Roofs and furnaces fail in owner-occupied buildings too. Hold vacancy, maintenance and CapEx reserves from day one or your 'free' housing gets an expensive surprise.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Breaking owner-occupancy rules</strong><span className="text-neutral-600 font-light leading-relaxed">Low-down-payment loans (FHA, VA, conventional 3–5%) require you to actually live in the property, usually within 60 days and for at least a year. Plan the move before you sign.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Ignoring the exit</strong><span className="text-neutral-600 font-light leading-relaxed">A hack that only works while you live there is a discount, not an investment. Always run the move-out numbers: full rent versus full costs.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
