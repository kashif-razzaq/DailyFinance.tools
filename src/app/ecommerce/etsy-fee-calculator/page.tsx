import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ToolContent } from "@/components/shared/ToolContent"
import { TOOL_CONTENT } from "@/data/tool-content"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({ title: 'Etsy Fee Calculator: Profit After Every Etsy Fee', description: 'Your Etsy profit after listing, transaction, regulatory and payment processing fees — per item and per month, line by line.', keywords: ['etsy fee calculator', 'etsy profit calculator', 'etsy fees 2026', 'how much does etsy take'], slug: "ecommerce/etsy-fee-calculator", category: "E-Commerce" });

export default function Page() {
  return (
    <ToolLayout title="Etsy Fee Calculator" description="Your Etsy profit after listing, transaction, regulatory and payment processing fees — per item and per month, line by line." slug="etsy-fee-calculator" faqs={TOOL_CONTENT["ecommerce/etsy-fee-calculator"]?.faqs ?? []} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ToolContent contentKey="ecommerce/etsy-fee-calculator" />}
    </ToolLayout>
  )
}
