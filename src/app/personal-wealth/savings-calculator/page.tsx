import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Savings Calculator – Free, Instant Results (2026)', description: 'Use our free Savings Calculator to find what your savings will be worth over time. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['savings calculator','savings growth calculator','how much will my savings grow','savings interest calculator'], slug: "personal-wealth/savings-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Savings Calculator" description="Use our free Savings Calculator to find what your savings will be worth over time. Instant results with formula, worked examples and FAQs. No signup required." slug="savings-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Savings Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
