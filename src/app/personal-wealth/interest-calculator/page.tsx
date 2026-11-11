import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Interest Calculator: Simple & Compound in One Place', description: 'Simple and compound interest in one place: interest earned on any principal, rate and term, with year-by-year growth.', keywords: ['interest calculator','compound interest calculator','simple interest calculator','interest earned calculator'], slug: "personal-wealth/interest-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Interest Calculator" description="Simple and compound interest in one place: interest earned on any principal, rate and term, with year-by-year growth." slug="interest-calculator" faqs={TOOL_CONTENT["personal-wealth/interest-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/interest-calculator" />}
    </ToolLayout>
  )
}
