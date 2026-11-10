import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Auto Loan Calculator – Free, Instant Results (2026)', description: 'Use our free Auto Loan Calculator to calculate your car payment with tax, trade-in and down payment. Free, instant results with worked examples and FAQs.', keywords: ['auto loan calculator', 'car loan calculator', 'car payment calculator', 'auto loan payment calculator'], slug: "loans/auto-loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Auto Loan Calculator" description="Use our free Auto Loan Calculator to calculate your car payment with tax, trade-in and down payment. Free, instant results with worked examples and FAQs." slug="auto-loan-calculator" faqs={TOOL_CONTENT["loans/auto-loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/auto-loan-calculator" />}
    </ToolLayout>
  )
}
