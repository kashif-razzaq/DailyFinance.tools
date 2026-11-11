import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Student Loan Payoff Calculator: Payoff Date & Interest',
  description: 'Your student loan payoff date and total interest, calculated — plus exactly how much time and money extra payments save you. Free calculator.',
  keywords: ['student loan payoff calculator', 'student loan calculator', 'how long to pay off student loan', 'student loan interest calculator'],
  slug: "personal-wealth/student-loan-payoff-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Student Loan Payoff Calculator" description="Your student loan payoff date and total interest, calculated — plus exactly how much time and money extra payments save you. Free calculator." slug="student-loan-payoff-calculator" faqs={TOOL_CONTENT["personal-wealth/student-loan-payoff-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/student-loan-payoff-calculator" />}
    </ToolLayout>
  )
}
