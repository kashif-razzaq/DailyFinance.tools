import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'House Hacking Calculator: Live Rent-Free & Calculate Your ROI',
  description: 'Calculate your effective housing cost and ROI house hacking a duplex or multi-family home. See how rent from other units offsets your mortgage (PITI) and what you save versus renting.',
  keywords: ['house hacking calculator', 'house hacking roi calculator', 'house hack mortgage calculator', 'live rent free calculator', 'duplex house hack calculator'],
  slug: "real-estate/house-hacking-roi-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="House Hacking ROI Calculator" description="Calculate your effective housing cost and ROI house hacking a duplex or multi-family home. See how rent from other units offsets your mortgage (PITI) and what you save versus renting." slug="house-hacking-roi-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="House Hacking ROI Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
