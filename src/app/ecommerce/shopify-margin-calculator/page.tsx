import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Shopify Margin Calculator | DailyFinance",
  description: "Calculate your shopify margin calculator.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Shopify Margin Calculator"
      description="Use our free shopify margin calculator to optimize your finances."
      slug="shopify-margin-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Shopify Margin Calculator</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
