import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import { generateCalculatorMetadata } from "@/config/metadata"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Sales Tax Calculator + VAT Calculator: Add or Extract Tax Instantly",
  description: "Calculate US sales tax by state (base rate plus local add-on) or VAT for UK, EU and global rates. Add tax to a net price or extract tax from a gross price.",
  keywords: ["sales tax calculator", "vat calculator", "sales tax by state", "how to calculate sales tax", "vat inclusive exclusive calculator"],
  slug: "ecommerce/sales-tax-vat-calculator",
  category: "E-Commerce",
})

const faqs: FAQ[] = [
  {
    "question": "How do I calculate sales tax on a purchase?",
    "answer": "Multiply the net price by the combined tax rate (state plus local), then add it to the price. A $250 purchase at a combined 8.75 percent rate carries $21.88 of tax, for a $271.88 total. This calculator's Add mode does it with the state base and a local add-on."
  },
  {
    "question": "Which US states have no statewide sales tax?",
    "answer": "Alaska, Delaware, Montana, New Hampshire and Oregon have no statewide sales tax. Alaska permits local sales taxes, so some Alaskan purchases are still taxed. Everywhere else, expect a state base rate plus local additions."
  },
  {
    "question": "How do I work out the VAT in a price?",
    "answer": "Divide the gross price by 1 plus the VAT rate to get the net, then subtract: at 20 percent, a £120 price divides to £100 net, so the VAT is £20. Never multiply the gross by the rate — that overstates the tax."
  },
  {
    "question": "What is the difference between sales tax and VAT?",
    "answer": "Sales tax is charged once, to the final consumer, and is usually added at checkout in the US. VAT is charged at every stage of the supply chain with businesses reclaiming input tax, and is usually included in the displayed price. Both are consumption taxes; their mechanics, rates and filing differ entirely."
  },
  {
    "question": "Are these rates guaranteed current?",
    "answer": "Rates are approximate 2026 figures for calculation and planning. State and local rates change frequently, and your exact US rate depends on the delivery address. Confirm transactional rates with your checkout tax engine or state authority before filing."
  }
]

