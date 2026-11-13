import type { Metadata } from "next"
import Link from "next/link"
import { breadcrumb, stringifyJsonLd } from "@/lib/schema"
import { isValidContactType, type ContactInquiryType } from "@/lib/contact"
import { ContactForm } from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact DailyFinance — Corrections, Tool Requests & Enquiries",
  description: "Contact the DailyFinance team: report a calculator error, request a new tool, or ask about partnerships and embeds. We read every message.",
  alternates: { canonical: "https://www.dailyfinance.tools/contact" },
  openGraph: {
    title: "Contact DailyFinance — Corrections, Tool Requests & Enquiries",
    description: "Contact the DailyFinance team: report a calculator error, request a new tool, or ask about partnerships and embeds. We read every message.",
    url: "https://www.dailyfinance.tools/contact",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Contact DailyFinance — Corrections, Tool Requests & Enquiries" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact DailyFinance — Corrections, Tool Requests & Enquiries",
    description: "Contact the DailyFinance team: report a calculator error, request a new tool, or ask about partnerships and embeds. We read every message.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

const topics = [
  { title: "Report a calculation error", text: "Spotted a wrong rate, an outdated fee or a formula that behaves oddly? Tell us the calculator name, the inputs you used and what you expected. Accuracy reports are our highest priority and are normally reviewed within a few working days." },
  { title: "Request a calculator", text: "Missing a tool your niche needs? Send the calculation you do today (a spreadsheet formula is perfect) and how you would use it. Most of our roadmap comes from reader requests." },
  { title: "Embeds & partnerships", text: "Our calculators can be embedded on other websites. For white-label embeds, paid promotion or guest posting, use the form below and choose the matching type — include your site and audience details." },
  { title: "Privacy requests", text: "To access or delete account data, mention 'Privacy' in your message and the email address on your account. See the Privacy Policy for what we store and your rights." },
]

const faqs = [
  { q: "How quickly do you reply?", a: "We read every message and aim to reply within 2–3 working days. Calculation-error reports are triaged faster because accuracy is the whole product." },
  { q: "Can you give me personal financial advice?", a: "No — DailyFinance provides educational calculators, not regulated advice. The tools will give you solid estimates to discuss with a qualified adviser, accountant or lender." },
  { q: "Can I suggest an update to tax rates or fees?", a: "Yes, please do — include the official source (IRS page, platform fee schedule) so we can verify and update quickly." },
  { q: "Do you accept guest posts or link placements?", a: "Use the form below and choose the matching inquiry type. We read every request and reply if it is a fit — we do not sell links." },
]

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>
}) {
  const params = await searchParams
  const rawType = Array.isArray(params.type) ? params.type[0] : params.type
  const initialType: ContactInquiryType = rawType && isValidContactType(rawType) ? rawType : 'other'

  return (
    <main className="w-full bg-background min-h-screen">
      <script id="schema-crumb-contact" type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumb([{ name: "Home", url: "https://www.dailyfinance.tools/" }, { name: "Contact", url: "https://www.dailyfinance.tools/contact" }])) }} />
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">Contact Us</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          Have a question, a correction or a tool request? We want to hear it — DailyFinance improves fastest when readers tell us where a number looks wrong or a calculator is missing.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-12">
          Use the form below and choose your topic so your message lands with the right context. We read every message and aim to reply within 2–3 working days.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <h2 className="font-bold text-lg">Email us directly</h2>
            <p className="text-sm text-muted-foreground">For corrections, tool requests, privacy requests and business enquiries:</p>
          </div>
          <a href="mailto:info@dailyfinance.tools" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shrink-0">info@dailyfinance.tools</a>
        </div>

        <div className="bg-card border rounded-3xl p-6 md:p-8 mb-14">
          <h2 className="font-bold text-xl mb-2">Send us a message</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Corrections, tool requests, privacy requests — or business enquiries: paid promotion, guest posting and white-label embeds. Choose the matching type so we can answer properly.
          </p>
          <ContactForm initialType={initialType} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {topics.map((t) => (
            <div key={t.title} className="bg-card border rounded-3xl p-6">
              <h2 className="font-bold text-lg mb-2">{t.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-6">Before you write — quick answers</h2>
        <div className="space-y-6 mb-14">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-border/50 pb-6">
              <h3 className="font-semibold mb-1.5">{f.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
          <h2 className="font-bold text-xl mb-2">Looking for a calculator instead?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">Browse the full directory — rates, taxes, margins, mortgages, FIRE and more, all free with no sign-up.</p>
          <Link href="/tools" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">Browse all calculators</Link>
        </div>
      </div>
    </main>
  )
}
