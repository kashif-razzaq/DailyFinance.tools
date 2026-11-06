import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "ROAS Calculator: Find Your Break-Even ROAS Before You Spend",
  description: "Calculate your break-even ROAS from your true gross margin. See your maximum allowable CPA and whether your current campaigns actually make money on every order.",
  keywords: ["roas calculator", "break even roas calculator", "target roas calculator", "how to calculate roas", "maximum allowable cpa"],
  slug: "ecommerce/target-roas-break-even-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Target ROAS Break-Even Calculator" description="Calculate your break-even ROAS from your true gross margin. See your maximum allowable CPA and whether your current campaigns actually make money on every order." slug="target-roas-break-even-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Target ROAS Break-Even Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
