import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Amazon FBA Calculator: Profit After Referral, FBA & Storage Fees",
  description: "Calculate true Amazon FBA profit per unit: price minus COGS, category referral fee (8–20%), FBA fulfilment fee by size tier, storage and inbound shipping.",
  keywords: ["amazon fba calculator", "fba fee calculator", "amazon referral fee calculator", "fba profit calculator", "amazon seller fees"],
  slug: "ecommerce/amazon-fba-fee-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "How much does Amazon FBA charge per sale?",
    "answer": "Three main charges stack: a referral fee of 8–20 percent of the sales price depending on category, a fulfilment fee set by size tier and weight (roughly $3.22 for the smallest standard items to well over $10 for bulky), and monthly storage per cubic foot. Inbound shipping and aged-inventory fees add more."
  },
  {
    "question": "What is the Amazon referral fee by category?",
    "answer": "Common rates: Electronics 8 percent, Home & Kitchen 15 percent, Health & Beauty 15 percent, Clothing 17 percent, Toys 17 percent, Grocery 8–15 percent by price. Rates and the base they apply to change periodically — confirm in Seller Central for your exact category."
  },
  {
    "question": "How are FBA fulfilment fees determined?",
    "answer": "By size tier and shipping weight, both set from your packaged product's dimensions. Tiers run from small standard through large bulky and oversize. Small packaging changes can move a product between tiers, which is why packaging design is a profit lever for FBA sellers."
  },
  {
    "question": "What margin should an FBA product have?",
    "answer": "Aim for at least 25–30 percent net margin after all Amazon fees and COGS but before advertising, so PPC at a sustainable ACoS still leaves profit. Below 15 percent pre-ad margin, most products cannot advertise profitably."
  },
  {
    "question": "Are these fees exact for my products?",
    "answer": "No — they are approximate 2026 US planning figures. Your exact referral rate, tier and storage depend on your category, measured package and inventory age. Use this calculator to screen products, then confirm in Amazon's own Revenue Calculator inside Seller Central."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Amazon FBA Fee Calculator"
      description="Calculate true Amazon FBA profit per unit: price minus COGS, category referral fee (8–20%), FBA fulfilment fee by size tier, storage and inbound shipping."
      slug="amazon-fba-fee-calculator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">True FBA profit is price minus landed cost, the category referral fee of 8 to 20 percent, the fulfilment fee set by your size tier, storage and inbound shipping. On a typical $39.99 product those Amazon fees total $11 to $14 before advertising — plan on it, do not discover it.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Amazon's Fees Are a System, Not a Number</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">New sellers usually learn about the referral fee — the 8 to 20 percent commission by category — and stop there. But Amazon's take is a stack: referral fee, then a fulfilment fee determined by size tier and weight, then monthly storage, then aged-inventory surcharges if stock sits, plus inbound shipping to get product into the network. On the worked example below, referral plus fulfilment alone claim about 30 percent of the selling price. Sellers who source product against the referral fee only routinely find 10 to 15 points of margin missing when the first settlement report arrives.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The most dangerous element is the size tier, because it is set by Amazon from your package dimensions and can change when packaging changes. A product a few millimetres over a threshold jumps a tier and can lose $1–2 per unit forever — a cost no negotiation with a supplier will recover as easily as a packaging redesign will. This calculator uses approximate 2026 US fees by tier for planning: good enough to kill bad products at the sourcing stage, which is exactly when fee maths matters most. Confirm exact fees in Seller Central before committing to inventory.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">FBA Profit = Price − COGS − (Price × Referral %) − FBA Fulfilment Fee (size tier) − Storage per Unit − Inbound Shipping per Unit</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Work the formula in order of leverage. Referral percentage is fixed by category — you cannot negotiate it, but you can choose categories and price points where it hurts less; note that several categories charge referral on the total sales price including shipping. The fulfilment fee is partly in your control through packaging. Storage per unit depends on your sell-through: a unit that sells in 30 days carries a fraction of the storage of one that sits for 120, which is why this calculator asks for it as an average per sold unit. Inbound shipping varies by placement options — sending to one location costs more in placement fees but less in freight, and vice versa. Add your advertising cost per unit afterwards to get the number that actually reaches your bank.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter selling price and landed COGS — product, packaging and freight to your door included.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Select your Amazon category so the correct referral percentage applies.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Select the size tier that matches your packaged dimensions and weight (measure, do not guess).</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Add average storage and inbound shipping per unit, and your monthly volume to see unit and monthly profit.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A $39.99 Home Product That Keeps $16.64</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A kitchen product sells for $39.99 with landed COGS of $11. In Home & Kitchen the referral fee is 15 percent: $6.00. Packaged, it falls in the large-standard 1 lb tier at about $5.10 fulfilment. Storage averages $0.45 per unit and inbound shipping $0.80. Total deductions are $11 + $6.00 + $5.10 + $0.45 + $0.80 = $23.35, leaving a profit of $16.64 per unit — a 41.6 percent margin on price. At 500 units a month that is $8,320 before PPC. Healthy, provided ACoS stays controlled.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: The Tier Jump That Kills a Product</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">A seller redesigns gift packaging and the box grows slightly. Amazon re-measures and moves the product from the $5.10 tier to a $7.10 large-standard tier. Nothing else changes — same price, same COGS, same referral — but profit per unit falls by exactly $2.00, a 12 percent profit cut at 500 units: $1,000 a month gone to cardboard. The fixes are packaging engineering (vacuum-sealing, flatter boxes, removing inserts) or a repricing — both far cheaper than absorbing the tier for a year.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">Two advanced checks separate profitable FBA catalogues from busy ones. First, calculate profit at your returns rate: in categories like apparel, a fifth of gross sales can return, and each return can carry fees and unsellable units — run this calculator on net kept sales, not shipments, for a truer figure. Second, watch the calendar. Storage pricing roughly doubles in Q4 per cubic foot, and aged-inventory surcharges begin long before stock feels old; a product that is comfortably profitable on January storage can be marginal on November storage if sell-through slips. Build a quarterly fee review into your operations: re-measure your top packages (Amazon's measurements, not yours, are the ones that bill you), re-check referral categories after any listing edit, and re-run this calculator with the new numbers before reordering. Fees drift; margins should be re-proven, not presumed.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Sourcing against referral fee only</strong><span className="text-neutral-600 font-light leading-relaxed">Referral is roughly half the typical Amazon take. Sellers who ignore fulfilment, storage and inbound at sourcing discover the other half in their settlement reports.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Guessing your size tier</strong><span className="text-neutral-600 font-light leading-relaxed">Tier is set by measured dimensions and weight, and small changes jump fees. Measure the final retail package precisely and design packaging to sit safely inside a cheaper tier.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Forgetting storage ageing</strong><span className="text-neutral-600 font-light leading-relaxed">Storage is cheap for fast movers and punitive for slow ones, with aged-inventory surcharges after 181+ days. A product that 'still profits' at 30-day sell-through can lose money at 120 days.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Use this calculator at the sourcing table, not after the purchase order. Kill or redesign products that cannot hold at least a 25–30 percent pre-advertising margin at realistic tiers, because PPC will take its share next. Then verify your live fees monthly in Seller Central — Amazon re-measures, re-tiers and reprices on its own schedule.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
