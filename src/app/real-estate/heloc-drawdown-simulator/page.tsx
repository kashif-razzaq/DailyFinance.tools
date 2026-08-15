import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "HELOC Drawdown",
  description: "Calculate your heloc drawdown.",
}

export default function Page() {
  return (
    <ToolLayout
      title="HELOC Drawdown"
      description="Use our free heloc drawdown to optimize your finances."
      slug="heloc-drawdown-simulator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the HELOC Drawdown</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
