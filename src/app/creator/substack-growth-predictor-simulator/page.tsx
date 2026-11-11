import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Substack Earnings Calculator: Subscribers, MRR & Churn",
  description: "Project Substack income month by month: subscriber growth, free-to-paid conversion and churn, minus Substack's 10% and Stripe fees. MRR, ARR and totals.",
  keywords: ["substack calculator", "substack earnings calculator", "substack income", "how much can you make on substack", "substack conversion rate", "newsletter revenue calculator"],
  slug: "creator/substack-growth-predictor-simulator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Substack Earnings Calculator" description="Project Substack income month by month: subscriber growth, free-to-paid conversion and churn, minus Substack's 10% and Stripe fees. MRR, ARR and totals." slug="substack-growth-predictor-simulator" faqs={TOOL_CONTENT["creator/substack-growth-predictor-simulator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/substack-growth-predictor-simulator" />}
    </ToolLayout>
  )
}
