import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Property Tax Calculator: Assessed Value, Mill Rate & Monthly Escrow',
  description: 'Estimate annual property tax from market value, assessment ratio, exemptions and tax or mill rate. See your monthly escrow and effective rate.',
  keywords: ['property tax calculator', 'property tax estimator', 'mill rate calculator', 'how to calculate property tax', 'property tax by assessed value'],
  slug: "real-estate/property-tax-assessor-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="Property Tax Calculator" description="Estimate annual property tax from market value, assessment ratio, exemptions and tax or mill rate. See your monthly escrow and effective rate." slug="property-tax-assessor-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Property Tax Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
