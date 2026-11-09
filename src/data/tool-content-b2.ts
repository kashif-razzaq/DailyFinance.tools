/**
 * Tool content — part B: tax, ecommerce, creator and the two new freelance tools.
 * Written in the TONE-OF-VOICE.md voice (professional, direct, concrete numbers).
 * Keyed by URL path without the leading slash, e.g. "tax/paycheck-calculator".
 * Tax figures use the same projected 2026 federal brackets and standard
 * deduction as the calculators themselves, and are labelled estimates.
 */
export interface ToolContentEntry {
  quickAnswer: string
  howItWorks: string[]
  formula?: string
  example: { title: string; body: string }
  faqs: { question: string; answer: string }[]
}

export const TOOL_CONTENT_B2: Record<string, ToolContentEntry> = {
  "ecommerce/inventory-reorder-point-calculator": {
    quickAnswer:
      "Selling 12 units a day with a 10-day supplier lead time and 40 units of safety stock, you should reorder at 160 units: 120 to cover the lead time, plus the 40-unit buffer. Ordering later than that point means stockouts are a matter of demand luck, not planning.",
    howItWorks: [
      "Enter average daily sales for the item, the supplier lead time in days (order placement to shelf-ready, not just shipping), and the safety stock you want to hold. The calculator returns the inventory level at which a new order must be placed.",
      "Safety stock is the judgement input. Set it from variability: the more demand spikes or the less reliable the supplier, the larger the buffer. A common starting formula is (maximum daily sales - average daily sales) x lead time, which sizes the buffer to your worst observed week rather than to a guess.",
      "The result also frames the reorder quantity question. The reorder point says when; how much depends on order costs and holding costs — order too often and freight eats margin, order too much and cash sits on shelves.",
      "Recalculate when anything changes: a new supplier, a sales trend, a promotion. A reorder point built on last quarter's daily sales will stock you out in a growth month and overstock you in a decline.",
    ],
    formula:
      "Reorder point = (average daily sales x lead time in days) + safety stock.",
    example: {
      title: "Worked example: sizing safety stock from demand swings",
      body: "A product averages 12 sales a day but hits 20 on its best days. Lead time is 10 days. Lead-time demand: 12 x 10 = 120 units. Safety stock from the variability formula: (20 - 12) x 10 = 80 units. Reorder point = 120 + 80 = 200 units. Holding the smaller 40-unit buffer instead would cover average demand plus four bad days; the 80-unit buffer covers a full lead time of best-day demand — the right choice for a product where a stockout costs a marketplace ranking.",
    },
    faqs: [
      {
        question: "What is safety stock and how much do I need?",
        answer:
          "Safety stock is inventory held beyond expected lead-time demand to absorb surprises — demand spikes and late deliveries. Service-level targets drive it: items you must never run out of carry more. Start with the variability formula ((max daily sales - average daily sales) x lead time), then adjust using your stockout history: every stockout argues for more, every overstock for less.",
      },
      {
        question: "Does lead time include production and processing?",
        answer:
          "It must include everything between deciding to order and the goods being sellable: supplier processing, production, transit, customs, receiving and inspection. Quoted '5-day shipping' on a product with 10 days of production is a 15-day lead time. Underestimating lead time is the most common cause of reorder points that fail in practice.",
      },
      {
        question: "How often should reorder points be reviewed?",
        answer:
          "Monthly for active products, and immediately when demand or supply changes materially — a promotion, a viral mention, a supplier change, a port delay. Seasonal products need seasonal points: the correct reorder point for November is wrong for February.",
      },
      {
        question: "What is the difference between reorder point and reorder quantity?",
        answer:
          "The reorder point is a level of stock that triggers an order. The reorder quantity is how much the order contains, often set by the economic order quantity (balancing order cost against holding cost) or simply by supplier minimums and case sizes. Confusing the two — ordering the reorder point amount, for example — is a frequent spreadsheet error.",
      },
    ],
  },

  "ecommerce/aov-upsell-simulator": {
    quickAnswer:
      "A $19 upsell accepted by 18% of buyers adds $3.42 to a $52 average order — $55.42 — worth $34,200 a year on 10,000 orders before the upsell's cost. The take rate matters more than the upsell's price: doubling acceptance beats doubling price.",
    howItWorks: [
      "Enter your current average order value, the upsell's price and the share of customers you expect to accept it. The simulator computes the new AOV and the extra revenue across your order volume.",
      "Net the result against the upsell's cost. An upsell with a 60% margin contributes 60% of its headline uplift to profit; a discount-funded upsell can add revenue while subtracting profit. Enter the margin to see both figures.",
      "Post-purchase upsells (shown after payment) behave differently from cart add-ons: they do not risk the original sale. Model them separately, because take rates and refund rates differ between the two placements.",
      "Test sensitivity before building anything. The simulator's point is the range: at a 10% take rate the example adds $1.90 per order; at 25% it adds $4.75. If the feature only pays at the optimistic end, it should not be built yet.",
    ],
    formula:
      "New AOV = current AOV + (upsell price x take rate). Extra profit = orders x upsell price x take rate x upsell margin.",
    example: {
      title: "Worked example: warranty upsell on an electronics store",
      body: "AOV is $120. A $15 extended-warranty upsell carries a 90% margin (it is a service). At a 12% take rate, uplift per order = $15 x 12% = $1.80, of which $1.62 is profit. On 25,000 orders a year that is $40,500 of profit from a single checkout element. Moving the take rate to 18% with clearer copy raises it to $60,750 — a bigger gain than raising the warranty price to $20 at the old take rate ($54,000).",
    },
    faqs: [
      {
        question: "What is a realistic upsell take rate?",
        answer:
          "Post-purchase one-click upsells commonly convert at 5-15% of orders; well-matched cart add-ons (consumables, warranties, gift wrap) can reach 15-30%. Anything above that is usually a pricing artefact — the 'upsell' was part of the product customers expected. Model your first test at the bottom of the range and treat upside as a bonus.",
      },
      {
        question: "Do upsells hurt conversion?",
        answer:
          "Cart-stage offers can: an extra decision before payment costs some checkouts, which is why the main offer belongs behind the payment step where possible. Post-purchase upsells cannot lose the original sale. If you test a cart add-on, measure completed orders, not just AOV — a $3 AOV gain that costs 2% of checkouts is a loss on most stores.",
      },
      {
        question: "What makes a good upsell offer?",
        answer:
          "Related to the purchase, priced well below it (a common ceiling is 25-30% of the main item's price), and easy to decline. Consumables for a device, protection for something fragile, and a quantity upgrade on something used up all qualify. Unrelated products at high prices are the pattern that trains customers to ignore the step.",
      },
      {
        question: "Should the upsell be discounted?",
        answer:
          "A modest discount (10-20%) can lift take rate enough to raise total profit, but check the maths: at a 60% margin, discounting 20% removes a third of the profit per acceptance, so the take rate must rise by 50% to break even on the change. Test it as a numbers question, not a copywriting one.",
      },
    ],
  },

  "ecommerce/black-friday-discount-roi-calculator": {
    quickAnswer:
      "A 30% discount on a $100 item with a 50% margin cuts profit per unit from $50 to $20 — unit sales must rise 2.5x just to match a normal week's profit. An 80% sales lift, which looks like a successful sale event, still leaves profit $14,000 down on a 1,000-unit baseline.",
    howItWorks: [
      "Enter the normal price, unit cost, baseline sales volume and the discount you are planning, plus the volume increase you expect. The calculator compares total profit before and during the promotion — total profit, not revenue and not units.",
      "The mechanism is margin compression. Discounts come entirely out of margin: at a 50% margin a 30% discount removes 60% of the profit per unit. The required volume multiplier (old unit profit / new unit profit) grows sharply as the starting margin gets thinner.",
      "Add promotion costs where they apply: extra ad spend to promote the sale, marketplace deal fees, and the margin given up on units that would have sold at full price anyway. That last one — subsidising existing demand — is the hidden cost of store-wide sales.",
      "Use the result to design the offer, not just judge it. A narrower discount on slow lines, a threshold offer (spend $150, save 20%), or a gift-with-purchase can deliver the traffic effect with a fraction of the margin cost.",
    ],
    formula:
      "Required volume multiplier = normal unit profit / discounted unit profit. Promotion profit = discounted unit profit x expected units - promotion costs.",
    example: {
      title: "Worked example: 30% off at a 50% margin",
      body: "Normal: price $100, cost $50, profit $50 per unit, 1,000 units = $50,000 profit. Sale: price $70, profit $20 per unit. Required volume to match: $50,000 / $20 = 2,500 units — a 150% increase. If the event lifts volume 80% to 1,800 units, profit = 1,800 x $20 = $36,000. Revenue rises from $100,000 to $126,000 and the event still destroys $14,000 of profit. A 20% discount (profit $30 per unit) would need 1,667 units and at 1,800 units would return $54,000 — the smaller headline discount is the better event.",
    },
    faqs: [
      {
        question: "How much extra volume does a discount need to break even?",
        answer:
          "Required extra volume = margin / (margin - discount) - 1, with both as decimals. At a 50% margin: a 10% discount needs 25% more units, 20% needs 67%, 30% needs 150%, and 40% needs 400%. At a 30% margin a 30% discount cannot break even at any volume — profit per unit is zero.",
      },
      {
        question: "Why do big sale events often reduce profit?",
        answer:
          "Three reasons: the discount compresses margin on every unit including those that would have sold anyway; ad costs rise because every competitor bids on the same shoppers; and demand is often pulled forward rather than created, so December slumps after November spikes. Revenue records and profit records are different events.",
      },
      {
        question: "Is a discount ever the right Black Friday strategy?",
        answer:
          "Yes — for clearing stock that will cost more to hold (seasonal goods, ageing inventory with storage fees), for acquiring customers whose lifetime value repays the loss, and where competitors' offers would otherwise take the sale entirely. The calculator's job is to make sure the reason is one of those, with numbers attached, rather than momentum.",
      },
      {
        question: "What alternatives preserve margin?",
        answer:
          "Threshold discounts (20% over $150) raise basket size instead of cutting every price; bundles move slow lines with fast ones at a blended discount smaller than it looks; gifts with purchase cost wholesale but are valued at retail by the customer; and early-access or limited-stock framing creates urgency with no discount at all. Each can be run through the same profit comparison.",
      },
    ],
  },

  "ecommerce/business-loan-runway-calculator": {
    quickAnswer:
      "A business holding $180,000 of cash with a net burn of $15,000 a month has 12 months of runway. A $50,000 loan extends that to about 15.3 months — it buys time at the price of interest and a fixed repayment that raises monthly burn from day one.",
    howItWorks: [
      "Enter current cash, monthly revenue and monthly expenses (or net burn directly), and the loan amount, rate and term you are considering. The calculator shows runway without the loan, the loan's monthly payment, and runway with both the cash and the payment included.",
      "Runway is cash divided by net burn. The loan changes both sides: it adds cash now and subtracts a payment every month. A loan always extends runway when its term is long enough, but by less than the headline amount suggests, because repayments start immediately.",
      "The useful output is the deadline, not the balance. Runway tells you the date by which revenue must rise or costs must fall. Financing decisions should be made against that date — raising money takes months, so the work starts while runway is still long.",
      "Model the downside case. If revenue falls 20%, how many months remain? A plan that only works at current revenue is not a plan the loan makes safe.",
    ],
    formula:
      "Runway (months) = cash / monthly net burn. Loan payment = P x r(1+r)^n / ((1+r)^n - 1), where P is principal, r the monthly rate and n the number of payments.",
    example: {
      title: "Worked example: $50,000 loan at 9% over 36 months",
      body: "The monthly payment on $50,000 at 9% APR over 36 months is $50,000 x 0.0075 x (1.0075)^36 / ((1.0075)^36 - 1) = $1,589.97 — call it $1,590, with total interest of about $7,239 over the term. Cash rises to $230,000 but monthly burn rises to $16,590. Runway = $230,000 / $16,590 = 13.9 months, versus 12 months without the loan. The loan buys about two months of runway, not the 3.3 months the cash alone implies.",
    },
    faqs: [
      {
        question: "How much runway should a business keep?",
        answer:
          "Six months is a common minimum comfort level for a stable small business; 12-18 months is the target most lenders and investors look for in a growth-stage company. Below three months, options narrow sharply: loan approvals, hiring and supplier terms all get worse precisely when the business is weakest.",
      },
      {
        question: "Does a loan always extend runway?",
        answer:
          "Not if the term is short. A 12-month loan repaid faster than the business can use the cash can shorten effective runway: the payment raises burn immediately while the cash is spent over time. Lines of credit drawn only when needed, and longer amortisation, extend runway more reliably per dollar borrowed.",
      },
      {
        question: "What is net burn and how is it different from expenses?",
        answer:
          "Net burn is expenses minus revenue for the month — the amount cash actually falls. A business spending $60,000 and earning $45,000 burns $15,000. Runway calculated on gross expenses ($180,000 / $60,000 = 3 months) understates the position fourfold in that example. Always divide by net burn.",
      },
      {
        question: "Should I take a loan to extend runway or cut costs?",
        answer:
          "Compare what each buys. Cutting $5,000 of monthly burn on $180,000 of cash extends runway from 12 to 18 months permanently and costs no interest; the example loan buys about two months and adds a fixed obligation. Loans make sense when the time bought will be used to reach a specific, plausible revenue milestone — not to postpone a cost decision.",
      },
    ],
  },

  "ecommerce/shipping-zone-optimizer": {
    quickAnswer:
      "Shipping 1,000 parcels a month, cutting the average shipping cost by $1.85 per parcel — typically by stocking inventory closer to customers so fewer parcels travel to far zones — saves $1,850 a month, or $22,200 a year, before the cost of splitting the inventory.",
    howItWorks: [
      "Enter your parcel volume, your current average shipping cost per parcel and the average you would pay with inventory placed nearer your customers — or model a second warehouse or a 3PL node by entering its per-parcel average and its fixed monthly cost.",
      "US carriers price by zone: the distance between the shipping point and the destination. A parcel crossing the country (Zone 7-8) can cost close to double the same parcel delivered regionally (Zone 2-3), and the gap widens with weight. Zone mix, not the carrier's headline rate, is what a second location changes.",
      "The calculator nets the per-parcel saving against the fixed costs of the extra node — rent or 3PL minimums, split-inventory carrying cost, extra inbound freight — and returns the monthly saving and the volume at which the second node breaks even.",
      "There is a second effect worth noting even though it is not in the arithmetic: shorter distances mean faster delivery, and delivery speed is a conversion factor. Model the cost saving first; treat any conversion gain as upside.",
    ],
    formula:
      "Monthly saving = (parcels x per-parcel saving) - extra fixed monthly cost. Break-even volume = extra fixed cost / per-parcel saving.",
    example: {
      title: "Worked example: adding an East Coast 3PL node",
      body: "A West Coast store ships 1,000 parcels a month at an average of $11.40. Routing the 45% of orders destined for eastern states through an East Coast 3PL cuts those parcels to an average of $7.90; the blended average falls to $9.83, a saving of $1.57 per parcel across all orders. Gross saving: $1,570 a month. The 3PL's account and storage minimums cost $650 a month. Net saving: $920 a month, or about $11,000 a year. Break-even volume for the node = $650 / $1.57 = 414 parcels a month.",
    },
    faqs: [
      {
        question: "What are shipping zones and why do they decide cost?",
        answer:
          "Zones measure distance from the shipping origin, not a fixed geography — Zone 2 from Los Angeles is a different map from Zone 2 from Chicago. Carriers price each weight-and-zone cell separately, so the same 3 lb parcel might cost $8 regionally and $15 cross-country. Your zone distribution, set by where your customers are relative to your stock, is the lever.",
      },
      {
        question: "When does a second warehouse pay off?",
        answer:
          "When parcel volume times the per-parcel zone saving exceeds the node's fixed costs plus the cost of splitting inventory. In practice that is usually somewhere between 300 and 1,000 parcels a month for a 3PL node (no lease, low fixed cost) and several thousand for a leased warehouse. The break-even volume in the result is the number to test against your growth.",
      },
      {
        question: "What are the hidden costs of splitting inventory?",
        answer:
          "More total safety stock (each location needs its own buffer), stockouts at one node while the other holds units, extra inbound freight to two addresses, and management time. A practical allowance is to raise total inventory by 15-30% for a two-node split on the same sales — include that carrying cost before committing.",
      },
      {
        question: "Can I reduce zone costs without a second location?",
        answer:
          "Partly: negotiate carrier rates on your heaviest zone cells, use regional carriers for their home zones, compare dimensional-weight pricing (a smaller box can drop a parcel a full price band), and set free-shipping thresholds that reflect your real zone mix. These shave percentages; only inventory placement changes the zone distribution itself.",
      },
    ],
  },

  "ecommerce/subscription-churn-impact-simulator": {
    quickAnswer:
      "For a business with 2,000 subscribers at $29 a month, cutting churn from 6% to 5% keeps 20 more subscribers every month and lifts customer lifetime value from $483 to $580. Within a year the retained base is worth roughly $7,000 a month in extra recurring revenue.",
    howItWorks: [
      "Enter your subscriber count, monthly price (or average revenue per user), current churn rate and the churn rate you want to model. The simulator projects the subscriber base month by month under both rates, with any new-subscriber growth you add.",
      "Churn compounds, which is why small differences dominate over time. At 6% monthly churn the average customer stays about 17 months; at 5%, 20 months; at 3%, 33 months. Lifetime value is monthly profit per customer divided by churn, so every point of churn moves LTV by double-digit percentages.",
      "Read the 12-month revenue gap, not the first month. One point of churn is worth $580 of monthly revenue in month one of the example — noticeable but not dramatic. The gap widens every month because retained customers are retained again the next month.",
      "Separate voluntary churn (customers who cancel — fix with product and value) from involuntary churn (failed payments — fix with dunning, card updaters and retry logic). Involuntary churn is typically 20-40% of the total in subscription businesses and is usually cheaper to reduce.",
    ],
    formula:
      "Customer lifetime (months) = 1 / monthly churn rate. LTV = monthly profit per customer / churn rate. Subscribers next month = subscribers x (1 - churn) + new subscribers.",
    example: {
      title: "Worked example: 12 months at 6% vs 5% churn",
      body: "Start: 2,000 subscribers, $29 a month, adding 150 new subscribers a month. At 6% churn the base after 12 months is about 2,294 subscribers and monthly revenue about $66,500. At 5% churn the base reaches about 2,414 and monthly revenue about $70,000. The single point of churn is worth roughly $3,500 a month by month 12 — about $25,000 of cumulative revenue across the year — with no change to acquisition spend.",
    },
    faqs: [
      {
        question: "What is a good monthly churn rate for subscriptions?",
        answer:
          "Consumer subscription products commonly run 5-10% monthly churn; established services with strong fit get below 5%. B2B software runs lower: 3-7% annually for enterprise accounts, 5-7% monthly for small-business tools is considered poor but common. Judge your rate against your segment and price point — a $10 entertainment app and a $200 business tool should not share a target.",
      },
      {
        question: "How much of churn is failed payments?",
        answer:
          "Typically 20-40%. Cards expire, get replaced or hit limits, and a subscription with no retry process loses those customers silently. Card-account updater services, smart retries spread over days, and pre-expiry emails recover a large share — recovery rates of 30-50% of failed payments are achievable, making dunning the highest-return churn work for most businesses.",
      },
      {
        question: "Why does churn matter more than growth at scale?",
        answer:
          "Growth adds a fixed number of customers; churn removes a percentage of a growing base. At 10,000 subscribers and 6% churn you must add 600 customers a month to stand still — four times the acquisition needed at 2,000 subscribers. Businesses that ignore churn eventually spend all their growth budget refilling the bucket.",
      },
      {
        question: "Does lowering price reduce churn enough to pay?",
        answer:
          "Rarely, on its own. A 10% price cut needs churn to fall enough that lifetime rises by more than 10% — from 5% to under 4.5% — just to keep LTV flat, before counting the revenue lost on every remaining customer. Price is a weak churn lever compared with onboarding, usage and payment recovery; test it only after those are working.",
      },
    ],
  },

  "creator/youtube-adsense-estimator": {
    quickAnswer:
      "A channel with 500,000 monthly long-form views at a $12 RPM earns about $6,000 a month from ads. RPM — what you actually keep per 1,000 views — ranges from under $2 for entertainment to $20 or more for finance and business content, so niche decides income more than view count.",
    howItWorks: [
      "Enter your monthly views and either your RPM (found in YouTube Studio under Revenue) or pick a niche range. Earnings are views divided by 1,000, multiplied by RPM. If you know CPM instead, remember RPM is what remains after YouTube's share and after views that carried no ad are counted.",
      "YouTube pays creators 55% of the ad revenue on long-form videos; YouTube keeps 45%. Shorts are paid differently — revenue is pooled across Shorts and allocated by view share, with creators keeping 45% — which is why Shorts RPMs are typically a few cents per 1,000 views rather than dollars.",
      "The calculator projects monthly and annual earnings so you can compare channels, niches and upload schedules. Treat the output as a range, not a forecast: advertiser demand peaks in Q4 and drops in January, and a single video's topic can pay several times your channel average.",
      "Memberships, Supers, affiliate income and sponsorships sit outside this number. For most mid-size channels, ad revenue is 40-70% of total income — the sponsorship calculator covers the other large piece.",
    ],
    formula:
      "Monthly earnings = (monthly views / 1,000) x RPM. RPM = total revenue / total views x 1,000.",
    example: {
      title: "Worked example: two channels, same views, different niches",
      body: "Channel A (gaming) gets 1,000,000 views a month at a $3.50 RPM: earnings = 1,000 x $3.50 = $3,500. Channel B (personal finance) gets 250,000 views at a $22 RPM: earnings = 250 x $22 = $5,500. Channel B earns 57% more from a quarter of the views, because finance advertisers pay for viewers with money decisions to make. View counts rank channels; RPM explains their income.",
    },
    faqs: [
      {
        question: "How much does YouTube pay per 1,000 views?",
        answer:
          "There is no fixed rate. Creators keep 55% of ad revenue on long-form video, and the resulting RPM typically runs from about $1-$5 for entertainment and gaming, $5-$15 for tech and education, and $15-$40 for finance, insurance and B2B topics. Geography matters too: views from the US, UK, Canada and Australia pay several times the rate of views from lower-ad-spend regions.",
      },
      {
        question: "What is the difference between CPM and RPM?",
        answer:
          "CPM is what advertisers pay per 1,000 ad impressions, before YouTube's 45% share. RPM is what the creator receives per 1,000 views, after the share and including views where no ad ran. RPM is always the smaller and more honest number for income planning, and it is the figure YouTube Studio reports.",
      },
      {
        question: "How many views do I need to join the YouTube Partner Program?",
        answer:
          "The standard threshold is 1,000 subscribers plus either 4,000 valid public watch hours in the last 12 months or 10 million valid Shorts views in 90 days. An earlier tier (500 subscribers, 3 million Shorts views or 3,000 watch hours) unlocks fan funding features such as memberships and Supers in eligible countries, but ad revenue sharing starts at the main threshold.",
      },
      {
        question: "Why did my earnings drop in January?",
        answer:
          "Advertisers spend heavily in the run-up to Christmas and cut budgets in January, so CPMs routinely fall 30-50% from December to January across most niches. It is a market pattern, not a penalty on your channel. Annual planning should use the full-year average RPM, not the Q4 peak.",
      },
    ],
  },

  "creator/youtube-cpm-calculator": {
    quickAnswer:
      "A $20 CPM converts to an $11 RPM before accounting for unmonetized views — creators keep 55% of ad revenue. In practice RPM lands lower, often $7-$9 at that CPM, because not every view shows an ad. Use RPM for income decisions; CPM only measures advertiser demand.",
    howItWorks: [
      "Enter a CPM to see the RPM it implies, or enter your views and Studio revenue to work out your actual RPM. The converter applies YouTube's standard 55% creator share for long-form video.",
      "CPM counts ad impressions; RPM counts views. A video with two ad impressions per view can post a high CPM while many viewers saw no ad at all (ad blockers, Premium viewers, regions without ad demand). RPM folds all of that in, which is why the gap between 55% of CPM and real RPM varies by audience.",
      "The calculator also projects earnings at your view volume under both figures — the Studio-based RPM projection is the one to budget on; the CPM-based one is an upper bound.",
      "For Shorts, neither figure maps directly: Shorts revenue comes from a pooled model with a 45% creator share allocated by view share, and is best tracked as its own RPM in Studio.",
    ],
    formula:
      "RPM (upper bound) = CPM x 55%. Actual RPM = revenue / views x 1,000. Estimated earnings = views / 1,000 x RPM.",
    example: {
      title: "Worked example: $24 CPM channel, 800,000 views",
      body: "Upper-bound RPM: $24 x 55% = $13.20, implying earnings of 800 x $13.20 = $10,560. The channel's Studio shows actual revenue of $8,000, so actual RPM is $8,000 / 800 = $10.00. The $3.20 gap is the unmonetized-view effect: roughly a quarter of views carried no paid ad. Planning a hire against the $10,560 figure would overcommit by $2,560 a month.",
    },
    faqs: [
      {
        question: "What CPM do advertisers pay on YouTube?",
        answer:
          "Broadly $5-$15 for general entertainment audiences in English-speaking markets, $15-$30 for tech, education and business, and $30-$50 or more for finance, insurance, legal and high-value B2B topics. CPMs are auction prices: they rise in Q4, fall in January, and vary by viewer country more than by channel size.",
      },
      {
        question: "Why is my RPM less than 55% of my CPM?",
        answer:
          "Because the denominators differ. CPM divides ad revenue by ad impressions; RPM divides your revenue by all views, including views with no ad — YouTube Premium views (paid from a subscription pool instead), ad-blocked views, and views in regions or on content where ads do not run. A monetized-view share of 70-85% is typical.",
      },
      {
        question: "Does a higher CPM mean a better channel?",
        answer:
          "It means a more valuable audience to advertisers, not a bigger income. Income is views x RPM, and a low-CPM channel with ten times the views out-earns a high-CPM niche channel. CPM matters when choosing topics at the margin — among video ideas with similar view potential, pick the one advertisers pay more for.",
      },
      {
        question: "How do I raise my RPM?",
        answer:
          "Shift topic mix toward advertiser-valued subjects, lengthen videos past 8 minutes to allow mid-roll ads, and build audience share in high-CPM countries. Also check for limited-ad flags on individual videos — a video marked as showing limited or no ads earns near zero regardless of its CPM niche.",
      },
    ],
  },

  "creator/tiktok-creator-fund-calculator": {
    quickAnswer:
      "Under TikTok's Creator Rewards Program, 1 million qualified views at a mid-range $0.60 per 1,000 views pays about $600. Rates commonly run $0.40-$1.00 per 1,000 qualified views, and only original videos longer than one minute earn them.",
    howItWorks: [
      "Enter your qualified views — views on eligible videos that meet the program's rules — and an RPM in the typical range. The calculator returns estimated earnings per video and per month.",
      "The old Creator Fund, which paid roughly $0.02-$0.04 per 1,000 views, closed in December 2023. Creator Rewards replaced it with materially higher rates, but with conditions: videos must be over one minute, original (no reuploads, duets or stitches), and posted to an eligible account with at least 10,000 followers and 100,000 views in the last 30 days.",
      "Not every view is a qualified view. Views TikTok judges artificial, from ineligible regions, or on videos that break the originality rules are excluded, which is why earnings per video vary even at the same headline rate.",
      "Compare the result with what the same content earns elsewhere. A one-minute-plus video that earns Rewards revenue can also be posted to YouTube, where long-form RPM logic applies — the two programmes reward different formats, and many creators run both from one production process.",
    ],
    formula:
      "Earnings = (qualified views / 1,000) x Creator Rewards RPM ($0.40-$1.00 typical range).",
    example: {
      title: "Worked example: a month of Rewards-eligible videos",
      body: "A creator posts 12 videos over a minute long; they collect 2,400,000 qualified views in total. At $0.60 per 1,000 views, earnings = 2,400 x $0.60 = $1,440. Under the old Creator Fund at $0.03 per 1,000, the same views paid $72. The 20x difference is why TikTok's centre of gravity shifted to longer videos — and why a creator still posting only 20-second clips to the program earns almost nothing from it.",
    },
    faqs: [
      {
        question: "How much does TikTok pay per 1,000 views now?",
        answer:
          "Under Creator Rewards, creators commonly report $0.40-$1.00 per 1,000 qualified views, depending on video length, watch time, search value and region. The program does not publish a fixed rate. Anyone quoting the old $0.02-$0.04 figure is describing the Creator Fund, which ended in December 2023.",
      },
      {
        question: "What makes a view 'qualified'?",
        answer:
          "The view must be on an eligible video: over one minute long, original content filmed and produced by the creator, not a duet, stitch, reupload or photo post, and watched genuinely (purchased or looped views are filtered). The account must also be in an eligible country, in good standing, with at least 10,000 followers and 100,000 views in the past 30 days.",
      },
      {
        question: "Why do two videos with the same views earn different amounts?",
        answer:
          "Rewards weight more than raw views: average watch time, completion, whether the video is found through search, and audience region all feed the rate. A 3-minute video watched to the end can earn several times more per view than a 61-second video people skip. Total earnings per video reflect quality signals as well as reach.",
      },
      {
        question: "Is TikTok or YouTube better paid for long videos?",
        answer:
          "For videos over a minute, YouTube's long-form RPM in most niches exceeds TikTok Rewards at comparable views, and YouTube income is more predictable. TikTok's advantage is discovery speed. Most full-time creators treat TikTok as the growth engine and YouTube as the income engine, publishing to both.",
      },
    ],
  },

  "creator/instagram-money-calculator": {
    quickAnswer:
      "A sponsored post from a 100,000-follower account with healthy engagement is commonly priced around $500-$1,000 — the rough industry rule of $10 per 1,000 followers gives $1,000, then engagement and niche adjust it. Brands pay for buying intent, not follower counts.",
    howItWorks: [
      "Enter followers, average engagement (likes and comments per post, or your engagement rate) and content type — post, reel, story or a package. The calculator builds a rate range from reach and engagement rather than followers alone.",
      "The baseline model multiplies followers by a per-follower rate (around $0.01 per follower per post at average engagement) and then adjusts: strong engagement (above 3-4%) moves the price up; weak engagement (below 1%) moves it down regardless of follower count, because reach is what the brand is buying.",
      "Niche is the second adjustment. Finance, business, tech and fitness audiences command higher rates than general entertainment at the same size, because the products sold to them carry more margin. Rates in the calculator are ranges for negotiation, with the middle as a defensible opening ask.",
      "Stories price lower per unit (often 25-40% of a feed post) but are usually sold in sequences; reels price at or above feed posts where they outperform on reach. Bundling formats into a package raises the total while giving the brand a discount per piece — the structure most mid-size creators actually sell.",
    ],
    formula:
      "Post rate ≈ followers x $0.01 x engagement adjustment x niche adjustment. Story rate ≈ 25-40% of post rate; reel rate ≈ 100-150% of post rate.",
    example: {
      title: "Worked example: 250,000 followers, 2.8% engagement, fitness niche",
      body: "Baseline: 250,000 x $0.01 = $2,500 per post. Engagement at 2.8% is solidly average-to-good, so no reduction. Fitness is a strong commercial niche; apply a 1.2x adjustment: $3,000 per post as the opening rate. A typical package — one post, one reel and three stories — prices at $3,000 + $3,600 (reel at 1.2x post) + $1,050 (three stories at $350) = $7,650, usually offered at a round $7,000-$7,500 as a bundle.",
    },
    faqs: [
      {
        question: "How much should I charge for a sponsored post?",
        answer:
          "Start from $10 per 1,000 followers for a feed post at average engagement, then adjust: add for engagement above 3%, a high-value niche (finance, B2B, tech), usage rights or exclusivity; accept less for a long-term ambassador deal with guaranteed volume. Cross-check against your reach: brands buying on CPM typically pay $10-$30 per 1,000 accounts reached.",
      },
      {
        question: "How many followers do you need to make money on Instagram?",
        answer:
          "Brand deals in the nano and micro tiers (1,000-50,000 followers) are routine in focused niches — a 5,000-follower account reviewing local restaurants or specific software can charge $50-$250 per post. Affiliate income and digital products can start at any size. What sponsors buy is an audience that acts, which a small engaged niche provides better than a large passive one.",
      },
      {
        question: "What are usage rights and why do they cost extra?",
        answer:
          "Usage rights let the brand reuse your content in its own ads. They are priced separately from the post itself — commonly 30-100% of the base rate per period of use, with paid-ad (whitelisting) rights at the top of the range. Granting unlimited usage in perpetuity for free is the most common way creators undercharge; always time-limit rights in writing.",
      },
      {
        question: "Do reels pay more than posts?",
        answer:
          "Usually, yes, where reels deliver more reach — brands follow the views. Rates of 1.2-1.5x a static post are common for reels from accounts whose reels outperform. If your reels underperform your posts, price to your own data: sponsors renew on reported reach, so rates anchored to your insights screenshots are the ones that hold.",
      },
    ],
  },

  "creator/instagram-engagement-rate-calculator": {
    quickAnswer:
      "A post with 1,800 likes and 120 comments on a 50,000-follower account has an engagement rate of 3.84% — above the roughly 1-3% band most accounts sit in. Engagement rate, not follower count, is the number brands use to compare accounts.",
    howItWorks: [
      "Enter followers and the likes and comments on a post (or average them across your last 10-20 posts for a stable figure). The calculator divides total interactions by followers and returns the percentage.",
      "There are two conventions and they answer different questions. Engagement by followers (used here) measures how active your audience is relative to its size. Engagement by reach divides by accounts that actually saw the post and runs several points higher — use it to judge content, use the follower version to judge the account.",
      "Benchmarks fall as accounts grow: accounts under 10,000 followers often post 3-6%, mid-size accounts 1.5-3%, and accounts above a million typically 1-2%. A rate should be judged against accounts of your size in your niche, not against a single universal figure.",
      "Reels need care: views, not followers, are the exposure unit, so a reel's engagement by views (likes plus comments plus shares, divided by views) is the meaningful figure, and shares weigh more in distribution than likes.",
    ],
    formula: "Engagement rate = (likes + comments) / followers x 100.",
    example: {
      title: "Worked example: comparing two accounts for a brand deal",
      body: "Account A: 200,000 followers, posts average 3,000 likes and 150 comments. Rate = 3,150 / 200,000 = 1.58%. Account B: 60,000 followers, posts average 2,400 likes and 300 comments. Rate = 2,700 / 60,000 = 4.5%. Account B delivers nearly the same interactions per post with under a third of the audience — a brand paying A a follower-based premium is buying reach A does not actually produce. B can justify rates close to A's with this arithmetic.",
    },
    faqs: [
      {
        question: "What is a good engagement rate on Instagram?",
        answer:
          "As rough bands: above 3% is strong for most account sizes, 1-3% is typical, and below 1% signals a passive, purchased or mismatched audience. Smaller accounts naturally run higher — a 4% rate at 5,000 followers and a 2% rate at 500,000 are both healthy for their tier. Compare within your size band and niche before concluding anything.",
      },
      {
        question: "Should engagement be calculated on followers or reach?",
        answer:
          "Both, for different decisions. Followers-based rate is the public comparison metric brands use to screen accounts. Reach-based rate (interactions divided by accounts reached) strips out the algorithm's distribution and tells you how the content itself performed; it commonly runs 5-15% on feed posts. Reporting a reach-based figure as if it were follower-based inflates comparisons and sponsors notice.",
      },
      {
        question: "Do shares and saves count as engagement?",
        answer:
          "Yes — they are interactions, and for distribution they are stronger signals than likes. The classic public formula uses likes plus comments because those are visible on other people's accounts. For your own account, include saves and shares from your insights: a post with modest likes but heavy saves is performing better than the public formula shows.",
      },
      {
        question: "How can I raise my engagement rate?",
        answer:
          "The rate rises when interactions grow faster than followers: prompts that ask a specific question, content worth saving (checklists, tutorials, price breakdowns), replying to comments early while the post is being distributed, and removing inactive or bot followers who dilute the denominator. Buying followers does the opposite — it lowers the rate and is visible in exactly this calculation.",
      },
    ],
  },

  "creator/twitch-earnings-calculator": {
    quickAnswer:
      "Three hundred Tier 1 subscribers are worth roughly $900 a month at the standard 50% share of the $5.99 sub price, and 10,000 Bits add $100 — Bits always pay the streamer exactly one cent each. Ads and sponsorships decide whether streaming income becomes a living or stays a supplement.",
    howItWorks: [
      "Enter your subscriber counts by tier, monthly Bits, and any ad or sponsorship income you want included. The calculator applies the revenue share for each source and totals the month.",
      "Subscriptions: Tier 1 is $5.99, Tier 2 $9.99 and Tier 3 $24.99 in the US. Most Affiliates and Partners receive 50% of the net subscription revenue; Partners with sustained high concurrent-subscriber counts can qualify for 60% or 70% under the Partner Plus programme. Gifted subs pay the same share as regular subs.",
      "Bits are fixed: viewers buy them at a markup, but the streamer always receives $0.01 per Bit cheered. Cheers of 10,000 Bits in a month are $100, with no share calculation involved. Channel-point redemptions and hype-train bonuses do not pay cash.",
      "Ads pay by impressions and region and vary widely, so the calculator treats them as an input rather than a rate. As a reference, streamers commonly report roughly $2-$10 per 1,000 ad impressions depending on audience geography and season, before Twitch's share under their ad programme terms.",
    ],
    formula:
      "Monthly earnings = (subs by tier x tier price x revenue share) + (Bits x $0.01) + ad revenue + sponsorships.",
    example: {
      title: "Worked example: a mid-size Affiliate's month",
      body: "Subscribers: 300 Tier 1, 25 Tier 2, 5 Tier 3. Subscription revenue at 50% share: (300 x $5.99 + 25 x $9.99 + 5 x $24.99) x 50% = ($1,797 + $249.75 + $124.95) x 50% = $2,171.70 x 50% = $1,085.85. Bits: 35,000 Bits = $350. Ads: $180. Total for the month: $1,615.85 before tax — with subscriptions providing two-thirds of it, which is the usual pattern below the top tier of streamers.",
    },
    faqs: [
      {
        question: "How much does a Twitch streamer get per sub?",
        answer:
          "At the standard 50% share of US prices: about $3.00 per Tier 1 sub ($5.99), $5.00 per Tier 2 ($9.99) and $12.50 per Tier 3 ($24.99). Actual deposits run slightly lower where regional pricing sets local sub prices below US levels, and Partners on 60/70% tiers earn proportionally more. Prime subs pay like Tier 1.",
      },
      {
        question: "How many viewers do you need to make $1,000 a month on Twitch?",
        answer:
          "Income tracks subscribers and regulars more than raw viewers. Roughly 300 paying subscribers at Tier 1 reaches $900, and most channels convert 2-5% of their regular audience into subs. In viewer terms that usually means averaging 75-150 concurrent viewers with an engaged community — though a small, generous audience can out-earn a large passive one.",
      },
      {
        question: "How do you become a Twitch Affiliate and start earning?",
        answer:
          "Reach 50 followers, stream at least 8 hours across 7 different days, and average 3 concurrent viewers over a rolling 30-day window. Affiliate unlocks subscriptions, Bits and ads. Partner status (75 average concurrent viewers and consistent schedule metrics) adds higher revenue shares and more emote slots.",
      },
      {
        question: "When and how does Twitch pay out?",
        answer:
          "Monthly, once your balance passes the $50 payout threshold (lowered from $100 in 2022) for most payment methods. Earnings below the threshold roll forward. Payouts are reported gross — streamers are self-employed for tax purposes and should set aside income tax and, in the US, self-employment tax on the total.",
      },
    ],
  },

  "creator/patreon-tier-optimization": {
    quickAnswer:
      "Four hundred patrons paying an average of $8 a month generate $3,200 gross. After an 8% platform fee and per-pledge payment processing, the creator keeps about $2,731 — roughly 85% — before payout fees and tax. Small pledges lose the most to the fixed $0.30 processing charge.",
    howItWorks: [
      "Enter your patron counts and price per tier, or total patrons and average pledge. The calculator applies your platform plan's fee, then payment processing per pledge, and returns your net monthly income and effective take rate.",
      "Patreon's platform fee depends on the plan: legacy plans charge 5%, 8% or 12% depending on features, while new creators are placed on a standard 10% plan. Payment processing is separate: about 2.9% plus $0.30 per successful pledge for standard card processing (5% plus $0.10 for small pledges through some routes), which is why a $1 tier loses over a third of its value to fees.",
      "The tier view shows revenue per tier, which is where optimisation happens: most pages earn the majority of income from one mid-priced tier, and tiers under $3 rarely survive processing costs. Consolidating micro-tiers into a $5 floor usually raises net income while cutting fulfilment work.",
      "Annual memberships (where enabled) reduce processing costs by charging once a year and reduce churn, at the cost of a discount — model them by entering the annual totals. Figures here are before income tax; patrons are customers, and the income is self-employment income.",
    ],
    formula:
      "Net = (patrons x average pledge) - platform fee % - (processing % + $0.30 per pledge) - payout fees.",
    example: {
      title: "Worked example: 400 patrons at an average $8 pledge, 8% plan",
      body: "Gross: 400 x $8 = $3,200. Platform fee at 8%: $256, leaving $2,944. Processing per pledge: 2.9% of $8 = $0.232 plus $0.30 = $0.532; across 400 pledges = $212.80. Net before payout fees: $2,944 - $212.80 = $2,731.20, an effective take rate of 85.4%. The same page with 400 patrons on a $3 tier would gross $1,200 and keep only about $955 (79.6%) — the $0.30 fixed fee takes 10% of every $3 pledge by itself.",
    },
    faqs: [
      {
        question: "How much does Patreon take from creators?",
        answer:
          "A platform fee of 5%, 8% or 12% on legacy plans (by feature tier) or a standard 10% for creators on the current plan, plus payment processing of roughly 2.9% + $0.30 per pledge, plus a payout fee when you withdraw (for example 1% for ACH-style transfers, capped). All-in, most creators keep 80-88% of gross pledges; the share falls as average pledge size falls.",
      },
      {
        question: "What is the best price for a Patreon tier?",
        answer:
          "The tiers that perform are anchored at $5, $10 and $25 for most niches: $5 as the accessible support tier (below $5, fixed processing fees eat a disproportionate share), $10 for the core benefits tier, and $25 for superfans with limited extras. Pages with more than five or six tiers usually fragment patrons and add fulfilment work without adding income.",
      },
      {
        question: "How many patrons do I need to earn $1,000 a month?",
        answer:
          "At a net take of about 85%, you need roughly $1,175 of gross pledges: 235 patrons at $5, 118 at $10, or 47 at $25. Mixed pages average out — the worked example's page earns $2,731 from 400 patrons at an $8 average. Audience conversion of 1-5% of engaged followers to patrons is the realistic planning range.",
      },
      {
        question: "Patreon or Substack or YouTube memberships?",
        answer:
          "Compare the fee stack and the format. Patreon keeps roughly 80-88% and suits mixed media and community benefits. Substack takes 10% plus processing and suits writing. YouTube channel memberships give YouTube a 30% share but sit where the audience already is. The deciding factor is usually where your audience will actually pay, not the few points of fee difference.",
      },
    ],
  },

  "creator/sponsorship-pricing-calculator": {
    quickAnswer:
      "A video averaging 250,000 views priced at a $25 CPM gives a base sponsorship rate of $6,250. Usage rights, exclusivity and integration depth move the final price more than the base rate does — a package with 90-day paid usage commonly lands 50-100% above the base.",
    howItWorks: [
      "Enter your average views (or reach) per post or video, your platform and niche. The calculator converts reach into a base rate using CPM bands typical for your niche, then layers the commercial terms.",
      "The base rate prices one thing: the audience delivered by the content itself. Everything the brand gets beyond that is a separate line — paid usage rights (the brand running your content as its ad), exclusivity (you refusing competitor deals for a period), integration length, and deliverables such as raw files or extra posts.",
      "Multipliers in the calculator reflect common market practice: usage rights add roughly 30-100% depending on duration and whether paid media is included; category exclusivity adds 25-50% per month of lockout; a dedicated video costs more than a 60-second integration because it carries the whole video's performance risk.",
      "Use the output as an opening position with a defensible structure, not a take-it-or-leave-it number. Brands negotiate against line items they can see; a single unexplained figure invites a single unexplained discount request.",
    ],
    formula:
      "Base rate = (average views / 1,000) x niche CPM. Final price = base x (1 + usage %) x (1 + exclusivity %) + extra deliverables.",
    example: {
      title: "Worked example: tech channel, 250,000 average views",
      body: "Base: 250 x $25 CPM = $6,250 for a 60-90 second integration. The brand wants 90 days of paid usage rights: +50% of base = $3,125. Category exclusivity for 60 days: +40% = $2,500. One supporting community post: $500. Package total = $6,250 + $3,125 + $2,500 + $500 = $12,375. The integration itself is barely half the invoice — creators who quote the base rate alone leave the rest uncharged.",
    },
    faqs: [
      {
        question: "What CPM should I use to price sponsorships?",
        answer:
          "For YouTube integrations, $15-$25 CPM is a workable band for general audiences, $25-$45 for business, finance and tech, and higher where purchase value is high and audiences are small and targeted. Podcast sponsorships run $15-$25 per 1,000 downloads at mid-roll. Price from your average views over recent comparable content, not your best video.",
      },
      {
        question: "How much extra are usage rights worth?",
        answer:
          "A practical scale: organic reposting rights included or cheap; paid usage for 30 days adds about 30-50% of the base rate; 90 days, 50-100%; a year or perpetual rights should be a multiple of the base rate, and perpetual buyouts are rarely in the creator's interest. Always specify the channels the usage covers (their socials, their paid ads, their website) in the agreement.",
      },
      {
        question: "Should I offer discounts for multiple videos?",
        answer:
          "A series discount of 10-20% for three or more committed deliverables is standard and usually worth it: it removes your selling time for the next slots and gives the brand performance data to renew. Do not discount the usage and exclusivity lines at the same rate — those are costs you bear per campaign regardless of volume.",
      },
      {
        question: "How do I price when my channel is small?",
        answer:
          "Price the audience quality, not the size: a 20,000-view average in a narrow B2B niche at a $40 CPM is an $800 integration, and brands in that niche often cannot buy the same audience anywhere else. Offer a first-campaign rate with a review clause rather than a permanently low rate, and document results so the renewal is priced on evidence.",
      },
    ],
  },

  "creator/course-launch-revenue-calculator": {
    quickAnswer:
      "An email list of 5,000 converting at 2% produces 100 buyers; at a $249 course price that is $24,900 gross, and about $23,655 after a typical 5% refund rate. List size and conversion rate matter equally — doubling either one doubles the launch.",
    howItWorks: [
      "Enter your audience size (email list is the reliable input; social followers convert at a fraction of email rates), expected conversion rate, course price and refund rate. The calculator returns buyers, gross revenue and net revenue after refunds and platform or payment fees if you include them.",
      "Conversion benchmarks: a warm email list typically converts at 1-3% for a mid-priced course during a launch window; cold traffic converts well under 1%. If you have run a launch before, your own last conversion rate beats any benchmark — enter it.",
      "Payment plans change the timing, not the total: a 3-payment plan usually raises conversion but spreads cash across months and adds failed-payment losses. Model the plan by lowering net revenue slightly rather than counting full price on day one.",
      "The affiliates view matters for larger launches: partners commonly take 30-50% of the sale price. Revenue through affiliates is still profitable when the course margin is high, but the calculator separates own-list revenue from affiliate revenue so the fee cost is visible.",
    ],
    formula:
      "Buyers = audience x conversion rate. Gross revenue = buyers x price. Net revenue = gross x (1 - refund rate) - fees - affiliate commissions.",
    example: {
      title: "Worked example: 12,000-subscriber list, $399 course",
      body: "At a 2.5% conversion rate, buyers = 12,000 x 2.5% = 300. Gross revenue = 300 x $399 = $119,700. Refunds at 6% remove $7,182. Payment and platform fees at about 3% remove roughly $3,375 on the kept revenue. Net launch revenue ≈ $109,143. If a quarter of sales came through affiliates at 40% commission, subtract a further ~$11,200 — the launch still clears $97,000, but the affiliate line is larger than refunds and fees combined.",
    },
    faqs: [
      {
        question: "What conversion rate should I expect from a course launch?",
        answer:
          "For a warm email list and a course priced $100-$500, 1-3% of the list buying during the launch is a realistic planning range; established creators with practised launch sequences reach 3-5%. Webinar launches convert attendees at higher rates (10-25% of live attendees is common) but attendees are a small subset of the list. Never plan a first launch above 2% without evidence from your own audience.",
      },
      {
        question: "What refund rate is normal for online courses?",
        answer:
          "Around 5% is a workable planning figure for courses sold with a money-back guarantee; high-ticket courses sold with aggressive marketing can see 10-15%. Refund rates fall when the first module delivers a quick result and when the guarantee conditions are clear. Every point of refunds on a $100,000 launch is $1,000 — worth modelling, not ignoring.",
      },
      {
        question: "How big an audience do I need for a $10,000 launch?",
        answer:
          "At a 2% conversion rate: $10,000 needs 50 buyers at $200, which means a list of 2,500; at $500 per course, 20 buyers from a list of 1,000. At a 1% conversion rate, double those list sizes. This arithmetic is why creators grow the list before building the course — the audience size decides the launch more than the content does.",
      },
      {
        question: "Do payment plans increase total revenue?",
        answer:
          "Usually, for courses above about $200: offering instalments commonly lifts conversion by 20-40%. Offsetting that, 5-15% of instalment payments typically fail or default before completion. Net effect is positive for most sellers, but cash arrives over months — do not spend launch-week projections that depend on month-three instalments.",
      },
    ],
  },

  "creator/affiliate-link-roi-calculator": {
    quickAnswer:
      "Ten thousand clicks converting at 3% on a $40 commission produce 300 sales and $12,000 of affiliate income — an EPC (earnings per click) of $1.20. EPC is the number that lets you compare programmes and decide what a click is worth buying or building content for.",
    howItWorks: [
      "Enter clicks (or traffic and click-through rate), conversion rate and average commission. The calculator returns sales, total earnings, EPC and earnings per 1,000 visitors — the two comparison figures used across the affiliate industry.",
      "If you are evaluating paid traffic, compare EPC against your cost per click: a programme with a $1.20 EPC supports ad clicks up to roughly that figure before margin. If you are evaluating content, compare earnings per 1,000 visitors between programmes on the same page — the ranking decides which product the page should feature.",
      "Commission structure matters as much as the headline percentage. A 40% commission on a $30 product ($12) converts worse but pays less per sale than a 10% commission on a $300 product ($30); the calculator works in dollars per sale so the comparison is honest.",
      "Cookie duration is the hidden variable: a programme that credits sales within 24 hours of the click earns materially less than one with a 30-90 day window at the same rate, because considered purchases take days. Where you know the window differs, sanity-check the earnings estimate downwards for short-window programmes.",
    ],
    formula:
      "Sales = clicks x conversion rate. Earnings = sales x average commission. EPC = earnings / clicks = commission x conversion rate.",
    example: {
      title: "Worked example: two programmes on the same review page",
      body: "Programme A pays 8% on a $250 product = $20 per sale, converting at 4%: EPC = $20 x 4% = $0.80. Programme B pays 30% on a $60 product = $18 per sale, converting at 6%: EPC = $18 x 6% = $1.08. On 10,000 clicks, A earns $8,000 and B earns $10,800. The lower commission percentage wins because conversion and basket size beat the headline rate — the standard outcome when programmes are compared on EPC instead of percentage.",
    },
    faqs: [
      {
        question: "What is EPC and why does it matter?",
        answer:
          "Earnings per click: total commission divided by total clicks. It compresses commission rate, product price and conversion rate into the single number that decides which programme to promote and whether paid traffic can work. Programmes and networks quote EPC precisely because percentage commissions cannot be compared across price points.",
      },
      {
        question: "What conversion rate is typical for affiliate links?",
        answer:
          "Warm review and comparison traffic converts at roughly 2-6%; broad content traffic at 0.5-2%; email traffic often higher. Amazon's programme converts unusually well (frequently 5-10% on warm traffic) but pays low percentages (1-4.5% in most categories) and runs a 24-hour cookie, which is why its EPC often trails specialist programmes despite the conversion advantage.",
      },
      {
        question: "How much traffic do I need to earn $1,000 a month?",
        answer:
          "Divide $1,000 by your EPC. At an EPC of $0.50, you need 2,000 clicks a month; at $1.20, about 835; at $0.10 (low-ticket, cold traffic), 10,000. Clicks are not visitors — at a 20% click-through from article to merchant, multiply the visitor target by five. This arithmetic sets realistic content volume goals.",
      },
      {
        question: "Can affiliate marketing be profitable with paid ads?",
        answer:
          "Only when EPC comfortably exceeds cost per click, with room for the share of clicks that never convert and for tracking loss. Most affiliate programmes' EPCs ($0.10-$1.00) sit below competitive CPCs in the same niche, which is why affiliates rely on search content, email and social reach rather than buying the traffic outright.",
      },
    ],
  },

  "creator/agency-vs-solo-margin-calculator": {
    quickAnswer:
      "On $20,000 of monthly revenue, a solo operator with $3,000 of costs keeps an 85% margin; a small agency with $9,000 of delivery salaries and $3,000 of overhead keeps 40%. The agency earns more in absolute dollars only when its revenue per client outgrows the payroll it adds.",
    howItWorks: [
      "Enter monthly revenue for both models, then the cost lines: solo costs are typically tools, subscriptions, a contractor for overflow and your own admin time valued honestly; agency costs add delivery staff, account management, office or software seats, insurance and sales time.",
      "The calculator compares margin percentage and absolute profit side by side. Both matter: the percentage decides resilience, the dollars decide income. A 40% margin on $40,000 beats an 85% margin on $10,000 in dollars while being more fragile.",
      "The crossover logic is the point of the tool. Each hire adds a fixed monthly cost that must be covered by new revenue at your gross margin before it adds profit. The result shows the revenue an added role must support to break even.",
      "Run the model before hiring, with the new salary in the agency column and only the revenue you are confident the hire unlocks — not the revenue you hope for. If the hire only works at hoped-for revenue, the hire is the risk.",
    ],
    formula:
      "Margin = (revenue - delivery and operating costs) / revenue x 100. Break-even revenue for a hire = new monthly cost / contribution margin.",
    example: {
      title: "Worked example: should a solo consultant hire a junior?",
      body: "Solo today: $18,000 revenue, $2,700 costs, profit $15,300 (85% margin). Hiring a junior at $4,500 a month (loaded cost) who takes over delivery of $7,000 of existing work frees the owner to sell. If the freed time adds $5,000 of new revenue at a 90% incremental margin ($4,500 of profit), the new profit is $15,300 + $4,500 - $4,500 = $15,300 — exactly flat. The hire only pays when freed time reliably adds more than $5,000 a month; below that, the margin bought flexibility, not profit.",
    },
    faqs: [
      {
        question: "What margin should a service business target?",
        answer:
          "Solo consultants commonly run 70-90% margins before paying themselves. Productised agencies target 50-65% gross margin on delivery and 15-25% net margin after overheads; below about 40% gross margin, one lost client or one bad project erases a month's profit. Judge your margin against your model — an agency at a solo operator's margin target would never hire.",
      },
      {
        question: "Why do agencies accept lower margins than freelancers?",
        answer:
          "Because the agency's revenue is not capped by one person's hours. A solo operator at 85% margin on $15,000 earns $12,750; an agency at 40% on $80,000 earns $32,000 and can survive the owner taking a holiday. Margin percentage falls as scale rises; absolute profit and resilience are what the trade buys.",
      },
      {
        question: "What costs do solo operators usually forget?",
        answer:
          "Their own non-billable time (sales, admin, invoicing — often 30-40% of hours), self-employment tax, software, professional insurance, training, and the income gaps between contracts. Valuing unpaid time at even a modest hourly rate is the correction that changes the solo column most.",
      },
      {
        question: "When does hiring stop being worth it?",
        answer:
          "When utilisation drops. A hire paid for 160 hours a month who is billable for 90 is being carried at nearly double the planned cost per delivered hour. Track utilisation per role; if a role sits below roughly 65-70% billable for two consecutive months, the model says pause hiring and fix sales or scope before adding the next seat.",
      },
    ],
  },

  "creator/merch-margin-calculator": {
    quickAnswer:
      "A hoodie sold at $55 through print-on-demand with a $28 base cost and $5 shipping keeps $22 before platform fees — a 40% margin with zero inventory. Owning the inventory might raise the margin to 55%, but only after paying for stock that may never sell.",
    howItWorks: [
      "Enter the retail price, the per-unit cost from your print-on-demand provider (or your bulk unit cost), shipping charged and shipping cost, and any marketplace or platform fee. The calculator returns profit per unit and margin.",
      "Print-on-demand costs bundle the garment, printing and fulfilment into the base price, which is why the unit cost looks high next to bulk buying: a hoodie blank bought in bulk might cost $12 where the POD base is $28. The fair comparison adds bulk's extras — printing, storage, unsold sizes, your packing time — to the $12.",
      "The margin view also shows the break-even return and defect allowance. POD providers replace defective items, but returns for size are usually at your cost; at a 5% return rate with a $28 unit cost, build about $1.40 per unit of expected return cost into the price.",
      "Use the per-design numbers, not the store average. Merch lines typically have one or two designs carrying the range; the calculator identifies which designs clear your target margin at their real volumes and which are catalogue decoration.",
    ],
    formula:
      "Profit per unit = price + shipping charged - unit cost - shipping cost - platform fees. Margin = profit / price x 100.",
    example: {
      title: "Worked example: POD hoodie vs bulk-printed hoodie",
      body: "POD: price $55, base cost $28 (includes printing and fulfilment), shipping charged $5, shipping cost $5 included in base handling — profit $22, margin 40%, no upfront spend. Bulk: blank $12, printing $6, shipping cost $5.50, packaging $1 — unit cost $24.50, profit $30.50, margin 55.5%. The bulk route earns $8.50 more per sale but requires buying, say, 100 units for $2,450 upfront; if 25 go unsold in wrong sizes, $612.50 of stock offsets the gain on the first 75 sales. Break-even sell-through: about 80 of the 100 units.",
    },
    faqs: [
      {
        question: "What margin should merch aim for?",
        answer:
          "Print-on-demand merch commonly targets 30-50% margins because the provider's base price includes production and fulfilment. Bulk-owned inventory targets 55-70% to compensate for the capital and unsold-stock risk. Below a 25% POD margin, small fee or shipping changes turn designs unprofitable — raise price or change the product before spending on promotion.",
      },
      {
        question: "Is print on demand or bulk printing better?",
        answer:
          "POD wins at low and uncertain volume, for testing designs, and where sizes multiply inventory risk. Bulk wins once a design's volume is proven — typically a few hundred units — because the per-unit cost advantage compounds. Most established creator stores run both: POD for the long tail of designs, bulk for the two or three proven sellers.",
      },
      {
        question: "Who pays for returns on print-on-demand merch?",
        answer:
          "Defects and print errors are the provider's cost. Size exchanges and buyer's-remorse returns are typically yours: you refund the customer, and the returned item usually cannot be restocked through the provider. Price with a returns allowance (3-8% of units for apparel) so a normal return rate does not erase the margin.",
      },
      {
        question: "How should I price a first merch drop?",
        answer:
          "Start from the margin, not from what feels affordable: set the price that returns your target margin at the POD base cost, then check it against comparable creator stores (hoodies commonly sit at $45-$65). If the required price looks unreasonable for the product, the product or provider is wrong — discounting into a thin margin at launch leaves no room for the sales and offers you will want later.",
      },
    ],
  },

  "creator/platform-fee-visualizer": {
    quickAnswer:
      "The same $1,000 of audience income is worth $550 on YouTube ads (55% share), about $900 on Patreon before processing (10% standard plan), roughly $850 through Twitch subscriptions at a 50% share of net revenue, and about $900 on Substack before card fees. Platform choice alone can halve or double what a creator keeps.",
    howItWorks: [
      "Enter a gross income figure and compare what each platform leaves after its share. The visualizer applies each platform's documented cut: YouTube 45% of ad revenue, Twitch about 50% of subscription revenue for most streamers, Patreon 5-12% (10% standard for new creators), Substack 10%, and typical marketplace fee stacks for digital and physical goods.",
      "Payment processing sits underneath several of these numbers and is included where the platform bundles it. Where it is separate (Patreon, Substack), a processing line of roughly 2.9% plus $0.30 per transaction is shown, because on small transactions it exceeds the platform fee itself.",
      "The point of the comparison is not that one platform is 'best'. Each fee buys something: YouTube's 45% buys the audience and the ad sales operation; a marketplace's fee buys traffic and trust; Patreon's smaller cut assumes you bring the audience yourself. The right comparison is net income per unit of your effort, including audience building.",
      "Re-run the comparison at your actual transaction size. Fixed per-transaction fees punish small payments: a $3 membership loses far more, proportionally, than a $30 one, and the ranking of platforms changes with the amount.",
    ],
    formula: "Net kept = gross x (1 - platform share) - processing fees where charged separately.",
    example: {
      title: "Worked example: $5,000 of monthly audience income, four ways",
      body: "YouTube ad revenue: keep 55% = $2,750. Twitch subscriptions at 50%: $2,500 (Bits in the same month would keep 100% of their face value). Patreon at the 10% standard plan: $4,500, minus roughly $180 of processing on typical pledge sizes = about $4,320. Substack at 10%: $4,500 minus about $160 Stripe processing = about $4,340. The spread between the best and worst of these is over $1,800 a month on identical gross audience spending — the audience's $5,000 does not change; the toll does.",
    },
    faqs: [
      {
        question: "Which platform takes the smallest cut?",
        answer:
          "Of the major creator platforms, direct payment links and your own store take the least (payment processing only, about 2.9% + $0.30). Among audience platforms, Patreon's 5-12% and Substack's 10% are the lowest headline shares, but both assume you supply the audience. YouTube's 45% and Twitch's roughly 50% fund discovery and ad sales. Gumroad takes 10% for a storefront with no monthly fee.",
      },
      {
        question: "Why does YouTube take 45%?",
        answer:
          "The share funds the ad marketplace, hosting and delivery of video at scale, and the recommendation system that supplies most views. Whether it is fair depends on the counterfactual: the same videos self-hosted would reach a fraction of the audience. Creators keep 55% of long-form ad revenue and 45% of the pooled Shorts revenue.",
      },
      {
        question: "Are platform fees tax-deductible?",
        answer:
          "Yes, for creators filing as self-employed or through a business: platform shares and processing fees are ordinary business expenses. Report gross income and deduct the fees (or report the net your platform statement shows, consistently). This is general information, not tax advice — keep the platform's annual summary with your records.",
      },
      {
        question: "Should I move my audience to the cheapest platform?",
        answer:
          "Only the part that will actually move. A 35-point fee saving on the 20% of your audience willing to follow you to a new platform loses money against staying. The common pattern is layering: keep discovery on the high-fee platforms, and offer the committed audience a lower-fee home (memberships, your own store) as an additional option.",
      },
    ],
  },

};
