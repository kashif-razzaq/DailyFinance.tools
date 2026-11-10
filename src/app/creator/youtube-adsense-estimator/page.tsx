import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "YouTube Money Calculator: Estimate AdSense Earnings by Views & RPM",
  description: "Estimate your YouTube AdSense earnings from views and RPM by niche: long-form vs Shorts, per-video, daily and yearly revenue, with the formula explained.",
  keywords: ["youtube money calculator", "youtube adsense estimator", "youtube earnings calculator", "youtube rpm calculator", "how much do youtubers make", "youtube cpm by niche", "youtube shorts money calculator"],
  slug: "creator/youtube-adsense-estimator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="YouTube Money Calculator" description="Estimate your YouTube AdSense earnings from views and RPM by niche: long-form vs Shorts, per-video, daily and yearly revenue, with the formula explained." slug="youtube-adsense-estimator" faqs={TOOL_CONTENT["creator/youtube-adsense-estimator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/youtube-adsense-estimator" />}
    </ToolLayout>
  )
}
