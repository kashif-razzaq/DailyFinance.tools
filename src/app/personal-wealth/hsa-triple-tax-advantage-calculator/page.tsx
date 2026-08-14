import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "HSA Triple Tax Advantage | DailyFinance",
  description: "Calculate your hsa triple tax advantage.",
}

export default function Page() {
  return (
    <ToolLayout
      title="HSA Triple Tax Advantage"
      description="Use our free hsa triple tax advantage to optimize your finances."
      slug="hsa-triple-tax-advantage-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the HSA Triple Tax Advantage</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
