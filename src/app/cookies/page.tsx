import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/LegalPage"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Cookie Policy | DailyFinance",
  description: "What cookies DailyFinance and its partners use, what they do, and how to control them — including Google AdSense advertising cookies.",
  alternates: { canonical: "https://www.dailyfinance.tools/cookies" },
  openGraph: {
    title: "Cookie Policy | DailyFinance",
    description: "What cookies DailyFinance and its partners use, what they do, and how to control them — including Google AdSense advertising cookies.",
    url: "https://www.dailyfinance.tools/cookies",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Cookie Policy | DailyFinance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | DailyFinance",
    description: "What cookies DailyFinance and its partners use, what they do, and how to control them — including Google AdSense advertising cookies.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function Page() {
  return (
    <>
      <script id="schema-crumb-cookies" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Cookie Policy", url: "https://www.dailyfinance.tools/cookies" }])) }} />
      <LegalPage
      title="Cookie Policy"
      updated="6 November 2026"
      intro={"This policy explains the cookies and similar technologies used on dailyfinance.tools, why they are used, and how you can control them. It should be read with our Privacy Policy."}
      sections={[
      {
            "heading": "What cookies are",
            "paragraphs": [
                  "Cookies are small text files stored on your device by your browser. Similar technologies include local storage (used to remember preferences such as currency) and pixels. They let a site function, remember choices, measure usage and \u2014 for advertising \u2014 make ads more relevant."
            ]
      },
      {
            "heading": "Essential cookies",
            "paragraphs": [
                  "Authentication and security cookies from our provider (Supabase) keep you signed in and protect your account. The site also stores simple preferences (such as selected currency) in local storage. These are required for the features they support and cannot be switched off in our systems, though you can block them in your browser (sign-in will then not work)."
            ]
      },
      {
            "heading": "Analytics cookies",
            "paragraphs": [
                  "Analytics cookies count visits and show us which calculators are popular, in aggregate. They help us decide which tools to improve. They are not used by us to build individual advertising profiles."
            ]
      },
      {
            "heading": "Advertising cookies \u2014 Google AdSense",
            "paragraphs": [
                  "Google and its partners use advertising cookies to serve and personalise ads on this site, to limit how often you see the same ad, and to measure ad performance. These cookies may track your browsing across sites that also use Google advertising services.",
                  "You can opt out of personalised ads in Google Ads Settings (adssettings.google.com), opt out of many third-party vendors at aboutads.info, and \u2014 where a consent banner is shown (EEA, UK, Switzerland) \u2014 change your consent choice at any time through that banner or your browser settings."
            ]
      },
      {
            "heading": "How to control cookies",
            "paragraphs": [
                  "Most browsers let you view, delete and block cookies in settings. Blocking essential cookies may break sign-in and saved scenarios; blocking advertising cookies means ads will be less relevant but will still appear. You can also use your browser's private/incognito mode for a cookie-free session."
            ]
      },
      {
            "heading": "Changes",
            "paragraphs": [
                  "If we change the cookies we use, we will update this page and refresh consent choices where the law requires."
            ]
      }
]}
    />
    </>
  )
}
