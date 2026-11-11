import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Take-Home Pay Calculator: Your Pay After All Deductions', description: 'Your real take-home pay after all deductions — federal and state tax, Social Security and Medicare, per paycheck and per year.', keywords: ['take home pay calculator', 'net pay calculator', 'after tax salary calculator', 'take-home salary calculator'], slug: "tax/take-home-pay-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Take-Home Pay Calculator" description="Your real take-home pay after all deductions — federal and state tax, Social Security and Medicare, per paycheck and per year." slug="take-home-pay-calculator" faqs={TOOL_CONTENT["tax/take-home-pay-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/take-home-pay-calculator" />}
    </ToolLayout>
  )
}
