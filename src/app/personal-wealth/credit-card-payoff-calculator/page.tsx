import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Credit Card Payoff Calculator: Debt-Free Date & Interest Saved',
  description: 'See when you will be credit-card debt-free with a fixed payment, the total interest, and how the minimum-payment trap compares. Free credit card payoff calculator.',
  keywords: ['credit card payoff calculator', 'credit card debt payoff', 'minimum payment calculator', 'how long to pay off credit card'],
  slug: "personal-wealth/credit-card-payoff-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Credit Card Payoff Calculator" description="See when you will be credit-card debt-free with a fixed payment, the total interest, and how the minimum-payment trap compares. Free credit card payoff calculator." slug="credit-card-payoff-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Credit Card Payoff Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
