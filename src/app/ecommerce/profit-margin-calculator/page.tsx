import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Profit Margin Calculator – Free, Instant Results (2026)', description: 'Use our free Profit Margin Calculator to calculate profit margin, markup and selling price instantly. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['profit margin calculator', 'margin calculator', 'gross margin calculator', 'markup calculator'], slug: "ecommerce/profit-margin-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="Profit Margin Calculator" description="Use our free Profit Margin Calculator to calculate profit margin, markup and selling price instantly. Instant results with formula, worked examples and FAQs. No signup required." slug="profit-margin-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Profit Margin Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
