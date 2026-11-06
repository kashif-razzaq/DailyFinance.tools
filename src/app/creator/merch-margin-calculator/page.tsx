import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Merch Margin Calculator: Profit Per Unit After Print, Platform & Payment Fees",
  description: "Calculate true merch profit per unit: selling price minus base and print costs, platform and payment fees, plus shipping net. See margin, markup and monthly profit at your sales volume.",
  keywords: ["merch margin calculator", "merch profit calculator", "print on demand profit calculator", "merch markup calculator", "how to price merch"],
  slug: "creator/merch-margin-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "What is a good profit margin for print-on-demand merch?", "answer": "A healthy print-on-demand margin is typically 25 to 45 percent of the selling price after base, print, platform and payment fees and shipping net. Below 20 percent the product is fragile: returns, fee changes or a single promotion can push it into loss."},
{"question": "What is the difference between margin and markup?", "answer": "Margin is profit divided by selling price; markup is profit divided by cost. They describe the same profit differently. A $17 cost sold at $25.50 has a $8.50 profit, which is a 50 percent markup but only a 33 percent margin. Pricing decisions should be made in margin, because fees and discounts are charged on price."},
{"question": "Should I offer free shipping on merch?", "answer": "Only if the product price was raised to absorb it. Free shipping reliably improves conversion, but the carrier still charges you. Model it in this calculator by setting shipping charged to zero with your true shipping cost entered, and confirm the margin still clears your floor before enabling it."},
{"question": "How do returns affect merch profit?", "answer": "Apparel returns, misprints and reprints typically consume 2 to 5 percent of revenue in normal operation. This calculator applies your returns percentage to monthly profit so the headline number is the one you can budget against, not the pre-return fantasy."},
{"question": "Is it better to sell merch on my own store or a marketplace?", "answer": "Your own store removes the marketplace percentage but leaves you buying your own traffic. A marketplace charges for discovery you may genuinely need. Compare the same product both ways in this calculator, then weigh the fee difference against where your buyers actually come from."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Merch Profit Margins",
    "description": "Calculate true merch profit per unit: selling price minus base and print costs, platform and payment fees, plus shipping net. See margin, markup and monthly profit at your sales volume.",
    "step": [
{"@type": "HowToStep", "name": "Enter price and true product costs", "text": "Use your provider's current base and print pricing for the exact product and print configuration you sell, including second-location prints. Last year's price list is a common source of phantom margin."},
{"@type": "HowToStep", "name": "Add platform and payment fees as charged", "text": "Enter your marketplace percentage if any, plus your payment processor's percentage and fixed fee. On your own Shopify or WooCommerce store the platform line is usually zero and payments carry the load."},
{"@type": "HowToStep", "name": "Model shipping as a net figure", "text": "Enter what customers pay for shipping and what you actually pay. If you offer free shipping, set charged to zero and watch what honesty does to the margin, then price accordingly."},
{"@type": "HowToStep", "name": "Set realistic volume and returns, then read margin first", "text": "Units and a 2 to 3 percent returns allowance produce the monthly figure. But read margin percentage first: it decides whether the monthly number deserves to exist."}
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://dailyfinance.tools/creator/merch-margin-calculator",
        "url": "https://dailyfinance.tools/creator/merch-margin-calculator",
        "name": "Merch Margin Calculator: Profit Per Unit After Print, Platform & Payment Fees",
        "description": "Calculate true merch profit per unit: selling price minus base and print costs, platform and payment fees, plus shipping net. See margin, markup and monthly profit at your sales volume."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "Merch Margin Calculator", "item": "https://dailyfinance.tools/creator/merch-margin-calculator" }
        ]
      }
    ]
  };

  return (
    <>
      <Script id="schema-howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout
        title="Merch Margin Calculator"
        description="Calculate true merch profit per unit: selling price minus base and print costs, platform and payment fees, plus shipping net. See margin, markup and monthly profit at your sales volume."
        slug="merch-margin-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: What Margin Should Creator Merch Make?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Merch profit per unit equals price minus base product cost, print cost, platform percentage and payment fees, adjusted for shipping. Healthy print-on-demand margins are typically 25 to 45 percent of the selling price. Below 20 percent, a small fee rise or return spike erases the profit entirely.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Margin on Your Merch Is Not Price Minus Blank Cost</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Most merch stores are priced with two numbers: what the blank costs and what feels like a fair price. Everything between those numbers, print charges, platform percentages where they apply, payment processing with its fixed per-order sting, the gap between shipping charged and shipping paid, and the returns and reprints that apparel inevitably produces, is treated as somebody else's problem. It is not. It is your margin, leaking in five places at once, and this calculator exists to make every leak a line item before you set a price your audience will anchor on forever.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Print-on-demand made merch risk-free in inventory terms and quietly expensive in unit terms. You never hold stock, but you pay retail-adjacent prices for every blank, every print and single-item fulfilment. That structure can still work beautifully, because your audience buys identity and belonging, not a t-shirt specification. It works when the design carries the price and the price carries the costs with room to spare. It fails when creators copy the $25 price point of a bulk-printed band tee while paying print-on-demand costs that leave $2 a unit, before returns.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Margin and markup cause a second, quieter confusion. They are not the same number and never will be. Margin divides profit by selling price and tells you what share of every sale you keep. Markup divides profit by cost and tells you what to charge to reach a target margin. A 50 percent markup on a $17 cost base is a $25.50 price and only a 33 percent margin. Creators who set prices with markup while thinking in margin systematically underprice. This calculator shows both, side by side, so the price you choose is the price you meant.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Shipping Is a Profit Line, Not a Pass-Through</h3>
              <p className="text-sm text-neutral-500 font-light">The difference between shipping charged and shipping cost lands in your margin on every order. Free shipping is not free; it is a decision to move shipping cost into the product price, where it must be modelled, not absorbed.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Returns Exist Even Without a Warehouse</h3>
              <p className="text-sm text-neutral-500 font-light">Misprints, sizing regrets and damaged parcels produce reprints and refunds in apparel at a few percent in normal times. Pricing at zero return allowance means the first bad batch is paid out of your pocket.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Volume Does Not Fix a Bad Unit</h3>
              <p className="text-sm text-neutral-500 font-light">Selling 1,000 units at $1 profit is worse than 200 units at $8 profit, with five times the support email. Fix the unit economics first, then chase volume with a margin that survives contact with reality.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Merch Profit Formula, Line by Line</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Per-Unit Profit Equation</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Profit = Price - Base Cost - Print Cost - Platform % - Payment Fees + (Shipping Charged - Shipping Cost)  ·  Margin = Profit / Price</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Walk the equation with your supplier's real invoice, not the marketing page. Base cost is the blank plus fulfilment base. Print cost covers additional print locations, embroidery and large-print surcharges, the extras that quietly attach to your best designs. Platform percentage applies if you sell through a marketplace or a merch shelf rather than your own store. Payment fees are a percentage plus a fixed charge per order, which is why a $20 item pays proportionally more to the processor than a $40 item does. Shipping enters as a net: what the customer paid minus what the carrier charged you.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Then judge the result like a retailer. Margin under 20 percent on print-on-demand is fragile: one fee change, one return cluster, one discount code you forgot was live, and the product loses money. Margins of 25 to 45 percent give the design room to be promoted, discounted occasionally and featured in sales without going underwater. If your margin is thin, the levers, in order of pain, are: raise price where the design justifies it, simplify print locations, move volume to your own store to drop the platform percentage, and renegotiate or switch the base product. The calculator lets you test each lever in seconds instead of discovering it on a payout statement.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Enter price and true product costs</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Use your provider's current base and print pricing for the exact product and print configuration you sell, including second-location prints. Last year's price list is a common source of phantom margin.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Add platform and payment fees as charged</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Enter your marketplace percentage if any, plus your payment processor's percentage and fixed fee. On your own Shopify or WooCommerce store the platform line is usually zero and payments carry the load.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Model shipping as a net figure</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Enter what customers pay for shipping and what you actually pay. If you offer free shipping, set charged to zero and watch what honesty does to the margin, then price accordingly.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Set realistic volume and returns, then read margin first</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Units and a 2 to 3 percent returns allowance produce the monthly figure. But read margin percentage first: it decides whether the monthly number deserves to exist.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A $35 Hoodie Alternative, the Classic $35 Tee</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A creator sells a printed tee at $35. The base product costs $13 and printing adds $4, a $17 cost base. Selling on their own store, platform fees are zero, and card processing at 2.9 percent plus $0.30 takes about $1.32. Shipping charged is $4.99 against a true cost of $4.50, a small $0.49 gain. Profit per unit is $35 minus $17 minus $1.32 plus $0.49, which is about $17.17, a margin near 49 percent before returns. At 300 units a month with a 2 percent returns allowance, monthly profit lands around $5,050. This is what healthy print-on-demand economics look like, and notice that the design, not discounting, carries them.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The Same Design at $24.99 Through a Marketplace</h3>
            <p className="text-neutral-600 font-light leading-relaxed">Now the identical tee is listed at $24.99 on a marketplace taking 10 percent, to chase volume. Base and print still cost $17. The marketplace takes $2.50, payment processing about $1.02, and suppose shipping is free to the customer while costing $4.50, a $4.50 loss per order. Profit per unit collapses to roughly negative $0.03: the product sells, the dashboard celebrates, and the creator earns nothing, before returns push it underwater. At $24.99 the design needed either a cheaper base, a paid-shipping policy or its own store. Price is not a marketing garnish on merch. Price is the business model.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Merch Pricing Mistakes That Turn Best-Sellers Into Break-Even</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Pricing from the blank cost alone</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Base cost is one of five deductions. Creators who mark up the blank and ignore print extras, fees, shipping net and returns discover their real margin on the payout statement, where it is too late to renegotiate with customers.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Confusing markup with margin</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A 50 percent markup is a 33 percent margin. If you need a 40 percent margin to fund ads and discounts, you need roughly a 67 percent markup on cost. The calculator shows both numbers precisely so the price you set is the one you intended.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Offering free shipping without repricing</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Free shipping converts well because the cost moved into the product, or into your margin. If the price did not change when shipping became free, your margin paid for the promotion on every single order.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Discounting a thin margin</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A 20 percent off sale on a 20 percent margin product is a charity event. Promotions must be planned from the margin: know your floor price, the point below which a unit loses money, before any code goes live.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Price merch from the full equation, not from the blank. Enter your real base, print, fees and shipping net, insist on a margin that survives returns and the occasional sale, and let strong design carry a strong price. Your audience is buying a piece of your world; the least the spreadsheet can do is make sure you are paid for it. Re-run the numbers whenever a supplier changes pricing, because print-on-demand costs drift and margins drift with them, silently.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />If the unit economics refuse to work at any fair price, that is information too: the product may belong in a limited drop at a premium, as a sponsorship vehicle, or not in the store at all. Compare the monthly profit here against what the same effort earns in affiliate or sponsorship income before restocking the idea.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
