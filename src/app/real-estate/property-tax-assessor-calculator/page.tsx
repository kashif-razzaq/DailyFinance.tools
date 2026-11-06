import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Property Tax Calculator: Assessed Value, Mill Rate & Monthly Escrow',
  description: 'Estimate annual property tax from market value, assessment ratio, exemptions and tax or mill rate. See your monthly escrow and effective rate.',
  keywords: ['property tax calculator', 'property tax estimator', 'mill rate calculator', 'how to calculate property tax', 'property tax by assessed value'],
  slug: "real-estate/property-tax-assessor-calculator",
  category: "Real Estate",
});

const faqs: FAQ[] = [
  {
    "question": "How do you use the Property Tax Calculator?",
    "answer": "Enter the home's market value and your area's assessment ratio (100% in many states, far lower in others like Illinois or Georgia). Enter total exemptions you qualify for \u2014 homestead exemptions commonly remove $25,000\u2013$50,000 of taxable value for a primary home. Enter the combined effective rate, or convert your bill's millage by dividing mills by ten. Read the annual tax and the monthly escrow your lender will collect with PITI."
  },
  {
    "question": "What is the formula behind the Property Tax Calculator?",
    "answer": "Tax = (Market Value \u00d7 Assessment Ratio \u2212 Exemptions) \u00d7 Tax Rate \u00b7 1 Mill = $1 per $1,000 Taxable Value (Rate% \u00d7 10 = Mills) \u2014 Rates stack: county, city, school district and special districts each levy their own millage, and the bill is the sum. Assessment ratios and exemption rules vary widely by state and county."
  },
  {
    "question": "Worked example: what does a realistic Property Tax Calculator result look like?",
    "answer": "Assessed at 100%, the home's assessed value is $500,000. A $50,000 homestead exemption leaves $450,000 taxable. At a 1.25% combined rate the annual tax is $5,625 \u2014 $469 a month of escrow inside the mortgage payment. Buyers who budgeted tax on the full value at a guessed 1% would be short by over $100 a month, every month, from day one."
  },
  {
    "question": "What is the most common mistake people make with this calculation?",
    "answer": "Budgeting from the seller's old tax bill: In many states a sale triggers reassessment to market value. Your tax can jump sharply above what the seller paid on a years-old assessment."
  },
  {
    "question": "Is this calculator free, and should I verify the result?",
    "answer": "Yes \u2014 it is free with no signup. Results are estimates built on the inputs and assumptions shown on the page. Before committing capital, verify rates, taxes, fees and legal requirements (permits, leases, lending terms) with current quotes and, where the sums are large, a qualified local professional."
  }
]

