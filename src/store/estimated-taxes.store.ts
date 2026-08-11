import { create } from 'zustand'

interface EstimatedTaxesState {
  // Inputs
  netIncome: number;
  stateTaxRate: number;
  claimsQBI: boolean;

  // Setters
  setNetIncome: (val: number) => void;
  setStateTaxRate: (val: number) => void;
  setClaimsQBI: (val: boolean) => void;

  // Derived Getters
  getDerivedMetrics: () => {
    seTaxableBase: number;
    socialSecurityTax: number;
    medicareTax: number;
    totalSETax: number;
    deductibleSETax: number;
    agi: number;
    standardDeduction: number;
    qbiDeduction: number;
    federalTaxableIncome: number;
    federalIncomeTax: number;
    stateIncomeTax: number;
    totalAnnualTax: number;
    quarterlyPayment: number;
    effectiveTaxRate: number;
  };
}

export const useEstimatedTaxesStore = create<EstimatedTaxesState>((set, get) => ({
  netIncome: 85000,
  stateTaxRate: 4.5,
  claimsQBI: true,

  setNetIncome: (val) => set({ netIncome: val }),
  setStateTaxRate: (val) => set({ stateTaxRate: val }),
  setClaimsQBI: (val) => set({ claimsQBI: val }),

  getDerivedMetrics: () => {
    const { netIncome, stateTaxRate, claimsQBI } = get()
    
    // 1. Self-Employment Tax
    const seTaxableBase = netIncome * 0.9235
    // 2026 SS Cap: $184,500
    const socialSecurityTax = Math.min(seTaxableBase, 184500) * 0.124
    const medicareTax = seTaxableBase * 0.029
    const totalSETax = socialSecurityTax + medicareTax
    const deductibleSETax = totalSETax / 2

    // 2. AGI & Deductions
    const agi = netIncome - deductibleSETax
    const standardDeduction = 16100 // 2026 Single Filer
    const qbiDeduction = claimsQBI ? (agi * 0.20) : 0
    const federalTaxableIncome = Math.max(0, agi - standardDeduction - qbiDeduction)

    // 3. Federal Income Tax Brackets (2026 Single)
    let federalIncomeTax = 0
    const income = federalTaxableIncome
    
    if (income > 640600) {
      federalIncomeTax += (income - 640600) * 0.37 + 195204.75
    } else if (income > 256225) {
      federalIncomeTax += (income - 256225) * 0.35 + 60673.50
    } else if (income > 201775) {
      federalIncomeTax += (income - 201775) * 0.32 + 43249.50
    } else if (income > 105700) {
      federalIncomeTax += (income - 105700) * 0.24 + 20191.50
    } else if (income > 50400) {
      federalIncomeTax += (income - 50400) * 0.22 + 8025.50
    } else if (income > 12400) {
      federalIncomeTax += (income - 12400) * 0.12 + 1240.00
    } else if (income > 0) {
      federalIncomeTax += income * 0.10
    }

    // 4. State Tax
    const stateIncomeTax = agi * (stateTaxRate / 100)

    // 5. Totals
    const totalAnnualTax = totalSETax + federalIncomeTax + stateIncomeTax
    const quarterlyPayment = totalAnnualTax / 4
    const effectiveTaxRate = netIncome > 0 ? (totalAnnualTax / netIncome) * 100 : 0

    return {
      seTaxableBase,
      socialSecurityTax,
      medicareTax,
      totalSETax,
      deductibleSETax,
      agi,
      standardDeduction,
      qbiDeduction,
      federalTaxableIncome,
      federalIncomeTax,
      stateIncomeTax,
      totalAnnualTax,
      quarterlyPayment,
      effectiveTaxRate
    }
  }
}))
