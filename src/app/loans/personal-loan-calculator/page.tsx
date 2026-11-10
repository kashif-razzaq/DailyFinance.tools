import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Personal Loan Calculator – Free, Instant Results (2026)', description: 'Use our free Personal Loan Calculator to calculate personal loan payments and total cost. Free, instant results with worked examples and FAQs.', keywords: ['personal loan calculator', 'personal loan payment calculator', 'personal loan interest calculator'], slug: "loans/personal-loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Personal Loan Calculator" description="Use our free Personal Loan Calculator to calculate personal loan payments and total cost. Free, instant results with worked examples and FAQs." slug="personal-loan-calculator" faqs={TOOL_CONTENT["loans/personal-loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/personal-loan-calculator" />}
    </ToolLayout>
  )
}
