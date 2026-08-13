import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator, DollarSign, Clock, TrendingUp, Target, Briefcase, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Freelance Hourly Rate Calculator: Find Your Minimum Acceptable Rate (MAR)",
  description: "Calculate your true freelance hourly rate by factoring in business expenses, self-employment taxes, and unbillable time. A complete guide to setting profitable rates.",
  keywords: ["freelance hourly rate calculator", "calculate freelance rate", "minimum acceptable rate", "freelance pricing strategy", "how much should I charge freelance", "billable hours vs non-billable", "freelance taxes"],
  alternates: {
    canonical: "https://dailyfinance.tools/tools/hourly-rate-reverse-engineer-calculator",
  },
  openGraph: {
    title: "Freelance Hourly Rate Calculator | Calculate Your True Value",
    description: "Reverse engineer your freelance hourly rate based on desired net income, taxes, business overhead, and billable utilization. Never undercharge again.",
    url: "https://dailyfinance.tools/tools/hourly-rate-reverse-engineer-calculator",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Hourly Rate Calculator",
    description: "Calculate your exact Minimum Acceptable Rate (MAR) based on your target lifestyle, overhead, and taxes.",
  },
}

const faqs: FAQ[] = [
  {
    question: "How do you calculate a freelance hourly rate?",
    answer: "To calculate your freelance hourly rate, use the Minimum Acceptable Rate (MAR) formula: add your target annual salary, annual business expenses, and estimated taxes together. Divide that total sum by your true annual billable hours (usually 1,000 to 1,200 hours, not 2,000). This yields the lowest hourly rate you can afford to charge."
  },
  {
    question: "What is the standard formula to calculate freelance hourly rates?",
    answer: "The standard calculation formula is: [(Annual Target Salary + Annual Business Expenses) / Annual Billable Hours] + Tax Buffer = Minimum Hourly Rate. Never simply divide your target salary by 40 hours a week, as this ignores overhead and unpaid admin time."
  },
  {
    question: "What is the difference between billable and non-billable hours?",
    answer: "Billable hours are the exact hours you spend actively executing client work that you can invoice for. Non-billable hours are spent on running your business—invoicing, client acquisition, marketing, accounting, and admin tasks. Most successful freelancers only bill 50-60% of their actual working hours."
  },
  {
    question: "Why shouldn't I just charge what my competitors charge?",
    answer: "Market research gives you a ceiling, but your Minimum Acceptable Rate (MAR) gives you your floor. Your peers have completely different cost structures, tax liabilities, and lifestyle requirements. Pricing strictly based on competitors often leads to unprofitable businesses and eventual burnout."
  },
  {
    question: "When should I transition from hourly rates to value-based pricing?",
    answer: "You should transition to value-based pricing or flat project fees once you become highly efficient at your job. Hourly billing punishes efficiency (the faster you work, the less you earn). Flat fees detach your income from your time, allowing you to scale your revenue without working more hours."
  }
]

