/* eslint-disable react/no-unescaped-entities */
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator, DollarSign, Clock, ShieldCheck, Scale, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "1099 Quarterly Estimated Taxes Calculator (2026)",
  description: "Calculate your 1099 quarterly estimated taxes instantly. Supports 2026 IRS federal brackets, self-employment tax, QBI deduction, and state taxes.",
  keywords: ["quarterly estimated taxes calculator", "1099 tax calculator", "self employment tax calculator", "how to calculate estimated taxes", "freelance tax calculator", "2026 tax brackets", "safe harbor rule", "underpayment penalty"],
  alternates: {
    canonical: "https://dailyfinance.tools/tools/quarterly-estimated-taxes-calculator",
  },
  openGraph: {
    title: "1099 Quarterly Estimated Taxes Calculator | DailyFinance.tools",
    description: "Calculate your 1099 quarterly estimated taxes instantly. Supports 2026 IRS federal brackets, self-employment tax, QBI deduction, and state taxes.",
    url: "https://dailyfinance.tools/tools/quarterly-estimated-taxes-calculator",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quarterly Estimated Taxes Calculator",
    description: "Calculate your 1099 quarterly estimated taxes instantly based on exact IRS 2026 brackets.",
  },
}

const faqs: FAQ[] = [
  {
    question: "How do you calculate 1099 quarterly estimated taxes?",
    answer: "To calculate 1099 quarterly estimated taxes, multiply your net freelance income by 92.35% to find your self-employment taxable earnings (taxed at 15.3%). Subtract half of your self-employment tax and your standard deduction to determine federal taxable income. Apply progressive income tax brackets, add state tax, and divide the total annual liability by 4."
  },
  {
    question: "What is the self-employment tax rate for freelancers in 2026?",
    answer: "The self-employment tax rate is 15.3%. This consists of two parts: 12.4% for Social Security (applied up to the $184,500 annual wage cap in 2026) and 2.9% for Medicare (applied to all net earnings without a cap)."
  },
  {
    question: "What are the IRS safe harbor rules for quarterly payments?",
    answer: "To avoid IRS underpayment penalties, you must pay estimated taxes that equal the lesser of: 90% of your current year's total tax liability, OR 100% of your prior year's total tax liability (110% if your prior year Adjusted Gross Income exceeded $150,000)."
  },
  {
    question: "What happens if I miss a quarterly estimated tax payment?",
    answer: "If you miss a quarterly estimated tax payment, you should pay it as soon as possible. The IRS charges an underpayment penalty (Form 2210) which accrues interest daily based on the federal short-term rate plus 3%. Making the payment late stops the interest from compounding further."
  },
  {
    question: "Is the Qualified Business Income (QBI) deduction still available in 2026?",
    answer: "Yes, the Section 199A QBI deduction allows eligible self-employed individuals and small business owners to deduct up to 20% of their qualified business income from their taxable income, subject to specific income phase-out limits."
  }
]

