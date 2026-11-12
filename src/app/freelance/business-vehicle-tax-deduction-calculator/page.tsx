import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Business Vehicle Tax Deduction: Mileage vs Expenses",
  description: "Business vehicle tax deduction by Standard Mileage Rate or Actual Expenses: see what you can write off for your leased or owned business car.",
  keywords: ["auto lease write off calculator", "car lease tax deduction calculator", "section 179 leased vehicle", "business mileage deduction calculator", "write off leased car 1099"],
  slug: "freelance/business-vehicle-tax-deduction-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Business Vehicle Tax Deduction Calculator" description="Business vehicle tax deduction by Standard Mileage Rate or Actual Expenses: see what you can write off for your leased or owned business car." slug="business-vehicle-tax-deduction-calculator" faqs={TOOL_CONTENT["freelance/business-vehicle-tax-deduction-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/business-vehicle-tax-deduction-calculator" />}
    </ToolLayout>
  )
}
