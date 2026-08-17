import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CreditCardPayoffState {
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  setBalance: (val: number) => void;
  setInterestRate: (val: number) => void;
  setMonthlyPayment: (val: number) => void;
}

export const useCreditCardPayoffStore = create<CreditCardPayoffState>()(
  persist(
    (set) => ({
      balance: 10000,
      interestRate: 24,
      monthlyPayment: 500,
      setBalance: (val) => set({ balance: val }),
      setInterestRate: (val) => set({ interestRate: val }),
      setMonthlyPayment: (val) => set({ monthlyPayment: val })
    }),
    { name: 'credit-card-payoff-calculator-storage' }
  )
)
