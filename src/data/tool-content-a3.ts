import type { ToolContentEntry } from "./tool-content";

export const TOOL_CONTENT_A3: Record<string, ToolContentEntry> = {
  "real-estate/flipping-profit-margin-calculator": {
    quickAnswer:
      "A flipping calculator totals every cost of a buy-renovate-sell project against the expected resale value. Buy at $230,000, spend $50,000 on rehab, hold 6 months at $1,200 a month and sell at a $400,000 after-repair value, and the projected profit is $76,200 — a 19.1% margin on the sale price, before tax. The purchase sits exactly at the 70% rule ceiling of $230,000.",
    howItWorks: [
      "Enter the after-repair value (ARV), the purchase price, the rehab budget, the hold period in months, the monthly holding cost and the selling cost as a percentage of ARV. The calculator adds buying closing costs at a fixed 2% of the purchase price, then nets everything against the ARV to give the projected profit, the return on cash invested and the profit margin.",
      "The 70% rule is the discipline the tool checks first: never offer more than 70% of ARV minus rehab costs. The 30% gap is meant to absorb buying, holding and selling costs plus profit. In the example the $230,000 purchase is exactly at the ceiling, so the deal passes the rule with no room to spare — any price above it fails before the detailed maths even starts.",
      "Holding costs and selling costs are the lines new flippers undercount. Six months at $1,200 a month — loan interest, tax, insurance, utilities — is $7,200, and every extra month of rehab or marketing adds another $1,200. Selling at 8% of ARV costs $32,000 here, the largest single cost after the rehab itself, because commission and closing costs scale with the sale price.",
      "Stress the two inputs that can sink the deal. A 20% rehab overrun adds $10,000 and cuts profit to $66,200 — painful but survivable. A 10% miss on ARV, selling at $360,000 instead of $400,000, cuts profit to $39,400, nearly half gone. ARV evidence from comparable renovated sales matters more than rehab optimism, because an ARV error hits the whole project at once.",
      "Remember the profit shown is before tax, and flip profit is taxed harshly. A regular flipper is a dealer in the IRS's eyes: the property is inventory, not a capital asset, so profit is ordinary income on Schedule C plus self-employment tax of 15.3% on 92.35% of net earnings, with the Social Security portion capped at the $184,500 wage base for 2026. On $76,200 of profit that tax alone is about $10,767.",
    ],
    formula: "Projected profit = ARV − purchase price − rehab − (holding cost per month × months held) − buying costs (2% of purchase) − selling costs (% of ARV). 70% rule maximum offer = (ARV × 0.70) − rehab. Margin = profit ÷ ARV; ROI = profit ÷ total cash in.",
    example: {
      title: "Worked example: $230,000 purchase, $400,000 ARV",
      body: "Costs: purchase $230,000; rehab $50,000; holding 6 months × $1,200 = $7,200; buying costs at 2% = $4,600; selling costs at 8% of ARV = $32,000. Total cash in: $291,800. Sale at $400,000 leaves a projected profit of $76,200, a 19.1% margin on the sale price and a 26.1% return on the cash invested, over roughly 7 months. The purchase price equals the 70% rule ceiling exactly, so the deal has no price cushion: a slower sale that adds two months of holding costs takes another $2,400 straight off the profit.",
    },
    faqs: [
      {
        question: "What profit margin should a flip target?",
        answer:
          "Experienced flippers commonly target at least 10% to 15% of the sale price as profit after all costs, because the plan will meet surprises — hidden defects, permit delays, a softening market. Below that, one bad surprise turns the project into unpaid work. The 70% rule exists to enforce roughly this cushion at the offer stage, before emotion enters the negotiation.",
      },
      {
        question: "How is flip income taxed?",
        answer:
          "As ordinary business income: property held primarily for sale is inventory, not a capital asset, so profit is taxed at ordinary income tax rates (10% to 37% for 2026) plus self-employment tax of 15.3% on 92.35% of net earnings. Long-term capital gains rates do not apply, and dealer property cannot use a 1031 like-kind exchange. Get tax advice before the first project.",
      },
      {
        question: "What ARV should I use?",
        answer:
          "The value supported by recent sales of genuinely comparable renovated properties nearby — adjusted for size, condition and date — ideally pulled from the same data an appraiser will use. Your buyer's lender will order an appraisal that tests it. Using the highest sale in the neighbourhood as the ARV is the most common way flip projections fail.",
      },
      {
        question: "What does the 70% rule leave out?",
        answer:
          "Financing structure and tax. The rule assumes your holding cost captures the loan; a hard-money loan with points and a high rate can make the true holding cost far larger than the monthly figure you entered. And the rule says nothing about tax — dealer profit faces income tax plus self-employment tax. Use the rule as a first filter, then run the full calculator and a tax estimate before offering.",
      },
    ],
  },

  "real-estate/brrrr-strategy-analyzer": {
    quickAnswer:
      "BRRRR — buy, rehab, rent, refinance, repeat — aims to recover most or all of your cash at the refinance step while keeping the property. Buy at $180,000, spend $60,000 on rehab, achieve a $320,000 valuation, and a 75% refinance returns a $240,000 loan: after $248,000 of total costs and $5,000 of refinance fees, only $13,000 of your cash is left in the deal, and the property rents with about $53 a month of cash flow.",
    howItWorks: [
      "Enter the purchase price, rehab cost and holding and buying costs to get your all-in basis. Then enter the after-repair value and the refinance terms — loan-to-value, rate and closing costs. The calculator works out the new loan, the cash recovered, and the cash left in the deal, which is the number the whole strategy turns on.",
      "Next it tests whether the property works as a rental under the new, larger loan: rent minus the new 30-year mortgage payment and the running expenses you enter (tax, insurance, vacancy, management). A refinance that returns your cash but leaves negative monthly cash flow has not finished the job — it has converted a flip into a subsidised liability.",
      "The binding constraint is the appraisal at refinance. Lenders lend on the appraised value, not your estimate, and many require a seasoning period of ownership before they will lend on the improved value rather than your purchase price. Model the refinance at a lower LTV and a value 10% below your ARV as the stress case before committing.",
      "Watch the cash-on-cash figure the calculator reports alongside the cash left in. A small amount left in the deal can still produce a weak return if the cash flow is thin: in the example, $53 a month on $13,000 left in is only about 4.9% a year. The strategy's real payoff is the $80,000 of equity retained and the freed capital funding the next deal, not the monthly rent cheque.",
      "If the appraisal disappoints, the numbers move in two directions at once. At a $288,000 valuation the 75% loan falls to $216,000, leaving $37,000 of cash trapped — but the smaller loan also cuts the mortgage payment, so cash flow rises to about $213 a month. A failed refinance is not always a failed investment; it is a different one, with more capital tied up and better monthly income.",
    ],
    formula: "Cash left in deal = (purchase + rehab + holding and buying costs + refinance costs) − refinance loan. Refinance loan = LTV × appraised value. Cash flow after refinance = rent − new 30-year mortgage payment − monthly operating expenses. Equity after refinance = appraised value − refinance loan.",
    example: {
      title: "Worked example: $180,000 buy to $320,000 value",
      body: "All-in basis: $180,000 purchase + $60,000 rehab + $8,000 holding and buying costs = $248,000. Refinance at 75% of the $320,000 ARV gives a $240,000 loan; refinance closing costs are $5,000. Cash left in the deal: $248,000 + $5,000 − $240,000 = $13,000. Equity retained: $80,000. The new payment at 7% over 30 years is $1,596.73. Rent of $2,250 minus that payment and $600 of monthly expenses leaves cash flow of about $53 a month — positive, but with no room for a major repair in year one.",
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
          "Many lenders require you to own the property for a period of months before they will lend against the appraised (post-rehab) value; before that, they lend against your purchase price. The exact period varies by lender and loan type, and some portfolio lenders and DSCR loan products are more flexible, at higher rates. Price the seasoning period into the deal from the start — it is holding-cost time.",
      },
      {
        question: "What is a DSCR loan and why do BRRRR investors use it?",
        answer:
          "A debt-service-coverage-ratio loan is underwritten on the property's rent versus its payment rather than the borrower's personal income, and it can lend to LLCs. It solves the income-documentation problem for investors with many properties, at higher rates than conventional loans. The lender still wants the rent to cover the payment with room to spare — a thin cash flow fails this test too.",
      },
      {
        question: "What is the biggest risk in BRRRR?",
        answer:
          "The appraisal gap: if the refinance valuation comes in at $288,000 instead of $320,000 in the example, the 75% loan is $216,000 and $37,000 of cash stays trapped in the deal. Second is rate risk between purchase and refinance — the strategy is underwritten twice, once by you and once by the market, months apart.",
      },
    ],
  },

  "real-estate/airbnb-arbitrage-margin-calculator": {
    quickAnswer:
      "Rental arbitrage means leasing a property long-term and letting it short-term, keeping the spread. This calculator prices that spread: at a $150 average daily rate and 70% occupancy, a unit grosses $3,150 a month; after $1,800 of rent, utilities, platform fees, cleaning and supplies, the margin is about $361 a month — 11.4% of revenue. But on Airbnb's 15.5% host-only fee, the same unit loses about $33 a month.",
    howItWorks: [
      "Enter the average daily rate (ADR), expected occupancy, average stay length, platform fee, your monthly housing costs (rent, utilities) and per-turnover costs (cleaning, supplies). The calculator converts ADR and occupancy into monthly revenue — ADR × 30 nights × occupancy — then charges turnovers based on the average stay, and reports RevPAR, the revenue per available room.",
      "The platform fee is the input that changed most in 2026. Airbnb is moving hosts from the split fee — 3% from the host, with guests paying a separate 14.1% to 16.5% — to a single host-only fee of 15.5% for most hosts, mandatory for listings connected through property management software since October 2025 and rolling out to other hosts through late 2026. Check your account's setting before entering a fee.",
      "Turnover costs are what new operators miss. A 3-night average stay at 70% occupancy means 7 cleans a month. The calculator treats cleaning as a pure cost: if you charge guests a cleaning fee, that income is not modelled, so add it to the profit yourself. Note the fee also applies to cleaning fees you charge, since Airbnb's fee is levied on the booking subtotal, not just the nightly rate.",
      "Read the margin as a percentage and in dollars, then stress occupancy down 15 points. Short-term demand is seasonal in most markets; the rent is not. A unit that profits at 70% occupancy and loses at 55% needs either a lower rent, a higher ADR market, or a reserve to survive the weak season — and the calculator's owned-property mode lets you run the same numbers with PITI and HOA instead of rent.",
      "The owned mode changes the decision, not the arithmetic. If you own the unit, the housing line becomes your monthly PITI plus HOA, and the profit is measured against a mortgage you would pay anyway — but the same occupancy and fee sensitivity applies, and the furnishing cost still has to be recovered from the margin before the unit is genuinely profitable.",
    ],
    formula: "Monthly revenue = ADR × booked nights, where booked nights = 30 × occupancy %. Turnovers = booked nights ÷ average stay. Profit = revenue − (platform fee % × revenue) − (cleaning cost × turnovers) − housing − utilities − supplies. Margin = profit ÷ revenue. RevPAR = ADR × occupancy %.",
    example: {
      title: "Worked example: $150 ADR, 70% occupancy, 3-night average stay",
      body: "Booked nights: 21 a month. Gross revenue: $150 × 21 = $3,150. Platform fee at 3%: $94.50. Turnovers: 21 ÷ 3 = 7 cleans × $75 = $525. Supplies and restocking: $120. Housing: rent $1,800 and utilities $250. Profit = $3,150 − $1,800 − $250 − $94.50 − $525 − $120 = $360.50, an 11.4% margin. Switch the platform fee to Airbnb's 15.5% host-only rate and the fee becomes $488.25 — the month turns into a $33.25 loss. Drop occupancy to 55% at the 3% fee and the same cost base loses about $182.",
    },
    faqs: [
      {
        question: "Is rental arbitrage legal?",
        answer:
          "It depends on three layers: your lease must permit subletting or short-term rental use (get the landlord's written consent — most standard leases prohibit it), local law may require a short-term rental permit or ban the activity in some zones, and platforms and buildings may impose their own rules, including annual night caps. Verify all three before signing a lease for this purpose.",
      },
      {
        question: "What occupancy rate should I assume?",
        answer:
          "Use the market's actual data, not the listing's best month. Mature leisure markets often run 55% to 70% annual occupancy; urban business markets vary with events and season. Annualise: a unit at 85% in peak season and 40% off-season averages near 60%, and the annual figure is the one that has to cover 12 months of rent.",
      },
      {
        question: "What does Airbnb charge hosts in 2026?",
        answer:
          "Two structures exist. Under the split fee, most hosts pay 3% and guests pay a separate 14.1% to 16.5% of the booking subtotal. Under the host-only fee, most hosts pay 15.5% — some 14% to 16% — and guests pay nothing extra. Airbnb is moving home hosts to the single fee through late 2026; once you switch, you cannot switch back. The fee applies to the subtotal including cleaning fees.",
      },
      {
        question: "What costs does this calculator not capture?",
        answer:
          "Furnishing and setup (commonly $10,000 to $30,000 for a quality unit, amortised over its life), insurance suitable for short-term letting (a standard landlord policy may not cover it), income taxes, and your own management time. Price the setup cost into the decision: at the example's $361 a month, an $18,000 setup takes about 50 months to recover.",
      },
    ],
  },

  "real-estate/capex-reserve-planner": {
    quickAnswer:
      "A CapEx reserve planner spreads the cost of big, infrequent repairs over their lifespan so you save monthly instead of being ambushed. A typical single-family rental needs about $246 a month per unit on the planner's default schedule: roof $12,000 over 25 years ($40 a month), HVAC $8,000 over 15 years ($44), plus water heater, appliances, paint, flooring, plumbing and driveway. Skip the reserve and the 'profitable' years are borrowing from the roof year.",
    howItWorks: [
      "List each major component with its replacement cost and expected lifespan: roof, HVAC, water heater, appliances, exterior paint, flooring, plumbing and driveway. The planner divides each cost by its lifespan to get the annual reserve for that item, then totals them per property and multiplies by your unit count across the portfolio.",
      "Use lifespans from a published source rather than guessing. The NAHB and Bank of America life-expectancy study puts an asphalt shingle roof at about 20 years, a furnace at 15 to 20, a heat pump at about 16, central air conditioning at 10 to 15 and a tank water heater at about 10 — though the study itself warns these are general guidelines, and climate and maintenance move them materially.",
      "Adjust for age, not just lifespan. A roof with 5 years of life left does not need cost ÷ 25 — it needs cost ÷ 5 from you, unless the previous owner funded the reserve (they did not; you bought their unfunded liability, which is why purchase inspections price remaining life). Where the planner allows lifespan inputs, shorten them for mid-life components; otherwise treat an older building as needing a higher monthly figure than the straight average.",
      "Hold the reserve in a separate account and do not count it as cash flow. The discipline is the product: landlords who spend the reserve in good years report excellent returns until two systems fail in the same winter. The planner's total replacement exposure figure — $44,000 on the default schedule — is the bill the reserve exists to meet.",
      "Scale the result honestly across a portfolio. Four similar units need about $985 a month of reserves, not four times a number you rounded down. Shared systems change the maths in the other direction: one roof over a fourplex is one roof, not four, so enter the building's actual component list rather than multiplying a single-family schedule blindly.",
    ],
    formula: "Annual reserve per item = Replacement cost ÷ Lifespan in years. Monthly reserve = total annual reserve ÷ 12 × number of units. Total replacement exposure = sum of all replacement costs × units. If an item has R years of life remaining and you start from zero, the catch-up reserve is replacement cost ÷ R per year.",
    example: {
      title: "Worked example: one single-family rental, default schedule",
      body: "Roof $12,000 ÷ 25 years = $480 a year. HVAC $8,000 ÷ 15 = $533. Water heater $1,500 ÷ 10 = $150. Appliances $4,000 ÷ 12 = $333. Exterior paint $5,000 ÷ 7 = $714. Flooring $6,000 ÷ 15 = $400. Plumbing $3,000 ÷ 25 = $120. Driveway $4,500 ÷ 20 = $225. Total replacement exposure: $44,000. Annual reserve: $2,956, which is $246.33 a month per unit. Own four similar units and the portfolio reserve is about $985 a month — a real line in the budget, which is precisely the planner's point.",
    },
    faqs: [
      {
        question: "What lifespans should I use for major components?",
        answer:
          "Standard estimates from the NAHB and Bank of America life-expectancy study: asphalt shingle roof about 20 years, furnace 15 to 20, heat pump about 16, central air conditioning 10 to 15, water heater about 10, appliances 10 to 17 depending on the item, carpet 8 to 10. Climate and maintenance move these materially — treat them as planning guidelines, not guarantees.",
      },
      {
        question: "Is CapEx the same as maintenance?",
        answer:
          "No, and conflating them understates costs. Maintenance is routine and small — repairs, servicing, minor replacements — often budgeted at about 5% of rent. CapEx is the large, infrequent replacement of whole systems. A property analysis needs both lines; many advertised cash-flow figures include neither correctly.",
      },
      {
        question: "Can I deduct CapEx reserves on my taxes?",
        answer:
          "No — reserves you set aside are not deductible; you cannot deduct money you still hold. When you replace a component, the cost is generally capitalised and depreciated — residential structural components over 27.5 years straight-line under IRS Publication 527 — with exceptions under the de minimis safe harbour ($2,500 per item without audited financial statements) and the small-taxpayer safe harbour. Keep receipts and consult a tax professional.",
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
      "A HELOC drawdown simulator shows both phases of a home equity line: the interest-only draw period and the amortising repayment that follows. Draw $100,000 at 8.5% and the draw-period payment is $708 a month — but when repayment begins over 20 years, the same balance costs $868 a month, and total repayment-phase interest is about $108,278. The simulator's job is to stop the first figure from fooling you.",
    howItWorks: [
      "Enter your home value, current mortgage balance and the lender's maximum combined loan-to-value to see the largest line available. Then enter the amount you plan to draw, the (variable) HELOC rate and the repayment term to model the payments. If the draw exceeds the available credit, the tool caps the results at the available maximum and warns you.",
      "During the draw period — commonly 10 years — you may borrow, repay and borrow again, and the required payment is usually interest only. The balance does not fall unless you pay extra. During repayment — commonly 15 to 20 years — the line closes and the balance amortises like a loan, which is why the payment jumps even if the rate never moves.",
      "The rate itself is the third risk: most HELOCs are variable, priced as prime plus a margin. Prime stood at 7.00% in November 2026, after the Federal Reserve raised its target range to 3.75% to 4.00% in September and held it in October; Bankrate's national average HELOC rate was 7.49% in early November 2026. A simulator run at today's rate is a snapshot; re-run it two points higher to see the payment you might actually be committing to.",
      "The repayment-phase interest total is the figure that should drive the decision, not the monthly payment. On a $100,000 draw at 8.5%, twenty years of repayment adds about $108,278 of interest — more than the amount borrowed. Shortening the repayment term to 15 years raises the payment to about $985 but cuts the interest to about $77,253, saving roughly $31,000 for $117 more a month.",
      "Check the combined loan-to-value after the draw as well as the payment. The example leaves the home at 66.7% combined LTV, which most lenders accept comfortably. A draw that pushes combined LTV toward 90% leaves little room if prices fall — and a lender can freeze or reduce a line if the home's value drops significantly, which is exactly when you would most want the money.",
    ],
    formula: "Credit limit = (Max combined LTV × home value) − mortgage balance. Interest-only payment = drawn amount × annual rate ÷ 12. Repayment payment = drawn amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1] over the repayment term. Total repayment interest = (repayment payment × months) − drawn amount.",
    example: {
      title: "Worked example: $600,000 home, $300,000 mortgage, $100,000 draw",
      body: "At an 85% max combined LTV, the credit ceiling is $510,000; minus the $300,000 mortgage, the largest line is $210,000. Draw $100,000 at 8.5%: the interest-only payment is $100,000 × 8.5% ÷ 12 = $708.33 a month, and the balance stays $100,000. When the draw period ends and the balance amortises over 20 years at the same rate, the payment becomes $867.82 and the interest over the repayment phase totals about $108,278. Ten years of interest-only payments ($85,000 if the balance never moved) bought no equity at all.",
    },
    faqs: [
      {
        question: "What is the current typical HELOC rate?",
        answer:
          "HELOCs price off the prime rate plus a margin, so they move with monetary policy. Prime was 7.00% in November 2026 and Bankrate's national average HELOC rate was 7.49% in early November. Your margin depends on credit score and combined LTV; the prime part is identical for everyone. Always model the payment at prime plus 2 points before drawing.",
      },
      {
        question: "Can the lender freeze or cut my HELOC?",
        answer:
          "Yes, in defined circumstances — most notably if the home's value falls significantly or your financial situation deteriorates materially. Lenders used this power widely in 2008–2009. A HELOC is therefore unreliable as a sole emergency reserve: keep cash savings as the primary buffer and treat the line as a secondary one.",
      },
      {
        question: "Is HELOC interest tax-deductible?",
        answer:
          "Only if the funds buy, build or substantially improve the home that secures the line, and only for taxpayers who itemise, within the mortgage debt limit of $750,000 for loans taken out after December 15, 2017 ($375,000 if married filing separately) — a limit the One Big Beautiful Bill Act made permanent. Interest on HELOC funds used for other spending is not deductible, whatever the lender's marketing implies.",
      },
      {
        question: "Should I pay more than interest-only during the draw period?",
        answer:
          "If you intend to carry the balance into repayment, yes — every dollar of principal paid during the draw period is a dollar that does not amortise at the higher repayment payment. In the example, paying the balance down to $60,000 before repayment cuts the 20-year repayment payment from $867.82 to about $521 and removes roughly $43,300 of repayment-phase interest.",
      },
    ],
  },

  "real-estate/house-hacking-roi-calculator": {
    quickAnswer:
      "House hacking means living in one unit of a multi-unit property while tenants rent the others. Buy a $450,000 duplex with 5% down, rent the other unit for $1,800, and your share of the $3,302 monthly PITI falls to about $1,652 — saving about $448 a month against renting at $2,100. Move out later and the property must stand on its own numbers, which the calculator tests separately.",
    howItWorks: [
      "Enter the purchase price, down payment, rate, tax and insurance, the rent from the other units, and what you would otherwise pay in rent. The calculator builds the full PITI payment on a 30-year fixed mortgage, adds the utilities you cover, subtracts tenant rent to get your effective housing cost, and compares it with renting.",
      "The owner-occupier advantage is the deposit: living in the property qualifies for owner-occupied financing — as little as 3.5% down on an FHA loan with a credit score of 580 or higher, for 1 to 4 units — where an investor would need 20% to 25%. That leverage is the strategy's engine and its risk: your cash invested is small, so returns on cash look large in both directions.",
      "Then judge the move-out case, because you will probably not live there forever. The calculator re-runs the property with your unit rented at market rate and no owner subsidy. Cash-on-cash after move-out is the investment verdict; the live-in figure is a housing-cost verdict. Both need to pass, and at the default inputs the move-out case does not: $3,400 of rent against $3,302 of PITI plus $150 of utilities leaves about minus $52 a month.",
      "For three- and four-unit purchases, FHA adds a self-sufficiency test that duplexes skip: 75% of the appraiser's market rent for all units, including the one you occupy, must cover the full monthly mortgage payment. FHA also lets lenders count about 75% of the rent from units you will not occupy as qualifying income, and requires three months of PITI in reserves after closing for three- and four-unit properties.",
      "Tax splits with the building. Rent from the other units is taxable income, against which you can deduct the rental share of expenses: a proportion of mortgage interest, tax, insurance, repairs and depreciation on the rented portion, reported on Schedule E. The depreciation shelters income now and is recaptured when you sell — and the owner-occupied share of the gain may qualify for the primary-residence exclusion, which the rental share does not.",
    ],
    formula: "Effective housing cost while house hacking = PITI + utilities you cover − rent from other units. PITI = principal and interest on a 30-year loan + tax ÷ 12 + insurance ÷ 12. Cash invested = down payment + closing costs (about 2% of price). Cash flow after move-out = (rent from all units) − PITI − utilities. Cash-on-cash = annual move-out cash flow ÷ cash invested.",
    example: {
      title: "Worked example: $450,000 duplex, 5% down, one unit rented at $1,800",
      body: "Down payment: $22,500. Loan: $427,500 at 6.5% over 30 years — principal and interest $2,702.09. Tax $5,400 a year ($450 a month) and insurance $1,800 a year ($150) bring PITI to $3,302.09. Add $150 of utilities and subtract the other unit's $1,800 rent, and your effective housing cost is $1,652.09 a month, against $2,100 to rent elsewhere — a saving of about $448 a month. Cash invested is $31,500 (deposit plus 2% closing). Move out and rent your unit at $1,600: total rent $3,400 against PITI of $3,302.09 plus $150 of utilities leaves about minus $52 a month — this deal works as subsidised housing first and as an investment only with rent growth.",
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
          "Often yes. Lenders commonly count about 75% of the rent from units you will not occupy (per leases or an appraiser's rent schedule) as qualifying income, which can substantially raise what you are approved for. FHA loans on 3- to 4-unit properties add a self-sufficiency test: the property's total rent, less 25% for vacancy and maintenance, must cover the full PITI payment.",
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
      "This calculator puts the same capital into two property strategies: a REIT investment compounding at a dividend yield plus appreciation, versus a leveraged physical rental. $100,000 in a REIT returning 9% a year in total becomes about $560,441 in 20 years. The same $100,000 as a 25% deposit on a $400,000 rental ends with about $807,128 — equity plus cash flow collected along the way — more, on these assumptions, in exchange for leverage, work and concentration in one building.",
    howItWorks: [
      "Enter the capital available, the REIT's dividend yield and expected appreciation (which compound together), and for the physical property: the deposit percentage, rent, mortgage rate, appreciation and operating expenses. The calculator projects both positions to the same end date and names the winner on those assumptions.",
      "The physical property's advantage is arithmetic, not magic: your $100,000 controls a $400,000 asset, so 4% appreciation is $16,000 in the first year alone — 16% on your money before costs. The mortgage payment and expenses eat most of the rent early on; the end position is mostly leveraged appreciation and forced principal repayment over two decades.",
      "Read the physical model's assumptions before trusting its verdict. Rent grows 2% a year, tax and insurance are estimated at 1.5% of the purchase price a year, operating expenses are a percentage of rent, and the cash flow is accumulated rather than reinvested. On the default inputs the first month's cash flow is actually negative — about minus $89 — and only turns comfortable as rent grows.",
      "The REIT's advantages do not fit in the projection: instant diversification across hundreds of properties, daily liquidity, no tenants, no maintenance, and no personal liability for a mortgage. The comparison answers 'which ends bigger on these assumptions' — the assumptions, especially physical appreciation and the absence of major repairs, deserve your scepticism.",
      "Stress the appreciation input, because it decides the contest. At 0% property appreciation the physical position ends at about $330,679 — equity of about $237,989 plus the same cash flow — and the REIT wins by roughly $230,000. The leveraged path's edge is almost entirely a bet that the single property you picked appreciates at or above the rate you typed in.",
    ],
    formula: "REIT final value = Capital × (1 + dividend yield + appreciation)^years, with dividends reinvested. Physical end equity = appreciated value − remaining loan balance, where value = price × (1 + appreciation)^years and the balance follows the amortisation schedule; cumulative cash flow (rent growing 2% a year, less expenses, tax and insurance at 1.5% of price, less the mortgage payment) is added to show the full position.",
    example: {
      title: "Worked example: $100,000 over 20 years",
      body: "REIT path: 4% dividend yield reinvested plus 5% appreciation is a 9% total return. $100,000 × 1.09^20 = $560,441. Physical path: $100,000 is 25% down on a $400,000 property; the $300,000 mortgage at 6% costs $1,798.65 a month. Rent starts at $3,400 and grows 2% a year; after expenses at 35% of rent, tax and insurance of $500 a month and the mortgage payment, cumulative cash flow over 20 years is about $92,690. At 4% appreciation the property is worth about $876,449 in 20 years and the loan balance has fallen to about $162,011, leaving equity of about $714,439. Physical ends at about $807,128 — ahead by roughly $247,000, driven almost entirely by leveraged appreciation, the input least in your control.",
    },
    faqs: [
      {
        question: "How are REIT dividends taxed?",
        answer:
          "Most REIT dividends are taxed as ordinary income — REITs pass income through rather than paying corporate tax, and the dividends generally do not qualify for the lower capital gains rate — with a 20% deduction for qualified REIT dividends under Section 199A, now permanent. Holding REITs in an IRA or 401(k) shelters the income entirely, which is why they are commonly held in retirement accounts.",
      },
      {
        question: "What total return have REITs actually delivered?",
        answer:
          "The FTSE Nareit All Equity REITs Index returned 8.94% a year over 25 years to September 2026 and 11.63% a year over 50 years, but only about 6.4% a year over the 10 years to May 2026 — and the path included a 24.9% fall in 2022 and a 41.3% rise in 2021. A planning assumption of 7% to 9% total return is more prudent than extrapolating the best decades.",
      },
      {
        question: "What does the comparison leave out?",
        answer:
          "Your labour (a physical rental consumes real hours; valuing them at any wage narrows the gap), transaction costs of about 2% to buy and 6% to sell, major capital repairs, vacancy shocks, and the risk difference between one building and a diversified portfolio. It also ignores financing risk: the physical path can go underwater; the REIT path cannot go below zero. Taxes are ignored on both sides.",
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
      "Property tax is not charged on your home's full market value in most places — it is charged on an assessed value, minus exemptions, at the local tax rate. A $500,000 home assessed at 100% of value, with a $50,000 homestead exemption, has a taxable value of $450,000; at a 1.25% rate the annual tax is $5,625, or about $469 a month in escrow. The effective rate on the true value is 1.13%.",
    howItWorks: [
      "Enter the market value, the assessment ratio (the percentage of market value your jurisdiction assesses), any exemptions you qualify for, and the tax rate. The calculator applies the ratio, subtracts exemptions and multiplies by the rate — the same sequence your tax bill follows — and shows the monthly escrow figure a lender would collect.",
      "Rates are quoted two ways. A percentage rate applies directly to taxable value. A mill rate is dollars per $1,000 of taxable value — 12.5 mills is the same as 1.25%, and the calculator converts between the two. Total tax is usually the sum of several overlapping levies: county, city, school district (often the largest) and special districts, each with its own rate.",
      "The effective rate — your actual tax divided by the market value — is the figure for comparing locations: in the example it is 1.13%, below the headline 1.25%, because of the exemption. Statewide, effective rates on owner-occupied housing run from about 0.27% in Hawaii to 2.23% in New Jersey in the Tax Foundation's analysis of 2023 Census data — a difference of $9,800 a year on the same $500,000 home.",
      "The assessment ratio is where two identical homes in different states diverge. Some jurisdictions assess at 100% of market value; others assess a fraction — 80%, 70%, or less — and then apply a higher nominal rate to the smaller base. Only the effective rate, tax divided by true value, lets you compare them, which is why the calculator shows the assessed and taxable values separately.",
      "Exemptions are the part of the bill you control. A $50,000 homestead exemption saves $625 a year at a 1.25% rate in the example, and many jurisdictions add larger exemptions for seniors, veterans and disabled homeowners. You normally must apply — the exemption is rarely automatic — and it is one of the most commonly missed savings in property tax.",
    ],
    formula: "Assessed value = Market value × assessment ratio. Taxable value = assessed value − exemptions (floored at zero). Annual tax = taxable value × tax rate (or × mill rate ÷ 1,000). Effective rate = annual tax ÷ market value. Monthly escrow = annual tax ÷ 12.",
    example: {
      title: "Worked example: $500,000 market value, 100% assessment ratio",
      body: "Assessed value: $500,000 × 100% = $500,000. Less the $50,000 homestead exemption: taxable value $450,000. At a 1.25% combined rate (12.5 mills): $450,000 × 1.25% = $5,625 a year, which a lender escrows at $468.75 a month. Effective rate on the true value: $5,625 ÷ $500,000 = 1.13%. Remove the exemption and the bill rises by $625 — exemptions are worth filing for. The same home at New Jersey's 2.23% effective rate would cost $11,150 a year; at Hawaii's 0.27%, $1,350.",
    },
    faqs: [
      {
        question: "What is a homestead exemption and who gets one?",
        answer:
          "A reduction in taxable value for your primary residence, offered by most states and many localities. Amounts range from a flat sum to a percentage of value, and some jurisdictions add larger exemptions for seniors, veterans and disabled homeowners. You normally must apply — it is rarely automatic — and it is one of the most commonly missed savings in property tax.",
      },
      {
        question: "Can I appeal my property tax assessment?",
        answer:
          "Yes. Assessments can be appealed, usually within a short window after notices are mailed each year. Successful appeals show the assessed value exceeds market value — using comparable recent sales — or that the property record contains errors (wrong square footage, wrong features). Winning reduces the assessed value, and therefore the tax, until the next reassessment cycle.",
      },
      {
        question: "Why did my tax bill jump after I bought the house?",
        answer:
          "In many states the assessed value is capped or grows slowly while an owner stays put (California's Proposition 13 caps growth at 2% a year; homestead caps exist in Florida, Texas and elsewhere). A sale resets the value to the purchase price, so the new owner inherits a bill based on current value while the seller paid on a years-old figure. Budget for the reset amount, not the seller's bill.",
      },
      {
        question: "Is property tax deductible?",
        answer:
          "For itemisers, state and local taxes including property tax are deductible up to a combined cap of $40,400 for tax year 2026 ($20,200 if married filing separately), phasing down above $505,000 of modified adjusted gross income. Most homeowners take the standard deduction — $16,100 single and $32,200 married filing jointly for 2026 — in which case the property tax produces no federal tax benefit.",
      },
    ],
  },

  "loans/loan-calculator": {
    quickAnswer:
      "A loan calculator turns an amount, a rate and a term into the monthly payment and total cost of borrowing. Borrow $25,000 at 7.5% over 5 years and the payment is $500.95 a month; you repay $30,057 in total, so the loan costs $5,057 in interest. Extending the term lowers the payment but always raises the total interest.",
    howItWorks: [
      "Enter the loan amount, annual interest rate and term. The calculator solves for the fixed monthly payment that repays the loan exactly by the final month, with interest charged each month on the balance then outstanding. It also shows the payoff date and the share of your total repayment that is interest rather than principal.",
      "Use the interest total, not the payment, to compare terms. On the example loan, stretching from 5 to 7 years drops the payment by about $117 a month but adds roughly $2,153 of interest; shortening to 3 years raises the payment to $777.66 but cuts interest to $2,996. Lenders present the payment because it looks smaller; the total cost is the figure that leaves your account.",
      "The yearly amortisation table shows why early payments feel unproductive. In year one of the example loan, $1,730 of your $6,011 goes to interest and $4,282 to principal — and in month one alone, $156.25 of the $500.95 payment is interest. The interest share falls every month as the balance falls, which is why extra payments early in the loan save the most interest.",
      "If fees are involved — origination fees, documentation charges — the interest rate understates the cost. Switch to the APR figure on the loan disclosure for comparisons, or use an APR calculator: fees of a few hundred dollars on a short loan can add a full point or more to the true rate. On a fee-free loan the rate and the APR coincide.",
      "Judge the rate against the market before signing. The Federal Reserve's G.19 release put the average 24-month personal loan at commercial banks at 11.86% in May 2026, and the average credit card account assessed interest at 22.36% in the third quarter of 2026. A loan priced well above the bank average for its type is worth shopping around before you accept it.",
    ],
    formula: "Monthly payment = Amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1], where r is the monthly rate (annual rate ÷ 12) and n the number of monthly payments. Total interest = (payment × n) − amount. Each month's interest = balance × r; the rest of the payment reduces the balance.",
    example: {
      title: "Worked example: $25,000 at 7.5% over 5 years",
      body: "Payment: $25,000 × [0.00625 × (1.00625)^60] ÷ [(1.00625)^60 − 1] = $500.95. Over 60 payments you hand over $30,056.92, so interest is $5,056.92 — about 20 cents per dollar borrowed, and 16.8% of everything you pay. The same loan over 3 years costs $777.66 a month but only $2,996 of interest; over 7 years, $383.46 a month and $7,210 of interest. After the first year the balance is still $20,718 — term choice is a price decision, and the price is the interest total.",
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
          "Substantially. Personal loan pricing commonly spans from single digits for excellent credit to above 30% for poor credit on the same product. On a $25,000 5-year loan, that range is the difference between roughly $3,000 and over $18,000 of interest. Checking your rate with a soft inquiry first — most online lenders offer this — does not affect your score.",
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
      "An auto loan calculator includes the whole transaction — price, down payment, trade-in, sales tax and fees — not just the sticker. A $35,000 car with a $6,000 trade-in and $4,000 down leaves $27,030 to finance after 7% sales tax; at 7.9% over 60 months that is $546.78 a month and $5,777 of interest. Term length is where car loans get expensive.",
    howItWorks: [
      "Enter the vehicle price, your down payment and trade-in value, the sales tax rate for your state, then the loan rate and term. The calculator nets the trade-in and deposit against the price, adds tax on the taxable amount, and amortises the financed amount — then compares 36, 48, 60 and 72 months side by side so the term trade-off is visible.",
      "Tax treatment of a trade-in varies by state: most states tax only the difference between the new car's price and the trade-in value, which can make a trade-in worth more than its cash value. Selling privately usually fetches more but gives up that tax offset where it exists — in the example the trade-in saves $420 of sales tax, which is real money on top of the $6,000 value.",
      "Judge the deal on total cost and term, not the monthly payment the dealer quotes. Payments can be lowered by stretching the term to 72 or 84 months, which raises interest and leaves the loan underwater — owing more than the car's value — for years, because cars depreciate faster than long loans amortise. After three years of the example's 60-month loan you still owe $12,102.",
      "The rate you get depends mostly on credit score and whether the car is new or used. Experian's second-quarter 2026 data put the average new-car loan at 6.35% and the average used-car loan at 11.19%, with super-prime borrowers near 4.41% on new cars and deep-subprime borrowers at 16.11%. The same $27,030 over 60 months costs about $3,100 of interest at 4.41% and about $12,500 at 16.11%.",
      "Check the total cost line, not just the payment: the calculator adds the down payment and trade-in to every monthly payment. In the example the total cost is $42,807 — the $35,000 car plus $2,030 of tax plus $5,777 of interest — before insurance, fuel and maintenance. That is the number to compare against keeping your current car for another year.",
    ],
    formula: "Amount financed = Price + sales tax − down payment − trade-in value, where sales tax = (price − trade-in) × tax rate in most states. Monthly payment = Amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1], r = annual rate ÷ 12, n = months. Total cost = down payment + trade-in + (payment × n).",
    example: {
      title: "Worked example: $35,000 car, $6,000 trade-in, 60 months at 7.9%",
      body: "Taxable amount: $35,000 − $6,000 = $29,000. Sales tax at 7%: $2,030. Amount financed: $35,000 − $6,000 + $2,030 − $4,000 = $27,030. Payment: $546.78 a month. Total paid over 60 months: $32,806.69, so interest is $5,776.69. Stretch the same loan to 84 months and the payment falls to $419.95 — but interest climbs to $8,246, and after three years you still owe about $17,235 on a car that may well have depreciated below that figure.",
    },
    faqs: [
      {
        question: "How long a term should I choose for a car loan?",
        answer:
          "60 months is a sound ceiling for a new car and 36 to 48 for a used one; the loan should end well before the car's reliable life does. Terms of 72 to 84 months are now common, but they combine higher total interest with years of negative equity — a real problem if the car is written off, since insurance pays market value, not the loan balance.",
      },
      {
        question: "What rate can I expect on an auto loan?",
        answer:
          "It depends mainly on credit score and whether the car is new or used. Experian's Q2 2026 averages were 6.35% for new cars and 11.19% for used cars across all borrowers, with super-prime borrowers at 4.41% and 6.29% and deep-subprime borrowers at 16.11% and 21.62%. Manufacturer promotional rates (0% to 2.9%) can beat the market but usually replace a cash rebate — compare the total cost of both offers.",
      },
      {
        question: "Should I get pre-approved before visiting a dealer?",
        answer:
          "Yes. A pre-approval from your bank or credit union sets a rate ceiling, turns the dealer conversation into a negotiation about price, and prevents the finance office from marking up the rate — dealers may legally add to the buy rate a lender quotes. Finance through the dealer only if they beat your pre-approved rate in writing.",
      },
      {
        question: "How much should I put down on a car?",
        answer:
          "Around 20% on a new car and 10% on a used one is the traditional guidance, mainly to stay ahead of depreciation and avoid negative equity. It also lowers the payment and total interest. If the choice is between a larger deposit and keeping your emergency fund intact, keep the fund — a car loan at 7% is cheaper than an emergency on a credit card at 22%.",
      },
    ],
  },

  "loans/personal-loan-calculator": {
    quickAnswer:
      "A personal loan calculator prices an unsecured installment loan: fixed amount, fixed rate, fixed payment — and it exposes what the origination fee does to the true cost. Borrow $15,000 at 11.5% over 3 years with a 5% fee and you pay $494.64 a month, but you only receive $14,250, so the effective APR is 15.09%. Because there is no collateral, the rate depends almost entirely on your credit profile.",
    howItWorks: [
      "Enter the amount, the interest rate and the term, typically 2 to 7 years, plus the origination fee as a percentage. The calculator amortises the loan into equal monthly payments and totals the interest — then solves for the effective APR, the rate that prices those same payments against the smaller amount you actually receive.",
      "The fee is the trap in the headline rate. Origination fees are usually deducted from the amount you receive — borrow $15,000 with a 5% fee and $14,250 arrives — while interest is charged on the full $15,000. That lifts the true APR from 11.5% to 15.09% in the example, and the total cost of borrowing (interest plus fee) to $3,557. To net the full $15,000 you would need to borrow $15,789.",
      "Personal loans are the standard tool for consolidating credit card balances and funding one-off costs, because the rate is usually far below card APRs and the fixed end date forces the debt to actually die. A card balance, by contrast, has no finish line as long as minimum payments shrink with the balance — the Federal Reserve's Q3 2026 average on interest-bearing card accounts was 22.36%.",
      "Compare the loan against the card maths, not the card payment. The same $15,000 on a card at 22.36%, paid at the loan's $494.64 a month, would take 46 months and cost $7,306 of interest — the personal loan saves about $4,499 and finishes ten months sooner, which is the entire case for consolidation loans in one comparison.",
      "Use the effective APR, not the headline rate, to compare offers. A lender quoting 11.5% with a 5% fee is more expensive than one quoting 13% with no fee on the same term, and the calculator's fee-impact panel shows the difference in dollars. Shorter terms make fees bite harder, because the same fee is spread over fewer payments.",
    ],
    formula: "Monthly payment = Amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1], r = rate ÷ 12, n = term in months. Fee = amount × fee %. Net proceeds = amount − fee. Total interest = (payment × n) − amount. Effective APR is the monthly rate i solving: net proceeds = payment × [1 − (1 + i)^(−n)] ÷ i, annualised as i × 12, found by iteration.",
    example: {
      title: "Worked example: $15,000 at 11.5% over 3 years, 5% fee",
      body: "Payment: $494.64 a month. Total repaid: $17,807.04, so interest is $2,807.04. The 5% origination fee is $750, deducted from the proceeds, so you receive $14,250 while repaying interest on the full $15,000 — total cost of borrowing $3,557.04, effective APR 15.09%. The same $15,000 on a credit card at 22.36% APR, paid at the same $494.64 a month, would take about 46 months and cost roughly $7,306 of interest — the personal loan saves about $4,499 and finishes ten months sooner.",
    },
    faqs: [
      {
        question: "What credit score do I need for a personal loan?",
        answer:
          "Most lenders work from a FICO score of about 660 upward for reasonable rates; scores above 740 get the best pricing, often single-digit APRs. Borrowers in the low 600s can still be approved but at rates in the 20s and 30s, at which point the loan may not beat the debt it replaces. Some lenders weigh income and employment more than score for smaller amounts.",
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
      "A student loan calculator projects the payment and lifetime interest on education debt. Borrow $37,000 at 5.5% and the standard 10-year plan costs $401.55 a month and $11,186 of interest. Every point of rate and every year of term moves the interest total by thousands — the calculator lets you test repayment plans before you commit to one, by term or by the monthly payment you can afford.",
    howItWorks: [
      "Enter the total balance (add up every loan if you have several — or run the calculator per loan, since each carries its own rate), the interest rate and the repayment term. For multiple loans use a balance-weighted average rate for a quick estimate. The tool also works backwards: enter the monthly payment you can afford and it tells you how long payoff takes.",
      "Interest starts accruing on federal unsubsidised and PLUS loans from the day the money is disbursed, including while you are in school. Interest that accrues before repayment capitalises — it is added to the principal — so a loan taken out in the first year of a four-year degree can enter repayment owing materially more than was borrowed at typical rates.",
      "Compare plans by total interest and by payment together. Stretching the term from 10 to 20 years on the example loan cuts the payment from $401.55 to $254.52 but raises total interest from $11,186 to $24,084. The calculator's standard-versus-extended table makes that trade visible for your own balance, and the chart shows how slowly the extended balance falls.",
      "Federal rates are fixed for each loan at disbursement and reset annually by formula (the 10-year Treasury yield plus a margin). For loans first disbursed between July 1, 2026 and June 30, 2027, the rates are 6.52% for undergraduate Direct Loans, 8.07% for graduate unsubsidised loans and 9.07% for Direct PLUS loans. At 6.52% the example's 10-year payment would be $420.50 with $13,461 of interest.",
      "The repayment landscape changed in 2026. The SAVE plan ended, the new Repayment Assistance Plan (RAP) launched on July 1, 2026 — payments of 1% to 10% of adjusted gross income, a $10 minimum, forgiveness after 30 years — and loans disbursed on or after that date can use only RAP or the new Tiered Standard Plan. Income-Based Repayment stays open for older loans; PAYE and ICR close by July 1, 2028. Confirm your options at studentaid.gov.",
    ],
    formula: "Monthly payment = Balance × [r(1 + r)^n] ÷ [(1 + r)^n − 1], r = annual rate ÷ 12, n = months in the plan. Total interest = (payment × n) − balance. In payment mode the calculator simulates month by month — interest = balance × r, the rest of the payment reduces principal — until the balance reaches zero.",
    example: {
      title: "Worked example: $37,000 at 5.5% on the standard plan",
      body: "Payment: $401.55 a month for 120 months. Total repaid: $48,186, of which interest is $11,186 — you repay about $1.30 for every $1 borrowed. If $6,000 of interest had capitalised during school (a realistic figure for four years of unsubsidised borrowing), the starting balance is really $43,000 and the same plan costs $466.66 a month with about $13,000 of further interest. Paying a flat $400 a month instead of the exact plan payment stretches payoff to 121 months with $11,248 of interest — a $1.55 shortfall costs a month and $62.",
    },
    faqs: [
      {
        question: "What are the current federal student loan rates?",
        answer:
          "Rates are fixed for each loan at disbursement and reset annually by formula (10-year Treasury yield plus a margin). For loans first disbursed July 1, 2026 to June 30, 2027: 6.52% for undergraduate Direct Loans, 8.07% for graduate unsubsidised loans and 9.07% for Direct PLUS loans, with a 1.057% loan fee on Direct Loans. Private student loans price on creditworthiness and range from around 4% to the mid-teens.",
      },
      {
        question: "What happens during the grace period?",
        answer:
          "Federal loans typically give six months after leaving school before payments start. Interest on unsubsidised loans keeps accruing through the grace period and capitalises when repayment begins. Paying the interest as it accrues — about $170 a month on a $37,000 balance at 5.5% — prevents capitalisation and keeps the repayment balance equal to what you actually borrowed for tuition.",
      },
      {
        question: "Should I refinance federal student loans privately?",
        answer:
          "Only with a clear-eyed trade. A private refinance at a lower rate can save real money, but it permanently surrenders federal protections: income-driven repayment, deferment and forbearance rights, and any eligibility for forgiveness programmes including Public Service Loan Forgiveness. For borrowers with high, stable private-sector incomes and no forgiveness path, the rate saving may be worth it; for everyone else it usually is not.",
      },
      {
        question: "How much student debt is reasonable?",
        answer:
          "A common rule: total borrowing no more than your expected first-year salary in the field you are entering. On a $55,000 starting salary, a $55,000 balance at 6.52% takes about $625 a month for 10 years — about 14% of gross pay, before rent. Debt well above first-year salary is where standard repayment starts to break household budgets.",
      },
    ],
  },

  "loans/credit-card-calculator": {
    quickAnswer:
      "This calculator simulates paying a credit card balance the minimum-payment way, so you can see what 'minimum' really costs. A $5,800 balance at 24.99% APR with a typical minimum of interest plus 1% of the balance (with a $25 floor) takes 251 months — nearly 21 years — and $10,944 of interest. The same balance at a fixed $200 a month clears in 45 months with $3,187 of interest.",
    howItWorks: [
      "Enter the balance, the APR and how you intend to pay: minimum only, a percentage of the balance, or a fixed monthly amount. The calculator steps through the balance month by month, charging interest at APR ÷ 12 and applying your payment, exactly as the card statement does, and compares all three modes side by side.",
      "Minimum payments are designed to shrink. A typical formula is the month's interest plus 1% of the balance (or 2% to 4% of the balance, varying by issuer), with a floor around $25. Early on, most of the payment is interest: month one on the example balance charges $120.79 of interest against a payment of about $179.",
      "The fixed-payment comparison is the point of the tool. Holding a fixed payment of $200 — only about $21 more than the first month's minimum — and never letting it fall turns a 21-year debt into a three-and-three-quarter-year one on this balance, because every dollar that interest stops claiming goes straight to principal.",
      "A percentage-of-balance payment can be worse than the minimum, which surprises people. Paying 3% of the balance each month on the example takes 268 months and $11,877 of interest — longer and costlier than the minimum formula — because 3% of a shrinking balance falls faster than interest plus 1% does in the early years. Any payment that shrinks with the balance has the same flaw.",
      "Your own statement already carries this warning. Since the CARD Act of 2009, Regulation Z requires every card statement to show a minimum payment warning: how long the balance would take and what it would cost at minimums only, plus the monthly payment that would clear it in 36 months. On the example balance that 36-month payment is about $231, with $2,501 of interest.",
    ],
    formula: "Each month: interest = balance × APR ÷ 12. Minimum payment = max(interest + 1% of balance, $25) for the modelled issuer formula. Percentage mode pays max(balance × %, $25). Fixed mode pays a constant amount. Balance falls by (payment − interest) until it reaches zero.",
    example: {
      title: "Worked example: $5,800 at 24.99% APR, minimum payments only",
      body: "Month one: interest $120.79, minimum payment $178.79 (interest plus 1% of the balance), so principal falls by just $58. The balance halves only after about 6 years. Final payment arrives in month 251, and total interest is $10,944 — you repay about $16,744 for $5,800 of spending. A fixed $200 a month clears the same balance in 45 months with $3,187 of interest, saving $7,757 and more than 17 years. Federal rules require your statement to print this comparison; this calculator lets you run it for any payment you choose, before you choose it.",
    },
    faqs: [
      {
        question: "How is credit card interest actually calculated?",
        answer:
          "Most issuers use the average daily balance method: the daily rate (APR ÷ 365) applies to each day's balance, including new purchases once any grace period is lost. Pay the full statement balance by the due date and purchases incur no interest — the grace period, at least 21 days under Regulation Z. Carry any balance and it disappears, so new purchases accrue interest from the day they post.",
      },
      {
        question: "What APR is typical for a credit card?",
        answer:
          "High. Federal Reserve G.19 data put the average rate on accounts assessed interest at 22.36% in the third quarter of 2026 (21.19% across all accounts, including those paid in full). Store cards run higher still. Against those rates, even a strong savings account yield is irrelevant: paying a 22% APR is a guaranteed 22% return on the money used to clear it.",
      },
      {
        question: "Will a fixed payment hurt my credit score compared with minimums?",
        answer:
          "No — paying more than the minimum is positive in every respect. Scores care about on-time payment (any amount at or above the minimum satisfies it) and utilisation, the share of your limit in use. Bigger payments cut utilisation faster. Keep reported utilisation under about 30%, and lower is better.",
      },
      {
        question: "I cannot afford more than the minimum. What are the options?",
        answer:
          "In order: ask the issuer for a hardship plan or a rate reduction (issuers grant these more often than borrowers expect); consider a 0% balance transfer if the fee buys enough interest-free months to change the outcome; or speak to a non-profit credit counsellor about a debt management plan, which typically cuts card APRs to single digits in exchange for closing the cards. Avoid debt settlement companies charging upfront fees.",
      },
    ],
  },

  "loans/debt-payoff-calculator": {
    quickAnswer:
      "A debt payoff calculator combines all your debts into one plan with a payoff date. With $15,400 spread across two cards and a loan, paying $700 a month using the avalanche method makes you debt-free in 27 months with $3,089 of interest. Paying only the minimums ($370 a month) takes 73 months and $11,438 of interest — the same debts, at nearly four times the interest cost.",
    howItWorks: [
      "Add each debt as a row: balance, APR and minimum payment. Set the total monthly amount you can commit. The calculator pays every minimum, directs the surplus at one target debt at a time (highest APR under avalanche, smallest balance under snowball), and rolls freed payments into the next target as debts clear.",
      "The output that matters is the debt-free date and the total interest under your chosen budget, shown for both methods side by side. Then change the budget by $50 either way and watch the date move — the relationship is steep, because extra payments cut principal, which cuts next month's interest, which frees more principal. Small permanent increases beat occasional heroic ones.",
      "In the example the two methods agree exactly, which happens whenever the highest-rate debt is also the smallest balance: the 29.99% store card ($2,100) is targeted first under both, clearing in month 6, followed by the 24.99% credit card in month 18 and the 11.5% personal loan in month 27. When the methods diverge, the calculator shows the interest difference so you can price the motivation snowball buys.",
      "Two disciplines make the plan real. Stop adding to the balances — a payoff plan run alongside new card spending is a treadmill. And keep a starter emergency fund, even $1,000, so the first surprise does not go back on a card at 25%. The plan also warns you if any debt's minimum does not cover its monthly interest, in which case that debt never clears on minimums alone.",
      "Watch the minimums-only comparison, because it is the cost of doing nothing extra. The example's $370 of minimums takes 73 months and $11,438 of interest — $8,350 more than the $700 plan. The extra $330 a month does not just buy speed; it buys back almost four years of payment-free life and a credit profile with no revolving balances in it.",
    ],
    formula: "Simulated month by month across all debts: interest = balance × APR ÷ 12 per debt; minimums paid first; surplus to the target debt (highest APR under avalanche, smallest balance under snowball), rolling freed minimums forward as debts clear. Debt-free date = first month all balances reach zero; total cost = sum of all interest.",
    example: {
      title: "Worked example: $15,400 across three debts, $700 a month",
      body: "Credit card: $5,800 at 24.99%, minimum $145. Store card: $2,100 at 29.99%, minimum $60. Personal loan: $7,500 at 11.5%, minimum $165. Minimums total $370; the plan commits $700, so $330 attacks the 29.99% store card first. Result: debt-free in 27 months, total interest $3,089, with the store card gone in month 6 and the credit card in month 18. Pay minimums only and the same debts take 73 months and $11,438 of interest. The extra $330 a month saves $8,350 and returns three years and ten months of payment-free life.",
    },
    faqs: [
      {
        question: "Avalanche or snowball — which should I pick here?",
        answer:
          "Avalanche (highest APR first) is always the cheapest; the calculator shows the exact interest difference for your debts. In the worked example the gap between methods is zero, because the highest-rate debt is also the smallest. If the difference is under about $300 and an early cleared account would keep you motivated, snowball is a reasonable purchase. If the gap is in the thousands, take the avalanche.",
      },
      {
        question: "How much should my monthly payoff budget be?",
        answer:
          "Start from your budget's real surplus: income minus essential spending and minimum payments. Commit an amount you can sustain in a bad month, not your best month — plans fail by abandonment, not by arithmetic. A useful floor: your minimums plus at least 10% of the total balance's monthly interest bill redirected to principal.",
      },
      {
        question: "Should I use savings to pay off debt in one go?",
        answer:
          "Above a basic emergency buffer, usually yes for high-APR debt: savings earning 4% cannot compete with a card charging 25%. Keep one month of essentials in cash, direct the rest at the highest-rate balance, and rebuild savings once the debt is gone — the freed payments rebuild it faster than you expect.",
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
      "A debt consolidation calculator tests whether one new loan beats your current debts. Rolling $16,400 of card balances at 23.5% APR — costing $9,378 of interest at $520 a month — into a consolidation loan at 11.9% over 48 months cuts the payment to $448.31 and total interest plus fees to $5,119: a saving of about $4,259, provided the cards stay at zero afterwards.",
    howItWorks: [
      "Enter your current debts (or their balance-weighted average APR) and what you currently pay monthly, then the consolidation loan's amount, APR, term and any origination fee. The calculator prices both paths to zero and compares total interest and payoff dates on equal terms, with a chart of the two balances falling.",
      "Compare at the same payoff horizon as well as at the quoted one. A consolidation loan can show a lower payment purely by stretching the term — 48 months against debts you were clearing in 50 — which is not a saving, just a slower schedule. The honest check is total interest at a similar end date, and the tool warns you when the new term stretches beyond your current payoff.",
      "Add the fee, and notice how the tool treats it: the origination fee is rolled into the new loan, so you borrow the fee and pay interest on it too. On $16,400, a 4% fee is $656, so the new loan is $17,056 and the fee itself accrues interest for 48 months. The calculator's verdict — saving or cost — already includes the fee in the new path's total.",
      "The best version of the deal is rarely the quoted payment. Pay the new loan at your old $520 a month instead of its $448.31 payment and it clears in 40 months with about $3,677 of interest — total cost $4,333 including the fee, saving $5,045 against the current path instead of $4,259. The lower payment is a safety net, not a target.",
      "The verdict flips if the rate gap is small or the term stretches far. A consolidation loan at 18% over 60 months against 23.5% card debt can still cost more in total interest than staying put, because five years of interest at 18% exceeds four years at 23.5% on a shrinking balance. Run the numbers before signing — the calculator's red warning exists for exactly this case.",
    ],
    formula: "Current path: simulate the balance at its average APR with your current total payment until it reaches zero. New path: new principal = balance + origination fee; payment = principal × [r(1 + r)^n] ÷ [(1 + r)^n − 1]; total cost = interest + fee. Saving = current total interest − new total cost.",
    example: {
      title: "Worked example: $16,400 of cards into one loan",
      body: "Current: $16,400 at a blended 23.5% APR, paying $520 a month — debt-free in 50 months, interest $9,378. Consolidation: a 4% fee ($656) is rolled in, so the loan is $17,056 at 11.9% APR over 48 months — payment $448.31, total interest $4,463, total cost including the fee $5,119. Headline saving: $4,259, plus a payment $72 a month lower. Pay the loan at the old $520 a month instead and it clears in 40 months with about $3,677 of interest — the best version of the deal, saving $5,045.",
    },
    faqs: [
      {
        question: "What rate do I need for consolidation to be worth it?",
        answer:
          "The new APR must be meaningfully below your blended card APR — as a working rule, at least 5 points lower after fees — and the term must not stretch so far that interest accumulates back. The calculator settles it exactly for your numbers. At card APRs around 23%, borrowers with fair-to-good credit commonly qualify for 10% to 16%, which usually passes the test comfortably.",
      },
      {
        question: "Why do people end up worse off after consolidating?",
        answer:
          "The freed credit cards get used again. The loan is then added to new card balances instead of replacing them — total debt rises and the household is worse off than before consolidating. The behavioural fix is part of the product: close or freeze the cards, or at minimum remove them from wallets and saved payment details, before the loan funds.",
      },
      {
        question: "Consolidation loan or balance transfer card?",
        answer:
          "For balances you can clear inside 12 to 21 months, a 0% balance transfer is usually cheaper — the interest cost is just the transfer fee. For larger balances needing 3 to 5 years, the fixed loan wins because the transfer's rate reverts to a standard card APR on whatever remains. Run both in the calculator with your realistic monthly payment.",
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
      "Your debt-to-income ratio is your monthly debt payments divided by your gross monthly income — the first number a mortgage lender checks. With gross pay of $7,200 a month and $2,730 of housing and debt payments, your back-end DTI is 37.9%: inside most lending limits, but above the 36% line lenders prefer. The housing-only (front-end) ratio here is 25.7%.",
    howItWorks: [
      "Add up monthly debt payments as a lender counts them: the full housing payment (principal, interest, tax, insurance, HOA), car loans, student loans, minimum payments on credit cards, personal loans and any court-ordered payments. Divide by gross monthly income — before tax, because that is the lender convention, generous as it feels.",
      "Two ratios come out. The front-end ratio counts housing only; lenders look for roughly 28% or less. The back-end (total) ratio counts everything, and the calculator bands it: 36% or less is comfortable, 37% to 43% acceptable for most programmes, 44% to 50% stretched and needing strong compensating factors, above 50% high risk.",
      "What is not counted surprises people: utilities, groceries, insurance premiums (other than those inside the housing payment), subscriptions and rent (unless you are applying while renting and it appears as an obligation). Only debts on the credit report and the application count — which is why a $160 card minimum payment matters more to your mortgage than a $400 grocery bill.",
      "The calculator also shows your headroom against each threshold. In the example you could take on about $366 more a month before crossing 43%, but you are already $138 a month over the comfortable 36% line. Paying off the $430 car loan before applying drops the back-end ratio to 31.9% — often a better use of cash than a slightly larger down payment, because it also raises the loan amount the ratio allows.",
      "Run the ratio on take-home pay as well, for your own budgeting. The worked example's 37.9% of gross is about 50.6% of a typical take-home figure — the share of actual cash committed before food, fuel or anything else — which is the number that decides whether the budget breathes. Lenders use gross; your household lives on net.",
    ],
    formula: "Front-end DTI = monthly housing costs ÷ gross monthly income × 100. Back-end DTI = (housing costs + all monthly debt payments) ÷ gross monthly income × 100. Headroom to a threshold = (gross income × threshold %) − total monthly debts.",
    example: {
      title: "Worked example: $86,400 salary, applying for a mortgage",
      body: "Gross monthly income: $7,200. Payments: housing $1,850, car loan $430, credit card minimums $160, student loan $290 — total $2,730. Back-end DTI = $2,730 ÷ $7,200 = 37.9%. Front-end = $1,850 ÷ $7,200 = 25.7%. The calculator bands 37.9% as acceptable but above the 36% comfort line, with $366 a month of headroom to 43%. Paying off the car loan before applying removes $430 and drops the back-end ratio to 31.9% — comfortably inside the zone most lenders prefer, and worth considerably more to the application than the same cash added to the deposit.",
    },
    faqs: [
      {
        question: "What DTI do I need to qualify for a mortgage?",
        answer:
          "It varies by programme. Fannie Mae allows up to 50% back-end DTI through its automated Desktop Underwriter system (36% for manually underwritten loans, up to 45% with strong credit and reserves). FHA's standard is 31% housing and 43% total for manual underwriting, higher with compensating factors or an automated approval. VA and USDA use 41% as a benchmark. Lenders may overlay their own caps.",
      },
      {
        question: "Is 43% still the legal DTI limit for a qualified mortgage?",
        answer:
          "No — the CFPB removed the 43% cap from the Qualified Mortgage rule in its December 2020 final rule, with mandatory compliance from October 1, 2022, replacing it with a price-based test (the loan's APR versus the average prime offer rate). The 43% figure survives as a lender guideline and as this calculator's planning line, but it is no longer a federal limit.",
      },
      {
        question: "How can I lower my DTI quickly?",
        answer:
          "Pay off small installment debts outright — removing a $430 car payment helps more than paying $10,000 off a card balance whose minimum only falls slightly. Lenders often exclude an installment debt with under 10 payments remaining. Increasing documented income (a second job held for two years, rental income) counts too, but cannot be manufactured quickly.",
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
      "An APR calculator works out the true annual cost of a loan including its fees. A $20,000 loan at a 9% interest rate with $800 of upfront fees has payments of $415.17 a month over 5 years — but because you only receive $19,200, the APR is 10.76%. The 1.76-point gap between rate and APR is what the fees cost you, and it is why APR is the only fair comparison between loans.",
    howItWorks: [
      "Enter the loan amount, the stated interest rate, the term and every upfront cost: origination fees, documentation and processing charges, and any prepaid finance charges. The calculator computes the payment from the stated rate on the full amount, then solves for the rate that equates those payments with the net amount you actually receive — that rate is the APR.",
      "The shorter the loan, the harder fees bite. The same $800 of fees adds about 1.76 points to a 5-year loan's APR but about 4.1 points on a 2-year loan and 7.77 points on a 12-month loan, because the fee is spread over fewer payments. On a 30-year mortgage, the same fees dilute to less than half a point.",
      "Use APR to compare, then check the total repayment as a sanity check — two loans with the same APR but different terms cost very different amounts in total interest. APR is a rate, not a price tag: the example loan's total cost is $5,710 (interest $4,910 plus $800 of fees), and a competing 10% loan with no fees would cost $5,496 in total despite the higher headline rate.",
      "The APR equation has no closed-form solution, so the calculator solves it by iteration: it tests monthly rates, discounts the payment stream back to the present, and narrows in on the rate whose present value equals the amount received. That is the same mathematics a lender's disclosure system runs under Regulation Z, which defines which charges count as finance charges.",
      "Watch what APR leaves out. It captures lender and broker fees and most prepaid finance charges, but some third-party costs (certain title, appraisal or notary fees, depending on the loan type) sit outside it, and late fees and other contingent charges are excluded by definition. Read the full fee schedule alongside the APR, especially on mortgages where the Loan Estimate separates lender fees from other closing costs.",
    ],
    formula: "Payment is set by the note rate: Payment = Amount × [r(1 + r)^n] ÷ [(1 + r)^n − 1]. APR is the monthly rate i solving: Amount − fees = Payment × [1 − (1 + i)^(−n)] ÷ i, annualised as i × 12. The equation has no closed form; the calculator solves it by iteration (bisection).",
    example: {
      title: "Worked example: $20,000 at 9% with $800 of fees, 60 months",
      body: "Payment on $20,000 at 9% over 60 months: $415.17. Fees of $800 are withheld, so the amount you effectively borrow is $19,200 while the payments are unchanged. Solving for the rate that discounts 60 payments of $415.17 back to $19,200 gives a monthly rate of about 0.90%, an APR of 10.76%. The same $800 of fees on a 24-month loan would push the APR to 13.10%, and on a 12-month loan to 16.77%. A competing loan at 10% with no fees would be cheaper despite the higher headline rate — the comparison APR exists to catch.",
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
          "Card APR is simply the annualised interest rate — there are no origination fees to fold in, and annual fees are not included in card APR. It is a purchase or cash-advance rate applied to average daily balances. That is why a card's 22% APR and a loan's 11% APR are not quite the same species of number, even though both describe interest cost.",
      },
      {
        question: "Is the lowest APR always the best loan?",
        answer:
          "For identical amounts and terms, yes. Across different terms, not necessarily: a 5-year loan at 10% APR costs less total interest than a 7-year loan at 9% APR, because you pay it for two fewer years. Decide the term from your monthly budget first, then choose the lowest APR within that term, and confirm with the total repayment figure.",
      },
    ],
  },
};
