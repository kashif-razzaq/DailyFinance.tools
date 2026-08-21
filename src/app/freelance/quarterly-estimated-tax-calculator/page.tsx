/* eslint-disable react/no-unescaped-entities */
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator, DollarSign, Clock, ShieldCheck, Scale, FileText } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "1099 Quarterly Estimated Tax Calculator: Self-Employed Estimator",
  description: "Calculate your 1099 quarterly estimated taxes instantly. Free quarterly tax payment estimator for independent contractors, self-employed, and freelancers.",
  keywords: ["1099 quarterly tax calculator", "quarterly estimated tax calculator", "calculate quarterly taxes independent contractor", "self employed quarterly tax calculator", "quarterly tax payment estimator", "1099 estimated quarterly taxes"],
  slug: "freelance/quarterly-estimated-tax-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate 1099 quarterly estimated taxes?",
    answer: "To calculate 1099 quarterly estimated taxes, first find your net business profit. Multiply this by 92.35% to find your self-employment taxable base (taxed at 15.3%). Deduct half of your self-employment tax, your standard deduction, and any QBI deduction to find federal taxable income. Apply progressive income tax brackets, add state taxes, and divide the total annual liability by 4."
  },
  {
    question: "How much are estimated taxes for an independent contractor?",
    answer: "Estimated taxes for an independent contractor typically range from 25% to 30% of your gross 1099 income. This covers both your 15.3% self-employment FICA tax (Social Security and Medicare) and your progressive federal and state income taxes."
  },
  {
    question: "What are the IRS safe harbor rules for quarterly payments?",
    answer: "To avoid IRS underpayment penalties, you must pay estimated taxes that equal the lesser of: 90% of your current year's total tax liability, OR 100% of your prior year's total tax liability (110% if your prior year Adjusted Gross Income exceeded $150,000)."
  },
  {
    question: "Do I have to pay quarterly taxes if I have a W-2 job and a side hustle?",
    answer: "If you expect to owe more than $1,000 in taxes from your side hustle (after subtracting your W-2 withholdings), you generally need to make quarterly estimated tax payments. Alternatively, you can increase the tax withheld on your W-4 at your day job to cover the 1099 tax liability."
  },
  {
    question: "What happens if I miss paying my estimated taxes on 1099 income?",
    answer: "If you miss a quarterly estimated tax payment, pay it as soon as possible. The IRS charges an underpayment penalty that accrues daily interest based on the federal short-term rate plus 3%. Making a late payment immediately stops the interest from compounding."
  }
]

