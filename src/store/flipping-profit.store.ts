import { create } from 'zustand'

interface FlippingProfitState {
  arv: number // After Repair Value
  purchasePrice: number
  repairCosts: number
  holdingCostsMonthly: number
  monthsHeld: number
  closingCostsPercentBuying: number
  closingCostsPercentSelling: number

  setArv: (val: number) => void
  setPurchasePrice: (val: number) => void
  setRepairCosts: (val: number) => void
  setHoldingCostsMonthly: (val: number) => void
  setMonthsHeld: (val: number) => void
  setClosingCostsPercentBuying: (val: number) => void
  setClosingCostsPercentSelling: (val: number) => void

  calculateResult: () => {
    totalHoldingCosts: number
    buyingCosts: number
    sellingCosts: number
    totalInvestment: number
    totalExpenses: number
    profit: number
    roi: number
    seventyPercentRuleMax: number
  }
}

export const useFlippingProfitStore = create<FlippingProfitState>((set, get) => ({
  arv: 400000,
  purchasePrice: 220000,
  repairCosts: 50000,
  holdingCostsMonthly: 1200,
  monthsHeld: 6,
  closingCostsPercentBuying: 2, // percent
  closingCostsPercentSelling: 6, // percent (including agent fees)

  setArv: (val) => set({ arv: val }),
  setPurchasePrice: (val) => set({ purchasePrice: val }),
  setRepairCosts: (val) => set({ repairCosts: val }),
  setHoldingCostsMonthly: (val) => set({ holdingCostsMonthly: val }),
  setMonthsHeld: (val) => set({ monthsHeld: val }),
  setClosingCostsPercentBuying: (val) => set({ closingCostsPercentBuying: val }),
  setClosingCostsPercentSelling: (val) => set({ closingCostsPercentSelling: val }),

  calculateResult: () => {
    const state = get()

    const buyingCosts = state.purchasePrice * (state.closingCostsPercentBuying / 100)
    const sellingCosts = state.arv * (state.closingCostsPercentSelling / 100)
    const totalHoldingCosts = state.holdingCostsMonthly * state.monthsHeld

    const totalExpenses = state.repairCosts + buyingCosts + sellingCosts + totalHoldingCosts
    const totalInvestment = state.purchasePrice + totalExpenses // this is everything out of pocket or financed

    const profit = state.arv - (state.purchasePrice + totalExpenses)
    const roi = (profit / (state.purchasePrice + state.repairCosts + buyingCosts + totalHoldingCosts)) * 100 // ROI on cash deployed (rough proxy)

    const seventyPercentRuleMax = (state.arv * 0.70) - state.repairCosts

    return {
      totalHoldingCosts,
      buyingCosts,
      sellingCosts,
      totalInvestment,
      totalExpenses,
      profit,
      roi,
      seventyPercentRuleMax
    }
  }
}))
