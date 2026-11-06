import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Substack Earnings Calculator: Project Paid Subscribers, MRR & Churn",
  description: "Project your Substack income month by month: free subscriber growth, free-to-paid conversion and churn, minus Substack's 10 percent and Stripe fees. See future MRR, ARR and cumulative earnings.",
  keywords: ["substack calculator", "substack earnings calculator", "substack income", "how much can you make on substack", "substack conversion rate", "newsletter revenue calculator"],
  slug: "creator/substack-growth-predictor-simulator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Substack Earnings Calculator" description="Project your Substack income month by month: free subscriber growth, free-to-paid conversion and churn, minus Substack's 10 percent and Stripe fees. See future MRR, ARR and cumulative earnings." slug="substack-growth-predictor-simulator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Substack Earnings Calculator" hubHref="/creator" hubName="Creator Economy" />}
    </ToolLayout>
  )
}
