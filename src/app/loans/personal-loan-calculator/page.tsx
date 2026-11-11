import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Personal Loan Calculator: Payment, Total Cost & Payoff Date', description: 'Personal loan payments and total cost for any amount, rate and term — with the payoff date and how much interest extra payments save you.', keywords: ['personal loan calculator', 'personal loan payment calculator', 'personal loan interest calculator'], slug: "loans/personal-loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Personal Loan Calculator" description="Personal loan payments and total cost for any amount, rate and term — with the payoff date and how much interest extra payments save you." slug="personal-loan-calculator" faqs={TOOL_CONTENT["loans/personal-loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/personal-loan-calculator" />}
    </ToolLayout>
  )
}
