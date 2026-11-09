import { useGlobalSettingsStore } from '@/store/global-settings.store'

/**
 * Currency support for calculator pages.
 *
 * The header CurrencySelector writes the chosen code to the global settings
 * store (persisted). Gold-standard tools (freelance) read it inline; every
 * other tool uses the helpers here so the changer works site-wide:
 *
 * - `useCurrencySymbol()` — hook for components: subscribes to the store
 *   (so the component re-renders the moment the currency changes) and
 *   returns the live symbol.
 * - `curSym()` — the same symbol read imperatively. Safe at module scope
 *   (formatters, chart tick functions, helper components) where hooks
 *   cannot run; it stays fresh because the owning CalculatorClient
 *   subscribes via the hook and re-renders the whole tree on change.
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  INR: '₹',
}

export function useCurrencySymbol(): string {
  const currency = useGlobalSettingsStore((s) => s.currency)
  return CURRENCY_SYMBOLS[currency] ?? '$'
}

export function curSym(): string {
  return CURRENCY_SYMBOLS[useGlobalSettingsStore.getState().currency] ?? '$'
}
