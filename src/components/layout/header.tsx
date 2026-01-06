'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/ui/theme-toggle'

const { components, inspiration } = {
  inspiration: '/inspiration',
  components: '/docs',
}

const Header = () => {
  const pathname = usePathname()

  return (
    <header className='flex items-center justify-between border-b px-8 py-2 font-sans'>
      <Link href='/' className='w-20 max-sm:min-w-8'>
        <span className=''>Logo</span>
      </Link>

      <nav className='flex flex-1 justify-center'>
        <ul className='-tracking-one flex items-center text-sm font-medium max-sm:text-sm'>
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
              Components
            </Link>
          </li>
        </ul>
      </nav>

      <div className='flex w-20 justify-end max-sm:w-14'>
        <ThemeToggle />
      </div>
    </header>
  )
}
export default Header
