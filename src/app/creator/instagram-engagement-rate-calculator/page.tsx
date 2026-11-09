import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Instagram Engagement Rate Calculator – Free, Instant Results (2026)', description: 'Use our free Instagram Engagement Rate Calculator to calculate engagement rate by followers, likes and comments. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['instagram engagement rate calculator', 'engagement rate calculator', 'instagram engagement calculator', 'average engagement rate instagram'], slug: "creator/instagram-engagement-rate-calculator", category: "Creator Economy" });

export default function Page() {
  return (
    <ToolLayout title="Instagram Engagement Rate Calculator" description="Use our free Instagram Engagement Rate Calculator to calculate engagement rate by followers, likes and comments. Instant results with formula, worked examples and FAQs. No signup required." slug="instagram-engagement-rate-calculator" faqs={TOOL_CONTENT["creator/instagram-engagement-rate-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/instagram-engagement-rate-calculator" />}
    </ToolLayout>
  )
}
