import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Roth IRA Conversion Calculator: Tax Now vs Tax-Free Growth',
  description: 'Model a Roth conversion: tax due today, how the money grows tax-free, and whether converting beats keeping a Traditional IRA. Free calculator.',
  keywords: ['roth ira conversion calculator', 'roth conversion tax calculator', 'should i convert to roth', 'backdoor roth calculator'],
  slug: "personal-wealth/roth-ira-conversion-simulator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Roth IRA Conversion Calculator" description="Model a Roth conversion: tax due today, how the money grows tax-free, and whether converting beats keeping a Traditional IRA. Free calculator." slug="roth-ira-conversion-simulator" faqs={TOOL_CONTENT["personal-wealth/roth-ira-conversion-simulator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/roth-ira-conversion-simulator" />}
    </ToolLayout>
  )
}
