'use client'
import { formatDate, getUserInitials } from '@/composables/utils'
import { CreditHistory } from '@/payload-types'
import { useUserCreditsQuery } from '@/services/user-credits'
import { CreditCard, Crown, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@/hooks/use-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
export default function ProfilePage() {
  const { user: SBUser, isLoading: isSBLoading } = useUser()
  const { data: userData, isLoading, isError } = useUserCreditsQuery(SBUser?.id)

  const totalCredits =
    userData?.history.reduce((prev, curr) => prev + +curr.creditAmount, 0) || 0
  console.log('totalCredits', totalCredits)

  const getCreditTypeLabel = (type: CreditHistory['source']) => {
    return type === 'monthly_free' ? 'Monthly Credits' : 'Purchased Credits'
  }

  return (
    <main className='mx-auto mb-16 w-full max-w-6xl px-8 pt-24 max-lg:px-6 max-sm:px-4'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='mb-2 text-4xl font-bold'>Profile</h1>
        <p className='text-muted-foreground'>
          View credit history, download invoices.
        </p>
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
            <label className='mb-2 block'>Name</label>
            <div className='bg-muted/50 text-foreground rounded-md border px-3 py-2'>
              {SBUser?.user_metadata.full_name}
            </div>
          </div>

          <div className='flex-1'>
            <label className='mb-2 block'>Email</label>
            <div className='bg-muted/50 text-foreground rounded-md border px-3 py-2'>
              {SBUser?.email}
            </div>
          </div>
        </div>

        <div className='mb-3 flex items-center justify-between gap-4'>
          <h2 className='text-xl font-medium'>
            <span className='opacity-80'>Your Current Plan:</span>{' '}
            <span className='font-bold'>
              {userData?.currentPlan === 'free' ? 'Free Plan' : 'Pro Plan'}
            </span>
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
            <h3 className='text-lg font-semibold'>
              {userData?.currentPlan === 'free' ? 'Free Plan' : 'Pro Plan'}
            </h3>
            <span className='text-muted-foreground text-sm'>
              {mockUser?.creditsRemaining || 0} credits remaining
            </span>
          </div>
          <p className='text-muted-foreground text-sm'>
            For exploring the platform.
          </p>

          {/* Credits Progress Bar */}
          <div className='mt-4'>
            <div className='mb-2 flex items-center justify-between text-sm'>
              <span className='font-medium'>Credits Used</span>
              <span className='text-muted-foreground'>
                {mockUser?.creditsRemaining || 0} /{' '}
                {mockUser?.totalCredits || 0}
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
          <Table className='w-full overflow-y-auto text-nowrap'>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <TableHead className='px-6 py-3 text-left text-sm font-medium'>
                  Type
                </TableHead>
                <TableHead className='px-6 py-3 text-left text-sm font-medium'>
                  Date
                </TableHead>
                <TableHead className='w-1/5 px-6 py-3 text-right text-sm font-medium'>
                  Credits
                </TableHead>
                <TableHead className='px-6 py-3 text-left text-sm font-medium'>
                  Granted
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='divide-y'>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className='p-4'>
                    <div className='space-y-2'>
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-8 w-full' />
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='text-destructive px-6 py-8 text-center'
                  >
                    Failed to load credit history. Please try again.
                  </TableCell>
                </TableRow>
              ) : (
                userData?.history &&
                userData.history.length > 0 &&
                userData.history.map((credit) => (
                  <TableRow
                    key={credit.id}
                    className='hover:bg-muted/30 transition-colors'
                  >
                    <TableCell className='px-6 py-4 text-sm font-medium'>
                      {getCreditTypeLabel(credit.source)}
                    </TableCell>
                    <TableCell className='px-6 py-4 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='text-muted-foreground size-4' />
                        {formatDate(credit.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className='px-6 py-4 text-right text-sm font-semibold text-green-600'>
                      +{credit.creditAmount}
                    </TableCell>
                    <TableCell className='text-muted-foreground px-6 py-4 text-sm'>
                      {getCreditTypeLabel(credit.source)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Invoice History */}
      <div className='bg-card/20 mb-6 rounded-xl border p-8 shadow-sm'>
        <h2 className='mb-6 text-xl font-semibold'>Invoice History</h2>

        <div className='overflow-hidden rounded-lg border'>
          <Table className='w-full'>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <TableHead className='px-6 py-3 text-left text-sm font-medium'>
                  Date
                </TableHead>
                <TableHead className='px-6 py-3 text-left text-sm font-medium'>
                  Description
                </TableHead>
                <TableHead className='px-6 py-3 text-left text-sm font-medium'>
                  Status
                </TableHead>
                <TableHead className='px-6 py-3 text-right text-sm font-medium'>
                  Amount
                </TableHead>
                <TableHead className='px-6 py-3 text-right text-sm font-medium'>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='divide-y'>
              {mockInvoices?.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className='hover:bg-muted/30 transition-colors'
                >
                  <TableCell className='px-6 py-4 text-sm'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='text-muted-foreground size-4' />
                      {formatDate(invoice.date)}
                    </div>
                  </TableCell>
                  <TableCell className='px-6 py-4 text-sm'>
                    {invoice.description}
                  </TableCell>
                  <TableCell className='px-6 py-4 text-sm'>
                    <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400'>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className='px-6 py-4 text-right text-sm font-semibold'>
                    ${invoice.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className='px-6 py-4 text-right'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='text-blue-600 hover:text-blue-700'
                    >
                      <CreditCard className='mr-2 size-4' />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
