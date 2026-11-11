import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Closing Cost Calculator: Buyer & Seller Cash to Close', description: 'Buyer and seller closing costs and cash to close, estimated line by line — lender fees, title, escrow, taxes and prepaid items.', keywords: ['closing costs calculator', 'closing cost calculator', 'cash to close calculator', 'estimate closing costs'], slug: "real-estate/closing-cost-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Closing Cost Calculator" description="Buyer and seller closing costs and cash to close, estimated line by line — lender fees, title, escrow, taxes and prepaid items." slug="closing-cost-calculator" faqs={TOOL_CONTENT["real-estate/closing-cost-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/closing-cost-calculator" />}
    </ToolLayout>
  )
}
