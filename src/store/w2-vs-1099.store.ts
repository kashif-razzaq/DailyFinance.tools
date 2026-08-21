import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface W2vs1099State {
  w2SalaryOrHourly: number
  w2InputType: 'Annual' | 'Hourly'
  w2BenefitsValue: number
  
  contractorRate: number
  contractorInputType: 'Hourly' | 'Annual'
  hoursPerWeek: number
  weeksPerYear: number
  businessExpenses: number
  effectiveTaxRate: number

  // Setters
  setW2SalaryOrHourly: (val: number) => void
  setW2InputType: (val: 'Annual' | 'Hourly') => void
  setW2BenefitsValue: (val: number) => void
  
  setContractorRate: (val: number) => void
  setContractorInputType: (val: 'Hourly' | 'Annual') => void
  setHoursPerWeek: (val: number) => void
  setWeeksPerYear: (val: number) => void
  setBusinessExpenses: (val: number) => void
  setEffectiveTaxRate: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    w2AnnualGross: number
    w2Fica: number
    w2IncomeTax: number
    w2Net: number
    w2TotalValue: number
    
    cAnnualGross: number
    cNetBusiness: number
    cSeTax: number
    cIncomeTax: number
    cNetTakeHome: number

    equivalent1099Hourly: number
    equivalent1099Annual: number
    equivalentW2Annual: number
    equivalentW2Hourly: number
  }
}

export const useW2vs1099Store = create<W2vs1099State>()(
  persist(
    (set, get) => ({
      w2SalaryOrHourly: 100000,
      w2InputType: 'Annual',
      w2BenefitsValue: 15000,
      
      contractorRate: 75,
      contractorInputType: 'Hourly',
      hoursPerWeek: 40,
      weeksPerYear: 48,
      businessExpenses: 10000,
      effectiveTaxRate: 20,

      setW2SalaryOrHourly: (val) => set({ w2SalaryOrHourly: val }),
      setW2InputType: (val) => set({ w2InputType: val }),
      setW2BenefitsValue: (val) => set({ w2BenefitsValue: val }),
      
      setContractorRate: (val) => set({ contractorRate: val }),
      setContractorInputType: (val) => set({ contractorInputType: val }),
      setHoursPerWeek: (val) => set({ hoursPerWeek: val }),
      setWeeksPerYear: (val) => set({ weeksPerYear: val }),
      setBusinessExpenses: (val) => set({ businessExpenses: val }),
      setEffectiveTaxRate: (val) => set({ effectiveTaxRate: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        const workingHoursAnnual = s.hoursPerWeek * s.weeksPerYear
        const standardW2Hours = 2080 // 40 hours * 52 weeks

        // W-2 Calcs
        const w2AnnualGross = s.w2InputType === 'Annual' ? s.w2SalaryOrHourly : s.w2SalaryOrHourly * standardW2Hours
        const w2Fica = w2AnnualGross * 0.0765
        const w2IncomeTax = w2AnnualGross * (s.effectiveTaxRate / 100)
        const w2Net = Math.max(0, w2AnnualGross - w2Fica - w2IncomeTax)
        const w2TotalValue = w2Net + s.w2BenefitsValue

        // 1099 Calcs
        const cAnnualGross = s.contractorInputType === 'Hourly' ? s.contractorRate * workingHoursAnnual : s.contractorRate
        const cNetBusiness = Math.max(0, cAnnualGross - s.businessExpenses)
        const cSeTax = cNetBusiness * 0.9235 * 0.153
        const qbi = Math.max(0, (cNetBusiness - (cSeTax / 2)) * 0.2)
        const cTaxable = Math.max(0, cNetBusiness - (cSeTax / 2) - qbi)
        const cIncomeTax = cTaxable * (s.effectiveTaxRate / 100)
        const cNetTakeHome = Math.max(0, cNetBusiness - cSeTax - cIncomeTax)

        // Equivalence logic (Rough reverse engineering to find break-even point)
        // To match W2 total value, the 1099 needs a net take-home equal to `w2TotalValue`.
        // Net Take-Home = Gross - Expenses - SE Tax - Income Tax
        // Since SE tax and Income tax are proportional to (Gross - Expenses), we can approximate the multiplier.
        // A rough rule of thumb for effective combined tax rate for 1099 (SE + Income - QBI) is roughly (15.3% + effective - QBI savings).
        // For simplicity, we assume a total tax drag of ~30% on the net business income.
        // So Net Take-Home ≈ (Gross - Expenses) * (1 - 0.30)
        // Gross ≈ (Net Take-Home / 0.70) + Expenses
        // We calculate the exact drag dynamically based on the current inputs.
        
        let taxDragRate = 0.30 // fallback
        if (cNetBusiness > 0) {
           taxDragRate = (cSeTax + cIncomeTax) / cNetBusiness
        }
        const safeDrag = Math.min(0.9, Math.max(0.1, taxDragRate))
        
        const equivalent1099Annual = (w2TotalValue / (1 - safeDrag)) + s.businessExpenses
        const equivalent1099Hourly = workingHoursAnnual > 0 ? equivalent1099Annual / workingHoursAnnual : 0

        // Reverse: W-2 equivalent of the 1099 rate
        // We want W2 Net + Benefits = 1099 Net Take Home
        // W2 Net = W2 Gross * (1 - 0.0765 - IncomeTaxRate)
        const w2TaxDrag = 0.0765 + (s.effectiveTaxRate / 100)
        const targetW2Net = Math.max(0, cNetTakeHome - s.w2BenefitsValue)
        const equivalentW2Annual = targetW2Net / (1 - w2TaxDrag)
        const equivalentW2Hourly = equivalentW2Annual / standardW2Hours

        return {
          w2AnnualGross,
          w2Fica,
          w2IncomeTax,
          w2Net,
          w2TotalValue,
          
          cAnnualGross,
          cNetBusiness,
          cSeTax,
          cIncomeTax,
          cNetTakeHome,

          equivalent1099Annual,
          equivalent1099Hourly,
          equivalentW2Annual,
          equivalentW2Hourly
        }
      }
    }),
    {
      name: 'w2-vs-1099-storage',
      skipHydration: true,
    }
  )
)
