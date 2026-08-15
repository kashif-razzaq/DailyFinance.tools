import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import Script from "next/script"
import { Calculator, ShieldAlert, PiggyBank, Briefcase, FileWarning, HelpCircle, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "S Corp Tax Savings Calculator: LLC vs S Corp",
  description: "Calculate exact tax savings by converting your freelance LLC to an S-Corp. Optimize your W-2 reasonable compensation and owner distributions to minimize FICA taxes.",
  keywords: ["s corp salary vs dividend calculator", "llc vs s corp tax calculator", "reasonable compensation calculator s corp", "freelance s corp tax savings", "s corp distribution rules", "self employment tax calculator"],
  slug: "freelance/s-corp-tax-savings-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "At what income level should a freelancer switch to an S-Corp?",
    answer: "Generally, the 'break-even' point is around $80,000 to $100,000 in net business income. Below this, the extra accounting and payroll costs of running an S-Corp usually outweigh the FICA tax savings."
  },
  {
    question: "What is Reasonable Compensation?",
    answer: "The IRS requires S-Corp owners who work in the business to pay themselves a 'reasonable' W-2 salary before taking tax-free distributions. This salary must reflect what you would pay an employee to do your exact job."
  },
  {
    question: "Are S-Corp distributions completely tax-free?",
    answer: "No. S-Corp distributions are free from FICA (Social Security and Medicare) payroll taxes, which saves you 15.3%. However, you still pay standard federal and state income tax on those distributions."
  },
  {
    question: "What are the hidden costs of an S-Corp?",
    answer: "To run an S-Corp, you must pay for a payroll service (e.g., Gusto), file a separate corporate tax return (Form 1120-S), pay federal/state unemployment taxes (FUTA/SUTA), and handle more complex bookkeeping. This usually costs $1,500 - $2,500 per year."
  },
  {
    question: "Can I use a 60/40 rule for my salary vs. distribution?",
    answer: "The '60/40 rule' is a dangerous myth and will not protect you in an audit. Your salary must be based on actual market data for your job title, not an arbitrary percentage."
  }
]

