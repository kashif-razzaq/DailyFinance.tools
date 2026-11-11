import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Savings Goal Calculator: Monthly Saving to Hit Your Goal', description: 'The monthly saving needed to hit your goal on time — or the date your current saving rate actually gets you there.', keywords: ['savings goal calculator','how much should I save per month','savings target calculator','save for a goal'], slug: "personal-wealth/savings-goal-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Savings Goal Calculator" description="The monthly saving needed to hit your goal on time — or the date your current saving rate actually gets you there." slug="savings-goal-calculator" faqs={TOOL_CONTENT["personal-wealth/savings-goal-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/savings-goal-calculator" />}
    </ToolLayout>
  )
}
