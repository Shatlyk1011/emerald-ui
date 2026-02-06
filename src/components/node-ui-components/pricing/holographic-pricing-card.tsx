'use client'

/**
 * @author: @nodeui
 * @description: Holographic Pricing Card with RGB chromatic aberration
 * @version: 1.0.0
 * @date: 2026-01-30
 * @license: MIT
 * @website: https://nodeui.com
 */
import { FC } from 'react'
import { Check, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// Types

export interface PricingTier {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  cta: string
}

export interface HolographicPricingCardProps {
  tiers?: PricingTier[]
  className?: string
  onSelectTier?: (tierId: string) => void
}

// Default Data

const defaultTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for individuals and small projects',
    features: [
      '10 Projects',
      '5GB Storage',
      'Basic Analytics',
      'Email Support',
      'API Access',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'Ideal for growing teams and businesses',
    features: [
      'Unlimited Projects',
      '50GB Storage',
      'Advanced Analytics',
      'Priority Support',
      'API Access',
      'Custom Integrations',
      'Team Collaboration',
    ],
    popular: true,
    cta: 'Start Free Trial',
  },
]

// Pricing Tier Card Component

interface PricingTierCardProps {
  tier: PricingTier
}

const PricingTierCard: FC<PricingTierCardProps> = ({ tier }) => {
  return (
    <motion.div
      className='group relative h-full max-w-sm opacity-0'
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      }}
    >
      {/* Main Card */}
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-2xl border',
          'bg-white/80 backdrop-blur-sm dark:bg-gray-950/50',
          tier.popular
            ? 'border-cyan-500/50'
            : 'border-gray-200 dark:border-gray-800',
          'transition-all duration-300'
        )}
      >
        {/* diagonal waves */}
        <motion.div
          className='pointer-events-none absolute inset-0 z-10 opacity-30'
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(6, 182, 212, 0.1) 10px, rgba(6, 182, 212, 0.1) 20px)',
          }}
          animate={{
            x: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            x: {
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            },
            opacity: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />

        {/* Content */}
        <div className='relative z-20 flex h-full flex-col p-8'>
          {/* Header */}
          <div className='mb-6'>
            <h3 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white'>
              {tier.name}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              {tier.description}
            </p>
          </div>

          {/* Price */}
          <div className='mb-8'>
            <div className='flex items-baseline gap-1'>
              <motion.span
                className={cn(
                  'text-5xl font-bold',
                  tier.popular
                    ? 'bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'
                    : 'text-gray-900 dark:text-white'
                )}
              >
                {tier.price}
              </motion.span>
              <span className='text-lg text-gray-500 dark:text-gray-500'>
                {tier.period}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className='mb-8 space-y-3'>
            {tier.features.map((feature, index) => (
              <motion.div
                key={index}
                className='flex items-start gap-3'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    'mt-0.5 rounded-full p-0.5',
                    tier.popular
                      ? 'bg-cyan-500/20'
                      : 'bg-gray-100 dark:bg-gray-800'
                  )}
                >
                  <Check
                    className={cn(
                      'h-4 w-4',
                      tier.popular
                        ? 'text-cyan-400'
                        : 'text-gray-600 dark:text-gray-400'
                    )}
                  />
                </div>
                <span className='flex-1 text-sm text-gray-700 dark:text-gray-300'>
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className={cn(
              'relative mt-auto w-full overflow-hidden rounded-xl px-6 py-3 font-semibold transition-all',
              tier.popular
                ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
              'group/button'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button glow effect */}
            {tier.popular && (
              <motion.div
                className='absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-400 opacity-0 blur-xl transition-opacity group-hover/button:opacity-30'
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
            <span className='relative z-10 flex items-center justify-center gap-2'>
              {tier.cta}
              {tier.popular && <Zap className='h-4 w-4' />}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Main Component

export default function HolographicPricingCard({
  tiers = defaultTiers,
  className,
}: HolographicPricingCardProps) {
  return (
    <div className={cn('w-full px-4 py-12', className)}>
      {/* Header */}
      <div className='mb-12 text-center'>
        <motion.h2
          className='mb-4 bg-linear-to-r from-cyan-400 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Plan
        </motion.h2>
        <motion.p
          className='mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Select the perfect plan for your needs. Upgrade or downgrade anytime.
        </motion.p>
      </div>

      {/* Pricing Tiers Grid */}
      <div className='mx-auto grid max-w-7xl gap-8 md:grid-cols-1 lg:grid-cols-2'>
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='h-full'
          >
            <PricingTierCard tier={tier} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
