import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Black Friday Discount Calculator: Volume Needed to Keep Profit",
  description: "Calculate whether your Black Friday discount makes money: discounted margin, profit per unit, and the exact volume uplift needed just to match a normal period.",
  keywords: ["black friday discount calculator", "discount roi calculator", "sale discount profit calculator", "how much volume to break even on a discount", "discount margin calculator"],
  slug: "ecommerce/black-friday-discount-roi-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "How much extra volume do I need to make a discount profitable?",
    "answer": "Divide your normal total profit by your profit per unit at the sale price to get required units, then compare with normal volume. At a 45 percent margin, a 30 percent discount typically requires about three times the volume; a 15 percent discount requires about 1.5 times."
  },
  {
    "question": "What is the maximum discount I can offer?",
    "answer": "Never more than your margin percentage — beyond that every unit loses money. Practically, keep a profit buffer: many healthy stores cap headline discounts at half to two thirds of their margin, and use bundles or gifts instead of deeper price cuts."
  },
  {
    "question": "Why did my revenue rise but profit fall during Black Friday?",
    "answer": "Because discounts come entirely out of profit per unit while costs stay fixed. A 30 percent price cut can remove 60–70 percent of unit profit, so even a large volume increase may not compensate — especially with peak-season ad costs added."
  },
  {
    "question": "Is a bundle better than a discount?",
    "answer": "Often, yes. A bundle raises order value and spreads shipping and fixed fees, while the 'discount' is partly funded by the extra items' margin. Model both here: compare profit per order, not just conversion rate."
  },
  {
    "question": "Should I include ad spend in the discount calculation?",
    "answer": "This calculator isolates the discount maths. For the full picture, add expected ad cost per order to your total cost per unit during the event — Black Friday CPMs can add several dollars per order and change the answer materially."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Black Friday Discount ROI Calculator"
      description="Calculate whether your Black Friday discount makes money: discounted margin, profit per unit, and the exact volume uplift needed just to match a normal period."
      slug="black-friday-discount-roi-calculator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">A discount cuts profit per unit far faster than it cuts price. At a 45 percent margin, a 30 percent discount destroys two thirds of your profit per unit, so you need roughly triple the volume just to match a normal period — before the extra ad spend Black Friday demands.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Revenue Goes Up. Profit Is a Different Question.</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Black Friday reporting is built to flatter discounts. Revenue records fall, order counts spike, and dashboards glow green — while profit, the only number that pays January's bills, quietly collapses. The mechanism is simple leverage: your costs do not attend the sale. A product priced at $100 with $55 of costs earns $45. Cut the price 30 percent and revenue per unit falls by $30 — but profit per unit falls from $45 to $15, a 67 percent destruction. To stand still on total profit you must sell three times as many units, through the most expensive advertising week of the year, with a team running on overtime.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">None of this means 'never discount'. It means discount with your eyes open and a number in hand: the volume uplift required to match a normal period, which this calculator returns. If your realistic uplift — based on your list size, traffic and last year's data — clears that bar with room to spare, run the sale proudly. If it does not, you have better options: a shallower discount, a bundle that protects per-unit profit, a gift-with-purchase that costs less than its perceived value, or a VIP offer to your list instead of a public price cut that trains strangers to wait for sales.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Sale Profit per Unit = Price × (1 − Discount %) − Total Cost  ·  Units Needed = Normal Total Profit ÷ Sale Profit per Unit  ·  Uplift Needed = Units Needed ÷ Normal Units − 1</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The formula exposes the asymmetry: discount comes entirely out of profit, because cost per unit is fixed. That is why the margin you start with matters so much. At a 70 percent margin, a 30 percent discount still leaves $40 of every $100 price as profit and needs a 75 percent uplift. At a 30 percent margin, the same discount wipes profit to zero — no volume can save an offer that loses money per unit; more sales simply scale the loss. Use total cost per unit here: COGS, fulfilment, payment fees and packaging. Leaving fees out understates cost and overstates how deep you can safely cut.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter regular price and total cost per unit, plus units sold in a comparable normal period.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Slide the planned discount and read profit per unit on sale and the uplift needed to match normal profit.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Slide your realistic expected uplift — from last year or your traffic plan — and compare profit outcomes.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">If expected uplift falls short, test a shallower discount or a bundle in the calculator before committing.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: 30% Off a $100 Product Needs +200% Volume</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A store sells 1,000 units a month at $100 with $55 total cost — $45,000 normal profit. A 30 percent Black Friday discount sets the price at $70 and profit per unit at $15. Matching $45,000 now requires 3,000 units: a 200 percent uplift. If the store realistically expects a strong +80 percent uplift (1,800 units), sale profit is $27,000 — revenue rises from $100,000 to $126,000 while profit falls by $18,000. The sale 'worked' everywhere except the bank account.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: The Same Store at 15% Off</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">At 15 percent off, price becomes $85 and profit per unit $30. Matching normal profit needs 1,500 units — a 50 percent uplift, well inside the expected +80 percent. At 1,800 units, profit is $54,000: $9,000 more than a normal period, with a headline discount still strong enough to convert. Halving the discount more than doubled the sale's profit. This is the calculation that separates stores that 'win' Black Friday from stores that merely survive it.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Plan the whole event, not just the headline discount, with the same discipline. Email and SMS traffic carries near-zero marginal acquisition cost, so list-driven orders survive discounts that paid-traffic orders cannot — model your channel mix honestly when estimating uplift. Protect the offer architecture too: a threshold gift ('free gift over $120') often outperforms an equivalent percentage cut because it raises basket size instead of lowering every price, and bundles defend per-unit profit by mixing full-margin items into the discounted basket. Finally, decide the exit in advance: when the event ends, prices return without apology or extension. Stores that extend 'one more day' repeatedly train their audience to ignore full price, converting a profitable seasonal spike into a permanent margin leak. Measure this year's event in profit, file the numbers, and let next year's discount be set by evidence rather than by whatever competitors announce in November.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Measuring the sale on revenue</strong><span className="text-neutral-600 font-light leading-relaxed">Revenue records with falling profit are the defining Black Friday failure. Set the target in advance in profit terms — and track returns in January, which claw back a further slice of discounted orders.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Discounting deeper than your margin</strong><span className="text-neutral-600 font-light leading-relaxed">If the discount percentage exceeds your margin percentage, every unit loses money. Volume cannot fix a negative unit profit; it industrialises it.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Forgetting the cost of the traffic</strong><span className="text-neutral-600 font-light leading-relaxed">CPMs peak on Black Friday. The uplift you buy with ads costs more per order than the uplift from your email list, which is why list-driven sales survive discounts that ad-driven sales cannot.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Decide your discount from this calculator, not from competitor banners. Set a profit floor for the event, model the discount that protects it at a realistic uplift, and prepare a shallower-discount or bundle fallback. Then measure the actual event on profit per unit and total profit — and write the result down for next year's planning.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
