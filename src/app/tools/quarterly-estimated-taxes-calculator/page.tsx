import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from "next"
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "1099 Quarterly Estimated Taxes Calculator (2026)",
  description: "Calculate your 1099 quarterly estimated taxes instantly. Supports 2026 IRS federal brackets, self-employment tax, QBI deduction, and state taxes.",
  keywords: ["quarterly estimated taxes calculator", "1099 tax calculator", "self employment tax calculator", "how to calculate estimated taxes", "freelance tax calculator", "2026 tax brackets"],
  alternates: {
    canonical: "https://dailyfinance.tools/tools/quarterly-estimated-taxes-calculator",
  },
  openGraph: {
    title: "1099 Quarterly Estimated Taxes Calculator | DailyFinance.tools",
    description: "Calculate your 1099 quarterly estimated taxes instantly. Supports 2026 IRS federal brackets, self-employment tax, QBI deduction, and state taxes.",
    url: "https://dailyfinance.tools/tools/quarterly-estimated-taxes-calculator",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quarterly Estimated Taxes Calculator",
    description: "Calculate your 1099 quarterly estimated taxes instantly based on exact IRS 2026 brackets.",
  },
}

const faqs: FAQ[] = [
  {
    question: "How do you calculate 1099 quarterly estimated taxes?",
    answer: "To calculate 1099 quarterly estimated taxes, multiply your net freelance income by 92.35% to find your self-employment taxable earnings (taxed at 15.3%). Subtract half of your self-employment tax and your standard deduction to determine federal taxable income. Apply progressive income tax brackets, add state tax, and divide the total annual liability by 4."
  },
  {
    question: "What is the self-employment tax rate for freelancers in 2026?",
    answer: "The self-employment tax rate is 15.3%. This consists of two parts: 12.4% for Social Security (applied up to the $184,500 annual wage cap in 2026) and 2.9% for Medicare (applied to all net earnings without a cap)."
  },
  {
    question: "What are the IRS safe harbor rules for quarterly payments?",
    answer: "To avoid IRS underpayment penalties, you must pay estimated taxes that equal the lesser of: 90% of your current year's total tax liability, OR 100% of your prior year's total tax liability (110% if your prior year Adjusted Gross Income exceeded $150,000)."
  },
  {
    question: "What happens if I miss a quarterly estimated tax payment?",
    answer: "If you miss a quarterly estimated tax payment, you should pay it as soon as possible. The IRS charges an underpayment penalty (Form 2210) which accrues interest daily based on the federal short-term rate plus 3%. Making the payment late stops the interest from compounding further."
  },
  {
    question: "Is the Qualified Business Income (QBI) deduction still available in 2026?",
    answer: "Yes, the Section 199A QBI deduction allows eligible self-employed individuals and small business owners to deduct up to 20% of their qualified business income from their taxable income, subject to specific income phase-out limits."
  }
]