export default function QuarterlyTaxesCalculatorPage() {
  return (
    <ToolLayout
      title="1099 Quarterly Estimated Taxes Calculator"
      description="Instantly calculate your 1099 quarterly estimated tax payments. This calculator strictly follows the latest 2026 IRS federal tax brackets, self-employment rules, and Safe Harbor thresholds."
      slug="quarterly-estimated-taxes-calculator"
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
              Quick Answer: How to Calculate 1099 Quarterly Estimated Taxes
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To calculate 1099 quarterly estimated taxes, first multiply your net freelance income by 92.35% to find your self-employment taxable base (taxed at 15.3%). Next, deduct half of that SE tax, your standard deduction, and the QBI deduction to find your adjusted federal taxable income. Apply the progressive income tax brackets, add your state income tax, and divide the total final sum by 4.
            </p>
          </section>

          <h2 id="the-danger" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Danger of Ignoring Estimated Taxes
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you transition from being a W-2 employee to a 1099 independent contractor, freelancer, or sole proprietor, the burden of tax collection shifts entirely onto your shoulders. The IRS and state tax agencies no longer automatically withhold taxes from your paychecks. Instead, the United States operates on a "pay-as-you-go" tax system. This means you are legally required to pay income taxes to the government continuously as you earn your money throughout the year, not just on April 15th.
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If you wait until the end of the year to pay your entire tax bill, you will be hit with an <strong>Underpayment of Estimated Tax by Individuals Penalty (Form 2210)</strong>. This penalty accrues interest daily based on the federal short-term rate plus 3%. To avoid devastating financial penalties and massive cash-flow crunches, you must accurately calculate and remit your taxes four times a year.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Self-Employment (FICA) Tax</h3>
              <p className="text-sm text-neutral-500 font-light">As a freelancer, you pay the full 15.3% tax (12.4% for Social Security and 2.9% for Medicare). W-2 employees only pay half of this.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Scale className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Federal Income Tax</h3>
              <p className="text-sm text-neutral-500 font-light">Calculated using a progressive bracket system (10% to 37%) based on your Adjusted Gross Income after deductions.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">State Income Tax</h3>
              <p className="text-sm text-neutral-500 font-light">Unless you live in a zero-income-tax state (like Texas, Florida, or Nevada), you must also remit estimated quarterly payments to your state agency.</p>
            </div>
          </section>

          <h2 id="safe-harbor" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding the Safe Harbor Rule
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Freelance income is inherently volatile. You might make $5,000 in Q1 and $40,000 in Q4. Because it is nearly impossible to predict your exact annual income at the beginning of the year, the IRS provides a legal mechanism to protect you from underpayment penalties: <strong>The Safe Harbor Rule</strong>.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The Safe Harbor rule guarantees that the IRS will not penalize you for underpaying your taxes throughout the year, provided your total quarterly estimated payments meet specific thresholds. You will still owe the remaining balance on tax day, but you will not face fines or compounding interest.
          </p>

          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-12 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-6 flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[#064E3B]" />
              The Three Safe Harbor Thresholds
            </h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-6">
              You are completely shielded from IRS penalties if your total timely payments equal at least ONE of the following:
            </p>
            <ul className="space-y-4 font-light text-neutral-600 mb-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#D97706] shrink-0 mt-1" />
                <span><strong>90% of your current year's total tax liability.</strong> (Often difficult to calculate if your income is unpredictable).</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#D97706] shrink-0 mt-1" />
                <span><strong>100% of your previous year's total tax liability.</strong> (The most common strategy. If you owed $20,000 in total taxes last year, paying exactly $5,000 each quarter this year shields you from penalties, even if you make triple the income this year).</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#D97706] shrink-0 mt-1" />
                <span><strong>110% of your previous year's total tax liability.</strong> (Mandatory if your previous year's Adjusted Gross Income (AGI) exceeded $150,000, or $75,000 if married filing separately).</span>
              </li>
            </ul>
          </div>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="calculation-steps" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Step-by-Step Mathematical Calculation
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you are opting not to use the 100% Safe Harbor method because your income dropped significantly this year, you must manually calculate your liability. Our calculator automates this entirely, but understanding the underlying mechanics of the American tax code is crucial for any business owner.
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">Step 1: Calculate the SE Taxable Base</h3>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
              You do not pay self-employment (SE) tax on 100% of your net business income. The IRS allows you to deduct half of your SE tax before applying the tax itself. The mathematical shortcut for this is multiplying your net profit by <code className="font-mono bg-black/30 px-2 py-1 rounded">92.35% (0.9235)</code>.
            </p>

            <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10 mt-10">Step 2: Apply the 15.3% Self-Employment Tax</h3>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
              Multiply your SE Taxable Base by 15.3%. Note that the Social Security portion (12.4%) caps out at $184,500 of wages in 2026. The Medicare portion (2.9%) has no cap.
            </p>

            <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10 mt-10">Step 3: Deduct the Standard Deduction</h3>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
              Subtract the standard deduction for your filing status (e.g., $16,100 for Single filers in 2026) from your remaining income. Also, subtract half of the self-employment tax calculated in Step 2.
            </p>

            <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10 mt-10">Step 4: Apply the QBI Deduction</h3>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
              If eligible, deduct up to 20% of your Qualified Business Income (QBI) via Section 199A. This dramatically lowers your federal taxable income.
            </p>
            
            <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10 mt-10">Step 5: Apply Progressive Federal Brackets</h3>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
              Run your final taxable income through the progressive IRS brackets. Add your state income tax liability. Finally, divide the total annual tax owed by four. This is your target quarterly payment.
            </p>
          </div>

          <h2 id="tax-brackets" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            2026 Federal Income Tax Brackets (Single Filer)
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            The United States uses a progressive tax system. A common misconception is that if you get pushed into a higher tax bracket, all of your income is taxed at that higher rate. This is mathematically false. You only pay the top bracket rate on the specific portion of your income that falls within that bracket's boundaries.
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse m-0">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAFAFA]">
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">Marginal Tax Rate</th>
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">2026 Taxable Income Bracket (Single)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono text-sm">
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">10%</td>
                  <td className="py-4 px-6 text-neutral-500">$0 – $12,400</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors bg-[#FAFAFA]">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">12%</td>
                  <td className="py-4 px-6 text-neutral-500">$12,401 – $50,400</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">22%</td>
                  <td className="py-4 px-6 text-neutral-500">$50,401 – $105,700</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors bg-[#FAFAFA]">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">24%</td>
                  <td className="py-4 px-6 text-neutral-500">$105,701 – $201,775</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">32%</td>
                  <td className="py-4 px-6 text-neutral-500">$201,776 – $256,225</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors bg-[#FAFAFA]">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">35%</td>
                  <td className="py-4 px-6 text-neutral-500">$256,226 – $640,600</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">37%</td>
                  <td className="py-4 px-6 text-neutral-500">Over $640,600</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="due-dates" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            IRS Quarterly Payment Due Dates
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Crucially, the IRS does not divide the year into four perfect three-month quarters for estimated taxes. The payment schedule is irregular. You must adhere to the following specific deadlines to maintain your Safe Harbor status. If a due date falls on a weekend or federal holiday, the deadline is pushed to the next business day.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0 mb-16">
            <li className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm font-bold text-[#D97706] uppercase tracking-widest block mb-2">Q1 Payment</span>
              <span className="font-light text-neutral-500 mb-2">For income earned: Jan 1 – Mar 31</span>
              <span className="font-extrabold text-[#1F2937] text-2xl">Due April 15</span>
            </li>
            <li className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm font-bold text-[#D97706] uppercase tracking-widest block mb-2">Q2 Payment</span>
              <span className="font-light text-neutral-500 mb-2">For income earned: Apr 1 – May 31</span>
              <span className="font-extrabold text-[#1F2937] text-2xl">Due June 15</span>
            </li>
            <li className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm font-bold text-[#D97706] uppercase tracking-widest block mb-2">Q3 Payment</span>
              <span className="font-light text-neutral-500 mb-2">For income earned: Jun 1 – Aug 31</span>
              <span className="font-extrabold text-[#1F2937] text-2xl">Due September 15</span>
            </li>
            <li className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm font-bold text-[#D97706] uppercase tracking-widest block mb-2">Q4 Payment</span>
              <span className="font-light text-neutral-500 mb-2">For income earned: Sep 1 – Dec 31</span>
              <span className="font-extrabold text-[#1F2937] text-2xl">Due January 15</span>
            </li>
          </ul>

          <h2 id="annualized-income" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Handling Highly Variable Income
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If your freelance income is highly seasonal (e.g., you operate a landscaping business that makes $80,000 in Q2 and Q3, but only $5,000 in Q1 and Q4), paying exactly equal quarterly payments might place immense strain on your cash flow during the slow months. 
          </p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            In these cases, you can use the <strong>Annualized Income Installment Method</strong> on Schedule AI of Form 2210. This complex accounting method allows you to precisely match your tax payments to the quarters in which the income was actually earned. If you made no money in Q1, you pay no estimated taxes in Q1, and the IRS will waive the penalty as long as you properly complete and attach Form 2210 to your year-end tax return.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
