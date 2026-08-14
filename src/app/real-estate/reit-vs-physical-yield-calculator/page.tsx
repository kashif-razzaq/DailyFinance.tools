import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "REIT vs Physical Yield | DailyFinance",
  description: "Calculate your reit vs physical yield.",
}

export default function Page() {
  return (
    <ToolLayout
      title="REIT vs Physical Yield"
      description="Use our free reit vs physical yield to optimize your finances."
      slug="reit-vs-physical-yield-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the REIT vs Physical Yield</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
