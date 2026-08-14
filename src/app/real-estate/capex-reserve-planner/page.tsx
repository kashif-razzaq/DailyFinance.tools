import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "CapEx Reserve Planner | DailyFinance",
  description: "Calculate your capex reserve planner.",
}

export default function Page() {
  return (
    <ToolLayout
      title="CapEx Reserve Planner"
      description="Use our free capex reserve planner to optimize your finances."
      slug="capex-reserve-planner"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the CapEx Reserve Planner</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
