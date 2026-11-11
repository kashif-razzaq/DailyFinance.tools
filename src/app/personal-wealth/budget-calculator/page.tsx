import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Budget Calculator: A Monthly Budget That Balances', description: 'Build a monthly budget that actually balances: income against every spending category, with what’s left over shown honestly.', keywords: ['budget calculator','monthly budget calculator','budget planner','take home pay budget'], slug: "personal-wealth/budget-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Budget Calculator" description="Build a monthly budget that actually balances: income against every spending category, with what’s left over shown honestly." slug="budget-calculator" faqs={TOOL_CONTENT["personal-wealth/budget-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/budget-calculator" />}
    </ToolLayout>
  )
}
