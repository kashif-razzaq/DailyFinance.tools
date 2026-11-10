import type { Metadata } from "next"
import { CategoryHub } from "@/components/layout/CategoryHub"
import { generateCalculatorMetadata } from "@/config/metadata"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Real Estate Investment Calculators — Mortgage, Rental Cash Flow & ROI Tools",
  description: "Free real estate calculators: mortgage payments and amortization, rental cash flow, cap rate, house hacking ROI, HELOC, flipping profit and property tax.",
  keywords: ["real estate calculators", "mortgage calculator", "rental cash flow calculator", "cap rate calculator", "brrrr calculator", "house hacking calculator"],
  slug: "real-estate",
  category: "Tools",
})

export default function Page() {
  return (
    <CategoryHub
      categorySlug="real-estate"
      quickAnswer={"Real estate calculators test whether a property makes money before you buy it. A mortgage payment is principal + interest + taxes + insurance (PITI); a rental works when rent covers PITI plus vacancy, maintenance and management with cash flow left over; and investors compare deals with cap rate (NOI \u00f7 price) and cash-on-cash return (annual cash flow \u00f7 cash invested)."}
      intro={[
      "Property is the largest financial decision most people make, and the easiest to get wrong with a single optimistic assumption. This hub models deals the way lenders and experienced investors do: full PITI instead of just principal and interest, vacancy and maintenance reserves inside rental cash flow, and refinance maths \u2014 not hope \u2014 inside BRRRR analysis.",
      "Home buyers should start with the mortgage amortization tool to see the true cost of a loan and what extra payments save, then check property tax for the area. Investors can screen a rental in minutes, stress-test a flip with the 70% rule, plan CapEx reserves so a roof never wipes out a year of profit, and compare a REIT against physical property on the same capital. House hackers and Airbnb hosts get models built for their specific strategies rather than generic rental maths.",
      "Every tool shows its formula, amortization or cash-flow breakdown, and a worked example with realistic prices and rates. Rates and tax rules vary by location and change over time \u2014 use results to shortlist deals and negotiate, then confirm with your lender or closing attorney."
]}
      decisions={[
      {
            "need": "Buying a home",
            "toolSlug": "mortgage-amortization-calculator",
            "why": "full payment, PITI breakdown, total interest and extra-payment savings."
      },
      {
            "need": "Screening a rental property",
            "toolSlug": "rental-cash-flow-calculator",
            "why": "cash flow, cap rate and cash-on-cash in one pass."
      },
      {
            "need": "Running a BRRRR deal",
            "toolSlug": "brrrr-strategy-analyzer",
            "why": "shows cash left in the deal after the refinance."
      },
      {
            "need": "Living for less by house hacking",
            "toolSlug": "house-hacking-roi-calculator",
            "why": "offsets your mortgage with rent from other units."
      },
      {
            "need": "Tapping home equity",
            "toolSlug": "heloc-drawdown-simulator",
            "why": "interest-only draw payments and repayment-phase costs."
      }
]}
      faqs={[
      {
            "question": "What is a good cap rate?",
            "answer": "Cap rates of 5\u20138% are common in many US markets, but 'good' depends on local risk and rate conditions. Compare a property's cap rate with others in the same area using the rental cash flow calculator."
      },
      {
            "question": "Does the mortgage calculator include taxes and insurance?",
            "answer": "Yes. It breaks the payment into principal, interest, property tax, insurance and PMI where applicable, and shows total interest over the term plus the effect of extra payments."
      },
      {
            "question": "What is the 70% rule in flipping?",
            "answer": "Maximum offer \u2248 70% of after-repair value minus repair costs. The flipping calculator applies it alongside holding and selling costs so the profit estimate is complete."
      },
      {
            "question": "Are these calculators free?",
            "answer": "Yes, all real estate tools are free with no sign-up required."
      }
]}
    />
  )
}
