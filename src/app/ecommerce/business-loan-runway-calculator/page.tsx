import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Business Loan Calculator: Payment, Total Interest & Runway Impact",
  description: "Calculate a business loan's monthly payment and total interest, and see the truth about runway: how many months the loan really adds after its own payment joins your burn.",
  keywords: ["business loan calculator", "startup runway calculator", "business loan payment calculator", "how much runway does a loan add", "sba loan calculator"],
  slug: "ecommerce/business-loan-runway-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "How is a business loan monthly payment calculated?",
    "answer": "With the amortisation formula: Payment = Loan × r ÷ (1 − (1 + r)^−n), where r is the monthly rate (APR ÷ 12) and n is the term in months. A $100,000 loan at 9 percent over 36 months costs about $3,180 per month."
  },
  {
    "question": "How much runway does a loan actually add?",
    "answer": "Less than loan ÷ burn, because the payment joins your burn. Compute (cash + loan) ÷ (burn + payment) and subtract your current runway. In the worked example, $100,000 added 3.5 months — not the 5.6 months the loan's size suggests."
  },
  {
    "question": "What is net burn and how do I calculate it?",
    "answer": "Net burn is cash out minus cash in per month — what your bank balance actually falls by. Take three months of statements, total the decline, divide by three, and include irregular costs like taxes and annual subscriptions averaged in."
  },
  {
    "question": "Is a longer loan term better for runway?",
    "answer": "It cuts the payment, which extends runway, but raises total interest — on $100,000 at 9 percent, stretching 36 to 60 months adds roughly $10,000 of interest for about half a month of extra runway in our example. Match the term to the life of what the loan funds."
  },
  {
    "question": "Should I take a loan to extend runway before fundraising?",
    "answer": "Only if the extra months credibly change the fundraising outcome — hitting a milestone that reprices the round. Model it honestly here: if the loan adds under two months at a high rate, it usually adds risk faster than it adds time."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Business Loan & Runway Calculator"
      description="Calculate a business loan's monthly payment and total interest, and see the truth about runway: how many months the loan really adds after its own payment joins your burn."
      slug="business-loan-runway-calculator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">A business loan adds cash but also adds its payment to your burn, so runway gained is always less than loan divided by burn. A $100,000 loan at 9 percent over 36 months costs $3,180 a month — on $150,000 cash and $18,000 burn it extends runway from 8.3 to about 11.8 months, not the naive 13.9.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Loan That Buys Less Time Than You Think</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Founders do a seductive bit of mental maths when a loan is offered: cash in bank plus loan, divided by monthly burn, equals new runway. It is wrong in a way that matters, because the loan arrives with a monthly payment that immediately joins the burn it was meant to outlast. The honest calculation — (cash + loan) ÷ (burn + payment) — always returns fewer months than the napkin version, and for short terms or high rates the gap is dramatic. A short, expensive loan can add almost no runway at all while adding very real default risk; the calculator's verdict line exists to say so plainly.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">None of this argues against business debt. Used to fund a milestone — inventory for a proven product, equipment that cuts cost, the bridge to a raise at a better valuation — a loan is often the cheapest capital a business will ever take, and total interest here is a few thousand against dilution that never ends. The discipline is to know exactly what you are buying: a specific number of months, at a specific interest cost, in exchange for a specific milestone being reachable inside those months. If the milestone is vague ('more time to figure it out'), the loan is not buying time — it is renting worry. Run your real numbers before any conversation with a lender.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Monthly Payment = Loan × r ÷ (1 − (1 + r)^−n), where r = APR ÷ 12, n = months  ·  Runway With Loan = (Cash + Loan) ÷ (Net Burn + Payment)  ·  Total Interest = Payment × n − Loan</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The payment formula is standard amortisation: every payment covers that month's interest on the remaining balance plus a slice of principal, which is why extending the term cuts the payment sharply but raises total interest. The runway formula is this calculator's contribution: it refuses to count borrowed cash without its repayment cost. Play with term length and watch the trade — a 60-month term on the example loan cuts the payment to about $2,076, lifts runway to roughly 12.4 months, and raises total interest from about $14,500 to about $24,600. You are always choosing a point on that curve; choose it deliberately, with the milestone the money funds written next to it.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter the loan amount, APR and term you have been offered (or are considering requesting).</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter cash in bank and true net monthly burn — spend minus revenue, from bank statements, not budgets.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Read the payment and total interest, then compare runway today with runway including the loan and its payment.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Stress-test: raise the APR two points and shorten the term. If the deal only works at the offered terms, negotiate terms, not just rate.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: $100,000 at 9% over 36 Months</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A business holds $150,000 cash and burns a net $18,000 a month: 8.3 months of runway. A $100,000 loan at 9 percent APR over 36 months has a payment of about $3,180 a month and total interest of about $14,477. Naive maths promised ($250,000 ÷ $18,000) 13.9 months. Honest maths gives $250,000 ÷ ($18,000 + $3,180) = 11.8 months. The loan genuinely helps — 3.5 extra months — but the founder who planned hiring against 13.9 months would have run dry mid-plan.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: When the Loan Buys Almost Nothing</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">A smaller business with $40,000 cash and $15,000 burn (2.7 months) is offered $50,000 at 16 percent over 12 months. The payment is about $4,540, total interest about $4,480. New runway is $90,000 ÷ $19,540 = 4.6 months — under two extra months, bought with a hard monthly obligation and personal guarantees. Unless those two months contain a specific, probable cash event — a contracted payment, a seasonal peak — this loan converts a flexible problem into a fixed one. The calculator's verdict says exactly that, which is the most valuable sentence in this tool.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Shop for a loan the way this calculator thinks: in months bought per dollar of interest. Two offers that look similar on rate can differ wildly on term, fees and prepayment penalties — and origination fees (often 1–5 percent) reduce the cash that actually lands, which reduces runway gained while the payment is calculated on the full amount. Enter the net amount you will receive, not the headline amount, when fees are deducted. Also test covenant and guarantee terms with the same seriousness as price: a personal guarantee converts business risk into household risk, which no interest saving justifies pricing at zero. Finally, build the repayment into the plan the loan funds: if the milestone slips by two months, does the business still service the payment from the reduced burn the milestone was meant to create? If the honest answer is no, the loan size — not the lender — is the problem, and a smaller facility or a different instrument (a line of credit drawn only when needed) may buy the same milestone more safely.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Dividing loan by burn to estimate runway</strong><span className="text-neutral-600 font-light leading-relaxed">That ignores the payment, the very thing that ends runway early. Always divide total cash by burn plus payment. The difference grows as terms shorten and rates rise.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Using budgeted burn instead of bank burn</strong><span className="text-neutral-600 font-light leading-relaxed">Burn from a plan is fiction; burn from three months of statements is fact. Loans underwritten on fictional burn default on schedule. Include irregular costs — tax, annual software, insurance — averaged monthly.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Borrowing for time instead of for a milestone</strong><span className="text-neutral-600 font-light leading-relaxed">Runway is only valuable as the distance to something: profitability, a raise, a receivable, a season. A loan without a named destination converts directly into a larger, later crisis.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Decide with the honest runway number, the total interest, and a named milestone on one page before you speak to lenders. If the loan wins on those terms, take it without guilt — debt that buys a reached milestone is cheap. If it only wins on napkin maths, the calculator just saved you from the most expensive lesson in small-business finance.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
