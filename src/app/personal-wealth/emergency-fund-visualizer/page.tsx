import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Emergency Fund Calculator: How Many Months Do You Need?',
  description: 'Calculate your emergency fund target from your real essential spending and risk level, see how many months you already cover, and when you will be fully funded. Free.',
  keywords: ['emergency fund calculator', 'how much emergency fund do i need', 'months of expenses saved', 'starter emergency fund'],
  slug: "personal-wealth/emergency-fund-visualizer",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Emergency Fund Calculator" description="Calculate your emergency fund target from your real essential spending and risk level, see how many months you already cover, and when you will be fully funded. Free." slug="emergency-fund-visualizer" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Emergency Fund Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
