/* eslint-disable react/no-unescaped-entities */
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Calculator, Clock, Target, TrendingDown, AlertCircle, FileWarning, HelpCircle, CheckCircle, TrendingUp, DollarSign } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Time Tracking ROI Calculator: Cost of Unbilled Freelance Hours",
  description: "Calculate how much revenue you lose annually to undocumented scope creep and administrative overhead, and see the true ROI of time tracking software.",
  keywords: ["time tracking roi calculator", "freelance scope creep calculator", "cost of unbilled hours", "is time tracking software worth it", "effective hourly rate flat fee", "time tracking for freelancers"],
  slug: "freelance/time-tracking-roi-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "What is the true cost of scope creep?",
    answer: "Scope creep happens when a client asks for 'just one more quick change.' If you spend 4 unbilled hours a week on these requests at a $100/hr target rate, you are losing almost $20,000 a year in revenue."
  },
  {
    question: "Why should flat-fee freelancers track time?",
    answer: "Even if you charge flat fees, you must track your time to calculate your Effective Hourly Rate. Without time tracking, you have no idea if a $5,000 project took 20 hours ($250/hr) or 100 hours ($50/hr)."
  },
  {
    question: "How does time tracking software save administrative time?",
    answer: "Manual time tracking requires entering data into spreadsheets and manually calculating totals for invoices. Modern software automatically logs activity and generates invoices with one click, saving freelancers 2-4 hours a week."
  },
  {
    question: "What is a good ROI for time tracking software?",
    answer: "Most freelance time tracking software costs $10-$20 a month. By recovering just one lost billable hour per month (e.g., $100), the software generates a 500% to 1000% return on investment."
  },
  {
    question: "How do I stop scope creep?",
    answer: "You stop scope creep by tracking time objectively. When a client asks for a 'quick favor' outside the SOW, you can point to the tracked hours and say, 'I would love to do that. It will take 2 hours, which adds $200 to the budget.'"
  }
]

