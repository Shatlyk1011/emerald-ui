import { CreditHistory } from '@/payload-types';
import config from '@payload-config';
import { getPayload } from 'payload';






/** 
 * Cron job to add monthly free credits to all users
 * Runs every hour for demo purposes
 */
export async function addMonthlyCredits() {
  const payload = await getPayload({ config })

  try {
    console.log('Cron: Starting monthly credits cron job...')

    // Get all unique user IDs from existing credit history
    const existingCredits = await payload.find({
      collection: 'credit-history',
      limit: 10000,
    })

    const uniqueUserIds = [
      ...new Set(existingCredits.docs.map((doc: CreditHistory) => doc.userId)),
    ]

    console.log('Cron: uniqueUserIds', uniqueUserIds)

    console.log(`Cron: Found ${uniqueUserIds.length} unique users`)

    // Add 5 free credits for each user
    for (const userId of uniqueUserIds) {
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

      console.log(`Cron: ✓ Added 5 monthly credits for user: ${userId}`)
    }

    console.log(
      `Cron: ✓ Monthly credits added for ${uniqueUserIds.length} users`
    )
    return { success: true, usersProcessed: uniqueUserIds.length }
  } catch (error) {
    console.error('Cron: Error adding monthly credits:', error)
    throw error
  }
}
