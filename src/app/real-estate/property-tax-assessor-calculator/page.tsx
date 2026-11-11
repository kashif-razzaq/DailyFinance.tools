import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Property Tax Calculator: Assessed Value & Mill Rate',
  description: 'Estimate annual property tax from market value, assessment ratio, exemptions and tax or mill rate. See your monthly escrow and effective rate.',
  keywords: ['property tax calculator', 'property tax estimator', 'mill rate calculator', 'how to calculate property tax', 'property tax by assessed value'],
  slug: "real-estate/property-tax-assessor-calculator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="Property Tax Calculator" description="Estimate annual property tax from market value, assessment ratio, exemptions and tax or mill rate. See your monthly escrow and effective rate." slug="property-tax-assessor-calculator" faqs={TOOL_CONTENT["real-estate/property-tax-assessor-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/property-tax-assessor-calculator" />}
    </ToolLayout>
  )
}
