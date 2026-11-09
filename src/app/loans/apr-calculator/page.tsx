import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'APR Calculator – Free, Instant Results (2026)', description: 'Use our free APR Calculator to find the true APR including fees on any loan or card. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['apr calculator', 'annual percentage rate calculator', 'loan apr calculator', 'true apr calculator'], slug: "loans/apr-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="APR Calculator" description="Use our free APR Calculator to find the true APR including fees on any loan or card. Instant results with formula, worked examples and FAQs. No signup required." slug="apr-calculator" faqs={TOOL_CONTENT["loans/apr-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/apr-calculator" />}
    </ToolLayout>
  )
}
