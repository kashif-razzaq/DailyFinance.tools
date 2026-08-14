import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Merch Margin Calculator | DailyFinance",
  description: "Calculate your merch margin calculator.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Merch Margin Calculator"
      description="Use our free merch margin calculator to optimize your finances."
      slug="merch-margin-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Merch Margin Calculator</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
