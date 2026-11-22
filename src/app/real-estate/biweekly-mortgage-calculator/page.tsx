import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Biweekly Mortgage Calculator: Interest Saved & Payoff Date', description: 'Pay half your mortgage every two weeks and see interest saved and years cut: $300,000 at 6.5% saves $88,122 and clears 5 years 10 months early.', keywords: ['biweekly mortgage calculator', 'bi-weekly mortgage calculator', 'biweekly mortgage payment calculator', 'pay mortgage biweekly', 'extra mortgage payment calculator'], slug: "real-estate/biweekly-mortgage-calculator", category: "Mortgage & Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Biweekly Mortgage Calculator" description="Pay half your mortgage every two weeks and see the payoff date, interest saved and years cut — plus the free way to copy it without a servicer fee." slug="biweekly-mortgage-calculator" faqs={TOOL_CONTENT["real-estate/biweekly-mortgage-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/biweekly-mortgage-calculator" />}
    </ToolLayout>
  )
}
