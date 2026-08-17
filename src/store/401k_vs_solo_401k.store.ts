import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Retirement401KVsSolo401KState {
  w2Income: number;
  selfEmployedIncome: number;
  age: number;
  setW2Income: (val: number) => void;
  setSelfEmployedIncome: (val: number) => void;
  setAge: (val: number) => void;
}

export const useRetirement401KVsSolo401KStore = create<Retirement401KVsSolo401KState>()(
  persist(
    (set) => ({
      w2Income: 50000,
      selfEmployedIncome: 100000,
      age: 35,
      setW2Income: (val) => set({ w2Income: val }),
      setSelfEmployedIncome: (val) => set({ selfEmployedIncome: val }),
      setAge: (val) => set({ age: val })
    }),
    { name: '401k-vs-solo-401k-calculator-storage' }
  )
)
