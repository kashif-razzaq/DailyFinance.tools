import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Free Client Lifetime Value (LTV) Calculator",
  description: "Calculate your exact Client Lifetime Value (LTV) and Customer Acquisition Cost (CAC) limits to scale your freelance or agency business profitably.",
  keywords: ["client ltv calculator", "freelance customer lifetime value", "agency ltv to cac ratio", "retainer ltv calculator", "freelance client retention", "customer acquisition cost freelancer", "gross margin agency"],
  slug: "freelance/client-lifetime-value-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Free Client Lifetime Value (LTV) Calculator" description="Calculate your exact Client Lifetime Value (LTV) and Customer Acquisition Cost (CAC) limits to scale your freelance or agency business profitably." slug="client-lifetime-value-calculator" faqs={TOOL_CONTENT["freelance/client-lifetime-value-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/client-lifetime-value-calculator" />}
    </ToolLayout>
  )
}
