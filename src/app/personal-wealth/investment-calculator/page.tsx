import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Investment Calculator: Growth With Contributions', description: 'Project investment growth with contributions and inflation adjustment: balance by year, total contributions and total growth.', keywords: ['investment calculator', 'investment growth calculator', 'stock market return calculator', 'portfolio growth calculator'], slug: "personal-wealth/investment-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Investment Calculator" description="Project investment growth with contributions and inflation adjustment: balance by year, total contributions and total growth." slug="investment-calculator" faqs={TOOL_CONTENT["personal-wealth/investment-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/investment-calculator" />}
    </ToolLayout>
  )
}
