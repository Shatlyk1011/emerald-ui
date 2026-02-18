'use client'
import { getUserInitials } from '@/composables/utils'
import { cn } from '@/lib/utils'
import { useUser } from '@/hooks/use-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfilePage() {
  const { user: SBUser, isLoading: isSBLoading } = useUser()

  return (
    <main className='mx-auto mb-16 w-full max-w-6xl px-8 pt-24 max-lg:px-6 max-sm:px-4'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='mb-2 text-4xl font-bold'>Profile</h1>
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
            <label className='text-muted-foreground mb-2 block'>Name</label>
            <div
              className={cn(
                'bg-muted/50 text-foreground min-h-9 rounded-md border px-3 py-2',
                isSBLoading && 'text-muted-foreground'
              )}
            >
              {isSBLoading
                ? 'Loading...'
                : SBUser?.user_metadata.full_name ||
                  (!isSBLoading && 'No provided')}
            </div>
          </div>

          <div className='flex-1'>
            <label className='text-muted-foreground mb-2 block'>Email</label>
            <div
              className={cn(
                'bg-muted/50 text-foreground min-h-9 rounded-md border px-3 py-2',
                isSBLoading && 'text-muted-foreground'
              )}
            >
              {isSBLoading
                ? 'Loading...'
                : SBUser?.email || (!isSBLoading && 'No email')}
            </div>
          </div>
        </div>

        <span className='text-secondary-foreground -tracking-two inline-block py-5 font-mono text-sm'>
          more coming soon...
        </span>
      </div>
    </main>
  )
}
