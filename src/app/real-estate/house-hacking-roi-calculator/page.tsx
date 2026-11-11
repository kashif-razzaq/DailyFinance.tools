import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'House Hacking Calculator: Your Effective Housing Cost',
  description: 'House hacking a duplex or multi-family: your effective housing cost and ROI, how rent from other units offsets your mortgage (PITI), vs renting.',
  keywords: ['house hacking calculator', 'house hacking roi calculator', 'house hack mortgage calculator', 'live rent free calculator', 'duplex house hack calculator'],
  slug: "real-estate/house-hacking-roi-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="House Hacking ROI Calculator" description="House hacking a duplex or multi-family: your effective housing cost and ROI, how rent from other units offsets your mortgage (PITI), vs renting." slug="house-hacking-roi-calculator" faqs={TOOL_CONTENT["real-estate/house-hacking-roi-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/house-hacking-roi-calculator" />}
    </ToolLayout>
  )
}
