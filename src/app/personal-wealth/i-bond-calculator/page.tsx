import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'I Bond Calculator: Value, Interest & the 5.51% Rate', description: 'A $10,000 I bond at the November 2026 rate of 5.51% grows to $13,122.89 in 5 years — $3,122.89 of interest. See your bond value, the 3-month early-redemption penalty and the $10,000 annual limit.', keywords: ['i bond calculator', 'series i bond calculator', 'i bond interest calculator', 'i bond rates 2026', 'treasury i bond calculator', 'i bond vs savings account'], slug: "personal-wealth/i-bond-calculator", category: "Personal Finance" });

export default function Page() {
  return (
    <ToolLayout title="I Bond Calculator" description="Work out what a Series I savings bond is worth: the 5.51% composite rate, semiannual compounding, the $10,000 annual limit, the 12-month lockup and the 3-month penalty for cashing in before 5 years." slug="i-bond-calculator" faqs={TOOL_CONTENT["personal-wealth/i-bond-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/i-bond-calculator" />}
    </ToolLayout>
  )
}
