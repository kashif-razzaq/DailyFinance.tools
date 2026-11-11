import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Capital Gains Tax Calculator: Stocks, Crypto & Property', description: 'Tax on stock, crypto or property gains: short-term vs long-term rates by income, with the holding-period line that changes everything.', keywords: ['capital gains tax calculator', 'long term capital gains tax', 'capital gains calculator', 'stock tax calculator'], slug: "tax/capital-gains-tax-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Capital Gains Tax Calculator" description="Tax on stock, crypto or property gains: short-term vs long-term rates by income, with the holding-period line that changes everything." slug="capital-gains-tax-calculator" faqs={TOOL_CONTENT["tax/capital-gains-tax-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/capital-gains-tax-calculator" />}
    </ToolLayout>
  )
}
