import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Future Value Calculator: Lump Sums & Payment Series', description: 'The future value of a lump sum or a series of payments at any rate and term — with growth shown year by year.', keywords: ['future value calculator','future value of annuity','fv calculator','future value formula'], slug: "personal-wealth/future-value-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Future Value Calculator" description="The future value of a lump sum or a series of payments at any rate and term — with growth shown year by year." slug="future-value-calculator" faqs={TOOL_CONTENT["personal-wealth/future-value-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/future-value-calculator" />}
    </ToolLayout>
  )
}
