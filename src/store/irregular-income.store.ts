import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IrregularIncomeState {
  essentialLiving: number
  bizOverhead: number
  incomeHistory: number[]
  topClientShare: number
  avgDSO: number
  currentBuffer: number
  targetMonthsToBuild: number
  
  // Setters
  setEssentialLiving: (val: number) => void
  setBizOverhead: (val: number) => void
  setIncomeHistory: (val: number[]) => void
  setTopClientShare: (val: number) => void
  setAvgDSO: (val: number) => void
  setCurrentBuffer: (val: number) => void
  setTargetMonthsToBuild: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    baselineExpense: number
    meanIncome: number
    volatilityIndex: number
    volatilityCategory: 'Low' | 'Medium' | 'High'
    bufferMonthsRequired: number
    volatilityBufferTarget: number
    leanMonthDeficitTarget: number
    finalRecommendedBuffer: number
    bufferGap: number
    monthlySavingsTarget: number
  }
}

export const useIrregularIncomeStore = create<IrregularIncomeState>()(
  persist(
    (set, get) => ({
      essentialLiving: 3500,
      bizOverhead: 500,
      incomeHistory: [5000, 3200, 7500, 2800, 6000, 4100],
      topClientShare: 35,
      avgDSO: 30,
      currentBuffer: 4000,
      targetMonthsToBuild: 6,

      setEssentialLiving: (val) => set({ essentialLiving: val }),
      setBizOverhead: (val) => set({ bizOverhead: val }),
      setIncomeHistory: (val) => set({ incomeHistory: val }),
      setTopClientShare: (val) => set({ topClientShare: val }),
      setAvgDSO: (val) => set({ avgDSO: val }),
      setCurrentBuffer: (val) => set({ currentBuffer: val }),
      setTargetMonthsToBuild: (val) => set({ targetMonthsToBuild: val }),

      getDerivedMetrics: () => {
        const s = get()
        const baselineExpense = s.essentialLiving + s.bizOverhead

        const n = s.incomeHistory.length
        const meanIncome = n > 0 ? s.incomeHistory.reduce((a, b) => a + b, 0) / n : 0
        
        let cv = 0
        if (n >= 3 && meanIncome > 0) {
          const sumSqDiffs = s.incomeHistory.reduce((a, b) => a + Math.pow(b - meanIncome, 2), 0)
          const stdDev = Math.sqrt(sumSqDiffs / (n - 1))
          cv = stdDev / meanIncome
        }

        let mReq = 3.0 // Base
        let vCat: 'Low' | 'Medium' | 'High' = 'Low'
        
        if (cv < 0.20 || n < 3) {
          mReq += 0
          vCat = 'Low'
        } else if (cv >= 0.20 && cv < 0.40) {
          mReq += 1.5
          vCat = 'Medium'
        } else {
          mReq += 3.0
          vCat = 'High'
        }

        if (s.topClientShare >= 40) mReq += 1.5
        mReq += (s.avgDSO / 30) * 0.5

        const volatilityBufferTarget = baselineExpense * mReq

        // Lean Month Deficit Method
        const sortedIncome = [...s.incomeHistory].sort((a, b) => a - b)
        const p25Index = Math.floor(n * 0.25)
        const p25 = sortedIncome[p25Index] || 0
        const dLean = Math.max(0, baselineExpense - p25)
        const leanMonthDeficitTarget = (3.0 * baselineExpense) + (dLean * 4.0)

        const finalRecommendedBuffer = Math.max(volatilityBufferTarget, leanMonthDeficitTarget)
        const bufferGap = Math.max(0, finalRecommendedBuffer - s.currentBuffer)
        const monthlySavingsTarget = bufferGap / Math.max(1, s.targetMonthsToBuild)

        return {
          baselineExpense,
          meanIncome,
          volatilityIndex: cv,
          volatilityCategory: vCat,
          bufferMonthsRequired: mReq,
          volatilityBufferTarget,
          leanMonthDeficitTarget,
          finalRecommendedBuffer,
          bufferGap,
          monthlySavingsTarget
        }
      }
    }),
    {
      name: 'irregular-income-storage',
      skipHydration: true,
    }
  )
)
