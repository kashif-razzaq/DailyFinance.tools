import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Down Payment Calculator – Free, Instant Results (2026)', description: 'Use our free Down Payment Calculator to calculate your down payment and time to save it. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['down payment calculator', 'how much down payment for a house', 'down payment savings calculator'], slug: "real-estate/down-payment-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Down Payment Calculator" description="Use our free Down Payment Calculator to calculate your down payment and time to save it. Instant results with formula, worked examples and FAQs. No signup required." slug="down-payment-calculator" faqs={TOOL_CONTENT["real-estate/down-payment-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/down-payment-calculator" />}
    </ToolLayout>
  )
}
