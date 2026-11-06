import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HELOC Calculator: Draw, Interest-Only Payment & Repayment Simulator',
  description: 'Calculate your available HELOC credit, interest-only draw-period payment and the amortized repayment-phase payment. See the payment jump before it happens.',
  keywords: ['heloc calculator', 'heloc payment calculator', 'home equity line of credit calculator', 'heloc draw calculator', 'interest only heloc payment'],
  slug: "real-estate/heloc-drawdown-simulator",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the HELOC Calculator & Drawdown Simulator?",
    "answer": "Enter home value and mortgage balance to find your available credit at the lender's CLTV cap. Enter the draw you actually plan \u2014 not the maximum approved. Read the interest-only payment, then scroll to the repayment payment: the second number is the commitment. Stress-test by raising the rate 2% and see whether both payments still fit your budget."
  },
  {
    "question": "What is the formula behind the HELOC Calculator & Drawdown Simulator?",
    "answer": "Available Credit = (Value \u00d7 Max CLTV) \u2212 Mortgage Balance \u00b7 Interest-Only Payment = Draw \u00d7 Rate \u00f7 12 \u00b7 Repayment Payment = Amortization Formula on the Drawn Balance \u2014 HELOC rates are variable, usually prime plus a margin, so both payments move with the prime rate. The repayment payment uses the standard amortization formula over the repayment term on whatever balance remains."
  },
  {
    "question": "Worked example: what does a realistic HELOC Calculator result look like?",
    "answer": "On a $600,000 home with a $300,000 mortgage, an 85% CLTV cap allows $210,000 of credit. Draw $100,000 for a renovation and the draw-period payment is $708 a month \u2014 interest only, balance unchanged. When repayment begins over 20 years, the payment becomes about $868 a month and finally starts reducing principal. Total repayment-phase interest is roughly $108,000 if the rate never changes \u2014 which, on a variable product, it will."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Treating the credit limit as income: A HELOC is debt secured by your home. Every draw converts home equity \u2014 your safety cushion \u2014 into a monthly obligation."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='HELOC Calculator & Drawdown Simulator' description='Calculate your available HELOC credit, interest-only draw-period payment and the amortized repayment-phase payment. See the payment jump before it happens.' slug="heloc-drawdown-simulator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">A HELOC lets you borrow against home equity up to a combined loan-to-value limit, often 85%. During the draw period (usually 10 years) you pay interest only: balance times rate divided by twelve. In the repayment period the balance amortizes over 15–20 years and the payment jumps sharply — model both payments before you draw a dollar.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A home equity line of credit is a revolving loan secured by your house, structured in two acts. Act one, the draw period (commonly ten years), works like a credit card with a house attached: draw what you need, pay interest only on what you drew. Act two, the repayment period (commonly fifteen to twenty years), closes the line and amortizes the balance into fixed monthly payments of principal and interest. Almost every HELOC problem in history comes from planning only for act one.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Lenders size the line by combined loan-to-value: your existing mortgage plus the HELOC cannot exceed, typically, 85% of appraised value (some lenders offer 80% or 90% with pricing differences). This calculator shows your available credit first, because 'approved for $250,000' headlines mean nothing until your balance is subtracted. It then prices your planned draw in both phases, including the total interest the repayment phase will consume.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">Available Credit = (Value × Max CLTV) − Mortgage Balance · Interest-Only Payment = Draw × Rate ÷ 12 · Repayment Payment = Amortization Formula on the Drawn Balance</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">HELOC rates are variable, usually prime plus a margin, so both payments move with the prime rate. The repayment payment uses the standard amortization formula over the repayment term on whatever balance remains.</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter home value and mortgage balance to find your available credit at the lender's CLTV cap.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter the draw you actually plan — not the maximum approved.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Read the interest-only payment, then scroll to the repayment payment: the second number is the commitment.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Stress-test by raising the rate 2% and see whether both payments still fit your budget.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The variable rate deserves respect. HELOC pricing floats with the prime rate, which follows the federal funds rate. Draw-period payments that feel trivial in a low-rate year can climb steadily. Borrowers with a defined, short use — bridging a renovation, funding a project with a clear payoff — tolerate this well. Borrowers funding long-lived obligations should compare a fixed-rate home equity loan or a cash-out refinance on total cost, not on the first payment.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Used well, a HELOC is the cheapest flexible capital most households can access: no interest until drawn, interest only while drawn, ideal for phased renovations where costs arrive in stages. Used poorly — as a lifestyle line that quietly reaches six figures — it converts the family's primary asset into collateral for consumption, with a repayment cliff scheduled a decade out. The line between the two is entirely in the plan you make before the first draw.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Before drawing, write down three things this calculator helps you test: the exact purpose and total budget, the repayment-phase payment at today's rate plus two points, and the date by which you intend the balance to be zero. If any of the three is vague, the HELOC is not yet a plan — it is just available credit, which is the most expensive kind.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: $100,000 draw at 8.5%</h3><p className="text-neutral-600 font-light leading-relaxed m-0">On a $600,000 home with a $300,000 mortgage, an 85% CLTV cap allows $210,000 of credit. Draw $100,000 for a renovation and the draw-period payment is $708 a month — interest only, balance unchanged. When repayment begins over 20 years, the payment becomes about $868 a month and finally starts reducing principal. Total repayment-phase interest is roughly $108,000 if the rate never changes — which, on a variable product, it will.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The payment-shock case</h3><p className="text-neutral-600 font-light leading-relaxed m-0">A borrower draws $180,000 across the draw period for renovations, tuition and a car, enjoying payments near $1,275 at 8.5%. Repayment then demands about $1,561 a month for 20 years — and if prime has risen 2% by then, roughly $1,800. Households that spent the draw-period years treating the low payment as permanent face a genuine budget crisis. The defence is boring: during the draw period, voluntarily pay the repayment-sized amount and the shock never arrives.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Treating the credit limit as income</strong><span className="text-neutral-600 font-light leading-relaxed">A HELOC is debt secured by your home. Every draw converts home equity — your safety cushion — into a monthly obligation.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Budgeting only for the draw period</strong><span className="text-neutral-600 font-light leading-relaxed">The repayment payment can be 25–50% higher. If it doesn't fit today on paper, it won't fit in ten years by magic.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Ignoring rate variability</strong><span className="text-neutral-600 font-light leading-relaxed">Prime has moved several points within a single year. A HELOC at 8.5% today can be 11% next year; fixed-rate home equity loans exist precisely for borrowers who cannot carry that risk.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Drawing for depreciating purchases</strong><span className="text-neutral-600 font-light leading-relaxed">Using home equity for cars, holidays or lifestyle spending trades a 30-year asset for short-lived consumption at secured-debt risk.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
