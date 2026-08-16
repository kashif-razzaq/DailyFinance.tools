import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { PackageSearch, Activity, ShieldAlert, Truck, BarChart, ShoppingCart } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Inventory Reorder Point Calculator | Prevent Stockouts",
  description: "Calculate your exact Reorder Point (ROP) and safety stock to prevent ecommerce stockouts. Factor in supplier lead times and peak sales spikes.",
  keywords: ["inventory reorder point calculator", "safety stock calculator", "ecommerce inventory management", "prevent stockouts", "reorder point formula", "lead time demand"],
  slug: "ecommerce/inventory-reorder-point-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What is the Reorder Point (ROP) formula?",
    answer: "The standard Reorder Point formula is: Lead Time Demand + Safety Stock = Reorder Point. Lead time demand is the number of units you expect to sell while waiting for new inventory to arrive from your supplier."
  },
  {
    question: "What is Safety Stock?",
    answer: "Safety stock is your emergency buffer inventory. It exists to protect your business from two unpredictable variables: sudden spikes in customer demand (like going viral) and unexpected delays in supplier manufacturing or shipping."
  },
  {
    question: "How do I calculate safety stock?",
    answer: "The formula for safety stock is: (Maximum Daily Sales × Maximum Lead Time in Days) - (Average Daily Sales × Average Lead Time in Days). This mathematically ensures you have enough buffer to survive your worst-case scenario."
  },
  {
    question: "What happens if my reorder point is too low?",
    answer: "If your reorder point is too low, you will run out of stock before your new shipment arrives. This destroys your ecommerce conversion rate, drops your organic ranking on platforms like Amazon, and forces you to spend more money on ads to regain momentum when you restock."
  },
  {
    question: "What happens if my reorder point is too high?",
    answer: "If your reorder point is too high, you will tie up too much working capital in inventory sitting in a warehouse. This limits your cash flow for marketing and introduces the risk of paying long-term storage fees or dealing with dead stock."
  }
]

export default function ReorderPointPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Inventory Reorder Point Calculator",
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
    "name": "How to Calculate Your Inventory Reorder Point",
    "description": "Calculate exactly when to order more inventory using our ROP calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Baseline Metrics",
        "text": "Enter your Average Daily Sales and your supplier's Standard Lead Time in days."
      },
      {
        "@type": "HowToStep",
        "name": "Input Worst-Case Metrics",
        "text": "Enter your Maximum Daily Sales (e.g., Black Friday) and the Maximum Lead Time (e.g., unexpected customs delays)."
      },
      {
        "@type": "HowToStep",
        "name": "Calculate Safety Stock",
        "text": "The calculator will automatically determine the buffer stock needed to prevent stockouts during delays."
      },
      {
        "@type": "HowToStep",
        "name": "Establish ROP",
        "text": "Review your final Reorder Point (ROP). Once your warehouse inventory drops to this number, immediately submit a new Purchase Order."
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
        "@id": "https://dailyfinance.tools/ecommerce/inventory-reorder-point-calculator",
        "url": "https://dailyfinance.tools/ecommerce/inventory-reorder-point-calculator",
        "name": "Inventory Reorder Point Calculator | Prevent Stockouts",
        "description": "Calculate your exact Reorder Point (ROP) and safety stock to prevent ecommerce stockouts."
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
        title="Inventory Reorder Point Calculator"
        description="Never run out of stock again. Calculate your exact Reorder Point (ROP) by factoring in supplier lead times, average daily sales, and emergency safety stock buffers."
        slug="inventory-reorder-point-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <PackageSearch className="h-5 w-5 text-amber-500" />
              Quick Answer: What is the Reorder Point?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              The <strong>Reorder Point (ROP)</strong> is the specific inventory level at which you must place a new purchase order with your supplier to avoid a stockout. It is calculated by multiplying your average daily sales by your supplier's lead time (in days), and then adding a layer of <strong>safety stock</strong>. For example, if you sell 10 units a day, shipping takes 30 days, and you keep 100 units of safety stock, your ROP is 400. Once your warehouse hits 400 units, you must reorder immediately.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Cost of Stockouts in Ecommerce
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Running out of stock is arguably the most expensive mistake an ecommerce brand can make. The direct cost is obvious: you literally cannot make money because you have nothing to sell. But the indirect costs are often far more damaging.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When you stock out on a platform like Amazon, their algorithm severely penalizes your organic ranking (BSR). You drop from page 1 to page 5. When your inventory finally arrives, you must drastically increase your PPC ad spend just to claw your way back to your original organic position. By utilizing an accurate inventory reorder point calculator, you protect your cash flow and algorithmic momentum.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Truck className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Lead Time Demand</h3>
              <p className="text-sm text-neutral-500 font-light">This is the baseline calculation. If it takes 45 days for your manufacturer in China to ship goods via sea freight, and you sell 20 units a day, you will sell 900 units while waiting for the boat to arrive. 900 is your Lead Time Demand.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <ShieldAlert className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Safety Stock Buffer</h3>
              <p className="text-sm text-neutral-500 font-light">Lead Time Demand assumes everything goes perfectly. Safety stock is the mathematical buffer you add to account for customs delays, supplier shortages, or a sudden viral spike in sales on TikTok.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Calculating Safety Stock (The Worst-Case Scenario)
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            You cannot just guess a number for safety stock. If you guess too high, you freeze thousands of dollars of working capital in dead inventory. If you guess too low, you stock out. You must use historical data to calculate your worst-case scenarios.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The Formula</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light mb-4">
              <strong>(Max Daily Sales × Max Lead Time) − (Average Daily Sales × Average Lead Time)</strong>
            </p>
            <p className="text-neutral-600 m-0 leading-relaxed font-light">
              This formula isolates the volatility in your supply chain. It calculates exactly how many extra units you need to survive your longest historical delay overlapping perfectly with your highest historical sales spike.
            </p>
          </div>

        </>
      )}
      </ToolLayout>
    </>
  )
}
