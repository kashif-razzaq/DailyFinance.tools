import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StudentLoanPayoffState {
  loanBalance: number;
  interestRate: number;
  loanTermYears: number;
  extraMonthlyPayment: number;
  setLoanBalance: (val: number) => void;
  setInterestRate: (val: number) => void;
  setLoanTermYears: (val: number) => void;
  setExtraMonthlyPayment: (val: number) => void;
}

export const useStudentLoanPayoffStore = create<StudentLoanPayoffState>()(
  persist(
    (set) => ({
      loanBalance: 50000,
      interestRate: 6.8,
      loanTermYears: 10,
      extraMonthlyPayment: 200,
      setLoanBalance: (val) => set({ loanBalance: val }),
      setInterestRate: (val) => set({ interestRate: val }),
      setLoanTermYears: (val) => set({ loanTermYears: val }),
      setExtraMonthlyPayment: (val) => set({ extraMonthlyPayment: val })
    }),
    { name: 'student-loan-payoff-calculator-storage' }
  )
)
