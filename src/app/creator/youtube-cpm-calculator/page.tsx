import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'YouTube CPM / RPM Calculator – Free, Instant Results (2026)', description: 'Use our free YouTube CPM / RPM Calculator to convert CPM to RPM and estimate channel revenue. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['youtube cpm calculator', 'youtube rpm calculator', 'cpm to rpm', 'youtube earnings calculator'], slug: "creator/youtube-cpm-calculator", category: "Creator Economy" });

export default function Page() {
  return (
    <ToolLayout title="YouTube CPM Calculator" description="Use our free YouTube CPM / RPM Calculator to convert CPM to RPM and estimate channel revenue. Instant results with formula, worked examples and FAQs. No signup required." slug="youtube-cpm-calculator" faqs={TOOL_CONTENT["creator/youtube-cpm-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/youtube-cpm-calculator" />}
    </ToolLayout>
  )
}
