import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "AOV Calculator: Order Bump & Upsell Revenue Impact Simulator",
  description: "Simulate a post-purchase order bump: new AOV, extra monthly revenue and profit from a bump price and take rate — revenue that costs zero extra ad spend.",
  keywords: ["aov calculator", "average order value calculator", "order bump calculator", "upsell simulator", "increase aov calculator"],
  slug: "ecommerce/aov-upsell-simulator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "What is a good order bump take rate?",
    "answer": "Well-matched bumps typically convert 20–35 percent of buyers. Below 10 percent usually signals a price or relevance problem, not a traffic problem. Digital and consumable add-ons at 30–40 percent of the main product's price sit in the most reliable zone."
  },
  {
    "question": "How do I calculate the AOV impact of an upsell?",
    "answer": "Multiply the bump price by its take rate: a $19 bump taken by 25 percent of customers adds $4.75 to average order value. Multiply that by monthly orders for extra revenue, and by the bump's margin for extra profit."
  },
  {
    "question": "What is the difference between an order bump and an upsell?",
    "answer": "An order bump is a simple add-on offered on the checkout or cart page — one click, low price. A post-purchase upsell is a fuller offer shown after payment, often a larger or related product. Bumps win on volume and simplicity; upsells win on value per acceptance. Many stores run both."
  },
  {
    "question": "Will an order bump hurt my conversion rate?",
    "answer": "A clean, optional bump presented after the buying decision rarely harms checkout conversion measurably, and post-purchase bumps cannot harm it at all. Cluttered, multi-step or deceptive offers can — keep it to one clear offer with an obvious decline."
  },
  {
    "question": "What products make the best bumps?",
    "answer": "Complements the buyer will need soon anyway: refills, accessories, protection plans, personalisation, expedited handling, and digital add-ons. The test is whether the buyer thinks 'good point' rather than 'another sales pitch'."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="AOV Upsell Simulator"
      description="Simulate a post-purchase order bump: new AOV, extra monthly revenue and profit from a bump price and take rate — revenue that costs zero extra ad spend."
      slug="aov-upsell-simulator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">An order bump adds its price multiplied by its take rate to every order's value. A $19 bump taken by 25 percent of buyers adds $4.75 to AOV — on 2,000 monthly orders that is $9,500 a month of revenue bought with no additional advertising.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Cheapest Revenue in Your Store</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Every other way to grow revenue charges you first. Ads cost per click, discounts cost margin, new products cost inventory. An order bump — a one-click add-on offered at checkout or immediately after — monetises a buyer who has already decided, already paid the acquisition cost, and already trusts you enough to enter card details. The maths in this simulator is the whole pitch: bump price times take rate becomes new revenue per order, multiplied by the orders you already have. Stores routinely find five figures of monthly revenue sitting in a checkbox they have not added yet.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Take rate is where the craft lives. Bump too expensive relative to the main product and take rate collapses; the reliable zone is a bump priced around 30–40 percent of the core product, obviously complementary, and framed as convenience rather than a second sale ('add the refill', 'add protection', 'add the matching accessory'). Digital add-ons and consumables shine here because their margins run 70–100 percent, turning most of that new AOV into profit. Test price and offer before judging the concept: a bump at $19 with a weak offer can underperform a $29 bump that solves a real problem, and this simulator lets you model both before you build either.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">AOV Increase = Bump Price × Take Rate  ·  New AOV = Current AOV + AOV Increase  ·  Extra Monthly Profit = Orders × AOV Increase × Bump Margin</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Note the two different outputs and do not confuse them. Extra revenue is the vanity number; extra profit — after the bump's own margin — is the one to take to the bank, and it is why high-margin bumps (digital, consumable, warranty, personalisation) outperform physical add-ons with thin margins. There is also a strategic second-order effect: a higher AOV raises the CAC you can afford and the ROAS you need, which means a good bump quietly makes your advertising more competitive everywhere else. Re-run this model with conservative take rates first — if the idea only works at a 50 percent take rate, it does not work.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter monthly orders and current average order value from your analytics.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter the bump price you plan and a realistic take rate — start at 20–25 percent if you have no data.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Set the bump's gross margin honestly (near 100 percent for digital, COGS-based for physical).</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Read new AOV, extra revenue and extra profit per month and year. Then test a second price point.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A $19 Bump on 2,000 Orders</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A store with 2,000 monthly orders at a $55 AOV adds a $19 accessory bump. At a 25 percent take rate, AOV rises by $19 × 0.25 = $4.75 to $59.75 — a modest-sounding 8.6 percent. That is $9,500 of extra monthly revenue, and at a 70 percent bump margin, $6,650 of extra monthly profit: $79,800 a year from a single checkout element, with zero additional traffic or ad spend.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: Price Up, Take Rate Down — Which Wins?</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The same store tests a $29 premium bump. Take rate falls to 15 percent, as expected. AOV increase is $29 × 0.15 = $4.35 — slightly less than the $19 bump — but at an 80 percent margin the monthly profit is $6,960, marginally higher than the cheaper bump, with fewer units to fulfil. Neither answer is 'correct' in advance; the simulator narrows the test to two credible options instead of a guess, and the live A/B test settles it in a fortnight.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Extend the thinking one step past the bump and the whole post-purchase sequence opens up. A buyer who accepts a bump has signalled trust and momentum; a single, well-chosen post-purchase upsell — a larger quantity, a subscription conversion at a discount, the premium version — can add more than the bump itself. The discipline is restraint: one bump and at most one upsell, each obviously relevant, each trivially declinable. Stores that stack four offers watch take rates and repeat-purchase rates fall together. Measure the sequence on revenue per session and on refund and support contacts, not just on AOV, and give every new offer a kill threshold in advance. And remember the compounding: AOV gains raise the CAC you can afford, which buys better traffic, which raises volume — the bump is small, but it sits at the start of the flywheel, which is why this modest calculator models the highest-leverage number in your store.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Pricing the bump like a second product</strong><span className="text-neutral-600 font-light leading-relaxed">A bump priced near the main product's price breaks the buying momentum and take rate falls off a cliff. Keep it in the impulse zone — roughly a third of the core price — unless it is a true upgrade with its own value story.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Counting bump revenue as profit</strong><span className="text-neutral-600 font-light leading-relaxed">Physical bumps carry COGS, fulfilment and returns. Always read the profit line at the bump's real margin; a $9,500 revenue bump at 30 percent margin is worth less than a $6,000 revenue bump at 90 percent.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Judging a bump on one week of data</strong><span className="text-neutral-600 font-light leading-relaxed">Take rates vary by traffic source and day. Give tests at least a few hundred checkouts per variant, and segment by new versus returning buyers before killing an offer.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">If you change one thing on your store this week, model a bump first. It is the only growth lever in this entire category that multiplies existing traffic instead of buying more of it. Start with your best-selling product's most natural companion, price it in the impulse zone, and let the take-rate data — not opinion — tune it.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
