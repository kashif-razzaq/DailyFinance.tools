import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Home Affordability Calculator: How Much House Fits?', description: 'How much house you can afford on your income: the 28/36 rule, lender maximums and the payment that leaves you breathing room.', keywords: ['how much house can i afford', 'home affordability calculator', 'house affordability calculator', '28/36 rule calculator'], slug: "real-estate/home-affordability-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Home Affordability Calculator" description="How much house you can afford on your income: the 28/36 rule, lender maximums and the payment that leaves you breathing room." slug="home-affordability-calculator" faqs={TOOL_CONTENT["real-estate/home-affordability-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/home-affordability-calculator" />}
    </ToolLayout>
  )
}
