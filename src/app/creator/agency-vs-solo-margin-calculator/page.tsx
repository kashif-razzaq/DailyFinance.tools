import Script from "next/script"
import { CalculatorClient } from "./CalculatorClient"
import type { Metadata } from 'next';
import { generateCalculatorMetadata } from '@/config/metadata';
import { ToolLayout, FAQ } from "@/components/layout/ToolLayout"
import React from "react"
import { AlertTriangle, Calculator, TrendingUp } from "lucide-react"

export const metadata: Metadata = generateCalculatorMetadata({
  title: "Agency vs Solo Calculator: Editor & Team Costs vs Solo Margin for Creators",
  description: "Compare running your creator business solo versus with an editor and team. See profit, margin and, crucially, profit per hour of your own time, plus what happens if freed hours grow your output.",
  keywords: ["agency vs solo calculator", "hire an editor calculator", "creator editor cost", "should I hire a video editor", "creator team margin", "freelance vs agency margin"],
  slug: "creator/agency-vs-solo-margin-calculator",
  category: "Creator Economy",
});

const faqs: FAQ[] = [
{"question": "How much should a creator pay a video editor?", "answer": "Market rates range from roughly $30 to $75 per finished video for basic freelance edits at the low end, to monthly retainers of $1,500 to $4,000 or more for experienced editors handling a full channel workflow. The right figure is set by your maths: team costs, including the editor, should generally stay under 25 to 35 percent of trailing average revenue."},
{"question": "Why does hiring lower my margin but still make sense?", "answer": "Because margin percentage ignores your time. Solo work at 120 hours a month for $11,600 profit pays about $97 per hour of your life. A team scenario keeping $7,800 across 45 of your hours pays about $173 per hour, with capacity to grow output further. Profit per hour of the founder is the meaningful comparison."},
{"question": "When is a creator not ready to hire an editor?", "answer": "When revenue is unstable, when team costs would exceed roughly a third of average monthly revenue, or when there is no plan for the freed hours. In that position, per-video freelance editing on flagship content gives most of the time benefit with almost no fixed risk."},
{"question": "How many hours does an editor actually save?", "answer": "Editing and revisions often consume 40 to 60 percent of a solo creator's production time, but managing an editor, reviewing cuts and giving feedback returns 20 to 40 percent of that saving as management work. Model your post-hire hours honestly, including management, or the comparison flatters the team case."},
{"question": "Should I hire an editor or a full agency?", "answer": "An editor solves production time. An agency additionally sells strategy, sponsorship sourcing and management, at a much higher fixed or revenue-share cost. Most creators should sequence: editor first, proven over two to three months, then specialist help, and consider agency structures only when deal flow and output genuinely exceed what a small team can run."}
]

