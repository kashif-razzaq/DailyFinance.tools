import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Affiliate Link ROI Calculator: EPC, Revenue & Profit per Click",
  description: "Calculate affiliate earnings properly: clicks times conversion times commission gives revenue and EPC. Add your traffic costs to see true profit and ROI, and compare programs on the only metric that matters.",
  keywords: ["affiliate roi calculator", "affiliate earnings calculator", "epc calculator", "earnings per click calculator", "affiliate marketing calculator", "affiliate commission calculator"],
  slug: "creator/affiliate-link-roi-calculator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Affiliate Earnings Calculator" description="Calculate affiliate earnings properly: clicks times conversion times commission gives revenue and EPC. Add your traffic costs to see true profit and ROI, and compare programs on the only metric that matters." slug="affiliate-link-roi-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Affiliate Earnings Calculator" hubHref="/creator" hubName="Creator Economy" />}
    </ToolLayout>
  )
}
