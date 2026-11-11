import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "TikTok Money Calculator: Creator Rewards per 1,000 Views",
  description: "TikTok Creator Rewards, estimated the current way: qualified views on original 1-minute-plus videos at $0.40–$1.00 per 1,000. Old Creator Fund included.",
  keywords: ["tiktok money calculator", "tiktok creator rewards calculator", "tiktok creator fund calculator", "how much does tiktok pay per 1000 views", "tiktok creator rewards rpm"],
  slug: "creator/tiktok-creator-fund-calculator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="TikTok Money Calculator" description="TikTok Creator Rewards, estimated the current way: qualified views on original 1-minute-plus videos at $0.40–$1.00 per 1,000. Old Creator Fund included." slug="tiktok-creator-fund-calculator" faqs={TOOL_CONTENT["creator/tiktok-creator-fund-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/tiktok-creator-fund-calculator" />}
    </ToolLayout>
  )
}
