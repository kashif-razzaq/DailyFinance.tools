import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Black Friday Discount Calculator: Volume Needed to Keep Profit",
  description: "Does your Black Friday discount make money? Discounted margin, profit per unit, and the exact volume uplift needed just to match a normal period.",
  keywords: ["black friday discount calculator", "discount roi calculator", "sale discount profit calculator", "how much volume to break even on a discount", "discount margin calculator"],
  slug: "ecommerce/black-friday-discount-roi-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Black Friday Discount ROI Calculator" description="Does your Black Friday discount make money? Discounted margin, profit per unit, and the exact volume uplift needed just to match a normal period." slug="black-friday-discount-roi-calculator" faqs={TOOL_CONTENT["ecommerce/black-friday-discount-roi-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/black-friday-discount-roi-calculator" />}
    </ToolLayout>
  )
}
