import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Affiliate Link ROI",
  description: "Calculate your affiliate link roi.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Affiliate Link ROI"
      description="Use our free affiliate link roi to optimize your finances."
      slug="affiliate-link-roi-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Affiliate Link ROI</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
