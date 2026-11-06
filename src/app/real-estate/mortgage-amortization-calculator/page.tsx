import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Mortgage Calculator & Amortization Schedule: Payment, PITI & Total Interest',
  description: 'Free mortgage calculator with amortization schedule: monthly payment (PITI), total interest, PMI and the effect of extra payments. The complete mortgage payment calculator.',
  keywords: ['mortgage calculator', 'mortgage payment calculator', 'amortization calculator', 'mortgage amortization calculator', 'mortgage calculator with taxes and insurance', 'extra payment mortgage calculator'],
  slug: "real-estate/mortgage-amortization-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="Mortgage Calculator & Amortization Schedule" description="Free mortgage calculator with amortization schedule: monthly payment (PITI), total interest, PMI and the effect of extra payments. The complete mortgage payment calculator." slug="mortgage-amortization-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Mortgage Calculator & Amortization Schedule" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
