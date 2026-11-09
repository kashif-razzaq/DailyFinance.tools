import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Mortgage Payment Calculator – Free, Instant Results (2026)', description: 'Use our free Mortgage Payment Calculator to get your exact monthly mortgage payment breakdown. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['mortgage payment calculator', 'monthly mortgage payment calculator', 'PITI calculator', 'mortgage payment breakdown'], slug: "real-estate/mortgage-payment-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Mortgage Payment Calculator" description="Use our free Mortgage Payment Calculator to get your exact monthly mortgage payment breakdown. Instant results with formula, worked examples and FAQs. No signup required." slug="mortgage-payment-calculator" faqs={TOOL_CONTENT["real-estate/mortgage-payment-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/mortgage-payment-calculator" />}
    </ToolLayout>
  )
}
