import { create } from 'zustand'

export const US_STATES = [
  { name: 'Alabama', rate: 4.5 },
  { name: 'Alaska', rate: 0 },
  { name: 'Arizona', rate: 2.5 },
  { name: 'Arkansas', rate: 4.7 },
  { name: 'California', rate: 8.5 },
  { name: 'Colorado', rate: 4.4 },
  { name: 'Connecticut', rate: 6.0 },
  { name: 'Delaware', rate: 5.5 },
  { name: 'Florida', rate: 0 },
  { name: 'Georgia', rate: 5.49 },
  { name: 'Hawaii', rate: 8.0 },
  { name: 'Idaho', rate: 5.8 },
  { name: 'Illinois', rate: 4.95 },
  { name: 'Indiana', rate: 3.05 },
  { name: 'Iowa', rate: 5.7 },
  { name: 'Kansas', rate: 5.0 },
  { name: 'Kentucky', rate: 4.0 },
  { name: 'Louisiana', rate: 4.25 },
  { name: 'Maine', rate: 6.5 },
  { name: 'Maryland', rate: 5.0 },
  { name: 'Massachusetts', rate: 5.0 },
  { name: 'Michigan', rate: 4.25 },
  { name: 'Minnesota', rate: 7.0 },
  { name: 'Mississippi', rate: 4.7 },
  { name: 'Missouri', rate: 4.95 },
  { name: 'Montana', rate: 5.9 },
  { name: 'Nebraska', rate: 5.84 },
  { name: 'Nevada', rate: 0 },
  { name: 'New Hampshire', rate: 0 },
  { name: 'New Jersey', rate: 6.5 },
  { name: 'New Mexico', rate: 4.5 },
  { name: 'New York', rate: 6.0 },
  { name: 'North Carolina', rate: 4.5 },
  { name: 'North Dakota', rate: 2.5 },
  { name: 'Ohio', rate: 3.5 },
  { name: 'Oklahoma', rate: 4.75 },
  { name: 'Oregon', rate: 8.5 },
  { name: 'Pennsylvania', rate: 3.07 },
  { name: 'Rhode Island', rate: 4.5 },
  { name: 'South Carolina', rate: 6.4 },
  { name: 'South Dakota', rate: 0 },
  { name: 'Tennessee', rate: 0 },
  { name: 'Texas', rate: 0 },
  { name: 'Utah', rate: 4.65 },
  { name: 'Vermont', rate: 6.0 },
  { name: 'Virginia', rate: 5.3 },
  { name: 'Washington', rate: 0 },
  { name: 'West Virginia', rate: 5.12 },
  { name: 'Wisconsin', rate: 5.3 },
  { name: 'Wyoming', rate: 0 },
]

interface EstimatedTaxesState {
  filingStatus: string;
  stateName: string;
  w2Income: number;
  freelanceIncome: number;
  businessDeductions: number;
  federalWithheld: number;
  stateWithheld: number;

  setFilingStatus: (val: string) => void;
  setStateName: (val: string) => void;
  setW2Income: (val: number) => void;
  setFreelanceIncome: (val: number) => void;
  setBusinessDeductions: (val: number) => void;
  setFederalWithheld: (val: number) => void;
  setStateWithheld: (val: number) => void;

  getDerivedMetrics: () => {
    netFreelanceIncome: number;
    seTaxableBase: number;
    socialSecurityTax: number;
    medicareTax: number;
    totalSETax: number;
    deductibleSETax: number;
    totalIncome: number;
    agi: number;
    standardDeduction: number;
    qbiDeduction: number;
    federalTaxableIncome: number;
    federalIncomeTax: number;
    stateIncomeTax: number;
    totalAnnualTax: number;
    estimatedFederalBill: number;
    estimatedStateBill: number;
    quarterlyFederalPayment: number;
    quarterlyStatePayment: number;
    effectiveTaxRate: number;
  };
}

