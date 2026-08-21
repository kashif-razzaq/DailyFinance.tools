import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Users, TrendingUp, MailOpen, AlertTriangle, RefreshCw, BarChart } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Substack Income Calculator | Newsletter Growth Predictor",
  description: "Calculate your projected Substack revenue over 12 months. Model free list growth, conversion rates, and churn to predict your newsletter income.",
  keywords: ["substack income calculator", "newsletter revenue calculator", "substack growth predictor", "free to paid conversion rate", "substack churn calculator", "how much do substack writers make"],
  slug: "creator/substack-growth-predictor-simulator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "What is a good free-to-paid conversion rate on Substack?",
    answer: "A healthy free-to-paid conversion rate on Substack is between 4% and 10%. This means if you have 10,000 free email subscribers, you should aim to have between 400 and 1,000 paid subscribers."
  },
  {
    question: "How much does Substack take from creators?",
    answer: "Substack takes a flat 10% cut of your subscription revenue. Additionally, Stripe (the payment processor) takes roughly 2.9% + $0.30 per transaction. This means your effective take-home pay is roughly 87% of your gross revenue."
  },
  {
    question: "Should I offer an annual Substack subscription?",
    answer: "Yes. Annual subscriptions typically lock in users who would have otherwise churned after 3 or 4 months. By offering a 10-20% discount on the annual plan, you secure upfront cash flow and drastically reduce your overall churn rate."
  },
  {
    question: "What is a normal churn rate for paid newsletters?",
    answer: "A normal voluntary churn rate for a paid newsletter is 3% to 5% per month. If your churn rate exceeds 10%, your content is likely not meeting the expectations set by your marketing, or you are publishing too infrequently."
  },
  {
    question: "How do I grow my free Substack list?",
    answer: "The most effective ways to grow a free Substack list are leveraging the Substack Recommendations network (cross-promoting with other writers), publishing SEO-optimized long-form content, and converting social media followers (Twitter/LinkedIn) using strong lead magnets."
  }
]

