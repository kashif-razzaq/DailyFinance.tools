import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Budget Calculator – Free, Instant Results (2026)', description: 'Use our free Budget Calculator to build a monthly budget that actually balances. Free, instant results with worked examples and FAQs.', keywords: ['budget calculator','monthly budget calculator','budget planner','take home pay budget'], slug: "personal-wealth/budget-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Budget Calculator" description="Use our free Budget Calculator to build a monthly budget that actually balances. Free, instant results with worked examples and FAQs." slug="budget-calculator" faqs={TOOL_CONTENT["personal-wealth/budget-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/budget-calculator" />}
    </ToolLayout>
  )
}
