import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import Script from "next/script"
import { Calculator, Map, Building, Home, Target, TrendingUp, CheckCircle, ArrowRightLeft } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Cost of Living Calculator | Compare Cities & Estimate Expenses",
  description: "Free cost of living calculator to compare salaries between cities. Estimate your personal living expenses for housing, food, and transportation.",
  keywords: ["cost of living calculator", "cost of living comparison by city", "living expenses calculator", "cost of living comparisons", "compare city to city cost of living", "salary comparison city to city", "relocation calculator", "compare living cost by city"],
  slug: "freelance/digital-nomad-cost-of-living-calculator",
  category: "Personal Finance",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate cost of living comparison?",
    answer: "To calculate the salary needed in a new city, multiply your current salary by the ratio of the new location's index to your current location's index. The formula is: Required Salary = Current Salary × (New City Index ÷ Current City Index)."
  },
  {
    question: "What is a cost of living index?",
    answer: "A cost of living index is a theoretical price index that measures relative cost of living over time or regions. It is an index that measures differences in the price of goods and services. A baseline city is usually assigned an index of 100. A city with an index of 120 is 20% more expensive than the baseline."
  },
  {
    question: "How do I calculate my personal cost of living?",
    answer: "To calculate your total personal cost of living, add up your average annual or monthly expenses across core categories: Housing (rent/mortgage), Food, Transportation, Healthcare, Taxes, and Miscellaneous expenses."
  },
  {
    question: "How much of my income should go to housing?",
    answer: "Most financial experts recommend the 30% rule: you should spend no more than 30% of your gross monthly income on housing expenses (rent or mortgage, property taxes, and utilities)."
  },
  {
    question: "How does relocating affect my salary?",
    answer: "If you relocate to a city with a higher cost of living index without a proportional salary increase, your standard of living will decrease because your purchasing power is reduced. This is why using a cost of living comparison tool is vital before accepting a job offer in a new city."
  }
]

export default function CostOfLivingCalculatorPage() {
  const schemaSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cost of Living Comparison Calculator",
    "applicationCategory": "FinanceApplication",
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
    "name": "How to Compare Cost of Living Between Cities",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Current Salary",
        "text": "Input your current annual salary or income to establish your baseline purchasing power."
      },
      {
        "@type": "HowToStep",
        "name": "Input Cost of Living Indices",
        "text": "Enter the index of your current city (usually 100) and the index of your destination city."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate Required Salary",
        "text": "The calculator will instantly output the exact salary you need to maintain your current standard of living."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Personal Expenses",
        "text": "Use the personal expense breakdown to map out expected costs for housing, food, and healthcare."
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

  return (
    <>
      <Script id="schema-software" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaHowTo) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <ToolLayout
        title="Cost of Living Calculator"
        description="Compare the cost of living between two cities to calculate the salary you need to maintain your standard of living, and estimate personal living expenses."
        slug="cost-of-living-calculator"
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
                Quick Answer: How to Calculate Cost of Living Differences
              </h2>
              <p className="text-neutral-600 leading-relaxed text-lg">
                To accurately compare the cost of living between two cities, you use a ratio of their Cost of Living Indices. The core location comparison formula is: <strong>Required Salary = Current Salary × (New City Index ÷ Current City Index)</strong>. For example, if you make $85,000 in a city with an index of 100, and you move to a city with an index of 145, you multiply $85,000 by 1.45. You would need a new salary of $123,250 to maintain the exact same standard of living.
              </p>
            </section>

            <h2 id="the-relocation-trap" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              The Relocation Salary Trap
            </h2>
            
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Accepting a job offer in a new city without performing a rigorous cost of living comparison is one of the most common financial mistakes professionals make. 
            </p>

            <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
              A company might offer you a $20,000 raise to relocate from Austin, Texas, to San Francisco, California. On paper, it looks like a massive promotion. However, because housing, taxes, and groceries are vastly more expensive in San Francisco, that $20,000 raise actually results in a drastic reduction in your overall purchasing power. You are effectively taking a pay cut to do a harder job.
            </p>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Purchasing Power</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">The true measure of wealth is not your gross salary, but what that salary can buy in your specific geographic location.</p>
              </div>
              <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
                <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                  <Home className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Housing Anchor</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">Housing is the largest variable in any cost of living comparison. Rent in Manhattan can be 300% higher than in the Midwest.</p>
              </div>
            </section>

            <h2 id="calculating-the-difference" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              Understanding the Formulas
            </h2>

            <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Core Cost of Living Equations</h3>
              
              <ul className="space-y-8 relative z-10 text-white/90 font-light">
                <li className="flex items-start gap-4">
                  <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                    <strong className="block text-xl mb-2 text-[#D97706]">1. The City-to-City Comparison</strong>
                    <p className="mb-2">To find the exact salary required to maintain your lifestyle when relocating.</p>
                    <code className="bg-black/30 px-3 py-1 rounded text-sm block">Required Salary = Current Salary × (New City Index ÷ Current City Index)</code>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                    <strong className="block text-xl mb-2 text-[#D97706]">2. The Personal Expense Budget</strong>
                    <p className="mb-2">To estimate your baseline survival number (your minimum living expenses).</p>
                    <code className="bg-black/30 px-3 py-1 rounded text-sm block">Total Cost = Housing + Food + Transportation + Healthcare + Taxes + Misc</code>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-16 rounded-r-xl">
              <h3 className="text-[#1F2937] font-bold text-xl mb-2">How Cost of Living Indices Work</h3>
              <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
                Economists use a "weighted aggregate index" to measure inflation and location costs. They fill a theoretical basket with goods (rent, gas, milk) and weight them based on average consumption (e.g., housing is weighted heavily, milk is weighted lightly). A baseline city is assigned an index of 100. If New York City has an index of 180, it is 80% more expensive than the baseline.
              </p>
            </div>

            <h2 id="using-the-calculator" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              How to Use Our Comparison Tool
            </h2>

            <ul className="space-y-6 mb-12">
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <Target className="h-8 w-8 text-[#064E3B] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">Step 1: Set Your Baseline</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">Enter your current annual salary and assume your current city's index is 100 (the baseline).</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <Map className="h-8 w-8 text-blue-600 shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">Step 2: Enter the Target Index</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">Look up the cost of living index for your destination city (sites like Numbeo or NerdWallet provide these). Enter it into the New City Index field. The tool will instantly calculate the precise salary you need to negotiate for.</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
                <Calculator className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
                <div>
                  <strong className="text-[#1F2937] block text-xl mb-2">Step 3: Estimate Personal Expenses</strong>
                  <span className="text-neutral-600 font-light leading-relaxed">Use the secondary panel to manually input estimates for your rent, groceries, and transit in the new city. The interactive chart will help you visualize where your money will go.</span>
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
            
            <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
              Negotiate With Data
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
              Never accept a relocation offer or a remote job pay-cut without backing up your counter-offer with data. Use the living expenses calculator above to prove exactly why you require a specific salary to maintain your lifestyle in a higher-tier city.
            </p>
          </>
        )}
      </ToolLayout>
    </>
  )
}
