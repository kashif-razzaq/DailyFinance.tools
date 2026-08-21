import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, AlertTriangle, Briefcase, FileText, Wallet } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Severance Pay Calculator | Calculate Severance Package",
  description: "Calculate your estimated severance package and severance tax liability with our free severance pay calculator.",
  keywords: ["severance package calculator", "calculate severance pay", "severance tax calculator", "severance pay", "layoff calculator", "termination pay calculator"],
  slug: "employment/severance-pay-calculator",
  category: "Employment & Salary",
});

const faqs: FAQ[] = [
  {
    question: "How do I calculate severance pay?",
    answer: "A standard severance package usually offers 1 to 2 weeks of pay for every year of service you provided. You must also include the payout of any unused Paid Time Off (PTO)."
  },
  {
    question: "How is severance pay taxed?",
    answer: "Severance pay is considered 'supplemental income' by the IRS. Employers typically withhold a flat 22% for federal taxes, plus standard FICA (7.65%) and state taxes. This means severance is heavily withheld compared to a standard paycheck."
  },
  {
    question: "Does my employer have to offer severance?",
    answer: "Under the Fair Labor Standards Act (FLSA), employers are generally not required by federal law to provide severance pay, unless it is stipulated in a contract or employee handbook."
  },
  {
    question: "Does a severance tax calculator include my unused vacation days?",
    answer: "Yes, many states legally require employers to pay out accrued unused vacation time. Our severance package calculator automatically factors in your unused PTO days."
  }
]

export default function SeverancePayPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Severance Pay Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Severance Pay",
    "description": "Calculate your net severance package using our severance pay calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Weekly Base Pay",
        "text": "Input your current weekly salary."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Years of Service",
        "text": "Input how many years you worked for the company."
      },
      {
        "@type": "HowToStep",
        "name": "Factor in Unused PTO",
        "text": "Add the number of unused paid time off days you have accrued."
      },
      {
        "@type": "HowToStep",
        "name": "Review Net Severance",
        "text": "The tool will deduct the flat supplemental tax rates to estimate your final bank deposit."
      }
    ]
  };

  const faqSchema = {
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

  const webPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://dailyfinance.tools/employment/severance-pay-calculator",
        "url": "https://dailyfinance.tools/employment/severance-pay-calculator",
        "name": "Severance Pay Calculator | Calculate Severance Package",
        "description": "Calculate your estimated severance package and severance tax liability with our free severance pay calculator."
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
            "name": "Employment & Salary",
            "item": "https://dailyfinance.tools/employment"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Severance Pay Calculator",
            "item": "https://dailyfinance.tools/employment/severance-pay-calculator"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-software-application"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Script
        id="schema-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ToolLayout
        title="Severance Pay Calculator"
        description="Calculate your exact severance package. Estimate your total payout based on years of service, unused PTO, and the heavy supplemental tax rates applied to termination pay."
        slug="severance-pay-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              Quick Answer: How Do I Calculate Severance Pay?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To <strong>calculate severance pay</strong>, multiply your weekly salary by the number of weeks your employer offers per year of service (usually 1-2 weeks), then multiply that by your total years of service. Next, add the payout value of any unused PTO days. Finally, use a <strong>severance tax calculator</strong> to deduct roughly 30-40% of the total amount, as severance is taxed heavily as supplemental income by the IRS.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding Your Severance Package
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Losing a job is incredibly stressful, and analyzing a complex termination agreement can make it worse. A <strong>severance package calculator</strong> helps you estimate exactly how much money will hit your bank account so you can calculate your emergency runway.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Base Package</h3>
              <p className="text-sm text-neutral-500 font-light">While not legally required, the standard corporate practice is to offer 1 to 2 weeks of base pay for every continuous year you worked for the company.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Unused PTO</h3>
              <p className="text-sm text-neutral-500 font-light">In many states, accrued paid time off is treated as earned wages and must legally be paid out upon termination.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Why is Severance Taxed So High?
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you see the final number from a <strong>severance tax calculator</strong>, you might be shocked. This is because the IRS categorizes severance as "supplemental wages." 
          </p>

          <div className="bg-white border-l-4 border-blue-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The Supplemental Tax Withholding</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mb-4">
              Employers generally withhold a flat 22% for federal income tax on supplemental wages, regardless of your normal tax bracket. In addition to this 22%, they must still withhold 7.65% for FICA (Social Security and Medicare), and your state's income tax rate.
            </p>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mt-4">
              This means a standard severance package will often face an immediate ~35% tax withholding. (Note: If this flat withholding overpays your actual tax liability for the year, you will receive the difference as a refund when you file your tax return).
            </p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
