import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Refinance Calculator – Free, Instant Results (2026)', description: 'Use our free Refinance Calculator to see if refinancing saves you money and your break-even month. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['refinance calculator', 'mortgage refinance calculator', 'refinance break even calculator', 'should i refinance my mortgage'], slug: "real-estate/refinance-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Refinance Calculator" description="Use our free Refinance Calculator to see if refinancing saves you money and your break-even month. Instant results with formula, worked examples and FAQs. No signup required." slug="refinance-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Refinance Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
