'use client'

import { useRef, useState } from 'react'
import { getUserInitials } from '@/composables/utils'
import { LogOut, User as UserIcon } from 'lucide-react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/use-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ThemeToggle from '@/components/ui/theme-toggle'
import TextShimmer from '../ui/text-shimmer'

const { components, home } = {
  home: '/',
  components: '/docs',
}

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const headerRef = useRef<HTMLElement>(null)
  const { user, isLoading, signOut } = useUser()

  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 0)
  })

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 z-50 mx-auto flex h-14 w-full items-center justify-between border px-8 py-2 font-sans max-sm:px-5',
        isScrolled && 'bg-background/90 backdrop-blur-sm'
      )}
    >
      <Link
        href='/'
        className='w-20 max-sm:mr-4 max-sm:max-w-max max-sm:min-w-8'
      >
        <span className=''>Logo</span>
      </Link>

      <nav className='text-muted-foreground flex flex-1 justify-start'>
        <ul className='tracking-one flex items-center text-sm font-medium max-sm:text-sm'>
          <li>
            <Link
              href={home}
              className={cn(
                'hover:bg-primary/5 hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2',
                pathname === home && 'text-foreground font-medium opacity-100'
              )}
            >
              Inspiration
            </Link>
          </li>
          <li>
            <Link
              href={components}
              className={cn(
                'hover:bg-primary/5 hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2',
                pathname === components &&
                  'text-foreground font-medium opacity-100'
              )}
            >
              <TextShimmer duration={7} spread={15}>
                Node UI
              </TextShimmer>
            </Link>
          </li>
        </ul>
      </nav>

      <div className='flex min-w-20 items-center justify-end gap-2 max-sm:gap-1'>
        <ThemeToggle />

        {isLoading ? (
          <div className='border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent' />
        ) : (
          <>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='focus:ring-primary flex items-center gap-2 rounded-full focus:ring-2 focus:ring-offset-2 focus:outline-none'>
                    <Avatar className='size-8 cursor-pointer'>
                      <AvatarImage
                        src={user.user_metadata?.avatar_url}
                        alt={
                          user.user_metadata?.full_name || user.email || 'User'
                        }
                      />
                      <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm leading-none font-medium'>
                        {user.user_metadata?.full_name || 'User'}
                      </p>
                      <p className='text-muted-foreground text-xs leading-none'>
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href='/profile' className='cursor-pointer'>
                      <UserIcon className='mr-2 size-4' />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className='cursor-pointer'
                  >
                    <LogOut className='mr-2 size-4' />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant='outline'
                size='sm'
                onClick={() => router.push('/login')}
                className='ml-2'
              >
                Sign In
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  )
}
export default Header
