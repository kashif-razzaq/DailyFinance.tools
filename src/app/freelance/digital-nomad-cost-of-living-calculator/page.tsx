import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Digital Nomad Cost of Living Calculator",
  description: "How much longer your freelance runway lasts in a lower-cost city: exact payback period and new monthly profit, calculated from your numbers.",
  keywords: ["nomad cost of living calculator", "geo arbitrage calculator", "freelance runway calculator", "digital nomad savings calculator", "cost of living comparison for freelancers", "relocation payback period"],
  slug: "freelance/digital-nomad-cost-of-living-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Digital Nomad Cost of Living Calculator" description="How much longer your freelance runway lasts in a lower-cost city: exact payback period and new monthly profit, calculated from your numbers." slug="digital-nomad-cost-of-living-calculator" faqs={TOOL_CONTENT["freelance/digital-nomad-cost-of-living-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/digital-nomad-cost-of-living-calculator" />}
    </ToolLayout>
  )
}
