import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Course Launch Revenue Calculator: Model List, Conversion, Price & Refunds",
  description: "Model your online course launch before you run it: email list size times conversion times price, minus refunds, platform fees, processing and affiliate payouts. Includes revenue per subscriber.",
  keywords: ["course launch calculator", "online course revenue calculator", "course launch revenue", "how much can I make selling a course", "email list conversion rate course"],
  slug: "creator/course-launch-revenue-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "What is a good conversion rate for a course launch?", "answer": "For a warm email list, 1 to 3 percent of the whole list buying is a realistic planning range, with proven offers to hot lists reaching 4 to 6 percent. Webinar and challenge funnels quote higher rates, but those are percentages of attendees, not of the list, and must be converted back before forecasting."},
{"question": "How much should I budget for refunds on a course launch?", "answer": "Model 5 percent of gross as a baseline for a solid course with a clear guarantee. Information products with aggressive marketing or payment plans commonly see 8 to 12 percent once defaults are included. If your actual rate stays above 10 percent, the offer promise and the product have a gap to fix."},
{"question": "What is revenue per subscriber and why does it matter?", "answer": "It is net launch revenue divided by list size. It prices your audience: if a launch nets $6 per subscriber, acquiring subscribers for less than that, through ads, affiliates or sponsorships, is profitable growth. It is the single most strategic number a launch produces."},
{"question": "Are course platform fees worth paying versus my own checkout?", "answer": "A hosted platform charging 5 to 10 percent buys hosting, delivery, checkout, some tax handling and support tooling. Your own checkout costs roughly 2.9 percent plus $0.30 per order but leaves delivery and support to you. At small scale the platform is usually worth it; at high volume the percentage becomes a large absolute cost worth re-evaluating."},
{"question": "How do affiliates change launch economics?", "answer": "Affiliates add reach at 30 to 50 percent commission on the sales they generate. Model them as an effective percentage of total kept sales: partner share of sales multiplied by their commission rate. Affiliate-driven launches gross more and net a smaller share, which is healthy as long as the sales are genuinely incremental."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Calculate Online Course Launch Revenue",
    "description": "Model your online course launch before you run it: email list size times conversion times price, minus refunds, platform fees, processing and affiliate payouts. Includes revenue per subscriber.",
    "step": [
{"@type": "HowToStep", "name": "Enter your real launch audience", "text": "Count the people who will actually receive the launch: your email list, or the segment you will mail. Social followers convert far worse and belong in a separate, colder scenario."},
{"@type": "HowToStep", "name": "Set price and a defensible conversion rate", "text": "Use 1 to 3 percent for a warm list unless your own launch history says otherwise. If this is your first launch, run 1 percent as your planning case and treat anything above as upside."},
{"@type": "HowToStep", "name": "Add refunds, platform and affiliate costs", "text": "Five percent refunds, your platform's true percentage, and affiliate share as an effective rate across all sales. If partners drive half your sales at 40 percent, enter 20."},
{"@type": "HowToStep", "name": "Read net and revenue per subscriber", "text": "Net is the launch result. Revenue per subscriber is the strategy: it tells you what audience growth is worth and whether paid acquisition can ever work for this offer."}
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
        "@id": "https://dailyfinance.tools/creator/course-launch-revenue-calculator",
        "url": "https://dailyfinance.tools/creator/course-launch-revenue-calculator",
        "name": "Course Launch Revenue Calculator: Model List, Conversion, Price & Refunds",
        "description": "Model your online course launch before you run it: email list size times conversion times price, minus refunds, platform fees, processing and affiliate payouts. Includes revenue per subscriber."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "Course Launch Revenue Calculator", "item": "https://dailyfinance.tools/creator/course-launch-revenue-calculator" }
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
        title="Course Launch Revenue Calculator"
        description="Model your online course launch before you run it: email list size times conversion times price, minus refunds, platform fees, processing and affiliate payouts. Includes revenue per subscriber."
        slug="course-launch-revenue-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How Much Will a Course Launch Actually Make?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Launch revenue equals your list size multiplied by your conversion rate, multiplied by price, minus refunds, platform and processing fees and affiliate payouts. A warm list of 8,000 converting at 2.5 percent to a $299 course grosses about $59,800 and typically nets $48,000 to $52,000 after all deductions.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">A Launch Is a Multiplication Problem, and Most Creators Only Do Half of It</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Ask a creator what their launch made and you will usually hear the gross: the Stripe total, the screenshot number. Ask what it netted and the room goes quiet. Between gross and net sit refunds that arrive for weeks, platform percentages, card processing on every order, affiliate payouts that can claim a third of some sales, and the payment-plan defaults nobody modelled. This calculator does the whole multiplication, and the deductions, before you spend a month building a funnel on a fantasy.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The three growth levers are list size, conversion rate and price, and they are not equally easy to move. Doubling a list takes a year. Doubling price takes a decision, if the value supports it. Doubling conversion, from 1.5 to 3 percent, takes a better offer, a warmer runway and clearer proof, which is why experienced launchers obsess over the weeks before the cart opens. The model here lets you test each lever separately: hold two constant, move the third, and see which effort actually changes your life.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The most useful output is the quietest one: revenue per subscriber. It converts your launch into a unit economics number you can spend against. If a launch nets $6 per subscriber, you can profitably buy growth at $3 a subscriber all year and print money. If it nets $0.80, paid growth is a bonfire and organic audience building is your only sane channel. Every serious course business eventually runs on this number. This calculator gives it to you before the launch, while you can still change the inputs.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Conversion Beats List Size</h3>
              <p className="text-sm text-neutral-500 font-light">Moving conversion from 1 to 3 percent triples revenue with zero new subscribers. Warm-up content, a waitlist, live workshops and genuine proof move this number more than any ad budget at launch week.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Refunds Are a Pricing Signal</h3>
              <p className="text-sm text-neutral-500 font-light">A 5 percent refund rate is normal for a solid course. Above 10 percent, the promise and the product have separated, and no funnel tweak fixes that for long. Model refunds honestly or your net is fiction.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Affiliates Are Not Free Revenue</h3>
              <p className="text-sm text-neutral-500 font-light">A 40 percent commission on partner-driven sales can be excellent business, but only on sales the partner actually caused. Blending affiliate share across all revenue, as this calculator's effective-rate input does, keeps the model honest.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Course Launch Revenue Formula</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Launch Net Revenue Equation</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Net = (List x Conversion % x Price) - Refunds - Platform % - Processing - Affiliate Payouts</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Buyers are list size multiplied by conversion rate, where conversion means the share of the whole list that buys, not the share of webinar attendees or cart-page visitors. Gross is buyers multiplied by price. Then the deductions begin: refunds as a percentage of gross, the platform percentage if you host on a course platform rather than your own checkout, card processing at roughly 2.9 percent plus $0.30 per successful order, and affiliate payouts expressed as an effective share of kept sales.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Two refinements separate a planner from a dreamer. First, payment plans: a meaningful share of buyers on plans will default before completing payments, so either model a lower effective price or raise your refund and default allowance. Second, timing: refunds and chargebacks land after launch week, affiliate payouts are often held 30 days, and platform payouts have their own schedule. Net revenue and cash-in-bank-this-month are different numbers, and a launch that funds next month's bills needs the second one, not just the first.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Enter your real launch audience</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Count the people who will actually receive the launch: your email list, or the segment you will mail. Social followers convert far worse and belong in a separate, colder scenario.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Set price and a defensible conversion rate</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Use 1 to 3 percent for a warm list unless your own launch history says otherwise. If this is your first launch, run 1 percent as your planning case and treat anything above as upside.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Add refunds, platform and affiliate costs</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Five percent refunds, your platform's true percentage, and affiliate share as an effective rate across all sales. If partners drive half your sales at 40 percent, enter 20.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Read net and revenue per subscriber</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Net is the launch result. Revenue per subscriber is the strategy: it tells you what audience growth is worth and whether paid acquisition can ever work for this offer.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: An 8,000-Subscriber List, $299 Course, 2.5 Percent Conversion</h3>
            <p className="text-neutral-600 font-light leading-relaxed">Buyers are 8,000 times 2.5 percent, which is 200 buyers. Gross is 200 times $299, or $59,800. Refunds at 5 percent remove $2,990. The platform takes 5 percent of kept sales, about $2,840. Card processing at 2.9 percent plus $0.30 per order removes roughly $1,705. With no affiliates, net launch revenue is about $52,265, and revenue per subscriber is about $6.53. That last number is the headline: this creator can pay several dollars per new subscriber, profitably, for the entire year before the next launch.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The Same Offer, Half the Conversion, With Affiliates</h3>
            <p className="text-neutral-600 font-light leading-relaxed">Keep the list and price, but suppose the list is colder and conversion lands at 1.2 percent, and affiliates drive half the sales at a 40 percent commission, an effective 20 percent of kept revenue. Buyers fall to 96 and gross to about $28,700. After 5 percent refunds, 5 percent platform fees and processing, the affiliate payout removes roughly another $4,900. Net lands near $19,600, under $2.45 per subscriber. Nothing about the course changed. Warmth of the list and the affiliate blend quietly cut the launch by almost two thirds, which is precisely why these inputs belong in the model before the cart opens, not in the post-mortem.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Course Launch Modelling Mistakes That Bankrupt Good Launches</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Using attendee conversion as list conversion</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A webinar converting 15 percent of attendees sounds wonderful until you remember 8 percent of the list attended. List-level conversion for a warm audience is usually 1 to 3 percent. Mixing the two inflates forecasts fivefold.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Forgetting refunds and plan defaults</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Gross screenshots ignore the 5 to 10 percent that walks back out through refunds, failed payment-plan instalments and chargebacks. Model them or your launch profit is a loan from your future self.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Treating affiliate revenue as pure upside</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Affiliates expand reach, but at 30 to 50 percent commission on the sales they drive. If partners would have bought anyway through your list, you have paid a heavy toll for your own traffic.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Pricing to the list you wish you had</strong>
                <span className="text-neutral-600 font-light leading-relaxed">A $999 course to a small, cold list fails on conversion no matter how good it is. Match price to trust: smaller warm lists often net more from a $199 to $399 offer with strong conversion than from a premium price nobody is warmed up for.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Model the launch before you build it: honest list, defensible conversion, full deductions. If the net disappoints, you now know which lever to work, warmer runway for conversion, a price the value can carry, or a year of audience growth priced against your revenue per subscriber. A launch planned this way rarely surprises its creator, and boring predictability is what turns courses from gambles into a business line.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />After the launch, compare the actuals against this model line by line: conversion, refunds, affiliate share. The gap analysis from a single launch improves every future forecast on this page, and tells you whether your next dollar belongs in list growth, offer design or a membership product like Patreon or Substack instead.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
