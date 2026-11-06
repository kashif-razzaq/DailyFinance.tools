import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "TikTok Money Calculator: Creator Rewards Earnings (Creator Fund Ended 2023)",
  description: "Estimate TikTok Creator Rewards earnings the current way: qualified views on original videos over 1 minute at roughly $0.40 to $1.00 per 1,000. The old Creator Fund ended in December 2023; this calculator shows both.",
  keywords: ["tiktok money calculator", "tiktok creator rewards calculator", "tiktok creator fund calculator", "how much does tiktok pay per 1000 views", "tiktok creator rewards rpm"],
  slug: "creator/tiktok-creator-fund-calculator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="TikTok Money Calculator" description="Estimate TikTok Creator Rewards earnings the current way: qualified views on original videos over 1 minute at roughly $0.40 to $1.00 per 1,000. The old Creator Fund ended in December 2023; this calculator shows both." slug="tiktok-creator-fund-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="TikTok Money Calculator" hubHref="/creator" hubName="Creator Economy" />}
    </ToolLayout>
  )
}
