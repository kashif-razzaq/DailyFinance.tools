import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Simple Interest Calculator – Free, Instant Results (2026)', description: 'Use our free Simple Interest Calculator to calculate interest on a loan or deposit in seconds. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['simple interest calculator','simple interest formula','I=PRT calculator','interest on a loan calculator'], slug: "personal-wealth/simple-interest-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Simple Interest Calculator" description="Use our free Simple Interest Calculator to calculate interest on a loan or deposit in seconds. Instant results with formula, worked examples and FAQs. No signup required." slug="simple-interest-calculator" faqs={TOOL_CONTENT["personal-wealth/simple-interest-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/simple-interest-calculator" />}
    </ToolLayout>
  )
}
