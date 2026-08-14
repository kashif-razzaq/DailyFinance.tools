import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator, DollarSign, Globe, CreditCard, Landmark, Coins } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Stripe & Wise FX Fee Calculator: Cross-Border Foreign Exchange Impact",
  description: "Calculate hidden cross-border FX (foreign exchange) conversion fees for freelancers. Compare Stripe, PayPal, and Wise international transfer costs.",
  keywords: ["freelance cross border fees calculator", "paypal vs stripe international fees", "fx spread calculator freelancer", "wise multi currency account fees", "mid market exchange rate", "foreign exchange markup"],
  slug: "freelance/cross-border-fx-impact-calculator",
  category: "Freelance",
});

const faqs: FAQ[] = [
  {
    question: "What is an FX spread?",
    answer: "An FX spread is a hidden fee added to the mid-market exchange rate. If the real exchange rate is $1 = €0.90, PayPal might use an exchange rate of $1 = €0.86, pocketing the 4.5% difference as a hidden fee."
  },
  {
    question: "How do PayPal cross-border fees work?",
    answer: "PayPal charges a fixed percentage for international commercial transactions (e.g., 1.5%), plus a currency conversion spread of 3.0% to 4.0% if you are withdrawing to a local bank account in a different currency."
  },
  {
    question: "How can freelancers avoid FX fees?",
    answer: "By using multi-currency accounts like Wise or Payoneer. You can give your client local bank details in their currency (e.g. USD), receive the funds with zero cross-border fees, and then convert it at the mid-market rate for a tiny transparent fee (~0.5%)."
  },
  {
    question: "What is the Mid-Market Rate?",
    answer: "The mid-market rate (also known as the interbank rate) is the exact midpoint between the buy and sell prices of two currencies. It is the 'real' exchange rate you see on Google. Most consumer banks do not offer this rate to customers."
  },
  {
    question: "Is Stripe cheaper than PayPal for international clients?",
    answer: "Generally, yes. While Stripe charges a 1.5% international card fee and a 1.0% conversion fee, PayPal's combined commercial transaction fees and massive FX spreads (up to 4.5%) almost always result in a higher total cost for the freelancer."
  }
]

