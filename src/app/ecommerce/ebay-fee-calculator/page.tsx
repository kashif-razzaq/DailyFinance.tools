import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'eBay Fee Calculator – Free, Instant Results (2026)', description: 'Use our free eBay Fee Calculator to calculate eBay final value fees and your real profit. Free, instant results with worked examples and FAQs.', keywords: ['ebay fee calculator', 'ebay final value fee calculator', 'ebay profit calculator', 'how much does ebay take'], slug: "ecommerce/ebay-fee-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="eBay Fee Calculator" description="Use our free eBay Fee Calculator to calculate eBay final value fees and your real profit. Free, instant results with worked examples and FAQs." slug="ebay-fee-calculator" faqs={TOOL_CONTENT["ecommerce/ebay-fee-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/ebay-fee-calculator" />}
    </ToolLayout>
  )
}
