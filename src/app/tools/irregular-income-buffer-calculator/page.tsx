import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import {  Calculator, ShieldCheck, TrendingDown, Target, Clock, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Irregular Income Buffer Calculator for Freelancers",
  description: "Calculate your custom, volatility-adjusted emergency fund and cash buffer for irregular freelance income. Plan for lean months, client loss risk, and payment lags.",
  keywords: ["irregular income emergency fund calculator", "freelance income buffer calculator", "cash buffer variable income", "how much emergency fund freelancer", "feast or famine freelancer", "days sales outstanding freelancer"],
  alternates: {
    canonical: "https://dailyfinance.tools/tools/irregular-income-buffer-calculator",
  },
  openGraph: {
    title: "Irregular Income Buffer Calculator | Protect Your Cash Flow",
    description: "Calculate the exact liquid cash reserve you need to survive freelance lean months, client loss, and late invoices.",
    url: "https://dailyfinance.tools/tools/irregular-income-buffer-calculator",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irregular Income Buffer Calculator",
    description: "Calculate your custom, volatility-adjusted emergency fund and cash buffer for irregular freelance income.",
  },
}

const faqs: FAQ[] = [
  {
    question: "How many months of emergency fund does a freelancer need?",
    answer: "While traditional employees need 3 to 6 months of expenses, financial experts recommend 6 to 12 months for freelancers. The exact amount depends on your income volatility, single-client concentration risk, and invoice payment lags."
  },
  {
    question: "What is income volatility index (Coefficient of Variation)?",
    answer: "Income volatility measures how wildly your monthly earnings swing. Calculated as standard deviation divided by mean monthly income, a score above 40% indicates high volatility requiring a much larger cash buffer."
  },
  {
    question: "What is Single-Client Concentration Risk?",
    answer: "This occurs when one client accounts for a massive percentage of your total income. A common rule is that no single client should account for more than 20–25% of your revenue. If a 'whale' client drops you, your cash flow collapses."
  },
  {
    question: "What is Days Sales Outstanding (DSO) for freelancers?",
    answer: "DSO is the average number of days it takes for a client to pay an invoice after you send it. A high DSO (e.g., 45 to 60 days) severely ties up your liquidity, forcing you to rely heavily on your cash buffer to pay your own bills."
  },
  {
    question: "How do I break the feast-or-famine cycle?",
    answer: "The feast-or-famine cycle is broken by maintaining marketing and business development efforts during your busiest 'feast' months, and by transitioning one-off project clients into recurring monthly retainers."
  }
]

