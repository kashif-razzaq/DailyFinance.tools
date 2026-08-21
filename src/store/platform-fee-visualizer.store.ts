import { create } from 'zustand'

export interface PlatformFeeState {
  // Inputs
  monthlyRevenue: number
  avgTransactionSize: number
  percentInternational: number // 0-100

  // Actions
  setMonthlyRevenue: (val: number) => void
  setAvgTransactionSize: (val: number) => void
  setPercentInternational: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    transactionCount: number
    platforms: Array<{
      name: string
      platformFeePercent: number
      paymentProcessingPercent: number
      paymentProcessingFixed: number
      totalFees: number
      netRevenue: number
      effectiveFeeRate: number
      color: string
    }>
  }
}

export const usePlatformFeeStore = create<PlatformFeeState>((set, get) => ({
  // Default values
  monthlyRevenue: 5000,
  avgTransactionSize: 15,
  percentInternational: 20,

  setMonthlyRevenue: (val) => set({ monthlyRevenue: val }),
  setAvgTransactionSize: (val) => set({ avgTransactionSize: val }),
  setPercentInternational: (val) => set({ percentInternational: val }),

  getDerivedMetrics: () => {
    const state = get()
    const transactionCount = state.avgTransactionSize > 0 ? state.monthlyRevenue / state.avgTransactionSize : 0
    const intlRatio = state.percentInternational / 100
    const domesticRatio = 1 - intlRatio

    const platforms = [
      {
        name: 'Patreon (Pro)',
        platformFeePercent: 8,
        // Patreon processing: $3 or less is 5% + $0.10. Over $3 is 2.9% + $0.30. Int'l adds +1% to +2.5% usually but simplified here.
        paymentProcessingPercent: state.avgTransactionSize <= 3 ? 5 : 2.9,
        paymentProcessingFixed: state.avgTransactionSize <= 3 ? 0.10 : 0.30,
        color: '#ff424d'
      },
      {
        name: 'Substack',
        platformFeePercent: 10,
        // Stripe: 2.9% + $0.30. Int'l cards add 1-1.5% usually. We'll add 1% weighted by intlRatio.
        paymentProcessingPercent: 2.9 + (1.0 * intlRatio),
        paymentProcessingFixed: 0.30,
        color: '#ff6719'
      },
      {
        name: 'Gumroad',
        platformFeePercent: 10, // Gumroad flat 10%
        // Gumroad uses Stripe/PayPal. Let's average 2.9% + 30c.
        paymentProcessingPercent: 2.9 + (1.5 * intlRatio),
        paymentProcessingFixed: 0.30,
        color: '#ff90e8'
      },
      {
        name: 'Kofi (Gold)',
        platformFeePercent: 0, // $6/mo flat fee, 0% platform fee
        paymentProcessingPercent: 2.9 + (1.5 * intlRatio),
        paymentProcessingFixed: 0.30,
        color: '#13C3FF'
      },
      {
        name: 'OnlyFans',
        platformFeePercent: 20, // Huge 20% cut. Includes processing usually, or they take it from the 20%. OF absorbs processing in the 20% mostly.
        paymentProcessingPercent: 0,
        paymentProcessingFixed: 0,
        color: '#00AFF0'
      }
    ]

    const analyzedPlatforms = platforms.map(p => {
      // Calculate platform fee
      const platformCut = state.monthlyRevenue * (p.platformFeePercent / 100)

      // Calculate processing fee per transaction
      const processingPercentCut = state.monthlyRevenue * (p.paymentProcessingPercent / 100)
      const processingFixedCut = transactionCount * p.paymentProcessingFixed
      const totalProcessingCut = processingPercentCut + processingFixedCut

      const totalFees = platformCut + totalProcessingCut

      // For Ko-fi Gold we simulate the $6 monthly fee as part of the total
      let finalFees = totalFees
      if (p.name === 'Kofi (Gold)') finalFees += 6

      const netRevenue = state.monthlyRevenue - finalFees
      const effectiveFeeRate = state.monthlyRevenue > 0 ? (finalFees / state.monthlyRevenue) * 100 : 0

      return {
        ...p,
        totalFees: finalFees,
        netRevenue,
        effectiveFeeRate
      }
    })

    // Sort by net revenue descending
    analyzedPlatforms.sort((a, b) => b.netRevenue - a.netRevenue)

    return {
      transactionCount,
      platforms: analyzedPlatforms
    }
  }
}))
