import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Coast FIRE Calculator: Find Your Coast Number & Coast Age',
  description: 'Use our free Coast FIRE calculator to find the exact amount you need invested today so compounding carries you to full retirement — with no further contributions.',
  keywords: ['coast fire calculator', 'coast fi number', 'when can i stop saving for retirement', 'fire calculator'],
  slug: "personal-wealth/coast-fire-calculator",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Coast FIRE Calculator" description="Use our free Coast FIRE calculator to find the exact amount you need invested today so compounding carries you to full retirement — with no further contributions." slug="coast-fire-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Coast FIRE Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
