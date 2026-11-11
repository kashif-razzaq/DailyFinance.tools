import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: '50/30/20 Budget Calculator: Needs, Wants & Savings', description: 'Split your income into needs, wants and savings the 50/30/20 way — your target amounts at your actual take-home pay.', keywords: ['50/30/20 calculator','50 30 20 budget rule','needs wants savings calculator','budget rule calculator'], slug: "personal-wealth/50-30-20-budget-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="50/30/20 Budget Calculator" description="Split your income into needs, wants and savings the 50/30/20 way — your target amounts at your actual take-home pay." slug="50-30-20-budget-calculator" faqs={TOOL_CONTENT["personal-wealth/50-30-20-budget-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/50-30-20-budget-calculator" />}
    </ToolLayout>
  )
}
