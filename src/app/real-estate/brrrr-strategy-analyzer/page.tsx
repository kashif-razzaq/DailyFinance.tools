import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'BRRRR Calculator: Buy, Rehab, Rent, Refinance, Repeat — Model the Deal',
  description: 'Model a BRRRR deal end to end: purchase + rehab, ARV, refinance at 75% LTV, cash left in the deal and cash-on-cash return after refinancing.',
  keywords: ['brrrr calculator', 'brrrr strategy calculator', 'buy rehab rent refinance repeat', 'brrrr refinance calculator', 'cash left in deal'],
  slug: "real-estate/brrrr-strategy-analyzer",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="BRRRR Calculator & Strategy Analyzer" description="Model a BRRRR deal end to end: purchase + rehab, ARV, refinance at 75% LTV, cash left in the deal and cash-on-cash return after refinancing." slug="brrrr-strategy-analyzer" faqs={TOOL_CONTENT["real-estate/brrrr-strategy-analyzer"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/brrrr-strategy-analyzer" />}
    </ToolLayout>
  )
}
