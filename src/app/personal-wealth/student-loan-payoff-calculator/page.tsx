import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Student Loan Payoff Calculator: Payoff Date, Interest & Extra Payments',
  description: 'Calculate your student loan payoff date, total interest and exactly how much time and money extra monthly payments save you. Free student loan payoff calculator.',
  keywords: ['student loan payoff calculator', 'student loan calculator', 'how long to pay off student loan', 'student loan interest calculator'],
  slug: "personal-wealth/student-loan-payoff-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Student Loan Payoff Calculator" description="Calculate your student loan payoff date, total interest and exactly how much time and money extra monthly payments save you. Free student loan payoff calculator." slug="student-loan-payoff-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Student Loan Payoff Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
