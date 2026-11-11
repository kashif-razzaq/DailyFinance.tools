import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Debt Consolidation Calculator: Does It Save You Money?', description: 'Does consolidating your debts into one loan save money? Compare your current payments with one consolidated loan, side by side.', keywords: ['debt consolidation calculator', 'consolidation loan calculator', 'debt consolidation loan calculator'], slug: "loans/debt-consolidation-calculator", category: "Loans" });

export default function Page() {
  return (
    <ToolLayout title="Debt Consolidation Calculator" description="Does consolidating your debts into one loan save money? Compare your current payments with one consolidated loan, side by side." slug="debt-consolidation-calculator" faqs={TOOL_CONTENT["loans/debt-consolidation-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="loans/debt-consolidation-calculator" />}
    </ToolLayout>
  )
}
