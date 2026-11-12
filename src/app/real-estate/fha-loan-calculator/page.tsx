import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'FHA Loan Calculator: Payment, MIP & Limits', description: 'Your FHA monthly payment with both MIP charges — upfront 1.75% and annual MIP — plus taxes, insurance and the 2026 loan-limit check.', keywords: ['fha loan calculator', 'fha mip calculator', 'fha mortgage calculator', 'fha loan payment calculator'], slug: "real-estate/fha-loan-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="FHA Loan Calculator" description="Your FHA monthly payment with both MIP charges — upfront 1.75% and annual MIP — plus taxes, insurance and the 2026 loan-limit check." slug="fha-loan-calculator" faqs={TOOL_CONTENT["real-estate/fha-loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/fha-loan-calculator" />}
    </ToolLayout>
  )
}
