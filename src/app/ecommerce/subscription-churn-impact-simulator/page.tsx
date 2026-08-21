import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Activity, Target, RefreshCw, Users, TrendingUp, AlertTriangle, ChartArea } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Subscription Churn Calculator | LTV & MRR Impact Simulator",
  description: "Calculate how subscription churn rate impacts your Monthly Recurring Revenue (MRR) and Customer Lifetime Value (LTV) over a 12-month period.",
  keywords: ["subscription churn calculator", "churn rate formula", "saas churn impact", "calculate LTV from churn", "monthly recurring revenue simulator", "ecommerce subscription churn"],
  slug: "ecommerce/subscription-churn-impact-simulator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What is subscription churn rate?",
    answer: "Churn rate is the percentage of your paying subscribers who cancel their subscription within a given time period (usually calculated monthly). If you have 1,000 subscribers and 50 cancel this month, your monthly churn rate is 5%."
  },
  {
    question: "How does churn affect Customer Lifetime Value (LTV)?",
    answer: "Churn is the primary mathematical variable that dictates LTV. The formula for LTV is: (Average Subscription Price) / (Churn Rate). If your price is $30 and your churn is 10%, your LTV is $300. If you cut churn to 5%, your LTV instantly doubles to $600."
  },
  {
    question: "What is a 'Churn Ceiling'?",
    answer: "A churn ceiling is the mathematical point where your Monthly Recurring Revenue (MRR) stops growing, even though you are acquiring new customers. It happens when the number of customers churning out perfectly equals the number of new customers you acquire each month."
  },
  {
    question: "What is a good churn rate for a subscription box?",
    answer: "Physical ecommerce subscription boxes typically see higher churn rates (8% to 15% monthly) compared to B2B SaaS products (2% to 5% monthly) because physical products are easier for a consumer to cut during personal budget constraints."
  },
  {
    question: "How do I calculate Annual Recurring Revenue (ARR)?",
    answer: "ARR is simply your Monthly Recurring Revenue (MRR) multiplied by 12. It provides a macro view of your business's annualized run rate, assuming you freeze growth and churn at their current levels."
  }
]

export default function ChurnImpactPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Subscription Churn Calculator",
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
    "name": "How to Calculate the Impact of Subscription Churn",
    "description": "Simulate your 12-month MRR trajectory by modeling different churn rates.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Baseline Metrics",
        "text": "Enter your current active subscriber count and your average monthly subscription price."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Monthly Acquisition",
        "text": "Input the average number of brand new subscribers you acquire every month."
      },
      {
        "@type": "HowToStep",
        "name": "Set Current vs Target Churn",
        "text": "Input your current monthly churn percentage, and then set a target goal (e.g., reducing churn by 2%)."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze Revenue Delta",
        "text": "Review the 12-Month Revenue Lift to see exactly how much cash flow is unlocked simply by retaining existing customers."
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
        "@id": "https://dailyfinance.tools/ecommerce/subscription-churn-impact-simulator",
        "url": "https://dailyfinance.tools/ecommerce/subscription-churn-impact-simulator",
        "name": "Subscription Churn Calculator | LTV & MRR Impact Simulator",
        "description": "Calculate how subscription churn rate impacts your Monthly Recurring Revenue (MRR) and Customer Lifetime Value (LTV)."
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
        title="Subscription Churn Calculator"
        description="Stop filling a leaky bucket. Visualize how reducing your monthly churn rate dramatically increases your Customer Lifetime Value (LTV) and 12-month MRR trajectory."
        slug="subscription-churn-impact-simulator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-pink-600"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-pink-600" />
              Quick Answer: Why is Churn So Important?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Churn is the mathematical anchor on your growth. If you have 1,000 subscribers paying $30/mo, and your churn rate is 10%, you are losing 100 subscribers ($3,000 in MRR) every single month. To simply maintain your current revenue, your marketing team must acquire 100 new customers every month. <strong>Reducing churn from 10% to 5% instantly doubles your Customer Lifetime Value (LTV) from $300 to $600</strong>, allowing you to spend twice as much on ads to acquire a customer while remaining perfectly profitable.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Leaky Bucket of Ecommerce
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            In the subscription economy—whether you are selling SaaS software, a Patreon membership, or a monthly coffee subscription box—founders often obsess over top-of-funnel acquisition. They spend tens of thousands of dollars on Facebook Ads to bring in new users.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            But if you are pouring water (new customers) into a bucket with a massive hole in the bottom (high churn), you will eventually run out of capital. Our subscription churn calculator visually demonstrates the compounding, devastating effect of high monthly churn over a 12-month period.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Voluntary Churn</h3>
              <p className="text-sm text-neutral-500 font-light">The customer actively clicked 'Cancel Subscription'. This means your product failed to deliver ongoing value, or the price point no longer justified the benefit.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Activity className="h-5 w-5 text-pink-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Involuntary Churn</h3>
              <p className="text-sm text-neutral-500 font-light">The customer's credit card expired, was reported stolen, or had insufficient funds. You can fix this easily with automated 'Dunning' email sequences via Stripe.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Destroy Your Churn Rate
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you want to rapidly scale your MRR (Monthly Recurring Revenue), you must fix the hole in the bucket before increasing ad spend. Here are three highly effective tactics to reduce churn.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">1. Push Annual Subscriptions Hard</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            An annual subscriber has a 0% churn rate for 11 months. By offering a 15-20% discount on an annual plan, you secure the cash flow upfront and completely eliminate the psychological friction of the user deciding whether to renew every single month.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">2. Implement a "Save Offer"</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When a user clicks "Cancel," do not just let them leave. Implement a cancellation flow (using tools like Stripe Billing or Churnkey) that asks them why they are leaving. If they select "Too Expensive," automatically offer them a 50% discount for the next 2 months. You will typically save 10% to 20% of churning users with this exact tactic.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">3. Improve Onboarding (Time to Value)</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            A massive percentage of voluntary churn happens in Month 1. If a user signs up for your software or subscription box and doesn't experience a "lightbulb moment" within the first 7 days, they will cancel. You must aggressively onboard the user via email sequences, tutorials, and customer success outreach to ensure they adopt the product into their routine.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
