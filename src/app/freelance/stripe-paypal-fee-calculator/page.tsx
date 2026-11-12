import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Stripe vs PayPal Fee Calculator: Fees + FX Compared",
  description: "Calculate hidden cross-border FX (foreign exchange) conversion fees for freelancers. Compare Stripe, PayPal, and Wise international transfer costs.",
  keywords: ["freelance cross border fees calculator", "paypal vs stripe international fees", "fx spread calculator freelancer", "wise multi currency account fees", "mid market exchange rate", "foreign exchange markup"],
  slug: "freelance/stripe-paypal-fee-calculator",
  category: "Freelance",
});

export default function Page() {
  return (
    <ToolLayout title="Stripe vs PayPal Fee Calculator" description="Calculate hidden cross-border FX (foreign exchange) conversion fees for freelancers. Compare Stripe, PayPal, and Wise international transfer costs." slug="stripe-paypal-fee-calculator" faqs={TOOL_CONTENT["freelance/stripe-paypal-fee-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="freelance/stripe-paypal-fee-calculator" />}
    </ToolLayout>
  )
}
