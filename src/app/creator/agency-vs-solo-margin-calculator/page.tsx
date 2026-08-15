import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Agency vs Solo Margin",
  description: "Calculate your agency vs solo margin.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Agency vs Solo Margin"
      description="Use our free agency vs solo margin to optimize your finances."
      slug="agency-vs-solo-margin-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Agency vs Solo Margin</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
