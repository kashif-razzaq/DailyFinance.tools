import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'APR Calculator: The True APR Including Fees', description: 'The true APR including fees on any loan or credit card — the rate lenders must disclose, and the one that decides what you really pay.', keywords: ['apr calculator', 'annual percentage rate calculator', 'loan apr calculator', 'true apr calculator'], slug: "loans/apr-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="APR Calculator" description="The true APR including fees on any loan or credit card — the rate lenders must disclose, and the one that decides what you really pay." slug="apr-calculator" faqs={TOOL_CONTENT["loans/apr-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/apr-calculator" />}
    </ToolLayout>
  )
}
