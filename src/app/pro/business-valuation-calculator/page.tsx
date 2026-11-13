import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: "Business Valuation Calculator – SDE Multiples + DCF (Pro)", description: "Value a small business two ways: SDE multiples for seven industries and a full DCF with terminal value, side by side. A DailyFinance Pro tool.", keywords: ['business valuation calculator', 'sde valuation', 'how much is my business worth', 'dcf valuation'], slug: "pro/business-valuation-calculator", category: "Pro Tools" });

export default function Page() {
  return (
    <ToolLayout title="Business Valuation Calculator" description="Value a small business two ways: SDE multiples for seven industries and a full DCF with terminal value, side by side. A DailyFinance Pro tool." slug="business-valuation-calculator" faqs={TOOL_CONTENT["pro/business-valuation-calculator"]?.faqs ?? []} calculator={(isPro, isLoggedIn) => <CalculatorClient isPro={isPro} isLoggedIn={isLoggedIn} />}>
      {() => <ToolContent contentKey="pro/business-valuation-calculator" />}
    </ToolLayout>
  )
}
