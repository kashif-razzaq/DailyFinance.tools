import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'eBay Fee Calculator – Free, Instant Results (2026)', description: 'Use our free eBay Fee Calculator to calculate eBay final value fees and your real profit. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['ebay fee calculator', 'ebay final value fee calculator', 'ebay profit calculator', 'how much does ebay take'], slug: "ecommerce/ebay-fee-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="eBay Fee Calculator" description="Use our free eBay Fee Calculator to calculate eBay final value fees and your real profit. Instant results with formula, worked examples and FAQs. No signup required." slug="ebay-fee-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="eBay Fee Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