export default function Page() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Compare Solo vs Team Creator Economics",
    "description": "Compare running your creator business solo versus with an editor and team. See profit, margin and, crucially, profit per hour of your own time, plus what happens if freed hours grow your output.",
    "step": [
{"@type": "HowToStep", "name": "Enter monthly revenue and the full team cost", "text": "Use trailing average revenue, not your best month. Editor cost means the real retainer or per-video total, plus thumbnail, VA, management and tool costs the team structure adds."},
{"@type": "HowToStep", "name": "Enter both overhead figures", "text": "Solo overhead is your current software and services. Agency-mode overhead adds project storage, review tools, extra seats and the subscriptions a team workflow quietly accumulates."},
{"@type": "HowToStep", "name": "Count your hours brutally, both ways", "text": "Solo hours are all hours the business takes from you. Team hours are what remains, including reviewing edits and managing people. Undercounting either side poisons the verdict."},
{"@type": "HowToStep", "name": "Set a conservative capacity gain and read the verdict", "text": "Estimate extra output from freed time at the low end of plausible. If profit per your hour rises and the growth case is comfortably positive, the maths supports a structured trial."}
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
        "@id": "https://dailyfinance.tools/creator/agency-vs-solo-margin-calculator",
        "url": "https://dailyfinance.tools/creator/agency-vs-solo-margin-calculator",
        "name": "Agency vs Solo Calculator: Editor & Team Costs vs Solo Margin for Creators",
        "description": "Compare running your creator business solo versus with an editor and team. See profit, margin and, crucially, profit per hour of your own time, plus what happens if freed hours grow your output."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dailyfinance.tools/" },
          { "@type": "ListItem", "position": 2, "name": "Creator Economy", "item": "https://dailyfinance.tools/creator" },
          { "@type": "ListItem", "position": 3, "name": "Agency vs Solo Creator Calculator", "item": "https://dailyfinance.tools/creator/agency-vs-solo-margin-calculator" }
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
        title="Agency vs Solo Creator Calculator"
        description="Compare running your creator business solo versus with an editor and team. See profit, margin and, crucially, profit per hour of your own time, plus what happens if freed hours grow your output."
        slug="agency-vs-solo-margin-calculator"
        faqs={faqs}
        calculator={(isPro) => <CalculatorClient isPro={isPro} />}
      >
      {(isPro) => (
        <>
          <section className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#064E3B]"></div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#D97706]" />
              Quick Answer: Should a Creator Hire an Editor?
            </h2>
            <p className="text-neutral-600 leading-relaxed text-lg">Hiring almost always lowers your margin percentage but can raise profit per hour of your own time and total output capacity. Compare solo profit divided by your solo hours against team profit divided by your reduced hours. If the team figure is higher, and freed hours become more content, hiring pays.</p>
          </section>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Margin Percentage Is the Wrong Scoreboard for Hiring</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Every creator who considers hiring an editor runs the same frightening calculation: my margin drops from 95 percent to 60 percent, therefore hiring is bad. The arithmetic is right and the conclusion is wrong, because margin percentage was never the resource being managed. Your hours are. A solo creator is a factory with one machine, and that machine also does strategy, filming, editing, thumbnails, admin and rest. The correct comparison is profit per hour of your time, solo versus with a team, and then the second-order question almost nobody models: what does the freed time produce?</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">This calculator runs both views. The same-output view holds revenue constant and asks what the team costs you today: lower profit, far fewer of your hours, and a profit-per-hour figure that often surprises creators by rising even as margin falls. The growth view then applies your estimate of extra output from freed time, more videos, a sponsorship push, a second format, and shows the team profit at that larger revenue. Hiring decisions made only on the first view are how talented creators stay trapped editing at an effective rate far below what their ideas earn.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">None of this argues for hiring carelessly. An editor is a fixed monthly cost arriving in good months and bad, against revenue that is neither fixed nor guaranteed. The honest sequence is: prove the content earns without a team, trial with a freelance editor per video rather than a salary, watch your hours actually fall, and only convert to a retainer or hire when the per-hour maths and two or three months of evidence agree. This calculator gives you the maths half of that evidence. Your analytics and your calendar give you the rest.</p>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Profit Per Your Hour Is the Metric</h3>
              <p className="text-sm text-neutral-500 font-light">Solo profit divided by solo hours is your true current wage. Team profit divided by your reduced hours is the offer on the table. Compare wages, not margins, and the hiring decision becomes legible.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Freed Time Must Be Spent, Not Saved</h3>
              <p className="text-sm text-neutral-500 font-light">Hours freed by an editor create value only when they are reinvested in output, deals or strategy. If they become leisure, that is a legitimate purchase too, but price it as one instead of calling it growth.</p>
            </div>
            <div className="bg-[#FAFAFA] p-6 rounded-2xl border border-neutral-100 flex flex-col items-start">
              <h3 className="font-bold text-[#1F2937] mb-2 text-lg">Fixed Costs Demand a Revenue Floor</h3>
              <p className="text-sm text-neutral-500 font-light">Team costs arrive monthly regardless of views. A sensible rule is that editor and team costs stay under 25 to 35 percent of your trailing average revenue, so a bad quarter hurts without threatening the business.</p>
            </div>
          </section>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Solo vs Team Comparison Formula</h2>
          <div className="bg-[#064E3B] text-white p-8 md:p-12 rounded-3xl shadow-2xl mb-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-8 text-white/90 relative z-10">The Creator Hiring Equation</h3>
            <div className="font-mono text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/10 break-words leading-loose relative z-10 shadow-inner">Solo Profit = Revenue - Solo Overhead  ·  Team Profit = Revenue - Editor - Team Costs - Agency Overhead  ·  Compare Profit / Your Hours</div>
          </div>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Both profit lines are simple; the discipline is in the denominators. Solo hours must count everything: scripting, filming, editing, thumbnails, uploading, sponsorship management and admin. Creators routinely count only filming and conclude they work 40 hours a month while actually working 110. Agency-mode hours count what remains yours after delegation, including the review and management time a team genuinely requires, because managing an editor is real work, usually 20 to 40 percent of the time the editing itself took.</p>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">The growth scenario deserves equal honesty. Freed hours do not automatically become revenue; they become capacity, which becomes revenue only through a plan: two extra videos a month, a dedicated sponsorship day, a Shorts funnel. Estimate that conversion conservatively, the calculator's capacity-gain slider exists to test 20 to 50 percent growth, not 300 percent fantasies. If the team wins on the same-output per-hour comparison, growth is pure upside. If it only wins with heroic growth assumptions, the correct decision is a per-video trial, not a hire.</p>

          {!isPro && (
            <aside className="my-16 w-full max-w-3xl mx-auto h-[250px] bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] mb-2">Advertisement</span>
              <span className="text-sm font-medium text-neutral-400">In-Article AdSense Banner</span>
            </aside>
          )}

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">How to Use This Calculator, Step by Step</h2>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 1: Enter monthly revenue and the full team cost</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Use trailing average revenue, not your best month. Editor cost means the real retainer or per-video total, plus thumbnail, VA, management and tool costs the team structure adds.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 2: Enter both overhead figures</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Solo overhead is your current software and services. Agency-mode overhead adds project storage, review tools, extra seats and the subscriptions a team workflow quietly accumulates.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 3: Count your hours brutally, both ways</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Solo hours are all hours the business takes from you. Team hours are what remains, including reviewing edits and managing people. Undercounting either side poisons the verdict.</p>
          <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">Step 4: Set a conservative capacity gain and read the verdict</h3>
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed font-light">Estimate extra output from freed time at the low end of plausible. If profit per your hour rises and the growth case is comfortably positive, the maths supports a structured trial.</p>
          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Worked Examples With Real Numbers</h2>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 1: A $12,000-a-Month Creator Editing Everything</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A creator earns $12,000 a month with $400 of solo overhead, keeping $11,600, a 96.7 percent margin that looks untouchable. But the business consumes 120 of their hours monthly, so the solo wage is about $97 per hour. Add an editor at $2,500, other team help at $800 and agency overhead of $900, and team profit falls to $7,800, a 65 percent margin. Yet the creator's hours fall to 45, making the team wage about $173 per hour of their time. Margin said do not hire. The wage, the metric that buys back a life and funds strategy, says the opposite. If freed time lifts output even 40 percent, revenue reaches $16,800 and team profit about $12,600, beating solo profit in absolute dollars too.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm">
            <h3 className="text-xl font-bold text-[#1F2937] mb-4">Example 2: A $4,000-a-Month Creator Where Solo Still Wins</h3>
            <p className="text-neutral-600 font-light leading-relaxed">A smaller creator earns $4,000 a month with $250 solo overhead, keeping $3,750 across 90 hours, about $42 per hour. A part-time editor at $1,200 plus $300 of team cost and $150 extra overhead drops team profit to $2,350 across perhaps 50 of their hours, about $47 per hour: a modest per-hour gain bought with $1,650 of new fixed monthly risk against unstable revenue. With a realistic 20 percent capacity gain, revenue reaches $4,800 and team profit about $3,150, still below solo profit in dollars. The verdict here is patience: trial an editor per video on the biggest projects, keep the fixed cost near zero, and revisit the retainer when revenue is steadier. The calculator's job is to make that a decision, not a guilt trip.</p>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">Hiring Mistakes Creators Make With Confident Bad Maths</h2>
          <ul className="space-y-6 mb-12">
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Comparing margin percentages instead of profit per hour</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Margin always falls when you hire; that tells you nothing. Your scarce resource is your hours and attention. A lower margin on far fewer hours, at a higher personal wage and higher capacity, is usually the better business.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Counting only filming as solo work</strong>
                <span className="text-neutral-600 font-light leading-relaxed">If editing, thumbnails, admin and deal management are excluded, solo hours are fiction and the solo wage looks impossibly good. Count the whole job or the comparison is rigged against ever hiring.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Assuming freed hours automatically become revenue</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Capacity is not output. Without a concrete plan for the freed time, extra videos scheduled, sponsorship outreach blocked in, the growth scenario is a story you tell a fixed cost.</span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-6 bg-white border border-neutral-200 shadow-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8 text-[#D97706] shrink-0 mt-1" />
              <div>
                <strong className="text-[#1F2937] block text-xl mb-2">Hiring a fixed retainer on a best month's revenue</strong>
                <span className="text-neutral-600 font-light leading-relaxed">Team costs are fixed; creator revenue is not. Size fixed costs against trailing average revenue and keep them under roughly a third of it, so a weak quarter is a squeeze, not a crisis.</span>
              </div>
            </li>
          </ul>

          <h2 className="text-3xl font-extrabold tracking-tight mb-8 text-[#1F2937] scroll-mt-24">The Bottom Line</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed font-light">Hire when the wage maths and the evidence agree: profit per your hour rises with a team, freed hours have a named job, and fixed costs sit safely under your average revenue. Until then, buy editing per video, protect your margin, and let this calculator, re-run quarterly with fresh numbers, tell you when the answer changes. The goal was never the highest margin. It is the highest-value use of the only asset you cannot hire more of: you.</p>
          <p className="text-lg text-neutral-600 mb-16 leading-relaxed font-light flex items-start gap-3"><TrendingUp className="h-6 w-6 text-[#064E3B] shrink-0 mt-1" />Before committing to team costs, sanity-check the revenue they depend on. Model your AdSense with the YouTube calculator, your memberships with the Patreon calculator and your deals with the sponsorship calculator, all net of fees, so the hiring decision rests on money that actually arrives.</p>
        </>
      )}
      </ToolLayout>
    </>
  )
}
