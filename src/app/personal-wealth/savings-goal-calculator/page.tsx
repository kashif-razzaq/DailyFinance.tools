import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Savings Goal Calculator – Free, Instant Results (2026)', description: 'Use our free Savings Goal Calculator to find the monthly saving needed to hit your goal on time. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['savings goal calculator','how much should I save per month','savings target calculator','save for a goal'], slug: "personal-wealth/savings-goal-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Savings Goal Calculator" description="Use our free Savings Goal Calculator to find the monthly saving needed to hit your goal on time. Instant results with formula, worked examples and FAQs. No signup required." slug="savings-goal-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Savings Goal Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
