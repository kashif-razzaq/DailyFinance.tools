import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "YouTube AdSense Estimator",
  description: "Calculate your youtube adsense estimator.",
}

export default function Page() {
  return (
    <ToolLayout
      title="YouTube AdSense Estimator"
      description="Use our free youtube adsense estimator to optimize your finances."
      slug="youtube-adsense-estimator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the YouTube AdSense Estimator</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
