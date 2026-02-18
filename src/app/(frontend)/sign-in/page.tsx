import type { Metadata } from 'next'
import { Suspense } from 'react'
import SignInPage from '@/components/auth/SignInPage'

export const metadata: Metadata = {
  title: 'Sign In - UI',
  description: 'Sign in to your UI account',
}

export default function SignIn() {
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  )
}
