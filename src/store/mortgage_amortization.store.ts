import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MortgageAmortizationState {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  extraMonthlyPayment: number;
  setLoanAmount: (val: number) => void;
  setInterestRate: (val: number) => void;
  setLoanTermYears: (val: number) => void;
  setExtraMonthlyPayment: (val: number) => void;
}

export const useMortgageAmortizationStore = create<MortgageAmortizationState>()(
  persist(
    (set) => ({
      loanAmount: 400000,
      interestRate: 6.0,
      loanTermYears: 30,
      extraMonthlyPayment: 200,
      setLoanAmount: (val) => set({ loanAmount: val }),
      setInterestRate: (val) => set({ interestRate: val }),
      setLoanTermYears: (val) => set({ loanTermYears: val }),
      setExtraMonthlyPayment: (val) => set({ extraMonthlyPayment: val })
    }),
    { name: 'mortgage-amortization-calculator-storage' }
  )
)
