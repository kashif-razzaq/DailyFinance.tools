import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Student Loan Calculator – Free, Instant Results (2026)', description: 'Use our free Student Loan Calculator to calculate student loan payoff, IDR and refinance savings. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['student loan calculator', 'student loan payment calculator', 'student loan repayment calculator'], slug: "loans/student-loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Student Loan Calculator" description="Use our free Student Loan Calculator to calculate student loan payoff, IDR and refinance savings. Instant results with formula, worked examples and FAQs. No signup required." slug="student-loan-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Student Loan Calculator" hubHref="/tools" hubName="Loan" />}
    </ToolLayout>
  )
}
