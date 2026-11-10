import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Business Loan Calculator: Payment, Total Interest & Runway Impact",
  description: "Business loan payment and total interest, calculated — plus the truth about runway: months the loan really adds once its payment joins your monthly burn.",
  keywords: ["business loan calculator", "startup runway calculator", "business loan payment calculator", "how much runway does a loan add", "sba loan calculator"],
  slug: "ecommerce/business-loan-runway-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Business Loan & Runway Calculator" description="Business loan payment and total interest, calculated — plus the truth about runway: months the loan really adds once its payment joins your monthly burn." slug="business-loan-runway-calculator" faqs={TOOL_CONTENT["ecommerce/business-loan-runway-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/business-loan-runway-calculator" />}
    </ToolLayout>
  )
}
