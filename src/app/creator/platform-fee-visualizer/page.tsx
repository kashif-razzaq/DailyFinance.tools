import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { PieChart, DollarSign, Activity, AlertTriangle, CreditCard, Globe } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Creator Platform Fee Calculator | Patreon vs Substack vs Gumroad",
  description: "Compare hidden fees across Patreon, Substack, Gumroad, Ko-fi, and OnlyFans. Calculate your true net take-home pay based on transaction size and volume.",
  keywords: ["patreon fee calculator", "substack fee calculator", "gumroad fees", "ko-fi fees", "onlyfans fee calculator", "creator platform fee visualizer", "payment processing fees"],
  slug: "creator/platform-fee-visualizer",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "Why are my actual Patreon earnings so much lower than my gross revenue?",
    answer: "Because you are paying two separate fees. Patreon takes a platform fee (5%, 8%, or 12%), but you must also pay payment processing fees (Stripe/PayPal) which typically cost 2.9% + $0.30 per transaction. International transactions add another 1-2.5% in currency conversion fees."
  },
  {
    question: "Why do small transactions get hit with higher fee percentages?",
    answer: "Because of the fixed processing fee. If you charge $1, the $0.30 fixed fee eats 30% of your revenue immediately, plus the 2.9% variable fee. If you charge $100, that same $0.30 fixed fee is mathematically invisible. This is why you should never offer a $1 tier on Patreon or Substack."
  },
  {
    question: "Is Ko-fi really free?",
    answer: "Ko-fi does not charge a platform fee on donations, but you still have to pay PayPal or Stripe their standard processing fees (2.9% + $0.30). Furthermore, to unlock memberships and store features, you must pay $6/month for Ko-fi Gold or give them a 5% cut."
  },
  {
    question: "How much does Gumroad take?",
    answer: "Gumroad recently switched to a flat 10% platform fee, plus standard credit card processing fees (2.9% + $0.30). While this is simple, it can be expensive for high-volume creators compared to flat-fee SaaS platforms."
  },
  {
    question: "What is an 'Effective Fee Rate'?",
    answer: "Your effective fee rate is the true percentage of your gross revenue that disappears to fees. If you make $100 and receive $82 in your bank account, your effective fee rate is 18%. This is the only metric that matters when comparing platforms."
  }
]

export default function PlatformFeePage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Creator Platform Fee Calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Compare Creator Platform Fees",
    "description": "Calculate your true take-home pay across Patreon, Substack, Gumroad, and Ko-fi.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Gross Revenue",
        "text": "Enter your expected monthly revenue from digital products or subscriptions."
      },
      {
        "@type": "HowToStep",
        "name": "Input Average Transaction Size",
        "text": "This is crucial. Small transactions ($3) suffer massively from fixed processing fees compared to large transactions ($50)."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate International Buyers",
        "text": "If a large portion of your audience is outside your home country, currency conversion and international card fees will spike your effective fee rate."
      },
      {
        "@type": "HowToStep",
        "name": "Compare Net Revenue",
        "text": "Look at the visualizer to see which platform allows you to keep the most money in your pocket."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://dailyfinance.tools/creator/platform-fee-visualizer",
        "url": "https://dailyfinance.tools/creator/platform-fee-visualizer",
        "name": "Creator Platform Fee Calculator | Patreon vs Substack vs Gumroad",
        "description": "Compare hidden fees across Patreon, Substack, Gumroad, Ko-fi, and OnlyFans. Calculate your true net take-home pay."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://dailyfinance.tools/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Creator Economy",
            "item": "https://dailyfinance.tools/creator"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Platform Fee Visualizer",
            "item": "https://dailyfinance.tools/creator/platform-fee-visualizer"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-software-application"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Script
        id="schema-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ToolLayout
        title="Platform Fee Visualizer"
        description="Stop losing 20% of your income to hidden fees. Compare Patreon, Substack, Gumroad, and Ko-fi to calculate your true net take-home pay based on transaction size."
        slug="platform-fee-visualizer"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-indigo-500" />
              Quick Answer: Which Creator Platform Takes the Lowest Fees?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              When factoring in both platform cuts and payment processing fees, <strong>Ko-fi (Gold)</strong> offers the lowest effective fee rate (roughly 3-5%) for established creators because it charges a flat $6/month rather than a percentage. Conversely, platforms like <strong>Patreon (Pro)</strong> and <strong>Gumroad</strong> will cost you between 13% and 18% of your gross revenue, depending heavily on your average transaction size and international audience ratio.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Illusion of "Free" Creator Platforms
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you sign up for a creator platform, the marketing copy usually boasts "Start for free! We only take 5%!" What they don't explicitly highlight is the complex web of payment processing fees, currency conversion charges, and payout transfer fees that sit underneath their platform cut.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you do not accurately calculate your <strong>Effective Fee Rate</strong>, you will mistakenly price your memberships and digital products too low, resulting in a net payout that barely covers your business expenses.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <PieChart className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Platform Cut</h3>
              <p className="text-sm text-neutral-500 font-light">This is what the software company takes for hosting your content. Patreon takes 8-12%, Substack takes 10%, and Gumroad takes 10%.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <CreditCard className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Payment Processing</h3>
              <p className="text-sm text-neutral-500 font-light">Stripe and PayPal process the actual credit cards. They universally charge roughly 2.9% plus a fixed $0.30 per transaction.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Globe className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">International Fees</h3>
              <p className="text-sm text-neutral-500 font-light">If a fan in Europe buys from a US creator, Stripe adds an additional 1% to 1.5% fee to handle the cross-border currency conversion.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Danger of Small Transactions ($1 to $3 Tiers)
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The most important variable in our fee calculator is the <strong>Average Transaction Size</strong>. Why? Because of the fixed $0.30 processing fee attached to almost every credit card transaction.
          </p>

          <div className="bg-white border-l-4 border-red-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The $1 Tier Disaster</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mb-4">
              Imagine you set up a $1 "Tip Jar" tier on Patreon.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600 font-light">
              <li>You make $1.00</li>
              <li>Patreon takes 8% ($0.08)</li>
              <li>Stripe takes 2.9% ($0.03)</li>
              <li>Stripe takes a fixed $0.30</li>
            </ul>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mt-4">
              Total fees: $0.41. <strong>You lost 41% of your revenue to fees.</strong>
            </p>
          </div>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This mathematical reality is why creators must focus on pushing their ARPU (Average Revenue Per User) higher. If you sell a $50 digital product on Gumroad, that same $0.30 fixed fee is mathematically irrelevant (it accounts for just 0.6% of the transaction).
          </p>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            When to Graduate to Own-Your-Platform (White Label)
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Platforms like Patreon, Substack, and Gumroad are incredible for getting started because they act as the Merchant of Record. They handle global sales tax (VAT), fraud, and chargebacks. However, as your revenue scales past $10,000 a month, giving away 10% to the platform becomes a massive financial bleed.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Losing 10% on $1,000/mo is $100—an acceptable cost for software. Losing 10% on $50,000/mo is $5,000—an absurd amount of money to pay for hosting articles or videos.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">The Transition to Ghost, WordPress, or Custom Stacks</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            Large creators eventually transition to open-source or flat-fee platforms (like Ghost, Memberful, or a custom WordPress site with WooCommerce/Stripe). By doing this, the platform fee drops to 0%, and they only pay the raw Stripe processing fees (2.9% + 30c). While this requires hiring developers and handling your own sales tax compliance, the ROI is mathematically undeniable at scale.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
