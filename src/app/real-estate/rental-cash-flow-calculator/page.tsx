import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Rental Property Calculator: Cash Flow, Cap Rate & Cash-on-Cash',
  description: 'Calculate rental property cash flow, cap rate and cash-on-cash return. Full PITI, vacancy, maintenance and management reserves included — no flattering omissions.',
  keywords: ['rental property calculator', 'rental cash flow calculator', 'cap rate calculator', 'cash on cash return calculator', 'rental roi calculator'],
  slug: "real-estate/rental-cash-flow-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="Rental Property & Cash Flow Calculator" description="Calculate rental property cash flow, cap rate and cash-on-cash return. Full PITI, vacancy, maintenance and management reserves included — no flattering omissions." slug="rental-cash-flow-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Rental Property & Cash Flow Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
