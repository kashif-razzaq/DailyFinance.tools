import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'IRA Calculator – Free, Instant Results (2026)', description: 'Use our free IRA Calculator to compare Traditional vs Roth IRA outcomes side by side. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['ira calculator', 'traditional vs roth ira calculator', 'ira comparison calculator', 'retirement account calculator'], slug: "personal-wealth/ira-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="IRA Calculator" description="Use our free IRA Calculator to compare Traditional vs Roth IRA outcomes side by side. Instant results with formula, worked examples and FAQs. No signup required." slug="ira-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="IRA Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
