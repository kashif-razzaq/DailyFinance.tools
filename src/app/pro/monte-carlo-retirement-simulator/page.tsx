import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: "Monte Carlo Retirement Simulator: 1,000 Futures (Pro)", description: "1,000 simulated market futures for your retirement plan: success rate, percentile outcomes and sequence risk in today's dollars. A Pro tool.", keywords: ['monte carlo retirement calculator', 'retirement simulator', 'retirement success rate'], slug: "pro/monte-carlo-retirement-simulator", category: "Pro Tools" });

export default function Page() {
  return (
    <ToolLayout title="Monte Carlo Retirement Simulator" description="1,000 simulated market futures for your retirement plan: success rate, percentile outcomes and sequence risk in today's dollars. A Pro tool." slug="monte-carlo-retirement-simulator" faqs={TOOL_CONTENT["pro/monte-carlo-retirement-simulator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="pro/monte-carlo-retirement-simulator" />}
    </ToolLayout>
  )
}