export default function QuarterlyTaxesCalculatorPage() {
  return (
    <ToolLayout
      title="1099 Quarterly Estimated Taxes Calculator"
      description="Instantly calculate your 1099 quarterly estimated tax payments. This calculator strictly follows the latest 2026 IRS federal tax brackets, self-employment rules, and Safe Harbor thresholds."
      slug="quarterly-estimated-taxes-calculator"
      faqs={faqs}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          <h2 id="how-to-calculate" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 scroll-mt-24">
            How do you calculate 1099 quarterly estimated taxes?
          </h2>
          
          {/* AEO Direct Answer Block */}
          <blockquote className="bg-primary/5 border border-primary/20 p-6 mb-8 text-foreground/80 rounded-xl leading-relaxed shadow-sm">
            To calculate 1099 quarterly estimated taxes, multiply net freelance income by 92.35% to find self-employment taxable earnings (taxed at 15.3%). Subtract half of self-employment tax and standard deduction to determine federal taxable income. Apply progressive income tax brackets, add state tax, and divide the total by 4.
          </blockquote>
          
          <p className="lead text-xl text-muted-foreground mb-12 leading-relaxed">
            As a freelancer, 1099 contractor, or sole proprietor, you are responsible for paying both the employer and employee portions of Social Security and Medicare taxes. The <a href="https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IRS requires you to pay estimated taxes</a> four times a year. Failing to accurately calculate and pay these taxes can result in severe underpayment penalties (Form 2210).
          </p>

          <section className="bg-card border shadow-sm rounded-2xl p-8 my-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
            <h3 id="understanding-qbi" className="text-xl font-bold mb-4 mt-0 text-foreground scroll-mt-24">The QBI Deduction (Qualified Business Income)</h3>
            <p className="text-muted-foreground m-0 leading-relaxed">
              Our calculator defaults to applying the <strong>Section 199A QBI Deduction</strong>, which allows eligible self-employed individuals to deduct up to 20% of their net business income before federal income tax is applied. This is one of the most powerful tax advantages available to freelancers.
            </p>
          </section>
          
          <h3 id="step-by-step-formula" className="text-2xl font-bold mt-16 mb-6 scroll-mt-24">The 5-Step Tax Calculation Process</h3>
          <p>
            If you wish to calculate your quarterly estimated tax payments manually, you must follow this exact order of operations:
          </p>
          
          <ol className="list-decimal pl-6 space-y-4 mb-8 text-foreground font-medium">
            <li><strong>Calculate SE Taxable Base:</strong> Multiply your Net Freelance Income by 0.9235.</li>
            <li><strong>Calculate Self-Employment Tax (15.3%):</strong> Apply 12.4% for Social Security (capped at $184,500 in 2026) and 2.9% for Medicare.</li>
            <li><strong>Calculate Adjusted Gross Income (AGI):</strong> Deduct exactly 50% of your Self-Employment tax from your Net Income.</li>
            <li><strong>Determine Federal Taxable Income:</strong> Subtract the Standard Deduction ($16,100 for Single Filers in 2026) and your 20% QBI deduction from your AGI.</li>
            <li><strong>Apply Federal Brackets & Divide by 4:</strong> Push your taxable income through the progressive brackets below, add your State tax, and divide the final sum by four.</li>
          </ol>

          {/* Internal Linking for SEO context */}
          <p className="text-muted-foreground my-8 italic">
            <strong>Pro Tip:</strong> Before calculating taxes, ensure you are charging enough to cover them! Use our <a href="/tools/hourly-rate-reverse-engineer-calculator" className="text-primary hover:underline">Freelance Hourly Rate Calculator</a> to reverse-engineer a rate that guarantees profitability after these taxes are deducted.
          </p>
          
          <hr className="my-16 border-border/60" />
          
          <h2 id="tax-brackets" className="text-3xl font-extrabold tracking-tight mb-8 scroll-mt-24">
            2026 Federal Income Tax Brackets (Single Filer)
          </h2>
          <p className="mb-10 text-muted-foreground">
            The United States uses a progressive tax system. You do not pay your top bracket rate on all of your income; you only pay that rate on the portion of your income that falls within that specific bracket.
          </p>

          <div className="overflow-x-auto my-12 bg-card border rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse m-0">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="py-4 px-6 font-bold text-foreground text-sm uppercase tracking-wider">Tax Rate</th>
                  <th className="py-4 px-6 font-bold text-foreground text-sm uppercase tracking-wider">2026 Taxable Income Bracket</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium">10%</td>
                  <td className="py-4 px-6 text-muted-foreground">$0 – $12,400</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors bg-muted/5">
                  <td className="py-4 px-6 font-medium">12%</td>
                  <td className="py-4 px-6 text-muted-foreground">$12,401 – $50,400</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium">22%</td>
                  <td className="py-4 px-6 text-muted-foreground">$50,401 – $105,700</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors bg-muted/5">
                  <td className="py-4 px-6 font-medium">24%</td>
                  <td className="py-4 px-6 text-muted-foreground">$105,701 – $201,775</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium">32%</td>
                  <td className="py-4 px-6 text-muted-foreground">$201,776 – $256,225</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors bg-muted/5">
                  <td className="py-4 px-6 font-medium">35%</td>
                  <td className="py-4 px-6 text-muted-foreground">$256,226 – $640,600</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium">37%</td>
                  <td className="py-4 px-6 text-muted-foreground">Over $640,600</td>
                </tr>
              </tbody>
            </table>
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

          <h2 id="due-dates" className="text-3xl font-extrabold tracking-tight mb-8 scroll-mt-24">
            IRS Quarterly Payment Due Dates
          </h2>
          <p className="text-muted-foreground mb-8">
            The IRS does not divide the year into four perfect three-month quarters for estimated taxes. You must adhere to the following specific payment schedule to maintain <strong>Safe Harbor</strong> status and avoid penalties:
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-12">
            <li className="bg-card border p-4 rounded-xl shadow-sm">
              <span className="text-sm font-bold text-primary block mb-1">Q1 (Jan 1 – Mar 31)</span>
              <span className="font-semibold text-foreground text-lg">Due April 15</span>
            </li>
            <li className="bg-card border p-4 rounded-xl shadow-sm">
              <span className="text-sm font-bold text-primary block mb-1">Q2 (Apr 1 – May 31)</span>
              <span className="font-semibold text-foreground text-lg">Due June 15</span>
            </li>
            <li className="bg-card border p-4 rounded-xl shadow-sm">
              <span className="text-sm font-bold text-primary block mb-1">Q3 (Jun 1 – Aug 31)</span>
              <span className="font-semibold text-foreground text-lg">Due September 15</span>
            </li>
            <li className="bg-card border p-4 rounded-xl shadow-sm">
              <span className="text-sm font-bold text-primary block mb-1">Q4 (Sep 1 – Dec 31)</span>
              <span className="font-semibold text-foreground text-lg">Due January 15</span>
            </li>
          </ul>

        </>
      )}
    </ToolLayout>
  )
}
