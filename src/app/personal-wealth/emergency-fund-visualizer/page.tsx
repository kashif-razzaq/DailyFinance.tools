import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Emergency Fund Visualizer",
  description: "Calculate your emergency fund visualizer.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Emergency Fund Visualizer"
      description="Use our free emergency fund visualizer to optimize your finances."
      slug="emergency-fund-visualizer"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Emergency Fund Visualizer</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
