import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Markup Calculator – Free, Instant Results (2026)', description: 'Use our free Markup Calculator to calculate markup and selling price from cost and margin. Free, instant results with worked examples and FAQs.', keywords: ['markup calculator', 'markup percentage calculator', 'margin markup converter', 'selling price calculator'], slug: "ecommerce/markup-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="Markup Calculator" description="Use our free Markup Calculator to calculate markup and selling price from cost and margin. Free, instant results with worked examples and FAQs." slug="markup-calculator" faqs={TOOL_CONTENT["ecommerce/markup-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/markup-calculator" />}
    </ToolLayout>
  )
}
