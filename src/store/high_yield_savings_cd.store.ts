import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HighYieldSavingsCdState {
  initialDeposit: number;
  monthlyContribution: number;
  interestRate: number;
  termMonths: number;
  setInitialDeposit: (val: number) => void;
  setMonthlyContribution: (val: number) => void;
  setInterestRate: (val: number) => void;
  setTermMonths: (val: number) => void;
}

export const useHighYieldSavingsCdStore = create<HighYieldSavingsCdState>()(
  persist(
    (set) => ({
      initialDeposit: 20000,
      monthlyContribution: 500,
      interestRate: 5.0,
      termMonths: 12,
      setInitialDeposit: (val) => set({ initialDeposit: val }),
      setMonthlyContribution: (val) => set({ monthlyContribution: val }),
      setInterestRate: (val) => set({ interestRate: val }),
      setTermMonths: (val) => set({ termMonths: val })
    }),
    { name: 'high-yield-savings-cd-calculator-storage' }
  )
)
