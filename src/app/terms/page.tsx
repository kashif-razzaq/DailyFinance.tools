import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/LegalPage"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Terms of Service — The Rules for Using Daily Finance Tools",
  description: "The terms that govern your use of DailyFinance calculators and content: educational estimates, acceptable use, and liability limits.",
  alternates: { canonical: "https://www.dailyfinance.tools/terms" },
  openGraph: {
    title: "Terms of Service — The Rules for Using Daily Finance Tools",
    description: "The terms that govern your use of DailyFinance calculators and content: educational estimates, acceptable use, and liability limits.",
    url: "https://www.dailyfinance.tools/terms",
    siteName: "Daily Finance Tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Terms of Service — The Rules for Using Daily Finance Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — The Rules for Using Daily Finance Tools",
    description: "The terms that govern your use of DailyFinance calculators and content: educational estimates, acceptable use, and liability limits.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function Page() {
  return (
    <>
      <script id="schema-crumb-terms" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Terms of Service", url: "https://www.dailyfinance.tools/terms" }])) }} />
      <LegalPage
      title="Terms of Service"
      updated="22 November 2026"
      intro={"These terms govern your use of dailyfinance.tools (the 'Site'), operated as DailyFinance. By using the Site you accept these terms. If you do not agree, please do not use the Site."}
      sections={[
      {
            "heading": "The service",
            "paragraphs": [
                  "DailyFinance provides free online financial calculators, estimators and educational content for freelancers, creators, e-commerce sellers, real estate investors and individuals planning their finances. Some features (such as saving scenarios) require a free account."
            ]
      },
      {
            "heading": "Educational estimates \u2014 not financial advice",
            "paragraphs": [
                  "All calculator results are estimates produced from the inputs and assumptions shown on each page. They are educational tools only and are not financial, tax, legal or investment advice, and they do not create an adviser\u2013client relationship. Tax rates, contribution limits, platform fees and program rules change; verify any figure that matters with the relevant authority (for example the IRS) or a qualified professional before acting. See our Disclaimer for more detail."
            ]
      },
      {
            "heading": "Acceptable use",
            "paragraphs": [
                  "You agree not to misuse the Site: do not attempt to gain unauthorised access, disrupt the service, scrape it at abusive rates, upload malicious content, or use the calculators to facilitate unlawful activity. Embedded versions of our calculators may be used on your own website in line with any conditions shown on the embed page."
            ]
      },
      {
            "heading": "Accounts",
            "paragraphs": [
                  "You are responsible for your account credentials and for activity under your account. Provide accurate information and tell us via the Contact page if you suspect unauthorised use."
            ]
      },
      {
            "heading": "Termination",
            "paragraphs": [
                  "We may suspend or terminate your account if you breach these terms or misuse the Site. You may close your account at any time by emailing info@dailyfinance.tools; we will delete your account and its saved scenarios. Termination does not affect any rights or obligations that arose before it."
            ]
      },
      {
            "heading": "Intellectual property",
            "paragraphs": [
                  "The Site's content, design and code belong to DailyFinance or its licensors. You may use results produced by the calculators for your own personal or business purposes. Do not reproduce substantial parts of the Site's editorial content without permission."
            ]
      },
      {
            "heading": "Third-party services",
            "paragraphs": [
                  "The Site uses third-party services (Supabase for accounts and data, Vercel for hosting, Zoho for email delivery) and may link to third-party websites. The Site currently shows no advertising. We are not responsible for third-party content, policies or practices."
            ]
      },
      {
            "heading": "Availability and liability",
            "paragraphs": [
                  "The Site is provided 'as is' without warranties of any kind. We work to keep calculations accurate and the Site available, but we do not warrant that results are error-free or that the Site will be uninterrupted. To the maximum extent permitted by law, DailyFinance is not liable for losses arising from reliance on calculator estimates or from use of the Site."
            ]
      },
      {
            "heading": "Governing law",
            "paragraphs": [
                  "These terms are governed by the laws of Pakistan. Any dispute arising from these terms or your use of the Site will be subject to the exclusive jurisdiction of the courts of Pakistan."
            ]
      },
      {
            "heading": "Changes",
            "paragraphs": [
                  "We may update these terms; the current version will always be on this page. Continued use after changes take effect means you accept the updated terms."
            ]
      }
]}
    />
    </>
  )
}
