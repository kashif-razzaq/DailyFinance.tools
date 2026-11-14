import type { Metadata } from "next"
import Link from "next/link"
import { getToolUrl } from "@/config/navigation"
import { Calculator, ClipboardPaste, Code2, MousePointerClick, RefreshCw, Globe, Wrench, BadgeCheck } from "lucide-react"
import { CopySnippet } from "./CopySnippet"

export const metadata: Metadata = {
  title: "Free Calculators for Your Website | DailyFinance.tools",
  description: "Add a free finance calculator to your website with one paste. 111 calculators, no signup or API key — the widget sizes itself and updates automatically.",
  alternates: { canonical: "https://www.dailyfinance.tools/embed" },
  openGraph: {
    title: "Free Calculators for Your Website | DailyFinance.tools",
    description: "Add a free finance calculator to your website with one paste. 111 calculators, no signup or API key — the widget sizes itself and updates automatically.",
    url: "https://www.dailyfinance.tools/embed",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://www.dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Free Calculators for Your Website | DailyFinance.tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Calculators for Your Website | DailyFinance.tools",
    description: "Add a free finance calculator to your website with one paste. 111 calculators, no signup or API key — the widget sizes itself and updates automatically.",
    images: ["https://www.dailyfinance.tools/images/og-base.jpg"],
  },
}

const EXAMPLE_SNIPPET = `<script src="https://www.dailyfinance.tools/embed.js"
        data-calculator="mortgage-payment-calculator"
        data-theme="light"></script>`

const POPULAR_TOOLS = [
  { title: "Mortgage Payment Calculator", slug: "mortgage-payment-calculator", description: "Monthly payment with principal, interest, taxes and insurance." },
  { title: "Compound Interest Scaler", slug: "compound-interest-scaler-calculator", description: "How savings grow over time with compounding." },
  { title: "Loan Calculator", slug: "loan-calculator", description: "Payment, total interest and amortization schedule." },
  { title: "Income Tax Calculator", slug: "income-tax-calculator", description: "Federal, state and FICA in one view." },
  { title: "Retirement Calculator", slug: "retirement-calculator", description: "Project savings to retirement age." },
  { title: "Mortgage Payoff Calculator", slug: "mortgage-payoff-calculator", description: "Extra payments: payoff date and interest saved." },
  { title: "Budget Calculator", slug: "budget-calculator", description: "Income vs spending, and your savings rate." },
  { title: "Refinance Calculator", slug: "refinance-calculator", description: "Break-even month and lifetime savings." },
] as const

const FAQS = [
  {
    q: "Does it cost anything?",
    a: "No. Every embeddable calculator is free, with no signup, no API key and no usage limit. The widget carries a small \"Powered by DailyFinance.tools\" link — that is the only condition.",
  },
  {
    q: "Will it slow my site down?",
    a: "The loader is a small script that inserts a single iframe, loaded lazily so it does not block your page. The widget is served from our servers, so there is nothing to install — the maths itself runs in your visitor's browser.",
  },
  {
    q: "Can I change the colours or theme?",
    a: "Yes. Set data-theme to \"light\" or \"dark\" on the script tag. The widget follows that theme; there are no other style options on the free embed.",
  },
  {
    q: "Do I need to credit you?",
    a: "No extra credit is needed. Every embedded calculator includes a \"Powered by DailyFinance.tools\" attribution bar with a link to the full calculator, built in by design.",
  },
] as const

export default function EmbedLandingPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">Free calculators for your website</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          Add any of our 111 free finance calculators to your website with one copy-paste. No signup, no API key, no code to maintain — the widget sizes itself to fit and updates automatically when we improve the calculator.
        </p>
        <Link href="/tools" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors mb-16">
          Browse all calculators
        </Link>

        <h2 className="text-2xl font-bold tracking-tight mb-6">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-card border rounded-3xl p-6">
            <MousePointerClick className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">1. Pick a calculator</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Choose from 111 free calculators — mortgage, tax, retirement, budgeting and more. Each one has an embed slug, shown on its card below.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <Code2 className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">2. Copy the snippet</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">One script tag, with the calculator slug and your choice of light or dark theme. Swap the slug to embed a different calculator.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <ClipboardPaste className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">3. Paste it into your page</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Paste the snippet anywhere in your page HTML. The widget appears in place, sizes itself to its content, and carries a &ldquo;Powered by DailyFinance.tools&rdquo; link.</p>
          </div>
        </div>

        <div className="bg-card border rounded-3xl p-6 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="font-bold text-lg">Example snippet — mortgage payment calculator</h3>
            <CopySnippet snippet={EXAMPLE_SNIPPET} />
          </div>
          <pre className="overflow-x-auto rounded-2xl bg-muted/60 p-4 text-sm leading-relaxed"><code>{EXAMPLE_SNIPPET}</code></pre>
          <p className="text-sm text-muted-foreground leading-relaxed mt-4">
            The iframe auto-sizes: the widget reports its exact height as it changes, so there is never blank space under it. A fixed height is available with <code className="rounded bg-muted px-1.5 py-0.5 text-xs">data-height</code> if you prefer one.
          </p>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-2">Popular tools to embed</h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Each card links to the full calculator on this site. The slug under each title is the value for <code className="rounded bg-muted px-1.5 py-0.5 text-xs">data-calculator</code>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {POPULAR_TOOLS.map((tool) => (
            <Link key={tool.slug} href={getToolUrl(tool.slug)} className="bg-card border rounded-3xl p-6 hover:border-primary/40 transition-colors group flex flex-col">
              <Calculator className="h-6 w-6 text-primary mb-3" />
              <span className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{tool.title}</span>
              <span className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{tool.description}</span>
              <code className="block truncate rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs text-muted-foreground">{tool.slug}</code>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-6">Why embed ours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          <div className="bg-card border rounded-3xl p-6">
            <BadgeCheck className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">Free forever</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">No charge, no trial, no usage limit. The calculators are free on our site and free embedded on yours.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <MousePointerClick className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">No signup or API key</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">There is no account to create and no key to manage. Copy the snippet and it works.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <RefreshCw className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">Updates automatically</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">When we fix a formula or update a tax bracket, the widget on your site updates with it. Nothing to reinstall.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <Globe className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">Works on any site</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">WordPress, Shopify, plain HTML — any page that accepts a script tag can host a widget.</p>
          </div>
          <div className="bg-card border rounded-3xl p-6">
            <Wrench className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-bold text-lg mb-2">No maintenance</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">The widget is hosted on our servers. You never host code, patch dependencies or fix a broken widget.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-6">Frequently asked questions</h2>
        <div className="space-y-3 mb-16">
          {FAQS.map((faq) => (
            <details key={faq.q} className="bg-card border rounded-2xl px-6 py-4 group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-4">
                {faq.q}
                <span className="text-primary text-lg leading-none group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
          <h2 className="font-bold text-xl mb-2">Need a branded or white-label embed?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            The free embed carries DailyFinance.tools branding. If you want a version styled for your own site, <Link href="/contact?type=white-label" className="text-primary font-semibold hover:underline">contact us</Link> and tell us what you need.
          </p>
          <Link href="/contact?type=white-label" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">Contact us</Link>
        </div>
      </div>
    </main>
  )
}
