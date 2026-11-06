import type { Metadata } from "next"
import { CategoryHub } from "@/components/layout/CategoryHub"
import { generateCalculatorMetadata } from "@/config/metadata"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Freelance Financial Calculators — Rates, Taxes & Cash Flow Tools",
  description: "Free freelance calculators for hourly rates, quarterly estimated taxes, self-employment tax, S-Corp savings, payment fees and project pricing. Formulas shown, reviewed by an ACMA finance professional.",
  keywords: ["freelance calculators", "freelance tax calculator", "hourly rate calculator", "self employment tax calculator", "1099 calculator"],
  slug: "freelance",
  category: "Tools",
})

export default function Page() {
  return (
    <CategoryHub
      categorySlug="freelance"
      quickAnswer={"Freelance calculators help self-employed professionals price work profitably and stay ahead of taxes. Start with your hourly rate (target income + expenses + taxes, divided by realistic billable hours), then estimate quarterly taxes on every payment, and size an emergency fund for irregular income \u2014 the three calculations that decide whether a freelance business survives."}
      intro={[
      "Freelancing replaces a predictable salary with variable income, self-employment tax and unpaid admin time. The calculators in this hub are built around that reality. They use the same models a finance manager would: a Minimum Acceptable Rate for pricing, IRS self-employment tax mechanics (15.3% on 92.35% of net earnings) for tax tools, and volatility-based buffers instead of the generic 'save 3\u20136 months' rule for cash-flow tools.",
      "Work through them in order if you are starting out: set your rate first, because every other number depends on it. Then check what a W-2 offer is really worth against your 1099 income, price your next project as a flat fee, and estimate your quarterly tax before the IRS deadline \u2014 not after. If one client provides most of your income, the client lifetime value and emergency fund tools show you the risk in numbers.",
      "Each tool is free, works instantly in your browser, and shows its full formula with worked examples, so you can verify the maths yourself or share the reasoning with a client or accountant."
]}
      decisions={[
      {
            "need": "Setting your price",
            "toolSlug": "freelance-hourly-rate-calculator",
            "why": "converts your income goal into a defensible hourly floor."
      },
      {
            "need": "Paying taxes as a 1099 worker",
            "toolSlug": "quarterly-estimated-tax-calculator",
            "why": "gives each quarterly payment and the safe-harbor thresholds."
      },
      {
            "need": "Comparing a job offer with contracting",
            "toolSlug": "w2-vs-1099-calculator",
            "why": "compares true take-home after self-employment tax and lost benefits."
      },
      {
            "need": "Paying too much to payment platforms",
            "toolSlug": "stripe-paypal-fee-calculator",
            "why": "reveals processing + cross-border + FX costs per payment."
      },
      {
            "need": "Wondering if an S-Corp saves you money",
            "toolSlug": "s-corp-tax-savings-calculator",
            "why": "models the salary/distribution split and its hidden costs."
      }
]}
      faqs={[
      {
            "question": "Are these freelance calculators free?",
            "answer": "Yes. Every tool in this hub is free with no sign-up required. Creating an account only adds the option to save your scenarios."
      },
      {
            "question": "Which calculator should a new freelancer use first?",
            "answer": "The Freelance Hourly Rate Calculator. Until you know your Minimum Acceptable Rate, every quote you send is a guess \u2014 and usually an underpriced one."
      },
      {
            "question": "Do these tools use current US tax rules?",
            "answer": "Tax tools are updated for the current tax year, including self-employment tax rates, standard deduction and QBI treatment. They provide estimates for planning \u2014 confirm your filing position with a tax professional."
      },
      {
            "question": "Can I use these calculators outside the US?",
            "answer": "The pricing, fee and cash-flow tools work anywhere. The tax-specific tools (estimated tax, self-employment tax, S-Corp) are built for the US system."
      }
]}
    />
  )
}
