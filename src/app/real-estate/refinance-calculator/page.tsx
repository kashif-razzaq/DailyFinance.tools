import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Refinance Calculator: Savings & Break-Even Month', description: 'Does refinancing save you money? New payment, total savings and your break-even month after closing costs, side by side.', keywords: ['refinance calculator', 'mortgage refinance calculator', 'refinance break even calculator', 'should i refinance my mortgage'], slug: "real-estate/refinance-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Refinance Calculator" description="Does refinancing save you money? New payment, total savings and your break-even month after closing costs, side by side." slug="refinance-calculator" faqs={TOOL_CONTENT["real-estate/refinance-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/refinance-calculator" />}
    </ToolLayout>
  )
}
