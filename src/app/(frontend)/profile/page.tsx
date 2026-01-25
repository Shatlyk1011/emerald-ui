import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { getUser } from '@/lib/auth-helpers'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { handleSignOut } from './actions'
import { Calendar, Mail, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Profile',
  description: siteConfig.description,
}

export default async function ProfilePage() {
  const user = await getUser()
  console.log('user', user)

  // This should be handled by middleware, but as a fallback
  if (!user) {
    redirect('/login')
  }

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (user.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(' ')
      return names.length > 1
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : names[0][0].toUpperCase()
    }
    if (user.email) {
      return user.email[0].toUpperCase()
    }
    return 'U'
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get provider name
  const getProviderName = () => {
    const provider = user.app_metadata?.provider
    if (provider === 'google') return 'Google'
    if (provider === 'github') return 'GitHub'
    if (provider === 'email') return 'Email (Magic Link)'
    return provider || 'Email'
  }

  return (
    <main className='items-top mx-auto mb-16 flex h-full min-h-screen w-full max-w-5xl justify-center overflow-x-hidden px-12 pt-30 max-lg:px-8 max-sm:px-4 max-sm:pt-2'>
      <div className='w-full max-w-2xl space-y-8'>
        {/* Profile Header */}
        <div className='rounded-lg border bg-card p-8 shadow-sm'>
          <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-start'>
            <Avatar className='size-24'>
              <AvatarImage
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.full_name || user.email || 'User'}
              />
              <AvatarFallback className='text-2xl'>
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 space-y-2 text-center sm:text-left'>
              <h1 className='text-3xl font-bold'>
                {user.user_metadata?.full_name || 'User Profile'}
              </h1>
              <p className='text-muted-foreground'>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className='rounded-lg border bg-card p-8 shadow-sm'>
          <h2 className='mb-6 text-xl font-semibold'>Account Information</h2>

          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <Mail className='mt-0.5 size-5 text-muted-foreground' />
              <div>
                <p className='text-sm font-medium'>Email Address</p>
                <p className='text-sm text-muted-foreground'>{user.email}</p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Shield className='mt-0.5 size-5 text-muted-foreground' />
              <div>
                <p className='text-sm font-medium'>Sign-in Method</p>
                <p className='text-sm text-muted-foreground'>
                  {getProviderName()}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Calendar className='mt-0.5 size-5 text-muted-foreground' />
              <div>
                <p className='text-sm font-medium'>Account Created</p>
                <p className='text-sm text-muted-foreground'>
                  {formatDate(user.created_at)}
                </p>
              </div>
            </div>

            {user.user_metadata?.full_name && (
              <div className='flex items-start gap-3'>
                <div className='mt-0.5 size-5' />
                <div>
                  <p className='text-sm font-medium'>Full Name</p>
                  <p className='text-sm text-muted-foreground'>
                    {user.user_metadata.full_name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className='rounded-lg border bg-card p-8 shadow-sm'>
          <h2 className='mb-6 text-xl font-semibold'>Account Actions</h2>

          <form action={handleSignOut}>
            <Button
              type='submit'
              variant='destructive'
              className='w-full sm:w-auto'
            >
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
