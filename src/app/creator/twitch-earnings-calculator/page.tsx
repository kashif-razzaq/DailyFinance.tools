import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Twitch Earnings Calculator: Subs, Bits & Ads Income', description: 'Estimate Twitch income from subs, bits and ad revenue — per stream, per month and per year, at every sub tier.', keywords: ['twitch earnings calculator', 'twitch money calculator', 'twitch sub calculator', 'how much do twitch streamers make'], slug: "creator/twitch-earnings-calculator", category: "Creator Economy" });

export default function Page() {
  return (
    <ToolLayout title="Twitch Earnings Calculator" description="Estimate Twitch income from subs, bits and ad revenue — per stream, per month and per year, at every sub tier." slug="twitch-earnings-calculator" faqs={TOOL_CONTENT["creator/twitch-earnings-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/twitch-earnings-calculator" />}
    </ToolLayout>
  )
}
