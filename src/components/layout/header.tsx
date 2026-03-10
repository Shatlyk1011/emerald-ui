'use client'

import { FC, Suspense, useRef, useState } from 'react'
import { getUserInitials } from '@/composables/utils'
import { LogOut, ChevronDown, Menu, Megaphone, Flag } from 'lucide-react'
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

const SubmitIssueDialog = dynamic(
  () => import('../landing/SubmitIssueDialog'),
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

  const { user, isLoading, signOut } = useUser()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isIssueDialogOpen, setIssueDialogOpen] = useState(false)
  const [menu, setMenu] = useState(false)

  const closeMenu = () => setMenu(false)
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
        className={cn(
          'fixed top-0 z-20 mx-auto flex h-14 w-full items-center justify-between border-b px-8 py-2 font-sans max-md:px-4',
          isScrolled && !isFumadocs && 'bg-background/90 backdrop-blur-sm',
          isFumadocs &&
            'static w-full flex-1 justify-start border-none px-0 max-lg:hidden'
        )}
      >
        <Link
          href='/'
          className={cn(
            'z-50 w-max max-sm:mr-4 max-sm:max-w-max max-sm:min-w-8',
            isFumadocs && 'hidden'
          )}
        >
          <Logo />
        </Link>
        <nav
          className={cn(
            'text-muted-foreground z-49 ml-6 flex flex-1 justify-start transition-all max-md:absolute max-md:inset-0 max-md:ml-0 max-md:h-svh max-md:w-screen max-md:translate-x-full',
            menu ? 'max-md:translate-x-0' : 'max-md:translate-x-full'
          )}
        >
          <ul className='-tracking-one max-md:bg-secondary flex items-center text-sm font-medium max-md:w-full max-md:flex-col max-md:gap-3 max-md:pt-40 max-md:text-base'>
            <li>
              <Link
                href={`${home}#website-inspirations`}
                onClick={closeMenu}
                className={cn(
                  'hover:text-foreground min-h-10 rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2'
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
                  'hover:text-foreground hidden rounded-md px-3 py-2 text-nowrap transition ease-out max-md:inline max-sm:px-2'
                )}
              >
                Motion Components
              </Link>
            </li>
            <li>
              <Link
                href={gsapComponents}
                className={cn(
                  'hover:text-foreground hidden rounded-md px-3 py-2 text-nowrap transition ease-out max-md:inline max-sm:px-2'
                )}
              >
                Gsap Components
              </Link>
            </li>
            <span className='mx-1 opacity-50 max-md:hidden'>|</span>
            <li>
              <button
                onClick={() => {
                  setDialogOpen(true)
                  closeMenu()
                }}
                className='hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2'
              >
                <span>Submit a website</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className='flex min-w-20 items-center justify-end gap-2.5 max-sm:gap-1'>
          <Button
            variant={'ghost'}
            onClick={() => setIssueDialogOpen(true)}
            className='hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2'
          >
            <Flag className='text-foreground size-5' />
          </Button>
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
          <Button
            size='icon-sm'
            className='z-50 hidden max-md:flex'
            variant={'ghost'}
            onClick={() => setMenu(!menu)}
          >
            <Menu className='size-4' />
          </Button>
        </div>
      </header>

      <Suspense fallback={'loading...'}>
        {isDialogOpen && (
          <SubmitWebsiteDialog
            open={isDialogOpen}
            onOpenChange={setDialogOpen}
          />
        )}
        {isIssueDialogOpen && (
          <SubmitIssueDialog
            open={isIssueDialogOpen}
            onOpenChange={setIssueDialogOpen}
          />
        )}
      </Suspense>
    </>
  )
}
export default Header
