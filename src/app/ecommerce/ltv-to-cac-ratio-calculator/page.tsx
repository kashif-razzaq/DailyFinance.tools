import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "LTV:CAC Ratio Calculator: Lifetime Value on Gross Profit, Not Revenue",
  description: "Calculate customer lifetime value from AOV, purchase frequency, lifespan and gross margin, then get your LTV:CAC ratio, verdict band and CAC payback period.",
  keywords: ["ltv to cac ratio calculator", "ltv cac calculator", "customer lifetime value calculator ecommerce", "cac payback period", "what is a good ltv cac ratio"],
  slug: "ecommerce/ltv-to-cac-ratio-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "What is a good LTV:CAC ratio?",
    "answer": "3:1 to 5:1 is the healthy range for most e-commerce and subscription businesses. Below 1:1 you lose money on every customer; 1–3:1 is fragile; above 5:1 often means you could profitably spend more on acquisition and are growing slower than you could."
  },
  {
    "question": "Why should LTV use gross profit instead of revenue?",
    "answer": "Because only gross profit is available to pay for acquisition, overheads and profit itself. Revenue-based LTV ignores product cost and overstates customer value — dramatically at low margins — leading to CAC budgets the business cannot sustain."
  },
  {
    "question": "How do I estimate customer lifespan?",
    "answer": "From repeat-purchase data: track what fraction of customers from a cohort are still buying in years two, three and beyond. Without data, use your observed average repeat behaviour and err low — lifespan is the most abused input in LTV models."
  },
  {
    "question": "What is CAC payback period and why does it matter?",
    "answer": "Payback is the months of gross profit needed to recover CAC. Even a profitable ratio can cause a cash crisis if payback is long and growth is fast, because you fund acquisition months before lifetime value arrives. Under 6 months is comfortable for most stores; over 12 needs deliberate financing."
  },
  {
    "question": "Should LTV:CAC be calculated per channel?",
    "answer": "Yes, where attribution allows. A blended 4:1 can hide a 7:1 email programme and a 1.5:1 paid-social programme. Channel-level ratios tell you where the next dollar belongs and which programme is living off the others."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="LTV to CAC Ratio Calculator"
      description="Calculate customer lifetime value from AOV, purchase frequency, lifespan and gross margin, then get your LTV:CAC ratio, verdict band and CAC payback period."
      slug="ltv-to-cac-ratio-calculator"
      faqs={faqs}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Lifetime value must be measured in gross profit, not revenue. A customer worth $630 in lifetime revenue at a 60 percent margin is worth $378 — and against a $45 CAC that is an 8.4 to 1 ratio on revenue but the honest, bankable figure is the margin-based one used here.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Ratio That Decides Whether Growth Is Real</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">LTV:CAC compresses the entire growth question into one comparison: what a customer returns in gross profit over the relationship versus what they cost to acquire. Above 3:1, paid growth generally builds value. Below 1:1, every customer destroys it no matter how fast revenue climbs. Between them lies the fragile zone where most stores actually live — profitable on paper, one auction-price rise away from trouble. The ratio's power is that it forces two honest numbers to meet: an LTV built on margin and a CAC that includes all acquisition spend.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The commonest corruption is revenue-based LTV. Multiplying AOV by frequency by lifespan produces a large, flattering number that quietly assumes products are free. Divide that by CAC and dying businesses look like rocket ships. This calculator builds LTV on gross profit — AOV × frequency × lifespan × margin — and adds the second metric sophisticated operators watch just as closely: payback period, the months needed for a customer's gross profit to repay their acquisition cost. A 4:1 ratio with a 14-month payback can still strangle a cash-poor store, because growth consumes cash long before lifetime value arrives.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Gross-Profit LTV = AOV × Purchases per Year × Lifespan (years) × Gross Margin  ·  LTV:CAC = LTV ÷ CAC  ·  Payback = CAC ÷ Monthly Gross Profit per Customer</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Handle lifespan and frequency with respect — they are estimates wearing a suit. Use cohort data where you have it: what share of last year's customers ordered again, and how often? If you have no cohort data, be conservative; an optimistic lifespan is the single easiest way to fabricate a healthy ratio. Also know the bands used in the verdict: under 1:1 loses money, 1–3:1 is fragile, 3–5:1 is the healthy zone, and above 5:1 can indicate underspending — a business leaving growth unbought while competitors take the customers it could profitably acquire.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter average order value and realistic orders per customer per year from your data.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter expected customer lifespan in years — be conservative without cohort proof.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Set gross margin (LTV is calculated on profit, never revenue).</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter your fully loaded CAC from the CAC calculator, and read the ratio, band and payback period.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A Healthy 8.4:1 That Is Really Two Numbers</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A store has a $70 AOV, 3 orders per customer per year, a 3-year lifespan and 60 percent margin. Revenue LTV is $70 × 3 × 3 = $630; gross-profit LTV is $630 × 60% = $378. Against a $45 CAC the ratio is 8.4:1 — high enough that the verdict flags possible underspending. Monthly gross profit per customer is ($70 × 3 × 60%) ÷ 12 = $10.50, so CAC pays back in about 4.3 months. This business can afford to test more aggressive acquisition.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: The Revenue Illusion at 1.6:1</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">A discount store reports an LTV of $480 — in revenue — against a $60 CAC and claims an 8:1 ratio. Its margin is 20 percent. True LTV is $480 × 20% = $96, and the real ratio is 1.6:1: fragile. Worse, payback stretches past a year because monthly gross profit per customer is under $7. The store is not lying about its orders; it is lying about what an order is worth. Every scaling decision made on the revenue figure accelerates a cash crisis.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Use this ratio as a budgeting instrument, not a report card. Invert it: at a target ratio of 3:1, your gross-profit LTV defines the maximum CAC you may pay in each channel — a number your media buying can be managed against daily, instead of discovered monthly. Recalculate it after any price, margin or retention change, because all three move the ceiling: a 5-point margin improvement can raise affordable CAC by a sixth overnight, which is often a faster route to growth than any campaign optimisation. Pair it with cohort honesty: compute the ratio separately for customers acquired this year versus your mature base, since young cohorts have unproven lifespans. If the young-cohort ratio holds above 3:1 on conservative lifespan assumptions, scale with confidence. If it only works on heroic assumptions, the kindest description of the growth is 'unproven' — and the calculator has done its job by saying so.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Building LTV on revenue</strong><span className="text-neutral-600 font-light leading-relaxed">Revenue is not value; the customer does not pay your bills with their gross spend, your margin does. Revenue-based LTV overstates worth by the reciprocal of margin — five-fold at a 20 percent margin.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Inventing lifespan from hope</strong><span className="text-neutral-600 font-light leading-relaxed">Lifespan multiplies everything. Assuming five years because a few loyal customers exist fabricates the ratio. Use repeat-purchase cohort data or start deliberately low.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Ignoring payback period</strong><span className="text-neutral-600 font-light leading-relaxed">A great ratio repaid over 18 months can bankrupt a growing store through cash flow alone. Ratio tells you if growth is profitable; payback tells you if you can afford it.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Calculate this ratio quarterly, by channel where attribution allows, and pair it with payback before any budget decision. Between the two numbers you have the complete growth verdict: whether to buy customers, how much you may pay, and how long your cash must wait to be repaid.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
