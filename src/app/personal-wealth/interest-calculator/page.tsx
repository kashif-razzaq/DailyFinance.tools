import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Interest Calculator – Free, Instant Results (2026)', description: 'Use our free Interest Calculator to calculate simple and compound interest in one place. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['interest calculator','compound interest calculator','simple interest calculator','interest earned calculator'], slug: "personal-wealth/interest-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Interest Calculator" description="Use our free Interest Calculator to calculate simple and compound interest in one place. Instant results with formula, worked examples and FAQs. No signup required." slug="interest-calculator" faqs={TOOL_CONTENT["personal-wealth/interest-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/interest-calculator" />}
    </ToolLayout>
  )
}
