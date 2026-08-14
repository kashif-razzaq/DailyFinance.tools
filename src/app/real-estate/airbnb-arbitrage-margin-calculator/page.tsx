import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Airbnb Arbitrage Margin | DailyFinance",
  description: "Calculate your airbnb arbitrage margin.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Airbnb Arbitrage Margin"
      description="Use our free airbnb arbitrage margin to optimize your finances."
      slug="airbnb-arbitrage-margin-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Airbnb Arbitrage Margin</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
