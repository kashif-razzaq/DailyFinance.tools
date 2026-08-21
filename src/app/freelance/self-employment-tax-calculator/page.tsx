import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, FileText, Home, AlertTriangle, TrendingDown, ShieldCheck, DollarSign, Receipt, Briefcase } from "lucide-react"
import Script from "next/script"

const PAGE_TITLE = "Self-Employment Tax Calculator & 1099 Estimator";
const PAGE_DESCRIPTION = "Estimate your 1099 taxes with our free self-employment tax calculator. Instantly calculate your income tax, SE tax, and see how much to set aside.";

export const metadata: Metadata = generateCalculatorMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: ["self employment tax calculator", "tax calculator 1099", "self employment tax estimator", "calculate my taxes 1099", "tax estimate self employed", "independent contractor taxes calculator", "self employed how much tax will i pay", "figuring self employment tax", "1099 independent contractor tax calculator", "freelance tax calculator", "sole proprietor tax calculator", "contractor tax calculator", "gig worker tax calculator", "self employment tax calculator quarterly"],
  slug: "freelance/self-employment-tax-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "How much tax do I pay if I am self-employed or a 1099 contractor?",
    answer: "As a 1099 independent contractor, you must pay both Self-Employment Tax (15.3% for Social Security and Medicare) and standard Federal/State Income Tax. Because you don't have an employer withholding these taxes from your paycheck, you are responsible for paying the full amount."
  },
  {
    question: "What is the formula for self-employment tax?",
    answer: "The self-employment tax rate is 15.3%. This consists of 12.4% for Social Security and 2.9% for Medicare. However, you only pay this tax on 92.35% of your net business income (your gross revenue minus your business deductions)."
  },
  {
    question: "How much should an independent contractor save for taxes?",
    answer: "A safe rule of thumb is to set aside 25% to 30% of your net income for taxes. If you live in a state with high income tax (like California or New York), you should lean closer to 30%. Use our 1099 tax calculator to get a more personalized estimate."
  },
  {
    question: "Do I have to pay self-employment taxes quarterly?",
    answer: "Yes. If you expect to owe more than $1,000 in taxes for the year, the IRS requires you to make quarterly estimated tax payments. If you wait until April to pay your entire tax bill, you may face underpayment penalties."
  },
  {
    question: "How can I lower my self-employment tax bill?",
    answer: "The best way to lower your 1099 taxes is by claiming legitimate business deductions on Schedule C. By deducting expenses like software, home office costs, and business mileage, you lower your Net Profit. Since SE tax is only calculated on your Net Profit, lower profit equals lower taxes."
  }
]

