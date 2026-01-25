import config from '@payload-config'
import { getPayload } from 'payload'

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
      and: [{ userId: { equals: userId } }, { isBlocked: { equals: false } }],
    },
    sort: '-createdDate',
    limit: 100,
  })

  return credits.docs
}