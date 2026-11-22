import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/LegalPage"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"

// 154 chars — keep within 120–158.
const PRIVACY_DESCRIPTION = "How DailyFinance collects, uses and protects your information. No analytics, no advertising — calculator inputs stay in your browser unless you save them."

export const metadata: Metadata = {
  title: "Privacy Policy | DailyFinance",
  description: PRIVACY_DESCRIPTION,
  alternates: { canonical: "https://www.dailyfinance.tools/privacy" },
  openGraph: {
    title: "Privacy Policy | DailyFinance",
    description: PRIVACY_DESCRIPTION,
    url: "https://www.dailyfinance.tools/privacy",
    siteName: "Daily Finance Tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Privacy Policy | DailyFinance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | DailyFinance",
    description: PRIVACY_DESCRIPTION,
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function Page() {
  return (
    <>
      <script id="schema-crumb-privacy" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Privacy Policy", url: "https://www.dailyfinance.tools/privacy" }])) }} />
      <LegalPage
      title="Privacy Policy"
      updated="22 November 2026"
      intro={"DailyFinance (dailyfinance.tools) provides free financial calculators. This policy explains what information we collect when you use the site, how we use it, and the choices you have. In short: calculations run in your browser, we do not run analytics, and the site currently shows no advertising. By using this website you agree to this policy."}
      sections={[
      {
            "heading": "Information we collect",
            "paragraphs": [
                  "Calculator inputs: calculations run in your browser. If you use a tool without an account, your inputs are not sent to or stored on our servers.",
                  "Account information: if you create an account, we store your email address and account details through our authentication provider (Supabase) so you can sign in, and any calculator scenarios you choose to save are stored against your account.",
                  "Contact messages: if you use the contact form, we store your name, email address and message so we can reply to you.",
                  "Feedback: if you vote on whether a calculator was helpful, we store an anonymous aggregate count for that calculator.",
                  "Technical data: like most websites, our hosting provider (Vercel) automatically processes technical data such as IP address, browser type, device information and pages visited, to deliver pages and keep the site secure. We do not use analytics software and do not build profiles of visitors."
            ]
      },
      {
            "heading": "How we use information",
            "paragraphs": [
                  "We use information to provide and maintain the calculators, operate accounts and saved scenarios, respond to inquiries, and keep the site secure. Anonymous feedback votes help us see which calculators visitors found helpful. We do not sell your personal information."
            ]
      },
      {
            "heading": "Legal basis for processing",
            "paragraphs": [
                  "We process personal data on these legal bases: contract — running your account, your saved scenarios and the calculators you use; legitimate interests — keeping the site secure, operating it reliably and responding to enquiries; and consent — where you choose to give us information, such as a contact message, a feedback vote, or the cookie choice you make in the consent banner. You can withdraw consent at any time by contacting us."
            ]
      },
      {
            "heading": "Cookies",
            "paragraphs": [
                  "We use only essential cookies: a session cookie from our authentication provider (Supabase) that keeps you signed in. We do not set analytics cookies or advertising cookies, and no third party sets cookies on this site. Simple preferences \u2014 your currency, theme, and whether you have dismissed the consultation prompt \u2014 are stored in your browser's local storage, not in cookies, and never leave your device. You can control cookies in your browser settings; blocking the session cookie will stop sign-in from working. See our Cookie Policy for detail."
            ]
      },
      {
            "heading": "Advertising",
            "paragraphs": [
                  "This site currently shows no advertising. We plan to apply for Google AdSense in the future. If advertising is added, this policy and the Cookie Policy will be updated before any ad code loads, and \u2014 where the law requires it \u2014 a consent choice will be presented first."
            ]
      },
      {
            "heading": "Analytics",
            "paragraphs": [
                  "We do not use analytics software. We do not count visits with tracking tools, and we do not collect data about your browsing for advertising or profiling."
            ]
      },
      {
            "heading": "Data sharing",
            "paragraphs": [
                  "We share data only with the service providers needed to run the site: Vercel (hosting), Supabase (authentication and database) and Zoho (email delivery for contact messages and account emails). We do not share data with advertising or analytics companies. We may also disclose data where required by law. Providers process data under their own privacy terms."
            ]
      },
      {
            "heading": "How long we keep data",
            "paragraphs": [
                  "Account email and saved scenarios: kept for as long as your account exists. You can delete saved scenarios at any time in the dashboard; to delete your account, email us (see Your rights below) and we will remove your account data.",
                  "Contact messages: kept while we handle your enquiry. We do not delete them automatically, so if you want a message removed, email us at info@dailyfinance.tools and we will delete it.",
                  "Anonymous feedback votes: stored only as aggregate counts per calculator, with no personal data attached, and kept for as long as the calculator page exists.",
                  "Technical data: processed by our hosting provider (Vercel) to deliver pages and keep the site secure, under Vercel's own retention practices. We do not keep server logs ourselves."
            ]
      },
      {
            "heading": "Your rights",
            "paragraphs": [
                  "Depending on where you live, you may have rights to access, correct, export or delete your personal data, and to object to certain processing. Account holders can delete saved scenarios inside the dashboard; to delete an account or exercise other rights, email us at info@dailyfinance.tools or use the Contact page and we will respond within 30 days."
            ]
      },
      {
            "heading": "Children",
            "paragraphs": [
                  "This site is a financial education tool intended for adults. It is not directed at children under 13 (or under 16 in the EEA), and we do not knowingly collect their personal information."
            ]
      },
      {
            "heading": "Changes to this policy",
            "paragraphs": [
                  "We may update this policy as the site or the law changes. Material changes will be reflected on this page with a new 'last updated' date."
            ]
      },
      {
            "heading": "Contact",
            "paragraphs": [
                  "Questions about this policy, or about your personal data, can be sent to info@dailyfinance.tools or through our Contact page. DailyFinance is a solo project with no appointed data protection officer; data-protection enquiries go to the same address and are handled by the site owner."
            ]
      }
]}
    />
    </>
  )
}
