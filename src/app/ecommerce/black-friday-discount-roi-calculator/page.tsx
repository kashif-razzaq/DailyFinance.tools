import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Black Friday Discount Calculator: Volume Needed to Keep Profit",
  description: "Calculate whether your Black Friday discount makes money: discounted margin, profit per unit, and the exact volume uplift needed just to match a normal period.",
  keywords: ["black friday discount calculator", "discount roi calculator", "sale discount profit calculator", "how much volume to break even on a discount", "discount margin calculator"],
  slug: "ecommerce/black-friday-discount-roi-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Black Friday Discount ROI Calculator" description="Calculate whether your Black Friday discount makes money: discounted margin, profit per unit, and the exact volume uplift needed just to match a normal period." slug="black-friday-discount-roi-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Black Friday Discount ROI Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
