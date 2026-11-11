'use client'

import { useEffect } from 'react'
import { getSharedCalculatorAction } from '@/actions/calculator.actions'

/**
 * useSavedScenarioRestore — puts a saved scenario back into a calculator.
 *
 * When a tool page is opened from the Scenario Vault (or a share link) with
 * ?savedId=<id>, this fetches the saved row and hands its input_state to the
 * calculator's apply callback, which pushes the values into the tool's own
 * state setters. The fetch goes through getSharedCalculatorAction, which
 * only returns the row to its owner (or to anyone when the scenario is
 * public), so a guessed id cannot read someone else's private scenario.
 *
 * Runs once on mount. Clients wire it next to their state declarations:
 *
 *   useSavedScenarioRestore((s) => {
 *     if (s.amount !== undefined) setAmount(s.amount as any)
 *     ...
 *   })
 */
export function useSavedScenarioRestore(
  apply: (state: Record<string, unknown>) => void,
) {
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('savedId')
    if (!id) return
    let live = true
    getSharedCalculatorAction(id)
      .then((data) => {
        if (live && data?.input_state) {
          apply(data.input_state as Record<string, unknown>)
        }
      })
      .catch(() => {
        // Not signed in, or the scenario is private to another account:
        // the calculator simply opens with its defaults.
      })
    return () => {
      live = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
