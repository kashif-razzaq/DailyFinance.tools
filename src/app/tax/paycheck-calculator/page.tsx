import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Paycheck Calculator – Free, Instant Results (2026)', description: 'Use our free Paycheck Calculator to calculate your exact take-home paycheck by state. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['paycheck calculator', 'take-home pay calculator', 'salary paycheck calculator', 'net pay calculator'], slug: "tax/paycheck-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Paycheck Calculator" description="Use our free Paycheck Calculator to calculate your exact take-home paycheck by state. Instant results with formula, worked examples and FAQs. No signup required." slug="paycheck-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Paycheck Calculator" hubHref="/tools" hubName="Tax" />}
    </ToolLayout>
  )
}
