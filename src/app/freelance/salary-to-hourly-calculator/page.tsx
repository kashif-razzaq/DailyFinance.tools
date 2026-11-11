import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Salary to Hourly Calculator: Convert Pay Both Ways', description: 'Convert any salary to its hourly rate and back: weekly, fortnightly, monthly and yearly equivalents on one screen.', keywords: ['salary to hourly calculator', 'hourly to salary calculator', 'salary converter', 'annual salary to hourly'], slug: "freelance/salary-to-hourly-calculator", category: "Freelance" });

export default function Page() {
  return (
    <ToolLayout title="Salary to Hourly Calculator" description="Convert any salary to its hourly rate and back: weekly, fortnightly, monthly and yearly equivalents on one screen." slug="salary-to-hourly-calculator" faqs={TOOL_CONTENT["freelance/salary-to-hourly-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/salary-to-hourly-calculator" />}
    </ToolLayout>
  )
}
