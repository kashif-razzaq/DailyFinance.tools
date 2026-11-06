import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Amazon FBA Calculator: Profit After Referral, FBA & Storage Fees",
  description: "Calculate true Amazon FBA profit per unit: price minus COGS, category referral fee (8–20%), FBA fulfilment fee by size tier, storage and inbound shipping.",
  keywords: ["amazon fba calculator", "fba fee calculator", "amazon referral fee calculator", "fba profit calculator", "amazon seller fees"],
  slug: "ecommerce/amazon-fba-fee-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Amazon FBA Fee Calculator" description="Calculate true Amazon FBA profit per unit: price minus COGS, category referral fee (8–20%), FBA fulfilment fee by size tier, storage and inbound shipping." slug="amazon-fba-fee-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Amazon FBA Fee Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
