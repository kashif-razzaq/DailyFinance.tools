import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, Calendar, Clock, DollarSign } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Prorated Salary Calculator | Partial Paycheck Estimator",
  description: "Calculate your prorated salary for a partial pay period when starting or leaving a job mid-cycle.",
  keywords: ["prorated salary calculator", "prorate calculator", "partial paycheck calculator", "prorate salary", "prorated pay calculator"],
  slug: "employment/prorated-salary-calculator",
  category: "Employment & Salary",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate prorated salary?",
    answer: "To calculate a prorated salary, divide your annual salary by the total number of working days in a year (usually 260). This gives you your daily rate. Then, multiply your daily rate by the exact number of days you worked in the partial pay period."
  },
  {
    question: "What does it mean to prorate a salary?",
    answer: "Prorating a salary means adjusting your pay proportionally based on the time you actually worked. This usually happens during your first or last paycheck if you start or leave a job in the middle of a pay cycle."
  },
  {
    question: "How many working days are in a year?",
    answer: "For standard prorated salary calculations, HR departments use 260 working days per year (52 weeks multiplied by 5 working days per week)."
  }
]

export default function ProratedSalaryPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Prorated Salary Calculator",
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
    "name": "How to Calculate Prorated Salary",
    "description": "Calculate your partial paycheck when leaving or starting a new job.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Annual Salary",
        "text": "Input your total gross annual salary."
      },
      {
        "@type": "HowToStep",
        "name": "Define the Pay Period",
        "text": "Input the total number of working days in a standard pay period (usually 10 for bi-weekly)."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Days Worked",
        "text": "Input the exact number of days you worked during this specific partial period."
      },
      {
        "@type": "HowToStep",
        "name": "Get Prorated Pay",
        "text": "The calculator multiplies your daily rate by your days worked to output your prorated paycheck."
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
        "@id": "https://dailyfinance.tools/employment/prorated-salary-calculator",
        "url": "https://dailyfinance.tools/employment/prorated-salary-calculator",
        "name": "Prorated Salary Calculator | Partial Paycheck Estimator",
        "description": "Calculate your prorated salary for a partial pay period when starting or leaving a job mid-cycle."
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
            "name": "Prorated Salary Calculator",
            "item": "https://dailyfinance.tools/employment/prorated-salary-calculator"
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
        title="Prorated Salary Calculator"
        description="Figure out your exact partial paycheck when starting or quitting a job mid-cycle. This prorate calculator converts your salary to a daily rate to give you your gross payout."
        slug="prorated-salary-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              Quick Answer: How to Prorate a Salary
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To accurately use a <strong>prorated salary calculator</strong>, you must find your daily working rate. Divide your total annual salary by 260 (the standard number of working days in a year). If you make $100,000, your daily rate is $384.62. If you quit your job and only worked 3 days of your final 10-day bi-weekly pay cycle, your <strong>partial paycheck calculator</strong> output would simply be $384.62 multiplied by 3, equaling a gross prorated check of $1,153.86.
            </p>
          </section>
        </>
      )}
      </ToolLayout>
    </>
  )
}
