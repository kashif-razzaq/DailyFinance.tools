import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "S Corp Tax Savings Calculator: LLC vs S Corp",
  description: "Tax savings from converting your freelance LLC to an S-Corp, calculated exactly: optimize W-2 salary vs distributions to minimize FICA taxes.",
  keywords: ["s corp salary vs dividend calculator", "llc vs s corp tax calculator", "reasonable compensation calculator s corp", "freelance s corp tax savings", "s corp distribution rules", "self employment tax calculator"],
  slug: "freelance/s-corp-tax-savings-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="S Corp Tax Savings Calculator" description="Tax savings from converting your freelance LLC to an S-Corp, calculated exactly: optimize W-2 salary vs distributions to minimize FICA taxes." slug="s-corp-tax-savings-calculator" faqs={TOOL_CONTENT["freelance/s-corp-tax-savings-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/s-corp-tax-savings-calculator" />}
    </ToolLayout>
  )
}
