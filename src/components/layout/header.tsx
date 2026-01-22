'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/theme-toggle'

const { components, inspiration, home, pricing } = {
  home: '/',
  inspiration: '/inspiration',
  components: '/docs',
  pricing: '/pricing',
}

const Header = () => {
  const pathname = usePathname()

  return (
    <div className='border-border border-b'>
      <header className='mx-auto flex w-full  items-center justify-between px-8 py-2 font-sans'>
        <Link href='/' className='w-20 max-sm:min-w-8'>
          <span className=''>Logo</span>
        </Link>

        <nav className='flex flex-1 justify-start text-muted-foreground'>
          <ul className='tracking-one flex items-center text-sm font-medium max-sm:text-sm'>
            <li>
              <Link
                href={home}
                className={cn(
                  'px-3 py-2 transition ease-out max-sm:px-2 hover:bg-primary/5 hover:text-foreground rounded-md',
                  pathname === home && 'text-foreground font-medium opacity-100'
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={inspiration}
                className={cn(
                  'px-3 py-2 transition ease-out max-sm:px-2 hover:bg-primary/5 hover:text-foreground rounded-md',
                  pathname === inspiration &&
                  'text-foreground font-medium opacity-100'
                )}
              >
                Inspiration
              </Link>
            </li>
            <li>
              <Link
                href={components}
                className={cn(
                  'px-3 py-2 transition ease-out max-sm:px-2 hover:bg-primary/5 hover:text-foreground rounded-md',
                  pathname === components &&
                  'text-foreground font-medium opacity-100'
                )}
              >
                Node UI
              </Link>
            </li>
            <li>
              <Link
                href={pricing}
                className={cn(
                  'px-3 py-2 transition ease-out max-sm:px-2 hover:bg-primary/5 hover:text-foreground rounded-md',
                  pathname === pricing && 'text-foreground font-medium opacity-100'
                )}
              >
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        <div className='flex min-w-20 items-center justify-end gap-2 max-sm:gap-1'>
          <ThemeToggle />
        </div>
      </header>
    </div>
  )
}
export default Header
