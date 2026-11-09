import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Churn Calculator: What 1% Less Churn Is Worth in MRR",
  description: "Simulate how reducing monthly churn compounds into MRR and revenue. Compare your current churn with a target and see subscribers and money kept over 12–36 months.",
  keywords: ["churn calculator", "churn rate calculator", "subscription churn impact", "mrr churn simulator", "reduce churn revenue impact"],
  slug: "ecommerce/subscription-churn-impact-simulator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Subscription Churn Impact Calculator" description="Simulate how reducing monthly churn compounds into MRR and revenue. Compare your current churn with a target and see subscribers and money kept over 12–36 months." slug="subscription-churn-impact-simulator" faqs={TOOL_CONTENT["ecommerce/subscription-churn-impact-simulator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/subscription-churn-impact-simulator" />}
    </ToolLayout>
  )
}
