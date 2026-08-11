import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FreelanceTaxDeductionsState {
  homeStatus: 'Renter' | 'Homeowner'
  officeSpace: number
  totalHomeSpace: number
  monthlyRentMortgage: number
  annualUtilitiesInsurance: number
  directRepairs: number
  netBusinessIncome: number
  combinedTaxBracket: number
  homeValue: number // Only for homeowners for depreciation
  
  // Setters
  setHomeStatus: (val: 'Renter' | 'Homeowner') => void
  setOfficeSpace: (val: number) => void
  setTotalHomeSpace: (val: number) => void
  setMonthlyRentMortgage: (val: number) => void
  setAnnualUtilitiesInsurance: (val: number) => void
  setDirectRepairs: (val: number) => void
  setNetBusinessIncome: (val: number) => void
  setCombinedTaxBracket: (val: number) => void
  setHomeValue: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    businessUsePct: number
    simplifiedDeduction: number
    actualDeduction: number
    simplifiedTaxSavings: number
    actualTaxSavings: number
    optimalMethod: 'Simplified' | 'Actual Expenses'
    depreciationAmount: number
  }
}

export const useFreelanceTaxDeductionsStore = create<FreelanceTaxDeductionsState>()(
  persist(
    (set, get) => ({
      homeStatus: 'Renter',
      officeSpace: 150,
      totalHomeSpace: 1500,
      monthlyRentMortgage: 2000,
      annualUtilitiesInsurance: 3600,
      directRepairs: 0,
      netBusinessIncome: 50000,
      combinedTaxBracket: 30,
      homeValue: 350000,

      setHomeStatus: (val) => set({ homeStatus: val }),
      setOfficeSpace: (val) => set({ officeSpace: val }),
      setTotalHomeSpace: (val) => set({ totalHomeSpace: val }),
      setMonthlyRentMortgage: (val) => set({ monthlyRentMortgage: val }),
      setAnnualUtilitiesInsurance: (val) => set({ annualUtilitiesInsurance: val }),
      setDirectRepairs: (val) => set({ directRepairs: val }),
      setNetBusinessIncome: (val) => set({ netBusinessIncome: val }),
      setCombinedTaxBracket: (val) => set({ combinedTaxBracket: val }),
      setHomeValue: (val) => set({ homeValue: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        let businessUsePct = 0
        if (s.totalHomeSpace > 0) {
          businessUsePct = Math.min(1.0, s.officeSpace / s.totalHomeSpace)
        }

        const simplifiedDeductionRaw = Math.min(s.officeSpace, 300) * 5.00
        const simplifiedDeduction = Math.min(simplifiedDeductionRaw, Math.max(0, s.netBusinessIncome))

        const annualRentMortgage = s.monthlyRentMortgage * 12
        const indirectTotal = annualRentMortgage + s.annualUtilitiesInsurance
        
        let depreciationAmount = 0
        if (s.homeStatus === 'Homeowner' && s.homeValue > 0) {
          // Exclude land (rule of thumb 20% land value, 80% building)
          const buildingValue = s.homeValue * 0.8
          depreciationAmount = (buildingValue / 39) * businessUsePct
        }

        const actualDeductionRaw = s.directRepairs + (indirectTotal * businessUsePct) + depreciationAmount
        // Cannot exceed net business income (though actual can carry forward, we show the usable deduction for this year)
        const actualDeduction = Math.min(actualDeductionRaw, Math.max(0, s.netBusinessIncome))

        const simplifiedTaxSavings = simplifiedDeduction * (s.combinedTaxBracket / 100)
        const actualTaxSavings = actualDeduction * (s.combinedTaxBracket / 100)

        // Recommend Simplified if it's close enough (e.g. less than $200 diff) to avoid depreciation recapture and paperwork
        const recaptureThresholdBuffer = s.homeStatus === 'Homeowner' ? 200 : 0
        
        let optimalMethod: 'Simplified' | 'Actual Expenses' = 'Simplified'
        if (actualDeduction > (simplifiedDeduction + recaptureThresholdBuffer)) {
          optimalMethod = 'Actual Expenses'
        }

        return {
          businessUsePct: businessUsePct * 100,
          simplifiedDeduction,
          actualDeduction,
          simplifiedTaxSavings,
          actualTaxSavings,
          optimalMethod,
          depreciationAmount
        }
      }
    }),
    {
      name: 'freelance-tax-deductions-storage',
      skipHydration: true,
    }
  )
)
