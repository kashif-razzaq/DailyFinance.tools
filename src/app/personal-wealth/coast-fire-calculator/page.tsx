import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Coast FIRE Calculator: Find Your Coast Number & Coast Age',
  description: 'Coast FIRE Calculator: the exact amount to invest today so compounding carries you to full retirement with no further contributions. Free tool.',
  keywords: ['coast fire calculator', 'coast fi number', 'when can i stop saving for retirement', 'fire calculator'],
  slug: "personal-wealth/coast-fire-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Coast FIRE Calculator" description="Coast FIRE Calculator: the exact amount to invest today so compounding carries you to full retirement with no further contributions. Free tool." slug="coast-fire-calculator" faqs={TOOL_CONTENT["personal-wealth/coast-fire-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/coast-fire-calculator" />}
    </ToolLayout>
  )
}
