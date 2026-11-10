import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Emergency Fund Calculator: How Many Months Do You Need?',
  description: 'Your emergency fund target from real essential spending and risk level: months you already cover, and when you’ll be fully funded. Free tool.',
  keywords: ['emergency fund calculator', 'how much emergency fund do i need', 'months of expenses saved', 'starter emergency fund'],
  slug: "personal-wealth/emergency-fund-visualizer",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Emergency Fund Calculator" description="Your emergency fund target from real essential spending and risk level: months you already cover, and when you’ll be fully funded. Free tool." slug="emergency-fund-visualizer" faqs={TOOL_CONTENT["personal-wealth/emergency-fund-visualizer"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/emergency-fund-visualizer" />}
    </ToolLayout>
  )
}