export default function SCorpOptimizerPage() {
  return (
    <>
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "S Corp Tax Savings Calculator",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Use the S-Corp Tax Savings Calculator",
            "description": "A step-by-step guide to calculating your potential tax savings by switching your LLC to an S-Corp.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Enter Expected Net Profit",
                "text": "Input your expected total business revenue minus any deductible business expenses to determine your net profit."
              },
              {
                "@type": "HowToStep",
                "name": "Determine a Reasonable Salary",
                "text": "Enter a reasonable W-2 salary that you would pay someone else to do your job. The calculator will use this to determine your FICA tax baseline."
              },
              {
                "@type": "HowToStep",
                "name": "Review S-Corp Administrative Costs",
                "text": "Account for additional costs such as payroll processing and corporate tax return fees to get an accurate savings estimate."
              },
              {
                "@type": "HowToStep",
                "name": "Analyze Your Savings",
                "text": "Compare your total tax burden as a sole proprietor versus an S-Corp to see your estimated net tax savings."
              }
            ]
          })
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          })
        }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "name": "S Corp Tax Savings Calculator: LLC vs S Corp",
                "description": "Calculate exact tax savings by converting your freelance LLC to an S-Corp. Optimize your W-2 reasonable compensation and owner distributions to minimize FICA taxes.",
                "url": "https://dailyfinance.tools/freelance/s-corp-tax-savings-calculator"
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://dailyfinance.tools/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Freelance",
                    "item": "https://dailyfinance.tools/freelance"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "S Corp Tax Savings Calculator",
                    "item": "https://dailyfinance.tools/freelance/s-corp-tax-savings-calculator"
                  }
                ]
              }
            ]
          })
        }}
      />
      <ToolLayout
        title="S Corp Tax Savings Calculator"
        description="Calculate exactly how much you'll save in FICA taxes by converting your freelance LLC to an S-Corp and splitting your income into W-2 Salary and Owner Distributions."
        slug="s-corp-tax-savings-calculator"
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
              Quick Answer: S-Corp Tax Savings Explained
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              If you operate as a standard LLC (Sole Proprietor), you pay a 15.3% Self-Employment (FICA) Tax on 100% of your net profit. By electing S-Corp status, you legally split your profit. You must pay yourself a "Reasonable W-2 Salary" (which is subject to the 15.3% FICA tax), but you can take the remaining profit as an "Owner Distribution" (which avoids the 15.3% tax entirely). For example, if you net $100,000 and pay yourself a $60,000 reasonable salary, the remaining $40,000 is distributed free of FICA tax, saving you approximately $6,120.
            </p>
          </section>

          <h2 id="the-llc-tax-trap" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The LLC Tax Trap
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you first start freelancing, the easiest business structure to set up is a Single-Member LLC. While an LLC provides excellent legal protection by separating your personal assets from your business assets, it does absolutely nothing for you at tax time.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The IRS considers a Single-Member LLC a "disregarded entity." This means all the profit your business makes flows directly onto your personal tax return (Schedule C). Because you are the owner, the IRS classifies 100% of that profit as "Earned Income." 
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            This triggers the <strong>Self-Employment Tax</strong>, which is a flat 15.3% tax that funds Social Security and Medicare. If your business nets $150,000, you are paying over $22,000 in FICA taxes <em>before you even pay a single dollar in regular federal or state income tax.</em> This is the trap that catches six-figure freelancers off guard.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <ShieldAlert className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Default LLC Tax</h3>
              <p className="text-sm text-neutral-500 font-light">15.3% Self-Employment tax applies to every single dollar of net profit.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">S-Corp Salary (W-2)</h3>
              <p className="text-sm text-neutral-500 font-light">Under an S-Corp, the 15.3% tax only applies to the portion you declare as W-2 salary.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <PiggyBank className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">S-Corp Distribution</h3>
              <p className="text-sm text-neutral-500 font-light">The remaining profit avoids the 15.3% tax entirely (though standard income tax still applies).</p>
            </div>
          </section>

          <h2 id="the-s-corp-loophole" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The "S-Corp Loophole" Explained
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The most powerful tax strategy for high-earning freelancers and creators is electing to have your LLC taxed as an S-Corporation (using IRS Form 2553). When you do this, your legal structure remains an LLC, but the IRS treats you as a corporation for tax purposes.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Under an S-Corp, you are no longer just an owner; you are legally considered an <em>employee</em> of your own corporation. This allows you to split your income into two distinct buckets:
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-[#D97706]" />
              The S-Corp Income Split
            </h3>
            
            <ul className="space-y-8 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                  <strong className="block text-xl mb-2 text-[#D97706]">Bucket 1: Reasonable Salary</strong>
                  <p className="mb-4">You put yourself on a formal W-2 payroll system and pay yourself a fixed salary. Because this is standard "wages," it is fully subject to the 15.3% FICA payroll taxes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                  <strong className="block text-xl mb-2 text-[#D97706]">Bucket 2: Owner Distributions</strong>
                  <p className="mb-4">After your salary and business expenses are paid, whatever profit remains in the business bank account can be transferred to your personal account as an "Owner Distribution" (sometimes called a dividend). The IRS explicitly states that distributions from an S-Corp are <strong>exempt from the 15.3% FICA tax.</strong></p>
                </div>
              </li>
            </ul>
          </div>

          <h2 id="reasonable-compensation" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The IRS Trap: "Reasonable Compensation"
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Once freelancers discover this strategy, their first instinct is to pay themselves a $1 W-2 salary and take $149,999 in tax-free distributions. The IRS anticipated this. 
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            By law, an S-Corp owner who provides significant services to the business MUST pay themselves a <strong>Reasonable Compensation</strong> before taking a single dollar in distributions. If you underpay your salary to dodge taxes, the IRS will audit you, reclassify your distributions as wages, and hit you with severe penalties and interest.
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <CheckCircle className="h-8 w-8 text-[#064E3B] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">How to Determine a Reasonable Salary</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Your salary must reflect what it would cost to hire a non-owner employee to perform your exact duties. You must look at your location, industry, experience level, and the amount of time you spend working. Use objective data (like Glassdoor or Bureau of Labor Statistics) and document your reasoning.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">The 60/40 Rule Myth</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Many online forums suggest paying yourself 60% of your profit as salary and 40% as a distribution. The IRS does not endorse this. If your business nets $1,000,000, a 60% salary is $600k (far too high). If your business nets $40,000, a 60% salary is $24k (far too low). Salary is based on market value, not an arbitrary percentage.</span>
              </div>
            </li>
          </ul>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="the-hidden-costs" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Hidden Costs of an S-Corp
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            You should not elect S-Corp status just because you are making $50,000. Running a corporation comes with a heavy administrative burden that costs real money. If you elect S-Corp status too early, these fees will completely wipe out your tax savings.
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-[#1F2937] mb-6">Annual S-Corp Expenses</h3>
            <ul className="space-y-4 text-neutral-600 font-light text-lg">
              <li className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="flex items-center gap-3"><FileWarning className="text-[#064E3B] w-5 h-5" /> <strong>Payroll Service (e.g., Gusto):</strong></span>
                <span>~$500 - $800/yr</span>
              </li>
              <li className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="flex items-center gap-3"><FileWarning className="text-[#064E3B] w-5 h-5" /> <strong>Corporate Tax Return (Form 1120-S):</strong></span>
                <span>~$800 - $1,500/yr</span>
              </li>
              <li className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="flex items-center gap-3"><FileWarning className="text-[#064E3B] w-5 h-5" /> <strong>Unemployment Taxes (FUTA/SUTA):</strong></span>
                <span>~$100 - $400/yr</span>
              </li>
              <li className="flex items-center justify-between font-bold text-[#1F2937] pt-2">
                <span>Estimated Total Admin Burden:</span>
                <span>~$1,400 - $2,700/yr</span>
              </li>
            </ul>
          </div>
          
          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            When Should You Make the Switch?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Because of the ~$2,000 in hidden annual admin costs, most CPAs recommend waiting until your business is consistently netting between <strong>$80,000 and $100,000 in profit</strong> before electing S-Corp status. 
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Use the calculator above to model your specific scenario. Enter your total business revenue, subtract your operating expenses to find your net profit, and experiment with different reasonable salaries. The calculator will automatically deduct the estimated S-Corp admin fees to show you your true, bottom-line net savings. If the savings are substantial, it is time to call a CPA.
          </p>
        </>
      )}
    </ToolLayout>
    </>
  )
}
