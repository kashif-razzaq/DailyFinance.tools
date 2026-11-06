import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Markup Calculator – Free, Instant Results (2026)', description: 'Use our free Markup Calculator to calculate markup and selling price from cost and margin. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['markup calculator', 'markup percentage calculator', 'margin markup converter', 'selling price calculator'], slug: "ecommerce/markup-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="Markup Calculator" description="Use our free Markup Calculator to calculate markup and selling price from cost and margin. Instant results with formula, worked examples and FAQs. No signup required." slug="markup-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Markup Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
