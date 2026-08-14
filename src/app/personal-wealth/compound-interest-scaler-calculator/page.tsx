import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Compound Interest Scaler | DailyFinance",
  description: "Calculate your compound interest scaler.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Compound Interest Scaler"
      description="Use our free compound interest scaler to optimize your finances."
      slug="compound-interest-scaler-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Compound Interest Scaler</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
