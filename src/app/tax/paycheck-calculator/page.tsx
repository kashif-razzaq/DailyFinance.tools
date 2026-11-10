import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Paycheck Calculator – Free, Instant Results (2026)', description: 'Use our free Paycheck Calculator to calculate your exact take-home paycheck by state. Free, instant results with worked examples and FAQs.', keywords: ['paycheck calculator', 'take-home pay calculator', 'salary paycheck calculator', 'net pay calculator'], slug: "tax/paycheck-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Paycheck Calculator" description="Use our free Paycheck Calculator to calculate your exact take-home paycheck by state. Free, instant results with worked examples and FAQs." slug="paycheck-calculator" faqs={TOOL_CONTENT["tax/paycheck-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/paycheck-calculator" />}
    </ToolLayout>
  )
}
