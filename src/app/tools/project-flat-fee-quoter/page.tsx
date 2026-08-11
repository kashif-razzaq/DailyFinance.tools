import { Metadata } from "next"
import { ToolLayout } from "@/components/layout/ToolLayout"
import { CalculatorClient } from "./CalculatorClient"
import React from "react"

export const metadata: Metadata = {
  title: "Freelance Flat Fee Project Quoter & Risk Calculator | DailyFinance",
  description: "Convert your hourly estimates into profitable flat-fee project proposals. Automatically account for scope creep, communication buffers, and risk premiums.",
  keywords: ["freelance flat fee calculator", "project quote calculator", "hourly to flat rate calculator", "value based pricing calculator", "scope creep buffer"],
}

const FAQS = [
  {
    question: "How do you calculate a flat fee for a project?",
    answer: "To calculate a flat fee, multiply your estimated hours by your hourly rate, then add a 20% buffer for communication/admin, and a 10% to 30% 'Risk Premium' to cover scope creep and revisions."
  },
  {
    question: "Why should freelancers charge flat fees instead of hourly?",
    answer: "Hourly billing punishes efficiency. If you get faster at your job, you get paid less. Flat fees detach your income from your time, allowing you to increase your effective hourly rate through expertise and systems."
  },
  {
    question: "What is a Risk Premium in project pricing?",
    answer: "A Risk Premium is a markup applied to flat-fee projects to insure against the unknown. Since the freelancer eats the cost of unexpected delays or difficult clients in a flat-fee model, the base price must be higher to compensate for that risk."
  }
]

export default function ProjectFlatFeeQuoterPage() {
  return (
    <ToolLayout
      title="Project Flat Fee Quoter"
      description="Stop getting punished for working quickly. Convert your hourly estimates into robust, highly profitable flat-fee quotes that protect you from scope creep and endless revisions."
      slug="project-flat-fee-quoter"
      faqs={FAQS}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* 1. Direct Answer Block for AEO */}
          <blockquote className="bg-primary/5 border border-primary/20 p-6 mb-8 text-foreground/80 rounded-xl leading-relaxed shadow-sm">
            <strong>Quick Answer:</strong> Never quote a flat fee by simply multiplying your hourly rate by your estimated hours. A professional flat-fee quote is calculated as: <code>(Estimated Core Hours × Hourly Rate) + 20% Communication Buffer + 15% Risk/Scope Creep Premium</code>.
          </blockquote>

          {/* 3. Editorial Content & Structured SEO Data */}
          <h2 className="text-2xl font-bold mb-4" id="the-problem-with-hourly-billing">The Problem with Hourly Billing</h2>
          <p>
            Hourly billing creates an inherent conflict of interest between you and your client. The client wants the project done quickly and cheaply. You want to maximize your hours to get paid more. 
          </p>
          <p>
            Furthermore, as you become more skilled, you work faster. If you charge by the hour, your reward for mastering your craft is a pay cut. <strong>Flat-fee (value-based) pricing</strong> solves this.
          </p>
          
          <h3 className="text-xl font-bold mb-3">The Anatomy of a Safe Flat Fee</h3>
          <p>
            When transitioning to flat fees, freelancers often underprice themselves because they forget to account for invisible time sinks. Our calculator uses a 3-part formula:
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li>
              <strong>Base Execution:</strong> The raw hours required to do the actual work, multiplied by your target hourly rate.
            </li>
            <li>
              <strong>The Communication Buffer:</strong> An automatic 15% to 25% markup to cover Zoom calls, Slack messages, email threads, and onboarding admin.
            </li>
            <li>
              <strong>The Risk Premium (Scope Creep):</strong> Because you are absorbing the risk of the project taking longer than expected, you must charge a premium. A standard risk premium is 10-20%, but should be higher for historically difficult clients.
            </li>
          </ul>
        </>
      )}
    </ToolLayout>
  )
}
