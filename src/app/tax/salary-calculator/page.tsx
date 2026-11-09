import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Salary Calculator – Free, Instant Results (2026)', description: 'Use our free Salary Calculator to convert salary to hourly, weekly, monthly and take-home pay. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['salary calculator', 'salary to hourly calculator', 'annual salary calculator', 'pay calculator'], slug: "tax/salary-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Salary Calculator" description="Use our free Salary Calculator to convert salary to hourly, weekly, monthly and take-home pay. Instant results with formula, worked examples and FAQs. No signup required." slug="salary-calculator" faqs={TOOL_CONTENT["tax/salary-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/salary-calculator" />}
    </ToolLayout>
  )
}
