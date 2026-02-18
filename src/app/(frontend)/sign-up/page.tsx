import type { Metadata } from 'next'
import { Suspense } from 'react'
import SignUpPage from '@/components/auth/SignUpPage'

export const metadata: Metadata = {
  title: 'Sign Up - UI',
  description: 'Create your UI account',
}

export default function SignUp() {
  return (
    <Suspense>
      <SignUpPage />
    </Suspense>
  )
}
