import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Customer Acquisition Cost | DailyFinance",
  description: "Calculate your customer acquisition cost.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Customer Acquisition Cost"
      description="Use our free customer acquisition cost to optimize your finances."
      slug="customer-acquisition-cost-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Customer Acquisition Cost</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
