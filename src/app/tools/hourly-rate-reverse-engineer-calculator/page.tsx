import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Freelance Hourly Rate Calculator: Calculate Your True Value",
  description: "Reverse engineer your freelance hourly rate based on desired net income, taxes, business overhead, and billable utilization. Stop undercharging.",
  keywords: ["freelance hourly rate calculator", "calculate freelance rate", "freelance day rate", "minimum acceptable rate MAR", "freelance pricing strategy", "how much should I charge freelance"],
  alternates: {
    canonical: "https://dailyfinance.tools/tools/hourly-rate-reverse-engineer-calculator",
  },
  openGraph: {
    title: "Freelance Hourly Rate Calculator | DailyFinance.tools",
    description: "Reverse engineer your freelance hourly rate based on desired net income, taxes, business overhead, and billable utilization.",
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
    answer: "To calculate a freelance hourly rate, add your personal income target, business expenses, estimated taxes, and a profit buffer together to get your required gross revenue. Then, divide that total gross revenue by your estimated annual billable hours to find your exact minimum hourly rate."
  },
  {
    question: "How many billable hours are in a standard freelance year?",
    answer: "While a standard W-2 year has 2,080 hours, a healthy freelance year typically contains between 1,000 and 1,200 billable hours, assuming 4 to 6 weeks of PTO and a realistic 60% billable utilization rate."
  },
  {
    question: "What percentage of my freelance income should I save for taxes?",
    answer: "As a general rule, freelancers in the US should reserve 25% to 30% of every client payment in a separate high-yield savings account to cover Self-Employment tax (15.3%) plus federal and state income taxes."
  },
  {
    question: "Should I display my hourly rate publicly on my website?",
    answer: "Generally, no. Displaying a minimum project engagement fee (e.g., \"Projects start at $5,000\") is much more effective than displaying an hourly rate. Hourly rates invite clients to micromanage your time, whereas project minimums frame you as an expert delivering a valuable result."
  },
  {
    question: "What is a good billable utilization rate for independent consultants?",
    answer: "A strong, sustainable billable utilization rate for an independent consultant is 60%. This leaves 40% of your working hours dedicated to unbilled overhead such as marketing, sales calls, administrative tasks, and invoicing."
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
          <h2 id="sustainable-formula" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 scroll-mt-24">
            How to Calculate Your Freelance Hourly Rate
          </h2>
          
          <blockquote className="pl-4 border-l-4 border-primary text-xl font-medium text-foreground italic mb-12">
            To calculate a sustainable freelance hourly rate, you must add your target net income, annual business overhead, estimated taxes, and profit buffer together, and divide that total by your true annual billable hours (not standard 40-hour work weeks).
          </blockquote>
          
          <p className="lead text-xl text-muted-foreground mb-12 leading-relaxed">
            Setting an arbitrary hourly rate based on what your peers charge is the fastest way to burn out as a freelancer. Top earners use a reverse-engineering approach to calculate their <strong>Minimum Acceptable Rate (MAR)</strong>. Here is the definitive {new Date().getFullYear()} guide to calculating a rate that guarantees profitability, covers your tax liabilities mandated by the <a href="https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IRS</a>, and protects your peace of mind.
          </p>

          <section className="bg-card border shadow-sm rounded-2xl p-8 my-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
            <h3 id="understanding-mar" className="text-xl font-bold mb-4 mt-0 text-foreground scroll-mt-24">Understanding the Minimum Acceptable Rate (MAR)</h3>
            <p className="text-muted-foreground m-0 leading-relaxed">
              Your Minimum Acceptable Rate (MAR) is the absolute lowest hourly rate you can charge without sacrificing your lifestyle, failing to pay taxes, or neglecting business growth. It ensures that every single billable hour you work actively contributes to your target net income.
            </p>
          </section>
          
          <h3 id="step-by-step-formula" className="text-2xl font-bold mt-16 mb-6 scroll-mt-24">The 4-Step Formula to Calculate Freelance Rates</h3>
          <p>
            The mathematics powering our calculator use a fundamental financial equation. If you are calculating your rates manually, follow these four steps:
          </p>
          
          <ol className="list-decimal pl-6 space-y-4 mb-8 text-foreground font-medium">
            <li><strong>Determine Target Net Income:</strong> Calculate how much take-home pay you need to support your personal lifestyle.</li>
            <li><strong>Add Operating Expenses (OpEx):</strong> Tally all business costs including software, legal fees, and marketing.</li>
            <li><strong>Account for Estimated Taxes:</strong> Factor in a 25-30% premium to cover Self-Employment, Federal, and State taxes. (You can calculate this precisely using our <a href="/tools/quarterly-estimated-taxes-calculator" className="text-primary hover:underline">Quarterly Estimated Taxes Calculator</a>).</li>
            <li><strong>Divide by Billable Hours:</strong> Divide the total required gross revenue by your actual billable hours (typically 1,000 - 1,200 hours per year).</li>
          </ol>
          
          <hr className="my-16 border-border/60" />
          
          <h2 id="key-factors-forgotten" className="text-3xl font-extrabold tracking-tight mb-10 scroll-mt-24">
            4 Key Factors Most Freelancers Forget When Setting Rates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            
            <section className="bg-card border rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 font-bold text-xl">1</div>
              <h3 id="factor-billable-hours" className="text-lg font-bold mt-0 mb-3 scroll-mt-24">The Billable Hours Trap</h3>
              <p className="text-sm text-muted-foreground m-0">
                The most common mistake freelancers make is dividing their target income by 2,080 (40 hours x 52 weeks). This assumes a 100% billable utilization rate. In reality, independent consultants spend roughly 40% of their time on unbilled administrative tasks, marketing, and client acquisition. If you only bill 24 hours a week, your rate must compensate for the 16 hours of unpaid overhead.
              </p>
            </section>

            <section className="bg-card border rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 font-bold text-xl">2</div>
              <h3 id="factor-self-employment-tax" className="text-lg font-bold mt-0 mb-3 scroll-mt-24">Self-Employment Taxes</h3>
              <p className="text-sm text-muted-foreground m-0">
                Unlike W-2 employees whose employers subsidize payroll taxes, freelancers pay the full 15.3% FICA tax (in the US), on top of standard state and federal income brackets. Additionally, without employer-sponsored healthcare, your baseline operational costs are significantly higher and must be baked into your rate.
              </p>
            </section>

            <section className="bg-card border rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 font-bold text-xl">3</div>
              <h3 id="factor-operating-overhead" className="text-lg font-bold mt-0 mb-3 scroll-mt-24">Operating Overhead (OpEx)</h3>
              <p className="text-sm text-muted-foreground m-0">
                Your business costs money to run. Software subscriptions (Adobe CC, Figma, Webflow), CRM tools, domain renewals, advertising, and legal fees are not personal expenses. They are operating costs that must be paid for by your clients through your hourly baseline.
              </p>
            </section>

            <section className="bg-card border rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 font-bold text-xl">4</div>
              <h3 id="factor-pto" className="text-lg font-bold mt-0 mb-3 scroll-mt-24">Paid Time Off (PTO) Reserve</h3>
              <p className="text-sm text-muted-foreground m-0">
                If you don't work, you don't get paid. A sustainable hourly rate accounts for at least 4 to 6 weeks of unpaid time off (vacation, federal holidays, and sick days) so you aren't financially penalized for taking a necessary break to prevent burnout.
              </p>
            </section>

          </div>

          {/* In-Article Ad Space */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-muted/10 border border-dashed border-border/40 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-semibold text-foreground/40">In-Article AdSense Banner</span>
            </aside>
          )}

          <hr className="my-16 border-border/60" />

          <h2 id="benchmarks" className="text-3xl font-extrabold tracking-tight mb-8 scroll-mt-24">
            {new Date().getFullYear()} Freelance Hourly Rate Benchmarks by Niche
          </h2>
          <p className="mb-10 text-muted-foreground">
            While your MAR dictates your floor, the market dictates your ceiling. Here is a comprehensive look at the current market rates for top freelance professions. If your calculated MAR is significantly higher than the Senior market rate, you must either lower your expenses or pivot to Value-Based Pricing.
          </p>

          <div className="overflow-x-auto my-12 bg-card border rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse m-0">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="py-4 px-6 font-bold text-foreground text-sm uppercase tracking-wider">Industry / Niche</th>
                  <th className="py-4 px-6 font-bold text-foreground text-sm uppercase tracking-wider">Entry-Level</th>
                  <th className="py-4 px-6 font-bold text-foreground text-sm uppercase tracking-wider">Senior / Expert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium">Software Engineering</td>
                  <td className="py-4 px-6 text-muted-foreground">$50 - $85/hr</td>
                  <td className="py-4 px-6 font-semibold text-primary">$120 - $250+/hr</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors bg-muted/5">
                  <td className="py-4 px-6 font-medium">UI/UX & Brand Design</td>
                  <td className="py-4 px-6 text-muted-foreground">$45 - $75/hr</td>
                  <td className="py-4 px-6 font-semibold text-primary">$100 - $175+/hr</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium">Digital Marketing & SEO</td>
                  <td className="py-4 px-6 text-muted-foreground">$40 - $65/hr</td>
                  <td className="py-4 px-6 font-semibold text-primary">$90 - $150+/hr</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors bg-muted/5">
                  <td className="py-4 px-6 font-medium">Copywriting & Strategy</td>
                  <td className="py-4 px-6 text-muted-foreground">$35 - $60/hr</td>
                  <td className="py-4 px-6 font-semibold text-primary">$85 - $130+/hr</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium">Executive Consulting</td>
                  <td className="py-4 px-6 text-muted-foreground">$75 - $100/hr</td>
                  <td className="py-4 px-6 font-semibold text-primary">$150 - $350+/hr</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="my-16 border-border/60" />

          <h2 id="day-rates-retainers" className="text-3xl font-extrabold tracking-tight mb-8 scroll-mt-24">
            How to Convert Your Hourly Rate into Day Rates and Retainers
          </h2>
          
          <h3 id="sustainable-day-rate" className="text-xl font-bold mt-10 mb-4 scroll-mt-24">Calculating a Sustainable Day Rate</h3>
          <p className="text-muted-foreground">
            Day rates protect you from micro-management and scope creep on intensive projects. A standard formula is taking your Hourly Rate, multiplying it by 8, and adding a 20% premium for booking your exclusivity for the day. For example, if your hourly rate is $100, your day rate shouldn't be $800—it should be $960 to account for the opportunity cost of turning away other clients.
          </p>
          
          <h3 id="monthly-retainers" className="text-xl font-bold mt-10 mb-4 scroll-mt-24">Setting Up Monthly Client Retainers</h3>
          <p className="text-muted-foreground mb-12">
            To calculate a retainer, multiply your hourly rate by the guaranteed hours per month. For example, a $100/hr rate for 20 hours a month yields a $2,000 monthly retainer. Retainers stabilize your cash flow and reduce the anxiety of irregular income. Offering a slight discount (5-10%) on your hourly rate in exchange for a 6-month retainer commitment is a highly effective agency growth strategy.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
