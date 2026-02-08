'use client'

import { getUserInitials } from '@/composables/utils'
import { LogOut, User as UserIcon } from 'lucide-react'
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

const { components, inspiration, home, pricing } = {
  home: '/',
  inspiration: '/node-inspiration',
  components: '/docs',
  pricing: '/pricing',
}

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading, signOut } = useUser()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className='border-border border-b'>
      <header className='mx-auto flex w-full items-center justify-between px-8 py-2 font-sans'>
        <Link href='/' className='w-20 max-sm:min-w-8'>
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
                Home
              </Link>
            </li>
            <li>
              <Link
                href={inspiration}
                className={cn(
                  'hover:bg-primary/5 hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2',
                  pathname === inspiration &&
                    'text-foreground font-medium opacity-100'
                )}
              >
                Node Inspirations
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
                Node UI
              </Link>
            </li>
            <li>
              <Link
                href={pricing}
                className={cn(
                  'hover:bg-primary/5 hover:text-foreground rounded-md px-3 py-2 text-nowrap transition ease-out max-sm:px-2',
                  pathname === pricing &&
                    'text-foreground font-medium opacity-100'
                )}
              >
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        <div className='flex min-w-20 items-center justify-end gap-2 max-sm:gap-1'>
          <ThemeToggle />

          {!isLoading && (
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
                      className='cursor-pointer text-red-600 focus:text-red-600'
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
    </div>
  )
}
export default Header
