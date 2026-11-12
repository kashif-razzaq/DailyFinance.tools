import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Freelance Hourly Rate Calculator: Your True Minimum Rate",
  description: "Your true freelance hourly rate, factoring in business expenses, self-employment tax and unbillable time — so your rates stay profitable.",
  keywords: ["freelance hourly rate calculator", "calculate freelance rate", "minimum acceptable rate", "freelance pricing strategy", "how much should I charge freelance", "billable hours vs non-billable", "freelance taxes"],
  slug: "freelance/freelance-hourly-rate-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Freelance Hourly Rate Calculator" description="Your true freelance hourly rate, factoring in business expenses, self-employment tax and unbillable time — so your rates stay profitable." slug="freelance-hourly-rate-calculator" faqs={TOOL_CONTENT["freelance/freelance-hourly-rate-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/freelance-hourly-rate-calculator" />}
    </ToolLayout>
  )
}
