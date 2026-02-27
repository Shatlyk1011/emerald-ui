import { headers } from 'next/headers'
import AuthModal from '@/components/auth/AuthModal'

export default async function SignInInterceptedPage() {
  const headersList = await headers()
  const referer = headersList.get('referer') || ''

  // Don't show the modal if navigating from sign-in or sign-up pages
  const authPaths = ['/sign-in', '/sign-up', '/login']
  const isFromAuthPage = authPaths.some((path) => referer.includes(path))

  if (isFromAuthPage) {
    return null
  }

  return <AuthModal />
}
