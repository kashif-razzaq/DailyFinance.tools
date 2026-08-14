import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "TikTok Creator Fund | DailyFinance",
  description: "Calculate your tiktok creator fund.",
}

export default function Page() {
  return (
    <ToolLayout
      title="TikTok Creator Fund"
      description="Use our free tiktok creator fund to optimize your finances."
      slug="tiktok-creator-fund-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the TikTok Creator Fund</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
