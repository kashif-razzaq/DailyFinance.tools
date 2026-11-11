import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Debt Payoff Calculator: One Plan for All Your Debts', description: 'One payoff plan for all your debts together — monthly payment, debt-free date and total interest, and what extra payments change.', keywords: ['debt payoff calculator', 'debt avalanche calculator', 'debt snowball calculator', 'debt free calculator'], slug: "loans/debt-payoff-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Debt Payoff Calculator" description="One payoff plan for all your debts together — monthly payment, debt-free date and total interest, and what extra payments change." slug="debt-payoff-calculator" faqs={TOOL_CONTENT["loans/debt-payoff-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/debt-payoff-calculator" />}
    </ToolLayout>
  )
}
