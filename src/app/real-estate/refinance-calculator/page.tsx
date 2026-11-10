import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Refinance Calculator – Free, Instant Results (2026)', description: 'Use our free Refinance Calculator to see if refinancing saves you money and your break-even month. Free, instant results with worked examples and FAQs.', keywords: ['refinance calculator', 'mortgage refinance calculator', 'refinance break even calculator', 'should i refinance my mortgage'], slug: "real-estate/refinance-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Refinance Calculator" description="Use our free Refinance Calculator to see if refinancing saves you money and your break-even month. Free, instant results with worked examples and FAQs." slug="refinance-calculator" faqs={TOOL_CONTENT["real-estate/refinance-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/refinance-calculator" />}
    </ToolLayout>
  )
}
