import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Profile',
  description: siteConfig.description,
}

export default function ProfilePage() {
  // const { user, isLoading } = useUser()
  // console.log('user', user)

  return (
    <main className='items-top mx-auto mb-16 flex h-full min-h-[200vh] w-full max-w-5xl justify-center overflow-x-hidden px-12 pt-30 max-lg:px-8 max-sm:px-4 max-sm:pt-2'>
      profile page
    </main>
  )
}
