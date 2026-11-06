import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Patreon Earnings Calculator: What You Keep After Fees by Tier & Plan",
  description: "Calculate your real Patreon take-home pay after the 5, 8 or 12 percent platform fee, payment processing and payout fees. See net per patron and why small tiers lose the most to fixed fees.",
  keywords: ["patreon calculator", "patreon earnings calculator", "patreon fees", "how much does patreon take", "patreon tier pricing", "patreon income calculator"],
  slug: "creator/patreon-tier-optimization",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Patreon Earnings Calculator" description="Calculate your real Patreon take-home pay after the 5, 8 or 12 percent platform fee, payment processing and payout fees. See net per patron and why small tiers lose the most to fixed fees." slug="patreon-tier-optimization" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Patreon Earnings Calculator" hubHref="/creator" hubName="Creator Economy" />}
    </ToolLayout>
  )
}
