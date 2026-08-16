import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { ShoppingCart, TrendingUp, Zap, Target, DollarSign, Activity } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "AOV Upsell Simulator | Average Order Value Calculator",
  description: "Calculate how post-purchase upsells and cross-sells impact your Average Order Value (AOV) and overall net profit. Model different take rates and margins.",
  keywords: ["average order value calculator", "aov calculator", "upsell calculator", "cross sell margin", "how to increase aov", "ecommerce profitability simulator"],
  slug: "ecommerce/aov-upsell-simulator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What is Average Order Value (AOV)?",
    answer: "Average Order Value (AOV) is the average amount of money a customer spends each time they complete an order on your website. It is calculated by dividing your total revenue by your total number of orders."
  },
  {
    question: "What is a post-purchase upsell?",
    answer: "A post-purchase upsell is a special offer presented to the customer immediately AFTER they have completed checkout, but before they reach the thank you page. Because their credit card is already on file, they can add the upsell to their order with a single click."
  },
  {
    question: "What is a good 'Take Rate' for an upsell?",
    answer: "A standard Take Rate (conversion rate) for a highly relevant post-purchase upsell is between 10% and 20%. If your take rate is below 5%, the upsell product is likely not relevant enough to the initial purchase."
  },
  {
    question: "Why does increasing AOV increase profitability so much?",
    answer: "Because the Customer Acquisition Cost (CAC) is a fixed expense. If you spend $30 to acquire a customer, and they buy a $50 item, your margin is tight. If you use an upsell to push their AOV to $70, that extra $20 is generated with zero additional ad spend."
  }
]

export default function AOVPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AOV Upsell Simulator",
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
    "name": "How to Calculate the Impact of an Upsell on AOV",
    "description": "Simulate how introducing a post-purchase upsell lifts your net profit.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Enter Baseline Metrics",
        "text": "Input your current Average Order Value (AOV), monthly order volume, and baseline gross profit margin."
      },
      {
        "@type": "HowToStep",
        "name": "Define the Upsell Offer",
        "text": "Enter the price of the product you plan to upsell and its specific profit margin (digital products have 100% margin)."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Take Rate",
        "text": "Adjust the slider to simulate the percentage of customers who will accept the upsell offer (usually 10-20%)."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze Profit Lift",
        "text": "Review the percentage increase in total profit. This extra cash can be pocketed or reinvested into ad spend."
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
        "@id": "https://dailyfinance.tools/ecommerce/aov-upsell-simulator",
        "url": "https://dailyfinance.tools/ecommerce/aov-upsell-simulator",
        "name": "AOV Upsell Simulator | Average Order Value Calculator",
        "description": "Calculate how post-purchase upsells impact your Average Order Value (AOV) and net profit."
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
        title="AOV Upsell Simulator"
        description="Calculate the exact financial impact of introducing an upsell or cross-sell to your checkout flow. See how small bumps in Average Order Value (AOV) result in massive net profit scaling."
        slug="aov-upsell-simulator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-sky-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-sky-500" />
              Quick Answer: Why is AOV so Important?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Average Order Value (AOV) is the most powerful lever in ecommerce because it allows you to generate more revenue without increasing your ad spend. If it costs you $20 to acquire a customer, and your average cart size is $40, your profit margins are incredibly tight. But if you implement a post-purchase upsell that bumps your AOV from $40 to $55, <strong>that extra $15 is captured with zero additional marketing cost.</strong> It falls almost entirely to your bottom line.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Magic of Post-Purchase Upsells
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When scaling a Shopify or WooCommerce store, brand owners often obsess over getting cheaper clicks on Facebook Ads or improving their landing page conversion rates. While those are important, they are incredibly difficult to control in an era of rising CPMs.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The easiest mathematical way to double your profitability is to increase your AOV. And the most frictionless way to increase AOV is through <strong>One-Click Post-Purchase Upsells</strong>. Because the customer has already entered their credit card information and completed the checkout process, the psychological friction of spending an extra $15 is practically zero.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-sky-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Pre-Purchase (In-Cart) Upsells</h3>
              <p className="text-sm text-neutral-500 font-light">Offering a related item while the user is viewing their cart. Pros: Highly visible. Cons: Can introduce decision fatigue and actually cause the user to abandon the cart entirely.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5 text-sky-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Post-Purchase Upsells</h3>
              <p className="text-sm text-neutral-500 font-light">Shown immediately after the credit card is charged. Pros: Zero risk of cart abandonment, high impulse conversion rate (take rate). Cons: Requires third-party apps like CartHook or Zipify.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Choose the Perfect Upsell Product
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The key to a high "Take Rate" (the percentage of people who accept the upsell) is extreme relevance. If someone buys a coffee machine, do not upsell them a toaster. Upsell them premium coffee beans.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">The Digital Margin Hack</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            The most profitable upsell strategy is pairing a physical product with a digital product. Digital products (like an eBook, a recipe guide, or a video course) have a 100% gross margin and incur zero additional shipping costs. If someone buys a $100 set of resistance bands, offering a $15 "90-Day Workout PDF Guide" as an upsell is pure, unadulterated profit.
          </p>

          <div className="bg-sky-50 border-l-4 border-sky-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The "More of the Same" Strategy</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mb-4">
              If you sell a consumable product (supplements, skincare, snacks), the highest converting upsell is simply offering <em>more of the exact same product</em> at a steep 30-40% discount.
            </p>
            <p className="text-neutral-600 m-0 leading-relaxed font-light">
              Because you are already paying to ship a box to their house, throwing a second unit into the same box drastically lowers your shipping cost per unit, allowing you to absorb the discount while still increasing your total net profit.
            </p>
          </div>

        </>
      )}
      </ToolLayout>
    </>
  )
}
