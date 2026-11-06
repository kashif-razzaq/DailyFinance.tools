import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { CheckCircle2, AlertTriangle, Calculator } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: 'Fat FIRE vs Lean FIRE Calculator: FIRE Numbers & Time to Retire',
  description: 'Compare Lean FIRE and Fat FIRE side by side: the FIRE number for each lifestyle (twenty-five times spending) and how long saving takes to reach each one. Free tool.',
  keywords: ['fat fire vs lean fire calculator', 'lean fire number', 'fat fire number', 'fire calculator', 'how much to retire early'],
  slug: "personal-wealth/fat-fire-vs-lean-fire-calculator",
  category: "Personal Wealth",
});

const faqs: FAQ[] = [
  {
    "answer": "Lean FIRE means financial independence on a deliberately modest budget \u2014 annual spending well below average, often funded by low-cost living. Fat FIRE means independence while maintaining a generous, upper-middle-class lifestyle. The calculation is identical; only the spending you multiply by twenty-five changes.",
    "question": "What is the difference between Lean FIRE and Fat FIRE?"
  },
  {
    "answer": "Annual spending times twenty-five. That is the inverse of the 4 percent guideline: a portfolio of twenty-five times your yearly spending has historically supported withdrawals of about 4 percent a year over long retirements. Three thousand a month of spending gives a nine-hundred-thousand-dollar FIRE number.",
    "question": "How is a FIRE number calculated?"
  },
  {
    "answer": "As this calculator shows, typically well over a decade. Because the fat target is often three times the lean one, and compounding has less time to help a saver who starts later, the extra lifestyle must be saved for almost dollar by dollar. The exact gap for your saving rate is the number this tool exists to show you.",
    "question": "How much longer does Fat FIRE take than Lean FIRE?"
  },
  {
    "answer": "Yes \u2014 the spectrum between them is where most real plans live. Some people target a mainstream spending level outright; others plan part-time or seasonal work to cover part of spending (Barista FIRE), or stop contributing once compounding can finish the job (Coast FIRE). Both have calculators on this site.",
    "question": "Can I aim for something between Lean and Fat FIRE?"
  },
  {
    "answer": "The 4 percent guideline comes from studies of historical US returns over thirty-year retirements; longer retirements carry more risk, and many early retirees plan on 3.25 to 3.5 percent instead, which raises the multiplier from twenty-five to around thirty. Treat the number as a planning anchor, review it yearly, and keep flexibility in the early retirement years.",
    "question": "Is the 4 percent rule safe for a very early retirement?"
  }
]

