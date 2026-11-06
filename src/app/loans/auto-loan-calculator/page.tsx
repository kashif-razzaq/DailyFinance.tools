import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Auto Loan Calculator – Free, Instant Results (2026)', description: 'Use our free Auto Loan Calculator to calculate your car payment with tax, trade-in and down payment. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['auto loan calculator', 'car loan calculator', 'car payment calculator', 'auto loan payment calculator'], slug: "loans/auto-loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Auto Loan Calculator" description="Use our free Auto Loan Calculator to calculate your car payment with tax, trade-in and down payment. Instant results with formula, worked examples and FAQs. No signup required." slug="auto-loan-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Auto Loan Calculator" hubHref="/tools" hubName="Loan" />}
    </ToolLayout>
  )
}