export default function IrregularIncomeBufferPage() {
  return (
    <ToolLayout
      title="Irregular Income Buffer Calculator"
      description="Protect your freelance business from feast-or-famine cycles by calculating the exact liquid cash reserve you need to survive lean months, client loss, and late invoices."
      slug="irregular-income-buffer-calculator"
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
              Quick Answer: How Much Should a Freelancer Save?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Unlike W-2 employees, freelancers should maintain a cash buffer of at least <strong>6 to 12 months</strong> of essential living and business expenses. Your exact target depends entirely on three factors: your historical income volatility (feast-or-famine swings), your single-client concentration risk (if one client makes up &gt;25% of your revenue), and your average invoice payment delays (DSO).
            </p>
          </section>

          <h2 id="the-feast-or-famine-trap" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Freelance Feast-or-Famine Trap
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Managing the financial volatility of freelancing requires transitioning from a "survival" mindset to a structural, business-owner mindset. The most common stressor for independent contractors is the infamous "feast-or-famine" cycle: one month you might bring in $15,000, and the next month you might struggle to invoice $2,000. 
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This cycle is often self-inflicted. When freelancers enter a "feast" period—where they are fully booked with high-paying client work—they almost universally stop marketing, pitching, and networking. Because their pipeline goes cold, once the current projects are completed, they immediately enter a "famine" period with zero incoming revenue.
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If you do not have a mathematically optimized cash buffer, a single famine month can force you to take on toxic, low-paying clients out of sheer desperation. This guide will walk you through exactly how to calculate your volatility index, measure your client risk, and construct an impenetrable financial fortress.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingDown className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Income Volatility</h3>
              <p className="text-sm text-neutral-500 font-light">The standard deviation of your monthly income. High volatility requires a significantly larger baseline cash reserve.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Concentration Risk</h3>
              <p className="text-sm text-neutral-500 font-light">If a single 'whale' client accounts for more than 25% of your revenue, you are one email away from financial crisis.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Invoice Lags (DSO)</h3>
              <p className="text-sm text-neutral-500 font-light">Even if you earn $10,000 this month, Net-30 or Net-60 payment terms mean you won't see that cash for weeks.</p>
            </div>
          </section>

          <h2 id="two-tier-system" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Why the "3 to 6 Month" Rule Fails Freelancers
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Traditional financial advice dictates that an emergency fund should cover 3 to 6 months of essential living expenses. This advice is exclusively tailored for W-2 salary employees who receive guaranteed bi-weekly paychecks. If a W-2 employee loses their job, they can immediately file for unemployment benefits while they search for a new role.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Freelancers, independent contractors, and sole proprietors do not have access to standard unemployment insurance. Furthermore, freelance income is heavily tied to macro-economic budgets. When the economy slows down, marketing and contractor budgets are the very first things corporations cut. 
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The 2-Tier Cash Buffer Framework</h3>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-6 relative z-10">
              Instead of a generic emergency fund, elite freelancers utilize a structured two-tier liquidity system to protect both their business operations and their personal lives.
            </p>
            <ul className="space-y-6 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">1</span>
                <div>
                  <strong className="block text-xl mb-1">Tier 1: Operational Liquidity (1.5 to 2.0 Months)</strong>
                  This cash sits directly in your primary Business Checking account. Its sole purpose is to smooth out Days Sales Outstanding (DSO) lags. It allows you to pay your software subscriptions, quarterly taxes, and personal salary on time, even if a client is 3 weeks late on a massive invoice.
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">2</span>
                <div>
                  <strong className="block text-xl mb-1">Tier 2: The Fortress Fund (4 to 10 Months)</strong>
                  This cash sits in a separate High-Yield Savings Account (HYSA). It is untouchable unless you experience a catastrophic client churn event, a severe health issue, or a macroeconomic recession that freezes all new contracts.
                </div>
              </li>
            </ul>
          </div>

          <h2 id="single-client-risk" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding Single-Client Concentration Risk
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            One of the most dangerous, hidden threats to a freelance business is <strong>Single-Client Concentration Risk</strong>. This occurs when a disproportionate amount of your total revenue comes from a single "whale" client. 
          </p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            While landing a massive $10,000/month retainer feels incredible, it inadvertently transforms you back into an employee. If that single client decides to pivot their strategy, run out of funding, or bring the role in-house, you will lose a devastating chunk of your income overnight. 
          </p>

          <div className="bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 mb-16 rounded-r-xl">
            <h3 className="text-[#1F2937] font-bold text-xl mb-2">The 25% Rule</h3>
            <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
              A standard rule of thumb in consulting is that no single client should account for more than <strong>20% to 25%</strong> of your total gross revenue. If a client exceeds this threshold, you must actively intensify your business development to acquire new, smaller clients to dilute the whale's percentage. If you cannot dilute them, you must significantly increase your Tier 2 Cash Buffer to offset the massive risk you are carrying.
            </p>
          </div>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="improving-dso" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Days Sales Outstanding (DSO) and Invoice Friction
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Revenue does not equal cash in the bank. <strong>Days Sales Outstanding (DSO)</strong> is a financial metric that measures how long it takes, on average, for you to actually get paid after you send an invoice. 
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <Zap className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">The Danger of High DSO</strong>
                <span className="text-neutral-600 font-light leading-relaxed">If your payment terms are Net-30, but your clients routinely take 45 days to pay, your DSO is 45. This means that work you completed in January might not actually hit your bank account until mid-March. A high DSO forces you to float the business (and your personal life) with your Tier 1 cash buffer.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <ShieldCheck className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">How to Lower Your DSO</strong>
                <span className="text-neutral-600 font-light leading-relaxed">You can drastically lower your DSO by enforcing strict Net-15 or Due-on-Receipt terms. Furthermore, require a 50% upfront deposit before beginning any project work. Finally, utilize modern invoicing software that allows clients to pay instantly via ACH or Credit Card directly from the invoice email, removing all friction from the payment process.</span>
              </div>
            </li>
          </ul>

          <h2 id="calculating-volatility" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Calculate Your Income Volatility Index
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            The foundation of our calculator is the Coefficient of Variation (CV). This is a statistical measure that tells us exactly how wildly your income swings from month to month. To calculate it manually:
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
            <ol className="list-decimal pl-6 space-y-4 text-neutral-600 font-light text-lg">
              <li><strong>Find your Mean:</strong> Add up your total gross income for the last 12 months, and divide by 12. This is your average monthly income.</li>
              <li><strong>Find the Standard Deviation:</strong> Look at how far each individual month's income deviated from that mean average.</li>
              <li><strong>Calculate the CV:</strong> Divide the Standard Deviation by the Mean.</li>
            </ol>
            <div className="mt-8 bg-[#FAFAFA] p-6 rounded-xl border border-neutral-100">
              <p className="text-[#1F2937] font-medium m-0">
                If your CV is 10%, your income is highly stable (like a retainer-based agency), and you need a smaller buffer. If your CV is 60%, your income is wildly unpredictable (like a project-based film freelancer), and you require a massive, heavily fortified buffer to survive the swings.
              </p>
            </div>
          </div>
          
          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Building Your Fortress
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Use the calculator above to input your monthly personal expenses, business overhead, and client risk metrics. It will output the exact dollar amount you need to hold in cash across your Tier 1 and Tier 2 accounts. 
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Once you have hit your fully funded buffer target, any excess cash generated by the business should no longer sit in cash. It should be aggressively deployed into investments, retirement accounts, or business growth initiatives. A cash buffer gives you the psychological freedom to say "no" to bad clients, raise your rates confidently, and scale your freelance business with peace of mind.
          </p>

        </>
      )}
    </ToolLayout>
  )
}
