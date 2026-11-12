import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/LegalPage"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Editorial Policy — How DailyFinance Researches, Writes & Reviews",
  description: "How DailyFinance chooses topics, researches primary sources, drafts with human-led AI assistance, verifies every figure and corrects errors.",
  alternates: { canonical: "https://www.dailyfinance.tools/editorial-policy" },
  openGraph: {
    title: "Editorial Policy — How DailyFinance Researches, Writes & Reviews",
    description: "How DailyFinance chooses topics, researches primary sources, drafts with human-led AI assistance, verifies every figure and corrects errors.",
    url: "https://www.dailyfinance.tools/editorial-policy",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Editorial Policy — DailyFinance.tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Policy — How DailyFinance Researches, Writes & Reviews",
    description: "How DailyFinance chooses topics, researches primary sources, drafts with human-led AI assistance, verifies every figure and corrects errors.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function EditorialPolicyPage() {
  return (
    <>
      <script id="schema-crumb-editorial-policy" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Editorial Policy", url: "https://www.dailyfinance.tools/editorial-policy" }])) }} />
      <LegalPage
      title="Editorial Policy"
      updated="11 November 2026"
      intro="DailyFinance publishes financial calculators and guides in a high-trust category — your money. This page sets out, plainly, how our content is chosen, researched, written, checked and corrected, so readers (and reviewers) can judge whether it deserves that trust."
      sections={[
        { heading: "How we choose topics", paragraphs: [
          "Topics start from real questions: what people actually search for when a money decision is in front of them — a tax bill, a mortgage payment, a platform fee. We do not publish pages on subjects where we cannot add a verified number, a worked example or a working calculator. Where a calculation does not genuinely change by location or scenario, we do not spin out duplicate pages; variants live inside the relevant tool or guide instead.",
        ]},
        { heading: "Research and sources", paragraphs: [
          "Every figure traces to a primary source where one exists: IRS publications and revenue procedures, Social Security Administration figures, state Departments of Revenue, and the platforms' own published fee schedules. Where a figure is a market estimate rather than a rule — an RPM band, an average combined sales-tax rate — the page labels it as an estimate and shows the basis. Our Methodology page documents the sources per calculator family.",
        ]},
        { heading: "How content is produced", paragraphs: [
          "Our writing is human-led and AI-assisted. Drafts may be prepared with AI tools for speed, but no page is published as a raw AI draft: a person structures each page around the verified data first, checks every number, rate, threshold and formula against its source, and rewrites anything generic into the specifics of the calculation. The standard is simple — if a paragraph could appear unchanged on any finance site, it does not ship.",
          "Each calculator page carries a self-contained quick answer, the formula or method, and a worked example with real numbers, so the page is useful even if the reader never touches the calculator.",
        ]},
        { heading: "Verification and professional review", paragraphs: [
          "Calculators, formulas and worked examples are reviewed by Tahir Shehzad, ACMA (Assistant Manager, Accounts & Finance — IFRS reporting, payroll, taxation and compliance), who is named, with his credentials, on every calculator page. Guide pages carry a reviewed-by line and an updated date. Review covers arithmetic, whether assumptions match professional practice, and whether anything on the page could mislead a reader about their own money.",
        ]},
        { heading: "Corrections", paragraphs: [
          "If we get something wrong, we fix it and we do not hide it. Readers can report an error through the Contact page; error reports are triaged ahead of feature requests. A verified correction is applied to the source data or formula — for state pages, that means the single shared dataset, so the fix lands on every affected page at once — and the page's updated date changes.",
        ]},
        { heading: "Updates", paragraphs: [
          "Tax-year figures are refreshed when the IRS publishes the new year. Platform fees and program rules are re-checked at least quarterly. State and city tax data is reviewed at least twice a year and whenever a state announces a change. Guides show their last-updated date; calculators state their assumptions on the page.",
        ]},
        { heading: "Advertising and independence", paragraphs: [
          "DailyFinance is free to use. We may show advertising and offer an optional Pro subscription; neither influences calculator results, rankings or guide conclusions — there are no paid placements inside calculations. Where a page links to a tool or service, it is because the page's own content calls for it.",
        ]},
        { heading: "The limit of our content", paragraphs: [
          "Everything here is education, not advice. Calculators produce estimates from the inputs and assumptions shown; they cannot see your full situation, and nothing on this site is financial, tax, legal or investment advice tailored to you. See the Disclaimer, and confirm material decisions with official sources or a qualified professional.",
        ]},
      ]}
    />
    </>
  )
}
