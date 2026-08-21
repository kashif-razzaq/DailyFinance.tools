import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Target, Activity, DollarSign, TrendingUp, AlertTriangle, Crosshair, BarChart } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Target ROAS Calculator | Break-Even ROAS & CPA Estimator",
  description: "Calculate your Break-Even ROAS, Target CPA, and ad spend profitability limits. The ultimate ROAS calculator for Meta and Google Ads ecommerce campaigns.",
  keywords: ["target roas calculator", "break even roas calculator", "ecommerce roas calculator", "calculate target cpa", "roas to cpa calculator", "ad spend profitability"],
  slug: "ecommerce/target-roas-break-even-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate Break-Even ROAS?",
    answer: "Break-Even ROAS is calculated by dividing your Retail Price by your Gross Profit (Retail Price - COGS). Or, more simply, it is the inverse of your gross margin (1 / Gross Margin %). If your gross margin is 50%, your Break-Even ROAS is 2.0x."
  },
  {
    question: "What is Target ROAS?",
    answer: "Target ROAS is the Return on Ad Spend required to hit a specific net profit margin. If your break-even ROAS is 2.0x (meaning you make $0 profit), your Target ROAS might be 3.5x to ensure you walk away with a 20% net profit margin after COGS and ad spend."
  },
  {
    question: "What is Break-Even CPA?",
    answer: "Break-Even CPA (Cost Per Acquisition) is exactly equal to your Gross Profit. If you sell a $100 product and it costs you $40 to make and ship, your Gross Profit is $60. Therefore, you can spend up to $60 on Facebook Ads to acquire one customer and 'break even' ($0 profit, $0 loss)."
  },
  {
    question: "Why is a low ROAS sometimes acceptable?",
    answer: "Established brands often accept a low, break-even ROAS on the front-end (initial purchase) because they have a high Customer Lifetime Value (LTV). They are willing to acquire a customer for $0 profit today because they know that customer will return to buy via free channels (email/SMS) three more times this year."
  },
  {
    question: "Should I focus on ROAS or MER?",
    answer: "ROAS (Return on Ad Spend) is great for evaluating individual ad channels, but MER (Marketing Efficiency Ratio) is better for evaluating the overall health of your business. MER is calculated as Total Revenue / Total Ad Spend across all platforms."
  }
]

export default function TargetROASPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Target ROAS Calculator",
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
    "name": "How to Calculate Target ROAS and Break-Even CPA",
    "description": "Calculate your maximum allowable ad spend and target Return on Ad Spend using our ROAS calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Retail Price",
        "text": "Enter the final price the customer pays on your website."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate COGS",
        "text": "Enter your Cost of Goods Sold. This must include the manufacturing cost, packaging, and outbound shipping fees."
      },
      {
        "@type": "HowToStep",
        "name": "Determine Target Profit Margin",
        "text": "Set the percentage of the retail price you want to keep as pure net profit after all ad spend."
      },
      {
        "@type": "HowToStep",
        "name": "Set Ad Platform Targets",
        "text": "Take your generated Target ROAS and Target CPA and input them directly into your Meta or Google Ads bidding strategies."
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
        "@id": "https://dailyfinance.tools/ecommerce/target-roas-break-even-calculator",
        "url": "https://dailyfinance.tools/ecommerce/target-roas-break-even-calculator",
        "name": "Target ROAS Calculator | Break-Even ROAS & CPA Estimator",
        "description": "Calculate your Break-Even ROAS, Target CPA, and ad spend profitability limits. The ultimate ROAS calculator for Meta and Google Ads."
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
        title="Target ROAS & Break-Even Calculator"
        description="Stop burning money on unprofitable ads. Calculate your exact Break-Even ROAS, maximum allowable CPA, and the Target ROAS required to hit your net profit goals."
        slug="target-roas-break-even-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Quick Answer: What is a Good ROAS for Ecommerce?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              There is no universal "good ROAS." A good ROAS is entirely dependent on your gross profit margins. If your product costs $20 to make and sells for $100 (80% margin), a <strong>1.25x ROAS is break-even</strong>, and a 2.0x ROAS is highly profitable. However, if your product costs $80 to make and sells for $100 (20% margin), a 2.0x ROAS will bankrupt your business, because your <strong>break-even ROAS is 5.0x</strong>. You must calculate your unique break-even point before spending a dollar on ads.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Most Dangerous Metric in Ecommerce
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            In the world of DTC (Direct-to-Consumer) ecommerce, media buyers and marketing agencies are obsessed with Return on Ad Spend (ROAS). You will see dashboards proudly displaying a "3.0x ROAS," which looks incredibly impressive on paper. You spent $1,000 to make $3,000.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            But ROAS is a vanity metric if it is divorced from your unit economics. If the COGS (Cost of Goods Sold) for that $3,000 in revenue was $2,200, you actually lost $200 on that campaign. This is why scaling an ad account without knowing your exact <strong>Break-Even ROAS</strong> and <strong>Target CPA</strong> is the fastest way to bankrupt an ecommerce brand.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Break-Even ROAS</h3>
              <p className="text-sm text-neutral-500 font-light">The exact Return on Ad Spend where your gross profit perfectly covers your ad spend. You make $0 and lose $0. Any ROAS below this number means you are actively losing money on every sale.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Target CPA (Cost Per Acquisition)</h3>
              <p className="text-sm text-neutral-500 font-light">The maximum amount of money you are willing to spend to acquire a customer while still hitting your desired net profit margin. This is the number you feed into Meta's bidding algorithms.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Use This Data in Facebook & Google Ads
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Once our ROAS calculator generates your Break-Even and Target metrics, you must transition from calculation to execution. Here is how advanced media buyers use these numbers to print money.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Setting Cost Caps</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If your Target CPA is $35, you do not use "Highest Volume" (lowest cost) bidding on Meta. Instead, you set a <strong>Cost Cap</strong> at $35. This tells the algorithm: "Do not spend my budget unless you can confidently acquire a customer for $35 or less." While this might throttle your total spend, it guarantees profitability on the spend that does occur.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">The LTV (Lifetime Value) Exception</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            There is one major exception to the Break-Even rule. If you sell a consumable product (like protein powder or skincare), your customers will likely return and buy again in 30 days. Because you don't have to pay for Facebook ads to get them to buy the second time (you use free Email marketing), established brands will intentionally run ads at <strong>below</strong> Break-Even ROAS to acquire market share, knowing they will make their profit on month 2 and month 3.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
