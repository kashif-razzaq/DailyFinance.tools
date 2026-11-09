import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'APY Calculator – Free, Instant Results (2026)', description: 'Use our free APY Calculator to compare bank accounts by true annual yield. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['apy calculator','apy to apr converter','annual percentage yield calculator','effective annual rate calculator'], slug: "personal-wealth/apy-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="APY Calculator" description="Use our free APY Calculator to compare bank accounts by true annual yield. Instant results with formula, worked examples and FAQs. No signup required." slug="apy-calculator" faqs={TOOL_CONTENT["personal-wealth/apy-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/apy-calculator" />}
    </ToolLayout>
  )
}
