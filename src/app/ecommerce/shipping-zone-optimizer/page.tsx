import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Shipping Zone Optimizer",
  description: "Calculate your shipping zone optimizer.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Shipping Zone Optimizer"
      description="Use our free shipping zone optimizer to optimize your finances."
      slug="shipping-zone-optimizer"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Shipping Zone Optimizer</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
