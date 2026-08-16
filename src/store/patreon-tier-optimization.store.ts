import { create } from 'zustand'

export interface Tier {
  id: string
  price: number
  subscribers: number
  churnRate: number // monthly percentage
}

export interface PatreonState {
  // Inputs
  totalAudience: number // Total free audience (YouTube subs, Insta followers, etc)
  conversionRate: number // Expected conversion from free to paid (%)
  platformFee: 'lite' | 'pro' | 'premium' // 5%, 8%, or 12%
  paymentProcessingFee: number // blended rate, typically 5%
  tiers: Tier[]

  // Actions
  setTotalAudience: (val: number) => void
  setConversionRate: (val: number) => void
  setPlatformFee: (val: PatreonState['platformFee']) => void
  updateTier: (id: string, updates: Partial<Tier>) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    projectedSubscribers: number
    actualSubscribers: number
    grossMonthlyRevenue: number
    patreonFeeAmount: number
    processingFeeAmount: number
    netMonthlyRevenue: number
    annualNetRevenue: number
    averageRevenuePerUser: number // (ARPU)
    blendedChurnRate: number
    monthlyChurnedSubscribers: number
    monthlyChurnedRevenue: number
    conversionGap: number // Projected vs Actual
  }
}

export const usePatreonStore = create<PatreonState>((set, get) => ({
  // Default values
  totalAudience: 100000,
  conversionRate: 1.5, // 1.5% is a strong baseline
  platformFee: 'pro', // 8%
  paymentProcessingFee: 5,
  tiers: [
    { id: '1', price: 5, subscribers: 800, churnRate: 8 },
    { id: '2', price: 15, subscribers: 150, churnRate: 12 },
    { id: '3', price: 50, subscribers: 50, churnRate: 5 }
  ],

  setTotalAudience: (val) => set({ totalAudience: val }),
  setConversionRate: (val) => set({ conversionRate: val }),
  setPlatformFee: (val) => set({ platformFee: val }),
  updateTier: (id, updates) => set((state) => ({
    tiers: state.tiers.map(t => t.id === id ? { ...t, ...updates } : t)
  })),

  getDerivedMetrics: () => {
    const state = get()

    const projectedSubscribers = state.totalAudience * (state.conversionRate / 100)

    let actualSubscribers = 0
    let grossMonthlyRevenue = 0
    let totalChurnedSubs = 0
    let totalChurnedRev = 0

    state.tiers.forEach(t => {
      actualSubscribers += t.subscribers
      const tierRev = t.price * t.subscribers
      grossMonthlyRevenue += tierRev

      const churnedSubs = t.subscribers * (t.churnRate / 100)
      totalChurnedSubs += churnedSubs
      totalChurnedRev += churnedSubs * t.price
    })

    const feePercentages = { lite: 5, pro: 8, premium: 12 }
    const patreonFeeAmount = grossMonthlyRevenue * (feePercentages[state.platformFee] / 100)
    const processingFeeAmount = grossMonthlyRevenue * (state.paymentProcessingFee / 100)

    const netMonthlyRevenue = grossMonthlyRevenue - patreonFeeAmount - processingFeeAmount
    const annualNetRevenue = netMonthlyRevenue * 12

    const averageRevenuePerUser = actualSubscribers > 0 ? grossMonthlyRevenue / actualSubscribers : 0
    const blendedChurnRate = actualSubscribers > 0 ? (totalChurnedSubs / actualSubscribers) * 100 : 0

    const conversionGap = projectedSubscribers - actualSubscribers

    return {
      projectedSubscribers,
      actualSubscribers,
      grossMonthlyRevenue,
      patreonFeeAmount,
      processingFeeAmount,
      netMonthlyRevenue,
      annualNetRevenue,
      averageRevenuePerUser,
      blendedChurnRate,
      monthlyChurnedSubscribers: totalChurnedSubs,
      monthlyChurnedRevenue: totalChurnedRev,
      conversionGap
    }
  }
}))
