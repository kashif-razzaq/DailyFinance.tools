import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "1099 vs W2 Calculator: Compare Take-Home Pay & Taxes",
  description: "Compare your exact net take-home pay between a W-2 salary and a 1099 contractor rate. Factor in self-employment taxes, QBI deductions, and lost benefits.",
  keywords: ["w2 vs 1099 paycheck calculator", "1099 vs w2 calculator", "self employment tax calculator", "freelance vs employee calculator", "w2 to 1099 conversion", "contractor hourly rate calculator"],
  slug: "freelance/w2-vs-1099-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="1099 vs W2 Calculator" description="Compare your exact net take-home pay between a W-2 salary and a 1099 contractor rate. Factor in self-employment taxes, QBI deductions, and lost benefits." slug="w2-vs-1099-calculator" faqs={TOOL_CONTENT["freelance/w2-vs-1099-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/w2-vs-1099-calculator" />}
    </ToolLayout>
  )
}
