import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, Clock, CheckCircle2, AlertTriangle, TrendingUp, Wallet } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Salary to Hourly Calculator | Hourly Rate Converter",
  description: "Convert your annual salary to an hourly wage or calculate your total salary from an hourly rate using this free calculator.",
  keywords: ["rate calculator", "salary to hourly calculator", "hourly to salary calculator", "calculate salary from take home pay", "take home wage calculator", "hourly wage converter"],
  slug: "employment/hourly-rate-calculator",
  category: "Employment & Salary",
});

const faqs: FAQ[] = [
  {
    question: "How do I calculate my hourly rate from my salary?",
    answer: "To calculate your hourly rate, divide your annual gross salary by the total number of hours you work in a year. For a standard 40-hour work week over 52 weeks (2,080 hours), simply divide your salary by 2,080."
  },
  {
    question: "How do I calculate annual salary from an hourly rate?",
    answer: "Multiply your hourly wage by the number of hours you work per week, and then multiply that number by the number of weeks you work per year. For example, $30/hr × 40 hours × 52 weeks = $62,400."
  },
  {
    question: "Does this rate calculator account for taxes?",
    answer: "No, this tool converts your gross pay (before taxes). To calculate your net income after taxes, you should use our dedicated Take Home Pay Calculator in the Employment category."
  },
  {
    question: "What is the standard number of work hours in a year?",
    answer: "The standard full-time US work year is based on 40 hours per week for 52 weeks, totaling 2,080 hours. Even if you take 2 weeks of paid vacation, you are still paid for 2,080 hours."
  }
]

export default function HourlyRatePage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Hourly Rate Calculator",
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
    "name": "How to Convert Salary to Hourly Wage",
    "description": "Calculate your true hourly rate using our rate calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Select Conversion Mode",
        "text": "Choose whether to convert Salary to Hourly or Hourly to Salary."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Compensation",
        "text": "Input your annual salary or your current hourly wage."
      },
      {
        "@type": "HowToStep",
        "name": "Adjust Hours",
        "text": "Input how many hours you work per week and how many weeks you work per year."
      },
      {
        "@type": "HowToStep",
        "name": "Review Daily and Weekly Breakdown",
        "text": "The calculator will automatically display your daily, weekly, monthly, and yearly gross income."
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
        "@id": "https://dailyfinance.tools/employment/hourly-rate-calculator",
        "url": "https://dailyfinance.tools/employment/hourly-rate-calculator",
        "name": "Salary to Hourly Calculator | Hourly Rate Converter",
        "description": "Convert your annual salary to an hourly wage or calculate your total salary from an hourly rate using this free calculator."
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
            "name": "Hourly Rate Calculator",
            "item": "https://dailyfinance.tools/employment/hourly-rate-calculator"
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
        title="Hourly Rate Calculator"
        description="Convert your annual salary to an exact hourly rate, or calculate your total yearly salary from your current hourly wage. Instantly break down your daily, weekly, and monthly earnings."
        slug="hourly-rate-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              Quick Answer: How Do You Calculate Your Hourly Rate?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To find your exact <strong>hourly rate</strong>, take your annual gross salary and divide it by the total number of hours you work in a year. For a standard full-time employee working 40 hours a week for 52 weeks, you work <strong>2,080 hours</strong> per year. If you make $75,000 a year, your <strong>salary to hourly calculator</strong> math would be $75,000 ÷ 2,080, which equals an hourly rate of exactly <strong>$36.06 per hour</strong>.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Why Use a Salary to Hourly Calculator?
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you receive a job offer, employers will present compensation in different formats depending on the classification of the role. An exempt professional might be offered $90,000 a year, while a non-exempt contractor might be offered $45/hour. To effectively compare these two offers, you must use a bidirectional <strong>rate calculator</strong> to standardize the numbers.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Understanding your exact hourly wage is also critical when calculating overtime pay, evaluating side-hustle opportunities, or determining if you should transition from a W-2 employee to a 1099 freelancer.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The 2,080 Rule</h3>
              <p className="text-sm text-neutral-500 font-light">The standard American work year consists of 2,080 payable hours (40 hours × 52 weeks). This is the baseline for all major <strong>salary to hourly calculator</strong> estimates.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Paid Time Off (PTO)</h3>
              <p className="text-sm text-neutral-500 font-light">If you receive paid vacation, those hours are still counted as "worked" hours in an <strong>hourly to salary calculator</strong> because you are being compensated for them.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Wallet className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Gross vs. Net</h3>
              <p className="text-sm text-neutral-500 font-light">This tool calculates Gross pay. To find your final paycheck after taxes, use our dedicated <strong>take home wage calculator</strong>.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Evaluate Overtime Pay
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you are a non-exempt hourly worker in the United States, federal law (FLSA) dictates that any hours worked over 40 in a single workweek must be paid at "time and a half" (1.5x your standard rate). 
          </p>

          <div className="bg-white border-l-4 border-blue-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The Overtime Math Example</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mb-4">
              If your baseline hourly rate in our <strong>rate calculator</strong> is $20/hr, your overtime rate becomes $30/hr. If you work 50 hours in one week:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600 font-light">
              <li>40 hours × $20 = $800 (Base Pay)</li>
              <li>10 hours × $30 = $300 (Overtime Pay)</li>
            </ul>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mt-4">
              Your gross paycheck for that week would be $1,100.
            </p>
          </div>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Transitioning to Freelance
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When transitioning from an employee to a contractor, you cannot simply use a 1:1 ratio in an <strong>hourly to salary calculator</strong>. If you made $40/hour as a W-2 employee, charging $40/hour as a freelancer will result in a massive pay cut due to the 15.3% Self-Employment Tax and the lack of employer benefits (health insurance, 401k matching, paid time off).
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">The Freelance Premium</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            As a general rule, freelancers should charge roughly 1.5x to 2x their standard W-2 hourly rate to maintain the same <strong>take home pay</strong> and lifestyle. If the <strong>salary to hourly calculator</strong> shows you made $30/hour at your corporate job, you should be quoting clients at least $45 to $60/hour for contract work.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
