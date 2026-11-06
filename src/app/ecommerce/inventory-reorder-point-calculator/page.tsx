import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Reorder Point Calculator: When to Reorder + Safety Stock Formula",
  description: "Calculate your inventory reorder point from daily sales, lead time and safety stock. Know exactly when to reorder and how much, before you stock out or overstock.",
  keywords: ["reorder point calculator", "inventory reorder point", "safety stock calculator", "when to reorder inventory", "reorder point formula"],
  slug: "ecommerce/inventory-reorder-point-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "What is the reorder point formula?",
    "answer": "Reorder Point = (Average Daily Sales × Lead Time in Days) + Safety Stock. It is the inventory level at which you must place a new order so that stock arrives before you run out, with safety stock absorbing delays and demand spikes."
  },
  {
    "question": "How do I calculate safety stock?",
    "answer": "The simple method used here is average daily sales multiplied by safety days — the number of extra days of demand you want covered. More advanced methods use demand and lead-time variability (standard deviation and a service-level Z-score), which matter for large catalogues."
  },
  {
    "question": "What lead time should I use?",
    "answer": "Use real, door-to-door lead time: order processing, production, shipping, customs and warehouse receiving, measured from your recent orders. Supplier quotes are systematically optimistic. For imported goods, 2–6 weeks is common."
  },
  {
    "question": "How much should I order when I hit the reorder point?",
    "answer": "Enough to cover your chosen period plus restore the buffer: (daily sales × cover days) + reorder point − current stock. Larger, less frequent orders cut ordering and freight costs but tie up more cash; smaller orders do the opposite."
  },
  {
    "question": "How often should I recalculate reorder points?",
    "answer": "Monthly for fast movers and before any known demand event (sales, launches, holidays). Quarterly is acceptable for slow, stable products. Always recalculate when a supplier or lead time changes."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Inventory Reorder Point Calculator"
      description="Calculate your inventory reorder point from daily sales, lead time and safety stock. Know exactly when to reorder and how much, before you stock out or overstock."
      slug="inventory-reorder-point-calculator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">Your reorder point is daily unit sales multiplied by supplier lead time in days, plus safety stock. Selling 20 units a day with a 14-day lead time and a week of safety stock means reordering at 420 units — not when the shelf looks empty.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Stockouts and Overstock Are the Same Mistake</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Inventory fails in two directions and both are expensive. Order too late and you stock out: lost sales, wasted ad spend sending traffic to an empty page, marketplace rankings that take weeks to recover. Order too early or too much and cash sits on shelves instead of funding marketing, while storage fees and obsolescence quietly eat the margin. The reorder point is the discipline that prevents both — a number, calculated from demand and lead time, that tells you the exact stock level at which a purchase order must go out.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">What surprises most store owners is how early that number arrives. Lead time demand is usually far larger than intuition suggests: a product selling a modest 20 units a day with a three-week supplier lead time burns 420 units before a replenishment even lands. Add safety stock for the inevitable late shipment or demand spike and the trigger can be double the stock level that 'feels' safe. This calculator replaces the feeling with arithmetic, and adds the two numbers that make it actionable: days until you hit the trigger, and a suggested order quantity for your chosen cover period.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Reorder Point = (Average Daily Sales × Lead Time in Days) + Safety Stock  ·  Safety Stock = Daily Sales × Safety Days</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The formula has two honest inputs and one judgement call. Daily sales should be a recent average — the last 30 to 90 days — not your best week and not last year's average. Lead time must be the real door-to-door time from purchase order to sellable stock, including production, freight, customs and warehouse receiving; suppliers quote the optimistic version. Safety days are the judgement call: stable demand and a reliable local supplier may need three days, while imported seasonal products with spiky demand may need two weeks. When in doubt, price the two errors — a stockout usually costs more than a few days of extra stock.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter average daily unit sales for the product, using the last 30–90 days.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter current stock on hand, counting only sellable units.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Set supplier lead time in days, door to door, and your safety stock cover in days.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Set how many days of cover each order should buy. Order when stock reaches the reorder point, in the suggested quantity.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A Supplement Selling 20 Units a Day</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A supplement sells 20 units daily. The overseas supplier takes 14 days door to door, and the owner holds 7 safety days. Demand during lead time is 20 × 14 = 280 units; safety stock is 20 × 7 = 140 units; the reorder point is 420 units. With 500 units on hand, the store is only 4 days from the trigger — an order placed 'next week' would arrive after roughly 80 units of safety stock had already been burned. The suggested order, for 30 days of cover, is 30 × 20 + 420 − 500 = 520 units.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: A Seasonal Product Before Q4</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">A gift product averages 8 units a day in October but 25 a day from mid-November. Using the October average, the calculator returns a reorder point near 250 units with a 21-day lead time — dangerously wrong for peak season. The fix is to recalculate with the demand you will actually face during the lead time window: at 25 units a day, lead time demand alone is 525 units. Seasonal businesses should keep two reorder points — off-peak and peak — and switch triggers before the surge, not during it.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The reorder point is one half of a working inventory system; the other half is review rhythm. A number nobody checks is decoration. Put hero products on a weekly stock review, the mid-tail monthly, and let the reorder point convert those reviews into yes-or-no decisions that take minutes. As data improves, graduate the inputs: replace flat safety days with safety stock based on variability once you have a year of demand history, and split lead time into its stages so a supplier delay is visible before it becomes a stockout. Finally, treat every stockout as an audit event. Record what the reorder point was, what stock was when the order went out, and which input lied — demand, lead time or the count itself. Three audits usually fix the input that actually causes your stockouts, which is rarely the one you suspected.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Using the supplier's quoted lead time</strong><span className="text-neutral-600 font-light leading-relaxed">Quoted lead time is production time on a good week. Real lead time includes freight, customs, receiving and the supplier's bad weeks. Measure your last five orders and use the average — or the worst, for critical products.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Calculating with stale average sales</strong><span className="text-neutral-600 font-light leading-relaxed">A reorder point built on last quarter's demand fails exactly when demand changes — launches, virality, seasonality. Recalculate monthly for hero products, quarterly for the long tail.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Setting safety stock to zero to 'be lean'</strong><span className="text-neutral-600 font-light leading-relaxed">Zero safety stock means any delay or spike becomes a stockout. Lean inventory is a working-capital choice; zero buffer is a gamble disguised as one.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Put the reorder point where the work happens: in your inventory sheet, your purchase-order checklist, or as a low-stock alert in your platform. Recalculate after any demand shift, supplier change or lead-time change. The cheapest inventory system in the world is a correct number checked weekly.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
