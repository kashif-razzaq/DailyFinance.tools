import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Home Affordability Calculator – Free, Instant Results (2026)', description: 'Use our free Home Affordability Calculator to find how much house you can afford on your income. Free, instant results with worked examples and FAQs.', keywords: ['how much house can i afford', 'home affordability calculator', 'house affordability calculator', '28/36 rule calculator'], slug: "real-estate/home-affordability-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Home Affordability Calculator" description="Use our free Home Affordability Calculator to find how much house you can afford on your income. Free, instant results with worked examples and FAQs." slug="home-affordability-calculator" faqs={TOOL_CONTENT["real-estate/home-affordability-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/home-affordability-calculator" />}
    </ToolLayout>
  )
}
