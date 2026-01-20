'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/theme-toggle'
import LoginButton from '@/components/auth/LoginButton'
import Profile from '@/components/auth/Profile'

const { components, inspiration, home, pricing } = {
  home: '/',
  inspiration: '/inspiration',
  components: '/docs',
  pricing: '/pricing',
}

const Header = () => {
  const pathname = usePathname()
  // const { user, isLoading } = useUser()

  return (
    <div className='border-border border-b'>
      <header className='mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-2 font-sans'>
        <Link href='/' className='w-20 max-sm:min-w-8'>
          <span className=''>Logo</span>
        </Link>

        <nav className='flex flex-1 justify-center'>
          <ul className='-tracking-one flex items-center text-sm font-medium max-sm:text-sm'>
            <li>
              <Link
                href={home}
                className={cn(
                  'px-4 py-2 transition max-sm:px-2',
                  pathname === home && 'text-chart-2 font-medium opacity-100'
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={inspiration}
                className={cn(
                  'px-4 py-2 transition max-sm:px-2',
                  pathname === inspiration &&
                    'text-chart-2 font-medium opacity-100'
                )}
              >
                Inspiration
              </Link>
            </li>
            <li>
              <Link
                href={components}
                className={cn(
                  'px-4 py-2.5 transition max-sm:px-2',
                  pathname === components &&
                    'text-chart-2 font-medium opacity-100'
                )}
              >
                Node UI
              </Link>
            </li>
            <li>
              <Link
                href={pricing}
                className={cn(
                  'px-4 py-2.5 transition max-sm:px-2',
                  pathname === pricing && 'text-chart-2 font-medium opacity-100'
                )}
              >
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        <div className='flex items-center justify-end gap-2 max-sm:gap-1 min-w-20'>
          {/* {!isLoading && (user ? <Profile /> : <LoginButton />)} */}
          <ThemeToggle />
        </div>
      </header>
    </div>
  )
}
export default Header
