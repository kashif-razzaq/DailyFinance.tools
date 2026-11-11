import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: '1099 Tax Calculator: Total Tax & Take-Home Pay', description: 'Total 1099 tax and take-home in one place: federal, state and self-employment tax on your freelance income, with deductions applied.', keywords: ['1099 tax calculator', 'self employment tax calculator', '1099 calculator', 'quarterly tax calculator'], slug: "freelance/1099-tax-calculator", category: "Freelance" });

export default function Page() {
  return (
    <ToolLayout title="1099 Tax Calculator" description="Total 1099 tax and take-home in one place: federal, state and self-employment tax on your freelance income, with deductions applied." slug="1099-tax-calculator" faqs={TOOL_CONTENT["freelance/1099-tax-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/1099-tax-calculator" />}
    </ToolLayout>
  )
}
