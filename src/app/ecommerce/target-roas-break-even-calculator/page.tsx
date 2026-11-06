import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "ROAS Calculator: Find Your Break-Even ROAS Before You Spend",
  description: "Calculate your break-even ROAS from your true gross margin. See your maximum allowable CPA and whether your current campaigns actually make money on every order.",
  keywords: ["roas calculator", "break even roas calculator", "target roas calculator", "how to calculate roas", "maximum allowable cpa"],
  slug: "ecommerce/target-roas-break-even-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "How do you calculate break-even ROAS?",
    "answer": "Divide 1 by your gross margin expressed as a decimal. At a 40 percent margin, break-even ROAS is 1 ÷ 0.40 = 2.5x. Your margin must include COGS, shipping, payment fees and other per-order costs, or the result will be dangerously optimistic."
  },
  {
    "question": "What is a good ROAS for e-commerce?",
    "answer": "There is no universal good ROAS. A good ROAS is one comfortably above your own break-even — typically 20–50 percent above it, so overheads and returns are covered. For a 50 percent margin store that may be 2.5–3x; for a 20 percent margin store it may need to exceed 6x."
  },
  {
    "question": "What is maximum allowable CPA?",
    "answer": "It is your gross profit per order — the most you can spend acquiring one order before that order stops making money. Here it equals price minus all per-order costs. Any CPA below it leaves profit; any CPA above it loses money on the order."
  },
  {
    "question": "Should my ROAS target include overheads like salaries and rent?",
    "answer": "Break-even ROAS covers per-order costs only. To cover fixed overheads too, target a ROAS above break-even. A practical approach is to add your monthly overhead divided by expected orders to your per-order costs, then recalculate."
  },
  {
    "question": "Why does my agency report a different ROAS?",
    "answer": "Agencies usually report platform ROAS on attributed revenue, often with generous attribution windows, and without your margin or costs. Both numbers can be 'correct' while telling opposite stories. Judge profitability with your margin, not the platform's attribution."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Target ROAS Break-Even Calculator"
      description="Calculate your break-even ROAS from your true gross margin. See your maximum allowable CPA and whether your current campaigns actually make money on every order."
      slug="target-roas-break-even-calculator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">Your break-even ROAS is 1 divided by your gross margin. A store with a 50 percent margin breaks even at a 2.0x ROAS; at 25 percent margin it needs 4.0x. Below break-even, every order loses money no matter how impressive revenue looks in the ad dashboard.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Why Most Stores Set Their ROAS Target Backwards</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Most advertisers pick a ROAS target because it sounds good — 3x, 4x, 5x — or because an agency reported it last quarter. That is backwards. Your break-even ROAS is not a preference, it is a mathematical consequence of your margin. If your margin after product cost, shipping and fees is 40 percent, then out of every $100 of revenue you keep $40 before ads. Spending more than $40 to win that $100 guarantees a loss, which means your break-even is exactly 2.5x. Any target below that is a plan to lose money slowly.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The second problem is which margin stores use. Gross margin on the product alone ignores shipping subsidies, payment fees, packaging, returns and discount codes — the costs that turn a healthy-looking 60 percent product margin into a 32 percent contribution margin. This calculator forces the honest version: price minus every per-order cost. The break-even it returns is therefore higher than most stores expect, and that discomfort is precisely the point. It is far better to discover your real break-even here than in your bank balance at the end of the quarter.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Break-Even ROAS = 1 ÷ Gross Margin  ·  Gross Margin = (Price − COGS − Shipping − Fees) ÷ Price  ·  Max CPA = Gross Profit per Order</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The formula works because ROAS and margin are reciprocals of the same relationship. Margin tells you what fraction of each revenue dollar survives product costs; break-even ROAS tells you how many revenue dollars one ad dollar must return for the surviving fraction to exactly cover the ad dollar. When margin is 100 percent — a pure digital product with no per-order cost — break-even is 1.0x. Every real cost pushes it up. Work through your own numbers above and note how sensitive the result is: shaving $5 off shipping can move break-even from 3.3x to 2.9x, which is often easier than demanding 15 percent more efficiency from your ads.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter your selling price and every per-order cost: COGS, shipping, packaging, transaction fees and an allowance for returns.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Read your true gross margin and break-even ROAS in the results panel.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Set the slider to the ROAS your campaigns actually deliver today.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Check net profit per order. If it is negative at your live ROAS, pause scaling and fix margin, price or targeting — in that order.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A $80 Product with a $40 Gross Profit</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A home-goods store sells a lamp for $80. COGS is $28, shipping costs $7 and packaging plus payment fees come to $5, leaving $40 gross profit — a 50 percent margin. Break-even ROAS is 1 ÷ 0.50 = 2.0x, and the maximum the store can pay to acquire an order is $40. At its current 3.0x ROAS, ad cost per order is $80 ÷ 3 = $26.67, leaving $13.33 profit per order. The store can scale — carefully — because each order genuinely funds the next.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: The Same Store at a 28 Percent Margin</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Now suppose shipping rises and a permanent 10 percent discount code is added. True margin falls to 28 percent. Break-even jumps to 1 ÷ 0.28 = 3.57x. The campaigns still report 3.0x ROAS and revenue still grows, but ad cost per order ($26.67) now exceeds the $22.40 gross profit on a discounted $72 order — the store loses roughly $4 on every sale. Nothing changed in the ad account. The margin moved, the break-even moved, and the business crossed from profit to loss without a single warning from the ad platform.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">One refinement separates serious operators from dashboard watchers: calculate break-even at the level you actually make decisions. Account-level break-even hides the truth that your hero product subsidises three losers. Product-level break-even per hero SKU is the practical standard — it needs only the per-order costs you already entered, applied per product. Where products share campaigns, weight by revenue mix. Also revisit break-even whenever a cost moves: a freight increase, a new 3PL rate card, a payment-processor change. Break-even drift is silent; the stores that catch a 0.4x rise in the month it happens keep their quarter, and the stores that notice at year-end write post-mortems about rising ad costs that were actually rising break-evens. Put the number in the same weekly report as ROAS itself, side by side, because neither means anything alone.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Using product margin instead of contribution margin</strong><span className="text-neutral-600 font-light leading-relaxed">If shipping, fees, returns and discounts are not in the cost column, your break-even is fiction. Most stores that 'cannot make ads work' are actually working from a margin that does not exist.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Judging ROAS on revenue, not profit</strong><span className="text-neutral-600 font-light leading-relaxed">A 5x ROAS on a 15 percent margin product loses money; a 2.2x ROAS on a 60 percent margin product prints it. ROAS has no meaning until it is placed next to margin.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Averaging ROAS across all products</strong><span className="text-neutral-600 font-light leading-relaxed">Blended account ROAS hides the products below break-even. Calculate break-even per hero product or per margin tier, and let the losers go.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Use this calculator before every budget increase and every sale event. Your ROAS target should be a decision you derive from margin — with a safety buffer of 15–25 percent above break-even to cover overheads — never a number you inherit from a dashboard default or a competitor's claim.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
