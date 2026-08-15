import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Black Friday Discount ROI",
  description: "Calculate your black friday discount roi.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Black Friday Discount ROI"
      description="Use our free black friday discount roi to optimize your finances."
      slug="black-friday-discount-roi-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Black Friday Discount ROI</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
