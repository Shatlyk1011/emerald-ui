import { Client } from '@/payload-types';
import config from '@payload-config';
import { getPayload } from 'payload';











/**
 * Cron job to add monthly free credits to all users
 * Runs every hour for demo purposes
 */
export async function addMonthlyCredits() {
  const payload = await getPayload({ config })

  try {
    // Get all active (non-blocked) clients
    const clients = await payload.find({
      collection: 'clients',
      where: {
        isBlocked: { equals: false },
      },
      limit: 100,
    })

    console.log(`Cron: Found ${clients.docs.length} active clients`)

    // Add 5 free credits for each active user
    for (const client of clients.docs as Client[]) {
      await payload.create({
        collection: 'credit-history',
        data: {
          userId: client.userId,
          creditAmount: 5,
          source: 'monthly_free',
        },
      })
    }

    console.log(
      `Cron: ✓ Monthly credits added for ${clients.docs.length} users`
    )
    return { success: true, usersProcessed: clients.docs.length }
  } catch (error) {
    console.error('Cron: Error adding monthly credits:', error)
    throw error
  }
}
