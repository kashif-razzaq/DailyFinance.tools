import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "CAC Calculator: Blended vs Paid Customer Acquisition Cost",
  description: "Calculate blended CAC and paid CAC for your store. Compare acquisition cost with first order value and learn why the two numbers tell different stories.",
  keywords: ["cac calculator", "customer acquisition cost calculator", "blended cac", "paid cac", "how to calculate cac"],
  slug: "ecommerce/customer-acquisition-cost-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "How do you calculate customer acquisition cost?",
    "answer": "Divide total acquisition spend in a period by the number of new customers acquired in the same period. Blended CAC includes all acquisition spend and all new customers; paid CAC includes only ad spend and customers attributed to ads."
  },
  {
    "question": "What is a good CAC for e-commerce?",
    "answer": "There is no universal benchmark because it depends on margin and lifetime value. A practical test: CAC should be comfortably below the gross profit of the first order, or below one third of gross-profit lifetime value (an LTV:CAC ratio of at least 3:1)."
  },
  {
    "question": "What should be included in CAC?",
    "answer": "Ad spend, affiliate and influencer costs, content production for acquisition, acquisition tools and software, agency fees, and the acquisition share of marketing salaries. Exclude fulfilment, product cost and general overhead."
  },
  {
    "question": "Why are my blended and paid CAC different?",
    "answer": "Because organic, direct, referral and repeat-visit channels add customers without ad spend. The difference shows how much those channels subsidise your paid programme. As ad spend scales, blended CAC usually drifts toward paid CAC."
  },
  {
    "question": "How often should I calculate CAC?",
    "answer": "Monthly at minimum, and after any major budget, channel or offer change. CAC moves with auction prices, creative performance and seasonality — a quarterly average hides the trend that matters."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Customer Acquisition Cost Calculator"
      description="Calculate blended CAC and paid CAC for your store. Compare acquisition cost with first order value and learn why the two numbers tell different stories."
      slug="customer-acquisition-cost-calculator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">Customer acquisition cost is total acquisition spend divided by new customers acquired in the same period. Blended CAC counts all spend and all customers; paid CAC counts only ad spend and ad-driven customers. The gap between them measures how much your organic channels subsidise your ads.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Two CACs, Two Completely Different Decisions</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A store spending $5,000 on ads and $1,500 on content and tools, gaining 400 customers, has a blended CAC of $16.25. If only 250 of those customers came from ads, its paid CAC is $20. Both numbers are true and they answer different questions. Blended CAC tells you whether the business model works overall — it is the number to compare with lifetime value. Paid CAC tells you whether the next advertising dollar works — it is the number to compare with the gross profit on a first order when deciding whether to scale a campaign.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Confusing the two is expensive in both directions. Judge ads by blended CAC and you will scale campaigns that look efficient only because organic traffic is diluting their true cost — then wonder why growth stalls when the budget rises and the dilution runs out. Judge the whole business by paid CAC and you may kill content and SEO programmes that are quietly producing your cheapest customers. This calculator keeps the two side by side, and adds the reality check most stores skip: CAC as a share of first-order value, and the reminder that CAC must ultimately be judged against gross profit and lifetime value, not revenue.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Blended CAC = (Ad Spend + All Other Acquisition Spend) ÷ Total New Customers  ·  Paid CAC = Ad Spend ÷ Customers from Paid Ads</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The discipline is in the edges. Numerator and denominator must cover the same period — this month's spend against this month's new customers — and 'new' must mean new: returning customers in the denominator flatter CAC and corrupt every decision built on it. Other acquisition spend is where honesty goes to die; include the content freelancer, the affiliate commissions, the influencer fees, the tools and the share of salary spent on acquisition. Leave them out and blended CAC becomes a story you tell yourself. When you are done here, take blended CAC to the LTV:CAC calculator — CAC alone says what a customer costs, never whether they are worth it.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Pick one period — usually a month — and total your paid ad spend for it.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Add every other acquisition cost in the same period: content, affiliates, tools, relevant salaries.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter total new customers and the subset you attribute to paid ads.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Compare blended CAC, paid CAC, and CAC as a percentage of first-order value.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A Store Where Organic Carries the Ads</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A skincare store spends $5,000 on ads and $1,500 on content in March, gaining 400 new customers, 250 of them from ads. Blended CAC is $6,500 ÷ 400 = $16.25; paid CAC is $5,000 ÷ 250 = $20. With a $65 first-order value, blended CAC is 25 percent of the order — comfortable if gross margin is healthy. But the paid programme is weaker than the blended number suggests, and doubling ad spend will push the blended figure toward the paid one.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: When CAC Eats the First Order</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">A gadget store spends $9,000 on ads with no other acquisition programme and gains 180 customers, all paid. Blended and paid CAC are identical: $50. Its average first order is $58 with a 45 percent margin — $26.10 of gross profit against $50 of CAC. Every first order loses about $24. This store does not have an advertising problem to optimise; it has an economics problem. It must either cut CAC roughly in half, raise first-order value with bundles, or prove that repeat purchases repay the deficit within an acceptable payback window.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">CAC becomes genuinely powerful when it is tracked as a trend and a mix, not a monthly trophy number. Plot blended and paid CAC monthly for a year and two patterns usually emerge: paid CAC ratchets upward as audiences saturate and auctions tighten, while blended CAC reveals whether your organic engine is growing fast enough to offset it. When paid CAC rises 20 percent in a quarter, the causes are findable — creative fatigue, audience exhaustion, a competitor's launch — but only if you noticed in month one. Also calculate CAC per channel and per first product where your data allows. A store whose blended CAC is $18 may be buying email-driven customers at $4 and podcast customers at $60; the average conceals both the gold and the leak. The goal of this calculator is not one number — it is the habit of knowing what a customer costs before deciding what a customer is worth.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Counting repeat customers as new</strong><span className="text-neutral-600 font-light leading-relaxed">CAC divided by all orders instead of new customers understates the true cost and leads to scaling budgets into a wall. Segment new versus returning before you calculate.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Leaving 'soft' costs out of blended CAC</strong><span className="text-neutral-600 font-light leading-relaxed">Affiliate commissions, content, influencer product and tools are acquisition costs. Excluding them produces a CAC that makes the channel mix look better than the business is.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Comparing CAC with revenue instead of profit</strong><span className="text-neutral-600 font-light leading-relaxed">A $30 CAC against a $60 order sounds fine until the margin turns out to be $25. CAC must clear gross profit per order — or be justified by lifetime value with a measured payback period.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Calculate CAC monthly, by channel where attribution allows, and always next to margin and lifetime value. CAC is a moving number — auctions inflate, creative fatigues, organic grows — and the stores that win are the ones that notice its movement first.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
