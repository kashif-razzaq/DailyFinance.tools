import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: "Portfolio Rebalancer – Exact Buy/Sell Trade List (Pro)", description: "Rebalance to your target allocation with the exact trade list: enter holdings and targets, get the buys and sells. A DailyFinance Pro tool.", keywords: ['portfolio rebalancer', 'rebalance portfolio calculator', 'asset allocation calculator'], slug: "pro/portfolio-rebalancer", category: "Pro Tools" });

export default function Page() {
  return (
    <ToolLayout title="Portfolio Rebalancer" description="Rebalance to your target allocation with the exact trade list: enter holdings and targets, get the buys and sells. A DailyFinance Pro tool." slug="portfolio-rebalancer" faqs={TOOL_CONTENT["pro/portfolio-rebalancer"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="pro/portfolio-rebalancer" />}
    </ToolLayout>
  )
}
