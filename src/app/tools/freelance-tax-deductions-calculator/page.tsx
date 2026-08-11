import { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"

export const metadata: Metadata = {
  title: "Freelance Tax Deductions & Home Office ROI Calculator | DailyFinance",
  description: "Calculate exactly how much you save in taxes by writing off freelance expenses. Compare the IRS Home Office Simplified vs Actual Expenses methods.",
  keywords: ["freelance tax deductions calculator", "home office deduction calculator", "1099 write offs calculator", "irs simplified vs actual home office"],
}

const FAQS = [
  {
    question: "How do freelance tax deductions work?",
    answer: "A deduction (or write-off) lowers your taxable income. If you make $100,000 and have $10,000 in eligible business deductions, you only pay taxes on $90,000. It does not reduce your tax bill dollar-for-dollar."
  },
  {
    question: "What is the Home Office Simplified Method?",
    answer: "The IRS Simplified Method allows you to deduct exactly $5 per square foot of your home office, up to a maximum of 300 square feet ($1,500). It requires no record-keeping of your actual utility bills."
  },
  {
    question: "What is the Home Office Actual Expenses Method?",
    answer: "The Actual Expenses Method calculates the exact percentage of your home used for business (e.g., a 200 sq ft office in a 1,000 sq ft apartment = 20%). You can then deduct 20% of your rent, utilities, and internet."
  },
  {
    question: "Can I deduct my internet bill as a freelancer?",
    answer: "Yes, but only the percentage used for business. If you use your home internet 50% for freelance work and 50% for personal streaming, you can only deduct 50% of the cost."
  }
]

export default function FreelanceTaxDeductionsPage() {
  return (
    <ToolLayout
      title="Freelance Tax Deductions Calculator"
      description="Calculate exactly how much cash you keep in your pocket by writing off business expenses. Instantly compare the IRS Home Office Simplified Method vs. the Actual Expenses Method to maximize your return."
      slug="freelance-tax-deductions-calculator"
      faqs={FAQS}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* 1. Direct Answer Block for AEO */}
          <blockquote className="border-l-4 border-amber-500 bg-amber-50 p-4 mb-8 text-amber-900 italic rounded-r-lg">
            <strong>Quick Answer:</strong> Freelance tax deductions save you money by lowering your taxable income by your marginal tax rate plus self-employment tax. If your effective tax bracket is 30% (Income + SE Tax), a $1,000 business expense saves you $300 in taxes. For the Home Office Deduction, renters in expensive cities usually save significantly more using the <em>Actual Expenses Method</em> (deducting a % of rent) rather than the $1,500 maximum <em>Simplified Method</em>.
          </blockquote>

          {/* 3. Editorial Content & Structured SEO Data */}
          <h2 className="text-2xl font-bold mb-4" id="how-deductions-work">How Write-Offs Actually Work</h2>
          <p>
            There is a dangerous myth that a business "write-off" means the item is free. This is mathematically false. 
          </p>
          <p>
            When you deduct a $2,000 MacBook as a freelance business expense, the IRS does not give you $2,000 back. Instead, they subtract $2,000 from your total taxable income. If your total tax rate (Federal + State + Self-Employment) is 35%, that $2,000 deduction saves you $700 in taxes. You still paid $1,300 out of pocket for the laptop.
          </p>
          
          <h3 className="text-xl font-bold mb-3">The Home Office Deduction Trap</h3>
          <p>
            The IRS offers two ways to calculate your Home Office Deduction. Choosing the wrong one can cost you thousands of dollars:
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li>
              <strong>The Simplified Method:</strong> $5 per square foot (max 300 sq ft). The absolute most you can deduct is $1,500. It is easy, but often highly unprofitable for renters.
            </li>
            <li>
              <strong>The Actual Expenses Method:</strong> You calculate the exact percentage of your home used exclusively for business. If your rent is $3,000/month ($36k/year), and your office is 15% of your apartment, you can deduct $5,400 just in rent. 
            </li>
          </ul>
        </>
      )}
    </ToolLayout>
  )
}
