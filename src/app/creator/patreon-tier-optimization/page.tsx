import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Users, Filter, DollarSign, Activity, Settings, RefreshCw, BarChart, AlertTriangle } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Patreon Earnings Calculator | Tier Optimization Tool",
  description: "Calculate your Patreon income, model churn rates, and optimize your membership tiers with our free Patreon earnings calculator. Maximize your creator revenue.",
  keywords: ["patreon earnings calculator", "patreon income calculator", "patreon fee calculator", "patreon tier optimization", "how much do patreon creators make", "patreon revenue estimator"],
  slug: "creator/patreon-tier-optimization",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate Patreon earnings?",
    answer: "Patreon earnings are calculated by taking the sum of your active subscribers multiplied by their respective tier prices (Gross Revenue), and then subtracting the Patreon Platform Fee (5%, 8%, or 12%) and Payment Processing Fees (typically 3-5%)."
  },
  {
    question: "What is a good conversion rate for Patreon?",
    answer: "A healthy conversion rate from a free audience (like YouTube subscribers or an email list) to a paid Patreon membership is generally between 1% and 3%. If you have 100,000 YouTube subscribers, you should aim for 1,000 to 3,000 Patreon patrons."
  },
  {
    question: "What is Patreon churn?",
    answer: "Churn is the percentage of patrons who cancel their subscription each month. A high churn rate (above 10%) usually indicates that the ongoing value of your membership tiers is not justifying the recurring monthly cost to the subscriber."
  },
  {
    question: "How much does Patreon take from creators?",
    answer: "Patreon takes a platform fee based on your plan: Lite (5%), Pro (8%), or Premium (12%). In addition to the platform fee, creators must also pay payment processing fees, which average around 5% of the transaction amount."
  },
  {
    question: "What is ARPU in memberships?",
    answer: "ARPU stands for Average Revenue Per User. It is calculated by dividing your Gross Monthly Revenue by your total number of active subscribers. Optimizing your tiers to push users toward higher-priced options increases your ARPU without needing to acquire new fans."
  }
]

