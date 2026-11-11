import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Profit Margin Calculator: Margin, Markup & Price', description: 'Profit margin, markup and selling price from any cost and revenue — gross and net, per unit and overall, with the formulas shown.', keywords: ['profit margin calculator', 'margin calculator', 'gross margin calculator', 'markup calculator'], slug: "ecommerce/profit-margin-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="Profit Margin Calculator" description="Profit margin, markup and selling price from any cost and revenue — gross and net, per unit and overall, with the formulas shown." slug="profit-margin-calculator" faqs={TOOL_CONTENT["ecommerce/profit-margin-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/profit-margin-calculator" />}
    </ToolLayout>
  )
}
