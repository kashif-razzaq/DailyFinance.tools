import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Twitch Earnings Calculator – Free, Instant Results (2026)', description: 'Use our free Twitch Earnings Calculator to estimate Twitch income from subs, bits and ads. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['twitch earnings calculator', 'twitch money calculator', 'twitch sub calculator', 'how much do twitch streamers make'], slug: "creator/twitch-earnings-calculator", category: "Creator Economy" });

export default function Page() {
  return (
    <ToolLayout title="Twitch Earnings Calculator" description="Use our free Twitch Earnings Calculator to estimate Twitch income from subs, bits and ads. Instant results with formula, worked examples and FAQs. No signup required." slug="twitch-earnings-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Twitch Earnings Calculator" hubHref="/creator" hubName="Creator Economy" />}
    </ToolLayout>
  )
}
