import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Paycheck Calculator: Your Take-Home Pay by State (2026)', description: 'Your exact take-home pay by state: federal and state tax, Social Security and Medicare deducted line by line, for any salary or hourly wage.', keywords: ['paycheck calculator', 'take-home pay calculator', 'salary paycheck calculator', 'net pay calculator'], slug: "tax/paycheck-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Paycheck Calculator" description="Your exact take-home pay by state: federal and state tax, Social Security and Medicare deducted line by line, for any salary or hourly wage." slug="paycheck-calculator" faqs={TOOL_CONTENT["tax/paycheck-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/paycheck-calculator" />}
    </ToolLayout>
  )
}
