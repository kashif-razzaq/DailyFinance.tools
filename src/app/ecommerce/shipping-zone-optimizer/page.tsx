import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Shipping Calculator: Flat Rate vs Calculated Shipping by Zone",
  description: "Compare flat-rate vs calculated shipping using your real zone mix and carrier costs. See weighted average shipping cost, profit or loss per order, and far-zone losses.",
  keywords: ["shipping zone calculator", "flat rate vs calculated shipping", "shipping cost calculator ecommerce", "average shipping cost per order", "free shipping threshold calculator"],
  slug: "ecommerce/shipping-zone-optimizer",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Shipping Zone Optimizer" description="Compare flat-rate vs calculated shipping using your real zone mix and carrier costs. See weighted average shipping cost, profit or loss per order, and far-zone losses." slug="shipping-zone-optimizer" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Shipping Zone Optimizer" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
