import type { ToolContentEntry } from "./tool-content";

export const TOOL_CONTENT_A3: Record<string, ToolContentEntry> = {
  "real-estate/flipping-profit-margin-calculator": {
    quickAnswer:
      "A flipping calculator totals every cost of a buy-renovate-sell project against the expected resale value. Buy at $180,000, spend $45,000 on rehab, hold 6 months and sell at a $290,000 ARV, and the projected profit is $37,100 — a margin of about 12.8% of the sale price, before tax. It also checks the purchase against the 70% rule, which would cap the offer at $158,000 for this deal.",
    howItWorks: [
      "Enter the purchase price, rehab budget, hold period and monthly holding costs, buying and selling costs, and the after-repair value (ARV) — the price the renovated property should achieve, taken from comparable renovated sales, not optimism. The calculator nets everything against the ARV.",
      "The lines new flippers undercount are holding costs and selling costs. Holding a property for 6 months at $1,150 a month (loan interest, tax, insurance, utilities) is $6,900. Selling at 6% of the price is $17,400 on this deal — the single largest cost after the rehab itself. Buying costs at 2% add $3,600.",
      "The 70% rule is the quick discipline: offer no more than 70% of ARV minus rehab costs. It builds roughly a 30% gross cushion for the costs above plus profit. In the example, the buyer's $180,000 price exceeds the rule's $158,000 ceiling — the maths still shows a profit because the cost assumptions are lean, but the margin for a rehab overrun or a slower sale is thin.",
    ],
    formula: "Projected profit = ARV − purchase price − rehab − (holding cost per month × months held) − buying costs − selling costs. 70% rule maximum offer = (ARV × 0.70) − rehab cost. Margin = profit ÷ ARV.",
    example: {
      title: "Worked example: $180,000 purchase, $290,000 ARV",
      body: "Costs: purchase $180,000; rehab $45,000; holding 6 months × $1,150 = $6,900; buying costs at 2% = $3,600; selling costs at 6% of ARV = $17,400. Total in: $252,900. Sale at $290,000 leaves a projected profit of $37,100, a 12.8% margin on the sale price and an ROI of about 14.7% on total cash in, over roughly 7 months. A 20% rehab overrun ($9,000) cuts the profit to $28,100 — survivable; a 10% miss on ARV ($29,000) nearly wipes it out, which is why ARV evidence matters more than rehab optimism.",
    },
    faqs: [
      {
        question: "What profit margin should a flip target?",
        answer:
          "Experienced flippers commonly target at least 10% to 15% of the sale price as profit after all costs, because the plan will meet surprises — hidden defects, permit delays, a softening market. Below that, one bad surprise turns the project into unpaid work. The 70% rule exists to enforce roughly this cushion at the offer stage.",
      },
      {
        question: "How is flip income taxed?",
        answer:
          "As ordinary business income in most cases: property held for resale is inventory, not a capital asset, so the profit is taxed at income tax rates and generally subject to self-employment tax (15.3% up to the Social Security wage base) if flipping is your trade. The long-term capital gains rates do not apply to a quick flip. Frequent flippers should expect dealer status — get tax advice before the first project, not after.",
      },
      {
        question: "What ARV should I use?",
        answer:
          "The value supported by recent sales of genuinely comparable renovated properties nearby — adjusted for size, condition and date — ideally pulled from the same data an appraiser will use. Your lender's appraisal will test it. Using the highest sale in the neighbourhood as the ARV is the most common way flip projections fail.",
      },
      {
        question: "How long do flips usually take?",
        answer:
          "Rehab commonly runs 1 to 4 months for a cosmetic-to-moderate project, plus marketing and closing time of 1 to 3 months. Every extra month costs the holding cost line — here $1,150 — and extends exposure to price moves. Hard-money financing, common in flips at rates around 10% to 14% plus points, makes time even more expensive than the example's holding figure assumes.",
      },
    ],
  },

  "real-estate/brrrr-strategy-analyzer": {
    quickAnswer:
      "BRRRR — buy, rehab, rent, refinance, repeat — aims to recover most or all of your cash at the refinance step while keeping the property. Buy at $130,000, spend $40,000 on rehab, achieve a $240,000 valuation, and a 75% refinance returns a $180,000 loan: after $178,000 of total costs and $3,600 of refinance fees, only $1,600 of your cash is left in the deal, and the property rents with about $41 a month of cash flow.",
    howItWorks: [
      "Enter the purchase price, rehab cost and holding and buying costs to get your all-in basis. Then enter the after-repair value and the refinance terms — loan-to-value, rate and closing costs. The calculator works out the new loan, the cash recovered, and the cash left in the deal, which is the number the whole strategy turns on.",
      "Next it tests whether the property works as a rental under the new, larger loan: rent minus the new mortgage payment and the running expenses (tax, insurance, vacancy, management). A refinance that returns your cash but leaves a negative monthly cash flow has not finished the job — it has converted a flip into a subsidised liability.",
      "The binding constraint is the appraisal at refinance. Lenders lend on the appraised value, not your estimate, and many require a seasoning period (commonly 6 to 12 months of ownership) before lending on the improved value rather than your purchase price. Model the refinance at 70% LTV and a value 10% below your ARV as the stress case.",
    ],
    formula: "Cash left in deal = (purchase + rehab + holding and buying costs + refinance costs) − refinance loan. Refinance loan = LTV × appraised value. Cash flow after refinance = rent − new mortgage payment − monthly operating expenses. Equity after refinance = appraised value − refinance loan.",
    example: {
      title: "Worked example: $130,000 buy to $240,000 value",
      body: "All-in basis: $130,000 purchase + $40,000 rehab + $8,000 holding and buying costs = $178,000. Refinance at 75% of the $240,000 ARV gives a $180,000 loan; refinance closing costs are $3,600. Cash left in the deal: $178,000 + $3,600 − $180,000 = $1,600. Equity retained: $60,000. The new payment at 7.5% over 30 years is $1,258.59. Rent of $1,850 minus that payment and $550.50 of monthly expenses (tax $200, insurance $110, vacancy 5% $92.50, management 8% $148) leaves cash flow of about $41 a month — positive, but with no room for a major repair in year one.",
    },
    faqs: [
      {
        question: "What does 'cash left in the deal' need to be for BRRRR to work?",
        answer:
          "Ideally zero or negative — all your money back, which makes the return on the remaining cash effectively infinite and funds the 'repeat' step. In practice, leaving 5% to 10% of the all-in cost is a workable outcome. Leaving 30% in means the refinance failed and you own an ordinary leveraged rental — not a disaster, but not the strategy.",
      },
      {
        question: "What is the seasoning requirement for a refinance?",
        answer:
          "Many lenders require you to own the property for 6 to 12 months before they will lend against the appraised (post-rehab) value; before that, they lend against your purchase price. Some portfolio lenders and DSCR loan products are more flexible, at higher rates. The seasoning period is holding-cost time — price it into the deal from the start.",
      },
      {
        question: "What is a DSCR loan and why do BRRRR investors use it?",
        answer:
          "A debt-service-coverage-ratio loan is underwritten on the property's rent versus its payment rather than the borrower's income. Lenders typically want rent to cover the payment and expenses at a ratio of 1.2× or better, charge higher rates than conventional loans, and lend to LLCs. It solves the income-documentation problem for investors with many properties, at a price.",
      },
      {
        question: "What is the biggest risk in BRRRR?",
        answer:
          "The appraisal gap: if the refinance valuation comes in at $210,000 instead of $240,000 in the example, the 75% loan is $157,500 and about $24,100 of cash stays trapped in the deal. Second is rate risk between purchase and refinance — the strategy is underwritten twice, once by you and once by the market, months apart.",
      },
    ],
  },

  "real-estate/airbnb-arbitrage-margin-calculator": {
    quickAnswer:
      "Rental arbitrage means leasing a property long-term and letting it short-term, keeping the spread. This calculator prices that spread: at a $165 average daily rate and 75% occupancy, a unit grosses $3,712.50 a month; after $2,400 of rent and utilities, platform fees, cleaning and supplies, the margin is about $621 a month — 16.7% of revenue. Occupancy is the whole business: at 55%, the same unit loses money.",
    howItWorks: [
      "Enter the average daily rate (ADR), expected occupancy, average stay length, platform fee, your monthly housing costs (rent, utilities) and per-turnover costs (cleaning, supplies). The calculator converts ADR and occupancy into monthly revenue — ADR × 30.4 nights × occupancy — then charges turnovers based on the average stay.",
      "Turnover costs are what new operators miss. A 3-night average stay at 75% occupancy means roughly 7 to 8 cleans a month. If guests pay a cleaning fee, it often just covers the cleaner; if it does not, cleaning is frequently the second-largest cost after rent.",
      "Read the margin as a percentage and in dollars, then stress occupancy down 15 to 20 points. Short-term demand is seasonal in most markets; the rent is not. A unit that profits at 75% occupancy and loses at 55% needs either a lower rent, a higher ADR market, or a reserve to survive the weak season.",
    ],
    formula: "Monthly revenue = ADR × days booked, where days booked ≈ 30.4 × occupancy %. Turnovers = days booked ÷ average stay. Profit = revenue − housing costs − (platform fee % × revenue) − (cleaning cost × turnovers) − supplies. Margin = profit ÷ revenue.",
    example: {
      title: "Worked example: $165 ADR, 75% occupancy, 3-night average stay",
      body: "Booked nights: 22.5 a month. Gross revenue: $165 × 22.5 = $3,712.50. Platform fee at 3%: $111.38. Turnovers: 22.5 ÷ 3 = 7.5 cleans × $60 = $450. Supplies and restocking: $130. Housing: rent and utilities $2,400. Profit = $3,712.50 − $2,400 − $111.38 − $450 − $130 = $621.12, a 16.7% margin. Drop occupancy to 55% (about 16.7 booked nights, revenue about $2,755) and the same cost base — roughly $2,947 after fees, cleaning and supplies — turns the month into a loss of about $190. The fixed rent does not flex with demand.",
    },
    faqs: [
      {
        question: "Is rental arbitrage legal?",
        answer:
          "It depends on three layers: your lease must permit subletting or short-term rental use (get the landlord's written consent — most standard leases prohibit it), local law may require a short-term rental permit or ban the activity in some zones, and platforms and buildings may impose their own rules (many cities cap nights per year; New York City effectively bans most sub-30-day rentals without the host present). Verify all three before signing a lease for this purpose.",
      },
      {
        question: "What occupancy rate should I assume?",
        answer:
          "Use the market's actual data, not the listing's best month. Mature leisure markets often run 55% to 70% annual occupancy; urban business markets vary with events and season. Annualise: a unit at 85% in peak season and 40% off-season averages near 60%, and the annual figure is the one that has to cover 12 months of rent.",
      },
      {
        question: "What does Airbnb charge hosts?",
        answer:
          "Under the split-fee structure, most hosts pay a 3% service fee and guests pay a separate fee on top. Under host-only pricing (required for many professional listings and in some regions), the host pays around 14% to 16% and the guest sees one price. Which structure applies changes the fee line in this calculator by several hundred dollars a month — check your account's setting.",
      },
      {
        question: "What costs does this calculator not capture?",
        answer:
          "Furnishing and setup (commonly $10,000 to $30,000 for a quality unit, amortised over its life), insurance suitable for short-term letting (a standard landlord policy may not cover it), income taxes, and your own management time. Price the setup cost into the decision: at the example's $621 a month, a $18,000 setup takes about 29 months to recover.",
      },
    ],
  },

  "real-estate/capex-reserve-planner": {
    quickAnswer:
      "A CapEx reserve planner spreads the cost of big, infrequent repairs over their lifespan so you save monthly instead of being ambushed. A typical single-family rental needs about $165 a month per unit: roof $12,000 over 25 years ($40 a month), HVAC $8,500 over 15 years ($47), plus water heater, appliances and flooring. Skip the reserve and the 'profitable' years are borrowing from the roof year.",
    howItWorks: [
      "List each major component with its replacement cost and expected lifespan: roof, HVAC, water heater, appliances, flooring, exterior paint, driveway, plumbing and electrical systems. The planner divides each cost by its lifespan to get the annual reserve for that item, then totals them per property and across your units.",
      "Adjust for age, not just lifespan. A roof with 5 years of life left does not need cost ÷ 25 — it needs cost ÷ 5 from you, unless the previous owner funded the reserve (they did not; you bought their unfunded liability, which is why purchase inspections price remaining life). Where the planner allows remaining-life inputs, use them; otherwise treat a mid-life building as needing a higher monthly figure than the straight average.",
      "Hold the reserve in a separate account and do not count it as cash flow. The discipline is the product: landlords who spend the reserve in good years report excellent returns until two systems fail in the same winter.",
    ],
    formula: "Annual reserve per item = Replacement cost ÷ Lifespan in years. Monthly reserve = total annual reserve ÷ 12. If an item has R years of life remaining and you start from zero, the catch-up reserve is replacement cost ÷ R per year.",
    example: {
      title: "Worked example: one single-family rental",
      body: "Roof $12,000 ÷ 25 years = $480 a year. HVAC $8,500 ÷ 15 = $567. Water heater $1,800 ÷ 10 = $180. Appliances $3,600 ÷ 12 = $300. Flooring $4,500 ÷ 10 = $450. Total replacement exposure: $30,400. Annual reserve: $1,977, which is $164.72 a month per unit. Own four similar units and the portfolio reserve is about $659 a month — a real line in the budget, which is precisely the planner's point.",
    },
    faqs: [
      {
        question: "What lifespans should I use for major components?",
        answer:
          "Standard estimates: asphalt shingle roof 20 to 25 years, HVAC system 15 to 20, water heater 8 to 12, appliances 10 to 15, carpet 8 to 10, exterior paint 5 to 10, and a driveway 20 to 30. Climate and maintenance move these materially. Industry references such as the NAHB's component life-expectancy study publish the full tables.",
      },
      {
        question: "Is CapEx the same as maintenance?",
        answer:
          "No, and conflating them understates costs. Maintenance is routine and small — repairs, servicing, minor replacements — often budgeted at about 5% of rent. CapEx is the large, infrequent replacement of whole systems. A property analysis needs both lines; many advertised cash-flow figures include neither correctly.",
      },
      {
        question: "Can I deduct CapEx reserves on my taxes?",
        answer:
          "No — reserves you set aside are not deductible; you cannot deduct money you still hold. When you actually replace a component, the cost is generally capitalised and depreciated over its recovery period (for example 15 years for some land improvements, 27.5 years for residential structural components) rather than expensed at once, with some exceptions under the de minimis and routine-maintenance safe harbours. Keep receipts and consult a tax professional.",
      },
      {
        question: "How does CapEx change when I buy an older property?",
        answer:
          "It rises, because remaining lifespans are short. Estimate each system's remaining life during inspection and compute the catch-up reserve per item: a roof needing replacement in 4 years at $12,000 requires $250 a month from day one, not $40. Total the catch-up figures before buying — they are effectively part of the purchase price.",
      },
    ],
  },

  "real-estate/heloc-drawdown-simulator": {
    quickAnswer:
      "A HELOC drawdown simulator shows both phases of a home equity line: the interest-only draw period and the amortising repayment that follows. Draw $60,000 at 8.5% and the draw-period payment is just $425 a month — but when repayment begins over 15 years, the same balance costs $590.84 a month, and total repayment-phase interest is about $46,352. The simulator's job is to stop the first figure from fooling you.",
    howItWorks: [
      "Enter your home value, current mortgage balance and the lender's maximum combined loan-to-value to see the largest line available. Then enter the amount you plan to draw, the (variable) HELOC rate and the repayment term to model the payments.",
      "During the draw period — commonly 10 years — you may borrow, repay and borrow again, and the required payment is usually interest only. The balance does not fall unless you pay extra. During repayment — commonly 15 to 20 years — the line closes and the balance amortises like a loan, which is why the payment jumps even if the rate never moves.",
      "The rate itself is the third risk: most HELOCs are variable, priced as prime plus a margin. Prime moves with the Federal Reserve. A simulator run at today's rate is a snapshot; re-run it two points higher to see the payment you might actually be committing to.",
    ],
    formula: "Credit limit = (Max combined LTV × home value) − mortgage balance. Interest-only payment = drawn amount × annual rate ÷ 12. Repayment payment = drawn amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1] over the repayment term.",
    example: {
      title: "Worked example: $600,000 home, $350,000 mortgage, $60,000 draw",
      body: "At an 85% max combined LTV, the credit ceiling is $510,000; minus the $350,000 mortgage, the largest line is $160,000. Draw $60,000 at 8.5%: the interest-only payment is $60,000 × 8.5% ÷ 12 = $425 a month, and the balance stays $60,000. When the draw period ends and the balance amortises over 15 years at the same rate, the payment becomes $590.84 and the interest over the repayment phase totals about $46,352. Ten years of interest-only payments ($51,000 if the balance never moved) bought no equity at all.",
    },
    faqs: [
      {
        question: "What is the current typical HELOC rate?",
        answer:
          "HELOCs price off the prime rate plus a margin, so they move with monetary policy. With prime around 7.5% to 8.5% in recent years, typical HELOC rates have run roughly 8% to 10%. Your margin depends on credit score and combined LTV; the prime part is identical for everyone. Always model the payment at prime plus 2 points before drawing.",
      },
      {
        question: "Can the lender freeze or cut my HELOC?",
        answer:
          "Yes, in defined circumstances — most notably if the home's value falls significantly or your financial situation deteriorates materially. Lenders used this power widely in 2008–2009. A HELOC is therefore unreliable as a sole emergency reserve: keep cash savings as the primary buffer and treat the line as a secondary one.",
      },
      {
        question: "Is HELOC interest tax-deductible?",
        answer:
          "Only if the funds are used to buy, build or substantially improve the home that secures the line, and only for taxpayers who itemise, within the overall mortgage debt limits ($750,000 for post-2017 loans). Interest on HELOC funds used for other spending has not been deductible since 2018, whatever the lender's marketing implies.",
      },
      {
        question: "Should I pay more than interest-only during the draw period?",
        answer:
          "If you intend to carry the balance into repayment, yes — every dollar of principal paid during the draw period is a dollar that does not amortise at the higher repayment payment. In the example, paying the balance down to $40,000 before repayment cuts the repayment payment from $590.84 to about $394 and removes roughly $15,450 of repayment-phase interest.",
      },
    ],
  },

  "real-estate/house-hacking-roi-calculator": {
    quickAnswer:
      "House hacking means living in one unit of a small multi-unit property while tenants rent the others. This calculator measures the true housing cost and return: buy a $450,000 duplex with 5% down, rent the other unit for $1,600, and your share of the $3,423 monthly PITI falls to about $1,823 — while tenants and appreciation build your equity. Move out later and the property must stand on its own numbers, which the calculator tests separately.",
    howItWorks: [
      "Enter the purchase price, down payment, rate, tax and insurance, the rent from the other units, and what you would otherwise pay in rent. The calculator builds the full PITI payment, subtracts tenant rent to get your effective housing cost, and compares it with your rent alternative.",
      "The owner-occupier advantage is the deposit: living in the property qualifies for owner-occupied financing — as little as 3% to 5% down on an FHA or conventional loan for 2 to 4 units — where an investor would need 20% to 25%. That leverage is the strategy's engine and its risk: your cash invested is small, so returns on cash look large in both directions.",
      "Then judge the move-out case, because you will probably not live there forever. The calculator re-runs the property with your unit rented at market rate and no owner subsidy. Cash-on-cash after move-out is the investment verdict; the while-you-live-there figure is a housing-cost verdict. Both need to pass.",
    ],
    formula: "Effective housing cost while house hacking = PITI − rent from other units. PITI = principal and interest + tax ÷ 12 + insurance ÷ 12. Cash invested = down payment + closing costs (about 2% of price). Cash-on-cash after move-out = (total rent − PITI − other expenses) × 12 ÷ cash invested.",
    example: {
      title: "Worked example: $450,000 duplex, 5% down, one unit rented at $1,600",
      body: "Down payment: $22,500. Loan: $427,500 at 6.75% over 30 years — principal and interest $2,772.76. Tax $5,400 a year ($450 a month) and insurance $2,400 a year ($200) bring PITI to $3,422.76. The other unit's $1,600 rent cuts your effective housing cost to $1,822.76 a month, against $1,900 to rent a comparable place — a modest monthly saving, plus roughly $370 a month of principal paydown across year one building equity. Cash invested is $31,500 (deposit plus 2% closing). Move out and rent your unit at $1,900: total rent $3,500 against PITI of $3,422.76 leaves only about $77 a month before maintenance and vacancy — this particular deal works as subsidised housing first and as an investment only with rent growth.",
    },
    faqs: [
      {
        question: "How many units can I buy with an owner-occupied loan?",
        answer:
          "Up to four. FHA and conventional owner-occupied loans cover 1- to 4-unit properties if you live in one unit, typically moving in within 60 days and staying at least a year. Five or more units is a commercial property with commercial financing. The 2-to-4-unit owner-occupied purchase is the largest low-deposit opportunity in US housing finance.",
      },
      {
        question: "Can I use expected rent to qualify for the loan?",
        answer:
          "Often yes. Lenders commonly count about 75% of the rent from units you will not occupy (per leases or an appraiser's rent schedule) as qualifying income, which can substantially raise what you are approved for. FHA loans on 3- to 4-unit properties add a self-sufficiency test: the property's total rent must cover the full PITI payment.",
      },
      {
        question: "Do I have to pay tax on the rental income while house hacking?",
        answer:
          "Yes — rent from the other units is taxable income, against which you can deduct the rental share of expenses: a proportion of mortgage interest, tax, insurance, repairs and depreciation on the rented portion. Owner-occupiers split expenses between Schedule A (personal share) and Schedule E (rental share). The depreciation on the rental portion is a significant shelter — and is recaptured when you sell.",
      },
      {
        question: "What are the main risks of house hacking?",
        answer:
          "Concentration and proximity: your home and your investment are the same building, your tenants are your neighbours, and a vacancy hits both your housing cost and your return at once. Low-deposit leverage means a modest price fall can put the loan underwater. The strategy works best bought below market in an area where the move-out numbers — not just the live-in numbers — already pass.",
      },
    ],
  },

  "real-estate/reit-vs-physical-yield-calculator": {
    quickAnswer:
      "This calculator puts the same capital into two property strategies: a REIT investment compounding at a dividend yield plus appreciation, versus a leveraged physical rental. $60,000 in a REIT returning 8% a year in total becomes about $190,330 in 15 years. The same $60,000 as a 20% deposit on a $300,000 rental ends with about $289,745 of equity plus the cash flow collected along the way — more, on these assumptions, in exchange for leverage, work and concentration in one building.",
    howItWorks: [
      "Enter the capital available, the REIT's dividend yield and expected appreciation (which compound together), and for the physical property: the deposit percentage, rent, mortgage rate, appreciation and operating expenses. The calculator projects both positions to the same end date.",
      "The physical property's advantage is arithmetic, not magic: your $60,000 controls a $300,000 asset, so 3% appreciation is $9,000 a year on your money — 15% before costs. The mortgage payment and expenses eat most of the rent, and the loan balance falls slowly at first. The end position is mostly leveraged appreciation and forced principal repayment.",
      "The REIT's advantages do not fit in the projection: instant diversification across hundreds of properties, daily liquidity, no tenants, no maintenance, and no personal liability for a mortgage. The comparison answers 'which ends bigger on these assumptions' — the assumptions, especially physical appreciation and the absence of major repairs, deserve your scepticism.",
    ],
    formula: "REIT final value = Capital × (1 + dividend yield + appreciation)^years, with dividends reinvested. Physical end equity = appreciated value − remaining loan balance, where value = price × (1 + appreciation)^years and the balance follows the amortisation schedule; cumulative cash flow is added to show the full position.",
    example: {
      title: "Worked example: $60,000 over 15 years",
      body: "REIT path: 4% dividend yield reinvested plus 4% appreciation is an 8% total return. $60,000 × 1.08^15 = $190,330. Physical path: $60,000 is 20% down on a $300,000 property; the $240,000 mortgage at 7% costs $1,596.73 a month. Rent of $2,600 minus operating expenses at 35% of rent ($910) leaves $1,690, so cash flow is about $93 a month — roughly $16,800 collected over 15 years holding rent flat. At 3% appreciation the property is worth about $467,390 in 15 years and the loan balance has fallen to about $177,645, leaving equity of about $289,745. Physical wins this scenario by roughly $116,000 including cash flow — driven almost entirely by leveraged appreciation, the input least in your control.",
    },
    faqs: [
      {
        question: "How are REIT dividends taxed?",
        answer:
          "Most REIT dividends are taxed as ordinary income (REITs pass income through rather than paying corporate tax, and the dividends generally do not qualify for the lower capital gains rate), with a possible 20% deduction for qualified business income on ordinary REIT dividends under current rules — verify for the tax year. Holding REITs in an IRA or 401(k) shelters the income entirely, which is why they are commonly held in retirement accounts.",
      },
      {
        question: "What total return have REITs actually delivered?",
        answer:
          "US equity REITs have returned roughly 10% to 12% a year over very long periods on industry (Nareit) index data, broadly in line with the wider stock market, but with years of deep falls — REITs dropped sharply in 2008 and 2022. A planning assumption of 7% to 9% total return is more prudent than extrapolating the best decades.",
      },
      {
        question: "What does the comparison leave out?",
        answer:
          "Your labour (a physical rental consumes real hours; valuing them at any wage narrows the gap), transaction costs of about 2% to buy and 6% to sell the physical property, major capital repairs, vacancy shocks, and the risk difference between one building in one town and a diversified portfolio. It also ignores financing risk: the physical path can go underwater; the REIT path cannot go below zero.",
      },
      {
        question: "Can I get leverage inside a REIT investment too?",
        answer:
          "REITs themselves borrow — typical REIT balance sheets carry debt of roughly 30% to 50% of assets — so the equity return already includes moderate leverage beneath the surface. Margin borrowing on top of that to match a physical property's leverage is possible but dangerous: margin loans can be called in a falling market, which is exactly when REIT prices fall too.",
      },
    ],
  },

  "real-estate/property-tax-assessor-calculator": {
    quickAnswer:
      "Property tax is not charged on your home's full market value in most places — it is charged on an assessed value, minus exemptions, at the local tax rate. A $400,000 home assessed at 80% of value ($320,000), with a $25,000 homestead exemption, has a taxable value of $295,000; at a 1.25% rate the annual tax is $3,687.50, or about $307 a month in escrow.",
    howItWorks: [
      "Enter the market value, the assessment ratio (the percentage of market value your jurisdiction assesses), any exemptions you qualify for, and the tax rate. The calculator applies the ratio, subtracts exemptions and multiplies by the rate — the same sequence your tax bill follows.",
      "Rates are quoted two ways. A percentage rate applies directly to taxable value. A mill rate is dollars per $1,000 of taxable value — 12.5 mills is the same as 1.25%. Total tax is usually the sum of several overlapping levies: county, city, school district (often the largest) and special districts, each with its own rate.",
      "The effective rate — your actual tax divided by the market value — is the figure for comparing locations: in the example it is 0.92%, well below the headline 1.25%, because of the assessment ratio and exemption. Statewide, effective rates range from about 0.3% (Hawaii) to around 2.4% (New Jersey), which is a difference of over $8,000 a year on the same $400,000 home.",
    ],
    formula: "Assessed value = Market value × assessment ratio. Taxable value = assessed value − exemptions. Annual tax = taxable value × tax rate (or × mill rate ÷ 1,000). Effective rate = annual tax ÷ market value.",
    example: {
      title: "Worked example: $400,000 market value, 80% assessment ratio",
      body: "Assessed value: $400,000 × 80% = $320,000. Less the $25,000 homestead exemption: taxable value $295,000. At a 1.25% combined rate (12.5 mills): $295,000 × 1.25% = $3,687.50 a year, which a lender escrows at about $307 a month. Effective rate on the true value: $3,687.50 ÷ $400,000 = 0.92%. Remove the exemption and the bill rises by $312.50 — exemptions are worth filing for.",
    },
    faqs: [
      {
        question: "What is a homestead exemption and who gets one?",
        answer:
          "A reduction in taxable value for your primary residence, offered by most states and many localities. Amounts range from a flat sum (for example $25,000 to $50,000 of value in parts of Florida and Texas) to a percentage, and some jurisdictions add larger exemptions for seniors, veterans and disabled homeowners. You normally must apply — it is rarely automatic — and it is one of the most commonly missed savings in property tax.",
      },
      {
        question: "Can I appeal my property tax assessment?",
        answer:
          "Yes. Assessments can be appealed, usually within a short window after notices are mailed each year. Successful appeals show the assessed value exceeds market value — using comparable recent sales — or that the property record contains errors (wrong square footage, wrong features). Winning reduces the assessed value, and therefore the tax, until the next reassessment cycle.",
      },
      {
        question: "Why did my tax bill jump after I bought the house?",
        answer:
          "In many states the assessed value is capped or grows slowly while an owner stays put (California's Proposition 13 caps growth at 2% a year; homestead caps exist in Florida, Texas and elsewhere). A sale resets the value to the purchase price, so the new owner inherits a bill based on current value while the seller was paying on a years-old figure. Budget for the reset amount, not the seller's bill.",
      },
      {
        question: "Is property tax deductible?",
        answer:
          "For itemisers, state and local taxes including property tax are deductible up to a combined cap — $10,000 for most filers under the rules in place since 2018 (the cap was raised and made income-dependent by 2025 legislation for a period; check the current-year figure before relying on it). Most homeowners take the standard deduction — an estimated $16,100 single and $32,200 married filing jointly for 2026 — in which case the property tax produces no federal tax benefit.",
      },
    ],
  },

  "loans/loan-calculator": {
    quickAnswer:
      "A loan calculator turns an amount, a rate and a term into the monthly payment and total cost of borrowing. Borrow $25,000 at 8% over 5 years and the payment is $506.91 a month; you repay $30,415 in total, so the loan costs $5,415 in interest. Extending the term lowers the payment but always raises the total interest.",
    howItWorks: [
      "Enter the loan amount, annual interest rate and term. The calculator solves for the fixed monthly payment that repays the loan exactly by the final month, with interest charged each month on the balance then outstanding.",
      "Use the interest total, not the payment, to compare terms. On the example loan, stretching from 5 to 7 years drops the payment by about $117 a month but adds roughly $2,316 of interest. Lenders present the payment because it looks smaller; the total cost is the figure that leaves your account.",
      "If fees are involved — origination fees, documentation charges — the interest rate understates the cost. Switch to the APR figure on the loan disclosure for comparisons, or use an APR calculator: fees of a few hundred dollars on a short loan can add a full point or more to the true rate.",
    ],
    formula: "Monthly payment = Amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where r is the monthly rate (annual rate ÷ 12) and n the number of monthly payments. Total interest = (payment × n) − amount.",
    example: {
      title: "Worked example: $25,000 at 8% over 5 years",
      body: "Payment: $25,000 × [0.006667 × (1.006667)^60] ÷ [(1.006667)^60 − 1] = $506.91. Over 60 payments you hand over $30,414.60, so interest is $5,414.60 — about 22 cents per dollar borrowed. The same loan over 3 years costs $783.41 a month but only $3,203 of interest; over 7 years, $389.66 a month and $7,731 of interest. Term choice is a price decision.",
    },
    faqs: [
      {
        question: "What is the difference between the interest rate and APR?",
        answer:
          "The interest rate prices the money. APR prices the money plus most upfront fees, expressed as a rate, which is why APR is always equal to or higher than the rate on the same loan. US lenders must disclose APR under the Truth in Lending Act. Compare loans by APR and by total repayment; on a fee-free loan the two rates coincide.",
      },
      {
        question: "How does my credit score affect the rate I get?",
        answer:
          "Substantially. Personal loan pricing commonly spans from about 6% to 8% for excellent credit to above 30% for poor credit on the same product. On a $25,000 5-year loan, that range is the difference between roughly $3,200 and over $18,000 of interest. Checking your rate with a soft inquiry first — most online lenders offer this — does not affect your score.",
      },
      {
        question: "Are there penalties for paying a loan off early?",
        answer:
          "Sometimes on personal and auto loans; federal law restricts them on mortgages. A prepayment penalty is usually a percentage of the remaining balance or a few months of interest, and it fades after the first years. Read the note before signing — and if you plan to overpay, a loan without a penalty is worth a slightly higher rate.",
      },
      {
        question: "Fixed or variable rate — which should I choose?",
        answer:
          "For terms under about five years, fixed is the default sensible choice: the payment cannot move. Variable rates start lower but follow a benchmark (usually prime or SOFR) — on a long term they can rise well past the fixed alternative. Variable only makes sense if you would still afford the payment two or three points higher, or plan to clear the loan quickly.",
      },
    ],
  },

  "loans/auto-loan-calculator": {
    quickAnswer:
      "An auto loan calculator includes the whole transaction — price, down payment, trade-in, sales tax and fees — not just the sticker. A $38,000 car with $6,000 down leaves $32,000 to finance before tax and fees; at 7.5% over 60 months that is $641.21 a month and $6,473 of interest. Term length is where car loans get expensive.",
    howItWorks: [
      "Enter the vehicle price, your down payment and trade-in value, the sales tax rate for your state, any dealer or documentation fees, then the loan rate and term. The calculator nets the trade-in and deposit against the price, adds tax and fees, and amortises the financed amount.",
      "Tax treatment of a trade-in varies by state: most states tax only the difference between the new car's price and the trade-in value, which can make a trade-in worth more than its cash value. Selling privately usually fetches more but gives up that tax offset where it exists — the calculator's tax line lets you price the difference.",
      "Judge the deal on total cost and term, not the monthly payment the dealer quotes. Payments can be lowered by stretching the term to 72 or 84 months, which raises interest and leaves the loan underwater — owing more than the car's value — for years, because cars depreciate faster than long loans amortise.",
    ],
    formula: "Amount financed = Price + sales tax + fees − down payment − trade-in value. Monthly payment = Amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1], r = annual rate ÷ 12, n = months.",
    example: {
      title: "Worked example: $38,000 car, $6,000 down, 60 months at 7.5%",
      body: "Amount financed before tax and fees: $38,000 − $6,000 = $32,000. Payment: $641.21 a month. Total paid: $38,472.60, so interest is $6,472.60. Stretch the same loan to 84 months and the payment falls to about $490.82 — but interest climbs to roughly $9,229, and after three years you still owe about $20,300 on a car that may well have depreciated below that figure.",
    },
    faqs: [
      {
        question: "How long a term should I choose for a car loan?",
        answer:
          "60 months is a sound ceiling for a new car and 36 to 48 for a used one; the loan should end well before the car's reliable life does. Terms of 72 to 84 months are now common in the US market, but they combine higher total interest with years of negative equity — a real problem if the car is written off, since insurance pays market value, not the loan balance (that gap is what GAP insurance covers).",
      },
      {
        question: "What rate can I expect on an auto loan?",
        answer:
          "It depends mainly on credit score and whether the car is new or used. Recent US averages have run around 6% to 7% for new cars and 9% to 11% for used cars across all borrowers, with excellent-credit borrowers several points lower and subprime borrowers in the high teens or above. Manufacturer promotional rates (0% to 2.9%) can beat the market but usually replace a cash rebate — compare the total cost of both offers.",
      },
      {
        question: "Should I get pre-approved before visiting a dealer?",
        answer:
          "Yes. A pre-approval from your bank or credit union sets a rate ceiling, turns the dealer conversation into a negotiation about price, and prevents the finance office from marking up the rate — dealers may legally add to the buy rate a lender quotes. Finance through the dealer only if they beat your pre-approved rate in writing.",
      },
      {
        question: "How much should I put down on a car?",
        answer:
          "Around 20% on a new car and 10% on a used one is the traditional guidance, mainly to stay ahead of depreciation and avoid negative equity. It also lowers the payment and total interest. If the choice is between a larger deposit and keeping your emergency fund intact, keep the fund — a car loan at 7% is cheaper than an emergency on a credit card at 25%.",
      },
    ],
  },

  "loans/personal-loan-calculator": {
    quickAnswer:
      "A personal loan calculator prices an unsecured installment loan: fixed amount, fixed rate, fixed payment. Borrow $15,000 at 11% over 3 years and you pay $491.08 a month, $17,679 in total — $2,679 of interest. Because there is no collateral, the rate depends almost entirely on your credit profile.",
    howItWorks: [
      "Enter the amount, the APR (use APR rather than the headline rate if an origination fee applies) and the term, typically 2 to 7 years. The calculator amortises the loan into equal monthly payments and totals the interest.",
      "Personal loans are the standard tool for consolidating credit card balances and funding one-off costs, because the rate is usually far below card APRs and the fixed end date forces the debt to actually die. A card balance, by contrast, has no finish line as long as minimum payments shrink with the balance.",
      "Origination fees of 1% to 8% are common and are usually deducted from the amount you receive — borrow $15,000 with a 5% fee and $14,250 arrives. To net the full amount you need, gross the loan up accordingly, and always compare offers on APR, which folds the fee into the rate.",
    ],
    formula: "Monthly payment = Amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1], r = APR ÷ 12, n = term in months. Total interest = (payment × n) − amount received.",
    example: {
      title: "Worked example: $15,000 at 11% over 3 years",
      body: "Payment: $491.08 a month. Total repaid: $17,678.91, so interest is $2,678.91. The same $15,000 on a credit card at 24% APR, paid at the same $491 a month, would take about 48 months and cost roughly $8,409 of interest — the personal loan saves about $5,730 and finishes a full year sooner, which is the entire case for consolidation loans in one comparison.",
    },
    faqs: [
      {
        question: "What credit score do I need for a personal loan?",
        answer:
          "Most lenders work from a FICO score of about 660 upward for reasonable rates; scores above 740 get the best pricing, often 6% to 9% APR. Borrowers in the low 600s can still be approved but at rates in the 20s and 30s, at which point the loan may not beat the debt it replaces. Some lenders weigh income and employment more than score for smaller amounts.",
      },
      {
        question: "How fast can a personal loan be funded?",
        answer:
          "Online lenders commonly fund within 1 to 5 business days of approval; some offer next-day funding. Banks and credit unions take a few days longer but often price better for existing customers. Speed is rarely the deciding factor — the APR and fees are, because they apply for the whole term.",
      },
      {
        question: "Does applying for a personal loan hurt my credit score?",
        answer:
          "Rate-checking with a soft inquiry does not. A formal application triggers a hard inquiry, typically costing a few points temporarily, and the new loan changes your score mix and utilisation. Paying off card balances with the loan usually raises the score over time by cutting revolving utilisation — provided the cards are not run up again.",
      },
      {
        question: "What can a personal loan not be used for?",
        answer:
          "Lender terms commonly prohibit using proceeds for post-secondary education expenses, investing or securities, real estate purchases in some cases, and illegal activity. Federal student loan needs must be met with education loans, which carry borrower protections a personal loan lacks. Beyond the contract, borrowing to invest converts a market risk into a certain payment — the calculator's interest total is guaranteed; the investment return is not.",
      },
    ],
  },

  "loans/student-loan-calculator": {
    quickAnswer:
      "A student loan calculator projects the payment and lifetime interest on education debt. Borrow $42,000 at 6% and the standard 10-year plan costs $466.29 a month and $13,954 of interest. Every point of rate and every year of term moves the interest total by thousands — the calculator lets you test repayment plans before you commit to one.",
    howItWorks: [
      "Enter the total balance (add up every loan if you have several — or run the calculator per loan, since each carries its own rate), the interest rate and the repayment term. For multiple loans use a balance-weighted average rate for a quick estimate.",
      "Interest starts accruing on federal unsubsidised and PLUS loans from the day the money is disbursed, including while you are in school. Interest that accrues before repayment capitalises — it is added to the principal — so a loan taken out in the first year of a four-year degree can enter repayment owing 15% to 20% more than was borrowed at typical rates.",
      "Compare plans by total interest and by payment together. Stretching the term from 10 to 20 years on the example loan cuts the payment from $466 to about $301 but raises total interest from $13,954 to about $30,200. Income-driven plans trade the same way, with forgiveness at the end as compensation — verify current plan availability and terms at studentaid.gov, as they have changed repeatedly in recent years.",
    ],
    formula: "Monthly payment = Balance × [r(1 + r)^n] ÷ [(1 + r)^n − 1], r = annual rate ÷ 12, n = months in the plan. Total interest = (payment × n) − balance.",
    example: {
      title: "Worked example: $42,000 at 6% on the standard plan",
      body: "Payment: $466.29 a month for 120 months. Total repaid: $55,954, of which interest is $13,954 — you repay about $1.33 for every $1 borrowed. If $6,000 of interest had capitalised during school (a realistic figure for four years of unsubsidised borrowing), the starting balance is really $48,000 and the same plan costs $533 a month with about $15,950 of further interest.",
    },
    faqs: [
      {
        question: "What are the current federal student loan rates?",
        answer:
          "Rates are fixed for each loan at disbursement and reset annually by formula (10-year Treasury yield plus a margin). Recent undergraduate Direct Loans have carried 5.5% to 6.5%; graduate loans run about 1.5 points higher and PLUS loans higher still. Private student loans price on creditworthiness and range from around 4% to the mid-teens. Check studentaid.gov for the current academic year's exact figures.",
      },
      {
        question: "What happens during the grace period?",
        answer:
          "Federal loans typically give six months after leaving school before payments start. Interest on unsubsidised loans keeps accruing through the grace period and capitalises when repayment begins. Paying the interest as it accrues — often $50 to $150 a month in school — prevents capitalisation and keeps the repayment balance equal to what you actually borrowed for tuition.",
      },
      {
        question: "Should I refinance federal student loans privately?",
        answer:
          "Only with a clear-eyed trade. A private refinance at a lower rate can save real money, but it permanently surrenders federal protections: income-driven repayment, deferment and forbearance rights, and any eligibility for forgiveness programmes including Public Service Loan Forgiveness. For borrowers with high, stable private-sector incomes and no forgiveness path, the rate saving may be worth it; for everyone else it usually is not.",
      },
      {
        question: "How much student debt is reasonable?",
        answer:
          "A common rule: total borrowing no more than your expected first-year salary in the field you are entering. On a $55,000 starting salary, a $55,000 balance at 6% takes about $611 a month for 10 years — about 13% of gross pay, before rent. Debt well above first-year salary is where standard repayment starts to break household budgets.",
      },
    ],
  },

  "loans/credit-card-calculator": {
    quickAnswer:
      "This calculator simulates paying a credit card balance the minimum-payment way, so you can see what 'minimum' really costs. An $8,200 balance at 25.99% APR with a typical minimum of interest plus 1% of the balance (with a $25 floor) takes 287 months — nearly 24 years — and $16,604 of interest. The same balance at a fixed $300 a month clears in about 42 months with roughly $4,352 of interest.",
    howItWorks: [
      "Enter the balance, the APR and how you intend to pay: minimum only, or a fixed monthly amount. The calculator steps through the balance month by month, charging interest at APR ÷ 12 and applying your payment, exactly as the card statement does.",
      "Minimum payments are designed to shrink. A typical formula is the month's interest plus 1% of the balance (or 2% to 4% of the balance, varying by issuer), with a floor around $25. Early on, most of the payment is interest: month one on the example balance charges $177.60 of interest against a payment of about $260.",
      "The fixed-payment comparison is the point of the tool. Holding a fixed payment of $300 — close to the first month's minimum — and never letting it fall turns a 24-year debt into a three-and-a-half-year one on this balance, because every dollar that interest stops claiming goes straight to principal.",
    ],
    formula: "Each month: interest = balance × APR ÷ 12. Minimum payment = max(interest + 1% of balance, $25) for the modelled issuer formula. Balance falls by (payment − interest) until it reaches zero.",
    example: {
      title: "Worked example: $8,200 at 25.99% APR, minimum payments only",
      body: "Month one: interest $177.60, minimum payment $259.60 (interest plus 1% of the balance), so principal falls by just $82. The balance halves only after about 6 years. Final payment arrives in month 287, and total interest is $16,604 — you repay about $24,804 for $8,200 of spending. Federal rules require your statement to print this comparison; this calculator lets you run it for any payment you choose, before you choose it.",
    },
    faqs: [
      {
        question: "How is credit card interest actually calculated?",
        answer:
          "Most issuers use the average daily balance method: the daily rate (APR ÷ 365) is applied to each day's balance, including new purchases once any grace period is lost. If you pay the full statement balance by the due date, purchases usually incur no interest at all — the grace period. Carry any balance and the grace period disappears, so new purchases accrue interest from the day they post.",
      },
      {
        question: "What APR is typical for a credit card?",
        answer:
          "High. Federal Reserve data puts the average rate on interest-bearing card accounts in the low-to-mid 20s in recent years — roughly 23% to 26%. Store cards run higher, often around 30%. Against those rates, even a strong savings account yield is irrelevant: paying a 25% APR is a guaranteed 25% return on the money used.",
      },
      {
        question: "Will a fixed payment hurt my credit score compared with minimums?",
        answer:
          "No — paying more than the minimum is positive in every respect. Scores care about on-time payment (any amount at or above the minimum satisfies it) and utilisation, the share of your limit in use. Bigger payments cut utilisation faster. Keep reported utilisation under about 30%, and lower is better.",
      },
      {
        question: "I cannot afford more than the minimum. What are the options?",
        answer:
          "In order: ask the issuer for a hardship plan or a temporary rate reduction (issuers grant these more often than borrowers expect); consider a 0% balance transfer if the fee (3% to 5%) buys enough interest-free months to change the outcome; or speak to a non-profit credit counsellor about a debt management plan, which typically cuts card APRs to around 8% in exchange for closing the cards. Avoid debt settlement companies charging upfront fees — the FTC restricts them for a reason.",
      },
    ],
  },

  "loans/debt-payoff-calculator": {
    quickAnswer:
      "A debt payoff calculator combines all your debts into one plan with a payoff date. With $12,400 spread across two cards and a loan, paying $550 a month using the avalanche method makes you debt-free in 28 months with $2,652 of interest. Paying only the minimums ($340 a month) takes 56 months and $6,507 of interest — the same debts, at nearly two and a half times the interest cost.",
    howItWorks: [
      "Add each debt as a row: balance, APR and minimum payment. Set the total monthly amount you can commit. The calculator pays every minimum, directs the surplus at one target debt at a time (highest APR under avalanche, smallest balance under snowball), and rolls freed payments into the next target as debts clear.",
      "The output that matters is the debt-free date and the total interest under your chosen budget. Then change the budget by $50 either way and watch the date move — the relationship is steep, because extra payments cut principal, which cuts next month's interest, which frees more principal. Small permanent increases beat occasional heroic ones.",
      "Two disciplines make the plan real. Stop adding to the balances — a payoff plan run alongside new card spending is a treadmill. And keep a starter emergency fund, even $1,000, so the first surprise does not go back on a card at 26%.",
    ],
    formula: "Simulated month by month across all debts: interest = balance × APR ÷ 12 per debt; minimums paid first; surplus to the target debt (highest APR or smallest balance). Debt-free date = first month all balances reach zero; total cost = sum of all interest.",
    example: {
      title: "Worked example: $12,400 across three debts, $550 a month",
      body: "Card A: $3,200 at 26%, minimum $85. Card B: $5,800 at 19%, minimum $145. Personal loan: $3,400 at 10%, minimum $110. Minimums total $340; the plan commits $550, so $210 attacks the 26% card first. Result: debt-free in 28 months, total interest $2,652. Pay minimums only and the same debts take 56 months and $6,507 of interest. The extra $210 a month saves $3,855 and returns two years and four months of payment-free life.",
    },
    faqs: [
      {
        question: "Avalanche or snowball — which should I pick here?",
        answer:
          "Avalanche (highest APR first) is always the cheapest; the calculator shows the exact interest difference for your debts. In the worked example the gap between methods is a few hundred dollars because the highest-rate debt is also small. If the difference is under about $300 and an early cleared account would keep you motivated, snowball is a reasonable purchase. If the gap is in the thousands, take the avalanche.",
      },
      {
        question: "How much should my monthly payoff budget be?",
        answer:
          "Start from your budget's real surplus: income minus essential spending and minimum payments. Commit an amount you can sustain in a bad month, not your best month — plans fail by abandonment, not by arithmetic. A useful floor: your minimums plus at least 10% of the total balance's monthly interest bill redirected to principal.",
      },
      {
        question: "Should I use savings to pay off debt in one go?",
        answer:
          "Above a basic emergency buffer, usually yes for high-APR debt: savings earning 4.5% cannot compete with a card charging 26%. Keep one month of essentials in cash, direct the rest at the highest-rate balance, and rebuild savings once the debt is gone — the freed payments rebuild it faster than you expect.",
      },
      {
        question: "Does a debt payoff plan affect my credit score?",
        answer:
          "Positively, in most cases. Paying down revolving balances lowers utilisation, a major scoring factor, and a run of on-time payments builds history. The score dips to avoid come from closing old cards (keep no-fee cards open), missing a minimum while focusing elsewhere (never do this — the plan pays every minimum), and new hard inquiries from consolidation loans.",
      },
    ],
  },

  "loans/debt-consolidation-calculator": {
    quickAnswer:
      "A debt consolidation calculator tests whether one new loan beats your current debts. Rolling $18,500 of card balances at 24% APR — costing $9,937 of interest at $620 a month — into a consolidation loan at 10.5% over 48 months cuts the payment to $473.66 and total interest to $4,236: a saving of about $5,701, provided the cards stay at zero afterwards.",
    howItWorks: [
      "Enter your current debts (or their balance-weighted average APR) and what you currently pay monthly, then the consolidation loan's amount, APR, term and any origination fee. The calculator prices both paths to zero and compares total interest and payoff dates on equal terms.",
      "Compare at the same payoff horizon as well as at the quoted one. A consolidation loan can show a lower payment purely by stretching the term — 48 months against debts you were clearing in 46 — which is not a saving, just a slower schedule. The honest check is total interest at a similar end date.",
      "Add the fee. Origination fees of 1% to 8% are common on consolidation loans and are usually withheld from the proceeds: on $18,500, a 3% fee is $555, so you receive $17,945 toward $18,500 of debt. The calculator's comparison should use the APR, which already reflects the fee, or net the fee off the saving.",
    ],
    formula: "Current path: simulate balances at their APRs with your current total payment. New path: payment = Loan × [r(1 + r)^n] ÷ [(1 + r)^n − 1]; total interest = (payment × n) − loan. Saving = current total interest − new total interest − any fee not already in the APR.",
    example: {
      title: "Worked example: $18,500 of cards into one loan",
      body: "Current: $18,500 at a blended 24% APR, paying $620 a month — debt-free in 46 months, interest $9,937. Consolidation: $18,500 at 10.5% APR over 48 months — payment $473.66, total interest $4,236. Headline saving: $5,701, plus a payment $146 a month lower. With a 3% origination fee ($555) the net saving is about $5,146. Pay the loan at the old $620 a month instead and it clears in about 35 months with roughly $3,034 of interest — the best version of the deal.",
    },
    faqs: [
      {
        question: "What rate do I need for consolidation to be worth it?",
        answer:
          "The new APR must be meaningfully below your blended card APR — as a working rule, at least 5 points lower after fees — and the term must not stretch so far that interest accumulates back. The calculator settles it exactly for your numbers. At card APRs around 24%, borrowers with fair-to-good credit commonly qualify for 10% to 16%, which usually passes the test comfortably.",
      },
      {
        question: "Why do people end up worse off after consolidating?",
        answer:
          "The freed credit cards get used again. The loan is then added to new card balances instead of replacing them — total debt rises and the household is worse off than before consolidating. The behavioural fix is part of the product: close or freeze the cards, or at minimum remove them from wallets and saved payment details, before the loan funds.",
      },
      {
        question: "Consolidation loan or balance transfer card?",
        answer:
          "For balances you can clear inside 12 to 21 months, a 0% balance transfer (fee 3% to 5%) is usually cheaper — the interest cost is just the fee. For larger balances needing 3 to 5 years, the fixed loan wins because the transfer's rate reverts to a standard card APR on whatever remains. Run both in the calculator with your realistic monthly payment.",
      },
      {
        question: "Does consolidation hurt my credit score?",
        answer:
          "Briefly, through the application inquiry and the new account. Then usually the opposite: paying cards to zero with an installment loan slashes revolving utilisation, which often raises the score within a cycle or two. The lasting effect depends on the cards staying paid off — maxing them again damages both the score and the finances the loan was meant to repair.",
      },
    ],
  },

  "loans/debt-to-income-ratio-calculator": {
    quickAnswer:
      "Your debt-to-income ratio is your monthly debt payments divided by your gross monthly income — the first number a mortgage lender checks. With gross pay of $7,500 a month and $2,810 of housing and debt payments, your DTI is 37.5%: inside most lending limits, but above the 36% line lenders prefer. The housing-only (front-end) ratio here is 26%.",
    howItWorks: [
      "Add up monthly debt payments as a lender counts them: the full housing payment (principal, interest, tax, insurance, HOA), car loans, student loans, minimum payments on credit cards, personal loans and any court-ordered payments. Divide by gross monthly income — before tax, because that is the lender convention, generous as it feels.",
      "Two ratios come out. The front-end ratio counts housing only; lenders look for roughly 28% or less. The back-end (total) ratio counts everything; conventional lending commonly caps it around 43% to 50% depending on the programme and compensating factors like reserves and credit score, with 36% the comfortable zone.",
      "What is not counted surprises people: utilities, groceries, insurance premiums (other than those inside the housing payment), subscriptions and rent (unless you are applying while renting and it appears as an obligation). Only debts on the credit report and the application count — which is why a $180 card minimum payment matters more to your mortgage than a $400 grocery bill.",
    ],
    formula: "Front-end DTI = monthly housing costs ÷ gross monthly income × 100. Back-end DTI = (housing costs + all monthly debt payments) ÷ gross monthly income × 100.",
    example: {
      title: "Worked example: $90,000 salary, applying for a mortgage",
      body: "Gross monthly income: $7,500. Payments: housing (PITI and HOA) $1,950, car loan $420, credit card minimums $180, student loan $260 — total $2,810. Back-end DTI = $2,810 ÷ $7,500 = 37.5%. Front-end = $1,950 ÷ $7,500 = 26%. Paying off the car loan before applying removes $420 and drops the back-end ratio to 31.9% — often a better use of cash than a slightly larger down payment, because it also raises the loan amount the ratio allows.",
    },
    faqs: [
      {
        question: "What DTI do I need to qualify for a mortgage?",
        answer:
          "It varies by programme. Conventional loans commonly allow up to about 45% to 50% back-end with strong credit and reserves; FHA is more flexible still in automated approvals, while many lenders overlay their own caps around 43% to 50%. Above those ranges, approval gets difficult regardless of income size. Government and lender guidelines change — treat these as planning figures, not guarantees.",
      },
      {
        question: "How can I lower my DTI quickly?",
        answer:
          "Pay off small installment debts outright — removing a $420 car payment helps more than paying $10,000 off a card balance whose minimum only falls slightly. Lenders often exclude an installment debt with under 10 payments remaining. Increasing documented income (a second job held for two years, rental income) counts too, but cannot be manufactured quickly.",
      },
      {
        question: "Do lenders use gross or net income for DTI?",
        answer:
          "Gross. It is the industry convention and flatters the borrower. For your own budgeting you should also run the ratio on take-home pay: the worked example's 37.5% of gross is likely around 48% of net, which is the share of actual cash committed before food, fuel or anything else — the figure that decides whether the budget breathes.",
      },
      {
        question: "Does DTI affect my credit score?",
        answer:
          "Not directly — income is not part of a credit report, so the ratio never appears in scoring. But the ingredients overlap: high card balances raise both your utilisation (lowering your score) and your minimum payments (raising your DTI). Paying balances down improves both numbers at once, which is why it is the standard pre-mortgage advice.",
      },
    ],
  },

  "loans/apr-calculator": {
    quickAnswer:
      "An APR calculator works out the true annual cost of a loan including its fees. A $20,000 loan at a 9% interest rate with $800 of upfront fees has payments of $497.70 a month over 4 years — but because you only receive $19,200, the APR is 11.16%. The 2.16-point gap between rate and APR is what the fees cost you, and it is why APR is the only fair comparison between loans.",
    howItWorks: [
      "Enter the loan amount, the stated interest rate, the term and every upfront cost: origination fees, documentation and processing charges, and any prepaid finance charges. The calculator computes the payment from the stated rate on the full amount, then solves for the rate that equates those payments with the net amount you actually receive — that rate is the APR.",
      "The shorter the loan, the harder fees bite. The same $800 of fees adds about 2.2 points to a 4-year loan's APR but would add roughly 4 points on a 2-year loan, because the fee is spread over fewer payments. On long mortgages, points and fees dilute to fractions of a point.",
      "Use APR to compare, then check the total repayment as a sanity check — two loans with the same APR but different terms cost very different amounts in total interest. APR is a rate, not a price tag.",
    ],
    formula: "Payment is set by the note rate: Payment = Amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1]. APR is the monthly rate i solving: Amount − fees = Payment × [1 − (1 + i)^(−n)] ÷ i, annualised as i × 12. The equation has no closed form; the calculator solves it by iteration (bisection).",
    example: {
      title: "Worked example: $20,000 at 9% with $800 of fees, 48 months",
      body: "Payment on $20,000 at 9% over 48 months: $497.70. Fees of $800 are withheld, so the amount you effectively borrow is $19,200 while the payments are unchanged. Solving for the rate that discounts 48 payments of $497.70 back to $19,200 gives a monthly rate of about 0.93%, an APR of 11.16%. A competing loan at 10% with no fees would be cheaper despite the higher headline rate — the comparison APR exists to catch.",
    },
    faqs: [
      {
        question: "Why is APR higher than the interest rate?",
        answer:
          "APR includes most upfront finance charges spread over the loan's life, while the interest rate does not. The two are equal only on a fee-free loan. US law (the Truth in Lending Act and Regulation Z) defines which charges count as finance charges, and lenders must disclose the resulting APR before you sign — compare that disclosed figure across offers.",
      },
      {
        question: "Does APR include every cost of the loan?",
        answer:
          "No. It captures lender and broker fees and most prepaid finance charges, but some third-party costs (certain title, appraisal or notary fees, depending on the loan type) sit outside it, and late fees and other contingent charges are excluded by definition. Read the full fee schedule alongside the APR, especially on mortgages where the Loan Estimate separates lender fees from other closing costs.",
      },
      {
        question: "Why do credit cards quote APR differently?",
        answer:
          "Card APR is simply the annualised interest rate — there are no origination fees to fold in, and annual fees are not included in card APR. It is a purchase or cash-advance rate applied to average daily balances. That is why a card's 25% APR and a loan's 11% APR are not quite the same species of number, even though both describe interest cost.",
      },
      {
        question: "Is the lowest APR always the best loan?",
        answer:
          "For identical amounts and terms, yes. Across different terms, not necessarily: a 5-year loan at 10% APR costs less total interest than a 7-year loan at 9% APR, because you pay it for two fewer years. Decide the term from your monthly budget first, then choose the lowest APR within that term, and confirm with the total repayment figure.",
      },
    ],
  },
};
