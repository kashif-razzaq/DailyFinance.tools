import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Freelance Project Pricing Calculator: Flat-Fee Quotes",
  description: "Convert your hourly estimates into profitable flat-fee project proposals. Automatically account for scope creep, communication buffers, and risk premiums.",
  keywords: ["freelance flat fee calculator", "project quote calculator", "hourly to flat rate calculator", "value based pricing calculator", "scope creep buffer", "freelance risk premium", "how to quote a project"],
  slug: "freelance/freelance-project-pricing-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Freelance Project Pricing Calculator" description="Convert your hourly estimates into profitable flat-fee project proposals. Automatically account for scope creep, communication buffers, and risk premiums." slug="freelance-project-pricing-calculator" faqs={TOOL_CONTENT["freelance/freelance-project-pricing-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/freelance-project-pricing-calculator" />}
    </ToolLayout>
  )
}
