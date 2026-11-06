import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Roth IRA Conversion Calculator: Tax Now vs Tax-Free Growth',
  description: 'Model a Roth conversion: the tax due today, how the converted money grows tax-free, and whether converting beats keeping a Traditional IRA. Free calculator.',
  keywords: ['roth ira conversion calculator', 'roth conversion tax calculator', 'should i convert to roth', 'backdoor roth calculator'],
  slug: "personal-wealth/roth-ira-conversion-simulator",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "The amount you convert is added to your ordinary taxable income in the year of the conversion and taxed at your marginal federal rate, plus state tax where it applies. If part of your Traditional IRA contains after-tax contributions, the taxable portion is worked out pro-rata across all your IRAs.",
    "question": "How is a Roth conversion taxed?"
  },
  {
    "answer": "Usually in years when your income is temporarily low \u2014 classically the years between retiring and starting pensions, Social Security and required minimum distributions. Converting then lets you fill low tax brackets deliberately, rather than being pushed into higher ones later by forced withdrawals.",
    "question": "When is the best time to do a Roth conversion?"
  },
  {
    "answer": "From savings, if you can. Paying from outside cash keeps the full converted amount compounding tax-free inside the Roth. Paying from the IRA reduces the amount converted, and if you are under fifty-nine and a half, the amount withheld for tax can be treated as an early distribution subject to a penalty.",
    "question": "Should I pay the conversion tax from the IRA or from savings?"
  },
  {
    "answer": "A common approach is to convert enough to fill your current tax bracket up to its ceiling, and no more, repeating annually while your income is low. This captures cheap rates without the top slice of the conversion spilling into a higher bracket.",
    "question": "How much should I convert each year?"
  },
  {
    "answer": "No. Since 2018, conversions are irrevocable \u2014 there is no recharacterisation of a conversion back to Traditional. That permanence is why conversions should be sized carefully and usually executed late in the year, when your income for the year is mostly known.",
    "question": "Can a Roth conversion be undone?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'Roth IRA Conversion Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/roth-ira-conversion-simulator", "url": "https://dailyfinance.tools/personal-wealth/roth-ira-conversion-simulator", "name": 'Roth IRA Conversion Calculator: Tax Now vs Tax-Free Growth', "description": 'Model a Roth conversion: the tax due today, how the converted money grows tax-free, and whether converting beats keeping a Traditional IRA. Free calculator.' }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'Roth IRA Conversion Calculator', "item": "https://dailyfinance.tools/personal-wealth/roth-ira-conversion-simulator" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='Roth IRA Conversion Calculator' description='Model a Roth conversion: the tax due today, how the converted money grows tax-free, and whether converting beats keeping a Traditional IRA. Free calculator.' slug="roth-ira-conversion-simulator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: When a Roth Conversion Pays</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">A Roth conversion moves money from a Traditional IRA to a Roth, taxed as income today. It pays when the tax rate now is lower than the rate you would pay on withdrawals later, and when the tax is paid from outside cash, preserving every converted dollar for tax-free growth.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Pay Tax Once, On Purpose: The Logic of a Roth Conversion</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">A Roth conversion looks, at first glance, like volunteering for a tax bill. You move money out of a Traditional IRA — where it has never been taxed — into a Roth IRA, and the whole converted amount lands on this year's taxable income. Why would anyone choose that? Because every dollar inside the Roth, and every dollar it ever earns, can come back out tax-free in retirement, with no required minimum distributions forcing taxable income on you later. You are not avoiding tax; you are choosing when to pay it, and at what rate.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">That choice is valuable precisely because tax rates are not constant across a life. The classic conversion window opens in the years between retiring and the start of pensions, Social Security and required distributions — years when your income, and therefore your marginal rate, may be far lower than it was while working or than it will be once forced withdrawals begin. Converting in those low-rate years, filling up cheap tax brackets deliberately, is one of the few genuinely legal pieces of tax timing available to ordinary savers.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">This calculator models the core trade honestly. It taxes the converted amount at the rate you pay today, grows it tax-free, and compares it with leaving the same money in the Traditional account, growing identically but taxed at your future rate on the way out. It also shows the whole-balance picture, because a conversion is a portfolio decision, not an isolated one. The guide below explains the traps — bracket creep, paying the tax from the IRA itself, and state and healthcare-premium side effects — that the headline comparison cannot see.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Rate Arbitrage Is the Whole Game</h3>
              <p className="text-sm text-neutral-500 font-light">Convert when today's marginal rate is below the rate you expect on future withdrawals, and the conversion usually wins. Convert at a higher rate than your future one and you have simply prepaid tax at a premium.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Outside Cash Makes It Powerful</h3>
              <p className="text-sm text-neutral-500 font-light">Paying the conversion tax from a normal bank account — not from the IRA — means the full converted amount compounds tax-free. Paying from the IRA shrinks the conversion and, before age fifty-nine and a half, can trigger penalties on the withheld part.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Bracket Filling Beats All-or-Nothing</h3>
              <p className="text-sm text-neutral-500 font-light">Few people should convert an entire IRA in one year. Converting just enough each year to fill your current tax bracket, repeated across several low-income years, captures cheap rates without tipping into expensive ones.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The comparison is two futures for the same dollars. In the Roth future, the converted amount grows untouched and is worth its full compounded value, minus the opportunity cost of the tax you paid today (that cash could itself have been invested). In the Traditional future, the same amount grows by the same factor and is then taxed at your retirement rate as it comes out. Whichever future leaves more after-tax money wins — and the rates you enter decide it.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Conversion Comparison</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Roth outcome = Converted x (1 + r)^n  ·  Traditional outcome = Converted x (1 + r)^n x (1 - future tax rate)  ·  Tax due now = Converted x today's tax rate</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Price the Tax Bill Today</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Multiply the amount you plan to convert by your current marginal tax rate — federal, and state if it applies. Converting fifty thousand dollars in the 22 percent bracket means roughly eleven thousand dollars of tax. Remember the conversion itself is income: a large conversion can push the top slice of it into a higher bracket, so the effective rate on a big conversion is often higher than the bracket you started in.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Grow Both Futures Identically</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Apply the same return and the same number of years to the converted amount in both scenarios. This is deliberate: a conversion is a tax decision, not an investment decision, so the investments should be held constant. The Roth side keeps the whole result; the Traditional side surrenders your future tax rate on the entire grown amount, contributions and decades of growth alike.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Account for the Tax Money Itself</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">If you pay the tax from outside cash, that cash is gone — and so is everything it would have earned. A fair comparison charges the Roth scenario for that lost growth, which this calculator does in its net-benefit view. Conversions still usually win when the future rate exceeds today's, but by less than the naive headline suggests, and the longer the horizon, the more both the benefit and the tax's opportunity cost compound.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: Converting $50,000 in a Low-Income Year</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">A newly retired sixty-two-year-old, living on cash savings before pensions begin, converts fifty thousand dollars at a 22 percent marginal rate: eleven thousand dollars of tax, paid from her bank account. At 7 percent for twenty years, the converted money becomes about $193,500, entirely tax-free. Left in the Traditional IRA, the same money grows identically but is taxed at an expected 24 percent on withdrawal, leaving about $147,000. The conversion is ahead by a wide margin even after charging for the growth the eleven thousand tax dollars would have earned.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Converting at the Wrong Rate</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">A high earner converts the same fifty thousand dollars at a 35 percent marginal rate while still working, expecting to withdraw at 22 percent in retirement. He pays $17,500 of tax today. His converted money still becomes about $193,500 tax-free, while the Traditional route would have left about $151,000 after tax at 22 percent — but he has also surrendered $17,500 of outside cash plus everything it would have earned, which is exactly the opportunity cost this calculator charges against the conversion. Once that cost is counted, his conversion roughly breaks even at best, and often loses. Same tool, same amount — opposite answer, decided entirely by the two rates.</p>
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
              <div><strong className="text-[#1F2937] block text-lg mb-1">Converting a Lump Sum Without Watching the Brackets</strong><span className="text-neutral-600 font-light leading-relaxed">A conversion is taxed as ordinary income stacked on top of everything else you earn. Convert too much in one year and the top portion lands in a bracket higher than the one you were trying to escape. Model the conversion in slices and fill your target bracket precisely — this is the single most common and most expensive conversion error.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Paying the Tax From the IRA Itself</strong><span className="text-neutral-600 font-light leading-relaxed">Withholding the tax from the converted amount means less money enters the Roth, and if you are under fifty-nine and a half, the withheld portion can count as an early distribution with a penalty. Paying from a taxable bank account preserves the conversion in full and is the assumption behind most favourable conversion maths, including this calculator's.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Forgetting State Tax, Medicare Premiums and Other Tripwires</strong><span className="text-neutral-600 font-light leading-relaxed">A large conversion can raise Medicare premium surcharges two years later, affect healthcare subsidy eligibility, increase state tax, and push capital gains into higher rates. None of these appear in a simple federal comparison. Anyone near those thresholds should model the conversion's full ripple, ideally with a tax professional, before December — conversions cannot be undone after the year ends.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Converting Everything and Leaving No Taxable Flexibility</strong><span className="text-neutral-600 font-light leading-relaxed">An all-Roth retirement removes your ability to fill low brackets with Traditional withdrawals later. Many planners aim for a mix: enough Traditional money to use the standard deduction and cheap brackets every retirement year, and Roth money for everything above. Converting one hundred percent can overshoot the optimum just as surely as converting nothing.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Ignoring the Five-Year Rules</strong><span className="text-neutral-600 font-light leading-relaxed">Converted amounts carry their own five-year clock for penalty-free access before age fifty-nine and a half, separate from the Roth IRA's overall five-year rule for earnings. Converting money you will need to spend next year can strand it behind penalties. Conversions are a long-horizon tool; keep near-term spending money out of them.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Building a Multi-Year Conversion Plan</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">For most households the winning move is not a single dramatic conversion but a boring annual routine: each autumn, estimate the year's income, calculate how much room remains in your target tax bracket, and convert exactly that amount. Repeated across the low-income years between retirement and required distributions, this ladder can move a large share of a Traditional IRA into Roth at the cheapest rates you will ever be offered, while keeping every individual year's tax bill modest and predictable.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Coordinate the ladder with the rest of your plan. Conversions raise taxable income, so they interact with capital gains harvesting, pension start dates and the taxation of Social Security. They also shrink future required minimum distributions, which is often the deeper goal: smaller forced withdrawals mean more control over your tax bracket for the rest of your life. Re-run this calculator each year with fresh rates and balances — a conversion plan is a living schedule, not a one-time decision, and the right amount in a low-income year can be entirely wrong in a high-income one.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> All figures are estimates based on the tax rates and returns you enter, not financial or tax advice. Tax law, brackets and conversion rules change and vary by state and personal circumstances; conversions are irreversible after the tax year ends, so confirm any large conversion with a qualified tax professional first.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
