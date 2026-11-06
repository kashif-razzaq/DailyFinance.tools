import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Shipping Calculator: Flat Rate vs Calculated Shipping by Zone",
  description: "Compare flat-rate vs calculated shipping using your real zone mix and carrier costs. See weighted average shipping cost, profit or loss per order, and far-zone losses.",
  keywords: ["shipping zone calculator", "flat rate vs calculated shipping", "shipping cost calculator ecommerce", "average shipping cost per order", "free shipping threshold calculator"],
  slug: "ecommerce/shipping-zone-optimizer",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "Is flat-rate or calculated shipping better?",
    "answer": "Flat rate simplifies checkout and can profit if set near your weighted average carrier cost; calculated shipping passes the true cost to the customer and never loses on shipping, but unpredictable totals increase cart abandonment. Many stores hybridise: flat rate plus a free-shipping threshold and far-zone surcharges."
  },
  {
    "question": "How do I calculate my average shipping cost per order?",
    "answer": "Weight each zone's average carrier cost by its share of orders and sum them. Use real invoice amounts at your typical parcel weight, including surcharges — not brochure rates."
  },
  {
    "question": "What free-shipping threshold should I set?",
    "answer": "Set it so the gross profit on a threshold-sized basket comfortably exceeds your weighted shipping cost — commonly 10–20 percent above your current AOV to stretch baskets without giving shipping away on orders that would have paid it."
  },
  {
    "question": "Why do far-away orders lose so much money?",
    "answer": "Carrier pricing rises steeply by zone and by dimensional weight. A flat rate set for regional orders can be $5–10 below the true cost of a cross-country heavy parcel, and those orders are invisible until you weight the zone mix."
  },
  {
    "question": "How often do shipping zones and rates change?",
    "answer": "Carriers revise rates and surcharges at least annually, often mid-year with fuel and peak surcharges. Re-run this calculation at every carrier rate change and whenever your customer geography shifts."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Shipping Zone Optimizer"
      description="Compare flat-rate vs calculated shipping using your real zone mix and carrier costs. See weighted average shipping cost, profit or loss per order, and far-zone losses."
      slug="shipping-zone-optimizer"
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
            <p className="text-neutral-600 leading-relaxed text-lg">Flat-rate shipping profits or loses on your weighted average carrier cost, not your nearest zone. If a quarter of orders travel nationally at $13.50 while you charge $5.99 flat, the average order can lose money even though local orders look comfortably profitable.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Your Flat Rate Is a Bet on Your Zone Mix</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Flat-rate shipping is a pricing promise built on an average — and most stores have never calculated the average. Carrier cost is not one number: it is a distribution across zones, driven by where your customers actually live and what your parcels actually weigh. A store shipping mostly within its region can profit from a $5.99 flat rate; the identical rate bankrupts a store whose ads just discovered the other coast. This calculator weights your zone costs by your real order mix and shows the result per order and per month, including the figure stores avoid: the loss carried on every farthest-zone order.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The comparison with calculated (pass-through) shipping is equally clarifying. Pass-through is never a loss-maker on shipping itself — the customer pays the carrier's price — but it converts shipping into checkout friction, and unpredictable totals are a leading cause of abandoned carts. Flat rate converts shipping into a marketing asset but a cost risk. Most mature stores land on the hybrid this calculator is designed to tune: a flat rate set near the weighted average cost, a surcharge or exclusion for extreme zones and weights, and a free-shipping threshold set where the extra basket margin reliably absorbs the shipping cost.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Weighted Avg Carrier Cost = (Local % × Local Cost) + (Regional % × Regional Cost) + (National % × National Cost)  ·  Flat-Rate Result = Flat Charge − Weighted Avg Cost</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Weight enters through the zone costs: enter the average carrier charge you actually pay per zone at your typical parcel weight, from real invoices — not the carrier's headline rate card, which negotiated discounts and surcharges move substantially. Dimensional weight deserves a special warning: bulky light products are billed on size, and a packaging change can cut the zone costs in this model more than any carrier negotiation. Re-run the numbers whenever your mix shifts — a new ad market, a marketplace channel, or a product line with different weight can move the weighted average by dollars per order without a single rate change.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">From recent carrier invoices, enter your average cost per order in local, regional and farthest zones at typical weight.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Set the share of orders in local and regional zones; the calculator assigns the remainder to national.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter the flat rate you charge (or plan to charge) and your monthly order volume.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Read the per-order and monthly result, plus the far-zone loss, and decide: adjust the flat rate, add a surcharge, or set a threshold.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A $5.99 Flat Rate Losing $3.26 an Order</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A store charges $5.99 flat. Its costs are $5.50 local (25 percent of orders), $8.50 regional (45 percent) and $13.50 national (30 percent). The weighted average cost is $1.38 + $3.83 + $4.05 = $9.25. The flat-rate result is $5.99 − $9.25 = −$3.26 per order, which at 800 orders a month is $2,608 of monthly shipping subsidy the owner never budgeted. Each farthest-zone order individually loses $7.51. The store's options are now concrete: raise flat to $8.99 (still a small subsidy), add a far-zone surcharge, or push AOV so margin absorbs it.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: The Free-Shipping Threshold That Pays for Itself</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The same store considers free shipping over $75. Average basket at the threshold is $82 with a 45 percent margin — $36.90 of gross profit to absorb a $9.25 shipping cost and still keep $27.65, better than a typical $55 basket keeping $24.75 minus a $5.99 charge dynamic. Meanwhile the threshold lifts conversion and AOV among the near-threshold shoppers. The lesson generalises: free shipping is not free or fatal — it is a margin transfer that works when the threshold is set from your weighted cost and margin, not copied from a competitor's banner.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">If your weighted cost is the problem, packaging is usually the cheapest cure. Dimensional weight means carriers bill many parcels by size rather than mass: a product shipped in an oversized box can cost a full zone more than the same product in right-sized packaging, on every single order. Audit your top five parcels against their product dimensions, test mailer formats for soft goods, and renegotiate with real invoice data in hand — carriers discount from evidence, not requests. On the strategy side, consider zone-based fulfilment as you grow: a second warehouse or 3PL node that halves average distance can cut the weighted cost in this calculator by 20–35 percent, which converts directly into either margin or a lower, more competitive flat rate. Shipping looks like a logistics detail from the outside. From inside the P&L it is one of the three or four numbers that decide whether the store makes money.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Setting flat rate from the nearest zone's cost</strong><span className="text-neutral-600 font-light leading-relaxed">Your cheapest zone is your smallest problem. Flat rates must be set from the weighted average across the mix you actually ship — including the far orders you would rather forget.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Using rate-card prices instead of invoices</strong><span className="text-neutral-600 font-light leading-relaxed">Surcharges, dimensional weight and residential fees make real costs 10–30 percent higher than headline rates. Always model from paid invoices.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Copying a competitor's free-shipping threshold</strong><span className="text-neutral-600 font-light leading-relaxed">Their threshold reflects their margin, weight and zone mix. Set yours so the threshold basket's margin comfortably absorbs your weighted shipping cost.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Recalculate quarterly and after any channel or geographic expansion. Shipping strategy is not a settings page you visit once — it is a cost line that moves with your marketing. The stores that keep it profitable treat the weighted average in this calculator as a KPI, reviewed like CAC or conversion rate.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
