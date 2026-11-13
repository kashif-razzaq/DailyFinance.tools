import type { Metadata } from 'next'
import { ResetPasswordForm } from './ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Choose a new password — DailyFinance',
  description: 'Choose a new password for your DailyFinance account.',
  robots: { index: false, follow: true },
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-sm space-y-8">
        <ResetPasswordForm />
      </div>
    </div>
  )
}
