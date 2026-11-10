import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rental Property Calculator: Cash Flow, Cap Rate & Cash-on-Cash',
  description: 'Rental property cash flow, cap rate and cash-on-cash return: full PITI, vacancy, maintenance and management reserves — no flattering omissions.',
  keywords: ['rental property calculator', 'rental cash flow calculator', 'cap rate calculator', 'cash on cash return calculator', 'rental roi calculator'],
  slug: "real-estate/rental-cash-flow-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="Rental Property & Cash Flow Calculator" description="Rental property cash flow, cap rate and cash-on-cash return: full PITI, vacancy, maintenance and management reserves — no flattering omissions." slug="rental-cash-flow-calculator" faqs={TOOL_CONTENT["real-estate/rental-cash-flow-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/rental-cash-flow-calculator" />}
    </ToolLayout>
  )
}
