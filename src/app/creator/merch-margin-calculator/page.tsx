import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Box, ShoppingCart, Truck, AlertTriangle, TrendingDown, DollarSign } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Merch Margin Calculator | Print on Demand Profit Estimator",
  description: "Calculate your print-on-demand profit margins. Factor in base costs, printing, shipping, and platform fees to ensure your merch business is profitable.",
  keywords: ["merch margin calculator", "print on demand profit calculator", "cogs calculator", "clothing brand profit margin", "shopify fee calculator", "creator merch profits"],
  slug: "creator/merch-margin-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
  {
    question: "What is a good profit margin for merch?",
    answer: "A standard gross profit margin for creator merchandise (like print-on-demand t-shirts or hoodies) is between 30% and 50%. If your margin drops below 30%, a single customer return or shipping error can completely wipe out your profit for the day."
  },
  {
    question: "What does COGS mean?",
    answer: "COGS stands for Cost of Goods Sold. It is the direct cost required to produce and deliver one item. For print-on-demand merch, COGS includes the blank garment, the printing fee, packaging materials, and the shipping cost to the customer."
  },
  {
    question: "Should I offer free shipping on my merch?",
    answer: "You should only offer free shipping if you bake the shipping cost into the retail price. Shipping heavy items like hoodies can cost $8 to $12. If you absorb that cost without raising your retail price, your profit margin will vanish."
  },
  {
    question: "How do platform fees affect merch profits?",
    answer: "Platform fees (like Shopify's monthly fee, Stripe's 2.9% + 30c processing fee, or Etsy's listing and transaction fees) eat directly into your net profit. Always calculate your margin after deducting these hidden fees."
  }
]

export default function MerchMarginPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Merch Margin Calculator",
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
    "name": "How to Calculate Merch Profit Margins",
    "description": "Calculate your true profit per item using our print-on-demand calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input COGS",
        "text": "Add up your Cost of Goods Sold: the blank item cost, the printing cost, and packaging materials."
      },
      {
        "@type": "HowToStep",
        "name": "Factor in Shipping",
        "text": "Enter the average cost to ship the item to your customer. If the customer pays for shipping, you can leave this blank."
      },
      {
        "@type": "HowToStep",
        "name": "Set Retail Price and Fees",
        "text": "Input the final retail price the customer pays, and deduct the platform's payment processing fees."
      },
      {
        "@type": "HowToStep",
        "name": "Analyze Margins",
        "text": "Review your Net Profit Per Item to ensure you maintain a healthy 30-50% margin."
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
        "@id": "https://dailyfinance.tools/creator/merch-margin-calculator",
        "url": "https://dailyfinance.tools/creator/merch-margin-calculator",
        "name": "Merch Margin Calculator | Print on Demand Profit Estimator",
        "description": "Calculate your print-on-demand profit margins. Factor in base costs, printing, shipping, and platform fees."
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
        title="Merch Margin Calculator"
        description="Stop losing money on hidden shipping and platform fees. Calculate your true Print-On-Demand (POD) profit margins before launching your creator apparel line."
        slug="merch-margin-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1F2937]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Box className="h-5 w-5 text-[#1F2937]" />
              Quick Answer: What is a Safe Profit Margin for Merch?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              To build a sustainable creator merch business, you should target a <strong>Gross Profit Margin of 40% to 50%</strong>. If you sell a hoodie for $50, your total Cost of Goods Sold (including the blank garment, printing, shipping, and Shopify fees) must be under $30. If your margin drops below 30%, you will not have enough cash flow to cover inevitable customer returns, lost packages, or paid advertising.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Print-On-Demand Trap
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Launching a merch line is a rite of passage for YouTubers, streamers, and podcasters. Services like Printify and Printful have made it incredibly easy to spin up a store overnight with zero inventory risk. However, this convenience comes at a steep cost: the margins on Print-On-Demand (POD) are notoriously razor-thin.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you do not meticulously calculate your COGS (Cost of Goods Sold), you might find yourself in a scenario where you sell 1,000 t-shirts, generate $25,000 in top-line revenue, and realize you only have $1,000 in your bank account after the platform fees clear.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
