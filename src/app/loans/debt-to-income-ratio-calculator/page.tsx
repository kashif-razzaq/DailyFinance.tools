import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Debt-to-Income (DTI) Calculator – Free, Instant Results (2026)', description: "Use our free Debt-to-Income (DTI) Calculator to calculate your DTI and whether you'll qualify for a mortgage. Instant results with formula, worked examples and FAQs. No signup required.", keywords: ['debt to income ratio calculator', 'dti calculator', 'debt to income calculator', 'mortgage dti calculator'], slug: "loans/debt-to-income-ratio-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Debt-to-Income Ratio Calculator" description="Use our free Debt-to-Income (DTI) Calculator to calculate your DTI and whether you'll qualify for a mortgage. Instant results with formula, worked examples and FAQs. No signup required." slug="debt-to-income-ratio-calculator" faqs={TOOL_CONTENT["loans/debt-to-income-ratio-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/debt-to-income-ratio-calculator" />}
    </ToolLayout>
  )
}
