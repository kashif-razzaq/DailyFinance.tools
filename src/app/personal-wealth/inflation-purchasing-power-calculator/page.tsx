import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Inflation Calculator: Future Purchasing Power of Your Money',
  description: "See what inflation does to your money: calculate future purchasing power, the future cost of today's prices, and compare 2 percent, your rate and 5 percent side by side.",
  keywords: ['inflation calculator', 'purchasing power calculator', 'future value of money inflation', 'what will money be worth'],
  slug: "personal-wealth/inflation-purchasing-power-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Inflation Calculator" description="See what inflation does to your money: calculate future purchasing power, the future cost of today's prices, and compare 2 percent, your rate and 5 percent side by side." slug="inflation-purchasing-power-calculator" faqs={TOOL_CONTENT["personal-wealth/inflation-purchasing-power-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/inflation-purchasing-power-calculator" />}
    </ToolLayout>
  )
}
