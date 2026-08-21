import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Users, DollarSign, Activity, Settings, TrendingUp, AlertTriangle, Target } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Customer Acquisition Cost Calculator | Blended vs Paid CAC",
  description: "Calculate your true Customer Acquisition Cost (CAC). Factor in total ad spend, agency fees, software costs, and organic traffic to find your Blended CAC.",
  keywords: ["customer acquisition cost calculator", "cac calculator", "blended cac vs paid cac", "how to calculate cac", "ecommerce marketing costs", "marketing efficiency ratio"],
  slug: "ecommerce/customer-acquisition-cost-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What is Customer Acquisition Cost (CAC)?",
    answer: "Customer Acquisition Cost (CAC) is the total amount of money you must spend on marketing and sales to acquire a single new paying customer. If you spend $1,000 on Facebook Ads and acquire 100 new customers, your CAC is $10."
  },
  {
    question: "What is the difference between Paid CAC and Blended CAC?",
    answer: "Paid CAC strictly divides your direct ad spend by the number of customers who clicked an ad and bought. Blended CAC divides your ENTIRE marketing budget (ads, agencies, software) by your ENTIRE customer base (paid + organic). Blended CAC is the true metric for business health."
  },
  {
    question: "Why should I include agency fees in my CAC calculation?",
    answer: "If you pay an agency $3,000 a month to run your ads, that is a direct cost required to acquire those customers. Failing to include agency fees, software subscriptions, or content creation costs will result in an artificially low CAC and inaccurate profitability models."
  },
  {
    question: "What is a good LTV to CAC ratio?",
    answer: "A standard benchmark for ecommerce and SaaS businesses is an LTV:CAC ratio of 3:1. This means if it costs you $30 to acquire a customer (CAC), that customer should generate $90 in lifetime gross profit (LTV). If your ratio is 1:1, you are breaking even and not generating cash flow."
  },
  {
    question: "How do I lower my Blended CAC?",
    answer: "The most sustainable way to lower your Blended CAC is to increase your ratio of organic customers. By investing in SEO, viral organic social media, and word-of-mouth referral programs, you generate 'free' customers that dilute the high cost of your paid ad spend."
  }
]

export default function CACPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Customer Acquisition Cost Calculator",
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
    "name": "How to Calculate Blended Customer Acquisition Cost (CAC)",
    "description": "Calculate your true CAC using our Blended vs Paid CAC calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Total All Marketing Expenses",
        "text": "Add up your direct ad spend, agency retainers, and marketing software subscriptions for the month."
      },
      {
        "@type": "HowToStep",
        "name": "Count Paid Customers",
        "text": "Look at your ad platform dashboards to see how many customers were directly attributed to paid spend."
      },
      {
        "@type": "HowToStep",
        "name": "Count Organic Customers",
        "text": "Subtract your paid customers from your total monthly customers to find your organic acquisition number."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze Blended vs Paid",
        "text": "Review the calculator output to see how much your organic traffic subsidizes your expensive paid acquisition."
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
        "@id": "https://dailyfinance.tools/ecommerce/customer-acquisition-cost-calculator",
        "url": "https://dailyfinance.tools/ecommerce/customer-acquisition-cost-calculator",
        "name": "Customer Acquisition Cost Calculator | Blended vs Paid CAC",
        "description": "Calculate your true Customer Acquisition Cost (CAC). Factor in total ad spend, agency fees, software costs, and organic traffic."
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
        title="Customer Acquisition Cost Calculator"
        description="Stop hiding your true marketing costs. Calculate your exact Blended CAC by factoring in agency fees, software costs, and organic traffic to get a holistic view of your ecommerce profitability."
        slug="customer-acquisition-cost-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-violet-600" />
              Quick Answer: What is the Difference Between Paid CAC and Blended CAC?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              <strong>Paid CAC</strong> only looks at the efficiency of your ads. If you spend $1,000 on Facebook to acquire 20 customers, your Paid CAC is $50. <strong>Blended CAC</strong> looks at the overall efficiency of your business. If you spent that same $1,000 on Facebook, but also acquired 30 customers for "free" via SEO or TikTok going viral, your total customers are 50. Your Blended CAC is therefore $1,000 / 50 = $20. The higher your organic traffic, the lower your Blended CAC.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Illusion of Ad Platform Metrics
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you solely rely on the "Cost Per Purchase" column inside Facebook Ads Manager or Google Analytics, you are operating with severely flawed data. Ad platforms are incentivized to claim credit for as many conversions as possible, and they completely ignore the fixed overhead required to run those ads.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            A media buyer might proudly report a $30 CAC. But if you pay that media buyer a $4,000 monthly retainer, and you pay $500/month for tracking software (like TripleWhale or Northbeam), your actual Cost to Acquire a Customer is significantly higher. Our CAC calculator forces you to input these hidden costs.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Paid CAC is for Optimization</h3>
              <p className="text-sm text-neutral-500 font-light">Use Paid CAC when you are actively adjusting bids, killing bad ad creatives, and scaling winning campaigns inside the ad platform.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-violet-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Blended CAC is for the CEO</h3>
              <p className="text-sm text-neutral-500 font-light">Use Blended CAC when making holistic business decisions, like whether you have enough margin to hire new staff or seek venture capital funding.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How Organic Content Subsidizes Paid Ads
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            As advertising costs (CPMs) continue to rise year over year, running a purely paid-acquisition ecommerce brand is incredibly difficult. If your Break-Even CPA is $40, and Facebook charges you $45 to acquire a customer, your ad account is unprofitable.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            This is where <strong>Organic Acquisition</strong> acts as a financial subsidizer. If you generate an equal amount of customers through organic SEO, YouTube, or word-of-mouth, those "free" customers dilute the high cost of your paid customers. You can comfortably "lose" money on Facebook Ads, knowing that your Blended CAC across the entire business remains highly profitable.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
