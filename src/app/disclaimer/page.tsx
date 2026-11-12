import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/LegalPage"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Disclaimer | DailyFinance",
  description: "DailyFinance calculators provide educational estimates, not financial, tax or investment advice. Read the limits before relying on any result.",
  alternates: { canonical: "https://www.dailyfinance.tools/disclaimer" },
  openGraph: {
    title: "Disclaimer | DailyFinance",
    description: "DailyFinance calculators provide educational estimates, not financial, tax or investment advice. Read the limits before relying on any result.",
    url: "https://www.dailyfinance.tools/disclaimer",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Disclaimer | DailyFinance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer | DailyFinance",
    description: "DailyFinance calculators provide educational estimates, not financial, tax or investment advice. Read the limits before relying on any result.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function Page() {
  return (
    <>
      <script id="schema-crumb-disclaimer" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Disclaimer", url: "https://www.dailyfinance.tools/disclaimer" }])) }} />
      <LegalPage
      title="Disclaimer"
      updated="6 November 2026"
      intro={"The information and calculators on dailyfinance.tools are provided for general education and planning only. Please read this disclaimer before relying on any result."}
      sections={[
      {
            "heading": "Not professional advice",
            "paragraphs": [
                  "DailyFinance is not a bank, lender, broker, tax adviser, accountant or law firm, and nothing on this site is financial, tax, legal or investment advice tailored to your circumstances. Calculator outputs are estimates based on the inputs you provide and standardised assumptions stated on each page."
            ]
      },
      {
            "heading": "Accuracy and changing rules",
            "paragraphs": [
                  "We work to keep formulas correct and inputs current \u2014 including tax brackets, retirement contribution limits, platform fees (such as Amazon, Shopify, Stripe, PayPal, Etsy and Patreon) and program rules (such as TikTok's Creator Rewards Program). These change frequently and vary by country, state and individual situation. A result that was accurate when published may not remain so. Always confirm important figures with official sources \u2014 the IRS, your lender, the platform's current fee schedule \u2014 or a qualified professional."
            ]
      },
      {
            "heading": "No guarantees",
            "paragraphs": [
                  "Investment projections assume steady returns that real markets do not deliver; business and creator income estimates depend on audience, market and platform decisions outside our control. Past or modelled performance does not guarantee future results."
            ]
      },
      {
            "heading": "Advertising and affiliate disclosure",
            "paragraphs": [
                  "This site is supported by advertising (including Google AdSense). Advertising does not influence calculator formulas or editorial content. Where we link to products or services, we aim to do so on merit; assume links may be commercial in nature and check terms with the provider."
            ]
      },
      {
            "heading": "Your responsibility",
            "paragraphs": [
                  "Decisions you make using these tools are your own. If a decision is large, irreversible or tax-sensitive, get advice from a qualified, regulated professional in your country before acting."
            ]
      }
]}
    />
    </>
  )
}