export default function QuarterlyTaxesCalculatorPage() {
  return (
    <>
      <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "1099 Quarterly Estimated Tax Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      })}} />
      <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Use the Quarterly Estimated Tax Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Enter your Filing Status and State",
            "text": "Choose your correct tax filing status (e.g. Single, Married) and select your state to apply the correct state tax rates."
          },
          {
            "@type": "HowToStep",
            "name": "Input W-2 and 1099 Income",
            "text": "Input your expected annual W-2 wages and your gross 1099 freelance income into the calculator."
          },
          {
            "@type": "HowToStep",
            "name": "Add Business Deductions",
            "text": "Enter your expected business write-offs. This lowers your taxable net profit."
          },
          {
            "@type": "HowToStep",
            "name": "Review the Payment Estimator",
            "text": "View the calculated quarterly federal and state tax payments required to avoid IRS underpayment penalties."
          }
        ]
      })}} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      })}} />
      <ToolLayout
        title="1099 Quarterly Estimated Tax Calculator"
        description="Calculate your 1099 quarterly estimated taxes instantly. Free quarterly tax payment estimator for independent contractors, self-employed, and freelancers."
        slug="quarterly-estimated-tax-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
        {(isPro) => (
          <>
            {/* Answer Engine Optimization (AEO) Block */}
            <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A5F]"></div>
              <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-[#D97706]" />
                Quick Answer: How to calculate quarterly taxes for an independent contractor?
              </h2>
              <p className="text-neutral-600 leading-relaxed text-lg">
                To estimate 1099 quarterly taxes, start with your net freelance income and deduct your business expenses. First, calculate your 15.3% Self-Employment Tax on 92.35% of that net income. Second, deduct half of the SE tax, your standard deduction, and the QBI deduction to find your adjusted taxable income. Finally, apply the progressive federal tax brackets (10% to 37%) and state taxes, subtract any W-2 withholdings you've already paid, and divide the remaining balance by four to determine your quarterly tax payment.
              </p>
            </section>
  
          <h2 id="understanding-obligations" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding Your 1099 Quarterly Tax Obligations
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              When you transition from being a standard W-2 employee to operating as a 1099 independent contractor, freelancer, or sole proprietor, the burden of tax collection shifts entirely onto your shoulders. The IRS and state tax agencies no longer automatically withhold taxes from your paychecks. 
            </p>
  
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
              The United States operates on a "pay-as-you-go" tax system. This means you are legally required to prepay taxes to the IRS continuously as you earn your money throughout the year, not just on April 15th. If you wait until the end of the year to pay your entire tax bill, you will be hit with an Underpayment Penalty. This is why using a reliable <strong>quarterly tax payment estimator</strong> is crucial for self-employed professionals.
            </p>
  
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <AlertTriangle className="h-5 w-5 text-[#D97706]" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Self-Employment (SE) Tax</h3>
                <p className="text-sm text-neutral-500 font-light">As an independent contractor, you pay the full 15.3% FICA tax (12.4% for Social Security and 2.9% for Medicare). W-2 employees only pay half.</p>
              </div>
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <Scale className="h-5 w-5 text-[#D97706]" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Federal Income Tax</h3>
                <p className="text-sm text-neutral-500 font-light">Calculated using a progressive bracket system (from 10% up to 37%) based on your total Adjusted Gross Income after deductions.</p>
              </div>
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5 text-[#D97706]" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">State Income Tax</h3>
                <p className="text-sm text-neutral-500 font-light">Unless you live in a zero-income-tax state, you must also estimate and remit quarterly estimated tax payments to your local state agency.</p>
              </div>
            </section>
  
            <h2 id="safe-harbor" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              Figuring Out Quarterly Taxes with the Safe Harbor Rule
            </h2>
  
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Self-employed income is notoriously unpredictable. You might secure a massive contract in Q1 and experience a dry spell in Q4. Because it is nearly impossible to predict your exact annual income at the beginning of the year, the IRS provides a legal mechanism to protect you from underpayment penalties: <strong>The Safe Harbor Rule</strong>.
            </p>
  
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              The Safe Harbor rule guarantees that the IRS will not penalize you for underpaying your 1099 estimated quarterly taxes, provided your total timely payments meet specific minimum thresholds. You will still owe the remaining balance on tax day, but you will not face fines or compounding interest.
            </p>
  
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-12 shadow-sm">
              <h3 className="text-xl font-bold text-[#1F2937] mb-6 flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-[#1E3A5F]" />
                The Safe Harbor Thresholds for Independent Contractors
              </h3>
              <p className="text-neutral-600 font-light leading-relaxed mb-6">
                You are shielded from IRS penalties if your prepayments equal at least ONE of the following:
              </p>
              <ul className="space-y-4 font-light text-neutral-600 mb-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D97706] shrink-0 mt-1" />
                  <span><strong>90% of your current year's total tax liability.</strong> (Often difficult to estimate if your freelance income fluctuates wildly).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D97706] shrink-0 mt-1" />
                  <span><strong>100% of your previous year's total tax liability.</strong> (The most common baseline. If you owed $20,000 in total taxes last year, paying exactly $5,000 each quarter this year shields you from penalties, regardless of how much you earn this year).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#D97706] shrink-0 mt-1" />
                  <span><strong>110% of your previous year's total tax liability.</strong> (Mandatory if your previous year's Adjusted Gross Income (AGI) exceeded $150,000).</span>
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
              How the Self Employed Quarterly Tax Calculator Works
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              If you are opting not to use the 100% Safe Harbor method because your independent contractor income dropped significantly this year, you must manually estimate your liability. Our <strong>1099 quarterly tax calculator</strong> automates this complex algebra, but understanding the underlying mechanics of the American tax code is crucial for any business owner.
            </p>
  
            <div className="bg-[#1E3A5F] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10">Step 1: Calculate the SE Taxable Base</h3>
              <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
                You do not pay self-employment tax on 100% of your net business income. The IRS allows you to deduct half of your SE tax before applying the tax itself. The mathematical shortcut for this is multiplying your net 1099 profit by <code className="font-mono bg-black/30 px-2 py-1 rounded">92.35% (0.9235)</code>.
              </p>
  
              <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10 mt-10">Step 2: Apply the 15.3% Self-Employment Tax</h3>
              <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
                Multiply your SE Taxable Base by 15.3%. Note that the Social Security portion (12.4%) caps out at the $184,500 wage limit in 2026. If you also have a W-2 job, your W-2 wages count toward this limit first!
              </p>
  
              <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10 mt-10">Step 3: Factor in Deductions to find AGI</h3>
              <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
                Subtract the standard deduction for your filing status (e.g., $16,100 for Single filers in 2026) from your remaining total income. Also, subtract half of the self-employment tax calculated in Step 2.
              </p>
  
              <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10 mt-10">Step 4: The QBI Deduction</h3>
              <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
                If eligible, deduct up to 20% of your Qualified Business Income (QBI) via Section 199A. This dramatically lowers your federal taxable income and ultimately your quarterly tax payments.
              </p>
              
              <h3 className="text-2xl font-bold mb-6 text-white/90 relative z-10 mt-10">Step 5: Apply Progressive Federal Brackets</h3>
              <p className="text-lg text-white/80 font-light leading-relaxed mb-4 relative z-10">
                Run your final taxable income through the progressive IRS brackets. Add your state income tax liability. Finally, subtract any taxes already withheld from W-2 jobs, and divide the remaining balance by four to get your quarterly tax estimate.
              </p>
            </div>
  
            <h2 id="due-dates" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              IRS 1040-ES Quarterly Payment Due Dates
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Crucially, the IRS does not divide the year into four perfect three-month quarters for estimated taxes. The schedule is irregular. You must adhere to the following specific deadlines to make your <strong>1040-ES payments</strong>. If a due date falls on a weekend or federal holiday, the deadline is pushed to the next business day.
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
              If your self-employed income is highly seasonal (e.g., you operate a business that makes $80,000 in Q2 and Q3, but only $5,000 in Q1 and Q4), paying exactly equal quarterly payments might place immense strain on your cash flow during the slow months. 
            </p>
            <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
              In these cases, you can use the <strong>Annualized Income Installment Method</strong> on Schedule AI of Form 2210. This complex accounting method allows you to precisely match your IRS estimated tax online payments to the quarters in which the income was actually earned. If you made no money in Q1, you pay no estimated taxes in Q1, and the IRS will waive the penalty as long as you properly complete and attach Form 2210 to your year-end tax return.
            </p>
          </>
        )}
      </ToolLayout>
    </>
  )
}
