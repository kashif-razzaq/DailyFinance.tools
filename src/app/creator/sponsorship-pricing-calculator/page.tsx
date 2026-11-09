import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Sponsorship Pricing Calculator: Price Brand Deals by Views & Engagement",
  description: "Calculate what to charge for sponsored videos, posts and brand deals from your average views, niche CPM and engagement rate. Includes usage rights and exclusivity uplifts and a negotiation range.",
  keywords: ["sponsorship pricing calculator", "brand deal calculator", "how much to charge for sponsorship", "influencer rate calculator", "sponsored video price", "creator brand deal pricing"],
  slug: "creator/sponsorship-pricing-calculator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Sponsorship Pricing Calculator" description="Calculate what to charge for sponsored videos, posts and brand deals from your average views, niche CPM and engagement rate. Includes usage rights and exclusivity uplifts and a negotiation range." slug="sponsorship-pricing-calculator" faqs={TOOL_CONTENT["creator/sponsorship-pricing-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/sponsorship-pricing-calculator" />}
    </ToolLayout>
  )
}
