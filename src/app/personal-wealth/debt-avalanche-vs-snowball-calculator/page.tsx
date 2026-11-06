import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Debt Avalanche vs Snowball Calculator: Compare Interest & Payoff Dates',
  description: 'Compare debt avalanche vs snowball side by side: enter your debts and see total interest, debt-free date and payoff order for each method. Free, instant results.',
  keywords: ['debt avalanche vs snowball calculator', 'debt payoff calculator', 'avalanche method', 'snowball method', 'fastest way to pay off debt'],
  slug: "personal-wealth/debt-avalanche-vs-snowball-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Debt Avalanche vs Snowball Calculator" description="Compare debt avalanche vs snowball side by side: enter your debts and see total interest, debt-free date and payoff order for each method. Free, instant results." slug="debt-avalanche-vs-snowball-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Debt Avalanche vs Snowball Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
