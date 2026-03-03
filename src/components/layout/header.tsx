'use client'

import { FC, Suspense, useRef, useState } from 'react'
import { getUserInitials } from '@/composables/utils'
import { LogOut, ChevronDown, Menu } from 'lucide-react'
import { useScroll, useMotionValueEvent } from 'motion/react'
import dynamic from 'next/dynamic'
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
import Logo from '../ui/logo'
import TextShimmer from '../ui/text-shimmer'

const SubmitWebsiteDialog = dynamic(
  () => import('../landing/SubmitWebsiteDialog'),
  {
    ssr: false,
  }
)

const { home, motionComponents, gsapComponents } = {
  home: '/',
  motionComponents: '/docs',
  gsapComponents: '/docs/gsap',
}

interface Props {
  isFumadocs?: boolean
}

const Header: FC<Props> = ({ isFumadocs }) => {
  const router = useRouter()
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement>(null)
  const { user, isLoading, signOut } = useUser()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [menu, setMenu] = useState(false)


  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 0)
  })

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 z-20 mx-auto flex h-14 w-full items-center justify-between border-b px-8 py-2 font-sans max-sm:px-4',
          isScrolled && !isFumadocs && 'bg-background/90 backdrop-blur-sm',
          isFumadocs && 'static w-full flex-1 justify-start border-none px-0 max-lg:hidden'
        )}
      >
        <Link
          href='/'
          className={cn(
            'w-max max-sm:mr-4 max-sm:max-w-max max-sm:min-w-8 z-50',
            isFumadocs && 'hidden'
          )}
        >
          <Logo />
        </Link>
        <nav className={cn('text-muted-foreground ml-6 flex flex-1 justify-start max-md:ml-0 z-49 max-md:absolute max-md:h-svh max-md:w-screen max-md:inset-0 transition-all max-md:translate-x-full', menu ? 'max-md:translate-x-0' : 'max-md:translate-x-full')}>
          <ul className='-tracking-one flex items-center max-md:flex-col max-md:gap-3 max-md:bg-secondary max-md:w-full max-md:text-base max-md:pt-40 text-sm font-medium'>
            <li>
              <Link
                href={home}
                className={cn(
                  'hover:text-foreground rounded-md px-3 min-h-10 py-2 text-nowrap transition ease-out max-sm:px-2'
                )}
              >
                Website Inspiration
              </Link>
            </li>
            <li className='max-md:hidden'>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    'hover:text-foreground flex items-center gap-1 rounded-md px-3 py-2 text-nowrap transition ease-out focus:outline-none'
                  )}
                >
                  <TextShimmer
                    duration={7}
                    spread={15}
                    className='hover:text-foreground transition'
                  >
                    Components
                  </TextShimmer>
                  <ChevronDown className='ml-1 size-3 text-current transition-transform duration-300 group-data-[state=open]:rotate-180' />
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                  <DropdownMenuItem asChild>
                    <Link href={motionComponents} className='cursor-pointer'>
                      Motion Components
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={gsapComponents} className='cursor-pointer'>
                      GSAP Components
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link
                href={motionComponents}
                className={cn(
                  'hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2 hidden max-md:inline'
                )}
              >
                Motion Components
              </Link>
            </li>
            <li>
              <Link
                href={gsapComponents}
                className={cn(
                  'hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2 hidden max-md:inline'
                )}
              >
                Gsap Components
              </Link>
            </li>
            <span className='mx-1 opacity-50 max-md:hidden'>|</span>
            <li>
              <button
                onClick={() => setDialogOpen(true)}
                className='hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2'
              >
                <span>Submit a website</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className='flex min-w-20 items-center justify-end gap-3 max-sm:gap-1'>
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
                            user.user_metadata?.full_name ||
                            user.email ||
                            'User'
                          }
                        />
                        <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='z-500 w-56'>
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
                  onClick={() =>
                    router.push(`/sign-in?next=${encodeURIComponent(pathname)}`)
                  }
                      className=''
                >
                  Sign In
                </Button>
              )}
            </>
          )}
          <Button size="icon-sm" className='hidden max-md:flex z-50' variant={'ghost'} onClick={() => setMenu(!menu)}>
            <Menu className='size-4' />
          </Button>
        </div>
      </header>

      <Suspense fallback={'loading...'}>
        {isDialogOpen && <SubmitWebsiteDialog open={isDialogOpen} onOpenChange={setDialogOpen} />}
      </Suspense>
    </>
  )
}
export default Header
