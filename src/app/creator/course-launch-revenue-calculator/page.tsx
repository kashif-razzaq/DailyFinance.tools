import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Course Launch Revenue Calculator: Model List, Conversion, Price & Refunds",
  description: "Model your online course launch before you run it: email list size times conversion times price, minus refunds, platform fees, processing and affiliate payouts. Includes revenue per subscriber.",
  keywords: ["course launch calculator", "online course revenue calculator", "course launch revenue", "how much can I make selling a course", "email list conversion rate course"],
  slug: "creator/course-launch-revenue-calculator",
  category: "Creator Economy",
});

export default function Page() {
  return (
    <ToolLayout title="Course Launch Revenue Calculator" description="Model your online course launch before you run it: email list size times conversion times price, minus refunds, platform fees, processing and affiliate payouts. Includes revenue per subscriber." slug="course-launch-revenue-calculator" faqs={TOOL_CONTENT["creator/course-launch-revenue-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="creator/course-launch-revenue-calculator" />}
    </ToolLayout>
  )
}
