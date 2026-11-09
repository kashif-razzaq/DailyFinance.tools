import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "AOV Calculator: Order Bump & Upsell Revenue Impact Simulator",
  description: "Simulate a post-purchase order bump: new AOV, extra monthly revenue and profit from a bump price and take rate — revenue that costs zero extra ad spend.",
  keywords: ["aov calculator", "average order value calculator", "order bump calculator", "upsell simulator", "increase aov calculator"],
  slug: "ecommerce/aov-upsell-simulator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="AOV Upsell Simulator" description="Simulate a post-purchase order bump: new AOV, extra monthly revenue and profit from a bump price and take rate — revenue that costs zero extra ad spend." slug="aov-upsell-simulator" faqs={TOOL_CONTENT["ecommerce/aov-upsell-simulator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/aov-upsell-simulator" />}
    </ToolLayout>
  )
}
