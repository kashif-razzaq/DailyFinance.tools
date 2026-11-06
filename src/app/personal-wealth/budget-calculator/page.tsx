import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Budget Calculator – Free, Instant Results (2026)', description: 'Use our free Budget Calculator to build a monthly budget that actually balances. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['budget calculator','monthly budget calculator','budget planner','take home pay budget'], slug: "personal-wealth/budget-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Budget Calculator" description="Use our free Budget Calculator to build a monthly budget that actually balances. Instant results with formula, worked examples and FAQs. No signup required." slug="budget-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Budget Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
