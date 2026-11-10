import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Fat FIRE vs Lean FIRE Calculator: FIRE Numbers & Time to Retire',
  description: 'Lean FIRE vs Fat FIRE side by side: the FIRE number for each lifestyle (25 times spending) and how long saving takes to reach each. Free tool.',
  keywords: ['fat fire vs lean fire calculator', 'lean fire number', 'fat fire number', 'fire calculator', 'how much to retire early'],
  slug: "personal-wealth/fat-fire-vs-lean-fire-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Fat FIRE vs Lean FIRE Calculator" description="Lean FIRE vs Fat FIRE side by side: the FIRE number for each lifestyle (25 times spending) and how long saving takes to reach each. Free tool." slug="fat-fire-vs-lean-fire-calculator" faqs={TOOL_CONTENT["personal-wealth/fat-fire-vs-lean-fire-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/fat-fire-vs-lean-fire-calculator" />}
    </ToolLayout>
  )
}