export default function Page() {
  return (
    <ToolLayout
      title="Sales Tax & VAT Calculator"
      description="Calculate US sales tax by state (base rate plus local add-on) or VAT for UK, EU and global rates. Add tax to a net price or extract tax from a gross price."
      slug="sales-tax-vat-calculator"
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
            <p className="text-neutral-600 leading-relaxed text-lg">To add tax, multiply the net price by the rate: $100 at a combined 8.75 percent is $8.75 tax, $108.75 total. To find the tax inside a tax-inclusive VAT price, never multiply by the rate — divide the gross by 1 plus the rate first: $120 at 20 percent VAT contains exactly $20 of tax.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Two Tax Systems, Two Opposite Habits</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">US sales tax and VAT look similar on a receipt and work almost oppositely in practice. Sales tax is charged once, at the point of sale to the final consumer, at a combined rate assembled from state, county, city and special-district layers — which is why one state's 4 percent base can become 10.25 percent at a Chicago till, and why five states manage with no statewide tax at all. VAT is charged at every stage of production and distribution, with businesses reclaiming the tax on their inputs, and it is normally baked into the displayed price: the €120 on the shelf in Berlin already contains its 19 percent.</p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">For an online seller this creates two daily tasks, and this calculator handles both. Add mode prices a net amount upward — the US checkout question, 'how much tax do I collect on this order?' Extract mode pulls the tax out of a gross amount — the VAT question, 'how much of this price is tax, and what is my true net revenue?' The second is where the expensive error lives: multiplying a gross VAT-inclusive price by the rate overstates the tax. On €1,000,000 of German sales, multiplying by 19 percent claims €190,000 of VAT; the correct figure is €159,664. The €30,000 difference is an accounting incident, not a rounding error.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Add Tax: Tax = Net × Rate, Total = Net + Tax  ·  Extract Tax: Net = Gross ÷ (1 + Rate), Tax = Gross − Net  ·  US Combined Rate = State Base + Local Add-On</div>
          </div>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">The state table in this calculator lists approximate 2026 statewide base rates — the floor, not the final answer. Local taxes add on top in most states (the slider defaults to a typical 1.5 percent), and the true destination rate depends on the buyer's address, which is why marketplaces and tax engines calculate by postcode. Oregon, Montana, New Hampshire, Delaware and Alaska show 0 percent statewide; Alaska still has local sales taxes in many boroughs. For VAT, presets cover common standard and reduced rates, and the custom slider covers the rest. If you sell cross-border, remember VAT generally follows the customer's country, not yours — the rate to apply is the destination's.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
          <ol className="space-y-4 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Choose the system: US Sales Tax or VAT.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Choose the direction: Add tax to a net price, or Extract tax from a gross, tax-inclusive price.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Enter the amount, pick the state (plus local add-on) or the VAT preset or custom rate.</span></li>
            <li className="flex items-start gap-4 p-5 bg-white border border-neutral-200 shadow-sm rounded-2xl"><CheckCircle2 className="h-6 w-6 text-[#D97706] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light leading-relaxed">Read the tax amount, net and gross figures. For US totals, sanity-check the combined rate against your checkout's rate for that destination.</span></li>
          </ol>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples with Real Numbers</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 1: A $250 Order Shipped to California</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A store sells a $250 item to a buyer in a California city with typical local taxes. The state base is 7.25 percent; with a 1.5 percent local add-on the combined rate is 8.75 percent. Tax is $250 × 8.75% = $21.88 and the customer pays $271.88. Ship the same order to Oregon and the statewide tax is $0 — the calculator's state switch shows in one click why US sellers cannot use a single tax rate, and why nexus and destination rules dominate their compliance setup.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Worked Example 2: Extracting UK VAT from £12,000 of Sales</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">A UK seller takes £12,000 in VAT-inclusive sales at the 20 percent standard rate. The tax inside is not £2,400 (multiplying by 20 percent) — it is £12,000 − (£12,000 ÷ 1.20) = £12,000 − £10,000 = £2,000. Net revenue is £10,000. Sellers who use the multiply method overstate both their VAT bill and, in the other direction, misprice their true net revenue on every international dashboard they build.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Going Deeper: What Experienced Operators Do Next</h2>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">For sellers, the operational lesson behind these formulas is nexus and registration discipline. In the US, your duty to collect sales tax follows economic nexus thresholds — commonly $100,000 of sales or 200 transactions in a state, though rules vary and some states have dropped the transaction test — plus any physical presence. Marketplaces collect on your behalf in most states, which simplifies marketplace sales but not your own store's. For VAT, selling goods or digital services into the UK or EU triggers registration or scheme obligations (such as IOSS for EU imports and the UK's rules for overseas sellers) with the destination rate applied. Keep clean records of where buyers are, which rate you applied, and the net/tax split on every order — the extract formula in this calculator is exactly the split your bookkeeping needs. When in doubt at scale, a specialist accountant for one hour costs less than one corrected quarter.</p>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Distort the Answer</h2>
          <ul className="space-y-6 mb-12 list-none pl-0">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Multiplying a VAT-inclusive price by the rate</strong><span className="text-neutral-600 font-light leading-relaxed">The tax inside a gross price is Gross − Gross ÷ (1 + rate). Multiplying overstates VAT by rate-squared — 19 percent becomes an effective over-claim of thousands at scale.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Using only the US state base rate</strong><span className="text-neutral-600 font-light leading-relaxed">State base is the floor. County, city and district taxes routinely add 1–4 points. Pricing, nexus decisions and checkout configuration all need the combined destination rate.</span></div></li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-xl mb-2">Applying your home VAT rate to foreign customers</strong><span className="text-neutral-600 font-light leading-relaxed">VAT for B2C digital and distance sales generally follows the customer's location. Charging 20 percent UK VAT to a German consumer (19 percent) or a US buyer (no VAT) misprices and misreports simultaneously.</span></div></li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">Use this calculator for quotes, pricing decisions, cross-border listings and quick compliance sanity checks — not as your filing system. At volume, use a tax engine integrated with checkout and file on its reports. But keep this tool's two formulas in your head: they are enough to catch the errors that engines and staff make silently for months.</p>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
