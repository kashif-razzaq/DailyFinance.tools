import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, ArrowRight, ShieldCheck, PieChart, Activity, MonitorSmartphone, Target, BriefcaseBusiness, Clock, Briefcase } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Freelance Hourly Rate Calculator: Calculate Fees & Wages",
  description: "Calculate your true freelance hourly rate by factoring in hidden business expenses, unbillable time, and self-employment taxes to calculate your true minimum acceptable rate.",
  keywords: ["freelance hourly rate calculator", "freelance rate calculator", "freelance fee calculator", "freelance wage calculator", "self employed hourly rate calculator", "calculate freelance hourly rate", "convert freelance rate to salary"],
  slug: "freelance/freelance-hourly-rate-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate a freelance hourly rate?",
    answer: "To calculate your freelance hourly rate, use the Minimum Acceptable Rate (MAR) formula. First, add your target annual salary (net income), your total annual business expenses, and your estimated income and self-employment taxes. Divide this gross revenue figure by your true annual billable hours (usually 1,000 to 1,200 hours). This calculation yields the lowest hourly rate you can afford to charge."
  },
  {
    question: "What is the standard formula to calculate freelance hourly rates?",
    answer: "The standard calculation formula is: [(Target Net Income + Annual Business Expenses + Profit Buffer) / Annual Billable Hours] + Tax Buffer = Minimum Hourly Rate. Never simply divide your desired corporate salary by 40 hours a week. This flawed approach completely ignores business overhead and self-employment tax liabilities."
  },
  {
    question: "What is the difference between billable and non-billable hours?",
    answer: "Billable hours are the specific hours you spend actively executing client deliverables that you can put on an invoice (e.g., coding, writing, designing). Non-billable hours are spent running the administrative side of your business, which includes invoicing, marketing, bookkeeping, and networking. Most successful freelancers typically only bill 50% to 60% of their actual working hours."
  },
  {
    question: "Why shouldn't I just charge what my competitors are charging?",
    answer: "Market research gives you a ceiling, but your Minimum Acceptable Rate (MAR) gives you your survival floor. Your peers have completely different cost structures, tax liabilities, and lifestyle requirements. Pricing your services strictly based on competitors often leads to an unprofitable business model and eventual burnout."
  },
  {
    question: "When should I transition from hourly rates to value-based pricing?",
    answer: "You should pursue a transition to value-based pricing or flat project fees once you become highly efficient and specialized in your field. Hourly billing fundamentally punishes efficiency. Flat fees detach your income entirely from your time, allowing you to scale your business revenue without working exponentially more hours."
  }
]

