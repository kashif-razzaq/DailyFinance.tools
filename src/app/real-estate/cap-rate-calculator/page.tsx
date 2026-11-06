import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Cap Rate Calculator – Free, Instant Results (2026)', description: 'Use our free Cap Rate Calculator to calculate cap rate, NOI or property value in seconds. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['cap rate calculator', 'capitalization rate calculator', 'NOI calculator', 'cash on cash return calculator'], slug: "real-estate/cap-rate-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Cap Rate Calculator" description="Use our free Cap Rate Calculator to calculate cap rate, NOI or property value in seconds. Instant results with formula, worked examples and FAQs. No signup required." slug="cap-rate-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Cap Rate Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
