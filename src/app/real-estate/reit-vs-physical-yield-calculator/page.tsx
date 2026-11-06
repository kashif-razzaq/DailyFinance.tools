import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'REIT vs Rental Property Calculator: Which Builds More Wealth?',
  description: 'Compare the same capital invested in a REIT (dividend + appreciation, reinvested) versus a leveraged physical rental (cash flow + equity) over 10–30 years.',
  keywords: ['reit vs real estate calculator', 'reit vs rental property', 'is a reit better than rental property', 'real estate vs reit returns calculator'],
  slug: "real-estate/reit-vs-physical-yield-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="REIT vs Physical Property Calculator" description="Compare the same capital invested in a REIT (dividend + appreciation, reinvested) versus a leveraged physical rental (cash flow + equity) over 10–30 years." slug="reit-vs-physical-yield-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="REIT vs Physical Property Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
