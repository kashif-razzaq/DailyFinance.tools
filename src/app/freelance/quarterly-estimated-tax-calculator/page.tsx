import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Quarterly Estimated Tax Calculator: Free 1099 Tax Estimator",
  description: "Calculate your 1099 quarterly estimated taxes instantly. Supports 2026 IRS federal brackets, self-employment tax, QBI deduction, and state taxes.",
  keywords: ["quarterly estimated taxes calculator", "1099 tax calculator", "self employment tax calculator", "how to calculate estimated taxes", "freelance tax calculator", "2026 tax brackets", "safe harbor rule", "underpayment penalty"],
  slug: "freelance/quarterly-estimated-tax-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Quarterly Estimated Tax Calculator" description="Calculate your 1099 quarterly estimated taxes instantly. Supports 2026 IRS federal brackets, self-employment tax, QBI deduction, and state taxes." slug="quarterly-estimated-tax-calculator" faqs={TOOL_CONTENT["freelance/quarterly-estimated-tax-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/quarterly-estimated-tax-calculator" />}
    </ToolLayout>
  )
}
