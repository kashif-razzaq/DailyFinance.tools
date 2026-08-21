import { create } from 'zustand'

export interface BFCMState {
  // Inputs
  baseRetailPrice: number
  cogs: number
  normalDailyVolume: number
  discountPercent: number
  expectedVolumeMultiplier: number // e.g. 3x normal volume
  adSpendIncrease: number // Flat extra ad spend for the promo

  // Actions
  setBaseRetailPrice: (val: number) => void
  setCogs: (val: number) => void
  setNormalDailyVolume: (val: number) => void
  setDiscountPercent: (val: number) => void
  setExpectedVolumeMultiplier: (val: number) => void
  setAdSpendIncrease: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    normalDailyRevenue: number
    normalDailyProfit: number

    promoRetailPrice: number
    promoDailyVolume: number
    promoDailyRevenue: number
    promoDailyProfit: number // After extra ad spend

    revenueLift: number
    profitLift: number
    marginContraction: number
    isProfitablePromo: boolean
  }
}

export const useBFCMStore = create<BFCMState>((set, get) => ({
  baseRetailPrice: 100,
  cogs: 30,
  normalDailyVolume: 50,
  discountPercent: 20,
  expectedVolumeMultiplier: 2.5,
  adSpendIncrease: 500, // Extra daily ad spend

  setBaseRetailPrice: (val) => set({ baseRetailPrice: val }),
  setCogs: (val) => set({ cogs: val }),
  setNormalDailyVolume: (val) => set({ normalDailyVolume: val }),
  setDiscountPercent: (val) => set({ discountPercent: val }),
  setExpectedVolumeMultiplier: (val) => set({ expectedVolumeMultiplier: val }),
  setAdSpendIncrease: (val) => set({ adSpendIncrease: val }),

  getDerivedMetrics: () => {
    const state = get()

    // Normal Economics
    const normalProfitPerUnit = state.baseRetailPrice - state.cogs
    const normalDailyRevenue = state.baseRetailPrice * state.normalDailyVolume
    const normalDailyProfit = normalProfitPerUnit * state.normalDailyVolume
    const normalMargin = state.baseRetailPrice > 0 ? (normalProfitPerUnit / state.baseRetailPrice) * 100 : 0

    // Promo Economics
    const promoRetailPrice = state.baseRetailPrice * (1 - (state.discountPercent / 100))
    const promoProfitPerUnit = promoRetailPrice - state.cogs
    const promoMargin = promoRetailPrice > 0 ? (promoProfitPerUnit / promoRetailPrice) * 100 : 0

    const promoDailyVolume = state.normalDailyVolume * state.expectedVolumeMultiplier
    const promoDailyRevenue = promoRetailPrice * promoDailyVolume

    // Subtract extra ad spend from the total gross promo profit
    const promoDailyProfit = (promoProfitPerUnit * promoDailyVolume) - state.adSpendIncrease

    // Comparisons
    const revenueLift = promoDailyRevenue - normalDailyRevenue
    const profitLift = promoDailyProfit - normalDailyProfit
    const marginContraction = normalMargin - promoMargin

    const isProfitablePromo = profitLift > 0

    return {
      normalDailyRevenue,
      normalDailyProfit,
      promoRetailPrice,
      promoDailyVolume,
      promoDailyRevenue,
      promoDailyProfit,
      revenueLift,
      profitLift,
      marginContraction,
      isProfitablePromo
    }
  }
}))
