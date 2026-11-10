import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Capital Gains Tax Calculator – Free, Instant Results (2026)', description: 'Use our free Capital Gains Tax Calculator to calculate tax on stock, crypto or property gains. Free, instant results with worked examples and FAQs.', keywords: ['capital gains tax calculator', 'long term capital gains tax', 'capital gains calculator', 'stock tax calculator'], slug: "tax/capital-gains-tax-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Capital Gains Tax Calculator" description="Use our free Capital Gains Tax Calculator to calculate tax on stock, crypto or property gains. Free, instant results with worked examples and FAQs." slug="capital-gains-tax-calculator" faqs={TOOL_CONTENT["tax/capital-gains-tax-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/capital-gains-tax-calculator" />}
    </ToolLayout>
  )
}
