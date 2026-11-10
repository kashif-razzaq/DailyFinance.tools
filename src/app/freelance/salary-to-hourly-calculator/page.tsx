import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Salary to Hourly Calculator – Free, Instant Results (2026)', description: 'Use our free Salary to Hourly Calculator to convert any salary to an hourly rate and back instantly. Free, instant results with worked examples and FAQs.', keywords: ['salary to hourly calculator', 'hourly to salary calculator', 'salary converter', 'annual salary to hourly'], slug: "freelance/salary-to-hourly-calculator", category: "Freelance" });

export default function Page() {
  return (
    <ToolLayout title="Salary to Hourly Calculator" description="Use our free Salary to Hourly Calculator to convert any salary to an hourly rate and back instantly. Free, instant results with worked examples and FAQs." slug="salary-to-hourly-calculator" faqs={TOOL_CONTENT["freelance/salary-to-hourly-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/salary-to-hourly-calculator" />}
    </ToolLayout>
  )
}
