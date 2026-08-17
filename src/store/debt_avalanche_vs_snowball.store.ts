import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DebtAvalancheVsSnowballState {
  debt1Balance: number;
  debt1Rate: number;
  debt1MinPayment: number;
  debt2Balance: number;
  debt2Rate: number;
  debt2MinPayment: number;
  extraMonthlyPayment: number;
  setDebt1Balance: (val: number) => void;
  setDebt1Rate: (val: number) => void;
  setDebt1MinPayment: (val: number) => void;
  setDebt2Balance: (val: number) => void;
  setDebt2Rate: (val: number) => void;
  setDebt2MinPayment: (val: number) => void;
  setExtraMonthlyPayment: (val: number) => void;
}

export const useDebtAvalancheVsSnowballStore = create<DebtAvalancheVsSnowballState>()(
  persist(
    (set) => ({
      debt1Balance: 5000,
      debt1Rate: 20,
      debt1MinPayment: 150,
      debt2Balance: 15000,
      debt2Rate: 8,
      debt2MinPayment: 300,
      extraMonthlyPayment: 500,
      setDebt1Balance: (val) => set({ debt1Balance: val }),
      setDebt1Rate: (val) => set({ debt1Rate: val }),
      setDebt1MinPayment: (val) => set({ debt1MinPayment: val }),
      setDebt2Balance: (val) => set({ debt2Balance: val }),
      setDebt2Rate: (val) => set({ debt2Rate: val }),
      setDebt2MinPayment: (val) => set({ debt2MinPayment: val }),
      setExtraMonthlyPayment: (val) => set({ extraMonthlyPayment: val })
    }),
    { name: 'debt-avalanche-vs-snowball-calculator-storage' }
  )
)