export default function HourlyRateCalculatorPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Freelance Hourly Rate Calculator",
    "applicationCategory": "BusinessApplication",
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
    "name": "How to Calculate Your Freelance Hourly Rate",
    "description": "A comprehensive, step-by-step mathematical guide to calculating your Minimum Acceptable Rate (MAR) using our advanced freelance fee calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Your Target Income",
        "text": "Start the process by entering your desired annual take-home pay. This figure must comfortably cover your personal living expenses."
      },
      {
        "@type": "HowToStep",
        "name": "Add Business Expenses",
        "text": "Utilize the Advanced Options panel to input detailed yearly business overhead costs like software subscriptions and marketing."
      },
      {
        "@type": "HowToStep",
        "name": "Factor in Taxes",
        "text": "Account for the burden of self-employment and income taxes by entering your estimated effective tax rate."
      },
      {
        "@type": "HowToStep",
        "name": "Define Billable Hours",
        "text": "Estimate your actual client work hours per year, keeping in mind that non-billable tasks will consume approximately forty percent of your time."
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
        "@id": "https://dailyfinance.tools/freelance/freelance-hourly-rate-calculator",
        "url": "https://dailyfinance.tools/freelance/freelance-hourly-rate-calculator",
        "name": "Freelance Hourly Rate Calculator: Set Profitable Fees",
        "description": "Calculate your true freelance hourly rate by factoring in hidden business expenses, unbillable time, and self-employment taxes to calculate your true minimum acceptable rate."
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
            "name": "Freelance",
            "item": "https://dailyfinance.tools/freelance"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Freelance Hourly Rate Calculator",
            "item": "https://dailyfinance.tools/freelance/freelance-hourly-rate-calculator"
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
        title="Freelance Hourly Rate Calculator"
        description="Calculate your true freelance hourly rate by factoring in hidden business expenses, self-employment taxes, and unbillable administrative time. Stop guessing your worth and mathematically ensure your freelance business is highly profitable."
        slug="freelance-hourly-rate-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A5F]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How to Calculate Your Freelance Hourly Rate
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To calculate a profitable freelance hourly rate, you must determine your <strong>Minimum Acceptable Rate (MAR)</strong>. First, add your target annual take-home pay, your yearly operating business expenses, and a 25% to 30% self-employment tax buffer. Finally, divide this total gross requirement by your estimated <em>billable</em> hours per year (typically 1,000 to 1,200). Never make the mistake of simply dividing a corporate target salary by a standard 2,000-hour work year.
            </p>
          </section>

       

          <h2 id="how-to-set-profitable-rate" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Set a Profitable Freelance Hourly Rate
          </h2>
          
          <p className="text-lg text-neutral-600 mb-5 leading-relaxed font-light">
            Setting an arbitrary hourly rate based on a quick internet search is the fastest possible way to underprice your freelance business. When you transition from a W-2 salaried employee to a 1099 independent contractor, a fundamental shift occurs.
          </p>

          <p className="text-lg text-neutral-600 mb-5 leading-relaxed font-light">
            You are no longer just an employee executing a job—you are a functioning, independent business entity. You assume total and unyielding financial responsibility for everything a corporation usually handles on your behalf.
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            To build a sustainable freelance career, you must discard the employee mindset. You must adopt a strict, math-driven approach to discover your baseline profitability floor before entering negotiations with any prospective client.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-neutral-100 flex items-center justify-center mb-5">
                <BriefcaseBusiness className="h-6 w-6 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-3 text-lg">The Hidden Overhead</h3>
              <p className="text-neutral-600 font-light leading-relaxed">From cloud hosting and invoicing software to legal consultations, business expenses rapidly erode your personal take-home pay if not mathematically baked into your baseline rate.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-neutral-100 flex items-center justify-center mb-5">
                <ShieldCheck className="h-6 w-6 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-3 text-lg">Self-Employment Taxes</h3>
              <p className="text-neutral-600 font-light leading-relaxed">Independent contractors pay the full 15.3% FICA tax entirely on their own, on top of standard state and federal income brackets. Clients must subsidize this hidden burden.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-neutral-100 flex items-center justify-center mb-5">
                <Clock className="h-6 w-6 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-3 text-lg">Unpaid Administration</h3>
              <p className="text-neutral-600 font-light leading-relaxed">Marketing, pitching, contract drafting, and accounting require massive amounts of time. You will likely only bill clients for roughly sixty percent of the actual hours you dedicate to your business.</p>
            </div>
          </section>

          <h2 id="the-calculation-formula" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Complete Mathematical Formula for Freelancers
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            To find your true financial baseline, you need to use the Minimum Acceptable Rate (MAR) formula. This specific metric is the absolute lowest number you can charge a client without actively damaging your business's financial health.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex gap-6 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <div className="hidden sm:block shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">1. Desired Net Income</strong>
                <p className="text-neutral-600 font-light leading-relaxed">
                  Pick the annual take-home pay you require to cover personal living expenses, housing, and savings goals. This is your net target before business overhead is applied. 
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <div className="hidden sm:block shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MonitorSmartphone className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">2. Detailed Business Expenses</strong>
                <p className="text-neutral-600 font-light leading-relaxed">
                  Add up all annual software subscriptions, hardware depreciation, internet utilities, advertising budgets, and essential professional services like legal counsel or CPA fees.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <div className="hidden sm:block shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">3. Tax and Profit Buffers</strong>
                <p className="text-neutral-600 font-light leading-relaxed">
                  You must meticulously factor in self-employment (FICA) and income taxes based on your local federal and state laws. Your clients must subsidize this burden.
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <div className="hidden sm:block shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">4. True Billable Hours</strong>
                <p className="text-neutral-600 font-light leading-relaxed">
                  Accurately estimate actual client work hours per year. Non-billable tasks—such as administration, drafting proposals, and marketing—will easily consume half of your working time.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1E3A5F] text-white p-8 md:p-14 rounded-3xl shadow-2xl mb-16 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-3xl font-extrabold mb-8 text-white/95 relative z-10 tracking-tight">The MAR Equation</h3>
            <div className="font-mono text-xl md:text-2xl bg-black/40 p-6 md:p-8 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner inline-block">
              <span className="block text-blue-400 mb-2">[ Target Net Income + Expenses + Taxes ]</span>
              <span className="block text-white/50 text-base my-2">divided by</span>
              <span className="block text-amber-400">Annual Billable Hours</span>
            </div>
          </div>
          
          <h2 id="billable-vs-non-billable" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Billable vs. Non-Billable Hours Breakdown
          </h2>

          <p className="text-lg text-neutral-600 mb-5 leading-relaxed font-light">
            The most devastating mathematical mistake new freelancers make is calculating their rate based on a standard forty-hour corporate work week (2,080 hours a year). This calculation mistakenly assumes a one hundred percent billable utilization rate. 
          </p>
          
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            In reality, independent consultants and freelancers spend a massive portion of their week on non-billable tasks that are vital for survival but generate zero immediate revenue.
          </p>

          {/* Visual Chart for Time Breakdown */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 mb-12 shadow-sm">
            <h4 className="font-bold text-lg text-[#1F2937] mb-6">Average 40-Hour Freelance Week</h4>
            
            <div className="w-full h-8 flex rounded-xl overflow-hidden mb-4">
              <div className="bg-[#1E3A5F] h-full w-[60%] flex items-center justify-center text-xs font-bold text-white tracking-widest">
                60% BILLABLE
              </div>
              <div className="bg-[#D97706] h-full w-[40%] flex items-center justify-center text-xs font-bold text-white tracking-widest">
                40% NON-BILLABLE
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mt-6 border-t border-neutral-100 pt-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#1E3A5F]"></div>
                  <strong className="text-sm">Billable Time (24 hrs)</strong>
                </div>
                <p className="text-sm text-neutral-500 font-light">Client execution, writing code, designing deliverables, active consulting, and paid meetings.</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#D97706]"></div>
                  <strong className="text-sm">Admin Time (16 hrs)</strong>
                </div>
                <p className="text-sm text-neutral-500 font-light">Invoicing, bookkeeping, sales calls, marketing, drafting proposals, and email management.</p>
              </div>
            </div>
          </div>

          <h2 id="example-calculations" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            In-Depth Case Studies: Calculating True Rates
          </h2>
          
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            To illustrate how drastically different freelance rates can be depending on industry overhead and utilization, let us examine two detailed case studies representing opposite ends of the freelance spectrum.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="border border-neutral-200 rounded-3xl p-6 lg:p-8 bg-white shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-[#1F2937] border-b border-neutral-100 pb-4 flex items-center gap-3">
                <MonitorSmartphone className="h-5 w-5 text-blue-600" />
                Senior Web Developer
              </h3>
              <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                Requires high-end hardware, expensive cloud infrastructure, and aims for a substantial net income. Due to heavy project management, their utilization is lower.
              </p>
              <ul className="space-y-3 text-neutral-600 font-light mb-8 text-sm">
                <li className="flex justify-between items-center bg-neutral-50 p-2.5 rounded-lg"><span>Target Income:</span> <strong className="text-base">$110,000</strong></li>
                <li className="flex justify-between items-center bg-neutral-50 p-2.5 rounded-lg"><span>Business Expenses:</span> <strong className="text-base">$14,500</strong></li>
                <li className="flex justify-between items-center bg-neutral-50 p-2.5 rounded-lg"><span>Est. Taxes (30%):</span> <strong className="text-base">$53,300</strong></li>
                <li className="flex justify-between items-center bg-neutral-50 p-2.5 rounded-lg"><span>Billable Hours:</span> <strong className="text-base">1,056 hrs</strong></li>
              </ul>
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 text-center">
                <span className="block text-xs uppercase tracking-widest text-blue-800 font-bold mb-1">Required Minimum Rate</span>
                <span className="text-4xl font-black text-blue-700">$168 / hr</span>
              </div>
            </div>
            
            <div className="border border-neutral-200 rounded-3xl p-6 lg:p-8 bg-white shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-[#1F2937] border-b border-neutral-100 pb-4 flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-indigo-600" />
                Freelance Copywriter
              </h3>
              <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
                Operates with extremely low overhead, needing only a laptop. They maintain steady retainer clients, allowing for much higher billable utilization.
              </p>
              <ul className="space-y-3 text-neutral-600 font-light mb-8 text-sm">
                <li className="flex justify-between items-center bg-neutral-50 p-2.5 rounded-lg"><span>Target Income:</span> <strong className="text-base">$75,000</strong></li>
                <li className="flex justify-between items-center bg-neutral-50 p-2.5 rounded-lg"><span>Business Expenses:</span> <strong className="text-base">$3,200</strong></li>
                <li className="flex justify-between items-center bg-neutral-50 p-2.5 rounded-lg"><span>Est. Taxes (25%):</span> <strong className="text-base">$26,000</strong></li>
                <li className="flex justify-between items-center bg-neutral-50 p-2.5 rounded-lg"><span>Billable Hours:</span> <strong className="text-base">1,344 hrs</strong></li>
              </ul>
              <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 text-center">
                <span className="block text-xs uppercase tracking-widest text-indigo-800 font-bold mb-1">Required Minimum Rate</span>
                <span className="text-4xl font-black text-indigo-700">$78 / hr</span>
              </div>
            </div>
          </div>

          <h2 id="graduating-pricing" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Graduating to Retainers and Value-Based Pricing
          </h2>

          <p className="text-lg text-neutral-600 mb-5 leading-relaxed font-light">
            Calculating your hourly rate using our wage calculator is absolutely essential for establishing your financial floor. It guarantees you will not lose money on a project. 
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            However, remaining permanently tethered to a strict hourly billing model severely limits your long-term earning potential. As you evolve in your freelance career, your pricing should eventually reflect your specialized expertise, execution speed, and the unique, measurable financial value you provide to your clients.
          </p>

          <div className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-10 mb-12 shadow-sm">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-5">The Efficiency Penalty</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-5 text-lg">
              Hourly billing inherently and aggressively punishes efficiency. As you gain years of expertise in your field, a complex task that used to take you ten agonizing hours might only take you four hours of focused flow. 
            </p>
            <p className="text-neutral-600 font-light leading-relaxed mb-5 text-lg">
              If you continue to charge strictly by the hour, you are effectively giving the client a massive, unearned financial discount simply because you delivered faster, higher-quality results. 
            </p>
            <p className="text-neutral-600 font-light leading-relaxed text-lg mb-8">
              By transitioning to <strong>Flat Project Fees</strong> or implementing <strong>Value-Based Pricing</strong>, you successfully detach your income ceiling from your physical time limitations.
            </p>
            
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
              <h4 className="font-bold text-primary mb-2 text-lg">Converting to Retainers</h4>
              <p className="text-neutral-700 font-light leading-relaxed">
                To calculate a monthly retainer, simply multiply your newly calculated Minimum Acceptable Rate by a guaranteed, locked-in block of hours per month. Securing retainers stabilizes your cash flow and eliminates the profound anxiety of irregular freelance income.
              </p>
            </div>
          </div>
          
        </>
      )}
      </ToolLayout>
    </>
  )
}