export default function CrossBorderFxImpactPage() {
  return (
    <ToolLayout
      title="Stripe & Wise FX Fee Calculator"
      description="Stop losing thousands of dollars to hidden foreign exchange spreads. Compare exactly how much Stripe, PayPal, and Wise are charging you to get paid internationally."
      slug="cross-border-fx-impact-calculator"
      faqs={faqs}
      calculator={(isPro) => <CalculatorClient isPro={isPro} />}
    >
      {(isPro) => (
        <>
          {/* Answer Engine Optimization (AEO) Block */}
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How to Avoid Cross-Border Freelance Fees
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">
              When freelancers get paid internationally, they lose an average of 4.5% to 6.0% of their total invoice value to payment processors. This consists of a base processing fee (e.g., 2.9%), a cross-border surcharge (1.5%), and a hidden currency conversion spread (up to 4.0%). To avoid this, freelancers should open a multi-currency account (like Wise), provide the client with local bank details in the client's currency, and convert the funds at the mid-market rate for a transparent fee of around ~0.5%.
            </p>
          </section>

          <h2 id="the-hidden-freelance-tax" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Hidden 6% Freelance Tax
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Working with international clients is one of the most lucrative ways to scale a freelance business. By accessing the global market, you are no longer restricted by the local economy of your home country. A designer in London can command Silicon Valley rates, and a developer in Berlin can service clients in Sydney. 
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            However, the global banking system is incredibly archaic. When money crosses international borders, a chain of intermediary banks and payment processors takes a cut. If you simply send an American client a standard PayPal invoice or a Stripe credit card link, you are likely surrendering up to 6% of your gross revenue to foreign exchange (FX) fees and cross-border surcharges.
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 leading-relaxed font-light">
            If you bill $100,000 a year to international clients, you might be losing $6,000 annually without even realizing it. This comprehensive guide will expose the mechanics of the FX spread, break down the exact fee structures of PayPal and Stripe, and show you the exact multi-currency banking setup you need to eliminate these costs.
          </p>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Landmark className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Base Processing Fees</h3>
              <p className="text-sm text-neutral-500 font-light">The standard fee to run a credit card (usually 2.9% + 30¢), regardless of where the client is located.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <CreditCard className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Cross-Border Surcharges</h3>
              <p className="text-sm text-neutral-500 font-light">An extra penalty (usually 1.0% to 1.5%) added simply because the card was issued in a different country.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-neutral-100 flex items-center justify-center mb-4">
                <Coins className="h-5 w-5 text-[#D97706]" />
              </div>
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The FX Spread</h3>
              <p className="text-sm text-neutral-500 font-light">The hidden markup on the exchange rate. Processors offer you a worse exchange rate and pocket the difference.</p>
            </div>
          </section>

          <h2 id="mid-market-rate" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            What is the Mid-Market Exchange Rate?
          </h2>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            To understand how payment platforms skim your income, you must first understand the <strong>Mid-Market Rate</strong> (also known as the interbank rate). This is the exact midpoint between the global buy and sell prices of two currencies. When you Google "USD to EUR," the number Google displays is the mid-market rate. It is the truest, fairest exchange rate in the world.
          </p>

          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Traditional banks, PayPal, and legacy processors do not offer this rate to consumers. Instead, they buy currency at the mid-market rate, and sell it to you at a "Retail Rate." 
          </p>

          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97706]/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[60px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
            
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The FX Spread Mechanics</h3>
            <ul className="space-y-6 relative z-10 text-white/90 font-light">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">1</span>
                <div>
                  <strong className="block text-xl mb-1">The True Rate (Google):</strong> $1.00 USD = €0.92 EUR
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">2</span>
                <div>
                  <strong className="block text-xl mb-1">The PayPal Rate:</strong> $1.00 USD = €0.88 EUR
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D97706] text-white font-bold shrink-0">3</span>
                <div>
                  <strong className="block text-xl mb-1">The Hidden Fee:</strong> That €0.04 difference per dollar is the FX Spread. On a $10,000 invoice, you just lost €400 strictly to the exchange rate markup, entirely separate from the 3.49% invoice processing fee.
                </div>
              </li>
            </ul>
          </div>

          <h2 id="deep-dive-paypal" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Deep Dive: The True Cost of PayPal
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            PayPal is ubiquitous because it is incredibly easy for clients to use. However, it is structurally the most expensive way for a freelancer to receive international funds. PayPal utilizes a multi-layered fee structure that obscures the final total cost.
          </p>
          
          <ul className="list-disc pl-6 space-y-4 mb-12 text-neutral-600 font-light text-lg">
            <li><strong>Commercial Transaction Fee:</strong> When you invoice a client, PayPal charges a baseline fee (usually 3.49% + 49¢ for US accounts).</li>
            <li><strong>International Transaction Fee:</strong> If the client pays from outside your registered country, PayPal adds an extra 1.50% cross-border surcharge.</li>
            <li><strong>Currency Conversion Spread:</strong> If the client pays in USD, but your bank account is in EUR, PayPal forces you to convert the funds inside their ecosystem before withdrawal. They apply a massive 3.0% to 4.0% FX spread on this conversion.</li>
          </ul>

          <div className="bg-[#FAFAFA] border-l-4 border-[#D97706] p-6 mb-16 rounded-r-xl">
            <p className="text-lg text-[#1F2937] font-medium m-0 leading-relaxed">
              <strong>The Result:</strong> A $5,000 invoice paid by a US client to a European freelancer via PayPal can easily incur over $350 in total combined fees. You are surrendering roughly 7% of your labor.
            </p>
          </div>

          {/* AdSense Placeholder - Sole Ad Unit */}
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 id="deep-dive-stripe" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Deep Dive: The True Cost of Stripe
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Stripe is generally more transparent and slightly cheaper than PayPal, but it still heavily penalizes cross-border transactions because it relies on the legacy credit card networks (Visa, Mastercard, Amex).
          </p>

          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <CreditCard className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Card Network Fees</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Stripe's base fee is 2.9% + 30¢. However, if the client uses an international card, Stripe immediately adds a 1.5% surcharge to cover the heightened risk and network costs.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <DollarSign className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Conversion Fees</strong>
                <span className="text-neutral-600 font-light leading-relaxed">If the charge requires currency conversion (e.g. charging a UK client in USD), Stripe adds another 1.0% conversion fee. While 1.0% is significantly better than PayPal's 4.0% spread, the total Stripe fee still sits around 5.4% for a foreign transaction.</span>
              </div>
            </li>
          </ul>

          <h2 id="multi-currency-accounts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            The Solution: Multi-Currency Business Accounts
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            The secret to eliminating 90% of cross-border fees is to stop forcing money across borders. Instead of pulling the client's money into your country, you open a virtual bank account in <em>their</em> country.
          </p>

          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            Fintech companies like <strong>Wise (formerly TransferWise)</strong> and <strong>Payoneer</strong> allow you to open local receiving accounts in dozens of currencies.
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-[#1F2937] mb-6">The Optimal Invoicing Strategy</h3>
            <ol className="list-decimal pl-6 space-y-4 text-neutral-600 font-light text-lg">
              <li><strong>Open a Multi-Currency Account:</strong> Sign up for a Wise Business account.</li>
              <li><strong>Generate Local Bank Details:</strong> Click a button to instantly generate a US routing number, a UK sort code, and an EU IBAN, all under your name.</li>
              <li><strong>Invoice the Client Locally:</strong> Send your American client an invoice in USD, requesting an ACH bank transfer to your virtual US routing number.</li>
              <li><strong>Zero Cross-Border Fees:</strong> The client pays you via ACH. Because it is a local US transfer, there are zero cross-border credit card fees. You receive 100% of the funds in USD.</li>
              <li><strong>Convert at the Mid-Market Rate:</strong> You log into Wise, and convert the USD to your local currency (e.g. GBP). Wise uses the exact Google mid-market rate, and charges a tiny, transparent flat fee (usually ~0.4% to 0.6%).</li>
            </ol>
          </div>
          
          <h2 id="platform-comparison" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Comparing the Top 3 Platforms
          </h2>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">
            To visualize the sheer magnitude of the difference, observe the breakdown of fees across the three major payment arteries used by freelancers today.
          </p>

          <div className="overflow-x-auto my-12 bg-white border border-neutral-200 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse m-0">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#FAFAFA]">
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">Platform</th>
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">Base Processing Fee</th>
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">Cross-Border + FX Spread</th>
                  <th className="py-4 px-6 font-bold text-[#1F2937] text-sm uppercase tracking-wider">Total Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono text-sm">
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">Stripe</td>
                  <td className="py-4 px-6 text-neutral-500">2.9% + 30¢</td>
                  <td className="py-4 px-6 text-neutral-500">1.5% Intl + 1.0% Conv.</td>
                  <td className="py-4 px-6 text-[#1F2937] font-bold">~5.4%</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors bg-[#FAFAFA]">
                  <td className="py-4 px-6 font-medium text-[#1F2937] font-sans">PayPal</td>
                  <td className="py-4 px-6 text-neutral-500">3.49% + 49¢</td>
                  <td className="py-4 px-6 text-neutral-500">1.5% Intl + ~4.0% FX Spread</td>
                  <td className="py-4 px-6 text-[#1F2937] font-bold">~9.0%</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-[#064E3B] font-bold font-sans">Wise (ACH / Local)</td>
                  <td className="py-4 px-6 text-neutral-500">0.0%</td>
                  <td className="py-4 px-6 text-neutral-500">~0.5% Transparent Fee</td>
                  <td className="py-4 px-6 text-[#064E3B] font-bold">~0.5%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="final-thoughts" className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">
            Protecting Your Profit Margins
          </h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">
            Use the calculator above to input your exact invoice amounts and compare the real-world take-home pay across different platforms. If a client absolutely insists on paying via credit card (Stripe) instead of a bank transfer (Wise), it is a standard business practice to add a 3% to 5% "Convenience Surcharge" to the invoice to cover the processing fees. Never absorb a 5% loss on a major project just because the client prefers credit card points.
          </p>
        </>
      )}
    </ToolLayout>
  )
}
