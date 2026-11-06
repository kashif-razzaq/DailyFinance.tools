import type { Metadata } from "next"
import { LegalPage } from "@/components/layout/LegalPage"

export const metadata: Metadata = {
  title: "Privacy Policy | DailyFinance",
  description: "How DailyFinance collects, uses and protects your information, including advertising cookies from Google AdSense and your choices about them.",
  alternates: { canonical: "https://dailyfinance.tools/privacy" },
}

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="6 November 2026"
      intro={"DailyFinance (dailyfinance.tools) provides free financial calculators. This policy explains what information we collect when you use the site, how we use it, the advertising and analytics cookies involved, and the choices you have. By using this website you agree to this policy."}
      sections={[
      {
            "heading": "Information we collect",
            "paragraphs": [
                  "Calculator inputs: calculations run in your browser. If you use a tool without an account, your inputs are not sent to or stored on our servers.",
                  "Account information: if you create an account, we store your email address and account details through our authentication provider (Supabase) so you can sign in, and any calculator scenarios you choose to save are stored against your account.",
                  "Feedback: if you vote on whether a calculator was helpful, we store an anonymous aggregate count for that calculator.",
                  "Technical data: like most websites, our hosting and analytics providers automatically process technical data such as IP address, browser type, device information and pages visited, to operate, secure and improve the site."
            ]
      },
      {
            "heading": "How we use information",
            "paragraphs": [
                  "We use information to provide and maintain the calculators, operate accounts and saved scenarios, understand which tools are useful so we can improve them, respond to enquiries, and keep the site secure. We do not sell your personal information."
            ]
      },
      {
            "heading": "Cookies",
            "paragraphs": [
                  "We and our partners use cookies and similar technologies. Essential cookies keep you signed in and remember basic preferences. Analytics cookies help us understand aggregate usage. Advertising cookies are described in the next section. You can control cookies in your browser settings; the site remains usable with non-essential cookies blocked. See our Cookie Policy for detail."
            ]
      },
      {
            "heading": "Advertising \u2014 Google AdSense",
            "paragraphs": [
                  "We display advertising through Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and/or other sites on the Internet.",
                  "You may opt out of personalised advertising by visiting Google Ads Settings (adssettings.google.com). You can also opt out of some third-party vendors' use of cookies for personalised advertising at aboutads.info. Where required by law (for example in the EEA, UK and Switzerland), ads are served in line with the consent choices presented to you.",
                  "Google may collect and process data as described in Google's Privacy & Terms (policies.google.com/technologies/partner-sites explains how Google uses information from sites that use its services)."
            ]
      },
      {
            "heading": "Analytics",
            "paragraphs": [
                  "We may use privacy-respecting analytics to count visits and understand which calculators are used. Analytics data is aggregated and is not used to identify individual visitors for advertising by us."
            ]
      },
      {
            "heading": "Data sharing",
            "paragraphs": [
                  "We share data only with the service providers needed to run the site (hosting, authentication/database, analytics and advertising partners such as Google), or where required by law. Providers process data under their own privacy terms."
            ]
      },
      {
            "heading": "Your rights",
            "paragraphs": [
                  "Depending on where you live, you may have rights to access, correct, export or delete your personal data, and to object to certain processing. Account holders can delete saved scenarios inside the dashboard; to delete an account or exercise other rights, email us at momintechltd@gmail.com or use the Contact page and we will respond within a reasonable period."
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
                  "Questions about this policy can be sent to momintechltd@gmail.com or through our Contact page."
            ]
      }
]}
    />
  )
}
