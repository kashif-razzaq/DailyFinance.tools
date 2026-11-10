'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AuthForm } from './AuthForm'
import { LOGIN_MODAL_EVENT, takePendingLoginSuccess } from '@/lib/auth-modal'

/**
 * LoginModalHost — the one shared login popup for the whole site, mounted in
 * the site chrome. Anything can open it via openLoginModal() from
 * '@/lib/auth-modal' (the save-to-Vault flow is the main user: a logged-out
 * visitor who taps Save gets this popup instead of being bounced to a login
 * page, and the interrupted save retries automatically after sign-in).
 */
export function LoginModalHost() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onOpen = () => setIsOpen(true)
    window.addEventListener(LOGIN_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(LOGIN_MODAL_EVENT, onOpen)
  }, [])

  const handleSuccess = useCallback(() => {
    setIsOpen(false)
    const retry = takePendingLoginSuccess()
    if (retry) {
      // Give the freshly-written session cookies a beat to settle before the
      // retried server action reads them.
      window.setTimeout(retry, 350)
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md overflow-hidden bg-background border shadow-sm p-6">
        {isOpen && <AuthForm stayOnPage onSuccess={handleSuccess} />}
      </DialogContent>
    </Dialog>
  )
}
