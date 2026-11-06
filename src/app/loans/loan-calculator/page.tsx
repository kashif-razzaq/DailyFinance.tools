import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Loan Calculator – Free, Instant Results (2026)', description: 'Use our free Loan Calculator to calculate any loan payment, total interest and schedule. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['loan calculator', 'loan payment calculator', 'loan interest calculator', 'amortization calculator'], slug: "loans/loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Loan Calculator" description="Use our free Loan Calculator to calculate any loan payment, total interest and schedule. Instant results with formula, worked examples and FAQs. No signup required." slug="loan-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Loan Calculator" hubHref="/tools" hubName="Loan" />}
    </ToolLayout>
  )
}
