import { create } from 'zustand'

export interface LoanRunwayState {
  // Inputs
  cashOnHand: number
  monthlyRevenue: number
  monthlyExpenses: number
  loanAmount: number
  loanInterestRate: number // Annual %
  loanTermMonths: number

  // Actions
  setCashOnHand: (val: number) => void
  setMonthlyRevenue: (val: number) => void
  setMonthlyExpenses: (val: number) => void
  setLoanAmount: (val: number) => void
  setLoanInterestRate: (val: number) => void
  setLoanTermMonths: (val: number) => void

  // Derived Metrics
  getDerivedMetrics: () => {
    monthlyBurnRate: number
    runwayMonthsBeforeLoan: number

    monthlyLoanPayment: number
    totalInterestPaid: number

    newMonthlyBurnRate: number
    runwayMonthsAfterLoan: number

    runwayExtendedBy: number
  }
}

export const useLoanRunwayStore = create<LoanRunwayState>((set, get) => ({
  cashOnHand: 25000,
  monthlyRevenue: 15000,
  monthlyExpenses: 20000,
  loanAmount: 50000,
  loanInterestRate: 8,
  loanTermMonths: 36,

  setCashOnHand: (val) => set({ cashOnHand: val }),
  setMonthlyRevenue: (val) => set({ monthlyRevenue: val }),
  setMonthlyExpenses: (val) => set({ monthlyExpenses: val }),
  setLoanAmount: (val) => set({ loanAmount: val }),
  setLoanInterestRate: (val) => set({ loanInterestRate: val }),
  setLoanTermMonths: (val) => set({ loanTermMonths: val }),

  getDerivedMetrics: () => {
    const state = get()

    // 1. Current Burn Rate & Runway
    const monthlyBurnRate = state.monthlyExpenses - state.monthlyRevenue
    let runwayMonthsBeforeLoan = 999 // Assume infinite if profitable
    if (monthlyBurnRate > 0) {
      runwayMonthsBeforeLoan = state.cashOnHand / monthlyBurnRate
    }

    // 2. Loan Calculations (Standard Amortization Formula)
    let monthlyLoanPayment = 0
    let totalInterestPaid = 0

    if (state.loanAmount > 0 && state.loanTermMonths > 0) {
      if (state.loanInterestRate > 0) {
        const r = (state.loanInterestRate / 100) / 12 // monthly interest rate
        const n = state.loanTermMonths
        const P = state.loanAmount

        monthlyLoanPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        const totalPaid = monthlyLoanPayment * n
        totalInterestPaid = totalPaid - P
      } else {
        // 0% interest case
        monthlyLoanPayment = state.loanAmount / state.loanTermMonths
        totalInterestPaid = 0
      }
    }

    // 3. New Burn Rate & Runway
    const newMonthlyBurnRate = monthlyBurnRate + monthlyLoanPayment
    const newCashOnHand = state.cashOnHand + state.loanAmount

    let runwayMonthsAfterLoan = 999
    if (newMonthlyBurnRate > 0) {
      runwayMonthsAfterLoan = newCashOnHand / newMonthlyBurnRate
    }

    // If profitable, setting extended to 0 or 999 depending on context. Let's use 0 to indicate no extension needed.
    const runwayExtendedBy = (runwayMonthsAfterLoan === 999 || runwayMonthsBeforeLoan === 999)
      ? 0
      : runwayMonthsAfterLoan - runwayMonthsBeforeLoan

    return {
      monthlyBurnRate,
      runwayMonthsBeforeLoan,
      monthlyLoanPayment,
      totalInterestPaid,
      newMonthlyBurnRate,
      runwayMonthsAfterLoan,
      runwayExtendedBy
    }
  }
}))
