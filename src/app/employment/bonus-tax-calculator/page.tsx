import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, DollarSign, Percent } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Bonus Tax Calculator | Supplemental Wage Estimator",
  description: "Calculate your net bonus check after supplemental federal and state taxes with our free bonus tax calculator.",
  keywords: ["bonus tax calculator", "supplemental tax calculator", "net bonus calculator", "bonus paycheck calculator", "bonus tax estimator"],
  slug: "employment/bonus-tax-calculator",
  category: "Employment & Salary",
});

const faqs: FAQ[] = [
  {
    question: "Why is my bonus taxed so high?",
    answer: "Your bonus is not technically taxed at a higher rate; it is withheld at a higher rate. The IRS considers bonuses to be 'supplemental wages' and requires employers to withhold a flat 22% for federal income tax, plus FICA and state taxes."
  },
  {
    question: "How do I calculate the tax on my bonus?",
    answer: "To calculate your net bonus, multiply the gross bonus amount by the 22% federal supplemental rate, the 7.65% FICA rate, and your state's tax rate. Subtract those totals from the gross amount."
  },
  {
    question: "Will I get a refund if my bonus was over-taxed?",
    answer: "Yes! The 22% flat withholding is just an estimate. If your actual effective tax rate for the year is only 15%, you will get the 7% overpayment refunded to you when you file your tax return."
  }
]

export default function BonusTaxPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bonus Tax Calculator",
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
    "name": "How to Calculate Net Bonus",
    "description": "Calculate your net bonus using our supplemental tax calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Gross Bonus",
        "text": "Input the pre-tax bonus amount awarded by your employer."
      },
      {
        "@type": "HowToStep",
        "name": "Review Supplemental Rates",
        "text": "Ensure the Federal Supplemental Rate is set to the IRS standard 22%."
      },
      {
        "@type": "HowToStep",
        "name": "Enter State Tax",
        "text": "Input your state income tax rate."
      },
      {
        "@type": "HowToStep",
        "name": "Get Net Bonus",
        "text": "The tool will deduct all taxes, including FICA, to reveal your exact take-home bonus."
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
        "@id": "https://dailyfinance.tools/employment/bonus-tax-calculator",
        "url": "https://dailyfinance.tools/employment/bonus-tax-calculator",
        "name": "Bonus Tax Calculator | Supplemental Wage Estimator",
        "description": "Calculate your net bonus check after supplemental federal and state taxes with our free bonus tax calculator."
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
            "name": "Bonus Tax Calculator",
            "item": "https://dailyfinance.tools/employment/bonus-tax-calculator"
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
        title="Bonus Tax Calculator"
        description="Figure out your exact take-home bonus. Calculate how the IRS flat 22% supplemental tax withholding, combined with FICA and state taxes, impacts your final paycheck."
        slug="bonus-tax-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              Quick Answer: How are Bonuses Taxed?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Bonuses are considered "supplemental wages" by the IRS. Instead of using your normal income tax bracket, employers are required to use a flat <strong>22% federal withholding rate</strong> for bonuses under $1 million. When you use a <strong>net bonus calculator</strong>, it will deduct this 22%, along with the mandatory 7.65% FICA tax, and your state income tax. This often results in roughly 30% to 40% of your gross bonus being withheld for taxes.
            </p>
          </section>
        </>
      )}
      </ToolLayout>
    </>
  )
}
