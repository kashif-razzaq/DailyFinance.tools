import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Shopify Profit Calculator: True Margin After Fees, COGS & Shipping",
  description: "Calculate your true Shopify profit per order after COGS, Shopify Payments fees (2.9% + $0.30), shipping and apps. See real margin and monthly profit, not gross margin.",
  keywords: ["shopify margin calculator", "shopify profit calculator", "shopify fee calculator", "true profit per order shopify", "ecommerce margin calculator"],
  slug: "ecommerce/shopify-margin-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Shopify Margin Calculator" description="Calculate your true Shopify profit per order after COGS, Shopify Payments fees (2.9% + $0.30), shipping and apps. See real margin and monthly profit, not gross margin." slug="shopify-margin-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Shopify Margin Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
