import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Mortgage Recast Calculator: New Payment & Interest Saved', description: 'Pay a lump sum toward principal and see your new payment: $300,000 at 6.5% with a $50,000 lump sum drops from $1,966.66 to $1,638.89 a month and saves $56,200 of interest.', keywords: ['mortgage recast calculator', 'mortgage re-amortization calculator', 'recast mortgage calculator', 'mortgage recast vs refinance', 'lump sum mortgage calculator'], slug: "real-estate/mortgage-recast-calculator", category: "Mortgage & Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Mortgage Recast Calculator" description="Pay a lump sum toward principal and see your new payment, the interest saved and how recasting compares with keeping the same payment — same rate, same payoff date." slug="mortgage-recast-calculator" faqs={TOOL_CONTENT["real-estate/mortgage-recast-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/mortgage-recast-calculator" />}
    </ToolLayout>
  )
}
