import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Future Value Calculator – Free, Instant Results (2026)', description: 'Use our free Future Value Calculator to calculate the future value of a lump sum or series. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['future value calculator','future value of annuity','fv calculator','future value formula'], slug: "personal-wealth/future-value-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Future Value Calculator" description="Use our free Future Value Calculator to calculate the future value of a lump sum or series. Instant results with formula, worked examples and FAQs. No signup required." slug="future-value-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Future Value Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
