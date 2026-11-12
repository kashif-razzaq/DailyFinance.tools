import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Freelance Emergency Fund Calculator: Your Cash Runway",
  description: "Calculate your ideal freelance emergency fund based on your irregular income volatility, client concentration risk, and essential business expenses.",
  keywords: ["irregular income emergency fund calculator", "freelance income buffer calculator", "cash buffer variable income", "how much emergency fund freelancer", "feast or famine freelancer", "days sales outstanding freelancer"],
  slug: "freelance/freelance-emergency-fund-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Freelance Emergency Fund Calculator" description="Calculate your ideal freelance emergency fund based on your irregular income volatility, client concentration risk, and essential business expenses." slug="freelance-emergency-fund-calculator" faqs={TOOL_CONTENT["freelance/freelance-emergency-fund-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/freelance-emergency-fund-calculator" />}
    </ToolLayout>
  )
}
