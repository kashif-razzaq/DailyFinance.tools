import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Debt-to-Income (DTI) Calculator – Free, Instant Results (2026)', description: "Debt-to-Income (DTI) Calculator: your DTI ratio and whether you’ll qualify for a mortgage. Free, instant results with worked examples and FAQs.", keywords: ['debt to income ratio calculator', 'dti calculator', 'debt to income calculator', 'mortgage dti calculator'], slug: "loans/debt-to-income-ratio-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Debt-to-Income Ratio Calculator" description="Debt-to-Income (DTI) Calculator: your DTI ratio and whether you’ll qualify for a mortgage. Free, instant results with worked examples and FAQs." slug="debt-to-income-ratio-calculator" faqs={TOOL_CONTENT["loans/debt-to-income-ratio-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/debt-to-income-ratio-calculator" />}
    </ToolLayout>
  )
}
