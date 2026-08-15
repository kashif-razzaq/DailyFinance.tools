import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Target ROAS Break-Even",
  description: "Calculate your target roas break-even.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Target ROAS Break-Even"
      description="Use our free target roas break-even to optimize your finances."
      slug="target-roas-break-even-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Target ROAS Break-Even</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