export default function SubstackGrowthPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Substack Income Calculator",
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
    "name": "How to Predict Your Substack Revenue",
    "description": "Model your 12-month newsletter growth using our Substack income calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Current Audience",
        "text": "Input your current number of free email subscribers. If you are starting from zero, input your expected monthly growth."
      },
      {
        "@type": "HowToStep",
        "name": "Set Conversion Rate",
        "text": "Estimate what percentage of your free list will convert to a paid subscription (typically 4-10%)."
      },
      {
        "@type": "HowToStep",
        "name": "Set Pricing and Churn",
        "text": "Input your monthly and annual price points, and estimate your monthly subscriber churn rate."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze the 12-Month Projection",
        "text": "Review the compounding effect of growth versus churn over a full calendar year to establish realistic financial goals."
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
        "@id": "https://dailyfinance.tools/creator/substack-growth-predictor-simulator",
        "url": "https://dailyfinance.tools/creator/substack-growth-predictor-simulator",
        "name": "Substack Income Calculator | Newsletter Growth Predictor",
        "description": "Calculate your projected Substack revenue over 12 months. Model free list growth, conversion rates, and churn."
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
            "name": "Substack Income Calculator",
            "item": "https://dailyfinance.tools/creator/substack-growth-predictor-simulator"
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
        title="Substack Income Calculator"
        description="Predict your newsletter's 12-month financial trajectory. Our Substack growth simulator factors in free-to-paid conversion rates, monthly churn, and compounding audience growth to calculate your net MRR."
        slug="substack-growth-predictor-simulator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#ff6719]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <MailOpen className="h-5 w-5 text-[#ff6719]" />
              Quick Answer: How Much Do Substack Writers Make?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              The average successful Substack writer converts <strong>4% to 10% of their free email list</strong> into paid subscribers. If a writer has 5,000 free subscribers, they will likely have between 200 and 500 paid subscribers. At an average price of $8/month, this yields <strong>$1,600 to $4,000 in gross monthly revenue</strong>. However, writers must account for Substack's 10% fee, Stripe's ~3% processing fee, and an average monthly churn rate of 3-5%.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Mathematics of Paid Newsletters
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Launching a paid newsletter on Substack is one of the most intellectually rewarding ways to monetize an audience. You are paid directly by your readers to write about what you love, completely circumventing ad algorithms and brand sponsorships.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            However, growing a paid newsletter is a game of compounding mathematics. The creators who succeed are the ones who understand how free list growth, conversion rates, and churn interact over a 12-to-24-month time horizon. If you try to predict your income using simple multiplication (Subs × Price), you will be severely disappointed when you ignore churn and platform fees.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5 text-[#ff6719]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Top-of-Funnel Growth</h3>
              <p className="text-sm text-neutral-500 font-light">Your paid list cannot grow if your free list is stagnant. A healthy newsletter grows its free subscriber base by 5-10% month over month.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-[#ff6719]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Conversion Rate</h3>
              <p className="text-sm text-neutral-500 font-light">The percentage of free readers who decide to pull out their credit card. Substack's average is roughly 5%, but highly technical niches can see 10%+.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <RefreshCw className="h-5 w-5 text-[#ff6719]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Churn Rate</h3>
              <p className="text-sm text-neutral-500 font-light">The percentage of paid subscribers who cancel each month. High churn acts as a gravity well, eventually stopping your revenue growth entirely.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding the "Churn Ceiling"
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you play with the monthly churn slider in our Substack income calculator, you will notice a fascinating phenomenon: eventually, the revenue graph flattens out. This is the <strong>Churn Ceiling</strong>.
          </p>

          <div className="bg-white border-l-4 border-red-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The Mathematics of Stagnation</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light">
              Suppose you acquire 50 new paid subscribers every month. If you have 500 paid subscribers and a 10% monthly churn rate, you lose 50 subscribers a month.
              <br/><br/>
              <strong>50 New Subs - 50 Churned Subs = Zero Net Growth.</strong>
              <br/><br/>
              Even though your marketing is working and you are acquiring new customers, your revenue is permanently capped at 500 subscribers because your churn rate is too high.
            </p>
          </div>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This is why the most profitable Substack writers focus obsessively on the <strong>Annual Plan Uptake</strong>. When a subscriber signs up for an annual plan, they are locked in for 12 months. Their churn rate drops to 0% for the remainder of the year. By offering a 15-20% discount on annual plans, you sacrifice a small amount of gross revenue for a massive increase in subscriber retention and upfront cash flow.
          </p>

          {/* AdSense Placeholder */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Pricing Strategy: How Much Should You Charge?
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When setting up a Substack, the default instinct is to price the newsletter as low as possible (e.g., $5/month) to maximize the number of subscribers. However, pricing psychology and platform fees heavily penalize this strategy.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">The Problem with $5 Tiers</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Stripe charges a fixed fee of $0.30 per transaction. If you charge $5.00, Stripe takes $0.30 + $0.15 (2.9%), and Substack takes $0.50 (10%). Total fees equal $0.95, meaning you lose nearly 20% of your revenue immediately. If you charge $10.00, the fixed fee becomes mathematically insignificant, and your effective fee rate drops to ~13%.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">B2B vs B2C Pricing</h3>
          <ul className="space-y-4 mb-16">
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200">
              <BarChart className="h-5 w-5 text-[#ff6719] shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>B2B (Business to Business):</strong> If your newsletter helps people make money, advance their career, or learn software (e.g., Lenny's Newsletter), readers will expense the subscription to their employer. You should charge <strong>$15 to $30+ per month</strong>.</span>
            </li>
            <li className="flex items-start gap-3 bg-white p-4 rounded-xl border border-neutral-200">
              <Users className="h-5 w-5 text-[#ff6719] shrink-0 mt-0.5" />
              <span className="text-neutral-600 font-light"><strong>B2C (Business to Consumer):</strong> If your newsletter is for entertainment, philosophy, or personal growth, it is coming out of the reader's personal wallet. The resistance to subscribing is much higher. You should charge <strong>$7 to $10 per month</strong>.</span>
            </li>
          </ul>

        </>
      )}
      </ToolLayout>
    </>
  )
}
