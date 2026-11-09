import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Mortgage Payoff Calculator – Free, Instant Results (2026)', description: 'Use our free Mortgage Payoff Calculator to see how extra payments cut years and interest. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['mortgage payoff calculator', 'pay off mortgage early', 'extra mortgage payment calculator', 'mortgage payoff date'], slug: "real-estate/mortgage-payoff-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Mortgage Payoff Calculator" description="Use our free Mortgage Payoff Calculator to see how extra payments cut years and interest. Instant results with formula, worked examples and FAQs. No signup required." slug="mortgage-payoff-calculator" faqs={TOOL_CONTENT["real-estate/mortgage-payoff-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/mortgage-payoff-calculator" />}
    </ToolLayout>
  )
}
