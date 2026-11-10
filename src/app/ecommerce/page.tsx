import type { Metadata } from "next"
import { CategoryHub } from "@/components/layout/CategoryHub"
import { generateCalculatorMetadata } from "@/config/metadata"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "E-Commerce Profit Calculators — Margins, ROAS, FBA Fees & CAC Tools",
  description: "Free e-commerce calculators: Shopify margins, Amazon FBA fees, break-even ROAS, CAC, LTV:CAC, inventory reorder points, sales tax and business loans.",
  keywords: ["ecommerce calculators", "shopify margin calculator", "amazon fba calculator", "break even roas calculator", "cac calculator", "sales tax calculator"],
  slug: "ecommerce",
  category: "Tools",
})

export default function Page() {
  return (
    <CategoryHub
      categorySlug="ecommerce"
      quickAnswer={"E-commerce calculators answer one question: after product cost, platform fees, payment processing, shipping and ad spend, what do you actually keep? A healthy store knows its gross margin, its break-even ROAS (1 \u00f7 margin), its customer acquisition cost and its LTV to CAC ratio (aim for 3:1 or better) before it scales any campaign."}
      intro={[
      "Most stores do not fail because of traffic \u2014 they fail because the unit economics were never true. A product that looks profitable at a 40% gross margin can lose money after Shopify Payments fees, Amazon referral and FBA fees, shipping zones and a rising CAC. The calculators in this hub force every cost into the open, platform by platform, using current published fee schedules.",
      "Start with margin: the Shopify and Amazon FBA tools show your true per-order profit. Then find your break-even ROAS before you spend on ads, and check that your LTV to CAC ratio justifies the spend. Operational tools \u2014 reorder points, churn impact, AOV simulation \u2014 then help you grow without stockouts or silent subscription losses. The sales tax and business loan tools cover the two obligations stores most often discover too late.",
      "Each calculator shows its formula and works an example with realistic store numbers, so you can adapt the model to your own catalogue instead of trusting a single percentage someone quoted in a forum."
]}
      decisions={[
      {
            "need": "Checking a product's real profit on Shopify",
            "toolSlug": "shopify-margin-calculator",
            "why": "includes COGS, payment fees and shipping in one margin."
      },
      {
            "need": "Selling on Amazon",
            "toolSlug": "amazon-fba-fee-calculator",
            "why": "deducts referral, fulfilment and storage fees by size tier."
      },
      {
            "need": "Setting an ad budget",
            "toolSlug": "target-roas-break-even-calculator",
            "why": "gives the minimum ROAS your margin can survive."
      },
      {
            "need": "Judging acquisition spend",
            "toolSlug": "ltv-to-cac-ratio-calculator",
            "why": "compares lifetime value with acquisition cost in one ratio."
      },
      {
            "need": "Charging the right tax",
            "toolSlug": "sales-tax-vat-calculator",
            "why": "adds or extracts US sales tax and VAT correctly."
      }
]}
      faqs={[
      {
            "question": "What is a good profit margin for e-commerce?",
            "answer": "Net margins of 10\u201320% are healthy for most stores, but the right target depends on category and ad intensity. Use the margin calculators to find your number after every fee, not a generic benchmark."
      },
      {
            "question": "How do I calculate break-even ROAS?",
            "answer": "Break-even ROAS = 1 \u00f7 gross margin. At a 40% margin you need at least 2.5 ROAS to cover product costs \u2014 before other overheads. The ROAS calculator does this with your real costs."
      },
      {
            "question": "Are Amazon's fees included accurately?",
            "answer": "The FBA calculator uses Amazon's published referral percentages by category and fulfilment fees by size tier. Fees change periodically \u2014 check Seller Central for the latest schedule before listing."
      },
      {
            "question": "Are these tools free for commercial use?",
            "answer": "Yes. Use them for your own store or client work at no cost, with no sign-up required."
      }
]}
    />
  )
}
