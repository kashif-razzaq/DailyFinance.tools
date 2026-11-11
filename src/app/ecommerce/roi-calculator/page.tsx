import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'ROI Calculator: Return on Any Spend or Project', description: 'Return on investment for any spend or project: ROI percentage, total gain and annualized return, with the formula worked through.', keywords: ['roi calculator', 'return on investment calculator', 'investment return calculator', 'annualized roi'], slug: "ecommerce/roi-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="ROI Calculator" description="Return on investment for any spend or project: ROI percentage, total gain and annualized return, with the formula worked through." slug="roi-calculator" faqs={TOOL_CONTENT["ecommerce/roi-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/roi-calculator" />}
    </ToolLayout>
  )
}
