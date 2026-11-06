import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Salary to Hourly Calculator – Free, Instant Results (2026)', description: 'Use our free Salary to Hourly Calculator to convert any salary to an hourly rate and back instantly. Instant results with formula, worked examples and FAQs. No signup required.', keywords: ['salary to hourly calculator', 'hourly to salary calculator', 'salary converter', 'annual salary to hourly'], slug: "freelance/salary-to-hourly-calculator", category: "Freelance" });

export default function Page() {
  return (
    <ToolLayout title="Salary to Hourly Calculator" description="Use our free Salary to Hourly Calculator to convert any salary to an hourly rate and back instantly. Instant results with formula, worked examples and FAQs. No signup required." slug="salary-to-hourly-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Salary to Hourly Calculator" hubHref="/freelance" hubName="Freelance" />}
    </ToolLayout>
  )
}
