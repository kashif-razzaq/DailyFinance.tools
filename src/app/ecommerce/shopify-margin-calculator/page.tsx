import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { ShoppingBag, CreditCard, Truck, DollarSign, TrendingDown, AlertTriangle, Settings, Activity } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Shopify Profit Margin Calculator | Break-Even & COGS Estimator",
  description: "Calculate your true Shopify profit margins. Factor in product COGS, shipping burdens, Shopify payment fees, and monthly app subscriptions.",
  keywords: ["shopify margin calculator", "shopify fee calculator", "ecommerce profit margin calculator", "cogs calculator", "shopify break even orders", "shopify payment processing fees"],
  slug: "ecommerce/shopify-margin-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "How do you calculate profit margin on Shopify?",
    answer: "To calculate your true net profit margin on Shopify, you must subtract three things from your retail price: 1) the Cost of Goods Sold (COGS), 2) the outbound shipping cost (if you offer free shipping), and 3) the Shopify Payment processing fee (typically 2.9% + 30 cents)."
  },
  {
    question: "What are Shopify Payments fees?",
    answer: "Shopify charges a credit card processing fee on every transaction. On the Basic plan, this is 2.9% + $0.30 per domestic transaction. Importantly, this fee is calculated on the total cart value, including shipping and taxes, not just the retail price of the item."
  },
  {
    question: "How many orders do I need to break even on Shopify?",
    answer: "Your break-even order volume is calculated by taking your total fixed monthly software costs (Shopify Plan + Apps) and dividing it by your net profit per order. If your software costs $100/mo and you make $5 profit per item, you must sell 20 items a month to break even."
  },
  {
    question: "Does offering Free Shipping kill my profit margin?",
    answer: "Yes, unless you bake the cost of shipping into the retail price. If your product costs $15, ships for $7, and you sell it for $30 with 'Free Shipping', your gross profit is drastically reduced compared to charging $30 + $7 shipping."
  },
  {
    question: "Why do international transactions cost more on Shopify?",
    answer: "Shopify and Stripe charge an additional cross-border fee (usually 1% to 1.5%) and currency conversion fees when a customer checks out using an international credit card. If you have a global audience, your effective fee rate will be higher."
  }
]

export default function ShopifyMarginPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Shopify Profit Margin Calculator",
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
    "name": "How to Calculate Your Shopify Profit Margin",
    "description": "Calculate your per-order profit and break-even sales volume using our Shopify margin calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Retail Price and COGS",
        "text": "Enter the price your customer pays and your total manufacturing/sourcing cost."
      },
      {
        "@type": "HowToStep",
        "name": "Configure Shipping Rules",
        "text": "Input the shipping cost and toggle whether you absorb that cost (Free Shipping) or pass it to the customer."
      },
      {
        "@type": "HowToStep",
        "name": "Select Your Shopify Plan",
        "text": "Choose your Shopify tier (Basic, Shopify, Advanced) to accurately calculate payment processing rates."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze Net Profit",
        "text": "Review your true net profit per order and see how many monthly sales are required to cover your software subscriptions."
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
        "@id": "https://dailyfinance.tools/ecommerce/shopify-margin-calculator",
        "url": "https://dailyfinance.tools/ecommerce/shopify-margin-calculator",
        "name": "Shopify Profit Margin Calculator | Break-Even & COGS Estimator",
        "description": "Calculate your true Shopify profit margins. Factor in product COGS, shipping burdens, Shopify payment fees, and monthly app subscriptions."
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
        title="Shopify Margin Calculator"
        description="Stop guessing your ecommerce profitability. Calculate your exact net profit per order by factoring in COGS, shipping burdens, and Shopify's payment processing fees."
        slug="shopify-margin-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
              Quick Answer: What is a Good Profit Margin on Shopify?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              A healthy <strong>Gross Profit Margin for a Shopify store is between 40% and 60%</strong>. If you sell a product for $50, your total Cost of Goods Sold (including manufacturing, packaging, and the 2.9% Shopify processing fee) should not exceed $25. If your gross margin is below 30%, you will struggle to afford paid advertising (Customer Acquisition Cost) while remaining profitable.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Hidden Costs of Running a Shopify Store
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Shopify is the undisputed king of ecommerce platforms, but its pricing structure can be incredibly deceiving for new merchants. The $39/month "Basic" plan is just the cost of admission. The true cost of running a Shopify store lies in the transaction fees, shipping burdens, and the inevitable ecosystem of third-party apps required to run a modern storefront.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you price your products without calculating these hidden margins, you will find yourself running a high-revenue business that generates zero actual cash flow.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <CreditCard className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Payment Processing</h3>
              <p className="text-sm text-neutral-500 font-light">Shopify takes 2.9% + 30 cents on the Basic plan. This fee is calculated on the total cart value, meaning you pay fees on the shipping cost and the sales tax you collect.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Settings className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The App Ecosystem</h3>
              <p className="text-sm text-neutral-500 font-light">Want product reviews? $15/mo. Want email marketing? $30/mo. Want upsell popups? $20/mo. Software bloat destroys break-even volume.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Truck className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Shipping Absorption</h3>
              <p className="text-sm text-neutral-500 font-light">Offering "Free Shipping" is a marketing tactic, not a reality. If you absorb a $7 shipping cost without raising the retail price, it comes directly out of your net profit.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Understanding Your Break-Even Point
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Our Shopify profit margin calculator includes a metric called "Break-Even Monthly Orders." This is the exact number of units you must sell every 30 days just to cover your fixed software costs.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-2">The Break-Even Scenario</h4>
            <p className="text-lg text-neutral-600 m-0 leading-relaxed font-light">
              Suppose you are on the Basic Shopify plan ($39/mo) and pay $40/mo for various apps. Your total fixed cost is $79/mo. If your net profit per order is only $3.00, <strong>you must pack and ship 27 orders every single month before you put a single dollar of profit in your pocket.</strong>
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">When to Upgrade Shopify Plans</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Many store owners wonder when to upgrade from the $39 Basic plan to the $105 Shopify plan. The math is entirely based on the reduction in payment processing fees (from 2.9% down to 2.6%).
          </p>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            The difference in processing fees is 0.3%. The difference in plan cost is $66/month. Therefore, `($66 / 0.003) = $22,000`. You should only upgrade to the middle Shopify plan once your store is consistently processing over <strong>$22,000 in monthly volume</strong>. Upgrading before that point is a mathematical loss.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
