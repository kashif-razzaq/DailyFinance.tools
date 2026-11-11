import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Shipping Calculator: Flat Rate vs Calculated by Zone",
  description: "Compare flat-rate vs calculated shipping on your real zone mix and carrier costs: weighted average cost, profit or loss per order, and far-zone losses.",
  keywords: ["shipping zone calculator", "flat rate vs calculated shipping", "shipping cost calculator ecommerce", "average shipping cost per order", "free shipping threshold calculator"],
  slug: "ecommerce/shipping-zone-optimizer",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Shipping Zone Optimizer" description="Compare flat-rate vs calculated shipping on your real zone mix and carrier costs: weighted average cost, profit or loss per order, and far-zone losses." slug="shipping-zone-optimizer" faqs={TOOL_CONTENT["ecommerce/shipping-zone-optimizer"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/shipping-zone-optimizer" />}
    </ToolLayout>
  )
}
