import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'High-Yield Savings Calculator – Free, Instant Results (2026)', description: 'Use our free High-Yield Savings Calculator to compare HYSA earnings vs a regular savings account. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['high yield savings calculator','hysa calculator','high yield savings account calculator','savings account comparison'], slug: "personal-wealth/high-yield-savings-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="High-Yield Savings Calculator" description="Use our free High-Yield Savings Calculator to compare HYSA earnings vs a regular savings account. Instant results with formula, worked examples and FAQs. No signup required." slug="high-yield-savings-calculator" faqs={TOOL_CONTENT["personal-wealth/high-yield-savings-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/high-yield-savings-calculator" />}
    </ToolLayout>
  )
}
