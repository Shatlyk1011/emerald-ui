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
    console.log('Cron: Starting monthly credits cron job...')

    // Get all active (non-blocked) clients
    const clients = await payload.find({
      collection: 'clients',
      where: {
        isBlocked: { equals: false },
      },
      limit: 10000,
    })

    console.log(`Cron: Found ${clients.docs.length} active clients`)

    // Add 5 free credits for each active user
    for (const client of clients.docs as Client[]) {
      const createdDate = new Date()
      const expiredDate = new Date(createdDate)
      expiredDate.setMonth(expiredDate.getMonth() + 1)

      await payload.create({
        collection: 'credit-history',
        data: {
          userId: client.userId,
          creditAmount: 5,
          type: 'monthly_free',
          createdDate: createdDate.toISOString(),
          expiredDate: expiredDate.toISOString(),
        },
      })

      console.log(`Cron: ✓ Added 5 monthly credits for user: ${client.userId}`)
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
