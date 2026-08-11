/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AuthForm } from './AuthForm'

export function AuthModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<button className="contents cursor-pointer" />}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-hidden bg-background border shadow-sm p-6">
        <AuthForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
