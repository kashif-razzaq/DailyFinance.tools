import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Loan Calculator – Free, Instant Results (2026)', description: 'Use our free Loan Calculator to calculate any loan payment, total interest and schedule. Free, instant results with worked examples and FAQs.', keywords: ['loan calculator', 'loan payment calculator', 'loan interest calculator', 'amortization calculator'], slug: "loans/loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Loan Calculator" description="Use our free Loan Calculator to calculate any loan payment, total interest and schedule. Free, instant results with worked examples and FAQs." slug="loan-calculator" faqs={TOOL_CONTENT["loans/loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/loan-calculator" />}
    </ToolLayout>
  )
}
