import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Debt Payoff Calculator – Free, Instant Results (2026)', description: 'Use our free Debt Payoff Calculator to make one payoff plan for all your debts together. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['debt payoff calculator', 'debt avalanche calculator', 'debt snowball calculator', 'debt free calculator'], slug: "loans/debt-payoff-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Debt Payoff Calculator" description="Use our free Debt Payoff Calculator to make one payoff plan for all your debts together. Instant results with formula, worked examples and FAQs. No signup required." slug="debt-payoff-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Debt Payoff Calculator" hubHref="/tools" hubName="Loan" />}
    </ToolLayout>
  )
}
