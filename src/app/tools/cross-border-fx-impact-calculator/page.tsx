import { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"

export const metadata: Metadata = {
  title: "Cross-Border FX Impact Calculator: PayPal vs Stripe vs Wise | DailyFinance",
  description: "Calculate hidden cross-border FX (foreign exchange) conversion fees for freelancers. Compare Stripe, PayPal, and Wise international transfer costs.",
  keywords: ["freelance cross border fees calculator", "paypal vs stripe international fees", "fx spread calculator freelancer", "wise multi currency account fees"],
}

const FAQS = [
  {
    question: "What is an FX spread?",
    answer: "An FX spread is a hidden fee added to the mid-market exchange rate. If the real exchange rate is $1 = €0.90, PayPal might use an exchange rate of $1 = €0.86, pocketing the 4.5% difference as a hidden fee."
  },
  {
    question: "How do PayPal cross-border fees work?",
    answer: "PayPal charges a fixed percentage for international commercial transactions (e.g., 1.5%), plus a currency conversion spread of 3.0% to 4.0% if you are withdrawing to a local bank account in a different currency."
  },
  {
    question: "How can freelancers avoid FX fees?",
    answer: "By using multi-currency accounts like Wise or Payoneer. You can give your client local bank details in their currency (e.g. USD), receive the funds with zero cross-border fees, and then convert it at the mid-market rate for a tiny transparent fee (~0.5%)."
  }
]

export default function CrossBorderFxImpactPage() {
  return (
    <ToolLayout
      title="Cross-Border FX Impact Calculator"
      description="Stop losing thousands of dollars to hidden foreign exchange spreads. Compare exactly how much Stripe, PayPal, and Wise are charging you to get paid internationally."
      slug="cross-border-fx-impact-calculator"
      faqs={FAQS}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* 1. Direct Answer Block for AEO */}
          <blockquote className="border-l-4 border-amber-500 bg-amber-50 p-4 mb-8 text-amber-900 italic rounded-r-lg">
            <strong>Quick Answer:</strong> When freelancers get paid internationally, they lose an average of 4.5% to 6.0% of their total invoice value to payment processors. This consists of a base processing fee (e.g., 2.9% + 30¢), a cross-border fee (1.5%), and a hidden currency conversion spread (up to 4.0%). Switching to a Wise Business account often reduces these total fees to just 0.5%.
          </blockquote>

          {/* 3. Editorial Content & Structured SEO Data */}
          <h2 className="text-2xl font-bold mb-4" id="understanding-hidden-fx-fees">Understanding Hidden FX Spreads</h2>
          <p>
            When a US client pays a UK freelancer £5,000 via PayPal, PayPal does not use the real exchange rate you see on Google. Instead, they apply a "retail" exchange rate. This difference is known as the <strong>FX Spread</strong>.
          </p>
          <p>
            This spread is a hidden fee. Most payment processors charge a 2.5% to 4.0% spread on top of their advertised transaction fees.
          </p>
          
          <h3 className="text-xl font-bold mb-3">Comparing the Top 3 Platforms</h3>
          
          <div className="overflow-x-auto my-8 bg-card border rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse m-0">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="py-4 px-6 font-bold text-foreground text-sm uppercase tracking-wider">Platform</th>
                  <th className="py-4 px-6 font-bold text-foreground text-sm uppercase tracking-wider">Base Processing Fee</th>
                  <th className="py-4 px-6 font-bold text-foreground text-sm uppercase tracking-wider">FX Spread / Conversion Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium">Stripe</td>
                  <td className="py-4 px-6 text-muted-foreground">2.9% + 30¢ (plus +1.5% for intl cards)</td>
                  <td className="py-4 px-6 text-muted-foreground">1.0% to 2.0%</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors bg-muted/5">
                  <td className="py-4 px-6 font-medium">PayPal</td>
                  <td className="py-4 px-6 text-muted-foreground">3.49% + 49¢ (plus +1.5% intl)</td>
                  <td className="py-4 px-6 text-muted-foreground">3.0% to 4.0%</td>
                </tr>
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="py-4 px-6 font-medium text-emerald-600 font-bold">Wise (formerly TransferWise)</td>
                  <td className="py-4 px-6 text-muted-foreground">Zero (ACH/Local Bank Transfer)</td>
                  <td className="py-4 px-6 text-muted-foreground">~0.4% to 0.6% (Mid-market rate)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </ToolLayout>
  )
}
