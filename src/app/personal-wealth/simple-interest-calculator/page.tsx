import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Simple Interest Calculator: Interest on Loans & Deposits', description: 'Interest on a loan or deposit at a simple rate: total interest, final balance and the formula, worked for any principal and term.', keywords: ['simple interest calculator','simple interest formula','I=PRT calculator','interest on a loan calculator'], slug: "personal-wealth/simple-interest-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Simple Interest Calculator" description="Interest on a loan or deposit at a simple rate: total interest, final balance and the formula, worked for any principal and term." slug="simple-interest-calculator" faqs={TOOL_CONTENT["personal-wealth/simple-interest-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/simple-interest-calculator" />}
    </ToolLayout>
  )
}
