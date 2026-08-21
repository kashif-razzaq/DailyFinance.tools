import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Package, DollarSign, Activity, AlertTriangle, TrendingDown, Box, ShieldCheck } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Amazon FBA Fee Calculator | Profit Margin Estimator",
  description: "Calculate your exact Amazon FBA profit margins. Deduct referral fees, pick and pack fulfillment costs, and monthly storage fees to find your true ROI.",
  keywords: ["amazon fba fee calculator", "fba profit calculator", "fba margin calculator", "amazon referral fee", "fba fulfillment cost", "fba storage fees", "amazon seller calculator"],
  slug: "ecommerce/amazon-fba-fee-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "What are the two main fees for Amazon FBA?",
    answer: "Amazon FBA charges two primary fees: the Referral Fee (which is a percentage of the retail price, usually 15%) and the FBA Fulfillment Fee (a flat rate based on the size and weight of the product for picking, packing, and shipping)."
  },
  {
    question: "How do monthly storage fees work?",
    answer: "Amazon charges you for the space your inventory takes up in their fulfillment centers. The fee is calculated per cubic foot and fluctuates by season (it is significantly more expensive during Q4/Holiday months)."
  },
  {
    question: "What is a good profit margin for Amazon FBA?",
    answer: "A healthy gross profit margin for private label Amazon FBA sellers is between 30% and 40% BEFORE advertising. Once you factor in PPC (Amazon Ads), your net margin should ideally land between 15% and 25%."
  },
  {
    question: "Why do apparel items have different fees?",
    answer: "Amazon categorizes clothing and apparel differently because they suffer from significantly higher return rates. They often charge a higher referral fee (17% instead of 15%) and add a surcharge to the fulfillment fee."
  },
  {
    question: "What is ROI in Amazon FBA?",
    answer: "Return on Investment (ROI) is calculated by dividing your Net Profit by your initial investment (Manufacturing Cost + Shipping Cost). An ROI of 100% means that for every $1 you spend buying a product, you get your $1 back plus an additional $1 in profit."
  }
]

export default function FBAFeePage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Amazon FBA Fee Calculator",
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
    "name": "How to Calculate Amazon FBA Fees",
    "description": "Calculate your true profit per unit using our FBA calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Input Retail Price and Sourcing Costs",
        "text": "Enter your target retail price, manufacturing cost, and the cost to ship the item from the supplier to the Amazon warehouse."
      },
      {
        "@type": "HowToStep",
        "name": "Select Size and Weight",
        "text": "Input the physical weight of the item and select the appropriate size tier to accurately calculate Fulfillment Fees."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Storage Time",
        "text": "Predict how many months the item will sit in the warehouse before it sells to account for storage fees."
      },
      {
        "@type": "HowToStep",
        "name": "Review Margins",
        "text": "Analyze your net profit margin and ROI to ensure the product is financially viable before running PPC ads."
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
        "@id": "https://dailyfinance.tools/ecommerce/amazon-fba-fee-calculator",
        "url": "https://dailyfinance.tools/ecommerce/amazon-fba-fee-calculator",
        "name": "Amazon FBA Fee Calculator | Profit Margin Estimator",
        "description": "Calculate your exact Amazon FBA profit margins. Deduct referral fees, pick and pack fulfillment costs, and monthly storage fees."
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
        title="Amazon FBA Fee Calculator"
        description="Stop losing money to hidden Amazon fees. Calculate your exact net profit, profit margin, and ROI per unit by accurately estimating FBA fulfillment, referral, and storage costs."
        slug="amazon-fba-fee-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-500" />
              Quick Answer: What are Amazon FBA Fees?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              When you sell via Fulfillment by Amazon (FBA), Amazon takes two major cuts from your revenue: a <strong>Referral Fee</strong> (typically 15% of the total retail price, effectively their 'commission' for letting you sell on their platform), and a <strong>Fulfillment Fee</strong> (a flat rate based on the item's size and weight for picking, packing, and shipping). Combined, these fees frequently consume <strong>30% to 40%</strong> of your gross retail price.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Reality of FBA Margins
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Amazon FBA is one of the most powerful business models in ecommerce because it grants you access to hundreds of millions of Prime customers with credit cards on file. However, Amazon does not provide this infrastructure out of the goodness of their hearts. They extract a heavy toll.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            If you blindly source a product from overseas without meticulously calculating the FBA fees, you will find yourself running a high-revenue business that operates at a net loss. This is especially true once you factor in the rising costs of Amazon PPC (Pay-Per-Click) advertising.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Box className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Fulfillment (Pick & Pack)</h3>
              <p className="text-sm text-neutral-500 font-light">This fee covers Amazon boxing your item and shipping it via Prime. Heavy or oversized items incur massive fees that destroy margins.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The 15% Referral Fee</h3>
              <p className="text-sm text-neutral-500 font-light">Regardless of how big or small the item is, Amazon takes a 15% cut of the final sale price (17% for apparel) just for using their marketplace.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Storage Fees</h3>
              <p className="text-sm text-neutral-500 font-light">Amazon is a fulfillment center, not a warehouse. If your inventory sits on their shelves for months without selling, you will be charged heavy monthly storage fees.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Margin vs. ROI (Return on Investment)
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            When evaluating a new product launch, sellers often confuse Gross Margin with ROI. Our Amazon FBA calculator tracks both, but they serve very different purposes.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Gross Margin</h3>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Gross Margin is your Net Profit divided by the Retail Price. If you sell a $100 product and make $30 profit, your Gross Margin is 30%. A healthy FBA business needs a gross margin of at least 30-40% because a large portion of that margin will inevitably be spent on Amazon PPC advertising (ACoS) to maintain ranking.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">ROI (Return on Investment)</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            ROI is your Net Profit divided by your Invested Capital (Manufacturing + Shipping Cost). If it costs you $10 to source and ship an item, and you make a $15 net profit, your ROI is 150%. You put $1 in and got $2.50 out. Most successful private label sellers target a minimum ROI of 100% to ensure they have enough cash flow to place larger reorders and scale the business.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
