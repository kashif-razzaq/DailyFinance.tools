import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Inflation Calculator: Future Purchasing Power of Your Money',
  description: "See what inflation does to your money: calculate future purchasing power, the future cost of today's prices, and compare 2 percent, your rate and 5 percent side by side.",
  keywords: ['inflation calculator', 'purchasing power calculator', 'future value of money inflation', 'what will money be worth'],
  slug: "personal-wealth/inflation-purchasing-power-calculator",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "Future purchasing power equals today's amount divided by (1 + inflation rate) raised to the number of years. At 3 percent for twenty years, $10,000 divides by about 1.81, giving roughly $5,537 of buying power in today's terms.",
    "question": "How do I calculate the future purchasing power of money?"
  },
  {
    "answer": "Over very long stretches of US history, inflation has averaged roughly 3 percent a year. The decade before 2021 ran nearer 2 percent, 2022 spiked above 9 percent at its peak, and the Federal Reserve targets 2 percent over time. Your personal rate may be higher if your spending is concentrated in housing, healthcare or education.",
    "question": "What is a realistic inflation rate to use?"
  },
  {
    "answer": "Only its face value. Cash earning nothing falls in purchasing power at exactly the inflation rate \u2014 halving roughly every twenty-four years at 3 percent. A bank balance can look identical for a decade while quietly losing a quarter of what it can buy.",
    "question": "Does cash under the mattress or in a current account lose value?"
  },
  {
    "answer": "At minimum, long-term money needs to earn the inflation rate just to stand still, after tax. That is why money needed in five-plus years is usually invested rather than left in cash, and why even emergency cash belongs in a high-yield savings account rather than a zero-interest one.",
    "question": "What return do I need to beat inflation?"
  },
  {
    "answer": "Historically, a diversified stock portfolio has beaten inflation by several percent a year over long periods, though with deep falls along the way. Government inflation-linked bonds (TIPS in the US) are designed to match inflation directly. No asset guarantees it over short periods, which is why horizon matters.",
    "question": "What investments protect against inflation?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'Inflation Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/inflation-purchasing-power-calculator", "url": "https://dailyfinance.tools/personal-wealth/inflation-purchasing-power-calculator", "name": 'Inflation Calculator: Future Purchasing Power of Your Money', "description": "See what inflation does to your money: calculate future purchasing power, the future cost of today's prices, and compare 2 percent, your rate and 5 percent side by side." }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'Inflation Calculator', "item": "https://dailyfinance.tools/personal-wealth/inflation-purchasing-power-calculator" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='Inflation Calculator' description="See what inflation does to your money: calculate future purchasing power, the future cost of today's prices, and compare 2 percent, your rate and 5 percent side by side." slug="inflation-purchasing-power-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: What Inflation Does to Your Money</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Inflation shrinks what your money can buy. At 3 percent inflation, cash loses about a quarter of its purchasing power every decade and half in roughly twenty-four years. This calculator shows the future purchasing power of any amount, and what today's prices will cost in the future.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Inflation: The Loss That Never Shows on Your Statement</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Inflation is the only major financial force that can make you poorer while every number in your bank account stays exactly the same. Your balance does not fall. Your statements look reassuringly identical. But year after year, the rent, the groceries, the insurance and the house deposit that money was meant to cover all drift further out of reach. Economists call the result a loss of purchasing power; households experience it as the feeling that money used to go further — because it did.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">This calculator turns that feeling into a number. Give it an amount and a number of years, choose an inflation rate, and it shows what your money will actually be able to buy in today's terms, alongside what today's purchases will cost by then. The comparison chart is the part most people remember: the same sum of cash traced at 2 percent, at your chosen rate, and at 5 percent, diverging year by year like three different futures — which, for a saver, is exactly what they are.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The point of the exercise is not pessimism; it is calibration. Once you have watched $10,000 of idle cash become roughly $5,500 of real buying power over twenty years at a modest 3 percent, decisions elsewhere in your financial life rearrange themselves. Cash stops looking like the safe option and starts looking like what it is for long horizons: a slow, certain loss — to be used deliberately for short-term needs, and avoided as a long-term store of value.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Prices Rise, Cash Shrinks</h3>
              <p className="text-sm text-neutral-500 font-light">Inflation never takes money out of your account. It does something quieter: it raises the price of everything the money was for, until the same balance buys a fraction of what it once did.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Your Rate Is Personal</h3>
              <p className="text-sm text-neutral-500 font-light">Headline inflation is an average basket. If your spending is heavy on rent, healthcare or tuition — categories that have historically risen faster — your personal inflation rate, and your loss of purchasing power, is higher.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Defence Is a Return Above Inflation</h3>
              <p className="text-sm text-neutral-500 font-light">Money only keeps its power if it grows faster than prices rise. That is the entire case for investing long-term savings rather than holding them in cash, stated in one sentence.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Inflation maths is compound interest turned against you, which is why the same exponent appears. Money's purchasing power divides by one plus the inflation rate for every year that passes, while the price of anything you intend to buy multiplies by the same factor. The two effects are the same coin: your money is worth less precisely because everything it buys costs more. The calculator runs both directions and charts your rate against a gentle 2 percent world and a harsh 5 percent one.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Purchasing Power Equation</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Future Purchasing Power = Amount / (1 + i)^n  ·  Future Cost = Today's Price x (1 + i)^n  ·  i = annual inflation rate, n = years</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Erode the Amount, Year by Year</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Each year, divide the money's purchasing power by one plus the inflation rate. After one year at 3 percent, $10,000 buys what $9,709 buys today. It looks trivially small — which is precisely how inflation wins. The division repeats, compounds, and by year twenty the same cash buys only about $5,537 worth of today's goods and services.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Inflate the Price Tag the Other Way</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Now run the same maths forward on prices: multiply today's cost by one plus the inflation rate, once per year. A $10,000 cost today becomes about $18,061 in twenty years at 3 percent. Savers saving toward a fixed future purchase are chasing a moving target, and this step tells you how fast your particular target is moving away.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Compare Rates, Because the Rate Is the Story</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Small rate differences explode over long horizons. At 2 percent, $10,000 keeps about $6,730 of purchasing power over twenty years; at 5 percent, only about $3,769. The chart plots all three paths so you can see why arguing about one percent of inflation — or one percent of investment return — is not pedantry. Over decades, one percent is the whole game.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: $10,000 in Cash for Twenty Years</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Ten thousand dollars held as cash at 3 percent inflation for twenty years keeps all ten thousand of its face value — and loses almost half its usefulness. Its purchasing power falls to about $5,537 in today's terms, while something that costs $10,000 today will be priced around $18,061. The chart's 5 percent line is bleaker still: at that rate the same cash falls to about $3,768 of purchasing power. Nothing was spent, nothing was stolen, and nearly two-thirds of the value at the higher rate quietly evaporated.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: A House Deposit Saved the Slow Way</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">A couple saves a $60,000 deposit target over eight years in a standard savings account earning half a percent, while house prices and general prices rise at 3.5 percent. When they arrive, their $60,000 buys what about $45,700 bought when they started — and the homes they were aiming at have moved up by roughly a third in nominal price. The lesson is not to gamble a deposit on stocks; it is to hold even short-horizon savings in the highest-yield insured cash available, and to index the target itself to prices, not to a fixed number chosen years earlier.</p>
          </div>
          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Common Mistakes to Avoid</h2>
          <ul className="space-y-6 mb-16">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Keeping Long-Term Savings in Cash 'To Be Safe'</strong><span className="text-neutral-600 font-light leading-relaxed">Cash feels safe because its number never falls. Its value falls instead, invisibly and almost mechanically. Money you will not need for five or more years, parked in a zero- or low-interest account, is a plan to arrive with materially less than you saved. Safety for long horizons is diversification, not stillness.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Using Headline Inflation for Personal Decisions</strong><span className="text-neutral-600 font-light leading-relaxed">The official rate averages millions of baskets. A renter in a fast-rising city, a family paying tuition, or a retiree spending heavily on healthcare all face higher personal rates. If your big costs rise faster than the headline, plan with a higher rate in this calculator — your future self is buying your basket, not the average one.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Setting a Fixed Savings Target and Never Revisiting It</strong><span className="text-neutral-600 font-light leading-relaxed">A deposit, wedding or retirement target chosen as a round number five years ago is worth less every year it sits unadjusted. Savers hit the nominal target and discover it no longer buys the thing. Index long-term targets: raise the goal itself by roughly the inflation rate each year, or work in today's-money terms with real returns throughout.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Assuming Your Pay Rises Are Real Raises</strong><span className="text-neutral-600 font-light leading-relaxed">A 2 percent pay rise in a 3.5 percent inflation year is a real pay cut of about one and a half percent, whatever the announcement letter says. Over a decade of such 'raises', a household can lose a fifth of its standard of living while feeling vaguely ungrateful. Check your income against this calculator's erosion curve before judging your progress.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Panic-Buying Assets You Do Not Understand</strong><span className="text-neutral-600 font-light leading-relaxed">Fear of inflation pushes people into whatever is marketed as an inflation hedge — often illiquid, volatile or fraudulent. The boring defences work: insured high-yield cash for short horizons, diversified low-cost investing for long ones, and skills and income growth, which no price index can erode.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Living With Inflation: The Household Playbook</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Economists argue about whether a little inflation is healthy, but for your household the practical takeaways are not controversial. Keep only true short-term money — your emergency fund and spending due within a year or two — in cash, and make even that cash work in a high-yield account. For money with a horizon of five years or more, the question is not whether to take investment risk; it is that standing still is itself a decision with a near-certain slow loss attached, and historically diversified investing has been the ordinary household's only reliable way to outrun it.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Finally, build inflation into every other plan you make on this site. A retirement target stated as a round number today must be inflated to the date you will spend it, or discounted by using real returns. A salary that rises two percent in a three percent world is a pay cut wearing a raise's clothes. Run this calculator once a year alongside your net worth check and the numbers will keep you honest in a way headlines about inflation — abstract, national, someone else's problem — never will.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> Inflation projections are illustrative estimates based on the constant rate you enter; actual inflation varies every year and differs by category and country. This page is educational information, not financial advice.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
