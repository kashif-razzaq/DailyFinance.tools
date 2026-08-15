import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Net Worth Tracker",
  description: "Calculate your net worth tracker.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Net Worth Tracker"
      description="Use our free net worth tracker to optimize your finances."
      slug="net-worth-tracker"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Net Worth Tracker</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
