import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Roth IRA Calculator – Free, Instant Results (2026)', description: 'Use our free Roth IRA Calculator to project tax-free Roth IRA growth to retirement. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['roth ira calculator','roth ira growth calculator','roth ira contribution limits 2026','tax free retirement calculator'], slug: "personal-wealth/roth-ira-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Roth IRA Calculator" description="Use our free Roth IRA Calculator to project tax-free Roth IRA growth to retirement. Instant results with formula, worked examples and FAQs. No signup required." slug="roth-ira-calculator" faqs={TOOL_CONTENT["personal-wealth/roth-ira-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/roth-ira-calculator" />}
    </ToolLayout>
  )
}
