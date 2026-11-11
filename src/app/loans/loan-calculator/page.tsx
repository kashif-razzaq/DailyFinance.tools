import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Loan Calculator: Payment, Interest & Schedule', description: 'Any loan payment, total interest and full amortization schedule — for personal, auto, business and mortgage loans at any rate and term.', keywords: ['loan calculator', 'loan payment calculator', 'loan interest calculator', 'amortization calculator'], slug: "loans/loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Loan Calculator" description="Any loan payment, total interest and full amortization schedule — for personal, auto, business and mortgage loans at any rate and term." slug="loan-calculator" faqs={TOOL_CONTENT["loans/loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/loan-calculator" />}
    </ToolLayout>
  )
}
