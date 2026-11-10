import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Reorder Point Calculator: When to Reorder + Safety Stock Formula",
  description: "Inventory reorder point from daily sales, lead time and safety stock: know exactly when to reorder, and how much, before you stock out or overstock.",
  keywords: ["reorder point calculator", "inventory reorder point", "safety stock calculator", "when to reorder inventory", "reorder point formula"],
  slug: "ecommerce/inventory-reorder-point-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Inventory Reorder Point Calculator" description="Inventory reorder point from daily sales, lead time and safety stock: know exactly when to reorder, and how much, before you stock out or overstock." slug="inventory-reorder-point-calculator" faqs={TOOL_CONTENT["ecommerce/inventory-reorder-point-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/inventory-reorder-point-calculator" />}
    </ToolLayout>
  )
}
