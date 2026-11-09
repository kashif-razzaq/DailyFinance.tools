import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Retirement Calculator – Free, Instant Results (2026)', description: "Use our free Retirement Calculator to find if you're on track and how much you need to retire. Instant results with formula, worked examples and FAQs. No signup required.", keywords: ['retirement calculator','how much do I need to retire','retirement savings calculator','retirement planning calculator'], slug: "personal-wealth/retirement-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Retirement Calculator" description="Use our free Retirement Calculator to find if you're on track and how much you need to retire. Instant results with formula, worked examples and FAQs. No signup required." slug="retirement-calculator" faqs={TOOL_CONTENT["personal-wealth/retirement-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/retirement-calculator" />}
    </ToolLayout>
  )
}
