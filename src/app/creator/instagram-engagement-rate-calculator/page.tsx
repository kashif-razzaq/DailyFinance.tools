import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Instagram Engagement Rate Calculator: Likes & Comments', description: 'Calculate engagement rate from likes, comments and followers for any post, reel or account — and see what the percentage actually means.', keywords: ['instagram engagement rate calculator', 'engagement rate calculator', 'instagram engagement calculator', 'average engagement rate instagram'], slug: "creator/instagram-engagement-rate-calculator", category: "Creator Economy" });

export default function Page() {
  return (
    <ToolLayout title="Instagram Engagement Rate Calculator" description="Calculate engagement rate from likes, comments and followers for any post, reel or account — and see what the percentage actually means." slug="instagram-engagement-rate-calculator" faqs={TOOL_CONTENT["creator/instagram-engagement-rate-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/instagram-engagement-rate-calculator" />}
    </ToolLayout>
  )
}
