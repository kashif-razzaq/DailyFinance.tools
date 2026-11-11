import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Income Tax Calculator: Federal & State by Bracket', description: 'Federal and state income tax by bracket: your marginal and effective rates, take-home pay and exactly where each dollar goes.', keywords: ['income tax calculator', 'federal and state tax calculator', 'tax burden calculator', 'effective tax rate calculator'], slug: "tax/income-tax-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Income Tax Calculator" description="Federal and state income tax by bracket: your marginal and effective rates, take-home pay and exactly where each dollar goes." slug="income-tax-calculator" faqs={TOOL_CONTENT["tax/income-tax-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/income-tax-calculator" />}
    </ToolLayout>
  )
}
