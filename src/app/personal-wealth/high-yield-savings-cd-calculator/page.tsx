import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'High-Yield Savings & CD Calculator: HYSA vs CD Earnings Compared',
  description: 'High-yield savings vs a CD on the same deposit: earnings, after-tax returns and total value side by side, any compounding frequency. Free tool.',
  keywords: ['high yield savings calculator', 'cd calculator', 'hysa vs cd', 'savings interest calculator'],
  slug: "personal-wealth/high-yield-savings-cd-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="High-Yield Savings & CD Calculator" description="High-yield savings vs a CD on the same deposit: earnings, after-tax returns and total value side by side, any compounding frequency. Free tool." slug="high-yield-savings-cd-calculator" faqs={TOOL_CONTENT["personal-wealth/high-yield-savings-cd-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/high-yield-savings-cd-calculator" />}
    </ToolLayout>
  )
}
