import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Tax Calculator – Free, Instant Results (2026)', description: 'Use our free Tax Calculator to estimate your federal tax, refund or amount owed. Free, instant results with worked examples and FAQs.', keywords: ['tax calculator', 'federal tax calculator', 'income tax estimator', 'tax refund calculator'], slug: "tax/tax-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Tax Calculator" description="Use our free Tax Calculator to estimate your federal tax, refund or amount owed. Free, instant results with worked examples and FAQs." slug="tax-calculator" faqs={TOOL_CONTENT["tax/tax-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/tax-calculator" />}
    </ToolLayout>
  )
}
