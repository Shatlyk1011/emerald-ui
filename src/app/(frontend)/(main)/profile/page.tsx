'use client'
import { getUserInitials } from '@/composables/utils'

import { useUser } from '@/hooks/use-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'


export const dynamic = 'force-dynamic'

export default function ProfilePage() {
  const { user: SBUser, isLoading: isSBLoading } = useUser()

  return (
    <main className='mx-auto mb-16 w-full max-w-6xl px-8 pt-24 max-lg:px-6 max-sm:px-4'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='mb-2 text-4xl font-bold'>Profile</h1>
        {/* <p className='text-muted-foreground'>
          View credit history, download invoices.
        </p> */}
      </div>

      {/* Profile Settings Card */}
      <div className='bg-card/20 mb-6 rounded-xl border p-8'>
        <div className='mb-6 flex items-center gap-4'>
          <Avatar className='size-12'>
            <AvatarImage
              src={SBUser?.user_metadata?.avatar_url}
              alt={SBUser?.user_metadata?.full_name || 'avatar image'}
            />
            <AvatarFallback className='text-xl'>
              {getUserInitials(SBUser)}
            </AvatarFallback>
          </Avatar>
          <h2 className='text-2xl font-semibold'>Profile Settings</h2>
        </div>

        <div className='mb-10 flex gap-4 text-sm font-medium'>
          <div className='flex-1'>
            <label className='mb-2 block text-muted-foreground'>Name</label>
            <div className={cn('bg-muted/50 min-h-9 text-foreground rounded-md border px-3 py-2', isSBLoading && 'text-muted-foreground')}>
              {isSBLoading ? 'Loading...' : SBUser?.user_metadata.full_name || !isSBLoading && 'No provided'}
            </div>
          </div>

          <div className='flex-1'>
            <label className='mb-2 block text-muted-foreground'>Email</label>
            <div className={cn('bg-muted/50 min-h-9 text-foreground rounded-md border px-3 py-2', isSBLoading && 'text-muted-foreground')}>
              {isSBLoading ? 'Loading...' : SBUser?.email || !isSBLoading && 'No email'}
            </div>
          </div>
        </div>

        <span className='text-secondary-foreground font-mono -tracking-two text-sm py-5 inline-block'>
          more coming soon...
        </span>
      </div>
    </main>
  )
}
