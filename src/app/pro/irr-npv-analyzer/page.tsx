import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: "IRR & NPV Analyzer – Investment Cash-Flow Analysis (Pro)", description: "Enter any cash-flow series and get NPV, IRR, payback period and profitability index together, with a verdict vs your hurdle rate. A Pro tool.", keywords: ['irr calculator', 'npv calculator', 'internal rate of return', 'net present value'], slug: "pro/irr-npv-analyzer", category: "Pro Tools" });

export default function Page() {
  return (
    <ToolLayout title="IRR & NPV Analyzer" description="Enter any cash-flow series and get NPV, IRR, payback period and profitability index together, with a verdict vs your hurdle rate. A Pro tool." slug="irr-npv-analyzer" faqs={TOOL_CONTENT["pro/irr-npv-analyzer"]?.faqs ?? []} calculator={(isPro, isLoggedIn) => <CalculatorClient isPro={isPro} isLoggedIn={isLoggedIn} />}>
      {() => <ToolContent contentKey="pro/irr-npv-analyzer" />}
    </ToolLayout>
  )
}
