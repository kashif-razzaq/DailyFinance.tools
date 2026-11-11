import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Rule of 72 Calculator: How Fast Your Money Doubles', description: 'How fast your money doubles at any return — the Rule of 72 estimate checked against exact compounding, year by year.', keywords: ['rule of 72 calculator','how long to double money','doubling time calculator','72 rule'], slug: "personal-wealth/rule-of-72-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Rule of 72 Calculator" description="How fast your money doubles at any return — the Rule of 72 estimate checked against exact compounding, year by year." slug="rule-of-72-calculator" faqs={TOOL_CONTENT["personal-wealth/rule-of-72-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/rule-of-72-calculator" />}
    </ToolLayout>
  )
}
