import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact DailyFinance — Corrections, Tool Requests & Business Enquiries",
  description: "Contact the DailyFinance team: report a calculator error, request a new tool, or ask about partnerships and embeds. We read every message.",
  alternates: { canonical: "https://dailyfinance.tools/contact" },
  openGraph: {
    title: "Contact DailyFinance — Corrections, Tool Requests & Business Enquiries",
    description: "Contact the DailyFinance team: report a calculator error, request a new tool, or ask about partnerships and embeds. We read every message.",
    url: "https://dailyfinance.tools/contact",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Contact DailyFinance — Corrections, Tool Requests & Business Enquiries" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact DailyFinance — Corrections, Tool Requests & Business Enquiries",
    description: "Contact the DailyFinance team: report a calculator error, request a new tool, or ask about partnerships and embeds. We read every message.",
    images: ["https://dailyfinance.tools/images/og-base.jpg"],
  },
}

const topics = [
  { title: "Report a calculation error", text: "Spotted a wrong rate, an outdated fee or a formula that behaves oddly? Tell us the calculator name, the inputs you used and what you expected. Accuracy reports are our highest priority and are normally reviewed within a few working days." },
  { title: "Request a calculator", text: "Missing a tool your niche needs? Send the calculation you do today (a spreadsheet formula is perfect) and how you would use it. Most of our roadmap comes from reader requests." },
  { title: "Embeds & partnerships", text: "Our calculators can be embedded on other websites. For embed help, partnerships or advertising questions, use the consultation option shown across the site or reach out with your site and audience details." },
  { title: "Privacy requests", text: "To access or delete account data, mention 'Privacy' in your message and the email address on your account. See the Privacy Policy for what we store and your rights." },
]

const faqs = [
  { q: "How quickly do you reply?", a: "We read every message and aim to reply within 2–3 working days. Calculation-error reports are triaged faster because accuracy is the whole product." },
  { q: "Can you give me personal financial advice?", a: "No — DailyFinance provides educational calculators, not regulated advice. The tools will give you solid estimates to discuss with a qualified adviser, accountant or lender." },
  { q: "Can I suggest an update to tax rates or fees?", a: "Yes, please do — include the official source (IRS page, platform fee schedule) so we can verify and update quickly." },
  { q: "Do you accept guest posts or link placements?", a: "We do not sell links or publish paid guest posts. Genuine tool collaborations and embeds are welcome." },
]

export default function ContactPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-14 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">Contact Us</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          Have a question, a correction or a tool request? We want to hear it — DailyFinance improves fastest when readers tell us where a number looks wrong or a calculator is missing.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-12">
          The fastest route is the consultation/contact option available from the floating button and calculator pages across the site — it reaches the team directly with the page you were on attached. Choose your topic below so your message lands with the right context.
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <h2 className="font-bold text-lg">Email us directly</h2>
            <p className="text-sm text-muted-foreground">For corrections, tool requests, privacy requests and business enquiries:</p>
          </div>
          <a href="mailto:momintechltd@gmail.com" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shrink-0">momintechltd@gmail.com</a>
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
