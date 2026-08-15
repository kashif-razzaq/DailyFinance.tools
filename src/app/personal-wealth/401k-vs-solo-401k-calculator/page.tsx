import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "401k vs Solo 401k",
  description: "Calculate your 401k vs solo 401k.",
}

export default function Page() {
  return (
    <ToolLayout
      title="401k vs Solo 401k"
      description="Use our free 401k vs solo 401k to optimize your finances."
      slug="401k-vs-solo-401k-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the 401k vs Solo 401k</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
