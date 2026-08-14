import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Subscription Churn Impact | DailyFinance",
  description: "Calculate your subscription churn impact.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Subscription Churn Impact"
      description="Use our free subscription churn impact to optimize your finances."
      slug="subscription-churn-impact-simulator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Subscription Churn Impact</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
