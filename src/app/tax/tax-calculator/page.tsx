import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Tax Calculator: Estimate Your Refund or Amount Owed', description: 'Estimate your federal tax, refund or amount owed: income, filing status and deductions through the real bracket maths.', keywords: ['tax calculator', 'federal tax calculator', 'income tax estimator', 'tax refund calculator'], slug: "tax/tax-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Tax Calculator" description="Estimate your federal tax, refund or amount owed: income, filing status and deductions through the real bracket maths." slug="tax-calculator" faqs={TOOL_CONTENT["tax/tax-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/tax-calculator" />}
    </ToolLayout>
  )
}
