/**
 * auth-modal — a tiny event bridge to the shared login popup.
 *
 * Save handlers live deep inside calculator clients; prop-drilling a modal
 * through every one of them is not workable. Instead, any component can call
 * openLoginModal() and the LoginModalHost (mounted once in the site chrome)
 * shows the popup. Pass an onSuccess callback to continue the interrupted
 * action after a password sign-in — e.g. retrying the save that asked for
 * login in the first place.
 */
let pendingSuccess: (() => void) | null = null

export function openLoginModal(onSuccess?: () => void) {
  pendingSuccess = onSuccess ?? null
  window.dispatchEvent(new CustomEvent('df:open-login'))
}

/** Called by the host once sign-in completes; returns and clears the callback. */
export function takePendingLoginSuccess(): (() => void) | null {
  const cb = pendingSuccess
  pendingSuccess = null
  return cb
}

export const LOGIN_MODAL_EVENT = 'df:open-login'
