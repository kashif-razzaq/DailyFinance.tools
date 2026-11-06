import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Debt Consolidation Calculator – Free, Instant Results (2026)', description: 'Use our free Debt Consolidation Calculator to see if consolidating debts into one loan saves money. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['debt consolidation calculator', 'consolidation loan calculator', 'debt consolidation loan calculator'], slug: "loans/debt-consolidation-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Debt Consolidation Calculator" description="Use our free Debt Consolidation Calculator to see if consolidating debts into one loan saves money. Instant results with formula, worked examples and FAQs. No signup required." slug="debt-consolidation-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Debt Consolidation Calculator" hubHref="/tools" hubName="Loan" />}
    </ToolLayout>
  )
}
