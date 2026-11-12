import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/layout/LegalPage"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Methodology — How DailyFinance Calculates, Sources & Reviews Numbers",
  description: "How DailyFinance builds its calculators: formula sources (IRS, SSA, platform fee schedules), ACMA review, update cadence and accuracy limits.",
  alternates: { canonical: "https://www.dailyfinance.tools/methodology" },
  openGraph: {
    title: "Methodology — How DailyFinance Calculates, Sources & Reviews Numbers",
    description: "How DailyFinance builds its calculators: formula sources (IRS, SSA, platform fee schedules), ACMA review, update cadence and accuracy limits.",
    url: "https://www.dailyfinance.tools/methodology",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Methodology — How DailyFinance Calculates, Sources & Reviews Numbers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Methodology — How DailyFinance Calculates, Sources & Reviews Numbers",
    description: "How DailyFinance builds its calculators: formula sources (IRS, SSA, platform fee schedules), ACMA review, update cadence and accuracy limits.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function MethodologyPage() {
  return (
    <>
      <script id="schema-crumb-methodology" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Methodology", url: "https://www.dailyfinance.tools/methodology" }])) }} />
      <LegalPage
      title="Our Methodology"
      updated="6 November 2026"
      intro="Every number on DailyFinance comes from a published formula, an official schedule or a documented assumption — never a guess dressed up as precision. This page explains where our inputs come from, who reviews them, how location data is handled, and how often everything is re-checked."
      sections={[
        { heading: "Formula sources", paragraphs: [
          "Tax calculators implement the published mechanics of the relevant authority: IRS publications and revenue procedures for federal tax, self-employment tax (15.3% on 92.35% of net earnings), estimated-tax safe harbours and retirement contribution limits; Social Security Administration figures for wage bases; and state Departments of Revenue for state rates.",
          "Platform tools implement the platforms' own published schedules: YouTube's revenue-share and typical RPM ranges by niche, TikTok's Creator Rewards Program rules (the Creator Fund closed in December 2023), Amazon's referral and FBA fee tables by category and size tier, Shopify/Stripe/PayPal/Etsy/Patreon fee schedules, and lender-standard amortization maths (PMT = P·r(1+r)ⁿ/((1+r)ⁿ−1)) for loan tools.",
          "Where a number is a market estimate rather than a rule — RPM bands, cap-rate norms, average combined sales-tax rates — the page says so and shows a range or labels the figure an approximation.",
        ]},
        { heading: "Professional review", paragraphs: [
          "Calculators and their underlying models are reviewed by Tahir Shehzad, ACMA (Assistant Manager, Accounts & Finance), whose work covers IFRS reporting, payroll, taxation and compliance for a multi-entity group. Review covers formula correctness, worked-example arithmetic and whether the assumptions a page presents match how the calculation is done in professional practice.",
          "DailyFinance is built and maintained by Kashif (wpkashif), a professional web developer. Reader error reports via the Contact page are triaged ahead of feature requests.",
        ]},
        { heading: "Location (state) data", paragraphs: [
          "State pages (for example our sales-tax-by-state guides) are generated from a single dataset so a correction lands everywhere at once. State base sales-tax rates are the statutory statewide rates. 'Average combined' rates are Tax Foundation-style averages across county, city and district layers — they are approximations for orientation and examples, and every location page states that your exact rate depends on your specific address and directs you to your state Department of Revenue.",
          "Average effective property-tax rates are Census/Tax Foundation-style state averages for owner-occupied homes; individual bills depend on county assessment, exemptions and millage. Income-tax descriptions summarise structure (none / flat / progressive) and headline rates; they are not filing guidance.",
        ]},
        { heading: "Update cadence", paragraphs: [
          "Tax-year figures (brackets, limits, wage bases) are refreshed when the IRS publishes the new year. Platform fees and program rules are re-checked at least quarterly and whenever a platform announces a change. Location data is reviewed at least twice a year and after any state announces a rate change. Pages affected by a known change are corrected as soon as the change is verified against the primary source.",
        ]},
        { heading: "What these tools are not", paragraphs: [
          "Calculators are educational estimates based on the inputs and assumptions shown. They are not financial, tax, legal or investment advice, and they cannot see your full situation. See the Disclaimer and confirm material decisions with official sources or a qualified professional.",
        ]},
        { heading: "Corrections", paragraphs: [
          "Found an error? Contact us with the calculator name, your inputs and the source you believe is correct. Verified corrections are published and, where a figure was materially wrong, the page's examples are re-worked. Start from the Contact page.",
        ]},
      ]}
    />
    </>
  )
}
