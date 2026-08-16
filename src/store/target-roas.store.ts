import { create } from 'zustand'

export interface TargetROASState {
  // Inputs
  retailPrice: number
  cogs: number // Cost of Goods Sold (including shipping/packaging)
  targetProfitMargin: number // Desired net profit margin %

  // Actions
  setRetailPrice: (val: number) => void
  setCogs: (val: number) => void
  setTargetProfitMargin: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    grossProfit: number
    grossMarginPercent: number
    breakEvenROAS: number
    breakEvenCPA: number // Maximum Cost Per Acquisition
    targetROAS: number
    targetCPA: number
  }
}

export const useTargetROASStore = create<TargetROASState>((set, get) => ({
  retailPrice: 100,
  cogs: 40,
  targetProfitMargin: 20,

  setRetailPrice: (val) => set({ retailPrice: val }),
  setCogs: (val) => set({ cogs: val }),
  setTargetProfitMargin: (val) => set({ targetProfitMargin: val }),

  getDerivedMetrics: () => {
    const state = get()

    const grossProfit = state.retailPrice - state.cogs
    const grossMarginPercent = state.retailPrice > 0 ? (grossProfit / state.retailPrice) * 100 : 0

    // Break-even CPA is just your gross profit. You can spend up to your profit to acquire a customer and break even.
    const breakEvenCPA = grossProfit

    // Break-even ROAS = (Retail Price / Gross Profit)
    // Same as 1 / Gross Margin
    const breakEvenROAS = grossProfit > 0 ? state.retailPrice / breakEvenCPA : 0

    // Target CPA calculation based on desired net profit
    // Target Profit Amount = Retail Price * (Target Margin / 100)
    // Target CPA = Gross Profit - Target Profit Amount
    const targetProfitAmount = state.retailPrice * (state.targetProfitMargin / 100)
    const targetCPA = grossProfit - targetProfitAmount

    // Target ROAS = Retail Price / Target CPA
    const targetROAS = targetCPA > 0 ? state.retailPrice / targetCPA : 0

    return {
      grossProfit,
      grossMarginPercent,
      breakEvenROAS,
      breakEvenCPA,
      targetROAS,
      targetCPA
    }
  }
}))
