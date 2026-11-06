import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Investment Calculator – Free, Instant Results (2026)', description: 'Use our free Investment Calculator to project investment growth with contributions and inflation adjustment. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['investment calculator', 'investment growth calculator', 'stock market return calculator', 'portfolio growth calculator'], slug: "personal-wealth/investment-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Investment Calculator" description="Use our free Investment Calculator to project investment growth with contributions and inflation adjustment. Instant results with formula, worked examples and FAQs. No signup required." slug="investment-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Investment Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
