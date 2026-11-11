import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Debt Avalanche vs Snowball: Interest & Payoff Dates',
  description: 'Debt avalanche vs snowball, side by side: enter your debts and see total interest, debt-free date and payoff order for each method. Free, instant.',
  keywords: ['debt avalanche vs snowball calculator', 'debt payoff calculator', 'avalanche method', 'snowball method', 'fastest way to pay off debt'],
  slug: "personal-wealth/debt-avalanche-vs-snowball-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Debt Avalanche vs Snowball Calculator" description="Debt avalanche vs snowball, side by side: enter your debts and see total interest, debt-free date and payoff order for each method. Free, instant." slug="debt-avalanche-vs-snowball-calculator" faqs={TOOL_CONTENT["personal-wealth/debt-avalanche-vs-snowball-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/debt-avalanche-vs-snowball-calculator" />}
    </ToolLayout>
  )
}