export default function HourlyRateCalculatorPage() {
  return (
    <ToolLayout
      title="Freelance Hourly Rate Calculator"
      description="Reverse engineer your exact Minimum Acceptable Rate (MAR) based on your target lifestyle, overhead, taxes, and true billable capacity."
      slug="hourly-rate-reverse-engineer-calculator"
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
              Quick Answer: How to Calculate Your Freelance Hourly Rate
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To calculate your freelance hourly rate, you must determine your <strong>Minimum Acceptable Rate (MAR)</strong>. Add your target annual take-home pay, your yearly business expenses, and a 25-30% self-employment tax buffer. Divide this total by your estimated <em>billable</em> hours per year (typically 1,000–1,200). Never simply divide a target salary by 2,000 hours.
            </p>
          </section>

          <h2 id="sustainable-formula" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Danger of Guessing Your Freelance Hourly Rate
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Setting an arbitrary hourly rate based on a quick Google search or asking peers in a Facebook group is the fastest way to bankrupt a freelance business. When you transition from a W-2 employee to a 1099 independent contractor, you are no longer just an employee doing a job—you are a functioning business entity. You assume total financial responsibility for healthcare, software subscriptions, retirement matching, marketing, and self-employment taxes. 
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            To build a sustainable freelance career, you must discard the employee mindset and adopt the business owner mindset. This means using a rigorous, math-driven approach to discover your baseline profitability floor before negotiating with any client. Charging $50/hour might sound lucrative when compared to a $25/hour day job, but once the hidden costs of self-employment are factored in, that $50/hour might actually place you below the poverty line.
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            This comprehensive, 1,500+ word guide will walk you through the exact mathematics required to calculate a profitable rate. We will cover the psychological pitfalls of undercharging, the vital distinction between billable and non-billable time, a deep dive into operating expenses, and eventually, how to escape the hourly rate trap altogether through value-based pricing.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Hidden Expenses</h3>
              <p className="text-sm text-neutral-500 font-light">From invoicing software to legal consultation, business expenses rapidly erode your take-home pay if not baked into your baseline rate.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Self-Employment Tax</h3>
              <p className="text-sm text-neutral-500 font-light">Freelancers pay the full 15.3% FICA tax on top of standard state and federal brackets. Your clients must subsidize this hidden burden.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Unpaid Admin Time</h3>
              <p className="text-sm text-neutral-500 font-light">Marketing, pitching, and accounting take time. You will likely only bill for roughly 60% of the actual hours you work every week.</p>
            </div>
          </section>

          <h2 id="standard-calculation-formula" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Standard Calculation Formula for Freelancers
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            To find your true baseline, you need to use the <strong>Minimum Acceptable Rate (MAR) formula</strong>. This is the absolute lowest number you can charge a client without actively damaging your financial health. If a client attempts to negotiate below your MAR, you must walk away, as accepting the project means you are effectively paying to work for them.
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Minimum Acceptable Rate (MAR) Equation</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">
              MAR = [ ( Target Net Income + Business Expenses + Taxes ) / Annual Billable Hours ]
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Determine Your Target Net Income</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Start with the annual income you need to live comfortably. This is your personal take-home pay. It should cover your rent or mortgage, groceries, personal savings goals, healthcare premiums out of pocket, and personal debt. Do not include business expenses here. 
          </p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            For example, if you determine that you need <code className="font-mono bg-neutral-100 px-2 py-1 rounded text-sm text-[#064E3B]">$60,000</code> a year to thrive personally, that is your baseline target net income. This is the amount of money you want to transfer from your business checking account into your personal checking account by the end of the year.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Add Annual Business Expenses (OpEx)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Freelancing requires infrastructure. Unlike an employee whose laptop and software are provided by the company, you must purchase and maintain your own tools. These operating expenses (OpEx) must be paid for by your clients, not out of your personal pocket.
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Common freelance expenses include:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100">
              <Target className="h-5 w-5 text-[#D97706] shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Software Subscriptions</strong> (Adobe CC, Webflow, Figma, GitHub Copilot, Notion)</span>
            </li>
            <li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100">
              <Briefcase className="h-5 w-5 text-[#D97706] shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Hardware & Depreciation</strong> (MacBook upgrades, monitors, ergonomic chairs)</span>
            </li>
            <li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100">
              <Zap className="h-5 w-5 text-[#D97706] shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Marketing & Lead Gen</strong> (Web hosting, domain renewals, LinkedIn Premium, Ads)</span>
            </li>
            <li className="flex items-start gap-3 bg-[#FAFAFA] p-4 rounded-xl border border-neutral-100">
              <TrendingUp className="h-5 w-5 text-[#D97706] shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>Professional Services</strong> (CPA fees, legal contract drafting, business insurance)</span>
            </li>
          </ul>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If your business overhead tallies up to <code className="font-mono bg-neutral-100 px-2 py-1 rounded text-sm text-[#064E3B]">$12,000</code> a year, your new required gross revenue jumps from $60,000 to $72,000. Every single hour you work must contribute a tiny fraction to paying off that $12,000 overhead.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Account for Self-Employment Taxes</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            As a freelancer, you are responsible for self-employment taxes (which cover Social Security and Medicare), in addition to your standard federal and state income taxes. In the United States, a W-2 employee only pays 7.65% for FICA, while their employer pays the other 7.65%. When you are self-employed, you are both the employer and the employee, meaning you are liable for the full 15.3%.
          </p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Depending on your jurisdiction, tax brackets, and write-offs, a safe buffer is to add a 25% to 30% premium on top of your required revenue. Your hourly rate must cover this heavy tax burden so that your target net income remains untouched. If you do not bake taxes into your hourly rate, you will face a devastating tax bill in April that you cannot afford to pay.
          </p>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="billable-vs-non-billable" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Billable vs. Non-Billable Hours: The Fatal Flaw
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The most devastating mathematical mistake new freelancers make is calculating their rate based on a standard 40-hour work week (2,080 hours a year). This mistakenly assumes a 100% billable utilization rate. In reality, independent consultants spend a massive portion of their week on non-billable tasks.
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <CheckCircle2 className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Billable Hours</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Time spent directly executing client deliverables that you can put on an invoice. If you are a developer, this is time spent coding. If you are a designer, this is time spent in Figma. This is the only time that generates revenue.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Non-Billable Hours</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Time spent running the business itself. This includes lead generation, drafting proposals, discovery calls, bookkeeping, inbox management, networking, and continuing education. You cannot charge a client for the time you spent pitching them.</span>
              </div>
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">The Reality of Utilization Rates</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            A highly optimized freelancer operates at a <strong>60% billable utilization rate</strong>. Out of a 40-hour work week, you will likely only bill 24 hours. The other 16 hours are swallowed by email, admin, and sales. 
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Furthermore, you must subtract sick days, federal holidays, and vacation time. If you plan to take 4 weeks off per year (vacation and sick time), you are only working 48 weeks. At 24 billable hours per week, a healthy, sustainable freelance year typically contains exactly <strong>1,152 actual billable hours</strong>.
          </p>
          
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-16 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">
              If your total required gross revenue (Income + Expenses + Taxes) is $100,000, and you only have 1,152 billable hours available, your absolute minimum hourly rate must be <code className="font-mono bg-neutral-200 px-2 py-1 rounded text-[#064E3B] font-bold">$86.80/hr</code>. If you had mistakenly divided by 2,080 hours, you would be charging $48/hr and inevitably face burnout.
            </p>
          </div>

          <h2 id="value-based-pricing" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Graduating to Value-Based Pricing and Retainers
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Calculating your hourly rate is essential for establishing your floor. It guarantees you will not lose money. However, remaining permanently tethered to an hourly rate limits your earning potential. Remember that your hourly rate should eventually reflect your expertise, speed, and the unique financial value you provide to clients.
          </p>

          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-12 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">The Efficiency Penalty</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-6">
              Hourly billing inherently punishes efficiency. As you gain expertise, a task that used to take you 10 hours might only take you 4 hours. If you charge by the hour, you just gave the client a massive discount for delivering faster, higher-quality results. 
            </p>
            <p className="text-neutral-600 font-light leading-relaxed">
              By transitioning to <strong>Flat Project Fees</strong> or <strong>Value-Based Pricing</strong>, you detach your income from your time. If a new website will generate $50,000 in additional revenue for a client, charging them a flat $10,000 fee is a massive win for both parties—regardless of whether it took you 20 hours or 100 hours to build it.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Converting to Retainers</h3>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light">
            To calculate a monthly retainer, multiply your new hourly rate by a guaranteed block of hours per month. For example, a $120/hr rate for 20 hours a month yields a $2,400 monthly retainer. Retainers stabilize your cash flow and reduce the profound anxiety of irregular freelance income. Offering a slight discount (5-10%) on your hourly rate in exchange for a 6-month upfront retainer commitment is a highly effective agency growth strategy.
          </p>

          <h2 id="freelance-benchmarks" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Market Research: Hourly Rate Benchmarks
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            While your MAR dictates your baseline floor, market research ensures you are remaining competitive and not severely undercharging the industry standard. Sites like Glassdoor, PayScale, and Upwork provide extensive data on peer rates. If your calculated MAR is significantly higher than the senior market rate in your niche, you must either lower your expenses, target a higher tier of enterprise clients, or immediately pivot to value-based pricing where hourly comparisons vanish.
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse m-0">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAFAFA]">
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">Industry / Niche</th>
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">Entry-Level</th>
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">Senior / Expert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono text-sm">
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">Software Engineering</td>
                  <td className="py-4 px-6 text-neutral-500">$50 - $85/hr</td>
                  <td className="py-4 px-6 font-semibold text-[#064E3B]">$120 - $250+/hr</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors bg-[#FAFAFA]">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">UI/UX & Brand Design</td>
                  <td className="py-4 px-6 text-neutral-500">$45 - $75/hr</td>
                  <td className="py-4 px-6 font-semibold text-[#064E3B]">$100 - $175+/hr</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">Digital Marketing & SEO</td>
                  <td className="py-4 px-6 text-neutral-500">$40 - $65/hr</td>
                  <td className="py-4 px-6 font-semibold text-[#064E3B]">$90 - $150+/hr</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors bg-[#FAFAFA]">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">Copywriting & Strategy</td>
                  <td className="py-4 px-6 text-neutral-500">$35 - $60/hr</td>
                  <td className="py-4 px-6 font-semibold text-[#064E3B]">$85 - $130+/hr</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">Executive Consulting</td>
                  <td className="py-4 px-6 text-neutral-500">$75 - $100/hr</td>
                  <td className="py-4 px-6 font-semibold text-[#064E3B]">$150 - $350+/hr</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </>
      )}
    </ToolLayout>
  )
}
