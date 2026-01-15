'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import LogoutButton from './LogoutButton'

export default function Profile() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className='flex h-8 w-8 items-center justify-center'>
        <div className='border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent' />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0]?.toUpperCase() || 'U'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='ghost' size='icon-sm' className='relative'>
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name || 'User'}
                className='h-6 w-6 rounded-full object-cover'
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
            ) : null}
            <div
              className={`bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ${user.picture ? 'hidden' : ''}`}
            >
              {initials}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent align='end' className='w-56 p-2'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3 border-b pb-2'>
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name || 'User'}
                  className='h-10 w-10 rounded-full object-cover'
                />
              ) : (
                <div className='bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium'>
                  {initials}
                </div>
              )}
              <div className='flex-1 overflow-hidden'>
                <p className='truncate text-sm font-medium'>{user.name}</p>
                <p className='text-muted-foreground truncate text-xs'>
                  {user.email}
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
