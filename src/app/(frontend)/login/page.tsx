import type { Metadata } from 'next'
import LoginPage from '@/components/auth/LoginPage'

export const metadata: Metadata = {
  title: 'Sign In - UI',
  description: 'Sign in to your UI account',
}

export default function Login() {
  return <LoginPage />
}
