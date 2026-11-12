import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'VA Loan Calculator: Payment & Funding Fee', description: 'Work out your VA loan payment with the funding fee built in: first use vs subsequent use, the disability exemption, and no PMI — ever.', keywords: ['va loan calculator', 'va funding fee calculator', 'va mortgage calculator', 'va home loan payment calculator'], slug: "real-estate/va-loan-calculator", category: "Real Estate" });

export default function Page() {
  return (
    <ToolLayout title="VA Loan Calculator" description="Work out your VA loan payment with the funding fee built in: first use vs subsequent use, the disability exemption, and no PMI — ever." slug="va-loan-calculator" faqs={TOOL_CONTENT["real-estate/va-loan-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="real-estate/va-loan-calculator" />}
    </ToolLayout>
  )
}
