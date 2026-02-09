import { NextResponse } from 'next/server'
import { stripe, STRIPE_PRICE_IDS, type PlanType, type BillingPeriod } from '@/lib/stripe'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  try {
    // 1. Validate user authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to continue.' },
        { status: 401 }
      )
    }

    // 2. Parse request body
    const body = await req.json()
    const { plan, billingPeriod } = body as {
      plan: PlanType
      billingPeriod: BillingPeriod
    }

    // 3. Validate plan and billing period
    if (!plan || !billingPeriod) {
      return NextResponse.json(
        { error: 'Plan and billing period are required' },
        { status: 400 }
      )
    }

    if (!['hobby', 'pro'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be "hobby" or "pro"' },
        { status: 400 }
      )
    }

    if (!['monthly', 'yearly'].includes(billingPeriod)) {
      return NextResponse.json(
        { error: 'Invalid billing period. Must be "monthly" or "yearly"' },
        { status: 400 }
      )
    }

    // 4. Get appropriate Stripe Price ID
    const priceId = STRIPE_PRICE_IDS[plan][billingPeriod]

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID not configured for this plan' },
        { status: 500 }
      )
    }

    // 5. Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        plan,
        billingPeriod,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          plan,
        },
      },
    })

    // 6. Return session URL
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create checkout session',
      },
      { status: 500 }
    )
  }
}
