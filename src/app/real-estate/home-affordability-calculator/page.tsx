import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Home Affordability Calculator – Free, Instant Results (2026)', description: 'Use our free Home Affordability Calculator to find how much house you can afford on your income. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['how much house can i afford', 'home affordability calculator', 'house affordability calculator', '28/36 rule calculator'], slug: "real-estate/home-affordability-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Home Affordability Calculator" description="Use our free Home Affordability Calculator to find how much house you can afford on your income. Instant results with formula, worked examples and FAQs. No signup required." slug="home-affordability-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Home Affordability Calculator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
