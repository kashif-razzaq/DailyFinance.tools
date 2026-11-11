import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Platform Fee Calculator: YouTube, Patreon, Substack & More",
  description: "Compare creator platform fees side by side: enter gross revenue and see what you keep on YouTube, Patreon, Substack, Twitch, Gumroad, Etsy and Stripe.",
  keywords: ["platform fee calculator", "creator platform fees compared", "patreon vs substack fees", "youtube revenue share", "twitch sub split", "how much do platforms take"],
  slug: "creator/platform-fee-visualizer",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Platform Fee Calculator" description="Compare creator platform fees side by side: enter gross revenue and see what you keep on YouTube, Patreon, Substack, Twitch, Gumroad, Etsy and Stripe." slug="platform-fee-visualizer" faqs={TOOL_CONTENT["creator/platform-fee-visualizer"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/platform-fee-visualizer" />}
    </ToolLayout>
  )
}
