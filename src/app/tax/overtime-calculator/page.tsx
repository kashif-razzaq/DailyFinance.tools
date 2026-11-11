import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Overtime Calculator: Time-and-a-Half & Double Time', description: 'Overtime pay at time-and-a-half and double time: gross overtime earnings for any hours and rate, weekly and per paycheck.', keywords: ['overtime calculator', 'time and a half calculator', 'overtime pay calculator', 'double time calculator'], slug: "tax/overtime-calculator", category: "Tax" });

export default function Page() {
  return (
    <ToolLayout title="Overtime Calculator" description="Overtime pay at time-and-a-half and double time: gross overtime earnings for any hours and rate, weekly and per paycheck." slug="overtime-calculator" faqs={TOOL_CONTENT["tax/overtime-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="tax/overtime-calculator" />}
    </ToolLayout>
  )
}
