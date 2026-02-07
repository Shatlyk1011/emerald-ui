import config from '@payload-config';
import { getPayload } from 'payload';





/**
 * Create a new client record (called when user signs up via Supabase)
 */
export async function createClientRecord(
  userId: string,
  email?: string,
  provider?: 'email' | 'google' | 'github' | null | undefined,
  isVerified?: boolean
): Promise<void> {
  const payload = await getPayload({ config })

  await payload.create({
    collection: 'clients',
    data: {
      userId,
      email: email || undefined,
      provider: provider || undefined,
      isVerified: isVerified || false,
    },
  })

  console.log(`✓ Created client record for user: ${userId}`)
}

/**
 * Get client record by userId
 */
export async function getClientByUserId(userId: string) {
  const payload = await getPayload({ config })

  const clients = await payload.find({
    collection: 'clients',
    where: {
      userId: { equals: userId },
    },
    limit: 1,
  })

  return clients.docs[0] || null
}

/**
 * Create initial credits for a new user (called when user signs up via Supabase)
 */
export async function createInitialCredits(userId: string): Promise<void> {
  const payload = await getPayload({ config })

  await payload.create({
    collection: 'credit-history',
    data: {
      userId,
      creditAmount: 5,
      type: 'monthly_free',
    },
  })

  console.log(`✓ Created initial 5 credits for new user: ${userId}`)
}

/**
 * Get credit history for a specific user
 */
export async function getUserCreditHistory(userId: string) {
  const payload = await getPayload({ config })

  // First check if client exists and is not blocked
  const client = await getClientByUserId(userId)

  if (!client) {
    throw new Error('Client not found')
  }

  if (client.isBlocked) {
    throw new Error('User is blocked')
  }

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
