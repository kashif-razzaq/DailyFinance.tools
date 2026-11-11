import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Amortization Calculator: Schedule, PITI & Interest',
  description: 'Mortgage amortization schedule, free: monthly payment (PITI), total interest, PMI and the effect of extra payments — the complete payment calculator.',
  keywords: ['mortgage calculator', 'mortgage payment calculator', 'amortization calculator', 'mortgage amortization calculator', 'mortgage calculator with taxes and insurance', 'extra payment mortgage calculator'],
  slug: "real-estate/mortgage-amortization-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="Mortgage Calculator & Amortization Schedule" description="Mortgage amortization schedule, free: monthly payment (PITI), total interest, PMI and the effect of extra payments — the complete payment calculator." slug="mortgage-amortization-calculator" faqs={TOOL_CONTENT["real-estate/mortgage-amortization-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/mortgage-amortization-calculator" />}
    </ToolLayout>
  )
}
