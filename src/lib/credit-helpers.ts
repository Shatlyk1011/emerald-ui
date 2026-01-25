import { getPayload } from 'payload'
import config from '@payload-config'
import { CreditHistory } from '@/payload-types'

/**
 * Get total available (non-expired, non-blocked) credits for a user
 */
export async function getUserAvailableCredits(userId: string): Promise<number> {
  const payload = await getPayload({ config })

  const credits = await payload.find({
    collection: 'credit-history',
    where: {
      and: [
        { userId: { equals: userId } },
        { isExpired: { equals: false } },
        { isBlocked: { equals: false } },
      ],
    },
    limit: 1000,
  })

  return credits.docs.reduce((sum, doc: CreditHistory) => sum + (doc.creditAmount || 0), 0)
}

/**
 * Create initial credits for a new user (called when user signs up via Supabase)
 */
export async function createInitialCredits(userId: string): Promise<void> {
  const payload = await getPayload({ config })

  const createdDate = new Date()
  const expiredDate = new Date(createdDate)
  expiredDate.setMonth(expiredDate.getMonth() + 1)

  await payload.create({
    collection: 'credit-history',
    data: {
      userId,
      creditAmount: 5,
      type: 'monthly_free',
      createdDate: createdDate.toISOString(),
      expiredDate: expiredDate.toISOString(),
      isExpired: false,
      isBlocked: false,
    },
  })

  console.log(`✓ Created initial 5 credits for new user: ${userId}`)
}

/**
 * Get credit history for a specific user
 */
export async function getUserCreditHistory(userId: string) {
  const payload = await getPayload({ config })

  const credits = await payload.find({
    collection: 'credit-history',
    where: {
      userId: { equals: userId },
    },
    sort: '-createdDate',
    limit: 100,
  })

  return credits.docs
}

/**
 * Check if user has enough credits
 */
export async function hasEnoughCredits(
  userId: string,
  requiredAmount: number
): Promise<boolean> {
  const available = await getUserAvailableCredits(userId)
  return available >= requiredAmount
}
