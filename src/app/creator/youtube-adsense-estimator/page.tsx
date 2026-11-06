import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "YouTube Money Calculator: Estimate AdSense Earnings by Views & RPM",
  description: "Estimate your YouTube AdSense earnings from views and RPM by niche. Compare long-form and Shorts income, see per-video, daily and yearly revenue, and learn the formula top creators use.",
  keywords: ["youtube money calculator", "youtube adsense estimator", "youtube earnings calculator", "youtube rpm calculator", "how much do youtubers make", "youtube cpm by niche", "youtube shorts money calculator"],
  slug: "creator/youtube-adsense-estimator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="YouTube Money Calculator" description="Estimate your YouTube AdSense earnings from views and RPM by niche. Compare long-form and Shorts income, see per-video, daily and yearly revenue, and learn the formula top creators use." slug="youtube-adsense-estimator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="YouTube Money Calculator" hubHref="/creator" hubName="Creator Economy" />}
    </ToolLayout>
  )
}