export default function Page() {
  return (
    <ToolLayout title='Property Tax Calculator' description='Estimate annual property tax from market value, assessment ratio, exemptions and tax or mill rate. See your monthly escrow and effective rate.' slug="property-tax-assessor-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (<>
        <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
          <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" /> Quick Answer</h2>
          <p className="text-neutral-600 leading-relaxed text-lg">Property tax is taxable value times the tax rate. Taxable value is the assessed value — market value times the local assessment ratio — minus exemptions such as a homestead exemption. Divide the annual bill by twelve for your monthly escrow. A mill rate expresses the same tax as dollars per thousand of taxable value.</p>
        </section>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Property tax is the rent you pay the county forever — the one housing cost that survives the mortgage. It funds schools, roads, fire and police services, and it is calculated by a method that confuses almost everyone the first time: an assessed value that may or may not equal market value, a stack of millages from overlapping taxing bodies, and exemptions that reward those who file paperwork. This calculator reduces it to the four inputs that actually determine your bill.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Start with assessment. Some states assess at full market value; others assess residential property at a fraction (ratios of 10–40% exist), which is then paired with a proportionally higher nominal rate. Assessors revalue on cycles from annual to once a decade, and purchase often resets the value. When you move, the most dangerous number in the listing is the seller's current tax: it describes their assessment history, not your future bill. Estimate yours from market value, as this calculator does.</p>
        <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">The Formula</h3>
          <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 leading-loose relative z-10">Tax = (Market Value × Assessment Ratio − Exemptions) × Tax Rate · 1 Mill = $1 per $1,000 Taxable Value (Rate% × 10 = Mills)</div>
          <p className="mt-6 text-white/80 leading-relaxed relative z-10">Rates stack: county, city, school district and special districts each levy their own millage, and the bill is the sum. Assessment ratios and exemption rules vary widely by state and county.</p>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">How to Use This Calculator</h2>
        <ol className="space-y-4 mb-16 list-none pl-0"><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter the home's market value and your area's assessment ratio (100% in many states, far lower in others like Illinois or Georgia).</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter total exemptions you qualify for — homestead exemptions commonly remove $25,000–$50,000 of taxable value for a primary home.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Enter the combined effective rate, or convert your bill's millage by dividing mills by ten.</span></li><li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100"><CheckCircle2 className="h-5 w-5 text-[#064E3B] shrink-0 mt-0.5" /><span className="text-neutral-600 font-light">Read the annual tax and the monthly escrow your lender will collect with PITI.</span></li></ol>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Exemptions are the most under-claimed money in home ownership. A homestead exemption on a primary residence commonly shields $25,000–$50,000 of value, and additional exemptions for seniors, veterans and disabled homeowners can shield far more or even freeze assessed values. They are rarely automatic. File in the first year, by the local deadline, and confirm the exemption appears on the next assessment notice.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">For investors, property tax belongs in every underwrite at the post-purchase assessed value, escalated modestly each year. Tax is also a location-selection tool: the same rent in a 0.5% effective-rate state and a 2% state differs by thousands a year of net income, which is why professional portfolios cluster where the tax-to-rent ratio is survivable. Compare effective rates — total tax divided by market value — and the comparison becomes honest.</p>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Finally, you can contest an assessment that exceeds market value; appeals succeed regularly when supported by comparable sales. Budget the tax you owe, but audit the value you are taxed on. A successful appeal compounds for years, because future percentage increases apply to a lower base.</p>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples With Real Numbers</h2>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: $500,000 home, full assessment, homestead exemption</h3><p className="text-neutral-600 font-light leading-relaxed m-0">Assessed at 100%, the home's assessed value is $500,000. A $50,000 homestead exemption leaves $450,000 taxable. At a 1.25% combined rate the annual tax is $5,625 — $469 a month of escrow inside the mortgage payment. Buyers who budgeted tax on the full value at a guessed 1% would be short by over $100 a month, every month, from day one.</p></div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm"><h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Same home in a fractional-assessment state</h3><p className="text-neutral-600 font-light leading-relaxed m-0">In a state assessing at 35% of market value, the assessed value is $175,000 and, after the same exemption, $125,000 is taxable — but the nominal rate is higher, say 3.2%, producing $4,000 a year. The lesson: never compare nominal rates or assessment ratios across states in isolation. Only the effective rate on market value (annual tax ÷ market value) lets you compare the true burden between locations.</p></div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes That Break This Calculation</h2>
        <ul className="space-y-6 mb-16 list-none pl-0"><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Budgeting from the seller's old tax bill</strong><span className="text-neutral-600 font-light leading-relaxed">In many states a sale triggers reassessment to market value. Your tax can jump sharply above what the seller paid on a years-old assessment.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Confusing mills and percent</strong><span className="text-neutral-600 font-light leading-relaxed">30 mills is 3.0%, not 30%. Misreading millage by a factor of ten produces spectacularly wrong budgets.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Missing exemptions you qualify for</strong><span className="text-neutral-600 font-light leading-relaxed">Homestead, senior, veteran and disability exemptions can remove thousands from the bill — but most must be applied for, often by a deadline in the first year.</span></div></li><li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl"><AlertTriangle className="h-7 w-7 text-[#D97706] shrink-0 mt-1" /><div><strong className="text-[#1F2937] block text-lg mb-1">Assuming tax is fixed</strong><span className="text-neutral-600 font-light leading-relaxed">Reassessments and levy votes change bills. Investors underwriting flat taxes for a decade systematically overstate future cash flow.</span></div></li></ul>
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use this calculator as the first pass, not the final word: run conservative, expected and optimistic inputs, and only proceed when the conservative case still makes sense for your goals and reserves. Pair it with the related real estate tools on DailyFinance — cash flow, CapEx reserves, amortization and property tax interact, and a deal that looks strong in one tool sometimes fails honestly in another. That cross-checking is exactly what the tools are for.</p>
      </>)}
    </ToolLayout>
  )
}