export default function TimeTrackingROIPage() {
  return (
    <ToolLayout
      title="Time Tracking ROI & Billable Hours Calculator"
      description="Stop working for free. See exactly how much undocumented scope creep and manual administrative work is costing your freelance business every year."
      slug="time-tracking-roi-calculator"
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
              Quick Answer: The ROI of Time Tracking Software
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              The Return on Investment (ROI) for freelance time tracking software is calculated by taking your Recovered Billable Hours (prevented scope creep) plus your Saved Administrative Time, and subtracting the software cost. The average freelancer loses 15% to 25% of their potential income to undocumented "quick favors" (scope creep) and manual invoicing tasks. By recovering just 4 unbilled hours a week at $100/hr, you recover $19,200 annually. When compared to the average $180/year cost of the software, time tracking yields an astronomical ROI, typically paying for itself within the first 14 days of use.
            </p>
          </section>

          <h2 id="the-hidden-cost-of-favors" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Hidden Cost of "Quick Favors"
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            "Can you just change this one color?"<br />
            "Can we hop on a quick 15-minute call to discuss this?"<br />
            "Can you just send me that file in a different format real quick?"
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            As a freelancer, your natural instinct is to be helpful. You want to provide excellent customer service, so you say yes to these micro-requests. Because they only take 10 or 15 minutes, you don't bother creating an invoice for them. They slip through the cracks. This phenomenon is known as <strong>Scope Creep</strong>, and it is the silent killer of freelance profitability.
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            While 15 minutes feels insignificant, it compounds rapidly. If you do four "quick favors" a day across multiple clients, you have just given away an hour of your time for free. If your target hourly rate is $100/hour, giving away 5 hours a week translates to <strong>$24,000 a year in lost revenue</strong> (assuming a 48-week work year). You are essentially giving your clients a massive, invisible discount, out of your own pocket.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertCircle className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Scope Creep</h3>
              <p className="text-sm text-neutral-500 font-light">Unbilled micro-tasks and revisions that expand the project beyond the original agreement.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingDown className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Revenue Leaks</h3>
              <p className="text-sm text-neutral-500 font-light">The direct financial loss caused by failing to document and bill for time actually worked.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Admin Overhead</h3>
              <p className="text-sm text-neutral-500 font-light">The unpaid time you spend manually digging through emails to figure out what to put on an invoice.</p>
            </div>
          </section>

          <h2 id="effective-hourly-rate" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Flat-Fee Myth: Why You Must Still Track Time
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            A common misconception in the freelance world is that time tracking is only for people who bill by the hour. Many freelancers switch to flat-fee or value-based pricing specifically so they can "stop watching the clock." This is a dangerous mistake.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you bill a flat fee of $3,000 for a website build, you still have a time-based cost of goods sold. The only way to know if that $3,000 project was actually profitable is to calculate your <strong>Effective Hourly Rate (EHR)</strong>.
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10 flex items-center gap-3">
              <Target className="h-8 w-8 text-[#D97706]" />
              Effective Hourly Rate Analysis
            </h3>
            
            <ul className="space-y-8 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                  <strong className="block text-xl mb-2 text-[#D97706]">Scenario A: Efficient Execution</strong>
                  <p className="mb-4">You charge a $3,000 flat fee. Because you tracked your time, you know the project took exactly 15 hours of design and 5 hours of communication (20 hours total).</p>
                  <code className="bg-black/30 px-3 py-1 rounded text-sm block mb-2">$3,000 ÷ 20 hours = $150/hr Effective Rate</code>
                  <p className="text-sm text-white/60">Result: Highly profitable. You should take on more of these projects.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-black/20 p-6 rounded-xl border border-white/10 w-full">
                  <strong className="block text-xl mb-2 text-[#D97706]">Scenario B: The Scope Creep Disaster</strong>
                  <p className="mb-4">You charge the same $3,000 flat fee. But the client is difficult. They demand endless revisions and 2-hour Zoom calls. Because you tracked your time, you realize you spent 80 hours on the project.</p>
                  <code className="bg-black/30 px-3 py-1 rounded text-sm block mb-2">$3,000 ÷ 80 hours = $37.50/hr Effective Rate</code>
                  <p className="text-sm text-white/60">Result: Unprofitable. Without time tracking data, you would never know this project was secretly bankrupting you.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 mb-16 rounded-r-xl">
            <h3 className="text-[#1F2937] font-bold text-xl mb-2">The Data-Driven Quote</h3>
            <p className="text-lg text-neutral-600 font-light m-0 leading-relaxed">
              When you track time on flat-fee projects, you are gathering historical data. The next time a client asks for a similar website, you don't have to guess how long it will take. You can look at your tracking history, see that it usually takes 80 hours due to revisions, and confidently quote $8,000 instead of $3,000.
            </p>
          </div>

          <h2 id="the-roi-of-software" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Mathematical ROI of Time Tracking Software
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Many freelancers hesitate to spend $15 a month on software like Harvest, Toggl, or Clockify, opting instead to use a free Excel spreadsheet. This is a false economy. The manual labor required to maintain a spreadsheet costs far more than the software subscription.
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <DollarSign className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Recovering Lost Revenue</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Software sits in your browser or menu bar. When a client calls, you click one button to start the timer. You don't forget to write it down. If that software catches just ONE 15-minute call per week that you would have otherwise forgotten to bill for (at $100/hr), it generates $100 in recovered revenue every month. It pays for its $15 subscription six times over.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <Clock className="h-8 w-8 text-[#064E3B] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Eliminating Administrative Overhead</strong>
                <span className="text-neutral-600 font-light leading-relaxed">At the end of the month, the spreadsheet freelancer spends 3 unpaid hours digging through emails and aggregating timesheets to build an invoice. The software freelancer clicks "Generate Invoice," and the software automatically pulls all logged hours, formats them beautifully, and emails the client. That is 3 hours of your life back, every single month.</span>
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
            Defending Your Boundaries
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Beyond the direct financial ROI, time tracking gives you psychological armor. It is very difficult to tell a client "No" when they ask for a favor. 
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you track your time, you remove emotion from the conversation. You don't have to argue. You simply present the data: "I would love to make those extra revisions! Looking at our time logs, we have currently exhausted the 20 hours allocated for this flat-fee sprint. To accommodate these new changes, it will take an estimated 4 hours. Should I send over a change order for $400 to proceed?"
          </p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Use the calculator above to confront the reality of your current workflow. Enter the hours you suspect you lose to scope creep and admin work each week. The annual revenue loss will likely shock you into downloading a time tracker today.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
