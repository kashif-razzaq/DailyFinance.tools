import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'YouTube CPM / RPM Calculator: Convert CPM to Revenue', description: 'Convert CPM to RPM and estimate real channel revenue from any view count — by niche, with long-form and Shorts rates compared.', keywords: ['youtube cpm calculator', 'youtube rpm calculator', 'cpm to rpm', 'youtube earnings calculator'], slug: "creator/youtube-cpm-calculator", category: "Creator Economy" });

export default function Page() {
  return (
    <ToolLayout title="YouTube CPM Calculator" description="Convert CPM to RPM and estimate real channel revenue from any view count — by niche, with long-form and Shorts rates compared." slug="youtube-cpm-calculator" faqs={TOOL_CONTENT["creator/youtube-cpm-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/youtube-cpm-calculator" />}
    </ToolLayout>
  )
}
