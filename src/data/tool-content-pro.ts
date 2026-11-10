import type { ToolContentEntry } from "./tool-content";

/**
 * Content for the five Pro tools (keys are "pro/<slug>", matching the
 * navigation category). Every worked example uses the tool's own default
 * inputs, and every number was produced by the tool's own code or an
 * independent recomputation — the Monte Carlo figures come from running
 * the simulator's exact seeded algorithm.
 */
export const TOOL_CONTENT_PRO: Record<string, ToolContentEntry> = {
  "pro/monte-carlo-retirement-simulator": {
    quickAnswer:
      "A Monte Carlo retirement simulator runs your plan through 1,000 different market futures instead of one average projection, and reports the share of futures in which the money lasts. A plan with $150,000 saved, $1,500 a month going in, 30 years to retirement and $50,000 a year of spending succeeds in about 80% of simulated futures — a workable plan, but one where roughly one future in five still runs dry.",
    howItWorks: [
      "Enter what you have, what you add each month, when you retire, what your investments return on average, how volatile they are, and what you plan to spend. The simulator then plays out 1,000 complete lifetimes: in each one, every month's return is drawn at random from a distribution with your average return and your volatility, contributions land while you work, and spending leaves once you retire.",
      "Everything is computed in today's dollars. Your expected return is deflated by inflation (a 7% nominal return at 2.5% inflation becomes a 4.39% real return), and retirement spending is held constant in real terms, so every number on the screen is in money you can picture. The random sequence is seeded, which means the same inputs always produce the same result — the figures in this guide are the figures the tool shows.",
      "Read the success rate first, then the band. The success rate is the share of futures that never hit zero. The percentile band shows the middle 80% of outcomes year by year: the top is a lucky sequence, the bottom is an unlucky one, and the median line is the typical path. A plan is only as strong as its bad paths, because you do not get to choose which future you retire into.",
    ],
    formula:
      "Each month: balance × (1 + real monthly return + volatility ÷ √12 × random shock) + contribution (before retirement) − spending ÷ 12 (after retirement), where real return = (1 + nominal return) ÷ (1 + inflation) − 1. Success rate = share of 1,000 paths whose balance never reaches zero before the plan ends.",
    example: {
      title: "Worked example: $150,000 saved, $1,500 a month, retire in 30 years",
      body: "Start with $150,000, contribute $1,500 a month for 30 years, assume a 7% average return with 12% volatility and 2.5% inflation, then spend $50,000 a year (in today's dollars) for 30 years of retirement. A smooth projection at the 4.39% real return reaches about $1,675,000 by retirement. The simulator's median outcome is lower — about $1,456,000 — because volatility itself costs growth: a portfolio that swings earns less than one that glides at the same average. The plan succeeds in 79.7% of futures; the median path ends with roughly $1,475,000 still invested, while in the worst tenth of futures the money runs out before the 30 retirement years are up. That gap between the smooth projection and the simulated one is exactly what this tool exists to show.",
    },
    faqs: [
      {
        question: "Why is the simulated median lower than a normal projection?",
        answer: "Volatility drag. A 20% loss needs a 25% gain to undo, so a swinging portfolio compounds below its average return. Over 30 years at 12% volatility, the median outcome in the example lands about 13% under the smooth projection. Any calculator that only shows the average path is showing you a future more optimistic than the typical one.",
      },
      {
        question: "What success rate should I aim for?",
        answer: "Most planners treat 85–95% as a robust plan and 70–85% as workable with flexibility — the ability to trim spending in a bad first decade of retirement is worth several points of success rate by itself. Below 70%, change the plan, not the hope: save more, spend less, or retire later, in whichever order hurts least.",
      },
      {
        question: "What volatility should I enter?",
        answer: "Roughly 15–17% for an all-stock portfolio, 10–12% for a balanced stock/bond mix, and 5–7% for a conservative one. Volatility is the input people most often set too low, and it is the one that drives the bad paths — when in doubt, test your plan one notch riskier than you think you are.",
      },
      {
        question: "Does the simulator include taxes and Social Security?",
        answer: "No — it models the investment portfolio only, in today's dollars. Treat Social Security or a pension as a reduction in the spending figure: if a pension covers $20,000 of a $50,000 spending target, enter $30,000. Taxes differ too much by account type and country for a single switch to be honest, so they are left to the tax calculators.",
      },
    ],
  },

  "pro/rental-property-analyzer": {
    quickAnswer:
      "A rental property analyzer underwrites a deal the way a lender does: every expense line against the rent, then the five ratios that decide it. A $320,000 property renting for $2,600 a month with 25% down at 6% produces $249.75 a month of cash flow, a 6.33% cap rate, a 3.47% cash-on-cash return and a DSCR of 1.17 — positive, but thinner than most lenders want to see.",
    howItWorks: [
      "Enter the price, deposit and loan terms, then the rent and every running cost: property tax, insurance, HOA, and reserves for maintenance, vacancy and management as percentages of rent. The analyzer builds the full monthly picture — mortgage payment, each expense line, and what is left — because deals rarely fail on the mortgage; they fail on the five smaller lines buyers forget.",
      "From that picture it computes the standard tests. Net operating income (NOI) is rent minus running costs, before the mortgage. The cap rate is NOI divided by price — the return if you owned it outright. Cash-on-cash divides the after-mortgage cash flow by the actual cash you put in (deposit plus closing costs). DSCR divides NOI by the annual mortgage payments; lenders usually want 1.25 or more. GRM is price divided by annual rent, a quick cross-check against local norms.",
      "Read the verdict with the ratios, not instead of them. Positive cash flow with a DSCR under 1.25 means one vacancy or one roof can flip the deal negative — the numbers in the example below are exactly that case. A deal that survives honest vacancy and maintenance assumptions is a deal; one that needs both at zero to work is a hope.",
    ],
    formula:
      "NOI = (rent − tax − insurance − HOA − maintenance − vacancy − management) × 12. Cap rate = NOI ÷ price. Cash flow = NOI ÷ 12 − mortgage payment, where payment = loan × r(1+r)^n ÷ ((1+r)^n − 1). Cash-on-cash = annual cash flow ÷ (deposit + closing costs). DSCR = NOI ÷ annual mortgage payments.",
    example: {
      title: "Worked example: $320,000 duplex, $2,600 a month rent",
      body: "Buy at $320,000 with 25% down ($80,000) plus 2% closing costs ($6,400): $86,400 of cash in, a $240,000 loan at 6% over 30 years, and a payment of $1,438.92. Rent is $2,600. Monthly costs: tax $293.33 (1.1% of price), insurance $150, maintenance $130, vacancy $130 and management $208 (5%, 5% and 8% of rent) — $911.33 of running costs, $2,350.25 all-in with the mortgage. NOI is $20,264 a year, a cap rate of 6.33%. Cash flow is $249.75 a month ($2,996.94 a year), a cash-on-cash return of 3.47%, and the DSCR is 1.17 with a GRM of 10.3. The honest reading: the deal pays, but the margin is thin — at a 7% rate or $2,400 rent it goes under water, and the analyzer shows that the moment you move a slider.",
    },
    faqs: [
      {
        question: "What cap rate is a good deal?",
        answer: "It depends on the market's risk and rates, but as a rough map: under 4% you are mostly buying appreciation, 5–7% is a balanced income deal in most US markets, and above 8% usually means a cheaper, rougher market or real work to do. Compare the cap rate with the mortgage rate — when the cap rate is below the rate you borrow at, leverage works against you, not for you.",
      },
      {
        question: "Why include vacancy and maintenance if the property is occupied and fine?",
        answer: "Because over a ten-year hold both are certainties, just unscheduled. A 5% vacancy allowance is about 18 empty days a year averaged out; 5% of rent for maintenance is the standard reserve for the boiler, roof and appliances that all fail eventually. Deals underwritten at zero for both are underwritten to fail.",
      },
      {
        question: "What DSCR do lenders require?",
        answer: "For small investor loans, 1.20–1.25 is the common floor: the property's income must cover the mortgage payments with 20–25% to spare. Below 1.0 the property does not pay its own mortgage and the lender is effectively lending to your salary instead. The example deal at 1.17 would get questions — and the questions would be fair.",
      },
      {
        question: "Does this include appreciation, tax benefits or loan paydown?",
        answer: "No — it judges year one on income alone, deliberately. Appreciation, principal paydown and tax treatment all add to real returns, but none of them pay a bill in month three. Underwrite the cash flow first; treat the rest as upside, not as the plan.",
      },
    ],
  },

  "pro/business-valuation-calculator": {
    quickAnswer:
      "Small businesses are usually valued on seller's discretionary earnings (SDE) times an industry multiple. A services business earning $210,000 of SDE at a 2.5×–3.5× multiple is worth $525,000 to $735,000 on the market method, while a discounted cash flow on the same earnings can produce $1.5 million — and understanding why those two numbers differ is most of what valuation is.",
    howItWorks: [
      "Start with SDE: the business's net profit plus the owner's salary, benefits, and personal or one-off expenses run through it — the total economic benefit of owning it. Buyers price that number, not revenue. Enter revenue anyway: the SDE margin (SDE divided by revenue) is the first sanity check, and a margin far outside the industry norm means the SDE needs explaining before any multiple is applied.",
      "The market method multiplies SDE by a range drawn from what similar businesses actually sell for — the calculator presets seven industries and lets you adjust the ends. Small, owner-dependent businesses trade at low multiples because the buyer is purchasing a job with risk attached; businesses with staff, systems and recurring revenue earn the top of the range or beyond it.",
      "The income method projects SDE forward at your growth rate, discounts each year back at a risk rate, and adds a terminal value for everything after the projection. It systematically runs higher than the market method when it treats all of SDE as cash a buyer receives — but a buyer who must replace the owner starts by subtracting a manager's salary, which is much of why market prices sit below DCF values. Treat the DCF as the ceiling for a perfect handover and the multiple range as the price discovery zone.",
    ],
    formula:
      "Market value = SDE × multiple. DCF value = Σ SDE × (1 + g)^t ÷ (1 + d)^t for t = 1..n, plus terminal value = final-year SDE × (1 + terminal g) ÷ (d − terminal g), discounted back n years. SDE margin = SDE ÷ revenue.",
    example: {
      title: "Worked example: services firm, $850,000 revenue, $210,000 SDE",
      body: "A professional-services firm turns over $850,000 and produces $210,000 of SDE — a 24.7% margin, healthy for services. At the industry range of 2.5× to 3.5×, the market value is $525,000 to $735,000, midpoint $630,000 (an implied 0.74× revenue). The DCF, projecting SDE growing at 8% for five years, discounted at 20% with 2.5% terminal growth, sums to about $1,500,000 — more than double the market midpoint. That gap is the lesson: the DCF assumes every dollar of SDE transfers to a buyer risk-free of the owner leaving, and the market knows it does not. If you are selling, the work that closes the gap — documented systems, a second-in-command, recurring contracts — is the work that raises the multiple itself.",
    },
    faqs: [
      {
        question: "What is the difference between SDE and EBITDA?",
        answer: "SDE is for owner-operated businesses: it adds back the owner's full compensation and perks, because the buyer will work in the business. EBITDA does not add back a market-rate salary for the role — it suits larger businesses (typically $1M+ of earnings) where management is replaceable staff. Using SDE multiples on an EBITDA business, or the reverse, is the most common valuation error in small deals.",
      },
      {
        question: "What moves a business to the top of its multiple range?",
        answer: "Transferability. Recurring or contracted revenue, a customer base where no client is more than about 10% of sales, documented processes, staff who stay, and books that survive diligence. Each removes a reason for the buyer to discount. Growth helps too, but buyers pay for durable earnings, not last year's spike.",
      },
      {
        question: "What discount rate should I use in the DCF?",
        answer: "For a small private business, 18–25% is the honest zone — far above public-market rates, because the investment is illiquid, concentrated and owner-dependent. If a valuation only works at a 10% discount rate, it does not work; it has been reverse-engineered. The calculator defaults to 20%, and stress-testing at 25% is a useful habit.",
      },
      {
        question: "Is the DCF or the multiple right?",
        answer: "For pricing an actual transaction, the market method is right almost by definition: businesses sell at multiples of earnings, and comparable sales are the evidence. The DCF earns its place as a check — if the market price implies cash flows you cannot defend in the DCF either, walk away; if you are the seller, the DCF tells you which improvements (growth, durability) would justify arguing for the top of the range.",
      },
    ],
  },

  "pro/irr-npv-analyzer": {
    quickAnswer:
      "NPV tells you what an investment is worth over and above its cost at your required return; IRR tells you the return itself. A $50,000 investment returning $8,000, $12,000, $15,000, $18,000 and $22,000 over five years has an NPV of $4,414 at a 10% discount rate and an IRR of 12.90% — it clears a 10% hurdle, repays in 3.83 years, and returns $1.09 of present value per $1 invested.",
    howItWorks: [
      "Enter the initial investment and the cash flow for each year — uneven, lumpy, even negative in a bad year; that is the point of the tool. The analyzer discounts every flow back to today at your required return and sums them into the net present value. A positive NPV means the investment beats your hurdle after pricing time and risk; a negative one means it does not, whatever the total cash returned suggests.",
      "The IRR is the discount rate at which NPV is exactly zero, found by solving the same equation backwards. It is the number people quote because it sounds like an interest rate, but it quietly assumes interim cash flows reinvest at the IRR itself — generous for high-IRR projects. The payback period answers the cruder question (when am I whole again?) and the profitability index scales NPV by the size of the cheque, which is how you compare a small good deal against a large one.",
      "When the verdicts conflict — IRR above the hurdle but NPV negative, usually a sign of a large late outflow — believe the NPV. It is denominated in money, at your rate, today. IRR is a percentage of nothing in particular, and on cash-flow patterns that change sign more than once it can have several values or none; the analyzer says so when that happens instead of inventing one.",
    ],
    formula:
      "NPV = Σ CF_t ÷ (1 + r)^t for t = 0..n, with CF_0 the negative initial investment. IRR is the r that makes NPV = 0 (found by bisection). Profitability index = present value of years 1..n ÷ initial investment. Payback = the year cumulative cash flow crosses zero, with the fractional year interpolated.",
    example: {
      title: "Worked example: $50,000 in, five uneven years back",
      body: "Invest $50,000 today and receive $8,000, $12,000, $15,000, $18,000 and $22,000 at the ends of years one to five — $75,000 in total. At a 10% required return the flows are worth $54,414 today, so NPV is +$4,414: the deal beats the hurdle by that much in today's money. The IRR is 12.90% — the rate that would make the deal exactly break-even in present-value terms. Payback lands at 3.83 years (the cumulative flow turns positive during year four: $47,000 back by the end of year three, then $3,000 of year four's $18,000 completes it). The profitability index is 1.09. Verdict: accept at a 10% hurdle; at a 15% hurdle the same deal's NPV turns negative and the answer flips — which is why the discount rate is an input, not a constant.",
    },
    faqs: [
      {
        question: "Which should I use, NPV or IRR?",
        answer: "NPV for the decision, IRR for the conversation. NPV measures value created in today's money at your actual required return, handles any cash-flow pattern, and ranks mutually exclusive projects correctly. IRR is a useful summary statistic and a common language — but compare it only against your hurdle, never against another project's IRR when the projects differ in size or timing.",
      },
      {
        question: "What discount rate should I use?",
        answer: "Your opportunity cost: what the same money earns in the next-best investment of similar risk. For a business project that is often the company's cost of capital (commonly 8–12%); for a personal investment, the return of the index fund you would otherwise buy, plus a premium for illiquidity and effort. If the verdict flips within a point or two of your rate, the honest conclusion is that the deal is marginal.",
      },
      {
        question: "Why does the tool sometimes say there is no meaningful IRR?",
        answer: "IRR exists only when the NPV curve crosses zero. A project whose flows never repay the investment has no crossing; one whose flows change sign repeatedly (a big outflow at the end, say) can cross several times, giving several 'correct' IRRs. In both cases IRR is the wrong instrument — NPV at your rate still gives a clean answer, and the tool says which situation you are in.",
      },
      {
        question: "Does payback account for the time value of money?",
        answer: "The payback shown is the simple version — cumulative undiscounted cash — because its job is to measure exposure: how long your capital is at risk. The NPV already contains the discounted view of the same flows. A discounted payback can be read off the NPV's inputs: if NPV is positive, discounted payback happens before the final year; the gap between the two paybacks is the cost of time on your deal.",
      },
    ],
  },

  "pro/portfolio-rebalancer": {
    quickAnswer:
      "A portfolio rebalancer converts target percentages into actual orders. A $100,000 portfolio targeting 60% US stocks, 20% international, 15% bonds and 5% cash, but currently holding $48,000 / $18,000 / $24,000 / $10,000, needs four trades: buy $12,000 of US stocks and $2,000 of international, sell $9,000 of bonds and $5,000 of cash — a self-funding plan, since the sells exactly pay for the buys.",
    howItWorks: [
      "Enter every holding with two numbers: what it is worth now, and what share of the portfolio it should be. The targets must add to 100% — the tool checks, because a plan whose targets sum to 112% is not a plan. It then converts each target percentage into a target value at today's portfolio size and diffs it against reality: that difference, signed, is the trade.",
      "The output is deliberately a trade list, not a lecture. Sells are listed with buys, and because a rebalance only moves money between holdings, the sells always fund the buys to the cent — no new cash is required, which is why the worked example's $14,000 of buys is matched by $14,000 of sells. The drift figure (the largest gap between a holding's actual and target share) is the number to watch between rebalances.",
      "Rebalance on a rule, not a mood: a calendar date once or twice a year, or a band — trade only when a holding drifts more than about 5 percentage points from target. Inside the band, trading mostly manufactures spreads, taxes and regret. The tool shows drift per holding precisely so you can apply that judgment: in the example, US stocks at 48% against a 60% target have breached any reasonable band, and the trade list is the fix.",
    ],
    formula:
      "Target value = portfolio total × target %. Trade = target value − current value (positive: buy, negative: sell). Drift = |current % − target %|. Turnover = half the sum of |trades|, because every sale funds a purchase.",
    example: {
      title: "Worked example: a $100,000 portfolio that drifted in a bull market",
      body: "Holdings today: US stocks $48,000 (48%), international stocks $18,000 (18%), bonds $24,000 (24%), cash $10,000 (10%). Targets: 60 / 20 / 15 / 5. Target values at $100,000 are $60,000, $20,000, $15,000 and $5,000, so the trade list reads: buy $12,000 of US stocks, buy $2,000 of international, sell $9,000 of bonds, sell $5,000 of cash. Total trading is $14,000 (turnover), the largest drift is the 12-point gap in US stocks, and the plan needs no new money. Note what happened here: stocks fell behind target because bonds and cash were added during the year while stocks were left alone — drift is usually your own deposits, not the market, and rebalancing is how you stop your savings habit from quietly rewriting your asset allocation.",
    },
    faqs: [
      {
        question: "How often should I rebalance?",
        answer: "Once or twice a year on a fixed date, or whenever a major holding drifts more than about 5 percentage points from target — whichever comes first. More often than that and you are mostly paying spreads and taxes to fight noise; less often and the portfolio's risk quietly becomes whatever the market last did, not what you chose.",
      },
      {
        question: "Should I rebalance by selling, or with new deposits?",
        answer: "In taxable accounts, prefer directing new deposits (and dividends) into the underweight holdings — it restores the target without realising capital gains. Selling is the tool for retirement accounts, for large drifts deposits cannot fix in reasonable time, and for holdings you should exit anyway. The trade list is the same either way; deposits simply substitute for some of the buys.",
      },
      {
        question: "What if my targets do not add to 100%?",
        answer: "Then they describe more (or less) than the whole portfolio, and no set of trades can satisfy them. The tool flags the total as you type. The usual cause is adding a new holding without trimming the others — decide what the new position replaces, because in a portfolio everything is funded by something.",
      },
      {
        question: "Does rebalancing actually improve returns?",
        answer: "Its reliable benefit is risk control: it keeps the portfolio you chose from becoming a different, riskier one after a bull run. The return effect is smaller and cuts both ways — rebalancing sells what rose and buys what fell, which helps in oscillating markets and lags in trending ones. Anyone who sells it as a return booster is overselling; it is a discipline tool, and discipline is the product.",
      },
    ],
  },
};
