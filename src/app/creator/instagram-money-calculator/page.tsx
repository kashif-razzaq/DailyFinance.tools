import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Instagram Money Calculator: What a Post Is Worth', description: 'What an Instagram post, reel or story is worth at your follower count and engagement rate — estimated earnings per post and per campaign.', keywords: ['instagram money calculator', 'instagram earnings calculator', 'how much do instagram influencers make', 'instagram post price calculator'], slug: "creator/instagram-money-calculator", category: "Creator Economy" });

export default function Page() {
  return (
    <ToolLayout title="Instagram Money Calculator" description="What an Instagram post, reel or story is worth at your follower count and engagement rate — estimated earnings per post and per campaign." slug="instagram-money-calculator" faqs={TOOL_CONTENT["creator/instagram-money-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/instagram-money-calculator" />}
    </ToolLayout>
  )
}
