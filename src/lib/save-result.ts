import type { SaveCalculatorResult } from '@/actions/calculator.actions'
import type { SavedCalculator } from '@/types/database'

/**
 * Converts a saveCalculatorAction result back into the thrown errors the
 * save handlers branch on ('Unauthorized' → sign-in popup, the free-limit
 * message → Pro modal). The conversion happens in the browser, where error
 * messages are intact — production redacts messages thrown inside server
 * actions before they reach the client, which is why the action returns
 * its outcome instead of throwing it.
 */
export function unwrapSaveResult(res: SaveCalculatorResult): SavedCalculator {
  if (res.ok) return res.data
  if (res.reason === 'unauthorized') throw new Error('Unauthorized')
  throw new Error(res.message)
}
