/**
 * Tool content — part B1: tax, freelance and ecommerce tools.
 * Written in the TONE-OF-VOICE.md voice (professional, direct, concrete numbers).
 * Keyed by URL path without the leading slash, e.g. "tax/paycheck-calculator".
 * Tax figures use the IRS-published 2026 amounts (Rev. Proc. 2025-32):
 * standard deduction $16,100 single / $32,200 joint, Social Security wage base
 * $184,500, capital-gains 0% ceilings $49,450 single / $98,900 joint.
 * Platform fees are the published 2026 schedules (Etsy, eBay, Shopify, Amazon).
 * All figures are estimates for planning, not tax or financial advice.
 */
export interface ToolContentEntry {
  quickAnswer: string
  howItWorks: string[]
  formula?: string
  example: { title: string; body: string }
  faqs: { question: string; answer: string }[]
}

export const TOOL_CONTENT_B1: Record<string, ToolContentEntry> = {
  "tax/tax-calculator": {
    quickAnswer:
      "On a $75,000 salary filing single in 2026, federal income tax is about $7,670 after the $16,100 standard deduction, an effective rate of 10.2%, even though the top bracket reached is 22%. Each bracket taxes only the income inside it. This is a planning estimate using the IRS-published 2026 brackets, not a filed return.",
    howItWorks: [
      "Enter your gross annual income, filing status, and whether you take the standard deduction or itemize. The calculator subtracts the deduction first, $16,100 for single filers and $32,200 for married couples filing jointly in 2026, to get taxable income. If your itemized deductions are larger, enter them instead; the calculator uses whichever figure you choose, so the result reflects your real filing position.",
      "It then walks your taxable income through the 2026 federal brackets in order: 10%, 12%, 22%, 24%, 32%, 35% and 37%. For a single filer the 10% bracket covers the first $12,400 of taxable income, 12% runs to $50,400, and 22% to $105,700. Only the slice inside each bracket is taxed at that rate, which is why your effective rate stays below your top bracket.",
      "The result shows total federal tax, your effective rate, total tax divided by gross income, and your marginal rate, the bracket your next dollar of income falls into. A bracket-by-bracket breakdown shows exactly how much tax comes from each slice. Use the marginal rate when judging extra income or a deduction; use the effective rate when comparing your overall burden.",
      "You can also enter tax credits and the amount already withheld from your pay. Credits cut the tax itself, dollar for dollar, so $1,000 of credits removes $1,000 of tax, unlike deductions, which only shrink the income being taxed. Comparing the result with your withholding shows whether you are on track for a refund or a balance due at filing.",
      "This is a federal estimate only: it leaves out state income tax, Social Security and Medicare tax, and credits such as the child tax credit, all of which move the final number. The 2026 brackets come from IRS Revenue Procedure 2025-32. For a per-paycheck view that includes payroll tax, use the paycheck calculator instead.",
    ],
    formula:
      "Taxable income = gross income minus standard deduction (or itemized deductions, if larger). Tax = the sum, over each bracket, of the income slice inside the bracket multiplied by that bracket's rate. Credits are subtracted from the tax, not from income.",
    example: {
      title: "Worked example: $60,000 salary, single filer, tax year 2026",
      body: "Gross income is $60,000. Subtract the $16,100 standard deduction and taxable income is $43,900. The first $12,400 is taxed at 10%, giving $1,240. The remaining $31,500 falls in the 12% bracket, giving $3,780. Total federal tax is $5,020, an effective rate of 8.4%. The marginal rate is 12%, so an extra $100 of income would add $12 of tax. A $1,000 credit would cut the bill to $4,020 directly. If $6,000 had been withheld during the year, the refund would be $980. If only $4,500 had been withheld, $520 would be due at filing. The calculator shows this comparison automatically once you enter your withholding.",
    },
    faqs: [
      {
        question: "What is the standard deduction for 2026?",
        answer:
          "For tax year 2026 the IRS sets the standard deduction at $16,100 for single filers and $32,200 for married couples filing jointly (Revenue Procedure 2025-32). Filers who are 65 or older or blind add $2,050 per condition if single, $1,650 per spouse if joint. If your itemized deductions are larger than the standard amount, itemizing gives the lower tax bill.",
      },
      {
        question: "What is the difference between marginal and effective tax rates?",
        answer:
          "Your marginal rate is the rate on your last dollar of income, 22% for a single filer with 2026 taxable income between $50,400 and $105,700. Your effective rate is total tax divided by total income, and it is always lower because the first dollars are taxed at 10% and 12%. Use the marginal rate for decisions about extra income; use the effective rate to compare overall burdens.",
      },
      {
        question: "Does this calculator include state income tax?",
        answer:
          "No. It estimates federal income tax only. State income tax ranges from 0% in states such as Texas and Florida to a top rate of 13.3% in California. Add your state estimate separately, or use the income tax calculator, which stacks federal, state and payroll tax together.",
      },
      {
        question: "Why is my estimate different from my actual refund or amount owed?",
        answer:
          "A refund or balance due is the difference between your total tax and what was already withheld during the year. Credits, pre-tax retirement contributions, health insurance premiums, a second job and capital gains all move the final number. This calculator estimates the tax itself; enter your withholding to see the refund or balance due.",
      },
    ],
  },

  "tax/paycheck-calculator": {
    quickAnswer:
      "A $80,000 salary paid biweekly nets about $2,504 per paycheck for a single filer in 2026 with no state income tax and no pre-tax deductions. Federal withholding takes about $337 of each check and payroll tax takes $235. State tax, 401(k) contributions and health insurance reduce it further.",
    howItWorks: [
      "Enter your gross salary or hourly wage, how often you are paid, and your filing status. The calculator annualizes your pay, applies the 2026 standard deduction of $16,100 for single filers or $32,200 for joint filers, then runs the federal brackets and divides the result back across your pay periods, so the per-check figure matches your real pay cycle.",
      "Payroll tax is worked out separately from income tax. Social Security takes 6.2% of wages up to the 2026 wage base of $184,500, and Medicare takes 1.45% of all wages with no cap. Earners over $200,000 single or $250,000 joint pay an extra 0.9% Medicare tax on wages above those thresholds. Your employer matches the Social Security and Medicare amounts, but that match never appears on your pay stub.",
      "Pre-tax deductions lower the wages that tax is figured on. Enter your annual 401(k) contributions and other pre-tax deductions such as HSA contributions, and the calculator subtracts them before applying the brackets and payroll tax. For 2026 the employee 401(k) deferral limit is $24,500, or $32,500 from age 50. Every dollar deferred at a 22% marginal rate saves 22 cents of federal tax that year.",
      "State income tax is a flat percentage you set yourself, because state systems vary too much for one formula. Enter 0% if you live in a state with no income tax, such as Texas or Florida, or your own effective rate if you know it. The result is a planning estimate, not your state's exact withholding table.",
      "The result is a pay-stub view: gross per check, each deduction line, and net pay per period and per year, plus the share of your salary you keep. Actual withholding also depends on your Form W-4 entries and on any bonuses or overtime in a given period, so treat the figure as an estimate and check it against a real pay stub.",
    ],
    formula:
      "Taxable wages = salary minus pre-tax deductions. Federal tax = bracket tax on (taxable wages minus the standard deduction). Payroll tax = 6.2% of wages up to $184,500, plus 1.45% of all wages, plus 0.9% above $200,000 single or $250,000 joint. Net pay = salary minus all taxes and deductions.",
    example: {
      title: "Worked example: $80,000 salary, biweekly pay, single, 2026",
      body: "A single filer earns $80,000, is paid every two weeks, and has no state tax or pre-tax deductions. Federal tax on $63,900 of taxable income is $8,770. Social Security takes $4,960 and Medicare takes $1,160, for $6,120 of payroll tax. Total tax is $14,890, leaving $65,110 a year, or $2,504.23 per paycheck. Federal withholding is $337.31 per check and payroll tax is $235.38. Adding a 5% state tax would take another $153.85 per check. A $3,000 annual 401(k) contribution would cut taxable wages to $77,000, saving about $660 of federal tax and $230 of payroll tax, so net pay would fall by only about $2,110 a year while $3,000 went into retirement.",
    },
    faqs: [
      {
        question: "How much tax is taken out of a biweekly paycheck?",
        answer:
          "It depends on your salary, filing status, state and pre-tax deductions. On an $80,000 salary for a single filer with no state tax, about $573 comes out of each biweekly check: $337 of federal tax and $235 of payroll tax. State tax and benefits such as health insurance come out on top of that.",
      },
      {
        question: "Why does my take-home pay rise late in the year?",
        answer:
          "Once your year-to-date wages pass the $184,500 Social Security wage base for 2026, the 6.2% Social Security deduction stops for the rest of the year. On a $250,000 salary that adds about $596 to each biweekly check from that point on. Medicare tax has no cap, so it continues all year.",
      },
      {
        question: "Do 401(k) contributions lower my payroll tax too?",
        answer:
          "Traditional 401(k) contributions lower the wages used for federal income tax and for Social Security and Medicare tax, so they save on both. Roth 401(k) contributions do not lower taxable wages at all. The calculator treats your pre-tax deduction entry as traditional, so do not include Roth amounts in it.",
      },
      {
        question: "Is the paycheck estimate the same as my employer's withholding?",
        answer:
          "Not exactly. Employers use IRS Publication 15-T withholding tables and your Form W-4 entries, which account for multiple jobs and other adjustments. This calculator annualizes your pay and applies the brackets directly, which is close for a single steady job but can differ if your pay varies or you hold more than one job.",
      },
    ],
  },

  "tax/salary-calculator": {
    quickAnswer:
      "A $75,000 annual salary is $36.06 an hour at 40 hours a week for 52 weeks, or $1,442.31 a week and $6,250 a month. After federal tax and payroll tax, a single filer keeps about $61,593 a year. The same salary at 50 hours a week is only $28.85 an hour.",
    howItWorks: [
      "Enter your pay in any period: hourly, weekly, monthly or annual. The calculator normalizes it to an annual salary first, then derives every other period from that figure, so one entry fills the whole conversion table. Change the hours per week or weeks per year and every figure updates at once. That makes it easy to compare a salaried offer with an hourly one on equal terms.",
      "The conversion uses your actual hours, not a fixed 2,080. A 40-hour week over 52 weeks is 2,080 hours a year, but a 45-hour week is 2,340, and the hourly rate falls accordingly. If you take unpaid weeks off, lower the weeks per year so the hourly figure reflects the time you actually work. Paid vacation does not change the maths, because the salary still covers those weeks.",
      "Below the gross table, the calculator estimates after-tax pay for a single filer using the 2026 standard deduction of $16,100, the federal brackets, and payroll tax of 6.2% Social Security up to $184,500 plus 1.45% Medicare on all wages. It is a federal-only estimate: state tax and benefits are not included. Use the take-home pay calculator if you need state tax and deductions included.",
      "The daily figure assumes a five-day week, so it is the weekly amount divided by five. The biweekly figure is the annual salary divided by 26 pay periods. Monthly is the annual figure divided by 12, which is why a monthly salary looks larger than four weekly payments: most months contain more than four weeks. Budgeting by weekly pay times four understates a monthly salary by about 8%.",
      "Use the table to compare offers honestly. A $75,000 salary at 40 hours a week beats an $80,000 salary at 55 hours a week on hourly terms: $36.06 against $27.97. The calculator shows the hourly equivalent of each offer side by side, so the hours hidden inside a salary cannot hide. That comparison is the point of the tool: salaries hide hours, hourly rates do not.",
    ],
    formula:
      "Annual salary = hourly rate times hours per week times weeks per year. Hourly rate = annual salary divided by (hours per week times weeks per year). After-tax pay = annual salary minus federal bracket tax on (salary minus the $16,100 standard deduction) minus payroll tax.",
    example: {
      title: "Worked example: $75,000 a year at 40 hours a week",
      body: "A $75,000 salary at 40 hours a week for 52 weeks is 2,080 hours a year, so the hourly rate is $36.06. Weekly pay is $1,442.31, biweekly pay is $2,884.62, monthly pay is $6,250 and a single day is $288.46. After tax, a single filer keeps about $61,593 a year: federal tax is $7,670 and payroll tax is $5,738, an effective rate of 17.9%. At 50 hours a week the same salary is only $28.85 an hour. That gap is why two offers with similar salaries can feel very different: the 50-hour job pays $7.21 less for every hour worked, or about $361 less for each 50-hour week worked.",
    },
    faqs: [
      {
        question: "How many hours are in a full-time work year?",
        answer:
          "A 40-hour week over 52 weeks is 2,080 hours, the standard figure employers use. If you work 45 hours a week, the year is 2,340 hours, and at 50 hours it is 2,600. The calculator lets you set your own hours and weeks, which matters because a longer week lowers the hourly value of any salary.",
      },
      {
        question: "Is $30 an hour good pay?",
        answer:
          "At 40 hours a week for 52 weeks, $30 an hour is $62,400 a year before tax. After federal tax and payroll tax, a single filer keeps roughly $52,300, before state tax. Whether that is good pay depends on where you live: the same wage stretches much further in a low-cost city than in New York or San Francisco.",
      },
      {
        question: "Why is my monthly pay more than four weekly payments?",
        answer:
          "A month averages 4.33 weeks, not four, because 52 weeks divided by 12 months is 4.33. Monthly pay is the annual salary divided by 12, while four weekly payments cover only 48 weeks a year. Budgeting weekly pay times four understates your monthly income by about 8%.",
      },
      {
        question: "Does the after-tax figure include state tax?",
        answer:
          "No. The after-tax estimate covers federal income tax and payroll tax only, for a single filer taking the standard deduction. State income tax, local tax, health insurance premiums and retirement contributions are not included. Use the take-home pay calculator for a fuller picture with those lines added.",
      },
    ],
  },

  "tax/income-tax-calculator": {
    quickAnswer:
      "On $95,000 of income in 2026, a single filer in California owes about $28,173 in total tax: $12,070 federal, $7,268 payroll tax and $8,835 state, keeping $66,828. That is a combined effective rate of 29.7%. The same income in a state with no income tax keeps $8,835 more.",
    howItWorks: [
      "Enter your annual income and filing status, then pick your state. The calculator applies the 2026 standard deduction, $16,100 single or $32,200 joint, and runs your taxable income through the federal brackets, which start at 10% up to $12,400 of taxable income for single filers. Your state choice changes the total more than any other input after income itself.",
      "State tax uses a typical effective rate for each state at middle incomes, not the statutory top rate. California shows 9.3% and New York 6.0%, while the no-income-tax option is 0%. If you know your own effective state rate, switch to the custom rate and enter it directly for a closer estimate. Top rates mislead: California's 13.3% top rate applies only to income above $1 million.",
      "Payroll tax is added on top of income tax. Social Security takes 6.2% of wages up to the 2026 wage base of $184,500, and Medicare takes 1.45% of all wages, plus 0.9% on wages above $200,000 single or $250,000 joint. Together they add 7.65% to the bill for most earners, which is why the combined rate looks much higher than the federal rate alone.",
      "The result breaks the total into four lines: federal, state, Social Security and Medicare, with your combined effective rate and the amount you keep. The stacked chart shows the same split visually, so you can see at a glance which layer of tax takes the biggest share of your income. For most middle earners, federal tax is the largest line and state tax is second.",
      "This is a planning estimate, not a tax return. It leaves out deductions beyond the standard amount, tax credits, capital gains, rental income and local income taxes, all of which change the final bill. The federal figures use the IRS-published 2026 brackets; state figures are typical effective rates, so confirm yours with your state revenue department.",
    ],
    formula:
      "Federal tax = bracket tax on (income minus the standard deduction). Payroll tax = 6.2% of income up to $184,500, plus 1.45% of all income, plus 0.9% above $200,000 single or $250,000 joint. State tax = income times your state's effective rate. Total tax = federal plus payroll plus state.",
    example: {
      title: "Worked example: $95,000 income, single filer, California, 2026",
      body: "A single filer earns $95,000 and lives in California. Taxable income is $78,900 after the $16,100 standard deduction, and federal tax on it is $12,070, an effective federal rate of 12.7%. Social Security takes $5,890 and Medicare takes $1,378, for $7,268 of payroll tax. State tax at the 9.3% typical effective rate is $8,835. Total tax is $28,173, a combined effective rate of 29.7%, leaving $66,828. In Texas, with no state income tax, the same filer would keep $75,663. The $8,835 gap is the whole state layer: moving states changes nothing about the federal or payroll lines, which is why the state picker is the most consequential input after income.",
    },
    faqs: [
      {
        question: "Which states have no income tax?",
        answer:
          "Nine states levy no tax on wages in 2026: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming. New Hampshire repealed its tax on interest and dividends from 2025. Note that Washington taxes some capital gains, and several of these states make up the revenue with higher sales or property taxes.",
      },
      {
        question: "What is a typical effective state tax rate?",
        answer:
          "The effective rate is the state tax you actually pay divided by your income, and it is always below the top statutory rate because of brackets and deductions. This calculator uses typical middle-income effective rates, such as 9.3% for California and 6.0% for New York. Your own rate depends on your income, deductions and local taxes.",
      },
      {
        question: "Why is my combined rate so much higher than my federal rate?",
        answer:
          "Federal income tax is only one layer. Payroll tax adds 7.65% for most earners, and state tax adds roughly 0% to 9% depending on where you live. On a $95,000 California salary the federal effective rate is 12.7%, but the combined rate is 29.7% once payroll and state tax are included.",
      },
      {
        question: "Does this calculator handle capital gains or rental income?",
        answer:
          "No. It treats all income as wages taxed at ordinary rates. Capital gains held over a year get preferential 0%, 15% or 20% rates, and rental income has its own deductions. Use the capital gains calculator for investment sales, and treat this result as the wage-only picture.",
      },
    ],
  },

  "tax/take-home-pay-calculator": {
    quickAnswer:
      "On a $90,000 salary in 2026, a single filer contributing 6% to a 401(k) with $1,200 to an HSA takes home about $61,475 a year, or $2,364 per biweekly check, after federal, payroll and 5% state tax. The pre-tax deductions save about $2,199 of federal and payroll tax.",
    howItWorks: [
      "Enter your gross salary, filing status and pay frequency, then add your pre-tax deductions: a 401(k) percentage, annual HSA contributions and health insurance per check. The calculator subtracts all three from your gross pay before working out federal income tax, because pre-tax money is never taxed as wages. Deductions taken before tax are worth more than the same dollars taken after.",
      "The 401(k) slider is a percentage of gross pay. At 6% on a $90,000 salary that is $5,400 a year. For 2026 the employee deferral limit is $24,500, or $32,500 from age 50, so a high earner can defer far more than the default. The calculator does not cap your entry, so check the limit yourself if you contribute heavily.",
      "HSA contributions made through payroll escape federal income tax and payroll tax alike, which makes them the most tax-efficient line on the page. For 2026 the HSA limit is $4,400 for self-only coverage and $8,750 for family coverage, plus $1,000 from age 55. Health premiums through payroll do the same. A 401(k) deferral is different: it lowers federal and state tax but stays subject to payroll tax, so it does not lower that line.",
      "Taxes are then figured on the reduced wages: federal brackets after the $16,100 single or $32,200 joint standard deduction, and state tax at the flat percentage you set. Payroll tax uses a wider base — gross pay minus only the HSA and health lines: Social Security at 6.2% up to the $184,500 wage base and Medicare at 1.45% on all of it. The result shows each line separately, plus net pay per check and per year.",
      "The tax-saved line compares your federal and payroll tax against the same salary with no deductions. On the $90,000 example the deductions save about $2,199 a year, which is the real return on contributing: the money still belongs to you, in retirement or health savings, and the tax bill falls as well. Raising the 401(k) percentage shows the trade-off between today's paycheck and tomorrow's balance.",
    ],
    formula:
      "Taxable wages = gross salary minus 401(k) contributions, HSA contributions and health premiums. Federal tax = bracket tax on (taxable wages minus the standard deduction). Payroll tax = 6.2% of FICA wages up to $184,500 plus 1.45% of all FICA wages, where FICA wages = gross minus HSA and health premiums only. Net pay = gross salary minus deductions minus all taxes.",
    example: {
      title: "Worked example: $90,000 salary with 401(k), HSA and health cover",
      body: "A single filer earns $90,000, contributes 6% ($5,400) to a 401(k), puts $1,200 into an HSA, and pays $85 per biweekly check ($2,210 a year) for health insurance. Taxable wages fall to $81,190, but FICA wages fall only to $86,590, because the 401(k) deferral stays subject to payroll tax. Federal tax is $9,032, Social Security is $5,369, Medicare is $1,256 and state tax at 5% is $4,060, for a total of $19,715. Net pay is $61,475 a year, or $2,364.41 per check. With no deductions at all, federal and payroll tax would total $17,855, so the deductions save $2,199 a year; state tax falls by $441. Doubling the 401(k) to 12% would cut net pay by about $3,942 a year while adding $5,400 to retirement, because the extra deferral saves about $1,458 of tax — federal and state tax only.",
    },
    faqs: [
      {
        question: "What counts as a pre-tax deduction?",
        answer:
          "Money taken from your pay before income tax is figured: traditional 401(k) and 403(b) contributions, HSA contributions made through payroll, and health, dental and vision insurance premiums. Roth 401(k) contributions are after-tax, so they do not lower your taxable wages and should not be entered here.",
      },
      {
        question: "Does a bigger 401(k) contribution always raise my take-home pay?",
        answer:
          "No. It lowers your tax bill but also lowers your paycheck, because the contribution itself comes out of your pay. On a $90,000 salary, doubling a 6% contribution to 12% saves about $1,458 of tax but cuts net pay by about $3,942 a year. The $5,400 still belongs to you, inside the retirement account.",
      },
      {
        question: "Why is my take-home pay lower than the salary calculator shows?",
        answer:
          "The salary calculator only subtracts federal tax and payroll tax. The take-home calculator also subtracts state tax, 401(k), HSA and health insurance, which is why its net figure is lower. Use this calculator when you want the number that actually lands in your bank account.",
      },
      {
        question: "How much should I contribute to my 401(k)?",
        answer:
          "At minimum, contribute enough to get your employer's full match, since that is an immediate return on your money. Beyond that, the 2026 employee limit is $24,500, or $32,500 from age 50. This calculator shows the paycheck cost of any percentage; it does not recommend a specific amount.",
      },
    ],
  },

  "tax/overtime-calculator": {
    quickAnswer:
      "At $25 an hour, a 48-hour week pays $1,300: $1,000 of regular pay for 40 hours plus $300 for 8 overtime hours at time-and-a-half. The overtime premium, the extra half above straight time, is $100. Federal law requires 1.5 times the regular rate for hours over 40 in a week.",
    howItWorks: [
      "Enter your straight-time hourly rate, your regular hours and your overtime hours for the week. The calculator pays regular hours at the rate you enter and overtime hours at 1.5 times that rate, following the federal Fair Labor Standards Act rule for non-exempt workers: time-and-a-half for hours over 40 in a single workweek. The 40-hour count is per workweek, not per pay period.",
      "The premium line shows the extra pay overtime earns above straight time: 0.5 times your rate for each overtime hour. That split matters for tax. Since 2025, the federal deduction for overtime covers only the premium portion, up to $12,500 a year for single filers or $25,000 joint, for tax years 2025 through 2028. It phases out above $150,000 of modified AGI single, $300,000 joint.",
      "Double time is a separate input because federal law does not require it. Some states, union contracts and employer policies pay 2 times the rate for long days or holidays: California, for example, requires double time for hours past 12 in a day. Enter those hours in the double-time field so they are priced at 2 times your rate instead of 1.5.",
      "Salaried workers are not automatically exempt. The federal exemption needs both a salary of at least $684 a week ($35,568 a year) and duties that qualify as executive, administrative or professional. Below that salary, the job cannot be exempt however senior the title sounds, and overtime is owed. The 2024 rule that would have raised the threshold was vacated by a federal court, and the $684 figure was formally restored in 2026.",
      "This calculator works out gross overtime pay only: it does not subtract tax. Overtime is still fully taxable as wages, and withholding applies to it like any other pay. The deduction for the premium portion is claimed when you file your return, not through payroll, and from 2026 your employer reports it in Box 12 of your W-2 under code TT.",
    ],
    formula:
      "Regular pay = hourly rate times regular hours. Overtime pay = hourly rate times 1.5 times overtime hours. Double-time pay = hourly rate times 2 times double-time hours. Overtime premium = hourly rate times 0.5 times overtime hours. Total gross pay = regular pay plus overtime pay plus double-time pay.",
    example: {
      title: "Worked example: $25 an hour, 40 regular hours, 8 overtime hours",
      body: "A worker earns $25 an hour and works 48 hours in a week: 40 regular hours and 8 overtime hours. Regular pay is $25 times 40, or $1,000. Overtime pays $37.50 an hour, so 8 overtime hours add $300. Total gross pay for the week is $1,300. The overtime premium is $12.50 an hour times 8 hours, or $100: that is the only part that qualifies for the federal overtime deduction. If 2 of those overtime hours had been double time instead, they would pay $100 rather than $75, and the weekly total would be $1,325. Over a full year at this pace, the premium alone would be $5,200, well inside the $12,500 annual deduction cap for single filers.",
    },
    faqs: [
      {
        question: "Is overtime pay tax-free now?",
        answer:
          "No. Overtime is still fully taxable as wages, and your employer still withholds income tax, Social Security and Medicare from it. The 2025 law created a deduction for the premium portion only, the extra half in time-and-a-half, up to $12,500 a year single or $25,000 joint, for tax years 2025 through 2028. You claim it when you file.",
      },
      {
        question: "Do I get overtime for working more than 8 hours in a day?",
        answer:
          "Not under federal law, which counts overtime only after 40 hours in a workweek. Some states add daily rules: California pays 1.5 times after 8 hours in a day and double time after 12. Check your state labor department if your state has a daily rule, because the federal weekly rule is only the floor.",
      },
      {
        question: "Does the 40-hour rule count paid time off?",
        answer:
          "No. Federal overtime counts hours actually worked. Paid holidays, sick days and vacation do not count toward the 40 hours, so a week with a paid holiday and 36 hours worked owes no federal overtime. Your employer or contract may be more generous, but the law does not require it.",
      },
      {
        question: "What is the federal minimum wage?",
        answer:
          "$7.25 an hour, unchanged since 2009. Many states and cities set higher minimums, and the higher rate applies where you work. Overtime is calculated on your regular rate, which must be at least the applicable minimum wage, and it includes non-discretionary bonuses and shift differentials.",
      },
    ],
  },

  "tax/capital-gains-tax-calculator": {
    quickAnswer:
      "Sell an asset for $75,000 that cost $40,000 after holding it 18 months, and the $35,000 gain costs $5,250 in federal tax for a single filer earning $90,000, all taxed at 15%. Sold within a year, the same gain would cost $7,764 at ordinary rates. Holding past 12 months saves $2,514.",
    howItWorks: [
      "Enter what you paid for the asset, what you sold it for, how long you held it, your other income and your filing status. The gain is the sale price minus the cost basis, and the holding period decides the tax treatment: more than 12 months is long-term, one year or less is short-term. A loss is not taxed at all, and up to $3,000 of net capital losses a year can offset other income.",
      "Long-term gains are taxed at 0%, 15% or 20% depending on your total taxable income. For 2026 the 0% rate covers taxable income up to $49,450 for single filers and $98,900 for joint filers, and 20% starts above $545,500 single or $613,700 joint. Your other income fills the lower bands first, and the gain stacks on top. That stacking is why two identical gains can be taxed at different rates.",
      "Short-term gains get no preferential rate: they are added to your other income and taxed at your ordinary marginal rate, which can reach 37%. The calculator shows both figures side by side for the same sale, so you can see exactly what waiting past the 12-month mark is worth before you sell. On a large gain the difference can be thousands of dollars, as the example below shows.",
      "Higher earners also face the 3.8% net investment income tax on top of the capital gains rate. It applies to the smaller of your net investment income or the amount by which your modified adjusted gross income exceeds $200,000 single or $250,000 joint. Those thresholds are not indexed for inflation, so more filers cross them each year.",
      "This is a federal estimate only. Most states tax capital gains as ordinary income, with no preferential rate, and a few states have no income tax at all. The calculator also leaves out the wash-sale rule, collectibles rates and the home-sale exclusion, so confirm the details with the IRS or a tax professional before a large sale.",
    ],
    formula:
      "Gain = sale price minus cost basis. Long-term tax = the part of the gain inside the 0% band times 0%, plus the part inside the 15% band times 15%, plus the part above the 20% threshold times 20%, plus 3.8% net investment income tax where it applies. Short-term tax = ordinary bracket tax on the gain stacked on other income.",
    example: {
      title: "Worked example: $35,000 gain after 18 months, single filer",
      body: "You buy shares for $40,000 and sell them 18 months later for $75,000, a $35,000 gain. Your other income is $90,000, so your taxable income before the gain is $73,900 after the $16,100 standard deduction. That already passes the $49,450 ceiling for the 0% rate, so the whole gain is taxed at 15%, giving $5,250. Net proceeds are $69,750. Had you sold within a year, the gain would have been taxed at ordinary rates, costing $7,764, so holding past 12 months saves $2,514. Your modified AGI of $125,000 is below the $200,000 threshold, so no net investment income tax applies.",
    },
    faqs: [
      {
        question: "How long do I have to hold an asset for the long-term rate?",
        answer:
          "More than one year. An asset bought on March 1, 2025 and sold on March 2, 2026 is long-term; sold on March 1, 2026 it is short-term. The holding period starts the day after you buy. The calculator treats anything over 12 months as long-term, so set the slider past 12 to see the long-term figure.",
      },
      {
        question: "Can I pay 0% tax on a capital gain?",
        answer:
          "Yes, if your total taxable income stays under the 0% ceiling: $49,450 for single filers or $98,900 for joint filers in 2026. A retiree with $30,000 of taxable income could realize a $19,000 long-term gain and pay no federal tax on it. State tax may still apply, and the gain itself counts toward the ceiling.",
      },
      {
        question: "What is the net investment income tax?",
        answer:
          "A 3.8% surtax on investment income, including capital gains, dividends and rental income, for filers whose modified adjusted gross income exceeds $200,000 single or $250,000 joint. It applies to the smaller of your investment income or the amount above the threshold. Combined with the 20% rate, the top federal rate on a gain is 23.8%.",
      },
      {
        question: "Do states tax capital gains at lower rates too?",
        answer:
          "Most do not. The majority of states tax capital gains as ordinary income at the state's regular rates. A few, such as Arizona and New Mexico, offer a partial exclusion. Nine states have no income tax on wages at all, which also means no state tax on gains. Check your state revenue department for the exact treatment.",
      },
    ],
  },

  "freelance/salary-to-hourly-calculator": {
    quickAnswer:
      "An $80,000 salary is $38.46 an hour at 40 hours a week for 52 weeks, but only $30.77 an hour if the job actually takes 50 hours a week. With 4 unpaid weeks off, the rate per hour actually worked rises to $41.67. The calculator converts both ways, salary to hourly and hourly to salary.",
    howItWorks: [
      "Pick a direction: salary to hourly, or hourly to salary. Enter the amount, your hours per week and your weeks per year, and the calculator normalizes everything to an annual figure first, then splits it back into hourly, weekly and monthly equivalents, so a single entry answers every version of the question. Freelancers usually run it in reverse, turning a target salary into the hourly rate they must charge.",
      "Hours are the whole point. A $80,000 salary at 40 hours a week is $38.46 an hour, but the same salary at 50 hours is $30.77, and at 60 hours it is $25.64. The comparison table shows the hourly rate at 35, 40, 45 and 50 hours a week, so you can see what each extra hour of the working week costs you.",
      "Unpaid weeks change the true rate. The calculator shows two hourly figures: the rate spread over paid hours, and the rate per hour actually worked. Four unpaid weeks on an $80,000 salary leave the paid rate at $38.46 but push the true rate to $41.67, because the same pay covers fewer working hours. Paid vacation does not change either figure, because the salary still covers those weeks.",
      "For contractors, unpaid weeks are the weeks you work without pay covering them: holidays, sick days, gaps between clients and time spent on admin. A freelancer who wants $80,000 a year but only bills 44 weeks must earn $1,818 per billed week, not $1,538, which is why freelance rates run well above equivalent salaries. Add self-employment tax on top, and the gap widens further.",
      "This is a gross conversion only: it does not subtract tax, benefits or employer costs. A salaried job usually includes health insurance, paid leave and retirement matching that an hourly or freelance rate must cover out of pocket. Compare the hourly figures first, then weigh the benefits separately before choosing between offers. The salary calculator adds a federal after-tax estimate if you need the net picture.",
    ],
    formula:
      "Paid hours = hours per week times weeks per year. Hourly rate = annual salary divided by paid hours. True hourly rate = annual salary divided by (hours per week times (weeks per year minus unpaid weeks)). Hourly to salary = hourly rate times paid hours.",
    example: {
      title: "Worked example: $80,000 salary, 40 hours, 4 unpaid weeks",
      body: "An $80,000 salary at 40 hours a week for 52 weeks is 2,080 paid hours, so the hourly rate is $38.46. Weekly pay is $1,538.46 and monthly pay is $6,666.67. If the job actually takes 50 hours a week, the same salary is only $30.77 an hour. With 4 unpaid weeks, the hours actually worked fall to 1,920, so the true rate is $41.67 an hour. A freelancer matching this salary while billing 44 weeks a year needs $1,818 per billed week, or about $45.45 an hour at 40 billed hours a week. That $7-an-hour gap between the salary rate and the freelance rate is the cost of unpaid time, before tax or benefits are even considered.",
    },
    faqs: [
      {
        question: "How do I convert a salary to an hourly rate?",
        answer:
          "Divide the annual salary by the hours you work in a year. At 40 hours a week for 52 weeks that is 2,080 hours, so $80,000 divided by 2,080 is $38.46 an hour. If you work more hours or take unpaid weeks off, use your real hours instead, because the standard 2,080 figure will overstate your rate.",
      },
      {
        question: "What is the difference between the paid rate and the true rate?",
        answer:
          "The paid rate spreads your salary over all the hours in your working year, including paid leave. The true rate divides it by the hours you actually work, excluding unpaid weeks. Paid vacation leaves both unchanged; unpaid time off raises the true rate, because the same pay covers fewer working hours.",
      },
      {
        question: "Why do freelancers charge more per hour than employees earn?",
        answer:
          "A freelancer's hourly rate has to cover unpaid weeks, time spent finding clients and doing admin, health insurance, retirement savings and self-employment tax, none of which an employer provides. A $40-an-hour employee rate often needs a freelance rate roughly 1.5 to 2 times higher to produce the same annual income.",
      },
      {
        question: "How many hours a week does a $100,000 salary assume?",
        answer:
          "It assumes whatever hours the job actually takes, which is the trap. At 40 hours a week it is $48.08 an hour; at 50 hours it is $38.46; at 60 hours it is $32.05. Always divide by your real weekly hours before comparing salaries, because two $100,000 jobs can pay very different hourly rates.",
      },
    ],
  },

  "freelance/1099-tax-calculator": {
    quickAnswer:
      "On $95,000 of 1099 income with $12,000 of expenses, a single filer owes about $24,018 in 2026: $11,728 of self-employment tax, $8,140 of federal income tax and $4,150 of state tax at 5%. That is 28.9% of net income, so set aside 29 cents of every dollar and pay about $6,004 a quarter.",
    howItWorks: [
      "Enter your gross 1099 income and your business expenses. The calculator subtracts expenses first to get net self-employment income, because every dollar of expenses lowers both your income tax and your self-employment tax. Track expenses through the year: the difference between $95,000 gross and $83,000 net is worth thousands of dollars of tax. That is the single biggest lever a freelancer has over their tax bill.",
      "Self-employment tax is 15.3% of 92.35% of net profit: 12.4% for Social Security and 2.9% for Medicare. The Social Security part stops once combined wages and self-employment earnings reach the 2026 wage base of $184,500, and any W-2 wages you enter use up that room first. Below the cap, the tax works out to 14.13% of net profit. You must file Schedule SE once net earnings reach $400 for the year.",
      "Half of your self-employment tax is deductible from income before the federal brackets apply, which softens the blow: on the example below it removes $5,864 from taxable income. The calculator then applies the $16,100 single or $32,200 joint standard deduction and the 2026 federal brackets to what is left. If you also have W-2 wages, the calculator attributes only the extra federal tax the 1099 income causes.",
      "The 20% qualified business income deduction is not included in the result, so treat the federal figure as a ceiling. Made permanent by the 2025 tax law, it lets most sole proprietors deduct up to 20% of qualified business income, with limits phasing in above $201,750 of taxable income single or $403,500 joint in 2026. It lowers income tax only, never self-employment tax.",
      "Nobody withholds from a 1099 check, so the IRS expects quarterly estimated payments: April 15, June 15 and September 15, 2026, then January 15, 2027. The calculator divides your total by four for the quarterly figure. Miss a date and the underpayment penalty is figured separately for each quarter, so a big January payment does not erase a skipped April one.",
    ],
    formula:
      "Net income = 1099 income minus business expenses. Self-employment tax base = net income times 92.35%. Self-employment tax = 12.4% of the base up to the $184,500 wage base, plus 2.9% of the whole base. Federal tax = bracket tax on (net income minus half the self-employment tax minus the standard deduction). Total = self-employment tax plus federal tax plus state tax.",
    example: {
      title: "Worked example: $95,000 of 1099 income, $12,000 of expenses",
      body: "A single freelancer earns $95,000 and spends $12,000 on business expenses, leaving $83,000 of net income. The self-employment tax base is 92.35% of that, or $76,651. Self-employment tax is $11,728: $9,505 of Social Security and $2,223 of Medicare. Half of it, $5,864, is deductible, so taxable income is $61,036 after the $16,100 standard deduction, and federal tax is $8,140. State tax at 5% of net income is $4,150. The total bill is $24,018, or 28.9% of net income, leaving $58,983. The quarterly payment is about $6,004. Note that the 20% QBI deduction could cut the federal part further: on $77,136 of qualified business income it would be worth up to $15,427 of extra deductions, saving roughly $3,394 of federal tax at a 22% marginal rate.",
    },
    faqs: [
      {
        question: "Do I owe tax if I never received a 1099 form?",
        answer:
          "Yes. Income is taxable whether or not a form arrives. For 2026 a client must send a 1099-NEC only if it paid you $2,000 or more, up from $600 in 2025, so fewer forms are coming. Report every dollar on Schedule C regardless, and pay self-employment tax once net earnings reach $400.",
      },
      {
        question: "What percentage should I set aside for 1099 taxes?",
        answer:
          "A common starting point is 25% to 30% of net income, and this calculator gives your exact figure: 29% on the $83,000 example. The share rises with income because of the federal brackets, and falls if you qualify for the 20% QBI deduction. Put the money aside as each payment arrives, not at tax time.",
      },
      {
        question: "Can I deduct the 20% QBI deduction and the half-SE-tax deduction together?",
        answer:
          "Yes, they stack. The half-SE-tax deduction lowers your income before the brackets apply, and the QBI deduction takes up to 20% of qualified business income off after that. Neither one lowers self-employment tax itself. This calculator includes the half-SE-tax deduction but not QBI, so its federal figure is a ceiling.",
      },
      {
        question: "What happens if I miss a quarterly payment?",
        answer:
          "The IRS charges an underpayment penalty plus interest, figured separately for each due date, so paying late in the year does not undo an early miss. You can usually avoid the penalty by paying at least 90% of the current year's tax or 100% of last year's tax through withholding and estimates, 110% if last year's AGI was over $150,000.",
      },
    ],
  },

  "ecommerce/profit-margin-calculator": {
    quickAnswer:
      "A product that costs $24 and sells for $49.99 makes $25.99 of profit per unit, a 52.0% gross margin and a 108.3% markup. Margin is measured on price, markup on cost, and confusing them is the classic pricing error. At 100 units the total profit is $2,599.",
    howItWorks: [
      "Enter your cost per unit and your selling price. The calculator subtracts cost from price to get profit per unit, then divides by the price to get the margin percentage. A $24 cost and a $49.99 price give $25.99 of profit, which is 52.0% of the price, so just over half of every sale is gross profit. Cost here means the full landed cost: product, freight and packaging, not just the supplier price.",
      "Margin and markup describe the same profit from different sides. Markup divides profit by cost, so the same $25.99 of profit is a 108.3% markup on a $24 cost. Margin divides profit by price, so it can never reach 100%, while markup has no ceiling. Retailers usually talk margin; suppliers usually quote markup. A 100% markup is only a 50% margin, the conversion most pricing mistakes turn on.",
      "The reverse mode answers the pricing question backwards: enter your cost and the margin you want, and the calculator gives the price that produces it. A 40% margin on a $24 cost needs a $40.00 price, not $33.60, because the margin is taken from the price, not added to the cost. Adding 40% to cost gives only a 28.6% margin, which is why the reverse mode exists.",
      "The units field scales the result to a whole order or a month of sales. One unit at a 52.0% margin makes $25.99; 100 units make $2,599 of profit on $4,999 of revenue. Use it to test whether a thin margin still works at volume, or whether a high margin on tiny volume leaves too little total profit.",
      "The verdict line judges the margin against what a business has to pay from it. Below 10% there is almost nothing left for platform fees, ads and overheads; 25% to 50% is workable for most e-commerce; above 50% there is real room to grow. Gross margin is before fees and ads, so a 52% gross margin can still end thin after a marketplace takes its cut.",
    ],
    formula:
      "Profit = selling price minus cost. Gross margin = profit divided by selling price, times 100. Markup = profit divided by cost, times 100. Target price for a margin = cost divided by (1 minus the target margin as a decimal).",
    example: {
      title: "Worked example: $24 cost, $49.99 price, 100 units sold",
      body: "A product costs $24 landed and sells for $49.99. Profit per unit is $25.99. Gross margin is $25.99 divided by $49.99, or 52.0%. Markup is $25.99 divided by $24, or 108.3%. Over 100 units, revenue is $4,999 and total profit is $2,599. If the target were a 40% margin instead, the price would need to be $24 divided by 0.60, or $40.00, giving $16.00 of profit per unit. Adding 40% to the cost would only price it at $33.60, a 28.6% margin. Before spending on ads, subtract the marketplace fee from that $25.99: at a 15% referral fee the real profit is $18.49, a 37.0% net margin.",
    },
    faqs: [
      {
        question: "What is a good profit margin for e-commerce?",
        answer:
          "It depends on the category and the fees. Gross margins of 25% to 50% are common in e-commerce, but the margin has to cover marketplace fees, payment processing, shipping and ads before it is real profit. A 50% gross margin can end below 20% net after a 15% marketplace fee and ad spend.",
      },
      {
        question: "What is the difference between margin and markup?",
        answer:
          "Margin divides profit by the selling price; markup divides profit by the cost. A $24 product sold for $49.99 has a 52.0% margin and a 108.3% markup on the same $25.99 of profit. Margin can never reach 100%; markup has no ceiling. Mixing them up is the most common pricing error.",
      },
      {
        question: "How do I price for a target margin?",
        answer:
          "Divide the cost by one minus the margin as a decimal. For a 40% margin on a $24 cost, divide $24 by 0.60 to get $40.00. Adding 40% to the cost instead gives $33.60, which is only a 28.6% margin. The reverse mode on this calculator does the division for you.",
      },
      {
        question: "Does margin include shipping and fees?",
        answer:
          "Only if you include them in the cost. The calculator's cost field should hold the full landed cost: product, freight, packaging and any per-unit fee you always pay. Marketplace percentage fees and ad spend come out of the margin afterwards, which is why the fee calculators on this site exist.",
      },
    ],
  },

  "ecommerce/roi-calculator": {
    quickAnswer:
      "$10,000 that grows to $14,500 over 3 years is a 45% return on investment, or 13.2% a year compounded. At that annual rate the money would double in about 5.6 years. ROI alone hides the time it took, which is why the calculator shows the annualized figure next to it.",
    howItWorks: [
      "Enter what you invested, what you got back, and how long the money was in. ROI is the profit divided by the amount invested, times 100. On $10,000 invested and $14,500 returned, the profit is $4,500 and the ROI is 45%. The figure is before tax and inflation, so it is a gross return, not what you keep.",
      "The annualized return, or CAGR, spreads the gain evenly across the years so investments of different lengths can be compared. The same 45% total return is 13.2% a year over 3 years, but only 7.7% a year over 5 years. A total return without a time period is not comparable to anything. Always compare annualized returns, never headline totals, when the holding periods differ.",
      "The doubling time shows how long the same annual rate would take to double the investment. At 13.2% a year, $10,000 becomes $20,000 in about 5.6 years. The growth chart plots the balance year by year at that steady rate, which is a smoothed picture: real investments bounce around the average rather than following it. A steady 13.2% and a volatile 13.2% average are very different experiences for the investor.",
      "ROI treats a dollar returned in year one the same as a dollar returned in year ten, which is its main weakness. It ignores when the money came back, what else the money could have done meanwhile, and the risk taken to earn it. Use it for simple comparisons, and use the annualized figure or a proper discounted return for anything with uneven cash flows.",
      "For a business, the invested figure should include everything the return cost: the purchase price, fees, and any money spent improving or promoting the asset. Leaving costs out inflates the ROI and makes a mediocre deal look good. The calculator takes the numbers as given, so the honesty of the result depends on the honesty of the inputs.",
    ],
    formula:
      "Profit = amount returned minus amount invested. ROI = profit divided by amount invested, times 100. Annualized ROI (CAGR) = (amount returned divided by amount invested) to the power of (1 divided by years), minus 1, times 100. Doubling time = ln(2) divided by ln(1 plus the annualized rate).",
    example: {
      title: "Worked example: $10,000 invested, $14,500 back, 3 years",
      body: "$10,000 invested returns $14,500 after 3 years. Profit is $4,500 and ROI is 45%. The annualized return is the cube root of 1.45 minus 1, or 13.2% a year. At 13.2% a year the investment would double in about 5.6 years, and every $1 invested returns $1.45. The same $4,500 profit over 5 years instead of 3 would still be a 45% ROI, but only 7.7% a year, which shows why the time period matters more than the headline percentage. After tax at a 15% long-term capital gains rate, the $4,500 profit would keep $3,825, an after-tax ROI of 38.3%.",
    },
    faqs: [
      {
        question: "What is a good ROI?",
        answer:
          "It depends on the risk and the time. A 13.2% annualized return beats long-run stock market averages, while a 45% total return over 10 years is only 3.8% a year and trails them. Judge any ROI against the annualized rate and the risk taken, not against the headline percentage alone.",
      },
      {
        question: "What is the difference between ROI and CAGR?",
        answer:
          "ROI is the total gain over the whole holding period, whatever its length. CAGR is the steady annual rate that produces the same total, so it allows fair comparisons between investments held for different lengths. A 45% ROI is 13.2% a year over 3 years but 7.7% a year over 5 years.",
      },
      {
        question: "Does ROI include tax and inflation?",
        answer:
          "No. The calculator's ROI is a gross figure before tax, inflation and fees you did not enter. A $4,500 profit taxed at 15% keeps $3,825, and inflation over the holding period takes more. Enter all costs in the invested figure and treat the result as a before-tax return.",
      },
      {
        question: "Can ROI be negative?",
        answer:
          "Yes. If the amount returned is less than the amount invested, the profit is negative and so is the ROI. A $10,000 investment that returns $8,000 is a 20% loss. The annualized figure is not shown for a loss, because the compounding formula needs a positive final value.",
      },
    ],
  },

  "ecommerce/markup-calculator": {
    quickAnswer:
      "A $30 product with a 66.7% markup sells for $50.01, making $20.01 of profit per unit, which is a 40.0% margin. Markup is measured on cost, margin on price, so the two numbers are never equal. A 100% markup is only a 50% margin.",
    howItWorks: [
      "Enter your cost per unit and either a markup percentage or a target margin. In markup mode the price is cost times one plus the markup: $30 at 66.7% gives $50.01. In margin mode the price is cost divided by one minus the margin: $30 at a 40% margin gives $50.00, the same price, because the two describe the same price from opposite sides.",
      "The conversion identities are the heart of the tool. Margin equals markup divided by one plus markup, and markup equals margin divided by one minus margin. A 50% markup is a 33.3% margin; a 200% markup is a 66.7% margin. The table below the result lists the conversions from 10% to 300% markup so you can read them off directly.",
      "Margin can never reach 100%, because the cost is always part of the price. Markup has no ceiling: a $30 product sold for $120 carries a 300% markup and a 75% margin. Chasing a margin above 90% means pricing at more than ten times cost, which only works for products whose cost is a tiny share of their value.",
      "Which figure you use depends on who you are talking to. Suppliers and wholesalers quote markup, because they think in terms of cost plus a percentage. Retailers and accountants talk margin, because they think in terms of what each sale keeps. Using the wrong one in a negotiation means agreeing to a number neither side meant.",
      "Both figures are gross: they ignore platform fees, payment processing, shipping and ads, all of which come out of the margin afterwards. A 40% gross margin on a marketplace that takes 15% leaves 25% before ads. Run the fee calculators for your channel after pricing, and treat the margin here as the starting point, not the profit you keep.",
    ],
    formula:
      "Markup mode: price = cost times (1 plus markup). Margin mode: price = cost divided by (1 minus margin). Profit = price minus cost. Markup = profit divided by cost, times 100. Margin = profit divided by price, times 100. Margin = markup divided by (1 plus markup).",
    example: {
      title: "Worked example: $30 cost, 66.7% markup, 40% margin",
      body: "A product costs $30 and you apply a 66.7% markup. The price is $30 times 1.667, or $50.01. Profit is $20.01 per unit. Margin is $20.01 divided by $50.01, or 40.0%. The same price comes from the margin side: $30 divided by 0.60 is $50.00. The conversion table shows the pattern: a 50% markup is a 33.3% margin, a 100% markup is a 50% margin, and a 200% markup is a 66.7% margin. Each doubling of the markup buys less and less extra margin. That is why a supplier offering to raise your markup from 100% to 200% is offering 16.7 points of margin, not a doubling of profit.",
    },
    faqs: [
      {
        question: "What is the difference between markup and margin?",
        answer:
          "Markup is profit divided by cost; margin is profit divided by price. On a $30 product sold for $50.01, the $20.01 profit is a 66.7% markup and a 40.0% margin. They describe the same profit from different sides, and the two percentages are never equal.",
      },
      {
        question: "How do I convert markup to margin?",
        answer:
          "Divide the markup by one plus the markup. A 100% markup becomes 100 divided by 200, or a 50% margin. A 50% markup becomes 50 divided by 150, or 33.3%. The conversion table on this page lists the common values from 10% to 300% markup.",
      },
      {
        question: "Can margin be more than 100%?",
        answer:
          "No. Margin is profit divided by price, and profit is always less than price when the cost is positive, so margin always stays below 100%. Markup has no ceiling: a $30 product sold for $120 has a 300% markup and a 75% margin.",
      },
      {
        question: "Should I price using markup or margin?",
        answer:
          "Use margin when you are deciding what a sale keeps after fees and ads, because margin is measured on the price the customer actually pays. Use markup when a supplier quotes cost-plus pricing. The calculator switches between the two, so you can price either way and see both figures.",
      },
    ],
  },

  "ecommerce/etsy-fee-calculator": {
    quickAnswer:
      "A $45 item with $5 shipping on Etsy nets $24.30 for a US seller after $5.20 of fees and $20.50 of costs. Etsy takes 10.4% of the $50 the buyer pays: a $0.20 listing fee, 6.5% transaction fee and 3% plus $0.25 payment processing. Offsite Ads would take another $6.00.",
    howItWorks: [
      "Enter your item price and the shipping you charge the buyer. Etsy charges its percentage fees on the price plus shipping combined, not on the price alone, so free shipping is not free: the fee base is the same $50 whether the buyer pays $45 plus $5 shipping or $50 with shipping included. Gift wrap is in the fee base too, when the buyer pays for it.",
      "Three fees apply to every US sale. The listing fee is $0.20 per item, charged when you publish and again each time a multi-quantity listing sells. The transaction fee is 6.5% of the order total. Payment processing through Etsy Payments is 3% plus $0.25. Together they take roughly 9.5% to 10% of a typical sale before any advertising.",
      "The regulatory operating fee applies only in certain non-US countries, where Etsy passes through digital services taxes. US sellers do not pay it, so set the slider to 0% for a US shop. Sellers elsewhere should use their own rate: as of June 2026 the UK pays 0.48%, France 1.14%, Spain 0.88%, Italy 0.80%, Canada 0.50% and India 0.05%. Etsy changes these rates with notice, so check the fee page in your Shop Manager before repricing.",
      "Offsite Ads is the fee that surprises sellers. Etsy promotes your listings on Google and social media, and if a buyer clicks an ad and buys within 30 days, Etsy takes 15% of the order if your shop made under $10,000 in the past year, or 12% if it made $10,000 or more. Above $10,000 the program is mandatory and you cannot opt out. The fee is capped at $100 per order.",
      "The reverse solver prices for the margin you want instead of the price you guessed. Enter a target margin and it works out the listing price that leaves that margin after every fee and your costs. A 30% target on the example below needs a $29.63 price with $5 shipping: anything below that, and the fees eat the margin you planned.",
    ],
    formula:
      "Revenue = item price plus shipping charged. Total fees = $0.20 listing fee, plus 6.5% of revenue, plus 3% of revenue plus $0.25, plus the regulatory percentage where it applies, plus 12% or 15% of revenue on Offsite Ads orders. Net = revenue minus total fees minus item cost minus shipping cost.",
    example: {
      title: "Worked example: $45 item, $5 shipping, US seller, no ads",
      body: "A US seller lists an item at $45 with $5 shipping, so the buyer pays $50. The listing fee is $0.20. The transaction fee is 6.5% of $50, or $3.25. Payment processing is 3% of $50 plus $0.25, or $1.75. There is no regulatory fee for a US seller. Total Etsy fees are $5.20, or 10.4% of the sale. The item costs $14 and shipping costs $6.50, so net profit is $24.30, a 48.6% margin. If the sale came through Offsite Ads at 12%, Etsy would take another $6.00 and net profit would fall to $18.30. To keep a 30% margin after fees and costs, the reverse solver prices this item at $29.63 with the same $5 shipping.",
    },
    faqs: [
      {
        question: "How much does Etsy take from each sale?",
        answer:
          "For a US seller, the mandatory fees are a $0.20 listing fee, a 6.5% transaction fee and 3% plus $0.25 payment processing, roughly 9.5% to 10% of the sale before advertising. Offsite Ads can add 12% or 15% on attributed orders. The calculator shows the exact fee share for your price.",
      },
      {
        question: "Does Etsy charge fees on shipping?",
        answer:
          "Yes. The 6.5% transaction fee and the payment processing fee apply to the item price plus the shipping the buyer pays, plus gift wrap. Charging $5 for shipping on a $45 item means the fees are calculated on $50. Offering free shipping does not reduce the fee base unless you also lower the total price.",
      },
      {
        question: "Can I opt out of Offsite Ads?",
        answer:
          "Only if your shop made under $10,000 on Etsy in the past 365 days, in which case you pay 15% on attributed orders and can opt out in Shop Manager. Once your shop passes $10,000, enrollment is mandatory for the life of the shop and the rate drops to 12%. The fee is capped at $100 per order.",
      },
      {
        question: "Do US sellers pay the regulatory operating fee?",
        answer:
          "No. Etsy applies the regulatory operating fee only in certain non-US countries to cover digital services taxes. US sellers should set the regulatory slider to 0%. As of June 2026, sellers in the UK pay 0.48%, France 1.14%, Spain 0.88%, Italy 0.80%, Canada 0.50% and India 0.05%.",
      },
    ],
  },

  "ecommerce/ebay-fee-calculator": {
    quickAnswer:
      "A $120 sale on eBay nets $39.28 after a 13.6% final value fee of $16.32, a $0.40 per-order fee, a $55 item cost and $9 shipping. That is a 32.7% margin. The fee is charged on the total the buyer pays, including shipping and sales tax, so the real rate is higher than the headline percentage suggests.",
    howItWorks: [
      "Enter your item price and the shipping you charge the buyer. eBay's final value fee is calculated on the total amount of the sale, which means price plus shipping plus any sales tax eBay collects, not on the item price alone. Free shipping does not escape the fee: the buyer still pays the item price, and the fee follows the total.",
      "For most categories the final value fee is 13.6% of the total up to $7,500 per item, then 2.35% on the portion above $7,500. Some categories differ: coins and paper money and select trading cards pay 13.25%, books, movies and music pay 15.3%, guitars and basses pay 6.7%, and athletic shoes over $150 pay 8% with no per-order fee. The percentage field is editable, so set it to your category's rate from Seller Hub.",
      "On top of the percentage, every order carries a per-order fee: $0.30 on orders of $10 or less, $0.40 above $10. On a $120 sale that is a small line, but on a $5 sale the $0.30 is 6% on its own, which is why low-priced items feel the fee structure hardest. The first 250 listings a month are free; after that, insertion fees are $0.35 per listing.",
      "Promoted Listings is eBay's pay-per-sale advertising: you set an ad rate as a percentage of the sale, and eBay charges it only when the sale is attributed to your promoted listing. A 5% ad rate on a $120 sale adds $6.00 of fees, cutting the profit in the example below from $39.28 to $33.28. The slider shows the cost before you commit to a rate.",
      "The break-even line is the lowest price that covers fees and costs. Below $74.54 on the example below, the listing loses money after fees. eBay Store subscribers pay lower final value fees in many categories, which moves the break-even price down, but the subscription itself is a fixed monthly cost, so it only pays once volume covers it.",
    ],
    formula:
      "Total sale = item price plus shipping charged. Final value fee = total sale times your category percentage. Total fees = final value fee plus the $0.30 or $0.40 per-order fee, plus the promoted rate times the sale where it applies. Profit = total sale minus total fees minus item cost minus shipping cost.",
    example: {
      title: "Worked example: $120 sale, 13.6% fee, $55 item cost",
      body: "An item sells for $120 with no shipping charged. The final value fee at 13.6% is $16.32, and the per-order fee is $0.40, so total fees are $16.72 and the payout is $103.28. The item cost $55 and shipping cost $9, so profit is $39.28, a 32.7% margin. A 5% promoted rate would add $6.00 of fees and cut profit to $33.28. The break-even price is $74.54: below that, fees and costs exceed the sale price. Note that eBay also charges the fee on sales tax collected, so where tax applies the fee is slightly higher than this calculator shows.",
    },
    faqs: [
      {
        question: "What is eBay's final value fee in 2026?",
        answer:
          "For most categories it is 13.6% of the total amount of the sale up to $7,500 per item, then 2.35% on the portion above $7,500, plus a $0.30 or $0.40 per-order fee. Coins and select trading cards pay 13.25%, books, movies and music pay 15.3%, guitars and basses pay 6.7%, and athletic shoes over $150 pay 8% with no per-order fee. The rate field in the calculator is editable for your category.",
      },
      {
        question: "Does eBay charge fees on shipping and tax?",
        answer:
          "Yes. The final value fee is calculated on the total amount of the sale, which includes the item price, shipping charged to the buyer and sales tax collected. This calculator works from price plus shipping only, so where sales tax applies the real fee is slightly higher than shown.",
      },
      {
        question: "How does Promoted Listings pricing work?",
        answer:
          "You set an ad rate as a percentage of the sale price, and eBay charges it only when a buyer clicks your promoted listing and buys within 30 days. The fee is charged on top of the final value fee. A 5% rate on a $120 sale adds $6.00, so test the rate in the calculator before committing.",
      },
      {
        question: "Is an eBay Store subscription worth it?",
        answer:
          "It lowers final value fees in many categories and raises the free-listing allowance, but it is a fixed monthly cost, so it only pays once your volume covers it. Compare the fee saving on your monthly sales with the subscription price, and remember the subscription does not remove the per-order fee.",
      },
    ],
  },

  "ecommerce/shopify-margin-calculator": {
    quickAnswer:
      "A $60 product with $22 of product cost, $6 of shipping and $2 of other costs makes $27.96 per order on Shopify after the 2.9% plus $0.30 payment fee, a 46.6% true margin. At 300 orders a month that is $8,388 of profit, before the plan subscription and ad spend.",
    howItWorks: [
      "Enter your selling price, product cost, shipping charged and shipping cost, plus any other per-order cost such as packaging. The calculator adds the Shopify Payments fee automatically at 2.9% plus $0.30 on the total charged to the customer, which is the Basic plan online card rate for US stores in 2026. The fee applies to price plus shipping charged, so free shipping still pays the card fee on the full order.",
      "The payment rate falls as the plan rises: 2.7% plus $0.30 on Grow, 2.5% plus $0.30 on Advanced, and 2.25% plus $0.30 on Plus. The calculator uses the Basic rate, so stores on higher plans keep slightly more per order than shown. The difference between Basic and Advanced is 0.4% per order, or $0.24 on a $60 sale.",
      "Using a third-party gateway instead of Shopify Payments costs more, not less. Shopify adds a transaction fee on top of the gateway's own fee: 2% on Basic, 1% on Grow, 0.6% on Advanced and 0.2% on Plus. A PayPal sale on Basic therefore costs PayPal's fee plus another 2% to Shopify, which is why Shopify Payments is usually the cheaper route.",
      "The orders field turns the per-order figure into a monthly profit. At 300 orders a month and $27.96 of profit per order, the store makes $8,388 before the subscription and ads. The $39-a-month Basic plan is a rounding error at that volume, but it matters at 10 orders a month, where it takes $3.90 of every order's profit.",
      "The verdict line ties margin to advertising. Under a 20% true margin there is almost no room for ad spend, and the break-even ROAS climbs above 5x. At a 46.6% margin the break-even ROAS is 2.15x, so every $1 of ad spend must return at least $2.15 of revenue. Below that line, ads lose money no matter how good the click-through rate looks.",
    ],
    formula:
      "Amount charged = selling price plus shipping charged. Payment fee = amount charged times 2.9%, plus $0.30. Profit per order = amount charged minus product cost minus shipping cost minus other costs minus the payment fee. True margin = profit per order divided by amount charged. Monthly profit = profit per order times orders.",
    example: {
      title: "Worked example: $60 price, $22 cost, 300 orders a month",
      body: "A store sells a product for $60 with no shipping charged. Product cost is $22, shipping costs $6 and other costs are $2. The Shopify Payments fee is 2.9% of $60 plus $0.30, or $2.04. Profit per order is $60 minus $22 minus $6 minus $2 minus $2.04, which is $27.96, a 46.6% true margin. At 300 orders a month, monthly profit is $8,388 before the subscription and ad spend. Break-even ROAS is 1 divided by 0.466, or 2.15x: ads returning less than $2.15 per $1 spent lose money on this product. On the Advanced plan the payment fee would be $1.80 instead of $2.04, adding $0.24 of profit to every order, or $72 a month at this volume.",
    },
    faqs: [
      {
        question: "What does Shopify charge per sale?",
        answer:
          "With Shopify Payments on the Basic plan, an online card sale costs 2.9% plus $0.30. The rate falls to 2.7% on Grow, 2.5% on Advanced and 2.25% on Plus. In-person card sales are cheaper, from 2.6% plus $0.10 on Basic. The monthly plan subscription is separate from the per-sale fee.",
      },
      {
        question: "Do I pay extra for using PayPal or Stripe on Shopify?",
        answer:
          "Yes, unless you use Shopify Payments as your primary provider. Shopify adds a transaction fee on top of a third-party gateway's own fee: 2% on Basic, 1% on Grow, 0.6% on Advanced and 0.2% on Plus. That is why the calculator assumes Shopify Payments.",
      },
      {
        question: "Does the calculator include the monthly plan cost?",
        answer:
          "No. It works out profit per order and monthly profit from orders alone. The Basic plan costs $39 a month billed monthly, or $29 a month billed yearly, and you should subtract it from the monthly profit figure yourself. At high volumes it is small; at low volumes it matters.",
      },
      {
        question: "What is break-even ROAS?",
        answer:
          "The return on ad spend at which an order makes exactly zero profit after ads: one divided by your true margin. At a 46.6% margin it is 2.15x, so each $1 of ad spend must bring in $2.15 of revenue. Spend below that line and the order loses money; above it, the difference is profit.",
      },
    ],
  },

  "ecommerce/amazon-fba-fee-calculator": {
    quickAnswer:
      "A $39.99 Home and Kitchen product sold through FBA nets $16.98 after a 15% referral fee of $6.00, a $4.76 fulfilment fee including the 3.5% surcharge, $0.45 of storage and $0.80 of inbound shipping, on an $11 product cost. That is a 42.5% margin, or $8,490 across 500 units.",
    howItWorks: [
      "Enter your selling price, landed product cost, category and size tier, plus storage and inbound shipping per unit. Amazon charges two fees on every sale: a referral fee, which is a percentage of the price, and a fulfilment fee, which is a flat amount set by the size tier, the shipping weight and the price band the item sells in.",
      "The referral fee is 15% in most categories, with a $0.30 minimum per item. Electronics pays 8% and clothing and accessories pays 17%, so the category picker matters: the same $39.99 product pays $6.00 in Home and Kitchen but $3.20 in Electronics. The fee is charged on the total the buyer pays, including delivery charges. Gift wrap is included in the referral fee base too.",
      "The fulfilment fee depends on size tier, weight and price band. Since January 2026 there are three price bands, under $10, $10 to $50 and over $50, and the same item costs more to fulfil at a higher price. A large standard item around 1 lb in the $10 to $50 band costs $4.60 non-peak, and Amazon adds a 3.5% fuel and logistics surcharge on top, bringing it to $4.76.",
      "Peak-season rates apply from October 15 to January 14, when fulfilment fees rise across the tiers. A large standard item that costs $4.60 non-peak costs more through the holidays, so the same product is less profitable in the fourth quarter. The calculator uses non-peak figures, so treat the result as the better half of the year and check Seller Central for peak rates.",
      "Storage and inbound shipping are the costs sellers forget. Storage is charged monthly per cubic foot, so slow-moving stock costs more every month it sits, and aged inventory surcharges add more after a year. Inbound shipping is what you pay to get stock into Amazon's warehouses. Both are per-unit inputs here, so spread the real monthly figures across the units you expect to sell.",
    ],
    formula:
      "Referral fee = selling price times the category percentage, with a $0.30 minimum. Fulfilment fee = the size-tier rate for the price band, plus the 3.5% surcharge. Total fees = referral fee plus fulfilment fee plus storage plus inbound shipping. Profit = selling price minus product cost minus total fees.",
    example: {
      title: "Worked example: $39.99 Home and Kitchen item, large standard",
      body: "A Home and Kitchen product sells for $39.99 with a landed cost of $11. The referral fee at 15% is $6.00. The fulfilment fee for a large standard item around 1 lb in the $10 to $50 band is $4.60, plus the 3.5% surcharge, giving $4.76. Storage is $0.45 and inbound shipping is $0.80, so total fees are $12.01. Profit is $39.99 minus $11 minus $12.01, or $16.98, a 42.5% margin. Across 500 units that is $8,490 of profit. In the October to January peak season the fulfilment fee is higher, so the same sale would net less. Shrinking the package into the small standard tier would cut the fulfilment fee to about $3.54 including the surcharge, adding about $1.22 of profit to every unit.",
    },
    faqs: [
      {
        question: "What is the Amazon referral fee in 2026?",
        answer:
          "15% of the total sales price in most categories, with a $0.30 minimum per item. Electronics pays 8% and clothing and accessories pays 17%. The fee is charged on the total the buyer pays, including delivery charges, and it applies whether you fulfil the order yourself or use FBA.",
      },
      {
        question: "What is the FBA fulfilment fee?",
        answer:
          "A flat per-unit fee for picking, packing and shipping, set by size tier, shipping weight and price band. Since January 2026 there are three price bands, under $10, $10 to $50 and over $50. A 3.5% fuel and logistics surcharge has applied since April 2026, and peak rates run from October 15 to January 14.",
      },
      {
        question: "How does Amazon decide my size tier?",
        answer:
          "From your packaged product's dimensions and weight, using the greater of actual weight or dimensional weight. Small standard covers items under 16 oz, large standard goes up to 20 lb. Shrinking packaging can drop you into a cheaper tier, which is often the fastest way to improve FBA margin.",
      },
      {
        question: "Do I need a Professional selling plan for FBA?",
        answer:
          "FBA works with either plan, but the Professional plan costs $39.99 a month and the Individual plan charges $0.99 per item sold instead. Above about 40 items a month the Professional plan is cheaper. The calculator does not include either plan fee, so subtract it from the monthly profit yourself.",
      },
    ],
  },

  "ecommerce/sales-tax-vat-calculator": {
    quickAnswer:
      "A $100 purchase in California at the 7.25% state rate plus a 1.5% local add-on costs $108.75, with $8.75 of sales tax. In Chicago the combined rate is 10.25%, so the same purchase costs $110.25. Five states charge no statewide sales tax at all.",
    howItWorks: [
      "Pick a system first: US sales tax or VAT. In the US, tax is added on top of the shelf price, so a $100 item at 8.75% costs $108.75 at the till. Under VAT, the shelf price already includes the tax, so a £120 price at 20% VAT contains £20 of tax and £100 of net value. The two systems answer different questions.",
      "For US sales tax, pick your state and add your local rate. The state base is only the floor: California's 7.25% is the highest state rate, but local add-ons push combined rates past 10% in many cities. Chicago totals 10.25% on a 6.25% Illinois base, and the population-weighted average combined rate across the US was 7.53% in July 2026.",
      "Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire and Oregon. Alaska is the exception within the exception, because its boroughs can levy local sales tax of up to about 7%. The other four charge nothing at state or local level, which is why cross-border shopping trips to Oregon and Delaware are a real business.",
      "The VAT side works in two modes. Add mode charges tax on top of a net price, the way a B2B invoice works. Extract mode pulls the tax out of a tax-inclusive price, which is the shelf-price model: never calculate it as gross times the rate, because that overstates the tax. At 20% VAT, the tax inside £120 is £20, not £24.",
      "Rates in the calculator are the published state bases and standard VAT rates, but exemptions and local changes move the real figure. Groceries are exempt from state sales tax in most states, clothing is exempt in a few, and local rates change several times a year. Confirm the exact rate for your ZIP code or country with the state revenue department before filing or quoting a price.",
    ],
    formula:
      "US add mode: tax = net amount times the combined rate; total = net amount plus tax. VAT add mode works the same way. VAT extract mode: net amount = gross amount divided by (1 plus the rate); tax = gross amount minus net amount. Combined US rate = state base rate plus local add-on.",
    example: {
      title: "Worked example: $100 in California, £120 under UK VAT",
      body: "A $100 item in California at the 7.25% state rate plus a 1.5% local add-on is taxed at 8.75%, so the tax is $8.75 and the total is $108.75. The same $100 item in Chicago at 10.25% costs $110.25. Under UK VAT at 20%, a £120 shelf price contains £20 of tax: divide £120 by 1.20 to get the £100 net price, then subtract. Calculating it as £120 times 20% would wrongly give £24. A $100 item in Oregon, with no sales tax, costs exactly $100. The gap between the cheapest and dearest US checkout on the same $100 item is more than $10, which is why the state picker matters more than the arithmetic.",
    },
    faqs: [
      {
        question: "Which states have no sales tax?",
        answer:
          "Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire and Oregon. Only Alaska lets local governments levy one, up to about 7% in some boroughs. The other four charge no sales tax at state or local level, though New Hampshire taxes meals and lodging at 8.5%.",
      },
      {
        question: "Why is the tax on my receipt higher than the state rate?",
        answer:
          "Because most states let counties, cities and special districts add their own sales tax on top of the state base. Chicago's 10.25% is a 6.25% Illinois base plus county, city and transit add-ons. The calculator's local slider covers this: set it to your combined local rate.",
      },
      {
        question: "How do I extract VAT from a price that includes it?",
        answer:
          "Divide the gross price by one plus the VAT rate, then subtract. At 20% VAT, £120 divided by 1.20 is £100 net, so the VAT is £20. Multiplying the gross price by 20% gives £24, which is wrong, because the 20% applies to the net price, not the gross one.",
      },
      {
        question: "What is the average US sales tax rate?",
        answer:
          "The population-weighted average combined state and local rate was 7.53% in July 2026, according to the Tax Foundation. Louisiana has the highest average combined rate at 10.13%, and combined rates in some cities exceed 13%. Your exact rate depends on the address of the sale.",
      },
    ],
  },

  "ecommerce/customer-acquisition-cost-calculator": {
    quickAnswer:
      "Spending $5,000 on ads and $1,500 on other acquisition to win 400 new customers gives a blended CAC of $16.25. The paid-only CAC is $20.00, because only 250 of the 400 came from ads. At a $65 first order, acquisition costs 25% of the first sale.",
    howItWorks: [
      "Enter all acquisition spending for one period, split into paid ad spend and everything else: content, tools, agency fees and the team's time. Then enter the total new customers in the same period and how many of them came from paid ads. Using the same period for every input is what makes the figure honest. Mixing a month of spend with a quarter of customers is the most common way to produce a flattering CAC.",
      "Blended CAC divides all acquisition spend by all new customers: $6,500 divided by 400 is $16.25. It is the number that matters for the business as a whole, because organic customers are not free: the content and tools that attracted them are in the spend. A blended CAC that falls as you grow usually means organic channels are doing more of the work.",
      "Paid CAC isolates the ad channels: ad spend divided by customers from paid ads, $5,000 divided by 250, or $20.00. Comparing the two figures shows what organic acquisition is worth. Here the gap is $3.75 per customer, which is the saving from the 150 customers who arrived without a paid click. If paid CAC rises while blended CAC holds steady, your organic channels are subsidizing worsening ad efficiency.",
      "The CAC-to-AOV line puts the cost next to the first order. At $16.25 of CAC against a $65 first order, acquisition takes 25% of the first sale, leaving 75% to cover product cost, fulfilment and profit. If CAC ever exceeds the gross profit on the first order, the business depends on repeat purchases to survive, which is a much riskier position.",
      "CAC alone cannot tell you whether acquisition is profitable: it needs the lifetime value beside it. A $16.25 CAC is cheap if the customer is worth $378 over three years and expensive if they never buy again. Use the LTV to CAC calculator next, and judge the pair together rather than either figure alone.",
    ],
    formula:
      "Total spend = paid ad spend plus other acquisition spend. Blended CAC = total spend divided by total new customers. Paid CAC = paid ad spend divided by new customers from paid ads. Organic customers = total new customers minus paid customers. CAC to AOV = blended CAC divided by average first order value.",
    example: {
      title: "Worked example: $6,500 of spend, 400 new customers",
      body: "A store spends $5,000 on ads and $1,500 on content, tools and team time in one month, for $6,500 of total acquisition spend. It wins 400 new customers, of whom 250 came from paid ads and 150 arrived organically. Blended CAC is $6,500 divided by 400, or $16.25. Paid CAC is $5,000 divided by 250, or $20.00. The average first order is $65, so blended CAC is 25% of the first sale. If the ad budget doubled but only added 100 more paid customers, paid CAC would rise to $28.57. That is the shape of diminishing returns: the next customer always costs more than the last one did.",
    },
    faqs: [
      {
        question: "What is a good CAC?",
        answer:
          "There is no universal number: a $16.25 CAC is excellent for a $65 first order and ruinous for a $10 one. Judge CAC against the gross profit on the first order and against lifetime value. The useful test is the LTV to CAC ratio, where 3 to 1 or better is generally considered healthy.",
      },
      {
        question: "What is the difference between blended and paid CAC?",
        answer:
          "Blended CAC divides all acquisition spend by all new customers, including organic ones. Paid CAC divides ad spend by customers from ads only. Blended is the number that matters for the business; paid isolates ad efficiency. When they drift apart, organic channels are either subsidizing or failing to offset paid costs.",
      },
      {
        question: "Should salaries count in CAC?",
        answer:
          "Yes, if the work is acquisition: the marketing team's salaries, agency fees, content production and tools all belong in the spend. Leaving them out produces a CAC that flatters the ads and hides the real cost of growth. The other spend field in this calculator is where those costs go.",
      },
      {
        question: "How often should I recalculate CAC?",
        answer:
          "Monthly, on a rolling basis, using the same period for spend and customers. CAC moves with seasonality, ad auctions and channel mix, so a single month can mislead. Watch the trend over three to six months, and split it by channel when one channel's CAC starts rising.",
      },
    ],
  },

  "ecommerce/ltv-to-cac-ratio-calculator": {
    quickAnswer:
      "A customer who orders $70 three times a year for three years at a 60% margin is worth $378 of profit. Against a $45 acquisition cost, the LTV to CAC ratio is 8.4 to 1, and the acquisition cost is paid back in 4.3 months. A ratio above 5 usually means the business is underspending on growth.",
    howItWorks: [
      "Enter the average order value, how many orders a customer places per year, how many years they stay, your gross margin, and your cost to acquire one customer. The calculator multiplies the first four into a lifetime value, then divides by the acquisition cost. Every input is an average, so the result describes a typical customer, not any single one.",
      "Lifetime value here is profit, not revenue. A customer who spends $630 over three years at a 60% margin is worth $378, because the other $252 is product and fulfilment cost. Using revenue instead of profit would overstate the ratio by two-thirds, which is the most common LTV mistake and the one this calculator is built to prevent.",
      "The ratio bands are the verdict. Below 1 to 1 the business loses money on every customer. From 1 to 3 it is fragile: profitable on paper, but one bad month of churn or ad prices can wipe out the margin. From 3 to 5 is healthy, the range most sustainable businesses sit in. Above 5, the business is probably underspending on growth and leaving customers unacquired.",
      "Payback period is the cash-flow half of the answer. A $45 acquisition cost against $10.50 of monthly profit per customer takes 4.3 months to recover. A great ratio with a two-year payback can still sink a business that runs out of cash first, so check both numbers before raising ad spend. Short payback with a weak ratio is the opposite problem: fast cash, thin lifetime profit.",
      "The weakest input is usually lifespan, because few businesses have three years of clean retention data. If you are guessing, run the calculation twice: once with your optimistic lifespan and once with half of it. If the ratio stays above 3 on the pessimistic run, the acquisition model is robust; if it falls below 1, the business depends on a guess.",
    ],
    formula:
      "Revenue LTV = average order value times orders per year times customer lifespan in years. Profit LTV = revenue LTV times gross margin. LTV to CAC ratio = profit LTV divided by CAC. Monthly profit per customer = average order value times orders per year times margin, divided by 12. Payback months = CAC divided by monthly profit per customer.",
    example: {
      title: "Worked example: $70 orders, 3 a year, 3-year lifespan",
      body: "A customer orders $70 three times a year for three years, spending $630 in total. At a 60% gross margin the profit lifetime value is $378. Acquisition costs $45, so the LTV to CAC ratio is 8.4 to 1, above the healthy 3 to 5 band, and the verdict is possibly underspending: the business could afford to pay more for customers and still profit. Monthly profit per customer is $10.50, so the $45 acquisition cost is paid back in 4.3 months. Halving the lifespan to 1.5 years would still leave a 4.2 to 1 ratio. That resilience is the point of the stress test: the model holds even if customers leave twice as fast as expected.",
    },
    faqs: [
      {
        question: "What is a good LTV to CAC ratio?",
        answer:
          "The widely cited healthy range is 3 to 1 or better: each customer returns at least three times what they cost to acquire, measured on profit, not revenue. Below 1 to 1 the business loses money per customer. Above 5 to 1 usually means underspending on growth rather than excellence.",
      },
      {
        question: "Should LTV use revenue or profit?",
        answer:
          "Profit. A customer who spends $630 at a 60% margin is worth $378, because $252 is product and fulfilment cost. Using revenue overstates the ratio by two-thirds and can make a losing acquisition model look healthy. This calculator always uses profit LTV.",
      },
      {
        question: "How do I estimate customer lifespan?",
        answer:
          "From retention data if you have it: one divided by your annual churn rate is a rough lifespan. Without data, use your best estimate and stress-test it by halving it. If the ratio stays above 3 on the halved lifespan, the model is robust; if it falls below 1, it depends on a guess.",
      },
      {
        question: "What if my payback period is longer than a year?",
        answer:
          "Then growth consumes cash for a long time before it returns it, even if the ratio looks good. Shorten payback by raising first-order value, improving margin or lowering CAC. A ratio of 8 to 1 with a two-year payback can still bankrupt a business that runs out of cash first.",
      },
    ],
  },

  "ecommerce/target-roas-break-even-calculator": {
    quickAnswer:
      "On an $80 order with $28 of product cost, $7 of shipping and $5 of other costs, gross profit is $40, a 50% margin, so break-even ROAS is 2.0x. At a 3.0x ROAS the ad cost is $26.67 per order and net profit is $13.33. Below 2.0x, every order loses money.",
    howItWorks: [
      "Enter your selling price and every cost that comes out of each order: product cost, shipping and other costs such as packaging and payment fees. The calculator subtracts them all from the price to get gross profit per order, then divides by the price to get the margin. The margin is the only number that sets the break-even ROAS.",
      "Break-even ROAS is one divided by the margin. At a 50% margin it is 2.0x; at a 25% margin it is 4.0x; at a 20% margin it is 5.0x. The relationship is not linear, so a small margin cut has a large effect: dropping from 50% to 40% margin pushes break-even ROAS from 2.0x to 2.5x. That is why discounting to win sales can quietly make the ad account unprofitable.",
      "The current ROAS slider shows what your ads actually earn. Ad cost per order is the price divided by ROAS, so at 3.0x on an $80 order the ad cost is $26.67. Subtract that from the $40 gross profit and the net per order is $13.33. The calculator flags the result profitable only when current ROAS is at or above break-even.",
      "ROAS reported by an ad platform is usually flattered. Platforms claim credit for sales that would have happened anyway, count returning customers as ad wins, and use attribution windows that stretch for weeks. Treat the platform number as an upper bound, and compare it with the blended revenue divided by total ad spend across the whole store.",
      "Two levers move the break-even line: raise the margin or raise the order value. A higher price, a cheaper product cost or lower shipping all lift the margin and lower the ROAS you need. Raising average order value through bundles works differently: it spreads the same ad cost over more revenue, which lifts the ROAS you actually get.",
    ],
    formula:
      "Gross profit = selling price minus product cost minus shipping minus other costs. Margin = gross profit divided by selling price. Break-even ROAS = 1 divided by margin. Ad cost per order = selling price divided by current ROAS. Net profit per order = gross profit minus ad cost per order.",
    example: {
      title: "Worked example: $80 order, $40 gross profit, 3.0x ROAS",
      body: "An $80 order carries $28 of product cost, $7 of shipping and $5 of other costs, leaving $40 of gross profit, a 50% margin. Break-even ROAS is 1 divided by 0.50, or 2.0x. At a current ROAS of 3.0x, ad cost per order is $80 divided by 3, or $26.67, and net profit per order is $40 minus $26.67, or $13.33. At a ROAS of 1.5x, ad cost would be $53.33 and each order would lose $13.33. A 10% discount would cut the price to $72 and the margin to 44.4%, pushing break-even ROAS to 2.25x. The discount looks small on the price tag and large on the ad account: the ROAS the business needs rises by an eighth.",
    },
    faqs: [
      {
        question: "What is a good ROAS?",
        answer:
          "It depends entirely on your margin. At a 50% margin, 2.0x breaks even and 3.0x is profitable; at a 25% margin, 3.0x still loses money and you need 4.0x. There is no good ROAS without a margin beside it, which is why this calculator starts from your order economics.",
      },
      {
        question: "What is the difference between ROAS and ROI on ads?",
        answer:
          "ROAS is revenue divided by ad spend; ROI on ads is profit divided by ad spend. A 3.0x ROAS sounds strong, but at a 50% margin it is only a 50% return on the ad spend after product costs. ROAS ignores costs, so it always flatters the ad account.",
      },
      {
        question: "Why is my platform ROAS higher than my real ROAS?",
        answer:
          "Ad platforms claim credit for sales that would have happened anyway, count returning customers as ad wins, and use long attribution windows. Your real ROAS is total store revenue divided by total ad spend. If the platform says 4.0x and the store says 2.5x, the store is right.",
      },
      {
        question: "How do I improve a ROAS below break-even?",
        answer:
          "Either lift the margin, by raising price, cutting product or shipping cost, or lower the ad cost per order, by improving targeting, creative or landing pages. Raising average order value through bundles also helps, because the same ad cost then buys more revenue per order.",
      },
    ],
  },
}
