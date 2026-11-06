import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Rent vs Buy Calculator – Free, Instant Results (2026)', description: 'Use our free Rent vs Buy Calculator to decide whether renting or buying costs less over your stay. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['rent vs buy calculator', 'renting vs buying calculator', 'is it better to rent or buy a house'], slug: "real-estate/rent-vs-buy-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Rent vs Buy Calculator" description="Use our free Rent vs Buy Calculator to decide whether renting or buying costs less over your stay. Instant results with formula, worked examples and FAQs. No signup required." slug="rent-vs-buy-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Rent vs Buy Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
