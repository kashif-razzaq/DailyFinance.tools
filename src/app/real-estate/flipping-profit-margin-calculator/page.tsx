import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'House Flipping Calculator: 70% Rule, Profit Margin & Maximum Offer',
  description: 'Calculate flip profit, ROI and profit margin, and your maximum offer with the 70% rule: ARV × 70% minus rehab. Includes holding, buying and selling costs.',
  keywords: ['house flipping calculator', '70 percent rule calculator', 'flip calculator', 'house flip profit calculator', 'maximum allowable offer calculator'],
  slug: "real-estate/flipping-profit-margin-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="House Flipping & 70% Rule Calculator" description="Calculate flip profit, ROI and profit margin, and your maximum offer with the 70% rule: ARV × 70% minus rehab. Includes holding, buying and selling costs." slug="flipping-profit-margin-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="House Flipping & 70% Rule Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
