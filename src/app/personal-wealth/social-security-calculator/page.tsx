import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Social Security Calculator – Free, Instant Results (2026)', description: 'Use our free Social Security Calculator to estimate your benefit at 62, 67 and 70 and the cost of claiming early. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['social security calculator', 'social security benefits estimator', 'claiming at 62 vs 67 vs 70', 'retirement benefits calculator'], slug: "personal-wealth/social-security-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Social Security Calculator" description="Use our free Social Security Calculator to estimate your benefit at 62, 67 and 70 and the cost of claiming early. Instant results with formula, worked examples and FAQs. No signup required." slug="social-security-calculator" faqs={TOOL_CONTENT["personal-wealth/social-security-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/social-security-calculator" />}
    </ToolLayout>
  )
}
