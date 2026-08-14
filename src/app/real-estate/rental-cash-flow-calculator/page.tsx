import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Rental Cash Flow | DailyFinance",
  description: "Calculate your rental cash flow.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Rental Cash Flow"
      description="Use our free rental cash flow to optimize your finances."
      slug="rental-cash-flow-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Rental Cash Flow</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
