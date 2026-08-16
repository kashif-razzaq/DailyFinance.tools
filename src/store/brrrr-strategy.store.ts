import { create } from 'zustand'

export interface BRRRRState {
  purchasePrice: number
  downPaymentPercent: number
  rehabCost: number
  arv: number // After Repair Value
  refinanceLtvPercent: number // e.g. 75% LTV on refi
  monthlyRent: number

  setPurchasePrice: (val: number) => void
  setDownPaymentPercent: (val: number) => void
  setRehabCost: (val: number) => void
  setArv: (val: number) => void
  setRefinanceLtvPercent: (val: number) => void
  setMonthlyRent: (val: number) => void

  getDerivedMetrics: () => {
    initialCashInvested: number
    newLoanAmount: number
    cashPulledOut: number
    capitalLeftInDeal: number
    monthlyGrossRevenue: number
  }
}

export const useBRRRRStore = create<BRRRRState>((set, get) => ({
  purchasePrice: 150000,
  downPaymentPercent: 20,
  rehabCost: 30000,
  arv: 250000,
  refinanceLtvPercent: 75,
  monthlyRent: 2000,

  setPurchasePrice: (val) => set({ purchasePrice: val }),
  setDownPaymentPercent: (val) => set({ downPaymentPercent: val }),
  setRehabCost: (val) => set({ rehabCost: val }),
  setArv: (val) => set({ arv: val }),
  setRefinanceLtvPercent: (val) => set({ refinanceLtvPercent: val }),
  setMonthlyRent: (val) => set({ monthlyRent: val }),

  getDerivedMetrics: () => {
    const state = get()

    const initialLoan = state.purchasePrice * (1 - (state.downPaymentPercent / 100))
    const initialCashInvested = (state.purchasePrice * (state.downPaymentPercent / 100)) + state.rehabCost

    const newLoanAmount = state.arv * (state.refinanceLtvPercent / 100)

    // Cash pulled out is new loan minus paying off old loan
    const cashPulledOut = newLoanAmount - initialLoan

    const capitalLeftInDeal = initialCashInvested - cashPulledOut

    return {
      initialCashInvested,
      newLoanAmount,
      cashPulledOut,
      capitalLeftInDeal,
      monthlyGrossRevenue: state.monthlyRent
    }
  }
}))
