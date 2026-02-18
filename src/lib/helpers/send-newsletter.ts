import config from '@payload-config';
import { render } from '@react-email/render'
import { getPayload } from 'payload'
import { getPlunkClient } from '../email.config'
import { NewsletterEmail } from '../emails/NewsletterEmail'

interface SendNewsletterResult {
  success: boolean
  recipientCount: number
  error?: string
}

/**
 * Send newsletter to all active subscribers using React Email + Plunk
 * @param newsletterId - ID of the newsletter to send
 * @returns Result object with success status and recipient count
 */
export async function sendNewsletter(
  newsletterId: string
): Promise<SendNewsletterResult> {
  try {
    const payload = await getPayload({ config })

    // Fetch the newsletter
    const newsletter = await payload.findByID({
      collection: 'newsletters',
      id: newsletterId,
    })

    if (!newsletter) {
      return {
        success: false,
        recipientCount: 0,
        error: 'Newsletter not found',
      }
    }

    // Type assertion to access newsletter-specific properties
    const newsletterData = newsletter as unknown as {
      status: string
      subject: string
    }

    // Check if already sent
    if (newsletterData.status === 'sent') {
      return {
        success: false,
        recipientCount: 0,
        error: 'Newsletter has already been sent',
      }
    }

    // Fetch all active subscribers
    const subscribers = await payload.find({
      collection: 'subscribers',
      where: {
        status: {
          equals: 'active',
        },
      },
      limit: 100, // Adjust based on your needs
    })

    if (subscribers.docs.length === 0) {
      return {
        success: false,
        recipientCount: 0,
        error: 'No active subscribers found',
      }
    }

    // Get Plunk client
    const plunk = getPlunkClient()

    // Render the React Email component to HTML
    const emailHTML = await render(
      NewsletterEmail({
        subject: newsletterData.subject,
        previewText: `New update from Emerald UI: ${newsletterData.subject}`,
      })
    )

    // Send emails in batches to avoid rate limits
    const batchSize = 50
    const batches = []
    for (let i = 0; i < subscribers.docs.length; i += batchSize) {
      batches.push(subscribers.docs.slice(i, i + batchSize))
    }

    let sentCount = 0

    for (const batch of batches) {
      const emailPromises = batch.map((subscriber) =>
        plunk.emails.send({
          to: subscriber.email,
          subject: newsletterData.subject,
          body: emailHTML,
        })
      )

      try {
        await Promise.all(emailPromises)
        sentCount += batch.length

        // Add delay between batches to respect rate limits
        if (batches.indexOf(batch) < batches.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      } catch (error) {
        console.error('Error sending batch:', error)
        // Continue with next batch even if one fails
      }
    }

    // Update newsletter status
    await payload.update({
      collection: 'newsletters',
      id: newsletterId,
      data: {
        status: 'sent',
        sentDate: new Date().toISOString(),
        recipientCount: sentCount,
      },
    })

    return {
      success: true,
      recipientCount: sentCount,
    }
  } catch (error) {
    console.error('Error sending newsletter:', error)
    return {
      success: false,
      recipientCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
