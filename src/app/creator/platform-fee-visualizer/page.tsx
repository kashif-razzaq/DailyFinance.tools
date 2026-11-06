import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Platform Fee Calculator: Compare What You Keep on YouTube, Patreon, Substack & More",
  description: "Compare creator platform fees side by side. Enter gross revenue and see what you actually keep on YouTube, Patreon, Substack, Twitch, Gumroad, Etsy and your own Stripe checkout.",
  keywords: ["platform fee calculator", "creator platform fees compared", "patreon vs substack fees", "youtube revenue share", "twitch sub split", "how much do platforms take"],
  slug: "creator/platform-fee-visualizer",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Platform Fee Calculator" description="Compare creator platform fees side by side. Enter gross revenue and see what you actually keep on YouTube, Patreon, Substack, Twitch, Gumroad, Etsy and your own Stripe checkout." slug="platform-fee-visualizer" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Platform Fee Calculator" hubHref="/creator" hubName="Creator Economy" />}
    </ToolLayout>
  )
}