export default function Page() {
  const softwareApplicationSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": 'Fat FIRE vs Lean FIRE Calculator', "applicationCategory": "FinanceApplication", "operatingSystem": "Any", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.question, "acceptedAnswer": { "@type": "Answer", "text": faq.answer } })) };
  const webPageSchema = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": "https://dailyfinance.tools/personal-wealth/fat-fire-vs-lean-fire-calculator", "url": "https://dailyfinance.tools/personal-wealth/fat-fire-vs-lean-fire-calculator", "name": 'Fat FIRE vs Lean FIRE Calculator: FIRE Numbers & Time to Retire', "description": 'Compare Lean FIRE and Fat FIRE side by side: the FIRE number for each lifestyle (twenty-five times spending) and how long saving takes to reach each one. Free tool.' }, { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" }, { "@type": "ListItem", "position": 2, "name": "Personal Wealth", "item": "https://dailyfinance.tools/personal-wealth" }, { "@type": "ListItem", "position": 3, "name": 'Fat FIRE vs Lean FIRE Calculator', "item": "https://dailyfinance.tools/personal-wealth/fat-fire-vs-lean-fire-calculator" }] }] };
  return (
    <>
      <Script id="schema-software-application" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ToolLayout title='Fat FIRE vs Lean FIRE Calculator' description='Compare Lean FIRE and Fat FIRE side by side: the FIRE number for each lifestyle (twenty-five times spending) and how long saving takes to reach each one. Free tool.' slug="fat-fire-vs-lean-fire-calculator" faqs={faqs} calculator={(isPro) => <CalculatorClient isPro={isPro} />}>
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-[#D97706]" />Quick Answer: Two Lifestyles, One Formula</h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Lean FIRE and Fat FIRE use the same formula — annual spending times twenty-five — with opposite lifestyles. Lean funds a modest life and arrives years sooner; Fat funds a generous one and takes far longer. This calculator prices both from your spending, savings and return, side by side.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Fat FIRE vs Lean FIRE: Same Formula, Very Different Lives</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Ask the FIRE movement what financial independence costs and it gives you two wildly different answers, because the honest answer is: it costs twenty-five times whatever you insist on spending. Lean FIRE takes that formula to a deliberately frugal life — a small home, simple food, few luxuries — and produces a number so modest it startles people who assumed independence was a millionaires-only club. Fat FIRE applies the same formula to a life with the comforts left in — travel, restaurants, a generous home, generosity to family — and produces a number two to four times larger, purchased with many extra years of work.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Neither answer is the correct one, and this calculator refuses to pretend otherwise. It prices both lifestyles in the only currency that ultimately matters — years of your saving life — using your actual invested balance, your monthly saving and a realistic return. For most people the exercise lands somewhere clarifying in the middle: the lean number is closer than they feared, the fat number further than they hoped, and their real target, which they had never actually computed, sits between the two with a date attached to it.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Treat this page as a negotiation with yourself, conducted in numbers. Every recurring cost in your life has a price under this formula — roughly twenty-five times its annual cost, in portfolio terms — and every upgrade to your retirement lifestyle has a price in working years. Once you can see both prices clearly, you can spend and save deliberately instead of by default, which is most of what financial independence actually consists of.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Lean FIRE: Freedom, Minimalist Edition</h3>
              <p className="text-sm text-neutral-500 font-light">Lean FIRE funds a deliberately small life: low housing costs, modest tastes, spending often half the national average. Its number looks startlingly reachable because it is — the lifestyle, not the maths, is the hard part.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Fat FIRE: Freedom With the Good Stuff Kept</h3>
              <p className="text-sm text-neutral-500 font-light">Fat FIRE funds a generous life — travel, dining out, a comfortable home, help for family. Its number is two to four times the lean one, and so is the saving time. Neither is virtuous; they are different purchases.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">The Middle Is a Real Place</h3>
              <p className="text-sm text-neutral-500 font-light">Most savers land between the poles: a mainstream spending level, funded partly by part-time or flexible work. Barista FIRE and Coast FIRE exist because the spectrum matters more than the endpoints.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">The Formula, Explained</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Both lifestyles use identical machinery, which is the point of comparing them: the only input that changes is the spending you choose to fund. Multiply a monthly lifestyle by twelve to get annual spending, then by twenty-five — the inverse of the four percent withdrawal guideline — to get the portfolio that historically sustains it. The time to reach either number is then a compounding problem, solved month by month in the calculator from your current savings, contributions and assumed return.</p>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">One Formula, Two Lifestyles</h3>
            <div className="font-mono text-base md:text-xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">FIRE Number = Annual Spending x 25  ·  Lean example: $36,000/yr x 25 = $900,000  ·  Fat example: $120,000/yr x 25 = $3,000,000  ·  Years to target found by compounding savings until the balance reaches the number</div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Price the Lean Life Honestly</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Write down a monthly budget you could genuinely live on for decades: modest housing, home cooking, one car or none, free and cheap pleasures, but with healthcare and a margin for reality included. Multiply by twelve, then by twenty-five. For many households the result — often between seven hundred thousand and a million dollars — is the first genuinely encouraging number in their financial lives.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Price the Fat Life Just as Honestly</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Now build the month with everything kept: the comfortable home, regular travel, restaurants, hobbies with real costs, generosity. Multiply the same way. Three million dollars is a typical result for a ten-thousand-dollar month. Do not flinch from it — the purpose is to know the price of the life, in years, before deciding whether to pay it.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Convert Numbers Into Years, Then Negotiate</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">A target is abstract; a date is a decision. The calculator compounds your current savings and monthly contributions until each number is reached, turning the lifestyle gap into a time gap — frequently a decade or more. That is the real comparison: not lean versus fat as philosophies, but specific years of your working life exchanged for specific comforts in retirement. Negotiate line by line, with both prices on the table.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Worked Examples</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: $3,000 a Month vs $10,000 a Month</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">Take the two defaults. A lean life at three thousand dollars a month — thirty-six thousand a year — needs a FIRE number of nine hundred thousand dollars. A fat life at ten thousand a month — one hundred and twenty thousand a year — needs three million. Same saver, same $80,000 already invested, same $1,500 a month of contributions, same 7 percent return: the lean target arrives in roughly two decades, the fat target well past three. The $2.1 million difference between the lifestyles costs over a decade of additional saving — which is sometimes absolutely worth it, and should always be a conscious purchase.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: Finding a Personal Middle Number</h3>
            <p className="text-neutral-600 font-light leading-relaxed m-0">A couple realises their actual happy spending — neither lean nor fat — is $5,500 a month: the good house kept, restaurants moderated, two real holidays a year. That is sixty-six thousand a year and a FIRE number of $1.65 million. Framing it this way changed their plan more than any investment decision: they stopped chasing a generic target and started negotiating line items with each other, each with a known price in years. Dropping a recurring $500 monthly cost they barely valued moved their date forward by years — spending analysis, not market timing, did the heavy lifting.</p>
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
              <div><strong className="text-[#1F2937] block text-lg mb-1">Building a Lean Budget You Would Hate</strong><span className="text-neutral-600 font-light leading-relaxed">A FIRE number is a life sentence in the best and worst senses: you are committing to live near that spending level for decades. An ultra-lean budget assembled in a burst of enthusiasm — no travel, no eating out, no slack for family or health — tends to break within a few years, and a broken plan at fifty-five is worse than an honest, slightly larger number at the start.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Building a Fat Budget From Peak Spending</strong><span className="text-neutral-600 font-light leading-relaxed">The opposite error prices retirement at your most expensive working-life year — including costs that vanish in retirement: commuting, work clothes, convenience food, the mortgage that will be paid off. Cost your retirement year directly, category by category, rather than photocopying your current one, or you will work extra years to fund expenses you will never have.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Ignoring Healthcare and Tax in Both Versions</strong><span className="text-neutral-600 font-light leading-relaxed">US early retirees must fund healthcare for the gap years before Medicare, and withdrawals from pre-tax accounts are taxed as income — neither appears in a naive spending-times-twenty-five figure. Fat and lean budgets alike need an explicit line for both, sized for your situation, or both dates in the calculator are optimistic.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Treating 25-Times as a Guarantee</strong><span className="text-neutral-600 font-light leading-relaxed">Twenty-five times spending encodes the 4 percent guideline from historical US data, mostly tested over thirty-year retirements. A fifty-year retirement, poor early returns, or high fees can break it. Many early retirees use a lower withdrawal rate — a multiplier nearer thirty — or keep part-time income as a shock absorber. Use the number as an anchor, not a promise.</span></div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-6 w-6 text-[#D97706] shrink-0 mt-1" />
              <div><strong className="text-[#1F2937] block text-lg mb-1">Comparing Your Number to Strangers on the Internet</strong><span className="text-neutral-600 font-light leading-relaxed">FIRE numbers shared online rarely state their assumptions: paid-off houses, pensions, national healthcare, working spouses. A lean number that is safe in one household can be reckless in another. The only comparison this calculator endorses is between your own two lifestyles, on your own spending, with your own saving rate.</span></div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937]">Most People Should Save to Lean First, Then Decide</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Whichever end of the spectrum attracts you, stress-test it against reality before reorganising your life around it. A lean budget that assumes no car, no gifts, no family support and perfect health is a budget for a different person; a fat budget built on peak-career spending can overstate what retirement actually costs once mortgages end and work expenses vanish. Track your real spending for a year and build both numbers from evidence, not aspiration or internet folklore — the FIRE number is only as honest as the spending figure inside it.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Remember too that the two plans are not rivals. Many people sequence them: save first to lean FIRE as a safety milestone — after which work is survivable at almost any income — then continue toward their fuller number with the pressure removed. Each milestone passed buys a real option: to refuse bad work, to negotiate, to take a risk. That optionality, arriving years before full financial independence, is arguably worth more than the final number itself, whichever version of the number you choose.</p>
          <div className="bg-[#FAFAFA] border-l-4 border-[#064E3B] p-6 mb-4 rounded-r-xl">
            <p className="text-base text-[#1F2937] font-medium m-0 leading-relaxed"><strong>Important note:</strong> FIRE numbers here use the twenty-five-times-spending guideline, a planning heuristic drawn from historical US market data, not a guarantee and not financial advice. Safe withdrawal, taxes, healthcare costs and pensions all affect a real plan; revisit your figures regularly and consider regulated advice before leaving employment.</p>
          </div>
        </>
      )}
      </ToolLayout>
    </>
  )
}
