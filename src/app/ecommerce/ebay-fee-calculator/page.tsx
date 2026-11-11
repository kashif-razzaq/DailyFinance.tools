import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'eBay Fee Calculator: Final Value Fees & Real Profit', description: 'eBay final value fees and your real profit on any sale: category rates, promoted listing costs and payment fees, line by line.', keywords: ['ebay fee calculator', 'ebay final value fee calculator', 'ebay profit calculator', 'how much does ebay take'], slug: "ecommerce/ebay-fee-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="eBay Fee Calculator" description="eBay final value fees and your real profit on any sale: category rates, promoted listing costs and payment fees, line by line." slug="ebay-fee-calculator" faqs={TOOL_CONTENT["ecommerce/ebay-fee-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/ebay-fee-calculator" />}
    </ToolLayout>
  )
}
