import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Property Tax Assessor",
  description: "Calculate your property tax assessor.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Property Tax Assessor"
      description="Use our free property tax assessor to optimize your finances."
      slug="property-tax-assessor-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Property Tax Assessor</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
