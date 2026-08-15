import type { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import React from "react"

export const metadata: Metadata = {
  title: "Course Launch Revenue",
  description: "Calculate your course launch revenue.",
}

export default function Page() {
  return (
    <ToolLayout
      title="Course Launch Revenue"
      description="Use our free course launch revenue to optimize your finances."
      slug="course-launch-revenue-calculator"
      faqs={[]}
      calculator={(isPro) => (
        <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
          Calculator interface coming soon.
        </div>
      )}
    >
      {(isPro) => (
        <div className="prose prose-neutral max-w-none">
          <h2>About the Course Launch Revenue</h2>
          <p>Detailed educational content will be added here soon.</p>
        </div>
      )}
    </ToolLayout>
  )
}
