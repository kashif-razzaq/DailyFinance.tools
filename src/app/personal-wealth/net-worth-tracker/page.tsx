import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Net Worth Calculator: Assets Minus Liabilities, Broken Down',
  description: 'Calculate your net worth from all your assets and liabilities, see a breakdown of where it lives, your debt-to-asset ratio and your liquid net worth. Free tracker.',
  keywords: ['net worth calculator', 'how to calculate net worth', 'net worth tracker', 'liquid net worth calculator'],
  slug: "personal-wealth/net-worth-tracker",
  category: "Personal Wealth",
});

export default function Page() {
  return (
    <ToolLayout title="Net Worth Calculator" description="Calculate your net worth from all your assets and liabilities, see a breakdown of where it lives, your debt-to-asset ratio and your liquid net worth. Free tracker." slug="net-worth-tracker" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Net Worth Calculator" hubHref="/personal-wealth" hubName="Personal Wealth" />}
    </ToolLayout>
  )
}
