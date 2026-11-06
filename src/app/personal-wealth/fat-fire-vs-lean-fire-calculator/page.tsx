import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Fat FIRE vs Lean FIRE Calculator: FIRE Numbers & Time to Retire',
  description: 'Compare Lean FIRE and Fat FIRE side by side: the FIRE number for each lifestyle (twenty-five times spending) and how long saving takes to reach each one. Free tool.',
  keywords: ['fat fire vs lean fire calculator', 'lean fire number', 'fat fire number', 'fire calculator', 'how much to retire early'],
  slug: "personal-wealth/fat-fire-vs-lean-fire-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Fat FIRE vs Lean FIRE Calculator" description="Compare Lean FIRE and Fat FIRE side by side: the FIRE number for each lifestyle (twenty-five times spending) and how long saving takes to reach each one. Free tool." slug="fat-fire-vs-lean-fire-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Fat FIRE vs Lean FIRE Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
