import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Roth IRA Calculator: Tax-Free Growth to Retirement', description: 'Project tax-free Roth IRA growth to retirement: contributions, compounding and the balance you withdraw without owing tax.', keywords: ['roth ira calculator','roth ira growth calculator','roth ira contribution limits 2026','tax free retirement calculator'], slug: "personal-wealth/roth-ira-calculator", category: "Personal Wealth" });

export default function Page() {
  return (
    <ToolLayout title="Roth IRA Calculator" description="Project tax-free Roth IRA growth to retirement: contributions, compounding and the balance you withdraw without owing tax." slug="roth-ira-calculator" faqs={TOOL_CONTENT["personal-wealth/roth-ira-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="personal-wealth/roth-ira-calculator" />}
    </ToolLayout>
  )
}
