import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Rent vs Buy Calculator: Which Costs Less Over Your Stay?', description: 'Renting or buying — which costs less over your stay? Total cost of both, including the equity you build and the year buying pulls ahead.', keywords: ['rent vs buy calculator', 'renting vs buying calculator', 'is it better to rent or buy a house'], slug: "real-estate/rent-vs-buy-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Rent vs Buy Calculator" description="Renting or buying — which costs less over your stay? Total cost of both, including the equity you build and the year buying pulls ahead." slug="rent-vs-buy-calculator" faqs={TOOL_CONTENT["real-estate/rent-vs-buy-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/rent-vs-buy-calculator" />}
    </ToolLayout>
  )
}
