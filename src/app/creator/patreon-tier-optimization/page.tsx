import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Patreon Earnings Calculator: What You Keep After Fees by Tier & Plan",
  description: "Calculate your real Patreon take-home pay after the 5, 8 or 12 percent platform fee, payment processing and payout fees. See net per patron and why small tiers lose the most to fixed fees.",
  keywords: ["patreon calculator", "patreon earnings calculator", "patreon fees", "how much does patreon take", "patreon tier pricing", "patreon income calculator"],
  slug: "creator/patreon-tier-optimization",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "How much does Patreon take from creators?", "answer": "Patreon charges a platform fee of 5, 8 or 12 percent depending on plan, plus payment processing of roughly 2.9 percent plus $0.30 per successful pledge (less per micro-pledge), plus a payout fee when you withdraw. In total, most creators keep about 82 to 88 percent of gross pledges."},
{"question": "Why do small Patreon tiers lose so much to fees?", "answer": "Because part of processing is a fixed $0.30 per transaction. On a $2 pledge that fixed charge alone is 15 percent before the percentage fees, while on a $10 pledge it is only 3 percent. The smaller the tier, the larger the proportional fee drag."},
{"question": "Is the Patreon Premium plan worth 12 percent?", "answer": "Only if you actively use what it buys, mainly merch for membership and team accounts. For a solo creator using standard membership features, the 8 percent Pro plan keeps an extra 4 percent of every dollar, which compounds to thousands per year at scale."},
{"question": "What is a good average pledge on Patreon?", "answer": "Healthy pages commonly average $7 to $12 per patron, driven by a strong $10 anchor tier. If your average sits under $5, the fix is usually tier design and a clearer mid-tier value proposition rather than more promotion."},
{"question": "Does Patreon charge patrons or creators for fees?", "answer": "Platform and processing fees are deducted from the creator's side in this model, which is why gross pledges overstate income. Patrons may separately pay sales tax or VAT on top of their pledge in some regions, which does not change your net calculation here."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Your Patreon Earnings After All Fees",
    "description": "Calculate your real Patreon take-home pay after the 5, 8 or 12 percent platform fee, payment processing and payout fees. See net per patron and why small tiers lose the most to fixed fees.",
    "step": [
{"@type": "HowToStep", "name": "Enter patrons and your real average pledge", "text": "Divide last month's gross by paying patrons if you are unsure. Averages hide in dashboards, but that one division gives you the honest input."},
{"@type": "HowToStep", "name": "Select your plan fee", "text": "Choose 5, 8 or 12 percent to match the plan you are actually on. If you are deciding whether to upgrade, run the calculator both ways and price the feature difference in dollars."},
{"@type": "HowToStep", "name": "Check processing and payout assumptions", "text": "The defaults model standard processing at 2.9 percent plus $0.30 and a 1 percent payout cost. Lower the per-pledge fee to $0.15 if most of your pledges qualify as micro-transactions."},
{"@type": "HowToStep", "name": "Read net per patron before total net", "text": "Total net tells you what you earn. Net per patron tells you whether your tier design is healthy, and where the next pricing change should go."}
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
        "@id": "https://dailyfinance.tools/creator/patreon-tier-optimization",
        "url": "https://dailyfinance.tools/creator/patreon-tier-optimization",
        "name": "Patreon Earnings Calculator: What You Keep After Fees by Tier & Plan",
        "description": "Calculate your real Patreon take-home pay after the 5, 8 or 12 percent platform fee, payment processing and payout fees. See net per patron and why small tiers lose the most to fixed fees."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "Patreon Earnings Calculator", "item": "https://dailyfinance.tools/creator/patreon-tier-optimization" }
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
        title="Patreon Earnings Calculator"
        description="Calculate your real Patreon take-home pay after the 5, 8 or 12 percent platform fee, payment processing and payout fees. See net per patron and why small tiers lose the most to fixed fees."
        slug="patreon-tier-optimization"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How Much Does Patreon Actually Take?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Patreon takes a platform fee of 5, 8 or 12 percent depending on your plan, then payment processing of about 2.9 percent plus $0.30 per successful pledge, then a payout fee. On an $8 average pledge with the 8 percent plan, expect to keep roughly 84 to 86 percent of gross pledges.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Your Patreon Dashboard Shows Gross. Your Bank Account Gets Net.</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Patreon is one of the best businesses a creator can build: recurring, platform-independent-ish, and paid by your truest fans. It is also a business where the headline number lies to you every single month. The total Patreon displays is gross pledges. Between that number and your payout sit three layers of fees, and one of them, the fixed per-pledge processing charge, quietly punishes the exact pricing strategy most creators default to: lots of cheap tiers.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The mechanics are simple once they are visible. The platform fee is a percentage of earnings: 5 percent on the legacy Lite plan, 8 percent on Pro, 12 percent on Premium, which bundles merch and team features. Payment processing is charged per transaction, roughly 2.9 percent plus $0.30 for standard pledges, with a cheaper micro-transaction structure for very small pledges. Then a payout fee applies when money leaves the platform. None of these is unreasonable. All of them together mean a creator keeping score on gross is over-forecasting income by 12 to 20 percent.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Tier design is where the money is won or lost. Because processing has a fixed $0.30 component, a $2 tier loses a far larger share to fees than a $10 tier raising the same gross from fewer patrons. This calculator exists to make that trade-off numerical: model your patron count and average pledge, switch plans, and watch net per patron. Then design tiers that clear the fee drag with room to spare, anchor them on a sensible mid-tier, and let the cheap tier be a deliberate on-ramp rather than your centre of gravity.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Fixed-Fee Trap</h3>
              <p className="text-sm text-neutral-500 font-light">A $0.30 processing charge is 15 percent of a $2 pledge and only 3 percent of a $10 pledge. Low tiers are not forbidden, but they must be justified by upgrade behaviour, not by gross patron counts.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Plan Fees Buy Features</h3>
              <p className="text-sm text-neutral-500 font-light">Moving from 8 to 12 percent costs real money at scale. Only pay it if you genuinely use Premium features such as merch for membership or multiple team seats, and re-check that decision as you grow.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Net Per Patron Is the Metric</h3>
              <p className="text-sm text-neutral-500 font-light">Ten patrons at $10 netting about $8.40 each beat thirty patrons at $3 netting about $2.30 each, with a third of the support burden. Optimise for net per patron and total net, in that order.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Patreon Net Earnings Formula</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Patreon Take-Home Equation</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Net = (Patrons x Pledge) - Platform % - (Processing % + $0.30 x Patrons) - Payout %</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Work the formula on a concrete month. Gross is simply patrons multiplied by average pledge, so use your real average, not your most popular tier price, because patrons distribute unevenly. The platform fee applies to earnings. Processing applies to each successful transaction, which is why patron count appears twice in the maths: once building revenue and once building cost. Failed or refunded pledges, chargebacks and currency conversion on non-USD pledges all nibble further, so treat the calculator's output as a clean best case and keep a small buffer in your own budgeting.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The strategic output is the kept percentage and the net per patron. If you keep under 80 percent, your tier structure or plan choice is leaking. The usual fixes, in order, are: raise the entry tier floor toward $5, create a genuinely attractive $10 to $15 anchor tier so the average pledge climbs, consolidate near-duplicate tiers that fragment patrons at low price points, and drop to a cheaper plan if you are paying Premium rates for features you do not use. Small moves compound, because they apply to every patron, every month, forever.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Enter patrons and your real average pledge</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Divide last month's gross by paying patrons if you are unsure. Averages hide in dashboards, but that one division gives you the honest input.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Select your plan fee</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Choose 5, 8 or 12 percent to match the plan you are actually on. If you are deciding whether to upgrade, run the calculator both ways and price the feature difference in dollars.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Check processing and payout assumptions</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">The defaults model standard processing at 2.9 percent plus $0.30 and a 1 percent payout cost. Lower the per-pledge fee to $0.15 if most of your pledges qualify as micro-transactions.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Read net per patron before total net</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Total net tells you what you earn. Net per patron tells you whether your tier design is healthy, and where the next pricing change should go.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: 350 Patrons at an $8 Average Pledge (Pro, 8 Percent)</h3>
            <p className="text-neutral-600 font-light leading-relaxed">Gross pledges are 350 times $8, which is $2,800 a month. The Pro platform fee takes 8 percent, $224. Processing takes 2.9 percent, about $81, plus $0.30 times 350 patrons, $105, for a total of roughly $186. The 1 percent payout fee on the remainder is about $24. Net lands near $2,366 a month, about $6.76 per patron, keeping roughly 84.5 percent of gross, or about $28,400 a year. A creator budgeting on the $2,800 headline would overspend by more than $5,000 a year.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Why 1,000 Patrons at $3 Earns Less Than It Looks</h3>
            <p className="text-neutral-600 font-light leading-relaxed">Now take 1,000 patrons at a $3 average pledge, a $3,000 gross that looks bigger than Example 1. Platform fee at 8 percent is $240. Processing is 2.9 percent, $87, plus $0.30 times 1,000, which is $300, totalling $387. Payout takes about $24. Net is roughly $2,349, about $2.35 per patron, from nearly three times the supporters, the messages, the churn management and the fulfilment. The bigger community earns slightly less money. That is the fixed-fee trap in one paragraph, and it is why tier floors matter more than patron vanity counts.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Patreon Pricing Mistakes That Quietly Tax Your Income</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Building the page around a $1 or $2 tier</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Micro tiers maximise fee drag and support load while minimising revenue. Keep a low tier only as a tipping or access gesture, and design the page so the value story pushes patrons to $5 and above.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Paying for the Premium plan by default</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Twelve percent instead of eight is a 50 percent higher platform cost. At $5,000 gross a month that difference is $200 monthly, $2,400 a year, for features many solo creators never touch.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Forecasting from gross pledges</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Patron churn, failed payments and fees all reduce the headline. Budget your life on net payouts averaged over three months, and let gross be a marketing number, not a financial one.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Too many tiers at similar prices</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Five tiers between $3 and $12 fragments patrons at the bottom and confuses the choice. Three clear tiers, supporter, core and premium, usually produce a higher average pledge than a long menu.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Patreon rewards creators who treat it as a priced product rather than a donation jar. Run your real patron count and average pledge through this calculator, check your kept percentage and net per patron, and fix the biggest leak first: usually the tier floor, the plan, or the average pledge. Recheck monthly, because a structure that was fine at 100 patrons can be expensive at 1,000.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />Compare the result with your other recurring options before committing your audience. The platform fee visualiser shows exactly what the same gross earns on Substack, YouTube memberships and your own Stripe checkout, so you can choose where to push membership growth with your eyes open.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
