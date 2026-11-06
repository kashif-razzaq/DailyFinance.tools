import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'CapEx Reserve Planner: Monthly Reserves for Roof, HVAC & Major Repairs',
  description: 'Plan capital expenditure reserves for rental property: enter replacement cost and lifespan for roof, HVAC, water heater and more to get your true monthly reserve.',
  keywords: ['capex calculator rental property', 'capital expenditure reserve calculator', 'rental property reserves calculator', 'roof replacement reserve', 'capex reserve planner'],
  slug: "real-estate/capex-reserve-planner",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the CapEx Reserve Planner?",
    "answer": "Adjust each component's replacement cost to quotes in your market \u2014 a roof in Florida and a roof in Ohio differ. Set realistic lifespans for the current age and condition, not the brochure life of a new unit (start the clock part-way for used components). Add units if you hold multiple properties; reserves scale per roof, per furnace. Transfer the resulting monthly figure into your cash flow underwriting as a non-negotiable line."
  },
  {
    "question": "What is the formula behind the CapEx Reserve Planner?",
    "answer": "Monthly Reserve (per item) = Replacement Cost \u00f7 (Lifespan in Years \u00d7 12) \u00b7 Total Reserve = \u03a3 All Items \u2014 CapEx (capital expenditures) are large, infrequent replacements \u2014 roof, HVAC, water heater \u2014 distinct from routine maintenance like repairs and cleaning. Lenders and buyers both deduct a CapEx reserve when valuing rental income."
  },
  {
    "question": "Worked example: what does a realistic CapEx Reserve Planner result look like?",
    "answer": "With the defaults \u2014 roof $12,000/25 years ($40/mo), HVAC $8,000/15 ($44), water heater $1,500/10 ($13), appliances $4,000/12 ($28), paint $5,000/7 ($60), flooring $6,000/15 ($33), plumbing $3,000/25 ($10), driveway $4,500/20 ($19) \u2014 the total reserve is about $247 a month. A property 'cash flowing' $250 a month with no CapEx line is, on honest accounting, cash flowing about $3. The reserve is the difference between a business and a surprise subscription."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Counting CapEx as maintenance: A 5% maintenance reserve covers leaks and calls, not a $12,000 roof. Mixing the two guarantees the big item arrives unfunded."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='CapEx Reserve Planner' description='Plan capital expenditure reserves for rental property: enter replacement cost and lifespan for roof, HVAC, water heater and more to get your true monthly reserve.' slug="capex-reserve-planner" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">A CapEx reserve converts big, predictable replacements into a small monthly cost: for each component, reserve its replacement cost divided by its lifespan in months. Add the components together and that sum — commonly $200–$350 a month for a single-family rental — is what must be set aside or your cash flow is overstated.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Every component of a house is a countdown. Roofs, furnaces, water heaters, appliances and driveways all expire on roughly known schedules at roughly knowable prices — yet most rental underwriting treats their replacement as an act of God rather than a cost of doing business. Capital expenditure planning is simply the refusal to be surprised: divide each future bill by the months remaining to pay it, and set that amount aside monthly.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The distinction between maintenance and CapEx matters for taxes and for honesty. Maintenance — repairs, cleaning, minor fixes — is an operating expense deducted as incurred. CapEx items are capitalised and depreciated over their useful lives. But for cash planning the tax treatment is secondary: both leave your account, and only CapEx arrives in five-figure lumps. Investors who reserve for maintenance but not CapEx systematically overstate cash flow by $150–$300 a month per property — often the entire claimed profit.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">Monthly Reserve (per item) = Replacement Cost ÷ (Lifespan in Years × 12) · Total Reserve = Σ All Items</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">CapEx (capital expenditures) are large, infrequent replacements — roof, HVAC, water heater — distinct from routine maintenance like repairs and cleaning. Lenders and buyers both deduct a CapEx reserve when valuing rental income.</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Adjust each component's replacement cost to quotes in your market — a roof in Florida and a roof in Ohio differ.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Set realistic lifespans for the current age and condition, not the brochure life of a new unit (start the clock part-way for used components).</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Add units if you hold multiple properties; reserves scale per roof, per furnace.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Transfer the resulting monthly figure into your cash flow underwriting as a non-negotiable line.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Age-adjustment is where this planner earns its keep. The defaults assume components somewhere mid-life on average; your property is specific. Walk the inspection report and set each lifespan to remaining life: a new roof genuinely gets 25 years, a roof with curling shingles gets five. The reserve that results is the truest single number in your underwrite, and sellers who baulk at a price justified by their own deferred maintenance are telling you the discount is real.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Operationally, keep reserves in a separate account per property (or at least per portfolio with clean bookkeeping), fund them from the first rent cheque, and review annually against contractor quotes. When a component is replaced, reset its clock at the new cost and full lifespan — the monthly total falls, which is the system working: yesterday's emergency becomes today's smaller, known line item.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Buyers and lenders apply exactly this logic when they value your property later. A building with documented reserves and replaced systems commands a better price and a cleaner appraisal than one with deferred everything. CapEx discipline is therefore not just defence: it is how rental owners manufacture the equity that the exit eventually pays for.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: Standard single-family reserve</h3><p className="text-neutral-600 font-light leading-relaxed m-0">With the defaults — roof $12,000/25 years ($40/mo), HVAC $8,000/15 ($44), water heater $1,500/10 ($13), appliances $4,000/12 ($28), paint $5,000/7 ($60), flooring $6,000/15 ($33), plumbing $3,000/25 ($10), driveway $4,500/20 ($19) — the total reserve is about $247 a month. A property 'cash flowing' $250 a month with no CapEx line is, on honest accounting, cash flowing about $3. The reserve is the difference between a business and a surprise subscription.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Older home, honest clock</h3><p className="text-neutral-600 font-light leading-relaxed m-0">Buy a 20-year-old home and the naive defaults flatter you: the roof has perhaps 7 years left, not 25. Re-price it at $12,000 over 7 years ($143/mo) and the HVAC at 5 remaining years ($133/mo) and the monthly reserve jumps past $400. That number is not a reason to walk away — it is the purchase negotiation in numeric form. Either the price reflects the imminent capital work, or you are volunteering to donate it.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Counting CapEx as maintenance</strong><span className="text-neutral-600 font-light leading-relaxed">A 5% maintenance reserve covers leaks and calls, not a $12,000 roof. Mixing the two guarantees the big item arrives unfunded.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Using new-component lifespans for old components</strong><span className="text-neutral-600 font-light leading-relaxed">Reserve over remaining life, not total life. A 20-year-old roof does not have 25 years left because the brochure says so.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Spending the reserve in good years</strong><span className="text-neutral-600 font-light leading-relaxed">The reserve account is not profit waiting to be harvested. The year you skip it is the year the furnace chooses December to die.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Reserving but never updating costs</strong><span className="text-neutral-600 font-light leading-relaxed">Replacement costs inflate. Re-price components every year or two or your reserve slowly becomes a partial reserve.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
