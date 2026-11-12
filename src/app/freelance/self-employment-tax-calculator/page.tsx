import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

const PAGE_TITLE = "Self-Employment Tax Calculator: 15.3% Rate & Deductions";
const PAGE_DESCRIPTION = "Self-employment tax on your freelance income: the 15.3% rate, the 92.35% rule, deductions and quarterly payments, calculated exactly.";

export const metadata: Metadata = generateCalculatorMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: ["self employment tax calculator", "freelance tax calculator", "1099 tax calculator", "freelance tax deductions calculator", "home office deduction calculator", "1099 write offs calculator", "irs simplified vs actual home office", "schedule c deductions list", "freelance mileage deduction"],
  slug: "freelance/self-employment-tax-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title={PAGE_TITLE} description={PAGE_DESCRIPTION} slug="self-employment-tax-calculator" faqs={TOOL_CONTENT["freelance/self-employment-tax-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/self-employment-tax-calculator" />}
    </ToolLayout>
  )
}
