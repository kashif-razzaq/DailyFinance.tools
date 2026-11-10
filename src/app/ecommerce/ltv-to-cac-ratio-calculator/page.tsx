import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "LTV:CAC Ratio Calculator: Lifetime Value on Gross Profit, Not Revenue",
  description: "Customer lifetime value from AOV, purchase frequency, lifespan and gross margin — plus your LTV:CAC ratio, verdict band and CAC payback period.",
  keywords: ["ltv to cac ratio calculator", "ltv cac calculator", "customer lifetime value calculator ecommerce", "cac payback period", "what is a good ltv cac ratio"],
  slug: "ecommerce/ltv-to-cac-ratio-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="LTV to CAC Ratio Calculator" description="Customer lifetime value from AOV, purchase frequency, lifespan and gross margin — plus your LTV:CAC ratio, verdict band and CAC payback period." slug="ltv-to-cac-ratio-calculator" faqs={TOOL_CONTENT["ecommerce/ltv-to-cac-ratio-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/ltv-to-cac-ratio-calculator" />}
    </ToolLayout>
  )
}
