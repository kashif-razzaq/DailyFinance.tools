import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Billable Hours Calculator: Track Freelance Revenue & ROI",
  description: "Calculate how much revenue you lose annually to undocumented scope creep and administrative overhead, and see the true ROI of tracking billable hours.",
  keywords: ["billable hours calculator", "time tracking roi calculator", "freelance scope creep calculator", "cost of unbilled hours", "is time tracking software worth it", "effective hourly rate flat fee", "time tracking for freelancers"],
  slug: "freelance/billable-hours-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Billable Hours Calculator" description="Calculate how much revenue you lose annually to undocumented scope creep and administrative overhead, and see the true ROI of tracking billable hours." slug="billable-hours-calculator" faqs={TOOL_CONTENT["freelance/billable-hours-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/billable-hours-calculator" />}
    </ToolLayout>
  )
}
