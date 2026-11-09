import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "CAC Calculator: Blended vs Paid Customer Acquisition Cost",
  description: "Calculate blended CAC and paid CAC for your store. Compare acquisition cost with first order value and learn why the two numbers tell different stories.",
  keywords: ["cac calculator", "customer acquisition cost calculator", "blended cac", "paid cac", "how to calculate cac"],
  slug: "ecommerce/customer-acquisition-cost-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Customer Acquisition Cost Calculator" description="Calculate blended CAC and paid CAC for your store. Compare acquisition cost with first order value and learn why the two numbers tell different stories." slug="customer-acquisition-cost-calculator" faqs={TOOL_CONTENT["ecommerce/customer-acquisition-cost-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/customer-acquisition-cost-calculator" />}
    </ToolLayout>
  )
}
