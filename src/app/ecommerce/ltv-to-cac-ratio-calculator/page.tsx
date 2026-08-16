import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Compass, ShoppingCart, Percent, DollarSign, Activity, AlertTriangle, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "LTV to CAC Ratio Calculator | Ecommerce Unit Economics",
  description: "Calculate your Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) ratio. Find out if your ecommerce business is healthy enough to scale.",
  keywords: ["ltv to cac ratio calculator", "lifetime value calculator", "ecommerce unit economics", "calculate ltv", "cac payback period", "customer retention value"],
  slug: "ecommerce/ltv-to-cac-ratio-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What is a good LTV to CAC ratio?",
    answer: "The golden standard for a healthy, scalable ecommerce or SaaS business is an LTV to CAC ratio of 3:1. This means you make $3 in gross profit for every $1 you spend acquiring a customer. If your ratio is 1:1, you are breaking even and not generating cash flow to cover overhead."
  },
  {
    question: "Why should LTV be calculated on Gross Margin?",
    answer: "A common mistake is calculating LTV based on Gross Revenue. If a customer spends $1,000 over their lifetime, but it cost you $800 to manufacture and ship those goods, your true LTV is only $200. Always base LTV on Gross Margin to get an accurate view of profitability."
  },
  {
    question: "What does an LTV:CAC ratio of 6:1 mean?",
    answer: "While a 6:1 ratio sounds incredible (you are highly profitable), it usually indicates that you are severely under-spending on marketing. You could be growing much faster and capturing more market share if you were willing to accept a 3:1 ratio."
  },
  {
    question: "What is the Payback Period?",
    answer: "The Payback Period is the time (or number of purchases) it takes for a customer to generate enough gross profit to cover their initial acquisition cost. The shorter the payback period, the faster you can reinvest that capital into acquiring more customers."
  },
  {
    question: "How do I improve my LTV:CAC ratio?",
    answer: "You can improve the ratio by pulling two levers: 1) Decrease CAC by improving ad creative, conversion rates, and organic SEO. 2) Increase LTV by raising your Average Order Value (AOV) via upsells, or increasing purchase frequency via email marketing."
  }
]

export default function LTVCACPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LTV to CAC Ratio Calculator",
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
    "name": "How to Calculate LTV to CAC Ratio",
    "description": "Calculate the health of your ecommerce business using our LTV to CAC calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Unit Economics",
        "text": "Enter your Average Order Value (AOV), Gross Margin percentage, and your Customer Acquisition Cost (CAC)."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Purchasing Behavior",
        "text": "Determine how many times an average customer buys from you per year, and how many years they remain active."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze the Ratio",
        "text": "Review your LTV to CAC ratio. If it is below 3:1, you need to either decrease your ad spend or increase customer retention."
      },
      {
        "@type": "HowToStep",
        "name": "Check Payback Period",
        "text": "Look at the 'Payback Purchases' metric to see how long it takes to break even on a new customer."
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
        "@id": "https://dailyfinance.tools/ecommerce/ltv-to-cac-ratio-calculator",
        "url": "https://dailyfinance.tools/ecommerce/ltv-to-cac-ratio-calculator",
        "name": "LTV to CAC Ratio Calculator | Ecommerce Unit Economics",
        "description": "Calculate your Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) ratio."
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
        title="LTV to CAC Ratio Calculator"
        description="The golden metric of ecommerce scaling. Calculate your true Customer Lifetime Value (based on gross margin) and compare it against your acquisition cost to diagnose the health of your business."
        slug="ltv-to-cac-ratio-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Compass className="h-5 w-5 text-violet-600" />
              Quick Answer: What is the LTV:CAC Ratio?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              The LTV:CAC ratio compares the <strong>Lifetime Value</strong> of a customer against the <strong>Customer Acquisition Cost</strong>. If you spend $50 on Facebook Ads to acquire a customer (CAC), and that customer generates $150 in gross profit over the next 3 years (LTV), your ratio is <strong>3:1</strong>. This is considered the 'gold standard' for a healthy, scalable business. If your ratio drops to 1:1, you are breaking even on ad spend and losing money on overhead.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Most Common LTV Calculation Mistake
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When ecommerce founders calculate their Customer Lifetime Value, they almost universally make a fatal mathematical error: they calculate LTV using <em>Gross Revenue</em> instead of <em>Gross Profit Margin</em>.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If a customer buys a $100 pair of shoes from you every year for 3 years, their lifetime revenue is $300. But if those shoes cost you $60 to manufacture and ship, your gross margin is only 40%. The actual cash value that customer brings to your business is $120. If your CAC was $150, and you calculated LTV based on revenue ($300), you would mistakenly believe your business is highly profitable, when in reality, you are losing $30 on every single customer you acquire.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The 1:1 Death Spiral</h3>
              <p className="text-sm text-neutral-500 font-light">A 1:1 ratio means you are spending all of your gross profit just to acquire the customer. You have zero cash left over to pay for software, salaries, or office space.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The 5:1 Growth Trap</h3>
              <p className="text-sm text-neutral-500 font-light">A 5:1 ratio means you have incredible margins, but it usually indicates you are playing it too safe. You should increase your ad spend to aggressively acquire market share.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding the Payback Period
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Even if your LTV:CAC ratio is a healthy 3:1, you can still go bankrupt if you ignore your <strong>Payback Period</strong>. Our calculator shows you exactly how many purchases it takes to cover your initial ad spend.
          </p>

          <div className="bg-violet-50 border-l-4 border-violet-600 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The Cash Flow Crisis</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mb-4">
              Suppose your CAC is $100. Your gross profit per order is $25. Your LTV:CAC ratio is a healthy 3:1 because the customer buys from you 12 times over 4 years.
            </p>
            <p className="text-neutral-600 m-0 leading-relaxed font-light">
              However, it takes <strong>4 purchases</strong> ($100 / $25) just to break even on the initial ad spend. If those 4 purchases take 18 months to occur, you will run out of cash to pay your ad bills in month 3. You must optimize your funnel to shorten the payback period as much as possible.
            </p>
          </div>

        </>
      )}
      </ToolLayout>
    </>
  )
}
