import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'HELOC Calculator: Draw, Interest-Only Payment & Repayment Simulator',
  description: 'Calculate your available HELOC credit, interest-only draw-period payment and the amortized repayment-phase payment. See the payment jump before it happens.',
  keywords: ['heloc calculator', 'heloc payment calculator', 'home equity line of credit calculator', 'heloc draw calculator', 'interest only heloc payment'],
  slug: "real-estate/heloc-drawdown-simulator",
  category: "Real Estate",
});

export default function Page() {
  return (
    <ToolLayout title="HELOC Calculator & Drawdown Simulator" description="Calculate your available HELOC credit, interest-only draw-period payment and the amortized repayment-phase payment. See the payment jump before it happens." slug="heloc-drawdown-simulator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="HELOC Calculator & Drawdown Simulator" hubHref="/real-estate" hubName="Real Estate" />}
    </ToolLayout>
  )
}
