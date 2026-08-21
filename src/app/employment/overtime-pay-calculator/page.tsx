import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, Clock } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Overtime Pay Calculator | Time and a Half & Double Time",
  description: "Calculate your exact overtime paycheck. Factor in time-and-a-half (1.5x) and double-time (2.0x) rates to find your total gross pay.",
  keywords: ["overtime pay calculator", "time and a half calculator", "double time calculator", "overtime calculator", "calculate overtime pay", "FLSA overtime calculator"],
  slug: "employment/overtime-pay-calculator",
  category: "Employment & Salary",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate time and a half?",
    answer: "To calculate time-and-a-half, multiply your standard hourly rate by 1.5. For example, if your base pay is $20/hour, your time-and-a-half rate is $30/hour. You then multiply $30 by the number of overtime hours worked."
  },
  {
    question: "When does overtime pay start?",
    answer: "Under the federal Fair Labor Standards Act (FLSA), non-exempt employees must be paid overtime (1.5x) for any hours worked over 40 in a single workweek."
  },
  {
    question: "What is double time?",
    answer: "Double time (2.0x your base rate) is not mandated by federal law, but some states (like California) require it if an employee works over 12 hours in a single day, or works on a 7th consecutive day."
  }
]

export default function OvertimePayPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Overtime Pay Calculator",
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
    "name": "How to Calculate Overtime Pay",
    "description": "Calculate your time-and-a-half and total paycheck using our overtime calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Base Rate",
        "text": "Input your standard hourly rate."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Regular Hours",
        "text": "Input your normal hours worked, up to 40."
      },
      {
        "@type": "HowToStep",
        "name": "Add Premium Hours",
        "text": "Input the amount of time-and-a-half or double-time hours you worked."
      },
      {
        "@type": "HowToStep",
        "name": "Get Total Gross Pay",
        "text": "The tool will multiply the correct premium rates and sum your gross paycheck."
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
        "@id": "https://dailyfinance.tools/employment/overtime-pay-calculator",
        "url": "https://dailyfinance.tools/employment/overtime-pay-calculator",
        "name": "Overtime Pay Calculator | Time and a Half & Double Time",
        "description": "Calculate your exact overtime paycheck. Factor in time-and-a-half (1.5x) and double-time (2.0x) rates to find your total gross pay."
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
            "name": "Overtime Pay Calculator",
            "item": "https://dailyfinance.tools/employment/overtime-pay-calculator"
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
        title="Overtime Pay Calculator"
        description="Figure out your exact paycheck when working long hours. Calculate standard 1.5x time-and-a-half pay and 2.0x double-time pay to ensure you are being compensated correctly."
        slug="overtime-pay-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              Quick Answer: How to Calculate Overtime Pay
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To manually <strong>calculate overtime pay</strong>, you must separate your regular hours from your premium hours. If your hourly rate is $20 and you worked 45 hours in a week, you multiply 40 hours by $20 (which is $800). Then, use a <strong>time and a half calculator</strong> to multiply your base rate by 1.5 to find your overtime rate ($30). Finally, multiply that $30 overtime rate by the 5 extra hours worked ($150). Your total gross paycheck is $950.
            </p>
          </section>
        </>
      )}
      </ToolLayout>
    </>
  )
}
