import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Shopify Profit Calculator: True Margin After Fees",
  description: "Your true Shopify profit per order after COGS, Shopify Payments fees (2.9% + $0.30), shipping and apps. Real margin and monthly profit, not gross margin.",
  keywords: ["shopify margin calculator", "shopify profit calculator", "shopify fee calculator", "true profit per order shopify", "ecommerce margin calculator"],
  slug: "ecommerce/shopify-margin-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Shopify Margin Calculator" description="Your true Shopify profit per order after COGS, Shopify Payments fees (2.9% + $0.30), shipping and apps. Real margin and monthly profit, not gross margin." slug="shopify-margin-calculator" faqs={TOOL_CONTENT["ecommerce/shopify-margin-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/shopify-margin-calculator" />}
    </ToolLayout>
  )
}
