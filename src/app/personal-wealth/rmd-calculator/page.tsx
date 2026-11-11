import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'RMD Calculator: Required Minimum Distribution by Age', description: 'Your required minimum distribution by age: the IRS life-expectancy divisor, the exact RMD on your balance, and the age rules behind it.', keywords: ['rmd calculator', 'required minimum distribution calculator', 'irs rmd table', 'rmd by age'], slug: "personal-wealth/rmd-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="RMD Calculator" description="Your required minimum distribution by age: the IRS life-expectancy divisor, the exact RMD on your balance, and the age rules behind it." slug="rmd-calculator" faqs={TOOL_CONTENT["personal-wealth/rmd-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/rmd-calculator" />}
    </ToolLayout>
  )
}
