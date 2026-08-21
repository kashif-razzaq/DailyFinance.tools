import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { Tag, TrendingUp, AlertTriangle, Target, LineChart, ShoppingBag } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Black Friday Discount ROI Calculator | Promo Profitability",
  description: "Calculate the exact ROI of your Black Friday and Cyber Monday discounts. See if your volume spikes actually offset your margin compression.",
  keywords: ["black friday calculator", "ecommerce discount calculator", "promo roi calculator", "volume vs margin calculator", "bfcm profitability", "sales discount margin"],
  slug: "ecommerce/black-friday-discount-roi-calculator",
  category: "E-Commerce",
});

const faqs: FAQ[] = [
  {
    question: "Why do most brands lose money on Black Friday?",
    answer: "Most brands lose money during BFCM because they randomly select a discount (e.g., 30% OFF) without calculating how much extra volume is required to offset the margin compression and the massive spike in Facebook ad costs (CPMs)."
  },
  {
    question: "What is margin compression?",
    answer: "Margin compression happens when you reduce your retail price, but your Cost of Goods Sold (COGS) remains the same. If your normal margin is 50%, a 25% discount doesn't cut your profit in half; it destroys 50% of your total net profit."
  },
  {
    question: "How much volume do I need to justify a discount?",
    answer: "The formula depends heavily on your baseline margin. If your gross margin is 40% and you offer a 20% discount, your profit per item drops by half. Therefore, you must sell exactly TWICE as many items (a 2x volume multiplier) just to break even compared to a normal day."
  },
  {
    question: "Should I increase ad spend during a sale?",
    answer: "Yes, but carefully. During major sales events, ad platforms charge a massive premium for traffic. Our calculator lets you input your 'Extra Daily Ad Spend' to ensure your promo daily profit is actually higher than your normal daily profit after paying Mark Zuckerberg."
  },
  {
    question: "What is a better alternative to site-wide discounts?",
    answer: "Instead of flat discounts, highly profitable brands use 'Buy X Get Y' offers or 'Tiered Free Gifts.' This forces the customer to increase their Average Order Value (AOV) to unlock the discount, protecting the brand's margin."
  }
]

export default function BFCMPage() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Black Friday Discount ROI Calculator",
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
    "name": "How to Calculate the ROI of an Ecommerce Discount",
    "description": "Calculate your true profit lift during a promotion using our BFCM calculator.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Set Normal Economics",
        "text": "Input your standard retail price, COGS, and how many units you sell on a normal, non-promotional day."
      },
      {
        "@type": "HowToStep",
        "name": "Define the Offer",
        "text": "Enter the percentage discount you plan to offer (e.g., 20% OFF site-wide)."
      },
      {
        "@type": "HowToStep",
        "name": "Estimate Volume Spike",
        "text": "Predict how much your sales volume will increase. Will you sell 2x more? 3x more?"
      },
      {
        "@type": "HowToStep",
        "name": "Analyze Profit Lift",
        "text": "Review the 'True Profit Lift'. If the number is negative, your sale is destroying your profitability."
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
        "@id": "https://dailyfinance.tools/ecommerce/black-friday-discount-roi-calculator",
        "url": "https://dailyfinance.tools/ecommerce/black-friday-discount-roi-calculator",
        "name": "Black Friday Discount ROI Calculator | Promo Profitability",
        "description": "Calculate the exact ROI of your ecommerce discounts. See if your volume spikes actually offset your margin compression."
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
        title="Discount ROI Calculator"
        description="Stop destroying your profit margins during Black Friday. Calculate exactly how much extra sales volume you need to justify a site-wide discount."
        slug="black-friday-discount-roi-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Tag className="h-5 w-5 text-red-600" />
              Quick Answer: Do Discounts Actually Make Money?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              Discounts only make money if the <strong>spike in sales volume</strong> mathematically outpaces the <strong>crush in profit margin</strong>. If your product costs $40 to make and sells for $100, you make $60 profit. If you run a 30% off sale, your price is $70, but your cost is still $40. Your profit is now $30. You just cut your margin in half. To make the exact same amount of money you would have made on a normal day, <strong>you must sell 2x as many units</strong>. Anything less than 2x volume, and the sale actively lost you money.
            </p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">
            The Black Friday Bloodbath
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Every November, ecommerce brand owners panic. They see their competitors offering massive 40% site-wide discounts and feel pressured to match them. They open Shopify, slash their prices, double their Facebook ad budgets, and watch the revenue notifications roll in.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            At the end of the month, they look at their P&L (Profit and Loss) statement and realize a horrifying truth: they generated $100,000 more in revenue than last month, but their bank account has less cash in it. How is this possible? Because they did not use a discount ROI calculator.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Margin Compression</h3>
              <p className="text-sm text-neutral-500 font-light">Your suppliers do not care that it is Black Friday. Your shipping carrier does not care. Your COGS (Cost of Goods Sold) remains identical, meaning every dollar discounted comes entirely out of your net profit.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Target className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The CPM Spike</h3>
              <p className="text-sm text-neutral-500 font-light">During major holidays, massive corporations like Target and Walmart flood ad networks with billions of dollars. This drives up the cost of ads (CPMs) for everyone else by 2x or 3x.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            How to Model a Profitable Sale
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Before launching any promotion, you must open our simulator and find your break-even volume multiplier.
          </p>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-12 shadow-sm rounded-r-xl">
            <h4 className="text-xl font-bold text-[#1F2937] mb-4">The Danger Zone</h4>
            <p className="text-neutral-600 m-0 leading-relaxed font-light">
              If the calculator shows a negative "Profit Lift," do not launch the sale. A negative profit lift means you are doing more work (packing more boxes, answering more customer support emails) to earn less money than if you had just stayed home and done nothing.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Alternatives to Flat Discounts</h3>
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If your margins cannot survive a 30% site-wide discount, do not run one. Instead, use psychological pricing structures to protect your margin while increasing your Average Order Value (AOV). For example, offer a "Buy 2, Get 1 Free" deal. This feels like a massive 33% discount to the consumer, but it forces them to buy three units, meaning your gross profit on the cart size is massive, and your shipping costs are highly optimized.
          </p>

        </>
      )}
      </ToolLayout>
    </>
  )
}
