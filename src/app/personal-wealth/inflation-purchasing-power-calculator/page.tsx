import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Inflation Calculator: Future Purchasing Power of Your Money',
  description: "What inflation does to your money: future purchasing power and the future cost of today's prices at 2%, your rate and 5%, side by side.",
  keywords: ['inflation calculator', 'purchasing power calculator', 'future value of money inflation', 'what will money be worth'],
  slug: "personal-wealth/inflation-purchasing-power-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Inflation Calculator" description="What inflation does to your money: future purchasing power and the future cost of today's prices at 2%, your rate and 5%, side by side." slug="inflation-purchasing-power-calculator" faqs={TOOL_CONTENT["personal-wealth/inflation-purchasing-power-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/inflation-purchasing-power-calculator" />}
    </ToolLayout>
  )
}
