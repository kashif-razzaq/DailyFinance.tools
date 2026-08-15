import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Amazon FBA Fee Calculator",
  description: "Calculate your amazon fba fee calculator.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Amazon FBA Fee Calculator"
      description="Use our free amazon fba fee calculator to optimize your finances."
      slug="amazon-fba-fee-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Amazon FBA Fee Calculator</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
