import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/LegalPage"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Cookie Policy | DailyFinance",
  description: "What cookies DailyFinance uses and how to control them — one essential sign-in cookie, preferences in local storage, and no analytics or advertising cookies.",
  alternates: { canonical: "https://www.dailyfinance.tools/cookies" },
  openGraph: {
    title: "Cookie Policy | DailyFinance",
    description: "What cookies DailyFinance uses and how to control them — one essential sign-in cookie, preferences in local storage, and no analytics or advertising cookies.",
    url: "https://www.dailyfinance.tools/cookies",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Cookie Policy | DailyFinance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | DailyFinance",
    description: "What cookies DailyFinance uses and how to control them — one essential sign-in cookie, preferences in local storage, and no analytics or advertising cookies.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function Page() {
  return (
    <>
      <script id="schema-crumb-cookies" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Cookie Policy", url: "https://www.dailyfinance.tools/cookies" }])) }} />
      <LegalPage
      title="Cookie Policy"
      updated="19 November 2026"
      intro={"This policy explains the cookies and similar technologies used on dailyfinance.tools, why they are used, and how you can control them. In short: one essential sign-in cookie, plus preferences stored in your browser. No analytics or advertising cookies. It should be read with our Privacy Policy."}
      sections={[
      {
            "heading": "What cookies are",
            "paragraphs": [
                  "Cookies are small text files stored on your device by your browser. Similar technologies include local storage, which this site uses to remember preferences such as currency and theme. This site uses cookies and local storage only to make features work \u2014 not to track you."
            ]
      },
      {
            "heading": "Essential cookies",
            "paragraphs": [
                  "Authentication and security cookies from our provider (Supabase) keep you signed in and protect your account. The site also stores simple preferences in local storage: your selected currency, your theme, and whether you have dismissed or completed the consultation prompt. These are required for the features they support and cannot be switched off in our systems, though you can clear them in your browser (sign-in will then not work until you sign in again)."
            ]
      },
      {
            "heading": "Analytics cookies",
            "paragraphs": [
                  "We do not use analytics cookies. No analytics software runs on this site, so no cookies are set to count visits or measure usage."
            ]
      },
      {
            "heading": "Advertising cookies",
            "paragraphs": [
                  "We do not use advertising cookies. This site currently shows no advertising. If advertising is added in the future (for example Google AdSense), this page will be updated before any advertising cookies are set, and consent choices will be offered where the law requires them."
            ]
      },
      {
            "heading": "How to control cookies",
            "paragraphs": [
                  "Most browsers let you view, delete and block cookies in settings. Blocking the essential sign-in cookie will stop sign-in and saved scenarios from working. Clearing local storage resets your currency, theme and consultation-prompt preferences. You can also use your browser's private/incognito mode for a session that leaves nothing behind."
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
