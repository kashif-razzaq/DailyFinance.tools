import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, FileText, Home, Car, AlertTriangle, TrendingDown, ShieldCheck, DollarSign, Receipt } from "lucide-react"

export const metadata: Metadata = {
  title: "Freelance Tax Deductions & Home Office ROI Calculator",
  description: "Calculate exactly how much you save in taxes by writing off freelance expenses. Compare the IRS Home Office Simplified vs Actual Expenses methods.",
  keywords: ["freelance tax deductions calculator", "home office deduction calculator", "1099 write offs calculator", "irs simplified vs actual home office", "schedule c deductions list", "freelance mileage deduction"],
  alternates: {
    canonical: "https://dailyfinance.tools/tools/freelance-tax-deductions-calculator",
  },
  openGraph: {
    title: "Freelance Tax Deductions Calculator | Maximize 1099 Write-Offs",
    description: "Instantly compare the IRS Home Office Simplified Method vs. the Actual Expenses Method to maximize your tax return.",
    url: "https://dailyfinance.tools/tools/freelance-tax-deductions-calculator",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Tax Deductions Calculator",
    description: "Calculate exactly how much cash you keep in your pocket by writing off business expenses.",
  },
}

const faqs: FAQ[] = [
  {
    question: "How do freelance tax deductions work?",
    answer: "A deduction (or write-off) lowers your taxable income. If you make $100,000 and have $10,000 in eligible business deductions, you only pay taxes on $90,000. It does not reduce your tax bill dollar-for-dollar."
  },
  {
    question: "What is the Home Office Simplified Method?",
    answer: "The IRS Simplified Method allows you to deduct exactly $5 per square foot of your home office, up to a maximum of 300 square feet ($1,500). It requires no complex record-keeping of your actual utility bills."
  },
  {
    question: "What is the Home Office Actual Expenses Method?",
    answer: "The Actual Expenses Method calculates the exact percentage of your home used for business (e.g., a 200 sq ft office in a 1,000 sq ft apartment = 20%). You can then deduct 20% of your rent, utilities, insurance, and internet."
  },
  {
    question: "Can I deduct my internet bill as a freelancer?",
    answer: "Yes, but only the percentage used for business. If you use your home internet 50% for freelance work and 50% for personal streaming, you can only deduct 50% of the cost on your Schedule C."
  },
  {
    question: "Which mileage deduction method is better: Standard or Actual?",
    answer: "The Standard Mileage Rate (72.5 cents/mile for 2026) is usually better and far easier if you drive an economical car. If you drive a very expensive vehicle with high insurance and repair costs, the Actual Expenses Method might yield a higher deduction."
  }
]

