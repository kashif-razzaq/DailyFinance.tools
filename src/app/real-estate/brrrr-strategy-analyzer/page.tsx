import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "BRRRR Strategy Analyzer",
  description: "Calculate your brrrr strategy analyzer.",
}

export default function Page() {
  return (
    <ToolLayout
      title="BRRRR Strategy Analyzer"
      description="Use our free brrrr strategy analyzer to optimize your finances."
      slug="brrrr-strategy-analyzer"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the BRRRR Strategy Analyzer</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
