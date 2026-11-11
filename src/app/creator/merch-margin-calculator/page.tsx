import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Merch Margin Calculator: Profit per Unit After All Fees",
  description: "Merch profit per unit: selling price minus base and print costs, platform and payment fees, plus shipping net. See margin, markup and monthly profit.",
  keywords: ["merch margin calculator", "merch profit calculator", "print on demand profit calculator", "merch markup calculator", "how to price merch"],
  slug: "creator/merch-margin-calculator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Merch Margin Calculator" description="Merch profit per unit: selling price minus base and print costs, platform and payment fees, plus shipping net. See margin, markup and monthly profit." slug="merch-margin-calculator" faqs={TOOL_CONTENT["creator/merch-margin-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/merch-margin-calculator" />}
    </ToolLayout>
  )
}
