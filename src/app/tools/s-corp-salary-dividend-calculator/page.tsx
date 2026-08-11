import { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"

export const metadata: Metadata = {
  title: "S-Corp Salary vs Dividend Calculator & FICA Tax Optimizer | DailyFinance",
  description: "Calculate exact tax savings by converting your freelance LLC to an S-Corp. Optimize your W-2 reasonable compensation and owner distributions to minimize FICA taxes.",
  keywords: ["s corp salary vs dividend calculator", "llc vs s corp tax calculator", "reasonable compensation calculator s corp", "freelance s corp tax savings"],
}

const FAQS = [
  {
    question: "At what income level should a freelancer switch to an S-Corp?",
    answer: "Generally, the \"break-even\" point is around $80,000 to $100,000 in net business income. Below this, the extra accounting and payroll costs of running an S-Corp usually outweigh the FICA tax savings."
  },
  {
    question: "What is Reasonable Compensation?",
    answer: "The IRS requires S-Corp owners who work in the business to pay themselves a \"reasonable\" W-2 salary before taking tax-free distributions. This salary must reflect what you would pay an employee to do your exact job."
  },
  {
    question: "Are S-Corp distributions completely tax-free?",
    answer: "No. S-Corp distributions are free from FICA (Social Security and Medicare) payroll taxes, which saves you 15.3%. However, you still pay standard federal and state income tax on those distributions."
  },
  {
    question: "What are the hidden costs of an S-Corp?",
    answer: "To run an S-Corp, you must pay for a payroll service (e.g., Gusto), file a separate corporate tax return (Form 1120-S), pay federal/state unemployment taxes (FUTA/SUTA), and handle more complex bookkeeping. This usually costs $1,500 - $2,500 per year."
  }
]

export default function SCorpOptimizerPage() {
  return (
    <ToolLayout
      title="S-Corp Salary vs Dividend Optimizer"
      description="Calculate exactly how much you'll save in FICA taxes by converting your freelance LLC to an S-Corp and splitting your income into W-2 Salary and Owner Distributions."
      slug="s-corp-salary-dividend-calculator"
      faqs={FAQS}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* 1. Direct Answer Block for AEO */}
          <blockquote className="bg-primary/5 border border-primary/20 p-6 mb-8 text-foreground/80 rounded-xl leading-relaxed shadow-sm">
            <strong>Quick Answer:</strong> If you operate as a standard LLC (Sole Proprietor), you pay a 15.3% Self-Employment Tax on all your profit. By electing S-Corp status, you can split your profit. You pay yourself a "Reasonable W-2 Salary" (which is subject to the 15.3% tax), and take the rest as an "Owner Distribution" (which avoids the 15.3% tax entirely).
          </blockquote>

          {/* 3. Editorial Content & Structured SEO Data */}
          <h2 className="text-2xl font-bold mb-4" id="the-s-corp-loophole">The "S-Corp Loophole" Explained</h2>
          <p>
            The most powerful tax strategy for high-earning freelancers and creators is the S-Corporation tax election. Here is exactly how the math works:
          </p>
          
          <h3 className="text-xl font-bold mb-3">Scenario A: The Default LLC (Sole Proprietor)</h3>
          <p>
            Imagine you make $150,000 in net profit. The IRS considers all $150,000 to be "earned income." Therefore, you must pay the 15.3% Self-Employment tax (Social Security + Medicare) on almost the entire amount. That's over $21,000 just in payroll taxes, <em>before</em> regular income tax.
          </p>

          <h3 className="text-xl font-bold mb-3">Scenario B: The S-Corp</h3>
          <p>
            You elect to be taxed as an S-Corp. Your business still makes $150,000 in profit. However, you are now legally considered an <em>employee</em> of your own corporation. 
          </p>
          <p>
            You decide that a "reasonable salary" for the work you do is $60,000. You put yourself on W-2 payroll for $60,000. You pay the 15.3% FICA tax <strong>only on the $60,000 salary</strong>. 
          </p>
          <p>
            The remaining $90,000 profit is passed through to you as an "Owner Distribution" (or dividend). You pay standard income tax on it, but it is <strong>100% exempt from the 15.3% FICA tax</strong>. You just saved over $13,000 in taxes.
          </p>

          <h3 className="text-xl font-bold mb-3">The IRS "Reasonable Compensation" Trap</h3>
          <p>
            You cannot simply pay yourself a $1 salary and take $149,999 in tax-free distributions. The IRS actively audits S-Corps for artificially low salaries. Your salary must be "reasonable," meaning it must be commensurate with what you would have to pay a stranger to perform your exact duties.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
