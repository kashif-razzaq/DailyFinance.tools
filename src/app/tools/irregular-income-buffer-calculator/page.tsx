import { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"

export const metadata: Metadata = {
  title: "Irregular Income Buffer Calculator for Freelancers | DailyFinance",
  description: "Calculate your custom, volatility-adjusted emergency fund and cash buffer for irregular freelance income. Plan for lean months, client loss risk, and payment lags.",
  keywords: ["irregular income emergency fund calculator", "freelance income buffer calculator", "cash buffer variable income", "how much emergency fund freelancer"],
}

const FAQS = [
  {
    question: "How many months of emergency fund does a freelancer need?",
    answer: "While traditional employees need 3 to 6 months of expenses, financial experts recommend 6 to 12 months for freelancers. The exact amount depends on your income volatility, single-client concentration risk, and invoice payment lags."
  },
  {
    question: "What is income volatility index (Coefficient of Variation)?",
    answer: "Income volatility measures how wildly your monthly earnings swing. Calculated as standard deviation divided by mean monthly income, a score above 40% indicates high volatility requiring a larger cash buffer."
  }
]

export default function IrregularIncomeBufferPage() {
  return (
    <ToolLayout
      title="Irregular Income Buffer Calculator"
      description="Protect your freelance business from feast-or-famine cycles by calculating the exact liquid cash reserve you need to survive lean months, client loss, and late invoices."
      slug="irregular-income-buffer-calculator"
      faqs={FAQS}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* 1. Direct Answer Block for AEO */}
          <blockquote className="bg-primary/5 border border-primary/20 p-6 mb-8 text-foreground/80 rounded-xl leading-relaxed shadow-sm">
            <strong>Quick Answer:</strong> Freelancers should maintain a cash buffer of at least <strong>6 to 12 months</strong> of essential expenses, compared to 3-6 months for W-2 employees. Your exact target depends on your income volatility, client concentration risk (if one client is &gt;40% of revenue), and average invoice payment delays (DSO).
          </blockquote>

          {/* 3. Editorial Content & Structured SEO Data */}
          <h2 className="text-2xl font-bold mb-4" id="why-freelancers-need-a-custom-buffer">Why Freelancers Need a 2-Tier Cash Buffer</h2>
          <p>
            Unlike traditional employment, independent contractors face severe income volatility (feast-or-famine cycles). Financial planners recommend a <strong>2-Tier Cash Buffer Model</strong> instead of a generic emergency fund:
          </p>
          
          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li>
              <strong>Tier 1 (Immediate Liquidity Buffer):</strong> Maintained in a standard business checking account. This covers 1.5 to 2.0 months of baseline living and business overhead to handle immediate invoice lags and short-term dry spells without disrupting cash flow.
            </li>
            <li>
              <strong>Tier 2 (Secondary Volatility Buffer):</strong> Maintained in a High-Yield Savings Account (HYSA). This covers 3 to 10 additional months depending on income volatility, client concentration, and Days Sales Outstanding (DSO).
            </li>
          </ol>

          <h2 className="text-2xl font-bold mb-4" id="how-to-calculate-runway">How We Calculate Your Buffer Target</h2>
          <p>
            This calculator uses two distinct methods to evaluate your cash buffer needs and selects the higher, safer target:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Volatility-Adjusted Expense Method:</strong> Scales your required runway based on your income's coefficient of variation (CV) and client concentration risk.</li>
            <li><strong>Lean Month Deficit Gap Method:</strong> Calculates the cumulative shortfall between your fixed expenses and the 25th percentile of your historical income during expected dry periods.</li>
          </ul>
        </>
      )}
    </ToolLayout>
  )
}
