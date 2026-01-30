'use client'

/**
 * @author: @nodeui
 * @description: Holographic Pricing Table with RGB chromatic aberration
 * @version: 1.0.0
 * @date: 2026-01-30
 * @license: MIT
 * @website: https://nodeui.com
 */

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Check, Zap } from 'lucide-react'
import { FC } from 'react'

// ============================================================================
// Types
// ============================================================================

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

export interface HolographicPricingTableProps {
  /** Array of pricing tiers */
  tiers?: PricingTier[]
  /** Additional CSS classes */
  className?: string
  /** Callback when a tier is selected */
  onSelectTier?: (tierId: string) => void
}

// ============================================================================
// Default Data
// ============================================================================

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

// ============================================================================
// Pricing Tier Card Component
// ============================================================================

interface PricingTierCardProps {
  tier: PricingTier
}

const PricingTierCard: FC<PricingTierCardProps> = ({ tier }) => {

  return (
    <motion.div
      className="relative group h-full opacity-0 max-w-sm"
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
          'relative h-full rounded-2xl border overflow-hidden',
          'bg-white/80 dark:bg-gray-950/50 backdrop-blur-sm',
          tier.popular
            ? 'border-cyan-500/50'
            : 'border-gray-200 dark:border-gray-800',
          'transition-all duration-300'
        )}
      >
        {/* diagonal waves */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(6, 182, 212, 0.1) 10px, rgba(6, 182, 212, 0.1) 20px)',
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
        <div className="relative z-20 p-8 flex flex-col h-full">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{tier.description}</p>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-1">
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
              <span className="text-gray-500 dark:text-gray-500 text-lg">{tier.period}</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8 space-y-3">
            {tier.features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={cn(
                  'mt-0.5 rounded-full p-0.5',
                  tier.popular ? 'bg-cyan-500/20' : 'bg-gray-100 dark:bg-gray-800'
                )}>
                  <Check className={cn(
                    'w-4 h-4',
                    tier.popular ? 'text-cyan-400' : 'text-gray-600 dark:text-gray-400'
                  )} />
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm flex-1">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className={cn(
              'w-full py-3 px-6 mt-auto rounded-xl font-semibold transition-all relative overflow-hidden',
              tier.popular
                ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700',
              'group/button'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button glow effect */}
            {tier.popular && (
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-400 opacity-0 group-hover/button:opacity-30 blur-xl transition-opacity"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {tier.cta}
              {tier.popular && <Zap className="w-4 h-4" />}
            </span>
          </motion.button>
        </div>
  </div>
    </motion.div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export default function HolographicPricingTable({
  tiers = defaultTiers,
  className,
}: HolographicPricingTableProps) {

  return (
    <div className={cn('w-full py-12 px-4', className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Plan
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Select the perfect plan for your needs. Upgrade or downgrade anytime.
        </motion.p>
      </div>

      {/* Pricing Tiers Grid */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='h-full '
          >
            <PricingTierCard tier={tier}/>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