export default function FreelanceTaxDeductionsPage() {
  const schemaSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": PAGE_TITLE,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const schemaHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Calculate Self Employment Tax (1099 Taxes)`,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Your 1099 Income",
        "text": "Input your total gross freelance, gig worker, or independent contractor income to establish your base revenue."
      },
      {
        "@type": "HowToStep",
        "name": "Input Your Business Deductions",
        "text": "Enter your known business write-offs (software, marketing, supplies) to reduce your taxable net income."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate Your Home Office Deduction",
        "text": "Compare the Simplified and Actual Expenses methods by entering your rent, utilities, and home office square footage to further reduce your tax burden."
      },
      {
        "@type": "HowToStep",
        "name": "Review Your Tax Estimate",
        "text": "Check the final calculator results to see your estimated self-employment tax, income tax, and exactly how much you should set aside."
      }
    ]
  };

  const schemaFAQ = {
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
  };

  const schemaWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": PAGE_TITLE,
    "description": PAGE_DESCRIPTION,
    "url": "https://dailyfinance.tools/freelance/self-employment-tax-calculator"
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dailyfinance.tools"
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
        "name": "Self-Employment Tax Calculator",
        "item": "https://dailyfinance.tools/freelance/self-employment-tax-calculator"
      }
    ]
  };

  return (
    <ToolLayout
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      slug="self-employment-tax-calculator"
      faqs={faqs}
      calculator={(isPro) => (
        <>
          <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
          <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} />
          <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
          <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }} />
          <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
          <CalculatorClient isPro={isPro} />
        </>
      )}
    >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A5F]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: Figuring Self Employment Tax
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To calculate 1099 taxes for an independent contractor or sole proprietor, you must first determine your <strong>Net Profit</strong> (Gross Income minus Business Expenses). The IRS then applies a 15.3% Self-Employment Tax rate (for Social Security and Medicare) to 92.35% of that Net Profit. On top of this SE Tax, you must also pay standard Federal and State Income Tax based on your overall tax bracket. Most freelancers should estimate setting aside <strong>25% to 30%</strong> of their net income for quarterly tax payments.
            </p>
          </section>

          <h2 id="understanding-1099-taxes" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How 1099 Independent Contractor Taxes Work
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you transition from a traditional W-2 employee to a 1099 independent contractor, freelancer, or gig worker, your tax situation changes drastically. The biggest shock for new sole proprietors is discovering that taxes are no longer automatically withheld from their paychecks.
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            As a self-employed individual, you are now responsible for calculating your own taxes, filing them, and paying them directly to the IRS—usually on a quarterly basis. Failure to accurately estimate these taxes using a reliable tax calculator can lead to massive end-of-year tax bills and underpayment penalties.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Self-Employment (SE) Tax</h3>
              <p className="text-sm text-neutral-500 font-light">A flat 15.3% tax that covers your contributions to Social Security and Medicare. W-2 employees split this cost with their employer; you pay both halves.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Receipt className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Income Tax</h3>
              <p className="text-sm text-neutral-500 font-light">The standard federal and state income tax everyone pays. This is calculated based on your total income bracket, after deductions.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingDown className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Business Deductions</h3>
              <p className="text-sm text-neutral-500 font-light">Legitimate business expenses (Schedule C) that lower your taxable net profit, effectively reducing both your SE Tax and Income Tax.</p>
            </div>
          </section>

          <h2 id="self-employment-tax-formula" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Formula for Self Employment Tax
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you want to manually compute your self-employment tax, the IRS uses a specific formula. It is not as simple as taking 15.3% of your gross revenue.
          </p>

          <div className="bg-[#1E3A5F] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">How the IRS Calculates SE Tax</h3>
            
            <ul className="space-y-6 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">1</span>
                <div>
                  <strong className="block text-xl mb-1">Find Your Net Profit</strong>
                  Subtract your ordinary and necessary business expenses from your gross 1099 income.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">2</span>
                <div>
                  <strong className="block text-xl mb-1">Apply the 92.35% Multiplier</strong>
                  The IRS only taxes 92.35% of your net profit for SE tax purposes. (e.g., $100k Net Profit × 0.9235 = $92,350 Subject to SE Tax).
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">3</span>
                <div>
                  <strong className="block text-xl mb-1">Multiply by 15.3%</strong>
                  Multiply that final number by 15.3% to get your total Self-Employment tax liability for the year.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 mb-16 rounded-r-xl">
            <h3 className="text-[#1F2937] font-bold text-xl mb-2">The Good News: The "Half-SE" Tax Deduction</h3>
            <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
              When calculating your federal income tax, the IRS allows you to deduct 50% of the self-employment tax you just calculated. This "Adjustment to Income" helps offset the burden of paying both the employer and employee portions of Medicare and Social Security. Our calculator handles this complex math automatically.
            </p>
          </div>

          <h2 id="quarterly-estimated-taxes" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Quarterly Estimated Tax Payments
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you expect to owe $1,000 or more in taxes as an independent contractor, you cannot wait until April 15th to pay the IRS. You must make four quarterly estimated tax payments throughout the year (April, June, September, and January).
          </p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Our self employed quarterly tax estimator breaks down your total annual tax liability into four manageable chunks, helping you avoid underpayment penalties and cash flow crunches.
          </p>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="lowering-taxes" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Lowering Your Tax Bill with Deductions
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            The most effective way to lower your tax estimate is to legally reduce your Net Profit via business deductions on your Schedule C.
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
            <ul className="space-y-4 text-neutral-600 font-light text-lg">
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <ShieldCheck className="text-[#1E3A5F] w-5 h-5 shrink-0" />
                <span><strong>The Home Office Deduction:</strong> Use our calculator to compare the Simplified ($5/sq ft) vs Actual Expenses method to maximize this massive write-off.</span>
              </li>
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <ShieldCheck className="text-[#1E3A5F] w-5 h-5 shrink-0" />
                <span><strong>Software & Equipment:</strong> Deduct laptops, phones, web hosting, and software subscriptions used for your 1099 work.</span>
              </li>
              <li className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <ShieldCheck className="text-[#1E3A5F] w-5 h-5 shrink-0" />
                <span><strong>Business Mileage:</strong> If you drive for gigs (Uber, DoorDash) or client meetings, track your miles to deduct 72.5 cents per mile (2026 rate).</span>
              </li>
              <li className="flex items-center gap-3 pb-2">
                <ShieldCheck className="text-[#1E3A5F] w-5 h-5 shrink-0" />
                <span><strong>Health Insurance Premiums:</strong> Self-employed individuals can often deduct 100% of their medical, dental, and qualifying long-term care insurance premiums.</span>
              </li>
            </ul>
          </div>
          
          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Stop Guessing, Start Estimating
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Do not let taxes catch you by surprise. Use the free self employment tax estimator above to calculate your exact 1099 taxes, visualize your take-home pay, and determine exactly how much you should be setting aside in your savings account each month.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
