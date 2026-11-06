import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: '401(k) vs Solo 401(k) Calculator: 2026 Contribution Limits & Growth',
  description: 'Compare a W-2 401(k) with employer match against a Solo 401(k) with profit-sharing. See 2026 contribution limits and projected balances side by side. Free tool.',
  keywords: ['401k vs solo 401k calculator', 'solo 401k contribution limits 2026', 'solo 401k calculator', '401k contribution limits 2026'],
  slug: "personal-wealth/401k-vs-solo-401k-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="401(k) vs Solo 401(k) Calculator" description="Compare a W-2 401(k) with employer match against a Solo 401(k) with profit-sharing. See 2026 contribution limits and projected balances side by side. Free tool." slug="401k-vs-solo-401k-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="401(k) vs Solo 401(k) Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