export default function PatreonTierOptimizationPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Patreon Earnings Calculator",
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
    "name": "How to Calculate and Optimize Your Patreon Income",
    "description": "A step-by-step guide to modeling your Patreon revenue and reducing monthly churn.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Your Free Audience Size",
        "text": "Determine the total size of your highly engaged free audience (e.g., email subscribers or active YouTube viewers)."
      },
      {
        "@type": "HowToStep",
        "name": "Set Tier Pricing and Subscribers",
        "text": "Input the price point and the current (or projected) number of subscribers for each of your Patreon tiers."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Monthly Churn",
        "text": "Assign a churn rate to each tier. Lower-priced tiers generally see higher churn, while high-ticket tiers are stickier."
      },
      {
        "@type": "HowToStep",
        "name": "Deduct Platform Fees",
        "text": "Select your Patreon plan (5%, 8%, or 12%) to accurately calculate your net take-home pay after processing fees."
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
        "@id": "https://dailyfinance.tools/creator/patreon-tier-optimization",
        "url": "https://dailyfinance.tools/creator/patreon-tier-optimization",
        "name": "Patreon Earnings Calculator | Tier Optimization Tool",
        "description": "Calculate your Patreon income, model churn rates, and optimize your membership tiers with our free Patreon earnings calculator."
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
            "name": "Patreon Tier Optimization",
            "item": "https://dailyfinance.tools/creator/patreon-tier-optimization"
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
        title="Patreon Earnings Calculator"
        description="Calculate your net Patreon income after fees, model subscriber churn, and optimize your membership tiers to maximize Average Revenue Per User (ARPU)."
        slug="patreon-tier-optimization"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-rose-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-rose-500" />
              Quick Answer: How Much Do Patreon Creators Make?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Patreon creators typically convert <strong>1% to 3% of their active free audience</strong> into paying subscribers. If a creator has 100,000 active fans and converts 2% at an average tier price (ARPU) of $7/month, they will generate $14,000 in gross monthly revenue. However, after deducting Patreon's platform fees (5-12%) and payment processing fees (~5%), their actual <strong>net take-home pay will be closer to $11,900/month</strong>.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Math Behind a Successful Subscription Business
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Launching a Patreon or any paid membership community is not just about making great content; it is about managing a recurring revenue SaaS (Software as a Service) business. The most successful creators on Patreon don't just guess their pricing—they rigorously model their funnels, track their ARPU (Average Revenue Per User), and aggressively fight churn.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you do not understand the hidden costs of running a membership—specifically the compounding damage of high monthly churn and payment processing fees—you will find yourself on a content treadmill, constantly acquiring new fans just to replace the ones you are losing.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <RefreshCw className="h-5 w-5 text-rose-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Churn Trap</h3>
              <p className="text-sm text-neutral-500 font-light">If you have 1,000 patrons and a 15% monthly churn rate, you must acquire 150 new paying members every single month just to keep your revenue flat.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <BarChart className="h-5 w-5 text-rose-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Focus on ARPU</h3>
              <p className="text-sm text-neutral-500 font-light">Average Revenue Per User. Upgrading 100 existing users from a $5 tier to a $15 tier is often easier than finding 200 brand new $5 subscribers.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-rose-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Fee Drain</h3>
              <p className="text-sm text-neutral-500 font-light">Between Patreon's cut and credit card processors, you will lose roughly 10-17% of your gross revenue before it ever hits your bank account.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Optimizing Your Patreon Tiers
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            A common mistake is offering too many tiers. Having 7 different pricing options causes decision paralysis, resulting in users abandoning the checkout process. The industry standard is the <strong>Three-Tier Strategy</strong>:
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Tier 1: The Tip Jar ($3 - $5)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This is your entry-level tier. It should offer low-friction, highly scalable rewards like early access to videos, ad-free podcast episodes, or a private Discord role. Do not offer physical merchandise or highly labor-intensive rewards at this level, as the margins will not support the fulfillment costs.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Tier 2: The Core Offering ($10 - $15)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This should be your most popular tier. It is where you offer the bulk of your exclusive value. This could be exclusive bonus episodes, behind-the-scenes content, source files, or monthly Q&A livestreams. Your goal is to make the value proposition here so strong that "Tip Jar" members naturally want to upgrade.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Tier 3: The Premium Anchor ($50 - $100+)</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This tier is not meant for everyone. It is designed for your "super fans" or businesses. Rewards here might include 1-on-1 coaching calls, producer credits at the end of your videos, or highly personalized critiques. Even if only 2% of your total patrons choose this tier, it will significantly drag your overall ARPU upward.
          </p>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding and Fighting Churn
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Churn is the silent killer of membership businesses. If you use our Patreon income calculator, you will see exactly how much revenue bleeds out of your business every 30 days due to cancellations.
          </p>

          <div className="bg-rose-50 border-l-4 border-rose-500 p-6 mb-8 rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-2">Voluntary vs Involuntary Churn</h4>
            <p className="text-lg text-neutral-600 m-0 leading-relaxed font-light">
              <strong>Voluntary churn</strong> happens when a user actively clicks "cancel" because they no longer find value in the membership. <strong>Involuntary churn</strong> happens when a user's credit card expires or a payment fails. Patreon handles some involuntary churn via dunning emails, but you must actively combat voluntary churn by consistently delivering promised rewards.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Strategies to Reduce Churn</h3>
          <ul className="space-y-4 mb-16">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200">
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></div>
              <span className="text-neutral-600 font-light"><strong>Annual Memberships:</strong> Offer a 10-15% discount if users pay for a full year upfront. This locks in the revenue and guarantees 0% churn for those users for 12 months.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200">
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></div>
              <span className="text-neutral-600 font-light"><strong>Consistent Evergreen Value:</strong> If users are only paying for a single video a month, they will cancel when they are done watching. Offer a back-catalog library or community access (Discord) that they lose access to if they cancel.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200">
              <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></div>
              <span className="text-neutral-600 font-light"><strong>Avoid Burnout Rewards:</strong> Do not promise rewards you cannot fulfill (e.g., custom artwork for every patron). When creators miss fulfillment deadlines, trust is broken, and mass voluntary churn follows.</span>
            </li>
          </ul>

        </>
      )}
      </ToolLayout>
    </>
  )
}
