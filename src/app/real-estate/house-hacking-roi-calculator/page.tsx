import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "House Hacking ROI | DailyFinance",
  description: "Calculate your house hacking roi.",
}

export default function Page() {
  return (
    <ToolLayout
      title="House Hacking ROI"
      description="Use our free house hacking roi to optimize your finances."
      slug="house-hacking-roi-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the House Hacking ROI</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