export const useEstimatedTaxesStore = create<EstimatedTaxesState>((set, get) => ({
  filingStatus: 'single',
  stateName: 'California',
  w2Income: 0,
  freelanceIncome: 75000,
  businessDeductions: 5000,
  federalWithheld: 0,
  stateWithheld: 0,

  setFilingStatus: (val) => set({ filingStatus: val }),
  setStateName: (val) => set({ stateName: val }),
  setW2Income: (val) => set({ w2Income: val }),
  setFreelanceIncome: (val) => set({ freelanceIncome: val }),
  setBusinessDeductions: (val) => set({ businessDeductions: val }),
  setFederalWithheld: (val) => set({ federalWithheld: val }),
  setStateWithheld: (val) => set({ stateWithheld: val }),

  getDerivedMetrics: () => {
    const { 
      filingStatus, stateName, w2Income, freelanceIncome, 
      businessDeductions, federalWithheld, stateWithheld 
    } = get()
    
    // 1. Business Net Income
    const netFreelanceIncome = Math.max(0, freelanceIncome - businessDeductions)

    // 2. Self-Employment Tax
    const seTaxableBase = netFreelanceIncome * 0.9235
    // 2026 SS Cap: $184,500
    // Note: W2 income counts towards the SS limit!
    const availableSSCap = Math.max(0, 184500 - w2Income)
    const socialSecurityTax = Math.min(seTaxableBase, availableSSCap) * 0.124
    const medicareTax = seTaxableBase * 0.029
    // Additional Medicare tax not strictly calculated for simplicity, but baseline is fine
    const totalSETax = socialSecurityTax + medicareTax
    const deductibleSETax = totalSETax / 2

    // 3. AGI
    const totalIncome = w2Income + netFreelanceIncome
    const agi = Math.max(0, totalIncome - deductibleSETax)

    // 4. Standard Deduction & QBI Deduction
    let standardDeduction = 15750 // Matched to Keeper Tax projection for Single
    if (filingStatus === 'married') standardDeduction = 31500
    if (filingStatus === 'head') standardDeduction = 23600

    // QBI Deduction applies generally to qualified business income (Net Freelance - Deductible SE Tax)
    // It is limited to 20% of QBI OR 20% of taxable income before QBI, whichever is less.
    const taxableIncomeBeforeQBI = Math.max(0, agi - standardDeduction)
    const qbiBase = Math.max(0, netFreelanceIncome - deductibleSETax)
    const qbiDeduction = Math.min(qbiBase * 0.20, taxableIncomeBeforeQBI * 0.20)

    // 5. Taxable Income
    const federalTaxableIncome = Math.max(0, taxableIncomeBeforeQBI - qbiDeduction)

    // 6. Federal Income Tax Brackets (2026)
    let federalIncomeTax = 0
    const income = federalTaxableIncome
    
    if (filingStatus === 'married') {
      if (income > 772100) federalIncomeTax += (income - 772100) * 0.37 + 196887;
      else if (income > 512450) federalIncomeTax += (income - 512450) * 0.35 + 106009.5;
      else if (income > 403550) federalIncomeTax += (income - 403550) * 0.32 + 71161.5;
      else if (income > 211400) federalIncomeTax += (income - 211400) * 0.24 + 25045.5;
      else if (income > 100800) federalIncomeTax += (income - 100800) * 0.22 + 10713.5;
      else if (income > 24800) federalIncomeTax += (income - 24800) * 0.12 + 2480;
      else if (income > 0) federalIncomeTax += income * 0.10;
    } else if (filingStatus === 'head') {
      if (income > 640600) federalIncomeTax += (income - 640600) * 0.37 + 192804;
      else if (income > 256225) federalIncomeTax += (income - 256225) * 0.35 + 58273;
      else if (income > 201775) federalIncomeTax += (income - 201775) * 0.32 + 40849;
      else if (income > 105700) federalIncomeTax += (income - 105700) * 0.24 + 17791;
      else if (income > 67800) federalIncomeTax += (income - 67800) * 0.22 + 9453;
      else if (income > 17650) federalIncomeTax += (income - 17650) * 0.12 + 1765;
      else if (income > 0) federalIncomeTax += income * 0.10;
    } else {
      // Single
      if (income > 640600) federalIncomeTax += (income - 640600) * 0.37 + 195204.75;
      else if (income > 256225) federalIncomeTax += (income - 256225) * 0.35 + 60673.50;
      else if (income > 201775) federalIncomeTax += (income - 201775) * 0.32 + 43249.50;
      else if (income > 105700) federalIncomeTax += (income - 105700) * 0.24 + 20191.50;
      else if (income > 50400) federalIncomeTax += (income - 50400) * 0.22 + 8025.50;
      else if (income > 12400) federalIncomeTax += (income - 12400) * 0.12 + 1240.00;
      else if (income > 0) federalIncomeTax += income * 0.10;
    }

    // 7. State Tax
    const stateObj = US_STATES.find(s => s.name === stateName)
    const stateRate = stateObj ? stateObj.rate : 0
    const stateIncomeTax = federalTaxableIncome > 0 ? federalTaxableIncome * (stateRate / 100) : 0

    // 8. Totals and Quarterlies
    const totalAnnualTax = totalSETax + federalIncomeTax + stateIncomeTax
    
    // Taxes still owed after withholding
    const estimatedFederalBill = (federalIncomeTax + totalSETax) - federalWithheld
    const estimatedStateBill = stateIncomeTax - stateWithheld

    // Quarterly Payments
    const quarterlyFederalPayment = Math.max(0, estimatedFederalBill / 4)
    const quarterlyStatePayment = Math.max(0, estimatedStateBill / 4)
    
    const effectiveTaxRate = totalIncome > 0 ? (totalAnnualTax / totalIncome) * 100 : 0

    return {
      netFreelanceIncome,
      seTaxableBase,
      socialSecurityTax,
      medicareTax,
      totalSETax,
      deductibleSETax,
      totalIncome,
      agi,
      standardDeduction,
      qbiDeduction,
      federalTaxableIncome,
      federalIncomeTax,
      stateIncomeTax,
      totalAnnualTax,
      estimatedFederalBill,
      estimatedStateBill,
      quarterlyFederalPayment,
      quarterlyStatePayment,
      effectiveTaxRate
    }
  }
}))
