import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import Script from "next/script"
import { Calculator, Clock, Target, TrendingDown, HelpCircle, CheckCircle, TrendingUp, DollarSign } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Billable Hours Calculator | Free Attorney & Freelance Tool",
  description: "Free billable hours calculator for lawyers, consultants, and freelancers. Calculate your billable rate, utilization rate, and effective hourly rate instantly.",
  keywords: ["billable hours calculator", "billable rate calculator", "lawyer billable hours calculator", "free billable hours calculator", "attorney billable time calculator", "billable hourly rate calculator", "billable time calculator", "timesheet in excel to track billable hours"],
  slug: "freelance/billable-hours-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "What is the formula to calculate billable hours?",
    answer: "To calculate your total billable amount, multiply your total billable hours worked by your agreed hourly rate, subtract any discounts, and add expenses: (Total Billable Hours × Hourly Rate) - Discounts + Expenses."
  },
  {
    question: "How do you calculate time duration for billing?",
    answer: "If you are using a digital spreadsheet like Excel to track your time, you can find your exact decimal hours by using the formula: (End Time - Start Time) × 24."
  },
  {
    question: "How do lawyers calculate billable increments?",
    answer: "Most attorneys, lawyers, and paralegals track time in 6-minute increments (tenths of an hour). For example, 6 minutes = 0.1 hours, 15 minutes = 0.3 hours (rounded), 30 minutes = 0.5 hours, and 45 minutes = 0.75 hours."
  },
  {
    question: "What is a Utilization Rate?",
    answer: "Your utilization rate is the percentage of your total working hours that are actually billed to clients. The formula is: (Billable Hours ÷ Total Hours Worked) × 100. A healthy target for consultants and agencies is usually between 70% and 80%."
  },
  {
    question: "What is an Effective Hourly Rate?",
    answer: "Your effective hourly rate reveals what you are truly earning per hour of your life spent working. The formula is: Total Billable Revenue ÷ Total Hours Worked (including non-billable admin time)."
  }
]

export default function BillableHoursPage() {
  const schemaSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Billable Hours Calculator",
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
    "name": "How to Calculate Billable Hours and Rates",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Hourly Rate",
        "text": "Input your agreed-upon hourly rate for the client or project."
      },
      {
        "@type": "HowToStep",
        "name": "Input Billable Hours",
        "text": "Enter the exact decimal hours spent working directly on the client's deliverables."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Total Hours Worked",
        "text": "Include all time spent on the project, including unbilled administrative tasks, emails, and internal meetings."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate Invoice Amount",
        "text": "The calculator will instantly apply the billable hours formula to generate your total invoice amount, utilization rate, and effective hourly rate."
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
    "name": "Billable Hours Calculator | Free Attorney & Freelance Tool",
    "url": "https://dailyfinance.tools/freelance/billable-hours-calculator"
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
        "name": "Billable Hours Calculator",
        "item": "https://dailyfinance.tools/freelance/billable-hours-calculator"
      }
    ]
  };

  return (
    <>
      <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <ToolLayout
        title="Billable Hours Calculator"
        description="Calculate your total invoice amount, effective hourly rate, and utilization percentage. Perfect for lawyers, consultants, and freelancers."
        slug="billable-hours-calculator"
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
              Quick Answer: How to Calculate Billable Hours
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To calculate your total billable amount, multiply your total billable hours worked by your agreed hourly rate, subtract any discounts, and add any reimbursable expenses. The formula is: <strong>(Total Billable Hours × Hourly Rate) - Discounts + Expenses</strong>. If you are tracking time in a spreadsheet like Excel and need to convert timestamps to decimal hours, use the formula <code>(End Time - Start Time) × 24</code>.
            </p>
          </section>

          <h2 id="core-billing-formulas" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Core Billing Formulas
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Whether you are a freelance developer, an agency owner, or an attorney looking for a lawyer billable hours calculator, accurately valuing your time is the foundation of a profitable business. 
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">4 Metrics You Must Track</h3>
            
            <ul className="space-y-6 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">1</span>
                <div>
                  <strong className="block text-xl mb-1">Total Invoice Amount</strong>
                  <code>(Billable Hours × Hourly Rate) - Discount + Expenses</code>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">2</span>
                <div>
                  <strong className="block text-xl mb-1">Time Duration (Decimal)</strong>
                  <code>(End Time - Start Time) × 24</code> (Essential for Excel users)
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">3</span>
                <div>
                  <strong className="block text-xl mb-1">Utilization Rate</strong>
                  <code>(Billable Hours ÷ Total Hours Worked) × 100</code>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">4</span>
                <div>
                  <strong className="block text-xl mb-1">Effective Hourly Rate</strong>
                  <code>Total Billable Revenue ÷ Total Hours Worked</code>
                </div>
              </li>
            </ul>
          </div>

          <h2 id="converting-minutes" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Converting Minutes to Decimals
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Calculators require decimal inputs, not minutes. You cannot type "1 hour and 30 minutes" as <code>1.30</code>. That is mathematically incorrect. You must convert the minutes into a fraction of 60.
          </p>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <span className="text-2xl font-black text-[#1F2937] mb-1">15 min</span>
              <span className="text-[#D97706] font-bold">0.25 hrs</span>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <span className="text-2xl font-black text-[#1F2937] mb-1">30 min</span>
              <span className="text-[#D97706] font-bold">0.50 hrs</span>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <span className="text-2xl font-black text-[#1F2937] mb-1">45 min</span>
              <span className="text-[#D97706] font-bold">0.75 hrs</span>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-center text-center">
              <span className="text-2xl font-black text-[#1F2937] mb-1">60 min</span>
              <span className="text-[#D97706] font-bold">1.00 hrs</span>
            </div>
          </section>

          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-16 rounded-r-xl">
            <h3 className="text-[#1F2937] font-bold text-xl mb-2">The Attorney Standard (6-Minute Increments)</h3>
            <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
              If you are using this as an attorney billable time calculator, you likely track time in tenths of an hour (6-minute increments). This makes decimal conversion incredibly easy:<br/><br/>
              • 6 minutes = 0.1 hours<br/>
              • 12 minutes = 0.2 hours<br/>
              • 18 minutes = 0.3 hours
            </p>
          </div>

          <h2 id="effective-hourly-rate" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Why Your "Effective Rate" Matters More
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Many freelancers boast about having a $150/hour rate. But if they spend 20 hours a week on unbilled administrative tasks (finding clients, writing proposals, invoicing), their <strong>Effective Hourly Rate</strong> is significantly lower.
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If you bill 20 hours at $150/hr ($3,000), but you actually worked 40 hours that week, your effective rate is only $75/hr. This is why our free billable hour calculator asks for your "Total Hours Worked." It forces you to confront the reality of your non-billable overhead.
          </p>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}
          
          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Start Tracking Honestly
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The difference between a struggling freelancer and a highly profitable agency is strict time management. Use our billable rate calculator to track your Utilization Rate. If you are consistently below 60%, you are spending too much time "managing" your business and not enough time executing client deliverables.
          </p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
