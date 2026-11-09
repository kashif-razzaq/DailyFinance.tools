import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Etsy Fee Calculator – Free, Instant Results (2026)', description: 'Use our free Etsy Fee Calculator to calculate Etsy profit after listing, transaction and payment fees. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['etsy fee calculator', 'etsy profit calculator', 'etsy fees 2026', 'how much does etsy take'], slug: "ecommerce/etsy-fee-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="Etsy Fee Calculator" description="Use our free Etsy Fee Calculator to calculate Etsy profit after listing, transaction and payment fees. Instant results with formula, worked examples and FAQs. No signup required." slug="etsy-fee-calculator" faqs={TOOL_CONTENT["ecommerce/etsy-fee-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/etsy-fee-calculator" />}
    </ToolLayout>
  )
}
