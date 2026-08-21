import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Wallet, Briefcase, Video, Calculator, DollarSign, TrendingDown } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Take Home Pay Calculator | W2, 1099 & Creators",
  description: "Calculate your exact take home paycheck for W2 employees, 1099 freelancers, and digital creators using our free payroll take home calculator.",
  keywords: ["take home pay calculator", "estimate take home pay", "bring home pay calculator", "take home income calculator", "takehome pay calculator", "payroll take home calculator", "take home wage calculator", "figure out take home pay", "calculate salary from take home pay", "take home paycheck"],
  slug: "employment/take-home-pay-calculator",
  category: "Employment & Salary",
});

const faqs: FAQ[] = [
  {
    question: "How do I calculate my take home pay?",
    answer: "To accurately calculate your take home paycheck, you must subtract all federal taxes, state taxes, and FICA (Social Security and Medicare) from your gross salary. Our take home pay calculator automates this for W-2, 1099, and creator income."
  },
  {
    question: "How do I figure out take home pay for a 1099 freelancer?",
    answer: "Freelancers must pay a 15.3% Self-Employment Tax on top of standard income tax. Our take home income calculator allows you to input business write-offs to accurately estimate your final net income."
  },
  {
    question: "Does this work as a payroll take home calculator?",
    answer: "Yes. Simply select the 'W-2 Employee' tab to use this tool as a payroll calculator take home pay estimator, which deducts standard payroll taxes to reveal your true bring home pay."
  },
  {
    question: "Can I use this to calculate salary from take home pay?",
    answer: "This tool works dynamically. By adjusting your gross salary inputs in the take home wage calculator, you can back-calculate what gross salary you need to achieve your desired take home paycheck."
  },
  {
    question: "Why does my creator take home pay look different than a W-2?",
    answer: "Digital creators do not have FICA taxes automatically withheld. Instead, they must account for platform fees (like Patreon or Gumroad) and payment processing fees, which our dedicated creator tab calculates automatically."
  }
]

export default function TakeHomePayPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Take Home Pay Calculator",
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
    "name": "How to Figure Out Take Home Pay",
    "description": "Calculate your true bring home pay using our payroll take home calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Select Your Profession",
        "text": "Choose whether you are a W-2 Employee, a 1099 Freelancer, or a Digital Creator."
      },
      {
        "@type": "HowToStep",
        "name": "Enter Gross Income",
        "text": "Input your annual salary or gross monthly revenue into the take home pay calculator."
      },
      {
        "@type": "HowToStep",
        "name": "Input Deductions and Taxes",
        "text": "Adjust your state tax, federal tax, or business expenses."
      },
      {
        "@type": "HowToStep",
        "name": "Review Your Paycheck",
        "text": "The tool will automatically estimate take home pay by subtracting FICA, self-employment taxes, or platform fees."
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
        "@id": "https://dailyfinance.tools/employment/take-home-pay-calculator",
        "url": "https://dailyfinance.tools/employment/take-home-pay-calculator",
        "name": "Take Home Pay Calculator | W2, 1099 & Creators",
        "description": "Calculate your exact take home paycheck for W2 employees, 1099 freelancers, and digital creators."
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
            "name": "Take Home Pay Calculator",
            "item": "https://dailyfinance.tools/employment/take-home-pay-calculator"
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
        title="Take Home Pay Calculator"
        description="Figure out your exact take home pay. Whether you are a W-2 employee, a 1099 freelancer, or a digital creator, use our free calculator to estimate your real net income."
        slug="take-home-pay-calculator"
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
              Quick Answer: How Do I Figure Out Take Home Pay?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To accurately <strong>estimate take home pay</strong>, you must deduct standard payroll liabilities from your gross salary. For a W-2 employee, a <strong>payroll take home calculator</strong> subtracts Federal Income Tax (10-37%), State Income Tax, and FICA (7.65% for Social Security and Medicare). If you are an independent contractor, you must use a 1099 <strong>take home income calculator</strong> to deduct the 15.3% Self-Employment tax before calculating your final <strong>take home paycheck</strong>.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Ultimate Bring Home Pay Calculator
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Gross income is a vanity metric. Whether you are negotiating a new salary, starting a freelance business, or launching a digital product, you need to know exactly how much money will actually hit your bank account. Our multi-profession <strong>take home pay calculator</strong> dynamically adjusts its logic based on how you earn your money.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Wallet className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">W-2 Employees</h3>
              <p className="text-sm text-neutral-500 font-light">Your employer splits FICA taxes with you. Use this mode as a <strong>payroll calculator take home pay</strong> estimator to see your net salary.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">1099 Freelancers</h3>
              <p className="text-sm text-neutral-500 font-light">You are responsible for the full 15.3% Self-Employment Tax. Deduct your business expenses to reveal your true <strong>take home wage</strong>.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Video className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Digital Creators</h3>
              <p className="text-sm text-neutral-500 font-light">Compare platform fees across Patreon, Substack, and Gumroad to maximize your <strong>take home earnings</strong>.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Check Take Home Pay for W-2 vs 1099
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you are transitioning from a traditional job to freelancing, using a <strong>take home income calculator</strong> is critical. Earning $100,000 as a W-2 employee results in a vastly different <strong>take home paycheck</strong> than earning $100,000 as a 1099 contractor.
          </p>

          <div className="bg-white border-l-4 border-blue-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The Self-Employment Tax Trap</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mb-4">
              When you are a W-2 employee, your employer pays half of your Medicare and Social Security taxes. When you are a 1099 freelancer, you are both the employer and the employee, meaning you must pay the entire 15.3% yourself.
            </p>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mt-4">
              To <strong>figure out take home pay</strong> accurately as a freelancer, you must meticulously track your business expenses. Writing off a $2,000 laptop lowers your taxable income, which directly increases your <strong>estimated take home salary</strong>.
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
            Calculating Salary from Take Home Pay
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Many users want to reverse-engineer their finances. If you know your monthly expenses require a $5,000 <strong>bring home pay</strong>, you can use this tool to iteratively <strong>calculate salary from take home pay</strong>. Simply increase the Gross Salary input until the Net Take Home number matches your required $5,000 baseline.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">The Impact of State Taxes</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Do not forget to adjust the State Tax Rate in the <strong>takehome pay calculator</strong>. Moving from a high-tax state like California (which can levy up to 13.3%) to a zero-income-tax state like Texas or Florida will immediately trigger a massive boost to your <strong>take home paycheck</strong> without requiring a raise from your employer.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
