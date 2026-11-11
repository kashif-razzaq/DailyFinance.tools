import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Salary Calculator: Hourly, Weekly, Monthly & Take-Home', description: 'Convert salary to hourly, weekly, monthly and take-home pay — every equivalent on one screen, after-tax estimates included.', keywords: ['salary calculator', 'salary to hourly calculator', 'annual salary calculator', 'pay calculator'], slug: "tax/salary-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Salary Calculator" description="Convert salary to hourly, weekly, monthly and take-home pay — every equivalent on one screen, after-tax estimates included." slug="salary-calculator" faqs={TOOL_CONTENT["tax/salary-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/salary-calculator" />}
    </ToolLayout>
  )
}
