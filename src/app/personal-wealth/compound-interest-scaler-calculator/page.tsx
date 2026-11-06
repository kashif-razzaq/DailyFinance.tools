import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Compound Interest Calculator: Growth With Monthly Contributions',
  description: 'Use our free compound interest calculator to project any lump sum plus monthly contributions, see total interest earned and a year-by-year growth table. Instant results.',
  keywords: ['compound interest calculator', 'compound growth calculator', 'investment growth calculator', 'interest calculator with monthly contributions'],
  slug: "personal-wealth/compound-interest-scaler-calculator",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "A = P x (1 + r/n)^(n x t) for a lump sum, where P is the starting amount, r the annual rate, n the compounding periods per year and t the years. Regular contributions are added as the future value of a series of payments, which this calculator does month by month for you.",
    "question": "What is the compound interest formula?"
  },
  {
    "answer": "Simple interest is calculated only on the original amount, so it grows in a straight line. Compound interest is calculated on the amount plus all interest already earned, so growth accelerates over time. Over long periods the gap becomes enormous \u2014 compounding is why starting early beats contributing more, up to a point.",
    "question": "What is the difference between simple and compound interest?"
  },
  {
    "answer": "Barely. At typical rates, daily compounding on a savings account adds a small fraction of a percent over a year compared with monthly compounding. Contribution size, interest rate and especially time each matter many times more than compounding frequency.",
    "question": "How much does compounding frequency actually matter?"
  },
  {
    "answer": "Under the return assumption you entered, the balance curve eventually crosses your total-contributions line, typically in the second half of a long horizon. The calculator's chart shows both lines: when the gap between them widens quickly, compounding \u2014 not your deposits \u2014 has become the main engine of growth.",
    "question": "When does interest start earning more than I contribute?"
  },
  {
    "answer": "Use historical averages as a starting guide only: around 4 to 5 percent for current high-yield savings accounts, and 7 to 10 percent nominal for long-run diversified stock-market returns before inflation. Then test a lower figure as well \u2014 a plan that still works at a modest return is a plan you can trust.",
    "question": "What interest rate should I use for investments?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'Compound Interest Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/compound-interest-scaler-calculator", "url": "https://dailyfinance.tools/personal-wealth/compound-interest-scaler-calculator", "name": 'Compound Interest Calculator: Growth With Monthly Contributions', "description": 'Use our free compound interest calculator to project any lump sum plus monthly contributions, see total interest earned and a year-by-year growth table. Instant results.' }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'Compound Interest Calculator', "item": "https://dailyfinance.tools/personal-wealth/compound-interest-scaler-calculator" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='Compound Interest Calculator' description='Use our free compound interest calculator to project any lump sum plus monthly contributions, see total interest earned and a year-by-year growth table. Instant results.' slug="compound-interest-scaler-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: How Compound Interest Works</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Compound interest grows a sum by earning interest on the interest already added. Enter a starting amount, monthly contributions, a rate and a number of years, and this calculator projects the final balance, how much you paid in, and how much growth the money generated by itself over time.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Compound Interest: The Eighth Wonder, With Receipts</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Compound interest has a public-relations problem: for the first several years, it is genuinely unimpressive. A thousand dollars at 8 percent earns eighty dollars in year one. But compounding is not really about the first year — it is about the fact that the interest itself starts earning interest, and its earnings earn earnings, until growth stops being a line and becomes a curve that bends relentlessly upward. Given enough years, the curve does something that feels unfair: the majority of a portfolio's final value was never contributed by its owner at all.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">This calculator makes that curve visible and specific to your numbers. Enter a starting amount, a monthly contribution, a rate and a horizon, and it shows the final balance, exactly how much of it you paid in, and how much the money earned by itself — plus a year-by-year table so you can watch the crossover point where interest overtakes contributions as the main source of growth. It also lets you change compounding frequency, partly to settle the question of how much it matters (honest answer: less than almost everything else on the page).</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Use the tool the way investors actually use it: to compare decisions. What is starting five years earlier worth, in dollars? What does an extra one hundred a month buy you by retirement? How badly does a one percent fee, shaved off your return every year, damage the end result? Those comparisons are where compounding stops being a maths topic and becomes the most important financial idea you will ever apply.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Time Multiplies Everything</h3>
              <p className="text-sm text-neutral-500 font-light">Compounding rewards years more than amounts. Money at 8 percent doubles about every nine years — so a contribution made at twenty-five gets an extra doubling or two that the same contribution at forty-five can never catch.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Contributions vs Interest</h3>
              <p className="text-sm text-neutral-500 font-light">Early on, growth is mostly your own deposits. Later, the balance flips: past a crossover point the portfolio earns more each year than you put in. That crossover is the moment your money starts working harder than you do.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Frequency Is a Detail</h3>
              <p className="text-sm text-neutral-500 font-light">Compounding daily versus annually changes the result by surprisingly little. Rate, time and contribution size are the big levers; anyone selling you on frequency is polishing the smallest dial on the machine.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The compound interest formula does two jobs at once. The first term grows your starting amount: each period, the balance is multiplied by one plus the periodic rate, and that multiplication repeats for every period in the horizon — the exponent is where the magic lives. The second term grows your stream of contributions, each of which compounds for whatever time it has left. Add the two together and you have your projection, your total paid in, and the difference between them, which is the interest the money earned on its own.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Compound Interest Formula</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">A = P x (1 + r/n)^(n x t) + PMT x [((1 + r/n)^(n x t) - 1) / (r/n)]  ·  A = final amount, P = starting amount, r = annual rate, n = periods per year, t = years, PMT = regular contribution</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Grow the Starting Amount</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Each compounding period, the balance earns the periodic rate — the annual rate divided by the periods per year. After the first period, the next period's interest is calculated on the new, larger balance. Repeated over hundreds of periods, this multiplication is what the exponent in the formula summarises, and why the starting amount's growth accelerates every year even though nothing about the rate changes.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Grow Every Contribution Separately</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A contribution made in month one compounds for the whole horizon; the same contribution made in the final year compounds for almost no time at all. The contributions term of the formula adds up all of those individual journeys at once. It is why monthly contributions early in the horizon are worth so much more, dollar for dollar, than identical contributions near the end.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Split the Result Into Yours and the Market's</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Subtract everything you paid in — the starting amount plus all contributions — from the final balance. What remains is pure compounding: money your money made. Watching that share grow from a tenth of the balance to two-thirds of it over a long horizon is the clearest possible answer to the question of why starting beats waiting.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: $10,000 Plus $300 a Month for 25 Years</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Start with ten thousand dollars, add three hundred a month, and let it compound monthly at 8 percent for twenty-five years. Your calculator will show a final balance in the region of $350,000. Yet you only paid in $100,000 — ten thousand at the start and ninety thousand in monthly contributions. The remaining roughly $250,000 is interest on interest: well over two-thirds of the final pot was earned by the money itself, not deposited by you. That ratio, not the headline balance, is the real lesson of the example.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: The Ten-Year Delay Tax</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Run the same saver starting ten years later — fifteen years instead of twenty-five. The balance lands around $145,000 instead of $350,000, even though she deposits only $36,000 less. Waiting cost her roughly $200,000 of growth, more than five times the contributions she skipped. No raise in contribution within reason repairs a late start as cheaply as starting now: to reach the same $350,000 in fifteen years she would need to save well over $1,100 a month instead of $300.</p>
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
              <div><strong className="text-[#1F2937] block text-lg mb-1">Trusting a Single Perfect Return</strong><span className="text-neutral-600 font-light leading-relaxed">Real markets do not pay 8 percent every year like a salary; they lurch. A constant-rate projection is a planning line, not a prediction. Run your plan at one or two percent below your expected return as well, and prefer decisions that survive the pessimistic run, not just the pretty one.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting Inflation in Long Projections</strong><span className="text-neutral-600 font-light leading-relaxed">A million dollars in thirty years is not a million dollars of today's purchasing power — at 3 percent inflation it is closer to four hundred thousand. If your goal is stated in today's lifestyle terms, either use a real (inflation-adjusted) return of around 4 to 5 percent for equities, or mentally deflate the final number before celebrating it.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Ignoring Fees and Tax Drag</strong><span className="text-neutral-600 font-light leading-relaxed">A one percent annual fee sounds trivial and is not: over thirty years it can consume more than a quarter of your final balance, because every fee dollar also loses its own future compounding. Interest and dividends may also be taxed along the way outside retirement accounts. If your real-world return is net of fees and tax, enter that lower figure.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Stopping Contributions When Markets Fall</strong><span className="text-neutral-600 font-light leading-relaxed">The chart's smooth curve hides the fact that the best compounding years are bought during the ugly ones, when contributions purchase more units cheaply. Pausing contributions in a downturn feels safe and systematically buys less of everything. Automate the contribution and judge the plan in years, not in headlines.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Chasing Frequency Instead of Time</strong><span className="text-neutral-600 font-light leading-relaxed">Switching from monthly to daily compounding at 5 percent adds a few dollars per ten thousand over a decade. Starting five years earlier adds thousands. People fiddle with the frequency dial because it is easy; the time and contribution dials are the ones that change lives.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Compounding Is the Engine Behind Every Other Calculator Here</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Once you understand compounding, every other tool on this site is a variation of it. Your debt compounds against you at card rates; your retirement accounts compound for you at market rates; inflation compounds against your idle cash at the rate of price rises. The entire game of personal finance is getting yourself onto the right side of as many of those exponential curves as possible, as early as possible, and then — the genuinely hard part — leaving them alone long enough for the steep part of the curve to arrive.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Before you act on a projection, sanity-check its assumptions. A constant 8 percent for twenty-five years is an average, not a path: real portfolios zigzag, and the order of returns matters near retirement. Use this calculator to compare decisions — start now versus later, contribute X versus Y, retire five years earlier or later — where its relative answers are robust, rather than treating its final number as a promise about a specific future balance on a specific date.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> All figures are projections based on the constant return you enter, not financial advice or a guarantee. Real investment returns vary year to year and inflation reduces purchasing power; savings-account interest is taxed, and investment values can fall as well as rise.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
