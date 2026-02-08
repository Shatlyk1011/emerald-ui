import { Client } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'

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
      // Expire old monthly free credits
      await payload.update({
        collection: 'credit-history',
        where: {
          and: [
            { userId: { equals: client.userId } },
            { source: { equals: 'monthly_free' } },
            { status: { equals: 'active' } },
          ],
        },
        data: {
          status: 'expired',
        },
      })

      // Calculate expiration date (1 month from now)
      const expirationDate = new Date()
      expirationDate.setMonth(expirationDate.getMonth() + 1)

      // Add new monthly credits
      await payload.create({
        collection: 'credit-history',
        data: {
          userId: client.userId,
          creditAmount: 5,
          creditsSpent: 0,
          source: 'monthly_free',
          status: 'active',
          expirationDate: expirationDate.toISOString(),
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
