import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Cap Rate Calculator: Cap Rate, NOI & Property Value', description: 'Cap rate, NOI or property value from the other two — the yield maths every rental deal is priced on, with worked examples.', keywords: ['cap rate calculator', 'capitalization rate calculator', 'NOI calculator', 'cash on cash return calculator'], slug: "real-estate/cap-rate-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Cap Rate Calculator" description="Cap rate, NOI or property value from the other two — the yield maths every rental deal is priced on, with worked examples." slug="cap-rate-calculator" faqs={TOOL_CONTENT["real-estate/cap-rate-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/cap-rate-calculator" />}
    </ToolLayout>
  )
}
