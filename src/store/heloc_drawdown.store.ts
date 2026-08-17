import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HelocDrawdownState {
  creditLimit: number;
  amountDrawn: number;
  interestRate: number;
  setCreditLimit: (val: number) => void;
  setAmountDrawn: (val: number) => void;
  setInterestRate: (val: number) => void;
}

export const useHelocDrawdownStore = create<HelocDrawdownState>()(
  persist(
    (set) => ({
      creditLimit: 100000,
      amountDrawn: 50000,
      interestRate: 7.5,
      setCreditLimit: (val) => set({ creditLimit: val }),
      setAmountDrawn: (val) => set({ amountDrawn: val }),
      setInterestRate: (val) => set({ interestRate: val })
    }),
    { name: 'heloc-drawdown-simulator-storage' }
  )
)
