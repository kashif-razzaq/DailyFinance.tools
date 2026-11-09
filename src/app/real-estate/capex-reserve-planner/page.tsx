import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'CapEx Reserve Planner: Monthly Reserves for Roof, HVAC & Major Repairs',
  description: 'Plan capital expenditure reserves for rental property: enter replacement cost and lifespan for roof, HVAC, water heater and more to get your true monthly reserve.',
  keywords: ['capex calculator rental property', 'capital expenditure reserve calculator', 'rental property reserves calculator', 'roof replacement reserve', 'capex reserve planner'],
  slug: "real-estate/capex-reserve-planner",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="CapEx Reserve Planner" description="Plan capital expenditure reserves for rental property: enter replacement cost and lifespan for roof, HVAC, water heater and more to get your true monthly reserve." slug="capex-reserve-planner" faqs={TOOL_CONTENT["real-estate/capex-reserve-planner"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/capex-reserve-planner" />}
    </ToolLayout>
  )
}
