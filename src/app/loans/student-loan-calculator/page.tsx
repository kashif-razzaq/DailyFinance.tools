import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Student Loan Calculator: Payoff, IDR & Refinance', description: 'Student loan payoff, IDR payments and refinance savings in one place — standard plan totals, income-driven estimates and payoff dates.', keywords: ['student loan calculator', 'student loan payment calculator', 'student loan repayment calculator'], slug: "loans/student-loan-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Student Loan Calculator" description="Student loan payoff, IDR payments and refinance savings in one place — standard plan totals, income-driven estimates and payoff dates." slug="student-loan-calculator" faqs={TOOL_CONTENT["loans/student-loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/student-loan-calculator" />}
    </ToolLayout>
  )
}
