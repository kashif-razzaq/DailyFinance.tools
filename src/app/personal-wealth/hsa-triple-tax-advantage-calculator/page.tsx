import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HSA Calculator: Triple Tax Advantage & 2026 Limits',
  description: 'The triple tax advantage of an HSA, estimated: tax saved on contributions, FICA and growth, your projected balance and 2026 limits. Free calculator.',
  keywords: ['hsa calculator', 'hsa triple tax advantage', 'hsa contribution limits 2026', 'health savings account calculator'],
  slug: "personal-wealth/hsa-triple-tax-advantage-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="HSA Calculator" description="The triple tax advantage of an HSA, estimated: tax saved on contributions, FICA and growth, your projected balance and 2026 limits. Free calculator." slug="hsa-triple-tax-advantage-calculator" faqs={TOOL_CONTENT["personal-wealth/hsa-triple-tax-advantage-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/hsa-triple-tax-advantage-calculator" />}
    </ToolLayout>
  )
}
