import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Truck, Map, DollarSign, AlertTriangle, TrendingDown, Package, Activity } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Shipping Zone Calculator | Flat Rate Optimizer",
  description: "Calculate your blended shipping cost across USPS/UPS zones. Optimize your flat rate shipping charge to prevent massive losses on cross-country orders.",
  keywords: ["shipping zone calculator", "ecommerce shipping calculator", "flat rate shipping optimizer", "usps zone map calculator", "blended shipping cost", "how to price ecommerce shipping"],
  slug: "ecommerce/shipping-zone-optimizer",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What are shipping zones?",
    answer: "Carriers like USPS and UPS divide the country into geographical zones (typically Zone 1 through Zone 8). Zone 1 is local to your warehouse, while Zone 8 is across the country. The higher the zone, the more expensive it is to ship the package."
  },
  {
    question: "What is a Blended Shipping Cost?",
    answer: "Your blended shipping cost is the average cost you pay per order when factoring in all local and cross-country shipments. If 80% of your orders are local ($5 to ship) and 20% are cross-country ($10 to ship), your blended cost is $6 per order."
  },
  {
    question: "Why am I losing money on shipping?",
    answer: "Most ecommerce brands lose money on shipping because they guess their 'Flat Rate' charge based on their local shipping costs. If they pay $6 to ship locally, they charge the customer $6. When a customer from Zone 8 orders, the brand gets hit with an $11 shipping bill, eating $5 of their net profit."
  },
  {
    question: "Should I offer Free Shipping?",
    answer: "You should only offer Free Shipping if your gross profit margin can absorb your 'Blended Shipping Cost'. If your blended shipping cost is $8, and your net profit is only $10, offering Free Shipping will bankrupt your business."
  },
  {
    question: "How do I fix a negative shipping margin?",
    answer: "You have three options: 1) Increase your flat rate shipping charge to match your blended cost. 2) Switch from a Flat Rate to 'Calculated Carrier Rates' at checkout. 3) Open a second 3PL warehouse on the opposite coast to eliminate Zone 8 shipments entirely."
  }
]

export default function ShippingZonePage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Shipping Zone Optimizer",
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
    "name": "How to Calculate Your Blended Shipping Cost",
    "description": "Optimize your flat rate shipping to prevent profit loss.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Order Volume",
        "text": "Enter the total number of orders you ship in a typical month."
      },
      {
        "@type": "HowToStep",
        "name": "Input Current Flat Rate",
        "text": "Enter the amount you currently charge the customer at checkout (e.g., $7.99)."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Zone Distribution",
        "text": "Look at your Shopify analytics to determine what percentage of your orders go to nearby states (Zones 1-4) versus distant states (Zones 5-8)."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze the Blended Cost",
        "text": "Compare your Blended Shipping Cost to your Flat Rate Charge. If the blended cost is higher, you are actively losing money on every shipment."
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
        "@id": "https://dailyfinance.tools/ecommerce/shipping-zone-optimizer",
        "url": "https://dailyfinance.tools/ecommerce/shipping-zone-optimizer",
        "name": "Shipping Zone Calculator | Flat Rate Optimizer",
        "description": "Calculate your blended shipping cost across USPS/UPS zones. Optimize your flat rate shipping charge to prevent massive losses."
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
        title="Shipping Zone Optimizer"
        description="Stop losing your profit margin to USPS and UPS. Calculate your 'Blended Shipping Cost' to see if your flat-rate shipping charge is secretly bankrupting your ecommerce business."
        slug="shipping-zone-optimizer"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-500" />
              Quick Answer: Why Am I Losing Money on Shipping?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Most brand owners lose money on shipping because they base their flat rate off their local carrier costs. If your warehouse is in New York, shipping a 3lb box to New Jersey (Zone 1) might cost $6.50. You decide to charge customers a $7.00 Flat Rate. However, when a customer in California (Zone 8) buys that same 3lb box, the carrier charges you $11.20. You just lost $4.20 of net profit. To fix this, you must calculate your <strong>Blended Shipping Cost</strong> across all zones.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Danger of Flat Rate Shipping
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Customers absolutely hate unpredictable shipping costs at checkout. A surprise $14.50 shipping fee is the number one cause of cart abandonment in ecommerce. Because of this, marketing experts always recommend offering a "Flat Rate" shipping option (e.g., $7.99 nationwide).
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            While this is great for conversion rates, it is an accounting nightmare if not optimized properly. Shipping carriers (USPS, UPS, FedEx) do not care about your flat rate. They charge you based on distance (Zones).
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Map className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Zones 1 through 4</h3>
              <p className="text-sm text-neutral-500 font-light">These are states local or regional to your fulfillment center. Shipping here is cheap and fast (1-2 days). Your flat rate usually generates a small profit here.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Zones 5 through 8</h3>
              <p className="text-sm text-neutral-500 font-light">These are states across the country. Shipping here is highly expensive. If a high percentage of your orders go to Zone 8, your flat rate is bleeding you dry.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Use the Blended Cost Metric
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            You cannot optimize what you do not measure. Our shipping zone optimizer calculates your "Blended Cost." This is the mathematically weighted average of all your shipments.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-2">The Blended Scenario</h4>
            <p className="text-lg text-neutral-600 m-0 leading-relaxed font-light">
              If your calculator output shows a Blended Cost of $9.15 per order, but you are charging the customer a Flat Rate of $7.00, you are losing $2.15 of pure profit on every single order that leaves your warehouse. If you ship 1,000 orders a month, you are burning $2,150 a month on shipping subsidies.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">The Ultimate Fix: The 3PL Strategy</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If you are scaling past 2,000 orders a month, the math starts to justify opening a second fulfillment center. If your current warehouse is in New York, you are paying Zone 8 prices for every California order. By splitting your inventory into a second warehouse in Nevada, California orders become Zone 1/Zone 2 shipments. This instantly drops your Blended Shipping Cost, often saving enough money to entirely pay for the second warehouse's storage fees.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
