import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Compound Interest Calculator: Growth With Monthly Contributions',
  description: 'Use our free compound interest calculator to project any lump sum plus monthly contributions, see total interest earned and a year-by-year growth table. Instant results.',
  keywords: ['compound interest calculator', 'compound growth calculator', 'investment growth calculator', 'interest calculator with monthly contributions'],
  slug: "personal-wealth/compound-interest-scaler-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Compound Interest Calculator" description="Use our free compound interest calculator to project any lump sum plus monthly contributions, see total interest earned and a year-by-year growth table. Instant results." slug="compound-interest-scaler-calculator" faqs={TOOL_CONTENT["personal-wealth/compound-interest-scaler-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/compound-interest-scaler-calculator" />}
    </ToolLayout>
  )
}
