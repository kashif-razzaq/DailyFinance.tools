import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Airbnb Calculator: Arbitrage Margin & Rental Profit',
  description: 'Airbnb and short-term rental profit: ADR × occupancy minus rent or mortgage, platform fees, cleaning and running costs. Arbitrage and owned modes.',
  keywords: ['airbnb calculator', 'airbnb arbitrage calculator', 'short term rental calculator', 'airbnb profit calculator', 'airbnb occupancy calculator'],
  slug: "real-estate/airbnb-arbitrage-margin-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="Airbnb Arbitrage & STR Margin Calculator" description="Airbnb and short-term rental profit: ADR × occupancy minus rent or mortgage, platform fees, cleaning and running costs. Arbitrage and owned modes." slug="airbnb-arbitrage-margin-calculator" faqs={TOOL_CONTENT["real-estate/airbnb-arbitrage-margin-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/airbnb-arbitrage-margin-calculator" />}
    </ToolLayout>
  )
}
