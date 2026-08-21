/* eslint-disable @typescript-eslint/no-unused-vars */
import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next'
import { generateCalculatorMetadata } from '@/config/metadata'
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { ShieldAlert, HeartPulse, Activity, AlertTriangle, TrendingUp, Shield, Briefcase, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Emergency Fund Calculator: 3 to 6 Month Savings Goal",
  description: "Calculate your ideal emergency fund based on your exact risk profile. Compare 3 month vs 6 month savings targets, assess your financial risk, and visualize your path to security.",
  keywords: ["emergency fund calculator", "emergency savings calculator", "6 month emergency fund calculator", "3 month emergency fund calculator", "rainy day fund calculator", "emergency fund ratio formula", "calculate my emergency fund", "emergency fund amount calculator", "dave ramsey emergency fund calculator"],
  slug: "personal-wealth/emergency-fund-calculator",
  category: "Personal Wealth",
})

const faqs: FAQ[] = [
  {
    question: "How much should be in my emergency fund?",
    answer: "Most financial experts recommend saving 3 to 6 months of essential living expenses. However, if you are a freelancer, have a highly variable income, or have dependents, a 6 to 9 month emergency fund provides much better security. Use our emergency fund calculator to get a personalized recommendation based on your unique risk profile."
  },
  {
    question: "What counts as an essential expense for calculating my emergency fund?",
    answer: "Essential expenses include housing (rent or mortgage), groceries, utilities, necessary transportation, health insurance premiums, and minimum debt payments. Discretionary spending like dining out, entertainment, or vacations should not be included in your emergency fund calculation."
  },
  {
    question: "Where should I keep my emergency fund?",
    answer: "Your emergency fund should be highly liquid and easily accessible. A High-Yield Savings Account (HYSA) or a no-penalty Certificate of Deposit (CD) are typically the best options, allowing your money to grow while remaining safe and FDIC-insured. Never invest your emergency fund in the stock market."
  },
  {
    question: "How long does it take to build a 6 month emergency fund?",
    answer: "It depends on your monthly savings rate. If your monthly expenses are $4,000, your 6-month target is $24,000. Saving $500 per month, it would take approximately 4 years. Saving $1,000 per month, it takes about 2 years. Our calculator shows you the exact timeline and alternative savings rates to reach your goal faster."
  },
  {
    question: "Should I pay off debt or build an emergency fund first?",
    answer: "Dave Ramsey recommends saving a starter emergency fund of $1,000 first, then aggressively paying off all non-mortgage debt, then building a full 3 to 6 month emergency fund. The logic is that without any emergency savings, unexpected expenses force you back into debt. A small starter fund breaks this cycle."
  }
]

export default function EmergencyFundCalculatorPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Emergency Fund Calculator",
    "operatingSystem": "Any",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate your ideal emergency fund based on your exact risk profile. Compare 3 month vs 6 month savings targets and visualize your path to financial security."
  }

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
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Your Emergency Fund Target",
    "description": "A step-by-step guide to determining exactly how much cash you need to save for emergencies.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Calculate Essential Expenses",
        "text": "Add up your non-negotiable monthly expenses including rent, groceries, utilities, and debt minimums."
      },
      {
        "@type": "HowToStep",
        "name": "Assess Your Risk Profile",
        "text": "Determine your job security, income stability, and whether you have dependents. Higher risk profiles need deeper buffers."
      },
      {
        "@type": "HowToStep",
        "name": "Set Your Month Multiplier",
        "text": "Multiply your essential expenses by 3, 6, 9, or 12 months depending on your risk tolerance and comfort level."
      }
    ]
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://dailyfinance.tools/personal-wealth/emergency-fund-calculator",
        "url": "https://dailyfinance.tools/personal-wealth/emergency-fund-calculator",
        "name": "Emergency Fund Calculator: 3 to 6 Month Savings Goal",
        "description": "Calculate your ideal emergency fund based on your exact risk profile."
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
            "name": "Personal Wealth",
            "item": "https://dailyfinance.tools/personal-wealth"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Emergency Fund Calculator",
            "item": "https://dailyfinance.tools/personal-wealth/emergency-fund-calculator"
          }
        ]
      }
    ]
  }

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
        title="Emergency Fund Calculator"
        description="Find out exactly how much you need to save to protect yourself against job loss, medical emergencies, or a sudden drop in income."
        slug="emergency-fund-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1E3A5F]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How Big Should Your Emergency Fund Be?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              A standard emergency fund should cover <strong>3 to 6 months of essential living expenses</strong>. If your core expenses (rent, utilities, groceries, debt) total $4,000 per month, your baseline target is $12,000 to $24,000. However, if you are a freelancer, work in an unstable industry, or have high health costs, financial advisors recommend expanding your rainy day fund to 9 or even 12 months for adequate protection.
            </p>
          </section>

          <h2 id="why-you-need-an-emergency-fund" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Why Every Household Needs an Emergency Fund
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            An emergency fund is the bedrock of personal finance. Before you invest in stocks, crypto, or real estate, you must establish a cash buffer. Without a dedicated rainy day fund, a sudden job loss, medical emergency, or major car repair will force you into high-interest credit card debt, erasing years of financial progress. According to Bankrate, 57% of Americans cannot cover an unexpected $1,000 expense from their savings account.
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Using our emergency fund calculator, you can move away from generic rules of thumb and build a custom savings target based on your actual risk profile, employment type, and monthly burn rate. The calculator uses a proprietary risk-scoring algorithm to recommend a personalized buffer that accounts for your job security, income stability, dependents, and insurance coverage.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Job Loss Protection</h3>
              <p className="text-sm text-neutral-500 font-light">The primary purpose of an emergency fund is to replace your income while you search for a new job without facing eviction or accumulating credit card debt.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <HeartPulse className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Medical Deductibles</h3>
              <p className="text-sm text-neutral-500 font-light">Even with excellent health insurance, out-of-pocket maximums can exceed $9,000. Your fund prevents medical debt from destroying your credit score.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Activity className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Home & Auto Repairs</h3>
              <p className="text-sm text-neutral-500 font-light">A blown transmission or a leaking roof are not matters of &quot;if,&quot; but &quot;when.&quot; Liquid cash turns a potential disaster into a mere inconvenience.</p>
            </div>
          </section>

          <h2 id="calculating-your-target" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            3 Months vs 6 Months: Sizing Your Emergency Savings
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            You may have heard financial experts like NerdWallet, Suze Orman, or Dave Ramsey recommend different sizes for your savings. Should you use a 3 month emergency fund calculator or a 6 month emergency fund calculator? The answer depends entirely on your personal risk assessment. There is no universal number that works for every household.
          </p>

          <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-8 mb-12 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#059669]" />
              The 3-Month Emergency Fund (Low Risk)
            </h3>
            <p className="text-neutral-600 mb-4 leading-relaxed font-light">
              A 3-month buffer is suitable for individuals with a highly stable risk profile. You can lean toward a smaller fund if you meet these criteria:
            </p>
            <ul className="space-y-3 mb-0">
              {['You have a highly secure, full-time W-2 job (e.g., tenured teacher, government employee).', 'You are single with no dependents.', 'You have comprehensive health, disability, and income protection insurance.', 'You rent your home (no sudden roof replacement or HVAC failure costs).'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-neutral-700 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAFAFA] border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#D97706]" />
              The 6 to 12 Month Emergency Fund (Medium to High Risk)
            </h3>
            <p className="text-neutral-600 mb-4 leading-relaxed font-light">
              A 6-month buffer or longer is necessary for those with variable income or high financial liabilities. You should scale your target upward if:
            </p>
            <ul className="space-y-3 mb-0">
              {['You are a freelancer, independent contractor, or entrepreneur with irregular income.', 'Your income relies heavily on commissions, bonuses, or seasonal demand.', 'You have children, aging parents, or other dependents who rely on you financially.', 'You own an older home or drive high-mileage vehicles that are out of warranty.'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-neutral-700 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 id="emergency-fund-ratio-formula" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Emergency Fund Ratio Formula
          </h2>

          <p className="text-lg text-neutral-600 mb-6 leading-relaxed font-light">
            The emergency fund ratio is a simple but powerful metric used by financial planners to assess your current level of financial preparedness. The formula is straightforward:
          </p>

          <div className="bg-[#F0F9FF] border border-blue-200 rounded-2xl p-8 mb-8 shadow-sm text-center">
            <p className="text-lg font-bold text-blue-900 mb-2">Emergency Fund Ratio</p>
            <p className="text-2xl font-black text-blue-700">Current Savings ÷ Monthly Essential Expenses = Months of Coverage</p>
          </div>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            For example, if you have $10,000 in your high-yield savings account and your essential monthly expenses total $4,000, your emergency fund ratio is 2.5 months. Our emergency fund calculator automatically computes this ratio and compares it to your recommended target based on your risk score, showing you exactly how much further you need to go.
          </p>

          <h2 id="where-to-store" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Where to Keep Your Emergency Fund
          </h2>

          <p className="text-lg text-neutral-600 mb-6 leading-relaxed font-light">
            Once our emergency savings calculator determines your goal, the next challenge is storing that cash efficiently. You must balance two conflicting priorities: <em>Liquidity</em> (getting the cash fast) and <em>Yield</em> (beating inflation). The three best options are:
          </p>

          <div className="space-y-4 mb-12">
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-neutral-100">
              <h4 className="font-bold text-[#1F2937] mb-1">High-Yield Savings Account (HYSA)</h4>
              <p className="text-sm text-neutral-500 font-light">The most popular and recommended option. Offers 4-5% APY, is FDIC-insured up to $250,000, and allows instant transfers to your checking account. No lock-up period.</p>
            </div>
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-neutral-100">
              <h4 className="font-bold text-[#1F2937] mb-1">Money Market Account</h4>
              <p className="text-sm text-neutral-500 font-light">Similar to a HYSA but often includes check-writing privileges and debit card access. Slightly lower yields in most cases, but maximum liquidity.</p>
            </div>
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-neutral-100">
              <h4 className="font-bold text-[#1F2937] mb-1">CD Ladder (for Advanced Savers)</h4>
              <p className="text-sm text-neutral-500 font-light">Split your fund across multiple CDs with staggered maturity dates (3, 6, 9, 12 months). This locks in higher rates while maintaining quarterly access to a portion of your savings.</p>
            </div>
          </div>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Never invest your emergency fund in the stock market, cryptocurrency, or illiquid assets like real estate. If a recession hits, you might lose your job at the exact same time your portfolio drops 30%. Your emergency fund must be safe, stable, and instantly accessible regardless of market conditions.
          </p>

          <h2 id="how-risk-score-works" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How Our Risk Score Algorithm Works
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Unlike simple emergency fund calculators that ask you to manually pick a month target, our calculator uses a weighted risk-scoring algorithm to recommend your ideal buffer. The score factors in six variables: your employment type (full-time, part-time, contract, or freelance), job security level, income stability pattern, whether you have dependents, ongoing health costs, and whether you carry income protection insurance.
          </p>

          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            The baseline recommendation starts at 3 months. For every 2 risk points accumulated, the calculator adds one additional month to your recommended buffer, up to a maximum of 12 months. This ensures that a dual-income household with government jobs and full insurance gets a lean 3-month target, while a single freelancer with dependents and no disability coverage gets a much deeper 6 to 9 month recommendation.
          </p>
        </>
      )}
      </ToolLayout>
    </>
  )
}