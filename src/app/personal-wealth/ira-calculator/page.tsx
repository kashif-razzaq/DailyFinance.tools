import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'IRA Calculator – Free, Instant Results (2026)', description: 'Use our free IRA Calculator to compare Traditional vs Roth IRA outcomes side by side. Free, instant results with worked examples and FAQs.', keywords: ['ira calculator', 'traditional vs roth ira calculator', 'ira comparison calculator', 'retirement account calculator'], slug: "personal-wealth/ira-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="IRA Calculator" description="Use our free IRA Calculator to compare Traditional vs Roth IRA outcomes side by side. Free, instant results with worked examples and FAQs." slug="ira-calculator" faqs={TOOL_CONTENT["personal-wealth/ira-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/ira-calculator" />}
    </ToolLayout>
  )
}
