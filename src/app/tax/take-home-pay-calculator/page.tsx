import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Take-Home Pay Calculator – Free, Instant Results (2026)', description: 'Use our free Take-Home Pay Calculator to see your real take-home pay after all deductions. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['take home pay calculator', 'net pay calculator', 'after tax salary calculator', 'take-home salary calculator'], slug: "tax/take-home-pay-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Take-Home Pay Calculator" description="Use our free Take-Home Pay Calculator to see your real take-home pay after all deductions. Instant results with formula, worked examples and FAQs. No signup required." slug="take-home-pay-calculator" faqs={TOOL_CONTENT["tax/take-home-pay-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/take-home-pay-calculator" />}
    </ToolLayout>
  )
}
