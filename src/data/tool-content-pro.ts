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
      "A Monte Carlo retirement simulator runs your plan through 1,000 market futures instead of one average projection, and reports the share in which your money lasts. With $150,000 saved, $1,500 a month going in, 30 years to retirement and $50,000 a year of spending, the plan succeeds in 79.7% of futures — workable, but one future in five runs dry.",
    howItWorks: [
      "Enter what you have saved, what you add each month, the years until retirement, your expected return and volatility, inflation, the years of retirement, and your annual spending. The simulator then plays out 1,000 complete lifetimes: in each one, every month's return is drawn from a normal distribution centred on your average return with your volatility as its spread, contributions land while you work, and spending leaves once you retire.",
      "Everything is computed in today's dollars. Your expected return is deflated by inflation — a 7% nominal return at 2.5% inflation becomes a 4.39% real return — and retirement spending is held constant in real terms, so every number is in money you can picture. The random sequence is seeded, so the same inputs always produce the same result: the figures in this guide are the figures the tool shows.",
      "The median outcome is lower than a smooth projection at the same average return, and the gap is volatility drag. A portfolio that falls 20% needs a 25% gain to recover, so a swinging portfolio compounds below its arithmetic average — roughly by half the variance each year. At 12% volatility that drag is about 0.72 points a year, which is why the simulated median at retirement sits about 13% below the smooth $1,675,000 projection.",
      "The order of returns matters as much as their average — this is sequence risk, and it is worst in the first decade of retirement. Two futures with identical average returns end very differently if one opens with a crash while you withdraw $50,000 a year: the early losses shrink the base later gains must rebuild. That is why a plan with a healthy median can still fail in one future in five.",
      "Read the success rate first, then the band. The success rate is the share of futures that never hit zero; the tool calls 90%+ robust, 75–90% workable, 50–75% a coin flip, below 50% in need of restructuring. The band shows the middle 80% of outcomes year by year: the top edge is a lucky sequence, the bottom edge an unlucky one. A plan is only as strong as its bad paths.",
    ],
    formula:
      "Monthly: balance × (1 + real return ÷ 12 + volatility ÷ √12 × random shock) + contribution (working years) − spending ÷ 12 (retirement years). Real return = (1 + nominal return) ÷ (1 + inflation) − 1. Success rate = share of 1,000 paths never reaching zero.",
    example: {
      title: "Worked example: $150,000 saved, $1,500 a month, retire in 30 years",
      body: "Start with $150,000, contribute $1,500 a month for 30 years, assume a 7% average return with 12% volatility and 2.5% inflation, then spend $50,000 a year (in today's dollars) for 30 years of retirement. A smooth projection at the 4.39% real return reaches about $1,675,000 by retirement. The simulator's median outcome is lower — about $1,456,000 — and the middle 80% of outcomes at retirement spans roughly $794,000 to $2,777,000. The plan succeeds in 79.7% of futures; the median path ends with roughly $1,475,000 still invested, while in the worst tenth of futures the money runs out before the 30 retirement years are up. That gap is exactly what this tool exists to show.",
    },
    faqs: [
      {
        question: "Why is the simulated median lower than a normal projection?",
        answer: "Volatility drag. A 20% loss needs a 25% gain to undo, so a swinging portfolio compounds below its average return — roughly by half the variance each year. Over 30 years at 12% volatility, the median outcome in the example lands about 13% under the smooth projection. Any calculator that only shows the average path is showing you a future more optimistic than the typical one.",
      },
      {
        question: "What success rate should I aim for?",
        answer: "Most planners treat 85–95% as robust and 70–85% as workable with flexibility — the ability to trim spending in a bad first decade of retirement is worth several points of success rate by itself. This tool draws the lines at 90% (robust), 75% (workable) and 50% (a coin flip). Below 70%, change the plan, not the hope: save more, spend less, or retire later, in whichever order hurts least.",
      },
      {
        question: "What volatility should I enter?",
        answer: "Roughly 15–17% for an all-stock portfolio — Vanguard research puts the long-run annualised standard deviation of US equities in that range, and AAII measured about 14.3% across rolling 12-month periods since 1970. Use 10–12% for a balanced stock/bond mix and 5–7% for a conservative one. Volatility is the input people most often set too low, and it is the one that drives the bad paths.",
      },
      {
        question: "Does the simulator include taxes and Social Security?",
        answer: "No — it models the investment portfolio only, in today's dollars. Treat Social Security or a pension as a reduction in the spending figure: if a pension covers $20,000 of a $50,000 spending target, enter $30,000. Taxes differ too much by account type for a single switch to be honest, so they are left to the tax calculators.",
      },
    ],
  },

  "pro/rental-property-analyzer": {
    quickAnswer:
      "A rental analyzer underwrites a deal the way a lender does: every expense line against the rent, then the ratios that decide it. A $320,000 property renting for $2,600 a month with 25% down at 6% produces $249.75 a month of cash flow, a 6.33% cap rate, a 3.47% cash-on-cash return and a DSCR of 1.17 — positive, but thin.",
    howItWorks: [
      "Enter the price, deposit and loan terms, then the rent and every running cost: property tax as a share of price, insurance and HOA in dollars, and reserves for maintenance, vacancy and management as percentages of rent. The analyzer builds the full monthly picture — mortgage payment, each expense line, and what is left — because deals rarely fail on the mortgage; they fail on the five smaller lines buyers forget.",
      "Net operating income (NOI) is rent minus running costs, before the mortgage. The cap rate is NOI divided by price: the return if you owned it outright, and the figure that lets you compare deals of any size. Cash-on-cash divides the after-mortgage cash flow by the cash you put in, deposit plus closing costs — it answers the question the cap rate cannot: what does my money earn?",
      "DSCR divides NOI by the annual mortgage payments. At 1.17 the property earns 17% more than its debt service — positive, but below the 1.25 most conventional lenders want. GRM is price divided by annual rent: 10.3 here, against a rough rule that monthly rent of 1% of price (a GRM of 8.3) marks a strong cash-flow market. The 6.33% cap rate barely exceeds the 6% mortgage rate, so borrowing adds almost nothing to the return.",
      "The tool defaults to a 5% vacancy allowance — about 18 empty days a year — but the Census Bureau put the national rental vacancy rate at 7.6% in the third quarter of 2026, the highest since 2014, so 5% is optimistic in many markets. Maintenance at 5% of rent is the standard reserve for the boiler, roof and appliances that all fail eventually. Deals underwritten at zero for both are underwritten to fail.",
      "The tool calls a deal sound only when cash flow is positive and DSCR reaches 1.25; positive cash flow below that line earns 'positive but thin', and negative cash flow is labelled a speculation, not an investment. The example below is the middle case: it pays, but one vacancy can flip it negative. A deal that survives honest assumptions is a deal; one that needs vacancy and maintenance at zero to work is a hope.",
    ],
    formula:
      "NOI = (rent − tax − insurance − HOA − maintenance − vacancy − management) × 12. Cap rate = NOI ÷ price. Cash flow = NOI ÷ 12 − mortgage payment. Cash-on-cash = annual cash flow ÷ (deposit + closing costs). DSCR = NOI ÷ annual mortgage payments.",
    example: {
      title: "Worked example: $320,000 duplex, $2,600 a month rent",
      body: "Buy at $320,000 with 25% down ($80,000) plus 2% closing costs ($6,400): $86,400 of cash in, a $240,000 loan at 6% over 30 years, and a payment of $1,438.92. Rent is $2,600. Monthly costs: tax $293.33, insurance $150, maintenance $130, vacancy $130 and management $208 — $911.33 of running costs, $2,350.25 all-in with the mortgage. NOI is $20,264 a year, a cap rate of 6.33%. Cash flow is $249.75 a month ($2,996.94 a year), a cash-on-cash return of 3.47%, and the DSCR is 1.17 with a GRM of 10.3. The deal pays, but the margin is thin: at a 7% rate cash flow shrinks to about $92 a month, and at $2,400 rent to about $86.",
    },
    faqs: [
      {
        question: "What cap rate is a good deal?",
        answer: "It depends on the market's risk and rates, but roughly: under 4% you are mostly buying appreciation, 5–7% is a balanced income deal, and above 8% usually means a cheaper, rougher market or real work to do. Compare the cap rate with the mortgage rate — when the cap rate is below the rate you borrow at, leverage works against you, not for you.",
      },
      {
        question: "Why include vacancy and maintenance if the property is occupied and fine?",
        answer: "Because over a ten-year hold both are certainties, just unscheduled. A 5% vacancy allowance is about 18 empty days a year averaged out — the Census Bureau measured a 7.6% national rental vacancy rate in Q3 2026, so 5% is already optimistic in many markets. A 5% maintenance reserve covers the boiler, roof and appliances that all fail eventually. Deals underwritten at zero for both are underwritten to fail.",
      },
      {
        question: "What DSCR do lenders require?",
        answer: "For conventional investment-property lending, 1.25 is the common floor: the property's income must cover the mortgage payments with 25% to spare. Specialist DSCR loans in 2026 accept 1.0 to 1.25, with 1.25+ earning the best pricing. Below 1.0 the property does not pay its own mortgage and the lender is effectively lending to your salary instead. The example deal at 1.17 would get questions.",
      },
      {
        question: "Does this include appreciation, tax benefits or loan paydown?",
        answer: "No — it judges year one on income alone, deliberately. Appreciation, principal paydown and tax treatment all add to real returns, but none of them pay a bill in month three. Underwrite the cash flow first; treat the rest as upside, not as the plan.",
      },
    ],
  },

  "pro/business-valuation-calculator": {
    quickAnswer:
      "Small businesses are valued on seller's discretionary earnings (SDE) times an industry multiple. A services business earning $210,000 of SDE at a 2.5×–3.5× multiple is worth $525,000 to $735,000 on the market method, while a discounted cash flow on the same earnings produces about $1.5 million — and understanding why those two numbers differ is most of what valuation is.",
    howItWorks: [
      "Start with SDE: net profit plus the owner's salary, benefits, and personal or one-off expenses run through the business — the total economic benefit of owning it. Buyers price that number, not revenue. Enter revenue anyway: the SDE margin (SDE divided by revenue) is the first sanity check, and a margin far outside the industry norm means the SDE needs explaining before a multiple is applied.",
      "The market method multiplies SDE by a range drawn from what similar businesses actually sell for — the calculator presets seven industries. The anchor is real: BizBuySell's Q2 2026 Insight Report put the average closed-sale multiple at 2.7× SDE, and IBBA's Market Pulse shows multiples rising with deal size, from 2.0× under $500,000 to 3.1× between $1 million and $2 million. Owner-dependent businesses trade low because the buyer is purchasing a job with risk attached.",
      "The income method projects SDE forward at your growth rate, discounts each year back, and adds a terminal value for everything after the projection. Nearly half the DCF value in the example below — 48% — sits in that terminal value, which is why the discount rate matters more than any single year's projection. At 25% instead of 20%, the same business's DCF falls from about $1.5 million to about $1.15 million.",
      "The DCF runs higher because it treats all of SDE as cash a buyer receives — but a buyer who must replace the owner starts by subtracting a manager's salary, which is much of why market prices sit below DCF values. Treat the DCF as the ceiling for a perfect handover, the multiple range as the price discovery zone. A factor-of-two gap means the market thinks the earnings are less transferable than the spreadsheet assumes.",
      "Use the tool to test the levers. The industry presets show the spread: SaaS at 3.5×–5.5× against retail at 1.5×–2.5× is the market pricing recurring revenue and owner-independence. Then ask what would move your business up its own range: documented systems, a second-in-command, recurring contracts, no client above about 10% of sales. That work raises the multiple itself — the only valuation improvement that survives contact with a real buyer.",
    ],
    formula:
      "Market value = SDE × multiple. DCF value = Σ SDE × (1 + g)^t ÷ (1 + d)^t for t = 1..n, plus terminal value = final-year SDE × (1 + terminal g) ÷ (d − terminal g), discounted back n years. SDE margin = SDE ÷ revenue.",
    example: {
      title: "Worked example: services firm, $850,000 revenue, $210,000 SDE",
      body: "A professional-services firm turns over $850,000 and produces $210,000 of SDE — a 24.7% margin. At 2.5× to 3.5×, the market value is $525,000 to $735,000, midpoint $630,000 (an implied 0.74× revenue). The DCF, projecting SDE growing at 8% for five years, discounted at 20% with 2.5% terminal growth, sums to about $1,500,000 — more than double the market midpoint. Year-five earnings reach $308,559; the terminal value of $1,807,274 is worth $726,303 today. The gap is the lesson: the DCF assumes every dollar of SDE transfers to a buyer, and the market knows it does not. If you are selling, the work that closes the gap — systems, a second-in-command, recurring contracts — raises the multiple itself.",
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
        answer: "For a small private business, 18–25% is the honest zone — far above public-market rates, because the investment is illiquid, concentrated and owner-dependent. If a valuation only works at a 10% discount rate, it does not work; it has been reverse-engineered. The calculator defaults to 20%, and the example's DCF falls from about $1.5 million to about $1.15 million at 25%, so stress-testing there is a useful habit.",
      },
      {
        question: "Is the DCF or the multiple right?",
        answer: "For pricing an actual transaction, the market method is right almost by definition: businesses sell at multiples of earnings, and comparable sales are the evidence. The DCF earns its place as a check — if the market price implies cash flows you cannot defend in the DCF either, walk away; for a seller, the DCF shows which improvements would justify the top of the range.",
      },
    ],
  },

  "pro/irr-npv-analyzer": {
    quickAnswer:
      "NPV tells you what an investment is worth above its cost at your required return; IRR tells you the return. A $50,000 investment returning $75,000 unevenly over five years has an NPV of $4,414 at 10% and an IRR of 12.90% — it clears a 10% hurdle, repays in 3.83 years, and returns $1.09 of present value per $1 invested.",
    howItWorks: [
      "Enter the initial investment and the cash flow for each year — uneven, lumpy, even negative in a bad year; the tool takes up to 15 years of flows. The analyzer discounts every flow back to today at your required return and sums them into the net present value. A positive NPV means the investment beats your hurdle after pricing time and risk; a negative one means it does not.",
      "The IRR is the discount rate at which NPV is exactly zero, found by bisection. It is the number people quote because it sounds like an interest rate, but it quietly assumes interim cash flows reinvest at the IRR itself — generous for high-IRR projects. NPV assumes reinvestment at your required return instead, which is why the CFA curriculum calls NPV the better rule when the two disagree.",
      "The payback period answers the cruder question — when am I whole again? — by tracking cumulative undiscounted cash and interpolating the fractional year. It measures exposure, not value. The profitability index divides the present value of inflows by the initial investment, which is how you compare a small good deal against a large one. A PI above 1.0 means the same thing as a positive NPV; below 1.0, the same as a negative one.",
      "When the verdicts conflict — IRR above the hurdle but NPV negative — believe the NPV. It is denominated in money, at your rate. IRR is a percentage of nothing in particular, and on cash-flow patterns that change sign more than once it can have several values or none; the analyzer reports no IRR when the NPV curve never crosses zero. For mutually exclusive projects, rank by NPV: a small project with a high IRR can still create less value than a large one with a lower return.",
      "The discount rate is the input that decides the answer. The example below is worth $4,414 at a 10% required return and −$2,878 at 15% — the same cash flows, the opposite verdict. If a deal's NPV flips within a point or two of your rate, the honest conclusion is that the deal is marginal, and the next step is better cash-flow estimates, not a more convenient rate.",
    ],
    formula:
      "NPV = Σ CF_t ÷ (1 + r)^t for t = 0..n, with CF_0 the negative initial investment. IRR is the r that makes NPV = 0. Profitability index = present value of years 1..n ÷ initial investment. Payback = the year cumulative cash flow crosses zero, fractional year interpolated.",
    example: {
      title: "Worked example: $50,000 in, five uneven years back",
      body: "Invest $50,000 today and receive $8,000, $12,000, $15,000, $18,000 and $22,000 in years one to five — $75,000 in total. At a 10% required return the flows are worth $54,414 today, so NPV is +$4,414: the deal beats the hurdle by that much in today's money. The IRR is 12.90% — the break-even rate in present-value terms. Payback lands at 3.83 years (the cumulative flow turns positive during year four: $35,000 back by the end of year three, then $15,000 of year four's $18,000 completes it). The profitability index is 1.09. Verdict: accept at a 10% hurdle; at a 15% hurdle the same deal's NPV turns negative (−$2,878) and the answer flips.",
    },
    faqs: [
      {
        question: "Which should I use, NPV or IRR?",
        answer: "NPV for the decision, IRR for the conversation. NPV measures value created in today's money at your actual required return, handles any cash-flow pattern, and ranks mutually exclusive projects correctly. IRR is a useful summary statistic and a common language — but compare it only against your hurdle, never against another project's IRR when the projects differ in size or timing.",
      },
      {
        question: "What discount rate should I use?",
        answer: "Your opportunity cost: what the same money earns in the next-best investment of similar risk. For a business project that is often the company's cost of capital (commonly 8–12%); for a personal investment, the return of the index fund you would otherwise buy, plus a premium for illiquidity and effort. If the verdict flips within a point or two of your rate, the deal is marginal.",
      },
      {
        question: "Why does the tool sometimes say there is no meaningful IRR?",
        answer: "IRR exists only when the NPV curve crosses zero. A project whose flows never repay the investment has no crossing, so the tool reports no IRR. Flows that change sign repeatedly (a big outflow at the end, say) can cross several times, giving several 'correct' IRRs. In both cases IRR is the wrong instrument — NPV at your rate still gives a clean answer.",
      },
      {
        question: "Does payback account for the time value of money?",
        answer: "The payback shown is the simple version — cumulative undiscounted cash — because its job is to measure exposure: how long your capital is at risk. The NPV already contains the discounted view of the same flows. In the example, simple payback is 3.83 years but discounted payback is 4.68 years; the gap between the two is the cost of time on your deal.",
      },
    ],
  },

  "pro/portfolio-rebalancer": {
    quickAnswer:
      "A portfolio rebalancer converts target percentages into actual orders. A $100,000 portfolio targeting 60% US stocks, 20% international, 15% bonds and 5% cash, holding $48,000 / $18,000 / $24,000 / $10,000, needs four trades: buy $12,000 of US stocks and $2,000 of international, sell $9,000 of bonds and $5,000 of cash — the sells pay for the buys.",
    howItWorks: [
      "Enter every holding with two numbers: what it is worth now, and what share of the portfolio it should be — up to eight holdings. The targets must add to 100%; the tool shows the running total and flags it in red until it does. It then converts each target percentage into a target value at today's portfolio size and diffs it against reality: that difference, signed, is the trade.",
      "Sells are listed with buys, and because a rebalance only moves money between holdings, the sells always fund the buys to the cent — no new cash is required, which is why the example's $14,000 of buys is matched by $14,000 of sells. The drift figure (the largest gap between a holding's actual and target share) is the number to watch between rebalances, and holdings within $1 of target simply show 'Hold'.",
      "Rebalance on a rule, not a mood. Vanguard's 2010 research on a 60/40 portfolio over 1926–2009 found no meaningful difference in risk-adjusted returns between monthly, quarterly and annual rebalancing — but the number of trades, and their costs, rose sharply with frequency. Its conclusion: check once or twice a year and act only when a holding drifts more than about 5 percentage points from target. Inside the band, trading mostly manufactures spreads, taxes and regret.",
      "The point is risk control, not return. In Vanguard's simulation the never-rebalanced 60/40 drifted to an average 84.1% in equities — at one point about 99% — and returned slightly more, 9.1% a year against 8.6% for the annually rebalanced version, but with volatility of 14.4% against 11.9%. Rebalancing sells what rose and buys what fell, which keeps the portfolio you chose from becoming a different, riskier one after a bull run.",
      "Execute the sells first, then the buys with the proceeds. In taxable accounts, prefer directing new deposits and dividends into the underweight holdings instead of selling, since selling realises capital gains; use the trade list to see how much of each buy a deposit can replace. The tool calls drift under 2 points essentially on target: below that line, the trades cost more than the precision is worth.",
    ],
    formula:
      "Target value = portfolio total × target %. Trade = target value − current value (positive: buy, negative: sell). Drift = |current % − target %|. Turnover = half the sum of |trades|, because every sale funds a purchase.",
    example: {
      title: "Worked example: a $100,000 portfolio that drifted in a bull market",
      body: "Holdings today: US stocks $48,000 (48%), international stocks $18,000 (18%), bonds $24,000 (24%), cash $10,000 (10%). Targets: 60 / 20 / 15 / 5. Target values at $100,000 are $60,000, $20,000, $15,000 and $5,000, so the trade list reads: buy $12,000 of US stocks, buy $2,000 of international, sell $9,000 of bonds, sell $5,000 of cash. Total trading is $14,000 (turnover), the largest drift is the 12-point gap in US stocks, and the plan needs no new money. Note what happened here: stocks fell behind target because bonds and cash were added during the year while stocks were left alone — drift is usually your own deposits, not the market.",
    },
    faqs: [
      {
        question: "How often should I rebalance?",
        answer: "Once or twice a year on a fixed date, or whenever a major holding drifts more than about 5 percentage points from target — whichever comes first. Vanguard's 2010 research found risk-adjusted returns barely differ between monthly, quarterly and annual rebalancing, while trading costs rise sharply with frequency. More often than that and you are mostly paying spreads and taxes to fight noise.",
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
        answer: "Its reliable benefit is risk control: it keeps the portfolio you chose from becoming a different, riskier one after a bull run. In Vanguard's 1926–2009 simulation the never-rebalanced 60/40 returned slightly more (9.1% vs 8.6% a year) — but at 14.4% volatility against 11.9%, and an average 84% in equities. Anyone who sells rebalancing as a return booster is overselling; it is a discipline tool.",
      },
    ],
  },
};
