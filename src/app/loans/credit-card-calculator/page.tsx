import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Credit Card Calculator: The Cost of Minimum Payments', description: 'The true cost of minimum payments: how long a balance really takes to clear and how much interest you hand over on the way.', keywords: ['credit card calculator', 'credit card payment calculator', 'minimum payment calculator', 'credit card interest calculator'], slug: "loans/credit-card-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Credit Card Calculator" description="The true cost of minimum payments: how long a balance really takes to clear and how much interest you hand over on the way." slug="credit-card-calculator" faqs={TOOL_CONTENT["loans/credit-card-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/credit-card-calculator" />}
    </ToolLayout>
  )
}
