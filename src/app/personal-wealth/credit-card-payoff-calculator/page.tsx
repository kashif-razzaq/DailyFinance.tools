import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Credit Card Payoff Calculator: Debt-Free Date & Interest Saved',
  description: 'When will you be credit-card debt-free? Fixed payment vs the minimum-payment trap: debt-free date and total interest, compared. Free calculator.',
  keywords: ['credit card payoff calculator', 'credit card debt payoff', 'minimum payment calculator', 'how long to pay off credit card'],
  slug: "personal-wealth/credit-card-payoff-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Credit Card Payoff Calculator" description="When will you be credit-card debt-free? Fixed payment vs the minimum-payment trap: debt-free date and total interest, compared. Free calculator." slug="credit-card-payoff-calculator" faqs={TOOL_CONTENT["personal-wealth/credit-card-payoff-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/credit-card-payoff-calculator" />}
    </ToolLayout>
  )
}
