import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Roth IRA Conversion | DailyFinance",
  description: "Calculate your roth ira conversion.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Roth IRA Conversion"
      description="Use our free roth ira conversion to optimize your finances."
      slug="roth-ira-conversion-simulator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Roth IRA Conversion</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
