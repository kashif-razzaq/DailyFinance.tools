import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: '401(k) vs Solo 401(k): 2026 Limits & Balances',
  description: 'W-2 401(k) with employer match vs Solo 401(k) with profit-sharing: 2026 contribution limits and projected balances, side by side. Free tool.',
  keywords: ['401k vs solo 401k calculator', 'solo 401k contribution limits 2026', 'solo 401k calculator', '401k contribution limits 2026'],
  slug: "personal-wealth/401k-vs-solo-401k-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="401(k) vs Solo 401(k) Calculator" description="W-2 401(k) with employer match vs Solo 401(k) with profit-sharing: 2026 contribution limits and projected balances, side by side. Free tool." slug="401k-vs-solo-401k-calculator" faqs={TOOL_CONTENT["personal-wealth/401k-vs-solo-401k-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/401k-vs-solo-401k-calculator" />}
    </ToolLayout>
  )
}
