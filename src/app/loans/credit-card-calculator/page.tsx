import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Credit Card Calculator – Free, Instant Results (2026)', description: 'Use our free Credit Card Calculator to see the true cost of minimum payments. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['credit card calculator', 'credit card payment calculator', 'minimum payment calculator', 'credit card interest calculator'], slug: "loans/credit-card-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Credit Card Calculator" description="Use our free Credit Card Calculator to see the true cost of minimum payments. Instant results with formula, worked examples and FAQs. No signup required." slug="credit-card-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Credit Card Calculator" hubHref="/tools" hubName="Loan" />}
    </ToolLayout>
  )
}
