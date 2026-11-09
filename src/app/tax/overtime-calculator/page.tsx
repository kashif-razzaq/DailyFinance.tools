import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Overtime Calculator – Free, Instant Results (2026)', description: 'Use our free Overtime Calculator to calculate overtime pay at time-and-a-half and double time. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['overtime calculator', 'time and a half calculator', 'overtime pay calculator', 'double time calculator'], slug: "tax/overtime-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Overtime Calculator" description="Use our free Overtime Calculator to calculate overtime pay at time-and-a-half and double time. Instant results with formula, worked examples and FAQs. No signup required." slug="overtime-calculator" faqs={TOOL_CONTENT["tax/overtime-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/overtime-calculator" />}
    </ToolLayout>
  )
}
