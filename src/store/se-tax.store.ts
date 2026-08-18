import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SETaxState {
  grossIncome: number
  businessExpenses: number
  taxYear: number
  filingStatus: 'Single' | 'Married Filing Jointly'
  stateTaxRate: number
  
  // Setters
  setGrossIncome: (val: number) => void
  setBusinessExpenses: (val: number) => void
  setTaxYear: (val: number) => void
  setFilingStatus: (val: 'Single' | 'Married Filing Jointly') => void
  setStateTaxRate: (val: number) => void

  // Derived metrics
  getDerivedMetrics: () => {
    netProfit: number
    seTaxableIncome: number
    seTax: number
    halfSeTaxDeduction: number
    estimatedFederalIncomeTax: number
    estimatedStateIncomeTax: number
    totalEstimatedTax: number
    quarterlyPayment: number
    effectiveTaxRate: number
    takeHomePay: number
  }
}

export const useFreelanceTaxStore = create<SETaxState>()(
  persist(
    (set, get) => ({
      grossIncome: 100000,
      businessExpenses: 15000,
      taxYear: 2024,
      filingStatus: 'Single',
      stateTaxRate: 5.0,

      setGrossIncome: (val) => set({ grossIncome: val }),
      setBusinessExpenses: (val) => set({ businessExpenses: val }),
      setTaxYear: (val) => set({ taxYear: val }),
      setFilingStatus: (val) => set({ filingStatus: val }),
      setStateTaxRate: (val) => set({ stateTaxRate: val }),

      getDerivedMetrics: () => {
        const s = get()
        
        const netProfit = Math.max(0, s.grossIncome - s.businessExpenses)
        
        // SE Tax Calculation
        const seTaxableIncome = netProfit * 0.9235
        const seTax = seTaxableIncome * 0.153
        const halfSeTaxDeduction = seTax * 0.5
        
        // Simplified Federal Income Tax (Rough Estimate based on standard deduction)
        const standardDeduction = s.filingStatus === 'Single' ? 14600 : 29200
        const federalTaxableIncome = Math.max(0, netProfit - halfSeTaxDeduction - standardDeduction)
        
        // Extremely simplified federal brackets for estimation purposes (2024 single)
        let estimatedFederalIncomeTax = 0
        if (federalTaxableIncome > 0) {
          if (s.filingStatus === 'Single') {
            if (federalTaxableIncome <= 11600) estimatedFederalIncomeTax = federalTaxableIncome * 0.10
            else if (federalTaxableIncome <= 47150) estimatedFederalIncomeTax = 1160 + (federalTaxableIncome - 11600) * 0.12
            else if (federalTaxableIncome <= 100525) estimatedFederalIncomeTax = 5426 + (federalTaxableIncome - 47150) * 0.22
            else if (federalTaxableIncome <= 191950) estimatedFederalIncomeTax = 17168.5 + (federalTaxableIncome - 100525) * 0.24
            else estimatedFederalIncomeTax = 39110.5 + (federalTaxableIncome - 191950) * 0.32 // Caps here for simplicity of most freelance
          } else {
            // Married Jointly
            if (federalTaxableIncome <= 23200) estimatedFederalIncomeTax = federalTaxableIncome * 0.10
            else if (federalTaxableIncome <= 94300) estimatedFederalIncomeTax = 2320 + (federalTaxableIncome - 23200) * 0.12
            else if (federalTaxableIncome <= 201050) estimatedFederalIncomeTax = 10852 + (federalTaxableIncome - 94300) * 0.22
            else if (federalTaxableIncome <= 383900) estimatedFederalIncomeTax = 34337 + (federalTaxableIncome - 201050) * 0.24
            else estimatedFederalIncomeTax = 78221 + (federalTaxableIncome - 383900) * 0.32
          }
        }

        const estimatedStateIncomeTax = federalTaxableIncome * (s.stateTaxRate / 100)
        
        const totalEstimatedTax = seTax + estimatedFederalIncomeTax + estimatedStateIncomeTax
        const quarterlyPayment = totalEstimatedTax / 4
        
        const effectiveTaxRate = netProfit > 0 ? (totalEstimatedTax / netProfit) * 100 : 0
        const takeHomePay = netProfit - totalEstimatedTax

        return {
          netProfit,
          seTaxableIncome,
          seTax,
          halfSeTaxDeduction,
          estimatedFederalIncomeTax,
          estimatedStateIncomeTax,
          totalEstimatedTax,
          quarterlyPayment,
          effectiveTaxRate,
          takeHomePay
        }
      }
    }),
    {
      name: 'se-tax-calculator-storage',
      skipHydration: true,
    }
  )
)
