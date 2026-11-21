import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/LegalPage"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Corrections Policy | DailyFinance",
  description: "How DailyFinance handles errors in its calculators and guides: what we correct, how to report a mistake, and how corrections are marked on the page.",
  alternates: { canonical: "https://www.dailyfinance.tools/corrections-policy" },
  openGraph: {
    title: "Corrections Policy | DailyFinance",
    description: "How DailyFinance handles errors in its calculators and guides: what we correct, how to report a mistake, and how corrections are marked on the page.",
    url: "https://www.dailyfinance.tools/corrections-policy",
    siteName: "Daily Finance Tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Corrections Policy | DailyFinance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corrections Policy | DailyFinance",
    description: "How DailyFinance handles errors in its calculators and guides: what we correct, how to report a mistake, and how corrections are marked on the page.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function Page() {
  return (
    <>
      <script id="schema-crumb-corrections-policy" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Corrections Policy", url: "https://www.dailyfinance.tools/corrections-policy" }])) }} />
      <LegalPage
      title="Corrections Policy"
      updated="21 November 2026"
      intro={"Every figure on this site is checked against its primary source before it is published, and every calculator is tested against a worked example. Mistakes still happen. When one does, we fix it promptly and say what changed. This policy explains what we correct, how to report an error, and how corrections are marked."}
      sections={[
      {
            "heading": "What we correct",
            "paragraphs": [
                  "Factual errors: a wrong figure, rate, threshold, date or formula; a source link that no longer supports the claim; a calculator that produces a wrong result. We also correct misspellings and formatting errors, and update figures that have been superseded by a new official release.",
                  "We do not remove or change accurate content because a reader disagrees with it. Estimates and worked examples are labelled as estimates; the underlying method is shown on the page so readers can check it."
            ]
      },
      {
            "heading": "How to report an error",
            "paragraphs": [
                  "Email info@dailyfinance.tools or use the Contact page. Tell us the page, the figure or sentence you believe is wrong, and — if you have it — the correct figure and its source. A link to the official source (IRS, Treasury, CFPB, Freddie Mac or the relevant agency) helps us verify the report quickly.",
                  "We aim to review every report within 5 business days. If the report is correct, we fix the page; if it is not, we reply explaining why, with the source we relied on."
            ]
      },
      {
            "heading": "How corrections are marked",
            "paragraphs": [
                  "A correction that changes a figure, a result or the meaning of a page is noted on the page itself, with the date it was corrected and what changed. The page's 'last updated' date is also updated.",
                  "Minor corrections that do not change any figure or meaning — a typo, a broken link, a formatting fix — are corrected without a note.",
                  "When a figure changes because an official source released new data (for example, a new IRS revenue procedure or a new Freddie Mac survey), the page is updated to the new figure and the 'last updated' date moves; this is a routine update, not a correction, and the source is cited on the page."
            ]
      },
      {
            "heading": "Calculator errors",
            "paragraphs": [
                  "If a calculator produces a wrong result, we treat it as urgent: the formula is re-checked against the worked example on the page and against the primary source, fixed, and the fix is noted on the tool's page. Saved scenarios are not recalculated — a saved scenario stores the inputs you entered, so reopening it with the corrected calculator shows the corrected result."
            ]
      },
      {
            "heading": "Changes to this policy",
            "paragraphs": [
                  "We may update this policy as the site grows. Material changes will be reflected on this page with a new 'last updated' date."
            ]
      },
      {
            "heading": "Contact",
            "paragraphs": [
                  "Questions about this policy can be sent to info@dailyfinance.tools or through our Contact page."
            ]
      }
]}
    />
    </>
  )
}
