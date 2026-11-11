import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Down Payment Calculator: Amount & Time to Save It', description: 'Your down payment at any percentage and the time to save it — and what changes at the 20% mark for PMI and loan size.', keywords: ['down payment calculator', 'how much down payment for a house', 'down payment savings calculator'], slug: "real-estate/down-payment-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Down Payment Calculator" description="Your down payment at any percentage and the time to save it — and what changes at the 20% mark for PMI and loan size." slug="down-payment-calculator" faqs={TOOL_CONTENT["real-estate/down-payment-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/down-payment-calculator" />}
    </ToolLayout>
  )
}
