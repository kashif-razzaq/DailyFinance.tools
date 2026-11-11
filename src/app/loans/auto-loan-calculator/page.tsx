import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Auto Loan Calculator: Payment With Tax & Trade-In', description: 'Your car payment with tax, trade-in and down payment included — total interest, payoff date and amortization for any term.', keywords: ['auto loan calculator', 'car loan calculator', 'car payment calculator', 'auto loan payment calculator'], slug: "loans/auto-loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Auto Loan Calculator" description="Your car payment with tax, trade-in and down payment included — total interest, payoff date and amortization for any term." slug="auto-loan-calculator" faqs={TOOL_CONTENT["loans/auto-loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/auto-loan-calculator" />}
    </ToolLayout>
  )
}
