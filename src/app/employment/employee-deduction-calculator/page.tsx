import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, AlertTriangle, Receipt, Activity, PieChart } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Employee Deduction Calculator | Payroll Tax Calculations",
  description: "Use our employee deduction calculator to break down 401k, health insurance, and payroll tax calculations to see your final paycheck.",
  keywords: ["employee deduction calculator", "payroll tax calculations", "employee payroll tax calculator", "employee deductions online calculator", "employee tax withholding calculator", "employee paycheck calculator", "employee withholding calculator"],
  slug: "employment/employee-deduction-calculator",
  category: "Employment & Salary",
});

const faqs: FAQ[] = [
  {
    question: "What is a pre-tax deduction?",
    answer: "A pre-tax deduction (like a traditional 401k or health insurance premium) is money taken out of your paycheck before income taxes are applied. This lowers your taxable income, saving you money on your federal and state tax bill."
  },
  {
    question: "How are payroll tax calculations done?",
    answer: "Standard payroll tax calculations deduct FICA (7.65% for Social Security and Medicare) and federal/state income tax withholdings from your gross pay. Our employee deduction calculator automates this exact process."
  },
  {
    question: "What is the difference between a traditional 401k and a Roth 401k?",
    answer: "Traditional 401k contributions are made pre-tax, lowering your current tax burden. Roth 401k contributions are made post-tax, meaning you pay taxes now but your withdrawals in retirement are completely tax-free."
  },
  {
    question: "Does this work as an employee tax withholding calculator?",
    answer: "Yes, you can adjust the Federal and State tax withholding percentages to act as an employee withholding calculator and simulate exactly what your net paycheck will be."
  }
]

export default function EmployeeDeductionPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Employee Deduction Calculator",
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
    "name": "How to Calculate Payroll Deductions",
    "description": "Calculate your net paycheck using our employee deduction calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Gross Paycheck",
        "text": "Input the total gross amount of your paycheck before any taxes or fees are taken out."
      },
      {
        "@type": "HowToStep",
        "name": "Input Pre-Tax Deductions",
        "text": "Add your 401k percentage, HSA contributions, and health insurance premiums."
      },
      {
        "@type": "HowToStep",
        "name": "Set Tax Rates",
        "text": "Input your estimated Federal and State income tax withholding rates."
      },
      {
        "@type": "HowToStep",
        "name": "Review Net Pay",
        "text": "The tool will output a breakdown of exactly where your money is going."
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
        "@id": "https://dailyfinance.tools/employment/employee-deduction-calculator",
        "url": "https://dailyfinance.tools/employment/employee-deduction-calculator",
        "name": "Employee Deduction Calculator | Payroll Tax Calculations",
        "description": "Use our employee deduction calculator to break down 401k, health insurance, and payroll tax calculations to see your final paycheck."
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
            "name": "Employee Deduction Calculator",
            "item": "https://dailyfinance.tools/employment/employee-deduction-calculator"
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
        title="Employee Deduction Calculator"
        description="Figure out exactly where your paycheck is going. Model your pre-tax deductions, FICA, and income tax withholdings to maximize your net pay."
        slug="employee-deduction-calculator"
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
              Quick Answer: How Are Payroll Tax Calculations Done?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Proper <strong>payroll tax calculations</strong> operate in a specific order of operations. First, pre-tax deductions (like medical premiums and Traditional 401k contributions) are subtracted from your gross pay to find your taxable income. Next, an <strong>employee tax withholding calculator</strong> deducts FICA taxes (7.65%), Federal Income Tax, and State Income Tax. Finally, post-tax deductions (like a Roth 401k) are subtracted to reveal your final net paycheck.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding Your Paycheck
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Looking at a pay stub can be confusing. Your $5,000 gross paycheck often turns into a $3,200 deposit in your bank account, and the abbreviations on the stub rarely explain why. By using an <strong>employee deductions online calculator</strong>, you can simulate changes to your benefits and see exactly how they impact your take-home pay.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Pre-Tax Deductions</h3>
              <p className="text-sm text-neutral-500 font-light">Contributions to traditional 401k plans, HSAs, and health insurance premiums lower your taxable income, meaning you pay fewer taxes overall.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Receipt className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Payroll Taxes</h3>
              <p className="text-sm text-neutral-500 font-light">Any <strong>employee payroll tax calculator</strong> will automatically deduct 7.65% for FICA, alongside federal and state withholdings.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <PieChart className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Post-Tax Deductions</h3>
              <p className="text-sm text-neutral-500 font-light">Roth 401k contributions and garnishments come out of your paycheck after all taxes have been fully applied.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How Pre-Tax Deductions Save You Money
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you use the <strong>employee deduction calculator</strong> to increase your Traditional 401k contribution by $100, your final net paycheck will not actually decrease by $100.
          </p>

          <div className="bg-white border-l-4 border-blue-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The Tax Shield Effect</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mb-4">
              Because a Traditional 401k contribution is taken out pre-tax, it shields that $100 from your top marginal tax bracket. If you are in the 22% federal tax bracket and a 5% state tax bracket, investing $100 into your 401k only reduces your net paycheck by roughly $73.
            </p>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mt-4">
              This is why utilizing a <strong>paycheck tax calculator</strong> is so powerful: it allows you to aggressively invest for retirement while minimizing the hit to your monthly cash flow.
            </p>
          </div>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

        </>
      )}
      </ToolLayout>
    </>
  )
}
