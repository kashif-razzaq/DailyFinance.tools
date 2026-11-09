import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Closing Cost Calculator – Free, Instant Results (2026)', description: 'Use our free Closing Cost Calculator to estimate buyer and seller closing costs and cash to close. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['closing costs calculator', 'closing cost calculator', 'cash to close calculator', 'estimate closing costs'], slug: "real-estate/closing-cost-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Closing Cost Calculator" description="Use our free Closing Cost Calculator to estimate buyer and seller closing costs and cash to close. Instant results with formula, worked examples and FAQs. No signup required." slug="closing-cost-calculator" faqs={TOOL_CONTENT["real-estate/closing-cost-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/closing-cost-calculator" />}
    </ToolLayout>
  )
}
