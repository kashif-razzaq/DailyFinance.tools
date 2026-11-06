import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout } from "@/components/layout/ToolLayout"
import { ContentPlaceholder } from "@/components/shared/ContentPlaceholder"
import React from "react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Sales Tax Calculator + VAT Calculator: Add or Extract Tax Instantly",
  description: "Calculate US sales tax by state (base rate plus local add-on) or VAT for UK, EU and global rates. Add tax to a net price or extract tax from a gross price.",
  keywords: ["sales tax calculator", "vat calculator", "sales tax by state", "how to calculate sales tax", "vat inclusive exclusive calculator"],
  slug: "ecommerce/sales-tax-vat-calculator",
  category: "E-Commerce",
})

export default function Page() {
  return (
    <ToolLayout title="Sales Tax & VAT Calculator" description="Calculate US sales tax by state (base rate plus local add-on) or VAT for UK, EU and global rates. Add tax to a net price or extract tax from a gross price." slug="sales-tax-vat-calculator" faqs={[]} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {() => <ContentPlaceholder toolName="Sales Tax & VAT Calculator" hubHref="/ecommerce" hubName="E-Commerce" />}
    </ToolLayout>
  )
}
