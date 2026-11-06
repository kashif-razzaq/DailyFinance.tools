import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'High-Yield Savings & CD Calculator: HYSA vs CD Earnings Compared',
  description: 'Compare a high-yield savings account vs a CD on the same deposit: earnings, after-tax returns and total value side by side, with any compounding frequency. Free tool.',
  keywords: ['high yield savings calculator', 'cd calculator', 'hysa vs cd', 'savings interest calculator'],
  slug: "personal-wealth/high-yield-savings-cd-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="High-Yield Savings & CD Calculator" description="Compare a high-yield savings account vs a CD on the same deposit: earnings, after-tax returns and total value side by side, with any compounding frequency. Free tool." slug="high-yield-savings-cd-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="High-Yield Savings & CD Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
