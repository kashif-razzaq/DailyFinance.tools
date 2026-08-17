/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from 'next'
import { ToolLayout } from '@/components/layout/ToolLayout'
import { CalculatorClient } from './CalculatorClient'
import { generateCalculatorMetadata } from '@/config/metadata'
import React from 'react'

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'REIT vs Physical Yield',
  description: 'Compare passive REIT returns against active physical real estate returns.',
  slug: 'reit-vs-physical-yield-calculator',
  category: 'real-estate',
})

export default function Page() {

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the REIT vs Physical Yield?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compare passive REIT returns against active physical real estate returns."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use this calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply enter your parameters into the input fields on the left. The calculator will automatically update the results on the right side in real-time."
        }
      }
    ]
  }


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ToolLayout
        title="REIT vs Physical Yield"
        description="Compare passive REIT returns against active physical real estate returns."
        slug="reit-vs-physical-yield-calculator"
        faqs={[]}
        calculator={() => <CalculatorClient isPro={false} />}
      >
        {() => (
          <div className="prose prose-neutral max-w-none">
            <div dangerouslySetInnerHTML={{ __html: `
          <h2>Mastering the REIT vs Physical Yield</h2>
          <p>Compare passive REIT returns against active physical real estate returns.</p>

          <h3>Why REIT vs Physical Yield Matters</h3>
          <p>Understanding these numbers is critical for making informed decisions. By accurately calculating your projections, you can avoid costly mistakes and set yourself up for long-term success.</p>

          <h3>The Core Components</h3>
          <p>Let's break down the individual elements that make up this calculation. You cannot accurately predict outcomes without grasping the underlying variables.</p>
          <ul>
            <li><strong>Accuracy of Inputs:</strong> Your output is only as good as your input. Ensure you are using realistic estimates.</li>
            <li><strong>Market Conditions:</strong> Always adjust your baselines for the specific economic climate.</li>
            <li><strong>Contingencies:</strong> A massive mistake is failing to build in a buffer for unexpected events. Always run a 'worst-case' scenario.</li>
          </ul>

          <h3>Step-by-Step Implementation</h3>
          <p>Using our tool is straightforward. Begin by entering your baseline numbers. Once you have a result, start tweaking the variables one by one to see how different scenarios play out. This sensitivity analysis is what separates beginners from professionals.</p>

          <br/>
          <!-- TODO: Expand content to 1500+ unique words per SEO requirements -->

          <h3>Conclusion</h3>
          <p>We built this REIT vs Physical Yield tool to empower you with institutional-grade analytics. Save your scenarios, compare different options, and make data-driven decisions. Your future self will thank you.</p>
    ` }} />
          </div>
        )}
      </ToolLayout>
    </>
  )
}
