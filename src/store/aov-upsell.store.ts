import { create } from 'zustand'

export interface AOVState {
  // Inputs
  currentAOV: number
  monthlyOrders: number
  grossMarginPercent: number
  upsellTakeRate: number // % of users who say yes to the upsell
  upsellPrice: number
  upsellMarginPercent: number // e.g. digital goods are 100% margin

  // Actions
  setCurrentAOV: (val: number) => void
  setMonthlyOrders: (val: number) => void
  setGrossMarginPercent: (val: number) => void
  setUpsellTakeRate: (val: number) => void
  setUpsellPrice: (val: number) => void
  setUpsellMarginPercent: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    currentRevenue: number
    currentProfit: number

    upsellOrders: number
    upsellRevenue: number
    upsellProfit: number

    newAOV: number
    newRevenue: number
    newProfit: number

    profitLiftPercent: number
  }
}

export const useAOVStore = create<AOVState>((set, get) => ({
  currentAOV: 65,
  monthlyOrders: 1000,
  grossMarginPercent: 40,
  upsellTakeRate: 15,
  upsellPrice: 15,
  upsellMarginPercent: 80,

  setCurrentAOV: (val) => set({ currentAOV: val }),
  setMonthlyOrders: (val) => set({ monthlyOrders: val }),
  setGrossMarginPercent: (val) => set({ grossMarginPercent: val }),
  setUpsellTakeRate: (val) => set({ upsellTakeRate: val }),
  setUpsellPrice: (val) => set({ upsellPrice: val }),
  setUpsellMarginPercent: (val) => set({ upsellMarginPercent: val }),

  getDerivedMetrics: () => {
    const state = get()

    const currentRevenue = state.currentAOV * state.monthlyOrders
    const currentProfit = currentRevenue * (state.grossMarginPercent / 100)

    const upsellOrders = state.monthlyOrders * (state.upsellTakeRate / 100)
    const upsellRevenue = upsellOrders * state.upsellPrice
    const upsellProfit = upsellRevenue * (state.upsellMarginPercent / 100)

    const newRevenue = currentRevenue + upsellRevenue
    const newProfit = currentProfit + upsellProfit
    const newAOV = state.monthlyOrders > 0 ? newRevenue / state.monthlyOrders : 0

    const profitLiftPercent = currentProfit > 0 ? (upsellProfit / currentProfit) * 100 : 0

    return {
      currentRevenue,
      currentProfit,
      upsellOrders,
      upsellRevenue,
      upsellProfit,
      newAOV,
      newRevenue,
      newProfit,
      profitLiftPercent
    }
  }
}))
