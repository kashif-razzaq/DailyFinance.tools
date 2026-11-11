import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Home Equity Calculator: Equity & How Much You Can Borrow', description: 'Your home equity and how much you can actually borrow against it: current value minus mortgage, LTV and combined LTV.', keywords: ['home equity calculator', 'how much equity do i have in my home', 'home equity loan calculator', 'HELOC calculator'], slug: "real-estate/home-equity-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="Home Equity Calculator" description="Your home equity and how much you can actually borrow against it: current value minus mortgage, LTV and combined LTV." slug="home-equity-calculator" faqs={TOOL_CONTENT["real-estate/home-equity-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/home-equity-calculator" />}
    </ToolLayout>
  )
}
