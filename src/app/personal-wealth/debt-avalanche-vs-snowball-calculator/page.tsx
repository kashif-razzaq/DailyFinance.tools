import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Debt Avalanche vs Snowball",
  description: "Calculate your debt avalanche vs snowball.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Debt Avalanche vs Snowball"
      description="Use our free debt avalanche vs snowball to optimize your finances."
      slug="debt-avalanche-vs-snowball-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Debt Avalanche vs Snowball</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
