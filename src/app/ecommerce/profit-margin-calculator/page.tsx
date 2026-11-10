import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Profit Margin Calculator – Free, Instant Results (2026)', description: 'Use our free Profit Margin Calculator to calculate profit margin, markup and selling price instantly. Free, instant results with worked examples and FAQs.', keywords: ['profit margin calculator', 'margin calculator', 'gross margin calculator', 'markup calculator'], slug: "ecommerce/profit-margin-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="Profit Margin Calculator" description="Use our free Profit Margin Calculator to calculate profit margin, markup and selling price instantly. Free, instant results with worked examples and FAQs." slug="profit-margin-calculator" faqs={TOOL_CONTENT["ecommerce/profit-margin-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/profit-margin-calculator" />}
    </ToolLayout>
  )
}
