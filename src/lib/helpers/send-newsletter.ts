import config from '@payload-config'
import { getPayload } from 'payload'
import { createEmailTransporter, generateNewsletterHTML } from '../email.config'

interface SendNewsletterResult {
  success: boolean
  recipientCount: number
  error?: string
}

/**
 * Send newsletter to all active subscribers
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
      content: unknown
      previewText?: string
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

    // Create email transporter
    const transporter = createEmailTransporter()

    // Convert rich text content to HTML
    // Note: Payload's Lexical editor stores content as JSON
    // You may need to convert it to HTML based on your editor configuration
    const contentHTML =
      typeof newsletterData.content === 'string'
        ? newsletterData.content
        : JSON.stringify(newsletterData.content)

    // Generate email HTML
    const emailHTML = generateNewsletterHTML(
      newsletterData.subject,
      contentHTML,
      newsletterData.previewText || undefined
    )

    // Send emails in batches to avoid rate limits
    const batchSize = 50
    const batches = []
    for (let i = 0; i < subscribers.docs.length; i += batchSize) {
      batches.push(subscribers.docs.slice(i, i + batchSize))
    }

    let sentCount = 0
    const fromName = 'Node Ui Newsletter'

    for (const batch of batches) {
      const emailPromises = batch.map((subscriber) =>
        transporter.sendMail({
          from: `${fromName} <https://ui-application-lac.vercel.app/>`,
          to: subscriber.email,
          subject: newsletterData.subject,
          html: emailHTML,
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
