import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rental Property Calculator: Cash Flow, Cap Rate & Cash-on-Cash',
  description: 'Calculate rental property cash flow, cap rate and cash-on-cash return. Full PITI, vacancy, maintenance and management reserves included — no flattering omissions.',
  keywords: ['rental property calculator', 'rental cash flow calculator', 'cap rate calculator', 'cash on cash return calculator', 'rental roi calculator'],
  slug: "real-estate/rental-cash-flow-calculator",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the Rental Property & Cash Flow Calculator?",
    "answer": "Enter price, down payment and rate to build the true PITI payment. Enter achieved market rent \u2014 not the highest listing on the street. Keep the default reserves (5% vacancy, 5% maintenance, 8% management) unless you have evidence yours differ. Judge the deal on cash flow, cap rate and cash-on-cash together, never on one metric."
  },
  {
    "question": "What is the formula behind the Rental Property & Cash Flow Calculator?",
    "answer": "Cash Flow = Rent \u2212 PITI \u2212 Vacancy \u2212 Maintenance \u2212 Management \u2212 Other Costs \u00b7 Cap Rate = NOI \u00f7 Price \u00b7 CoC = Annual Cash Flow \u00f7 Cash Invested \u2014 NOI (net operating income) excludes the mortgage: it is rent minus vacancy and operating expenses, including tax and insurance. Cap rate therefore measures the property, while cash-on-cash measures your leveraged deal."
  },
  {
    "question": "Worked example: what does a realistic Rental Property result look like?",
    "answer": "A $325,000 house rents for $2,950. With 25% down at 7%, principal and interest is about $1,621; tax ($3,900 a year) and insurance add $450, for PITI of $2,071. Reserves take $531 (vacancy $148, maintenance $148, management $236) and other costs $100, leaving cash flow of about $248 a month. NOI is roughly $22,400, a cap rate near 6.9%, and cash-on-cash is about 3.4% on roughly $87,750 invested \u2014 a base hit, not a home run, and the calculator shows exactly that."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Counting gross rent as income: Vacancy, maintenance and management are not optional extras. A deal that needs 0% vacancy forever to work does not work."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='Rental Property & Cash Flow Calculator' description='Calculate rental property cash flow, cap rate and cash-on-cash return. Full PITI, vacancy, maintenance and management reserves included — no flattering omissions.' slug="rental-cash-flow-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">Rental cash flow is monthly rent minus every cost of owning: mortgage (PITI), vacancy reserve, maintenance, management and other expenses. What survives is cash flow. Divide annual net operating income by price for the cap rate, and annual cash flow by your cash invested for cash-on-cash return — the two numbers investors compare deals with.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Cash flow is the only reason most rental properties exist. Appreciation is welcome, tax benefits are real, and loan paydown builds wealth quietly — but a property that bleeds cash every month must be fed from your salary, and portfolios built on feeding properties do not survive job losses or rate rises. This calculator exists to give you the honest monthly number before you are contractually obliged to live with it.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The discipline is in the reserves. New investors routinely underwrite 0% vacancy, 0% maintenance and free self-management, then discover that tenants leave, water heaters die, and their own time has value. Professional underwriting uses roughly 5% of rent for vacancy, 5% for maintenance, 5% for capital expenditures and 8–10% for management whether or not you self-manage today — because the day you sell, the buyer will price the property as if a manager runs it.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">Cash Flow = Rent − PITI − Vacancy − Maintenance − Management − Other Costs · Cap Rate = NOI ÷ Price · CoC = Annual Cash Flow ÷ Cash Invested</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">NOI (net operating income) excludes the mortgage: it is rent minus vacancy and operating expenses, including tax and insurance. Cap rate therefore measures the property, while cash-on-cash measures your leveraged deal.</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter price, down payment and rate to build the true PITI payment.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter achieved market rent — not the highest listing on the street.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Keep the default reserves (5% vacancy, 5% maintenance, 8% management) unless you have evidence yours differ.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Judge the deal on cash flow, cap rate and cash-on-cash together, never on one metric.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Cap rate and cash-on-cash answer different questions. Cap rate asks: what return does this property produce unleveraged, relative to its price? It lets you compare a duplex in Ohio with an apartment in Texas on equal footing. Cash-on-cash asks: what return does my actual cash earn after the loan? Leverage can turn a 6% cap rate into a 10% cash-on-cash return — or, with thin down payments and high rates, into a negative one. Neither metric is 'the ROI'; together they describe the deal.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Stress-test before you commit. Drop rent 5%, raise the rate 1%, and push vacancy to 8%. If the deal still breaks even, it is robust. If a single bad assumption turns it negative, the margin of safety is too thin for a first purchase. Also run the 1% rule as a screen (monthly rent ÷ price): at today's rates, properties near or above 0.7–1% deserve a full underwrite, and those far below it need exceptional appreciation prospects to justify themselves.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Remember what the calculator cannot see: neighbourhood trajectory, school quality, employer concentration, flood and insurance risk, and the condition a home inspection reveals. Numbers qualify a deal for investigation; they do not replace it. Use a positive result here as permission to spend money on inspections and proper due diligence — not as a substitute for them.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: Midwest single-family, 25% down</h3><p className="text-neutral-600 font-light leading-relaxed m-0">A $325,000 house rents for $2,950. With 25% down at 7%, principal and interest is about $1,621; tax ($3,900 a year) and insurance add $450, for PITI of $2,071. Reserves take $531 (vacancy $148, maintenance $148, management $236) and other costs $100, leaving cash flow of about $248 a month. NOI is roughly $22,400, a cap rate near 6.9%, and cash-on-cash is about 3.4% on roughly $87,750 invested — a base hit, not a home run, and the calculator shows exactly that.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The same house at a negotiated price</h3><p className="text-neutral-600 font-light leading-relaxed m-0">Negotiate the same house (rent $2,950) down to $295,000 and the picture changes: PITI falls to about $1,921, cash flow rises to roughly $398 a month, the cap rate rises to about 7.6% on the same NOI, and cash-on-cash improves to roughly 6% on about $8,000 less cash invested. This is why experienced investors say you make money when you buy. The calculator lets you find the price at which a listed property actually works — then offer that price, with the maths attached.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Counting gross rent as income</strong><span className="text-neutral-600 font-light leading-relaxed">Vacancy, maintenance and management are not optional extras. A deal that needs 0% vacancy forever to work does not work.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting tax and insurance in PITI</strong><span className="text-neutral-600 font-light leading-relaxed">Principal and interest is not the payment. Tax and insurance commonly add 20–30% and rise over time.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Using cap rate on a leveraged deal alone</strong><span className="text-neutral-600 font-light leading-relaxed">Cap rate ignores financing. A great cap rate with a terrible loan can still lose money monthly — check cash-on-cash too.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">No CapEx reserve</strong><span className="text-neutral-600 font-light leading-relaxed">This calculator's maintenance reserve is for running repairs. Big-ticket items need a separate CapEx reserve — use our CapEx Reserve Planner alongside it.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
