import Stripe from 'stripe'

// read https://vercel.com/kb/guide/getting-started-with-nextjs-typescript-stripe for optimization
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-01-28.clover',
  typescript: true,
})

export const STRIPE_PRICE_IDS = {
  hobby: {
    monthly: process.env.STRIPE_HOBBY_MONTHLY_PRICE_ID || '',
    yearly: process.env.STRIPE_HOBBY_YEARLY_PRICE_ID || '',
  },
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || '',
    yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID || '',
  },
} as const

export type PlanType = 'hobby' | 'pro'
export type BillingPeriod = 'monthly' | 'yearly'
