import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Agency vs Solo Calculator: Editor & Team Costs vs Solo Margin for Creators",
  description: "Compare running your creator business solo versus with an editor and team. See profit, margin and, crucially, profit per hour of your own time, plus what happens if freed hours grow your output.",
  keywords: ["agency vs solo calculator", "hire an editor calculator", "creator editor cost", "should I hire a video editor", "creator team margin", "freelance vs agency margin"],
  slug: "creator/agency-vs-solo-margin-calculator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Agency vs Solo Creator Calculator" description="Compare running your creator business solo versus with an editor and team. See profit, margin and, crucially, profit per hour of your own time, plus what happens if freed hours grow your output." slug="agency-vs-solo-margin-calculator" faqs={TOOL_CONTENT["creator/agency-vs-solo-margin-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/agency-vs-solo-margin-calculator" />}
    </ToolLayout>
  )
}
