import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Patreon Earnings Calculator: What You Keep After Fees by Tier & Plan",
  description: "Patreon take-home pay, calculated: after the 5, 8 or 12% platform fee, processing and payout fees. See net per patron and why small tiers lose most.",
  keywords: ["patreon calculator", "patreon earnings calculator", "patreon fees", "how much does patreon take", "patreon tier pricing", "patreon income calculator"],
  slug: "creator/patreon-tier-optimization",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Patreon Earnings Calculator" description="Patreon take-home pay, calculated: after the 5, 8 or 12% platform fee, processing and payout fees. See net per patron and why small tiers lose most." slug="patreon-tier-optimization" faqs={TOOL_CONTENT["creator/patreon-tier-optimization"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/patreon-tier-optimization" />}
    </ToolLayout>
  )
}
