import type { Metadata } from 'next'
import { ForgotPasswordForm } from './ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Reset your password — DailyFinance',
  description: 'Request a password reset link for your DailyFinance account.',
  robots: { index: false, follow: true },
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-sm space-y-8">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
