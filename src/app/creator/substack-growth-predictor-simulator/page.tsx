import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Substack Earnings Calculator: Project Paid Subscribers, MRR & Churn",
  description: "Project your Substack income month by month: free subscriber growth, free-to-paid conversion and churn, minus Substack's 10 percent and Stripe fees. See future MRR, ARR and cumulative earnings.",
  keywords: ["substack calculator", "substack earnings calculator", "substack income", "how much can you make on substack", "substack conversion rate", "newsletter revenue calculator"],
  slug: "creator/substack-growth-predictor-simulator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "What percentage does Substack take from paid subscriptions?", "answer": "Substack takes 10 percent of paid subscription revenue. On top of that, Stripe payment processing costs about 2.9 percent plus $0.30 per transaction. Combined, a creator typically keeps about 83 to 87 percent of gross subscription revenue, with the exact figure depending on price and billing frequency."},
{"question": "What is a good free-to-paid conversion rate on Substack?", "answer": "Most healthy newsletters convert between 3 and 10 percent of free subscribers to paid. Below 3 percent usually signals a positioning problem with the paid tier. Above 10 percent is excellent and often means the free tier could grow faster or the paid price could rise."},
{"question": "How many subscribers do you need to make $5,000 a month on Substack?", "answer": "Work backwards from net. At an $8 price keeping about 86 percent, you need roughly 730 paid subscribers to net about $5,000 a month. At a 5 percent conversion rate that implies a free list near 14,600, before allowing for the churn you must continuously replace."},
{"question": "Why does churn matter so much for newsletters?", "answer": "Churn compounds. At 5 percent monthly churn, about 46 percent of today's paid base will be gone within a year unless replaced. Growth and conversion must first refill that leak before revenue rises, which is why retention work often outperforms audience growth for established newsletters."},
{"question": "Are annual Substack plans better for creators than monthly?", "answer": "Usually, yes. Annual subscribers churn far less frequently and generate one Stripe transaction instead of twelve, reducing the fixed-fee drag. The standard trade is a discount of about two months' price, which the retention and fee advantages typically repay."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Project Your Substack Earnings",
    "description": "Project your Substack income month by month: free subscriber growth, free-to-paid conversion and churn, minus Substack's 10 percent and Stripe fees. See future MRR, ARR and cumulative earnings.",
    "step": [
{"@type": "HowToStep", "name": "Enter your current free subscribers and price", "text": "Use today's real list size and your monthly price, or the monthly equivalent of your annual plan. This anchors the simulation in fact rather than ambition."},
{"@type": "HowToStep", "name": "Set growth and conversion from your analytics", "text": "Growth is your average monthly free-list growth over recent months. Conversion is paid subscribers divided by free subscribers, typically 3 to 10 percent."},
{"@type": "HowToStep", "name": "Set churn honestly and choose a horizon", "text": "Find monthly churn in your subscriber analytics. Project 12 months for planning, 24 to 36 months to see whether growth or churn wins in the long run."},
{"@type": "HowToStep", "name": "Read end MRR, ARR and cumulative net", "text": "End MRR is the run-rate you are building toward. Cumulative net is what the newsletter actually pays you across the whole period, which is the fair number to compare against other uses of your writing time."}
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
        "@id": "https://dailyfinance.tools/creator/substack-growth-predictor-simulator",
        "url": "https://dailyfinance.tools/creator/substack-growth-predictor-simulator",
        "name": "Substack Earnings Calculator: Project Paid Subscribers, MRR & Churn",
        "description": "Project your Substack income month by month: free subscriber growth, free-to-paid conversion and churn, minus Substack's 10 percent and Stripe fees. See future MRR, ARR and cumulative earnings."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "Substack Earnings Calculator", "item": "https://dailyfinance.tools/creator/substack-growth-predictor-simulator" }
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
        title="Substack Earnings Calculator"
        description="Project your Substack income month by month: free subscriber growth, free-to-paid conversion and churn, minus Substack's 10 percent and Stripe fees. See future MRR, ARR and cumulative earnings."
        slug="substack-growth-predictor-simulator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: How Much Can You Earn on Substack?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Substack earnings equal paid subscribers multiplied by price, minus Substack's 10 percent and Stripe's 2.9 percent plus $0.30 per transaction. A newsletter with 5,000 free subscribers converting at 5 percent to an $8 plan starts near $1,800 net per month, before growth and churn reshape it.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Newsletters Compound Quietly, and Churn Compounds Louder</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A Substack looks simple from the outside: write, grow a free list, convert a slice of it to paid, collect monthly revenue. The simplicity hides two exponential forces pulling in opposite directions. Growth compounds your free list, and every free subscriber is a future paid subscriber at your conversion rate. Churn compounds against your paid base, deleting a percentage of it every month whether you publish brilliantly or not. Which force wins is a maths question, and it is the question this simulator answers month by month instead of with a single flattering snapshot.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The snapshot fallacy is how most newsletter income claims mislead. Paid subscribers today times price is not a forecast, because the paid base is a leaky bucket sitting under a growing tap. At 3 percent monthly churn you must replace 3 percent of paid subscribers every month to stand still. At 8 percent growth and 5 percent conversion, the tap usually wins early. The interesting moment is later, when the list is large, growth slows, and churn on a big base eats the entire output of conversion. Watching the month-by-month curve tells you when to push growth, when to push conversion, and when churn reduction is worth more than both.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Fees are the third force, and they are refreshingly legible: Substack takes 10 percent of paid revenue, and Stripe takes about 2.9 percent plus $0.30 per transaction. On an $8 subscription that fixed $0.30 is nearly 4 percent by itself, which is why annual plans, paid yearly with one transaction, quietly improve your kept share. This simulator nets all of it out, so the MRR it projects is the money that can actually reach your bank account, growing or shrinking for reasons you can see.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Conversion Is a Range, Not a Hope</h3>
              <p className="text-sm text-neutral-500 font-light">Healthy newsletters convert 3 to 10 percent of free subscribers to paid. Below 3 percent, the paid offer or its positioning is the problem. Above 10 percent, your free content may be underpriced in attention, giving away what should be sold.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Churn Sets Your Ceiling</h3>
              <p className="text-sm text-neutral-500 font-light">At 5 percent monthly churn, a paid base has a half-life of about 14 months. Reducing churn by one point is mathematically identical to a permanent increase in conversion, and usually cheaper to achieve.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Annual Plans Fix Two Problems</h3>
              <p className="text-sm text-neutral-500 font-light">Annual subscribers churn less often and pay one Stripe transaction instead of twelve. Even at the standard discount of roughly two months free, annual-heavy newsletters keep more revenue and forecast more calmly.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Substack Projection Formula</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Newsletter Growth and Revenue Model</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Paid(t) = Paid(t-1) x (1 - Churn %) grown toward Free(t) x Conversion %  ·  Net MRR = Paid x Price - 10% - (2.9% + $0.30 x Paid)</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Each simulated month does three things. The free list grows by your growth rate. The paid base first leaks by the churn rate, then refills toward the level your conversion rate implies for the new, larger free list. Revenue is paid subscribers multiplied by price, and net revenue deducts Substack's 10 percent, then Stripe's percentage and the per-transaction $0.30 multiplied by the number of paid subscribers billing that month.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Treat the assumptions as dials you own, not facts you discover. Growth rate is the average of your last three to six months, not your best month after a viral note. Conversion is paid divided by free today, adjusted for whether your next moves target conversion or reach. Churn is in your Substack analytics, and it differs sharply between monthly and annual cohorts, so an annual-heavy base deserves a lower churn input. Run a pessimistic case with growth halved and churn raised: if the business still works there, it works.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Enter your current free subscribers and price</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Use today's real list size and your monthly price, or the monthly equivalent of your annual plan. This anchors the simulation in fact rather than ambition.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Set growth and conversion from your analytics</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Growth is your average monthly free-list growth over recent months. Conversion is paid subscribers divided by free subscribers, typically 3 to 10 percent.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Set churn honestly and choose a horizon</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Find monthly churn in your subscriber analytics. Project 12 months for planning, 24 to 36 months to see whether growth or churn wins in the long run.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Read end MRR, ARR and cumulative net</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">End MRR is the run-rate you are building toward. Cumulative net is what the newsletter actually pays you across the whole period, which is the fair number to compare against other uses of your writing time.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: 5,000 Free Subscribers, 8 Percent Growth, 5 Percent Conversion</h3>
            <p className="text-neutral-600 font-light leading-relaxed">Start with 5,000 free subscribers, 250 of them paid at $8, producing about $2,000 gross and roughly $1,730 net after Substack and Stripe. Grow the free list at 8 percent a month for a year and it reaches about 12,600. At a steady 5 percent conversion with 3 percent monthly churn, the paid base climbs to roughly 620 subscribers. Net MRR at month 12 is about $4,300, an annual run-rate above $51,000, and cumulative net earnings across the year are roughly $34,000. Nothing heroic was assumed: no virality, no price rise, just steady compounding against modest churn.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The Same Newsletter With 6 Percent Churn</h3>
            <p className="text-neutral-600 font-light leading-relaxed">Change one dial: churn rises from 3 to 6 percent a month, the level of a newsletter whose paid tier feels optional. The free list grows identically to about 12,600, but the paid base now leaks faster than conversion refills it in the later months, ending nearer 480 paid subscribers. Month-12 net MRR falls to roughly $3,300 and cumulative net drops by several thousand dollars. The writer published the same words to the same audience growth. The entire difference is retention, which is why the highest-paid newsletter work is often boring: onboarding, paid-only rituals and reminding subscribers what they get.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Substack Forecasting Mistakes That Overstate Newsletter Income</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Projecting paid subscribers as a fixed share with no churn</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Paid bases leak every month. A model without churn will overstate month-12 revenue by 20 to 40 percent in typical cases, and the error grows with the horizon.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Using best-month growth as the growth rate</strong>
                <span className="text-neutral-600 font-light leading-relaxed">One viral note can triple a month's growth and never repeat. Average the last three to six months, and treat spikes as upside scenarios, not the base case.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Ignoring the $0.30 in Stripe fees</strong>
                <span className="text-neutral-600 font-light leading-relaxed">On an $8 subscription, the fixed Stripe component is close to 4 percent of price on monthly billing. Cheap monthly plans pay a proportionally heavier fee toll than annual plans, which bill once.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Counting gross instead of net</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Substack's 10 percent plus Stripe takes roughly 13 to 17 percent of a typical subscription before it reaches you. Planning your life on gross newsletter revenue repeats the oldest creator accounting error.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A newsletter is a compounding machine with a leak. This simulator's job is to show you which side of that sentence deserves your next month of effort: growth while the base is small, conversion when the list is large and under-monetised, and churn reduction once the paid base is big enough that its leak rivals your entire conversion output. Re-run it quarterly with fresh analytics and the forecast stays honest.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />Compare the projection with your other recurring revenue before going all-in. If the same audience would net more as Patreon members or course buyers, the platform fee and course calculators on this site let you test that in minutes, using the same net-of-fees discipline.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
