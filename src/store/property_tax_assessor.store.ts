import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PropertyTaxAssessorState {
  marketValue: number;
  assessmentRatio: number;
  millageRate: number;
  exemptions: number;
  setMarketValue: (val: number) => void;
  setAssessmentRatio: (val: number) => void;
  setMillageRate: (val: number) => void;
  setExemptions: (val: number) => void;
}

export const usePropertyTaxAssessorStore = create<PropertyTaxAssessorState>()(
  persist(
    (set) => ({
      marketValue: 450000,
      assessmentRatio: 100,
      millageRate: 25,
      exemptions: 25000,
      setMarketValue: (val) => set({ marketValue: val }),
      setAssessmentRatio: (val) => set({ assessmentRatio: val }),
      setMillageRate: (val) => set({ millageRate: val }),
      setExemptions: (val) => set({ exemptions: val })
    }),
    { name: 'property-tax-assessor-calculator-storage' }
  )
)
