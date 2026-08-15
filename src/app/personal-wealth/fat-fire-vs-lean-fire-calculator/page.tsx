import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Fat FIRE vs Lean FIRE",
  description: "Calculate your fat fire vs lean fire.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Fat FIRE vs Lean FIRE"
      description="Use our free fat fire vs lean fire to optimize your finances."
      slug="fat-fire-vs-lean-fire-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Fat FIRE vs Lean FIRE</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
