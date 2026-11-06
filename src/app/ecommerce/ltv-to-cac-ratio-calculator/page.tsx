import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "LTV:CAC Ratio Calculator: Lifetime Value on Gross Profit, Not Revenue",
  description: "Calculate customer lifetime value from AOV, purchase frequency, lifespan and gross margin, then get your LTV:CAC ratio, verdict band and CAC payback period.",
  keywords: ["ltv to cac ratio calculator", "ltv cac calculator", "customer lifetime value calculator ecommerce", "cac payback period", "what is a good ltv cac ratio"],
  slug: "ecommerce/ltv-to-cac-ratio-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="LTV to CAC Ratio Calculator" description="Calculate customer lifetime value from AOV, purchase frequency, lifespan and gross margin, then get your LTV:CAC ratio, verdict band and CAC payback period." slug="ltv-to-cac-ratio-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="LTV to CAC Ratio Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
