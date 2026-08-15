import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Patreon Tier Optimization",
  description: "Calculate your patreon tier optimization.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Patreon Tier Optimization"
      description="Use our free patreon tier optimization to optimize your finances."
      slug="patreon-tier-optimization"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Patreon Tier Optimization</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