export default function FreelanceTaxDeductionsPage() {
  return (
    <ToolLayout
      title="Freelance Tax Deductions Calculator"
      description="Calculate exactly how much cash you keep in your pocket by writing off business expenses. Instantly compare the IRS Home Office Simplified Method vs. the Actual Expenses Method to maximize your return."
      slug="freelance-tax-deductions-calculator"
      faqs={faqs}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How Freelance Tax Write-Offs Work
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Freelance tax deductions (reported on IRS Schedule C) save you money by lowering your total taxable income. A $1,000 write-off does not give you $1,000 back; it saves you a percentage based on your marginal tax bracket and self-employment tax rate. If your effective tax bracket is 30%, a $1,000 deduction saves you $300 in taxes. To maximize the Home Office Deduction, renters in high-cost cities should almost always use the <strong>Actual Expenses Method</strong> (deducting a percentage of total rent and utilities) rather than the capped $1,500 <strong>Simplified Method</strong>.
            </p>
          </section>

          <h2 id="the-myth-of-the-write-off" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Dangerous Myth of "Writing it Off"
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When new freelancers hear the phrase "it's a tax write-off," many assume it means the item is essentially free. They buy a $2,000 MacBook Pro, assuming the government will reimburse them for the entire cost at the end of the year. This fundamental misunderstanding of tax law routinely bankrupts new business owners.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            A tax deduction does not reduce your tax bill <em>dollar-for-dollar</em> (that is called a Tax Credit). Instead, a tax deduction reduces your <strong>taxable income</strong>. 
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If you make $100,000 as a 1099 independent contractor, and you have $10,000 in legitimate business deductions, the IRS pretends you only made $90,000. If your combined tax rate (Federal + State + Self-Employment) is roughly 35%, that $10,000 deduction saves you $3,500 in taxes. You still permanently lost $6,500 out of pocket. You should never buy something you don't need just for the "write-off."
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Schedule C</h3>
              <p className="text-sm text-neutral-500 font-light">The IRS Form 1040 schedule where sole proprietors and LLCs report business income and deductible expenses.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingDown className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Taxable Income</h3>
              <p className="text-sm text-neutral-500 font-light">The final number you actually pay taxes on, calculated as Gross Revenue minus Total Deductions.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Marginal Savings</h3>
              <p className="text-sm text-neutral-500 font-light">The actual cash value of a deduction, which is equal to the Expense Cost multiplied by your Marginal Tax Bracket.</p>
            </div>
          </section>

          <h2 id="home-office-deduction-trap" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Home Office Deduction: Simplified vs. Actual
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you use a portion of your home <strong>exclusively and regularly</strong> for business, you are legally entitled to the Home Office Deduction. (Note: A laptop on your kitchen table does not qualify. It must be a dedicated workspace).
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The IRS offers two distinct ways to calculate this deduction. Choosing the wrong method, especially if you live in a high cost of living (HCOL) area, can cost you thousands of dollars in lost tax savings.
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10 flex items-center gap-3">
              <Home className="h-8 w-8 text-[#D97706]" />
              The Two Calculation Methods
            </h3>
            
            <ul className="space-y-8 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                  <strong className="block text-xl mb-2 text-[#D97706]">Method 1: The Simplified Option</strong>
                  <p className="mb-4">Introduced to reduce paperwork, this method allows you to deduct exactly $5 per square foot of your home office, up to a maximum of 300 square feet.</p>
                  <code className="bg-black/30 px-3 py-1 rounded text-sm block mb-2">Max Deduction: $1,500/year</code>
                  <p className="text-sm text-white/60">Pros: No receipt tracking required. Cons: Severely caps your deduction if your rent is high.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                  <strong className="block text-xl mb-2 text-[#D97706]">Method 2: The Actual Expenses Option</strong>
                  <p className="mb-4">You calculate the exact square footage of your office as a percentage of your total home. You then deduct that exact percentage of your rent, utilities, HOA fees, and internet.</p>
                  <code className="bg-black/30 px-3 py-1 rounded text-sm block mb-2">Example: 20% Office × $36,000 Annual Rent = $7,200 Deduction</code>
                  <p className="text-sm text-white/60">Pros: Massive tax savings for renters. Cons: Requires strict record keeping and can trigger depreciation recapture for homeowners.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 mb-16 rounded-r-xl">
            <h3 className="text-[#1F2937] font-bold text-xl mb-2">The Golden Rule for Renters</h3>
            <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
              If you rent an apartment in an expensive city (New York, San Francisco, London), you should almost certainly use the <strong>Actual Expenses</strong> method. The $1,500 cap on the Simplified Method pales in comparison to deducting 15% of a $4,000/month rent bill. Homeowners, however, must consult a CPA regarding "Depreciation Recapture" before choosing the Actual Expenses route.
            </p>
          </div>

          <h2 id="mileage-deduction-rules" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Mileage Deduction: Standard vs. Actual
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you use your personal vehicle to drive to client meetings, pick up business supplies, or commute to a temporary worksite (commuting to a regular W-2 office is not deductible), you can write off the cost of operating that vehicle. Similar to the home office, you have two choices.
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <Car className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">The Standard Mileage Rate</strong>
                <span className="text-neutral-600 font-light leading-relaxed">The IRS sets a standard rate every year (e.g., 72.5 cents per mile for 2026). If you drive 10,000 business miles, you multiply 10k by 0.725 for a $7,250 deduction. This rate automatically accounts for gas, depreciation, and insurance. It is simple, highly profitable if you drive a fuel-efficient car, and is the choice of 90% of freelancers.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <Receipt className="h-8 w-8 text-[#064E3B] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">The Actual Car Expenses Method</strong>
                <span className="text-neutral-600 font-light leading-relaxed">You track every single dollar spent on the vehicle: gas, oil changes, insurance, registration, and lease payments. If you use the car 60% for business, you deduct 60% of total costs. This is usually only beneficial if you drive a massive gas-guzzler or have astronomical repair bills.</span>
              </div>
            </li>
          </ul>

          <div className="bg-[#FAFAFA] p-6 mb-16 rounded-xl border border-red-100 flex items-start gap-4">
            <AlertTriangle className="text-red-500 w-6 h-6 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-[#1F2937] mb-1">The "Switching" Penalty</h4>
              <p className="text-neutral-600 font-light m-0 text-sm">
                Warning: If you want to use the Standard Mileage Rate, you MUST choose it in the first year you use the car for business. If you use Actual Expenses in year one, you are legally locked into that method for the lifespan of that vehicle.
              </p>
            </div>
          </div>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="common-schedule-c-deductions" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Other Common Schedule C Write-Offs
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            Beyond the home office and your car, the IRS allows you to deduct any expense that is "ordinary and necessary" for your specific trade.
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
            <ul className="space-y-4 text-neutral-600 font-light text-lg">
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <ShieldCheck className="text-[#064E3B] w-5 h-5 shrink-0" />
                <span><strong>Software & Subscriptions:</strong> Adobe CC, Figma, GitHub Copilot, Vercel, and web hosting.</span>
              </li>
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <ShieldCheck className="text-[#064E3B] w-5 h-5 shrink-0" />
                <span><strong>Professional Services:</strong> The fees you pay to your CPA, lawyers, or DailyFinance Pro subscriptions.</span>
              </li>
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <ShieldCheck className="text-[#064E3B] w-5 h-5 shrink-0" />
                <span><strong>Hardware & Equipment:</strong> Laptops, monitors, cameras, and microphones used for business.</span>
              </li>
              <li className="flex items-center gap-3 pb-2">
                <ShieldCheck className="text-[#064E3B] w-5 h-5 shrink-0" />
                <span><strong>Half of Self-Employment Tax:</strong> You get to deduct 50% of the 15.3% SE tax as an adjustment to income.</span>
              </li>
            </ul>
          </div>
          
          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Maximize Your ROI
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Every dollar you legally deduct is cash kept in your pocket. Use the calculator above to model out your Home Office Deduction. If you are currently renting an apartment, run the numbers on both methods—you will likely be shocked to see how much money the "Simplified Method" has been leaving on the table.
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Remember: keep meticulous records. Use a dedicated business bank account and photograph every receipt. If you are ever audited by the IRS, the burden of proof is entirely on you to prove that the expense was ordinary, necessary, and business-related.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
