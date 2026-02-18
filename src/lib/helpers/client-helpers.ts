import { Client } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

// Create a new client record (called when user signs up via Supabase)
export async function createClientRecord(
  userId: string,
  email?: string,
  provider?: Client['provider'],
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

// Get client record by userId
export async function getClientByUserId(userId: string) {
  const payload = await getPayload({ config })
  const clients = await payload.find({
    collection: 'clients',
    where: {
      userId: {
        equals: userId,
      },
    },
    depth: 1,
  })
  return clients.docs[0] || null
}
