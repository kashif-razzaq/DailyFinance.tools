import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Savings Calculator – Free, Instant Results (2026)', description: 'Use our free Savings Calculator to find what your savings will be worth over time. Free, instant results with worked examples and FAQs.', keywords: ['savings calculator','savings growth calculator','how much will my savings grow','savings interest calculator'], slug: "personal-wealth/savings-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Savings Calculator" description="Use our free Savings Calculator to find what your savings will be worth over time. Free, instant results with worked examples and FAQs." slug="savings-calculator" faqs={TOOL_CONTENT["personal-wealth/savings-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/savings-calculator" />}
    </ToolLayout>
  )
}
