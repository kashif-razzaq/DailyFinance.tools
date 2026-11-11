import type { Metadata } from "next"
import Link from "next/link"
import { navigationCategories, getToolUrl } from "@/config/navigation"
import { Calculator, Eye, ShieldCheck, RefreshCw } from "lucide-react"

export const metadata: Metadata = {
  title: "About DailyFinance — Free Financial Calculators, Reviewed by a Finance Professional",
  description: "Free, transparent financial calculators for freelancers, creators, sellers and investors — every formula shown, reviewed by Tahir Shehzad, ACMA.",
  alternates: { canonical: "https://dailyfinance.tools/about" },
  openGraph: {
    title: "About DailyFinance — Free Financial Calculators, Reviewed by a Finance Professional",
    description: "Free, transparent financial calculators for freelancers, creators, sellers and investors — every formula shown, reviewed by Tahir Shehzad, ACMA.",
    url: "https://dailyfinance.tools/about",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "About DailyFinance — Free Financial Calculators, Reviewed by a Finance Professional" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About DailyFinance — Free Financial Calculators, Reviewed by a Finance Professional",
    description: "Free, transparent financial calculators for freelancers, creators, sellers and investors — every formula shown, reviewed by Tahir Shehzad, ACMA.",
    images: ["https://dailyfinance.tools/images/og-base.jpg"],
  },
}

export default function AboutPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-14 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">About DailyFinance</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          DailyFinance exists because most financial decisions are made with guessed numbers. A freelancer guesses a rate. A seller guesses a margin. A home buyer guesses a payment. We build free, precision-engineered calculators that replace the guess with a model — the formula shown, the assumptions visible, and a worked example you can check yourself.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-12">
          The site serves five communities that mainstream finance tools ignore: freelancers and the self-employed, creators, e-commerce sellers, real estate investors, and people building long-term wealth through FIRE and retirement planning. Every tool is free, works instantly in your browser with no sign-up, and can optionally be saved to a free account if you want to revisit your scenarios.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          <div className="bg-card border rounded-3xl p-6">
            <Eye className="h-6 w-6 text-primary mb-3" />
            <h2 className="font-bold text-lg mb-2">Transparent by default</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">No black boxes. Every calculator displays its formula, defines every variable, and works through real-number scenarios, so you can verify the maths or take the reasoning to your accountant, lender or client.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <ShieldCheck className="h-6 w-6 text-primary mb-3" />
            <h2 className="font-bold text-lg mb-2">Reviewed by a professional</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Our calculators are reviewed by Tahir Shehzad, ACMA — an Assistant Manager, Accounts &amp; Finance running finance for a multi-entity group across IFRS reporting, payroll, taxation and compliance. His models keep the tools grounded in how finance actually works.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <RefreshCw className="h-6 w-6 text-primary mb-3" />
            <h2 className="font-bold text-lg mb-2">Kept current</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Tax brackets, retirement limits, platform fees and creator program rules change constantly — TikTok&apos;s Creator Fund, for example, was replaced by the Creator Rewards Program. We update tools when the rules change and date the updates on each page.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <Calculator className="h-6 w-6 text-primary mb-3" />
            <h2 className="font-bold text-lg mb-2">Built by a working developer</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">DailyFinance is designed and developed by Kashif (wpkashif), a web developer with years of experience building tools for clients worldwide — and a freelancer himself, which is exactly why the freelance hub was built first and built deepest.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-4">Explore the tools</h2>
        <div className="space-y-3 mb-14">
          {navigationCategories.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`} className="flex items-center justify-between bg-card border rounded-2xl px-6 py-4 hover:border-primary/40 transition-colors group">
              <span>
                <span className="font-semibold group-hover:text-primary transition-colors">{cat.name} Calculators</span>
                <span className="block text-sm text-muted-foreground">{cat.description} {cat.calculators.length} free tools.</span>
              </span>
              <span className="text-sm font-semibold text-primary">View hub →</span>
            </Link>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
          <h2 className="font-bold text-xl mb-2">Important note</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">DailyFinance provides educational calculators and estimates, not personal financial, tax or investment advice. Results depend on your inputs and on rules that change; confirm important decisions with official sources or a qualified professional. Read our full <Link href="/disclaimer" className="text-primary font-semibold">Disclaimer</Link> and <Link href="/privacy" className="text-primary font-semibold">Privacy Policy</Link>.</p>
          <Link href="/tools" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">Browse all calculators</Link>
        </div>
      </div>
    </main>
  )
}
