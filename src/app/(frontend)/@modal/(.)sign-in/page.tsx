import { Suspense } from 'react'
import { headers } from 'next/headers'
import AuthModal from '@/components/auth/AuthModal'

// Isolated into its own async component so that the dynamic `headers()` call
// lives inside a Suspense boundary. This is required when `cacheComponents: true`
// is set in next.config — the outer page shell is cached statically, while this
// inner component streams in per-request without blocking the rest of the page.
async function ModalContent() {
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

export default function SignInInterceptedPage() {
  return (
    <Suspense>
      <ModalContent />
    </Suspense>
  )
}
