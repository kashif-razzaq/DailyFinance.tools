import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'RMD Calculator – Free, Instant Results (2026)', description: 'Use our free RMD Calculator to calculate your required minimum distribution by age. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['rmd calculator', 'required minimum distribution calculator', 'irs rmd table', 'rmd by age'], slug: "personal-wealth/rmd-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="RMD Calculator" description="Use our free RMD Calculator to calculate your required minimum distribution by age. Instant results with formula, worked examples and FAQs. No signup required." slug="rmd-calculator" faqs={TOOL_CONTENT["personal-wealth/rmd-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/rmd-calculator" />}
    </ToolLayout>
  )
}
