import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: '50/30/20 Budget Calculator – Free, Instant Results (2026)', description: 'Use our free 50/30/20 Budget Calculator to split your income into needs, wants and savings the 50/30/20 way. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['50/30/20 calculator','50 30 20 budget rule','needs wants savings calculator','budget rule calculator'], slug: "personal-wealth/50-30-20-budget-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="50/30/20 Budget Calculator" description="Use our free 50/30/20 Budget Calculator to split your income into needs, wants and savings the 50/30/20 way. Instant results with formula, worked examples and FAQs. No signup required." slug="50-30-20-budget-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="50/30/20 Budget Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
