import { formatDate } from '@/composables/utils'
import { CreditHistoryResponse } from '@/types/auth'
import { CreditCard, Crown, Calendar } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

const mockUser = {
  firstName: 'Shatlyk',
  lastName: '',
  email: 'gj_wp@mail.ru',
  billingEmail: 'gj_wp@mail.ru',
  avatarUrl: '',
  plan: 'Free Plan',
  creditsRemaining: 3,
  totalCredits: 5,
}

// Mock invoice history (keeping this as it's not part of credit history)
const mockInvoices = [
  {
    id: 1,
    date: '2026-01-15',
    amount: 0,
    status: 'Paid',
    description: 'Free Plan - January 2026',
  },
  {
    id: 2,
    date: '2025-12-15',
    amount: 0,
    status: 'Paid',
    description: 'Free Plan - December 2025',
  },
  {
    id: 3,
    date: '2025-11-15',
    amount: 0,
    status: 'Paid',
    description: 'Free Plan - November 2025',
  },
]

export default async function ProfilePage() {
  let userData: CreditHistoryResponse | null = null

  try {
    // Get cookies to forward to API route
    const headersList = await headers()
    const cookie = headersList.get('cookie') || ''

    const response = await fetch('http://localhost:3000/api/credit-history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie,
      },
      cache: 'no-store',
    })

    if (response.ok) {
      userData = await response.json()
    } else {
      console.error(
        'Failed to fetch credit history:',
        response.status,
        response.statusText
      )
    }
  } catch (err) {
    console.error('Failed to fetch credit history:', err)
  }

  console.log('userData', userData)

  const getUserInitials = () => {
    // if (data?.user_metadata?.full_name) {
    //   const names = data.user_metadata.full_name.split(' ')
    //   return names.length > 1
    //     ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    //     : names[0][0].toUpperCase()
    // }
    // if (user?.email) {
    //   return user.email[0].toUpperCase()
    // }
    return 'U'
  }

  const getDisplayName = () => {
    // return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
    return 'User'
  }

  const getCreditTypeLabel = (type: 'monthly_free' | 'purchased') => {
    return type === 'monthly_free' ? 'Monthly Credits' : 'Purchased Credits'
  }

  return (
    <main className='mx-auto mb-16 w-full max-w-6xl px-8 pt-24 max-lg:px-6 max-sm:px-4'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='mb-2 text-4xl font-bold'>Profile</h1>
        <p className='text-muted-foreground'>
          Manage your profile, preferences, view credit history, download
          invoices, and manage API keys.
        </p>
      </div>

      {/* Profile Settings Card */}
      <div className='bg-card/20 mb-6 rounded-xl border p-8'>
        <div className='mb-6 flex items-center gap-4'>
          <Avatar className='size-16'>
            <AvatarImage src={''} alt={getDisplayName()} />
            <AvatarFallback className='text-xl'>
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <h2 className='text-2xl font-semibold'>Profile Settings</h2>
        </div>

        <div className='mb-10 flex gap-4 text-sm font-medium'>
          <div className='flex-1'>
            <label className='mb-2 block'>Name</label>
            <div className='bg-muted/50 text-foreground rounded-md border px-3 py-2'>
              {getDisplayName()}
            </div>
          </div>

          <div className='flex-1'>
            <label className='mb-2 block'>Email</label>
            <div className='bg-muted/50 text-foreground rounded-md border px-3 py-2'>
              {'test@mail.ru'}
            </div>
          </div>
        </div>

        <div className='mb-3 flex items-center justify-between gap-4'>
          <h2 className='text-xl font-medium'>
            <span className='opacity-80'>Your Current Plan:</span>{' '}
            <span className='font-bold'>Free(mock)</span>
          </h2>
          <Button
            className='text-foreground bg-blue-600 hover:bg-blue-700'
            asChild
          >
            <Link href='/pricing'>
              <Crown className='size-4' />
              Upgrade
            </Link>
          </Button>
        </div>

        <div className='bg-muted/30 rounded-lg p-6'>
          <div className='mb-2 flex items-center justify-between'>
            {/* add user's current plan */}
            <h3 className='text-lg font-semibold'>Free Plan</h3>
            <span className='text-muted-foreground text-sm'>
              `${mockUser?.creditsRemaining || 0} credits remaining`
            </span>
          </div>
          <p className='text-muted-foreground text-sm'>
            For exploring and trialing our platform.
          </p>

          {/* Credits Progress Bar */}
          <div className='mt-4'>
            <div className='mb-2 flex items-center justify-between text-sm'>
              <span className='font-medium'>Credits Used</span>
              <span className='text-muted-foreground'>
                {/* ??? */}
                `${mockUser?.creditsRemaining || 0} / $
                {mockUser?.totalCredits || 0}`
              </span>
            </div>
            <div className='bg-muted h-2 w-full overflow-hidden rounded-full'>
              <div
                className='h-full bg-blue-600 transition-all'
                style={{
                  width: mockUser?.totalCredits
                    ? `${((mockUser.creditsRemaining || 0) / mockUser.totalCredits) * 100}%`
                    : '0%',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='bg-card/20 mb-6 rounded-xl border p-8 shadow-sm'>
        <h2 className='mb-6 text-xl font-semibold'>Credit History</h2>

        <div className='overflow-hidden rounded-lg border'>
          <table className='w-full text-nowrap'>
            <thead className='bg-muted/50'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Type
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Granted on
                </th>
                <th className='px-6 py-3 text-right text-sm font-medium'>
                  Credits
                </th>
              </tr>
            </thead>
            <tbody className='divide-y'>
              {userData?.history && userData.history.length > 0 ? (
                userData.history.map((credit) => (
                  <tr
                    key={credit.id}
                    className='hover:bg-muted/30 transition-colors'
                  >
                    <td className='px-6 py-4 text-sm font-medium'>
                      {getCreditTypeLabel(credit.type)}
                    </td>
                    <td className='px-6 py-4 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='text-muted-foreground size-4' />
                        {formatDate(credit.createdDate)}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-right text-sm font-semibold text-green-600'>
                      +{credit.creditAmount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className='text-muted-foreground px-6 py-8 text-center'
                  >
                    No credit history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice History */}
      <div className='bg-card/20 mb-6 rounded-xl border p-8 shadow-sm'>
        <h2 className='mb-6 text-xl font-semibold'>Invoice History</h2>

        <div className='overflow-hidden rounded-lg border'>
          <table className='w-full'>
            <thead className='bg-muted/50'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Date
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Description
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium'>
                  Status
                </th>
                <th className='px-6 py-3 text-right text-sm font-medium'>
                  Amount
                </th>
                <th className='px-6 py-3 text-right text-sm font-medium'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='divide-y'>
              {mockInvoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className='hover:bg-muted/30 transition-colors'
                >
                  <td className='px-6 py-4 text-sm'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='text-muted-foreground size-4' />
                      {formatDate(invoice.date)}
                    </div>
                  </td>
                  <td className='px-6 py-4 text-sm'>{invoice.description}</td>
                  <td className='px-6 py-4 text-sm'>
                    <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400'>
                      {invoice.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-right text-sm font-semibold'>
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-blue-600 hover:text-blue-700'
                    >
                      <CreditCard className='mr-2 size-4' />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!mockInvoices.length && (
            <div className='py-2 text-center'>
              <Button
                variant='link'
                size='sm'
                asChild
                className='text-blue-500 hover:text-blue-600'
              >
                <Link href='/pricing'>
                  Upgrade your plan to receive invoices.
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}