import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Income Tax Calculator – Free, Instant Results (2026)', description: 'Use our free Income Tax Calculator to calculate federal and state income tax by bracket. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['income tax calculator', 'federal and state tax calculator', 'tax burden calculator', 'effective tax rate calculator'], slug: "tax/income-tax-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Income Tax Calculator" description="Use our free Income Tax Calculator to calculate federal and state income tax by bracket. Instant results with formula, worked examples and FAQs. No signup required." slug="income-tax-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Income Tax Calculator" hubHref="/tools" hubName="Tax" />}
    </ToolLayout>
  )
}
