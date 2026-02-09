import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getPayload } from 'payload'
import config from '@payload-config'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    // 1. Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // 2. Handle the event
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Extract metadata
      const userId = session.metadata?.userId
      const plan = session.metadata?.plan as 'hobby' | 'pro'

      if (!userId || !plan) {
        console.error('Missing userId or plan in session metadata')
        return NextResponse.json(
          { error: 'Missing required metadata' },
          { status: 400 }
        )
      }

      // Get Payload instance
      const payload = await getPayload({ config })

      // 3. Update user's currentPlan in Clients collection
      const clients = await payload.find({
        collection: 'clients',
        where: {
          userId: {
            equals: userId,
          },
        },
      })

      if (clients.docs.length === 0) {
        console.error(`No client found for userId: ${userId}`)
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      const client = clients.docs[0]

      // Update client's plan
      await payload.update({
        collection: 'clients',
        id: client.id,
        data: {
          currentPlan: plan,
        },
      })

      // 4. Add purchased credits to CreditHistory
      const creditAmount = plan === 'hobby' ? 100 : 300

      await payload.create({
        collection: 'credit-history',
        data: {
          userId,
          creditAmount,
          source: 'purchased',
          status: 'active',
        },
      })

      console.log(
        `✓ Successfully updated plan to ${plan} and added ${creditAmount} credits for user ${userId}`
      )
    }

    // Return success response
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Webhook handler failed',
      },
      { status: 500 }
    )
  }
}
