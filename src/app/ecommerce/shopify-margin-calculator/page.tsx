import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Shopify Profit Calculator: True Margin After Fees, COGS & Shipping",
  description: "Calculate your true Shopify profit per order after COGS, Shopify Payments fees (2.9% + $0.30), shipping and apps. See real margin and monthly profit, not gross margin.",
  keywords: ["shopify margin calculator", "shopify profit calculator", "shopify fee calculator", "true profit per order shopify", "ecommerce margin calculator"],
  slug: "ecommerce/shopify-margin-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "How much does Shopify take from each sale?",
    "answer": "Shopify Payments charges 2.9% + $0.30 per transaction on the Basic plan in the US, with lower percentage rates on higher plans. If you use a third-party payment gateway, Shopify adds a transaction fee of 0.5–2% depending on plan. Your monthly plan subscription is separate and not per-order."
  },
  {
    "question": "What is a good profit margin for a Shopify store?",
    "answer": "A true (net-of-fees) margin of 30–50 percent per order before ad spend is workable; above 50 percent is strong. Below 20 percent, paid acquisition is usually unprofitable because break-even ROAS climbs above 5x. Always measure true margin, not gross margin."
  },
  {
    "question": "Does Shopify charge fees on shipping I charge customers?",
    "answer": "Yes. Payment processing percentages apply to the total charged amount, including shipping and taxes collected. That is why the calculator applies 2.9% + $0.30 to price plus shipping charged."
  },
  {
    "question": "How do I increase my Shopify margin without raising prices?",
    "answer": "Bundle products to spread the fixed $0.30 fee and shipping over more revenue, negotiate COGS at higher volumes, close the gap between shipping charged and shipping cost, and cut apps that do not earn their per-order cost."
  },
  {
    "question": "Should I include ad spend in this margin?",
    "answer": "No — this calculator finds your contribution margin before ads, which is the number that sets your break-even ROAS and maximum CPA. Subtract ad cost per order afterwards, or use our ROAS calculator with this margin."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Shopify Margin Calculator"
      description="Calculate your true Shopify profit per order after COGS, Shopify Payments fees (2.9% + $0.30), shipping and apps. See real margin and monthly profit, not gross margin."
      slug="shopify-margin-calculator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">Your true Shopify margin is what remains after COGS, the Shopify Payments fee of 2.9 percent plus $0.30, shipping and per-order app and packaging costs — not the gap between price and product cost. Many stores quoting a 60 percent gross margin keep under 35 percent in reality.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Margin Your Product Page Does Not Show You</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Ask most Shopify merchants their margin and they will subtract product cost from price and divide by price. That number is real, but it is not the margin your business lives on. Between the customer's click and money in your account, Shopify Payments takes 2.9 percent plus $0.30 on the whole charged amount, shipping is rarely fully recovered, packaging and app costs attach to every order, and returns quietly tax the rest. A product that looks like a 63 percent margin at $60 with a $22 cost is often a 40 percent business by the time it ships.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">This distinction decides everything downstream. Your break-even ROAS, your discount ceiling on Black Friday, your free-shipping threshold and your ability to pay for content all come out of true margin, not gross margin. Stores get into trouble in a predictable sequence: they price from gross margin, set ad targets from that fantasy number, grow revenue, and then cannot understand why the bank account does not grow with it. Run every hero product through this calculator once and you will never price from the product page again.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">True Profit = Price + Shipping Charged − COGS − Shipping Cost − (Charged × 2.9% + $0.30) − Other Costs  ·  True Margin = True Profit ÷ Charged</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Two details matter in the formula. First, the payment fee is charged on the total the customer pays, including any shipping you charge — so 'free shipping' built into a higher price still pays the fee on that amount. Second, shipping charged and shipping cost are separate lines: the gap between them is either a quiet profit centre or a quiet leak, and most stores have never measured which. Enter both honestly. If your plan is Shopify Basic, the 2.9 percent plus $0.30 rate applies; Grow and Advanced plans pay slightly less, and third-party gateways add Shopify's transaction fee on top — adjust the 'other cost' line if you use an external gateway.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter the selling price and landed COGS for one product.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Add shipping charged to the customer and your actual shipping cost — they are rarely equal.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter per-order extras: packaging, app costs spread per order, and an allowance for returns.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Read true profit, true margin and monthly profit at your current order volume.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A $60 Candle Set That Keeps $27.96</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A candle set sells for $60 with $22 COGS. Shipping is free to the customer and costs the store $6; packaging and apps add $2 per order. The customer is charged $60, so Shopify Payments takes $60 × 2.9% + $0.30 = $2.04. True profit is $60 − $22 − $6 − $2.04 − $2 = $27.96... before ads. True margin is 46.6 percent — healthy, but a long way from the 63 percent gross margin the owner quoted. At 300 orders a month that is $8,388 of monthly profit available for ads, wages and growth.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: The $25 Product the Fee Structure Punishes</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">A $25 accessory with $11 COGS shows a 56 percent gross margin. Charge $4.99 shipping and the customer pays $29.99; the payment fee is $29.99 × 2.9% + $0.30 = $1.17. Actual shipping costs $5.80 and extras are $1.50. True profit is $29.99 − $11 − $5.80 − $1.17 − $1.50 = $10.52, a 35 percent true margin. The fixed $0.30 fee and shipping gap hurt cheap products disproportionately — which is why low-AOV stores feel 'busy but broke'. Bundling two units into one $45 order would raise true profit per order by roughly 40 percent.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Once you know true margin per product, three decisions change immediately. First, your catalogue sorts itself: a minority of products usually carry margins that can fund ads, discounts and free shipping, while the long tail quietly cannot — and should be sold organically, bundled, or retired. Second, your free-shipping threshold stops being a guess, because you can see exactly which basket sizes keep shipping inside margin. Third, hiring and app decisions get a denominator: an app costing $49 a month must be judged against per-order profit times volume, not against revenue. Revisit the calculation at every plan change too — moving from Basic to a higher Shopify plan lowers your percentage payment rate, which on high volume is worth real margin points, while adding a third-party gateway moves it the other way. Margin is not a property of a product; it is a property of a product, a plan, a shipping policy and a moment in time.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Pricing from gross margin</strong><span className="text-neutral-600 font-light leading-relaxed">Gross margin ignores payment fees, shipping gaps and returns. Every decision built on it — ad targets, discounts, free-shipping thresholds — inherits the error.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Forgetting the fee applies to shipping charged too</strong><span className="text-neutral-600 font-light leading-relaxed">Shopify Payments percentages apply to the full charged amount. Stores that add a shipping charge to 'cover costs' still lose 2.9 percent of it to the gateway.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Ignoring returns in per-order cost</strong><span className="text-neutral-600 font-light leading-relaxed">A 6 percent return rate on a $60 item is a real per-order cost once return shipping and unsellable stock are counted. Add an allowance line, even if it is approximate.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Recalculate true margin whenever COGS, shipping rates or your plan changes, and always before a promotion. If true margin is under 20 percent, ads will almost never rescue the product — your break-even ROAS will sit above 5x. Fix price, bundle, or cost first; then advertise.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
