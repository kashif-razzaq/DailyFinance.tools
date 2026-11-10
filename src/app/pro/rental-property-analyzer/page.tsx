import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: "Rental Property Analyzer – Cash Flow, Cap Rate, DSCR (Pro)", description: "Analyze any rental deal in one pass: monthly cash flow, cap rate, cash-on-cash return, DSCR and GRM with every expense line modelled. A DailyFinance Pro tool.", keywords: ['rental property analyzer', 'rental property calculator', 'cap rate calculator', 'cash on cash return'], slug: "pro/rental-property-analyzer", category: "Pro Tools" });

export default function Page() {
  return (
    <ToolLayout title="Rental Property Analyzer" description="Analyze any rental deal in one pass: monthly cash flow, cap rate, cash-on-cash return, DSCR and GRM with every expense line modelled. A DailyFinance Pro tool." slug="rental-property-analyzer" faqs={TOOL_CONTENT["pro/rental-property-analyzer"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="pro/rental-property-analyzer" />}
    </ToolLayout>
  )
}
