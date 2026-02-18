import config from '@payload-config';
import { render } from '@react-email/render';
import { getPayload } from 'payload'
import { getNodemailerTransport } from '../email.config'
import { NewsletterEmail } from '../emails/NewsletterEmail'

interface SendNewsletterResult {
  success: boolean
  recipientCount: number
  error?: string
}

/**
 * Send newsletter to all active subscribers using React Email + Nodemailer (Plunk SMTP)
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
    // Type assertion to access newsletter-specific properties
    const newsletterData = newsletter as unknown as {
      status: string
      subject: string
      content?: string
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
      limit: 1000,
    })

    if (subscribers.docs.length === 0) {
      return {
        success: false,
        recipientCount: 0,
        error: 'No active subscribers found',
      }
    }

    // Get Nodemailer transport
    const transporter = getNodemailerTransport()

    // Render the React Email component to HTML
    const emailHTML = await render(
      NewsletterEmail({
        subject: newsletterData.subject,
        previewText: `New update from Emerald UI: ${newsletterData.subject}`,
        content: newsletterData.content,
      })
    )

    // Verify connection configuration
    await transporter.verify()

    let sentCount = 0

    // Send emails sequentially or in small batches to avoid overwhelming SMTP
    for (const subscriber of subscribers.docs) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || '"Emerald UI" <hello@emeraldui.com>',
          to: subscriber.email,
          subject: newsletterData.subject,
          html: emailHTML,
        })
        sentCount++
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error)
        // Continue with next subscriber
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
