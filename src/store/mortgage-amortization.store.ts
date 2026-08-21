import { create } from 'zustand'

interface MortgageAmortizationState {
  loanAmount: number
  interestRate: number
  loanTerm: number // years
  extraMonthlyPayment: number

  setLoanAmount: (val: number) => void
  setInterestRate: (val: number) => void
  setLoanTerm: (val: number) => void
  setExtraMonthlyPayment: (val: number) => void

  calculateResult: () => {
    monthlyPayment: number
    totalPaymentWithExtra: number
    totalInterestNormal: number
    totalInterestWithExtra: number
    interestSaved: number
    monthsSaved: number
  }
}

export const useMortgageAmortizationStore = create<MortgageAmortizationState>((set, get) => ({
  loanAmount: 300000,
  interestRate: 6.5, // percent
  loanTerm: 30, // years
  extraMonthlyPayment: 200,

  setLoanAmount: (val) => set({ loanAmount: val }),
  setInterestRate: (val) => set({ interestRate: val }),
  setLoanTerm: (val) => set({ loanTerm: val }),
  setExtraMonthlyPayment: (val) => set({ extraMonthlyPayment: val }),

  calculateResult: () => {
    const { loanAmount, interestRate, loanTerm, extraMonthlyPayment } = get()

    const monthlyRate = (interestRate / 100) / 12
    const totalMonths = loanTerm * 12

    let monthlyPayment = 0
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / totalMonths
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }

    // Normal calculation
    const totalInterestNormal = (monthlyPayment * totalMonths) - loanAmount

    // Extra payment calculation
    let balance = loanAmount
    let totalInterestWithExtra = 0
    let monthsPaid = 0

    const paymentWithExtra = monthlyPayment + extraMonthlyPayment

    while (balance > 0 && monthsPaid < totalMonths * 2) {
      const interest = balance * monthlyRate
      totalInterestWithExtra += interest

      let principal = paymentWithExtra - interest
      if (principal > balance) {
        principal = balance
      }

      balance -= principal
      monthsPaid++
    }

    return {
      monthlyPayment,
      totalPaymentWithExtra: paymentWithExtra,
      totalInterestNormal,
      totalInterestWithExtra,
      interestSaved: totalInterestNormal - totalInterestWithExtra,
      monthsSaved: totalMonths - monthsPaid
    }
  }
}))
