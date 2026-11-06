import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Churn Calculator: What 1% Less Churn Is Worth in MRR",
  description: "Simulate how reducing monthly churn compounds into MRR and revenue. Compare your current churn with a target and see subscribers and money kept over 12–36 months.",
  keywords: ["churn calculator", "churn rate calculator", "subscription churn impact", "mrr churn simulator", "reduce churn revenue impact"],
  slug: "ecommerce/subscription-churn-impact-simulator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "How is monthly churn calculated?",
    "answer": "Monthly churn rate = customers lost during the month ÷ customers at the start of the month × 100. Customers lost includes both cancellations and involuntary losses from failed payments. Use a consistent definition every month or your trend is meaningless."
  },
  {
    "question": "What is a good churn rate for subscriptions?",
    "answer": "Consumer subscription boxes often see 5–10 percent monthly churn; B2B SaaS targets under 2–3 percent monthly for small businesses and far lower for enterprise. Context matters more than benchmarks — the right question is what a one-point reduction is worth in your business, which this calculator answers."
  },
  {
    "question": "Why does a small churn reduction have such a big effect?",
    "answer": "Because it compounds. A subscriber saved this month is also saved next month and pays again every month after. Over 12–36 months, small monthly differences accumulate into large gaps in subscribers, MRR and cumulative revenue."
  },
  {
    "question": "What is the fastest way to reduce churn?",
    "answer": "Fix involuntary churn first with card-updaters and dunning emails — it is often 20–40 percent of losses and needs no product change. Then improve onboarding so new customers reach value quickly, since early-life churn is usually the highest."
  },
  {
    "question": "Does this calculator include expansion revenue or price rises?",
    "answer": "No. It holds ARPU and monthly additions constant so the isolated effect of churn is visible. If you also grow ARPU or additions, real outcomes will be better than the projection — treat it as a conservative floor."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Subscription Churn Impact Calculator"
      description="Simulate how reducing monthly churn compounds into MRR and revenue. Compare your current churn with a target and see subscribers and money kept over 12–36 months."
      slug="subscription-churn-impact-simulator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">Churn compounds like interest in reverse. Cutting monthly churn from 6 percent to 4 percent on 1,000 subscribers at $49 does not save a fixed few customers — it keeps hundreds of extra subscriber-months, worth thousands in extra MRR and far more in cumulative revenue within a year.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Leak That Compounds Quietly</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Acquisition gets the budget and the attention, but churn decides whether a subscription business ever becomes valuable. The maths is unforgiving because churn is exponential: at 6 percent monthly churn you keep only about 47.6 percent of a cohort after a year; at 4 percent you keep about 61.3 percent. That gap, applied to every cohort you have already paid to acquire, is usually worth more than the next acquisition campaign — and it costs a fraction as much, because the customers are already yours.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">This simulator projects your subscriber base month by month under two churn rates, holding new additions constant, so the difference you see is purely the effect of retention. It is deliberately simple — no expansion revenue, no price rises, no seasonality — because even the simple version makes the point most teams miss: a one- or two-point churn reduction is not a rounding error, it is a second growth engine. When you see the 12-month cumulative revenue gap for your own numbers, retention projects stop looking like customer-success housekeeping and start looking like the highest-ROI work in the business.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Subscribers Next Month = Subscribers × (1 − Churn) + New Subscribers  ·  MRR = Subscribers × ARPU  (projected monthly, both churn scenarios)</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Read the output in three layers. The MRR gap at the horizon shows the recurring prize — money that arrives every month from then on. The cumulative gap shows the cash collected along the way, which is what funds the retention work itself. The subscribers-kept figure translates money into people: each one is a customer you do not have to buy back through acquisition at full CAC. Note what the model assumes — constant additions and ARPU — and treat long horizons as directional. Churn is rarely one number either: month-one churn and mature-cohort churn differ wildly, and segmenting them is the natural next analysis after this one.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter current subscribers, average revenue per user per month, and typical monthly additions.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Set your current monthly churn honestly — from billing data, not hope.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Set a realistic target churn after retention work (a 1–2 point cut is ambitious; 0.5 is worthwhile).</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Compare MRR, cumulative revenue and subscribers kept at 12 months, then at 24 and 36.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: 1,000 Subscribers, 6% vs 4% Churn</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A subscription box has 1,000 subscribers paying $49 a month and adds 80 new subscribers monthly. At 6 percent churn, the base settles toward its equilibrium and MRR after 12 months is about $59,600. At 4 percent churn, the same additions produce roughly $68,900 in MRR — about $9,300 more every month — and roughly $52,000 more cumulative revenue across the year, with about 190 extra subscribers still active. No extra ad spend produced any of that.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: A Small SaaS Where 1 Point Is the Budget</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">A niche SaaS has 300 customers at $89 ARPU, adding 25 a month. Moving churn from 5 percent to 4 percent — one point — yields roughly $3,100 more MRR after 12 months and about $17,000 more cumulative revenue in year one. That is the annual salary of the part-time retention work that achieves it: onboarding emails, a dunning sequence for failed cards, and quarterly check-in calls. Involuntary churn from failed payments alone often accounts for 20–40 percent of total churn, which makes it the cheapest point a business will ever buy back.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Before acting on this simulation, split your churn into its three real components, because each has a different owner and cure. Voluntary early churn — customers who never reached value — belongs to onboarding and expectation-setting. Voluntary late churn — customers who got the value and drifted — belongs to product depth, community and pricing architecture. Involuntary churn belongs to payments: card updaters, smart retries and dunning sequences routinely recover a fifth to two fifths of it at near-zero marginal cost, which is why it should always be project number one. Then re-run this simulator per segment if your base is large enough. A blended 5 percent can be 2 percent among annual subscribers and 11 percent among monthly ones — and the annual-plan discount that looks generous suddenly prices itself, because moving customers between those segments is worth more than most acquisition campaigns.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Measuring churn on revenue and customers interchangeably</strong><span className="text-neutral-600 font-light leading-relaxed">Logo churn (customers lost) and revenue churn (MRR lost) differ when big customers churn differently from small ones. Know which one you are simulating — this tool models customers times ARPU, so segment if your base is very uneven.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Counting cancellations but not failed payments</strong><span className="text-neutral-600 font-light leading-relaxed">Involuntary churn — expired cards, failed retries — is real churn with a completely different cure: dunning. Businesses that ignore it overstate how unhappy their customers are and underinvest in the easiest fix.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Assuming a churn cut is free and instant</strong><span className="text-neutral-600 font-light leading-relaxed">Retention improvements ramp over months and cost money. The simulator shows the prize at the target rate; your plan still needs the projects, and their cost, that get you there.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Run this simulation before your next planning cycle and put the cumulative figure in the deck. Retention proposals stop losing to acquisition proposals the moment the compounding is on one slide. Then track actual churn monthly, by cohort, and re-run the model with real numbers each quarter.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
