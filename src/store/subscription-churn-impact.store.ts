import { create } from 'zustand'

export interface ChurnImpactState {
  // Inputs
  currentSubscribers: number
  averageSubscriptionPrice: number
  newSubscribersPerMonth: number
  currentChurnRate: number // %
  targetChurnRate: number // %

  // Actions
  setCurrentSubscribers: (val: number) => void
  setAverageSubscriptionPrice: (val: number) => void
  setNewSubscribersPerMonth: (val: number) => void
  setCurrentChurnRate: (val: number) => void
  setTargetChurnRate: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    projectedCurrentMRR: number[] // 12 month projection array
    projectedTargetMRR: number[]
    currentMRRAtMonth12: number
    targetMRRAtMonth12: number
    twelveMonthRevenueDelta: number // Total revenue difference over the year
    currentLTV: number
    targetLTV: number
  }
}

export const useChurnStore = create<ChurnImpactState>((set, get) => ({
  currentSubscribers: 1000,
  averageSubscriptionPrice: 29,
  newSubscribersPerMonth: 150,
  currentChurnRate: 10,
  targetChurnRate: 5,

  setCurrentSubscribers: (val) => set({ currentSubscribers: val }),
  setAverageSubscriptionPrice: (val) => set({ averageSubscriptionPrice: val }),
  setNewSubscribersPerMonth: (val) => set({ newSubscribersPerMonth: val }),
  setCurrentChurnRate: (val) => set({ currentChurnRate: val }),
  setTargetChurnRate: (val) => set({ targetChurnRate: val }),

  getDerivedMetrics: () => {
    const state = get()

    const projectedCurrentMRR: number[] = []
    const projectedTargetMRR: number[] = []

    let currentSubsA = state.currentSubscribers
    let currentSubsB = state.currentSubscribers

    let totalRevenueDelta = 0

    for (let i = 1; i <= 12; i++) {
      // Current Churn Path
      const churnA = currentSubsA * (state.currentChurnRate / 100)
      currentSubsA = currentSubsA - churnA + state.newSubscribersPerMonth
      const mrrA = currentSubsA * state.averageSubscriptionPrice
      projectedCurrentMRR.push(mrrA)

      // Target Churn Path
      const churnB = currentSubsB * (state.targetChurnRate / 100)
      currentSubsB = currentSubsB - churnB + state.newSubscribersPerMonth
      const mrrB = currentSubsB * state.averageSubscriptionPrice
      projectedTargetMRR.push(mrrB)

      totalRevenueDelta += (mrrB - mrrA)
    }

    const currentLTV = state.currentChurnRate > 0 ? state.averageSubscriptionPrice / (state.currentChurnRate / 100) : 0
    const targetLTV = state.targetChurnRate > 0 ? state.averageSubscriptionPrice / (state.targetChurnRate / 100) : 0

    return {
      projectedCurrentMRR,
      projectedTargetMRR,
      currentMRRAtMonth12: projectedCurrentMRR[11] || 0,
      targetMRRAtMonth12: projectedTargetMRR[11] || 0,
      twelveMonthRevenueDelta: totalRevenueDelta,
      currentLTV,
      targetLTV
    }
  }
}))
