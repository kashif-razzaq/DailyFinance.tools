import type { Metadata } from "next"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing — Free Calculators Forever, Pro for $2.99/mo | DailyFinance",
  description: "Free: 100+ calculators and a 3-scenario Vault. Pro ($2.99/mo): unlimited saves, scenario comparison, 5 Pro tools, full analytics, premium PDFs, zero ads.",
  alternates: { canonical: "https://dailyfinance.tools/pricing" },
  openGraph: {
    title: "Pricing — Free Calculators Forever, Pro for $2.99/mo | DailyFinance",
    description: "Free: 100+ calculators and a 3-scenario Vault. Pro ($2.99/mo): unlimited saves, scenario comparison, 5 Pro tools, full analytics, exports, zero ads.",
    url: "https://dailyfinance.tools/pricing",
    siteName: "DailyFinance.tools",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://dailyfinance.tools/images/og-base.jpg", width: 1376, height: 768, alt: "Pricing — Free Calculators Forever, Pro for $2.99/mo | DailyFinance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Free Calculators Forever, Pro for $2.99/mo | DailyFinance",
    description: "Free: 100+ calculators and a 3-scenario Vault. Pro ($2.99/mo): unlimited saves, scenario comparison, 5 Pro tools, full analytics, exports, zero ads.",
    images: ["https://dailyfinance.tools/images/og-base.jpg"],
  },
  keywords: ["dailyfinance pro", "financial calculator subscription", "scenario vault pricing"],
}

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    price: "$0",
    description: "Essential access to the core calculator engine.",
    features: [
      "All 100+ free calculators, with previews of the 5 Pro tools",
      "Real-time visual charts & graphs",
      "Responsive mobile experience",
      "Basic URL sharing",
      "Scenario Vault — save up to 3 scenarios",
      "Basic analytics snapshot (net position & balance sheet)",
      "Saved scenarios reopen with your numbers in place",
      "CSV & Excel data exports",
      "Community support",
    ],
    notIncluded: [
      "No Premium PDF reports",
      "No scenario comparison or Pro tools",
      "No full Cross-Data Analytics (charts, cash flow, DTI)",
      "Contains display ads",
    ],
    cta: "Get Started Free",
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: "$2.99",
    billingCycle: "/month",
    description: "The complete financial drive for power users.",
    features: [
      "Everything in Free, plus:",
      "Zero display ads",
      "Unlimited Scenario Vault storage",
      "Scenario cloning & duplicates",
      "Analytics CSV export — your whole financial picture",
      "Premium PDF report generation",
      "Scenario comparison — saved plans side by side",
      "5 exclusive Pro tools (Monte Carlo, Rental Analyzer, Business Valuation, IRR & NPV, Portfolio Rebalancer)",
      "Full Cross-Data Analytics (personal + business — balance sheet, debt costs, cash flow, charts & exports)",
      "Priority feature requests",
    ],
    notIncluded: [],
    cta: "Upgrade to Pro",
    mostPopular: true,
  },
]

export default function PricingPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Clarity for less than a cup of coffee.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Turn DailyFinance into your personal financial drive. Upgrade to Pro for $2.99/mo to unlock unlimited saves, scenario comparison, 5 Pro-only tools, instant exports and the full Cross-Data Analytics.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 xl:p-10 ${
                tier.mostPopular ? 'ring-2 ring-primary bg-primary/5' : 'ring-1 ring-border bg-card'
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 className={`text-lg font-semibold leading-8 ${tier.mostPopular ? 'text-primary' : 'text-foreground'}`}>
                  {tier.name}
                </h3>
                {tier.mostPopular && (
                  <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                    Most popular
                  </p>
                )}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">{tier.price}</span>
                {tier.billingCycle && <span className="text-sm font-semibold leading-6 text-muted-foreground">{tier.billingCycle}</span>}
              </p>
              <Link
                href="/login"
                className={`mt-6 flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${tier.mostPopular ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90" : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"}`}
              >
                {tier.cta}
              </Link>
              {tier.mostPopular && (
                <p className="mt-3 text-center text-xs text-muted-foreground">Start with a free account — upgrade from your dashboard in one click.</p>
              )}
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className={`h-6 w-5 flex-none ${tier.mostPopular ? 'text-primary' : 'text-emerald-500'}`} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
                {tier.notIncluded.map((feature) => (
                  <li key={feature} className="flex gap-x-3 text-muted-foreground/60">
                    <X className="h-6 w-5 flex-none" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Pricing FAQ — also emitted as FAQPage schema */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-8 text-center">Pricing questions</h2>
          <FaqAccordion
            className="text-left"
            items={[
              { question: "Are the calculators really free?", answer: "Yes. Every calculator on DailyFinance is free to use with no sign-up, including real-time charts. A free account adds basic URL sharing and a Scenario Vault with up to 3 saved scenarios." },
              { question: "What does Pro add?", answer: "Pro removes all advertising and unlocks the power features: unlimited Scenario Vault storage with cloning, scenario comparison side by side, 5 exclusive Pro tools, premium PDF report generation, an analytics-wide CSV export, and the full Cross-Data Analytics that combine your saved scenarios into a balance sheet, debt costs and cash flow." },
              { question: "How do I upgrade?", answer: "Create a free account first, then choose Upgrade from your dashboard or this page. Your saved scenarios and data carry over — nothing is lost when you upgrade or if you later return to Free." },
              { question: "Can I cancel anytime?", answer: "Yes. Pro is a simple monthly subscription with no lock-in. Cancelling returns your account to Free at the end of the billing period; your saved data stays in your account." },
            ]}
          />
        </div>
        <Script id="schema-pricing-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
            { "@type": "Question", name: "Are the calculators really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every calculator is free with no sign-up. A free account adds URL sharing and a Scenario Vault with up to 3 saved scenarios." } },
            { "@type": "Question", name: "What does Pro add?", acceptedAnswer: { "@type": "Answer", text: "Pro ($2.99/mo) removes ads and unlocks unlimited Vault storage with cloning, scenario comparison, 5 exclusive Pro tools, premium PDF reports, an analytics CSV export and full Cross-Data Analytics across personal and business saves." } },
            { "@type": "Question", name: "Can I cancel anytime?", acceptedAnswer: { "@type": "Answer", text: "Yes — no lock-in. Cancelling returns the account to Free at the end of the billing period and saved data is kept." } },
          ],
        }) }} />

      </div>
    </div>
  )
}
