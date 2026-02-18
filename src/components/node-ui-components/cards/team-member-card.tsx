'use client'

/**
 * @author: @emerald-ui
 * @description: Editorial-style team member card with overlapping layers and motion
 * @version: 2.0.0
 * @date: 2026-02-19
 * @license: MIT
 * @website: https://emerald-ui.com
 *
 */

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface TeamMemberCardProps {
  position: "left" | 'right'
  jobPosition?: string
  firstName?: string
  lastName?: string
  imageUrl?: string
  description?: string
  className?: string
}

/**
 * Editorial-style team member card with overlapping portrait, large display
 * typography, circular CTA toggle, and staggered entrance animations.
 */
export default function TeamMemberCard({
  position = 'left',
  jobPosition = 'Backend Engineer',
  firstName = 'Jennie',
  lastName = 'Garcia',
  imageUrl = 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?fm=jpg&q=60',
  description = 'Jennie is a skilled developer with expertise in modern web technologies and a passion for creating seamless user experiences.',
  className,
}: TeamMemberCardProps) {
  const fullName = `${firstName} ${lastName}`
  const isPositionRight = position === 'right'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative my-16 flex flex-col justify-center', className)}
    >

      {/* jobPosition label — editorial uppercase tracking */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className={cn('mb-4 text-xs font-medium  uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500', isPositionRight && 'text-right')}>

          {jobPosition}
        </p>
      </motion.div>

      <div className='flex items-center justify-end'>
        {/* Portrait image with reveal animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn('relative h-125 w-90  shrink-0 overflow-hidden', isPositionRight && 'order-1')}>
          {/* Subtle grain overlay for texture */}
          <div className='pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/20 via-transparent to-transparent' />
          <img
            src={imageUrl}
            alt={fullName}
            className='h-full w-full object-cover hover:scale-105 duration-500 ease-[0.22,1,0.36,1]'
          />
        </motion.div>

        {/* Info block — overlaps image via negative margin */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn('relative -left-8  flex w-[calc(100%-350px)] flex-col gap-14 z-2', isPositionRight && 'items-end left-8')}
        >
          {/* Display name — large editorial type */}
          <div>
            <p className='text-5xl font-extralight leading-[1.1] tracking-tight text-zinc-900 dark:text-white'>
              {firstName}
              <br />
              <span className='font-normal'>{lastName}</span>
            </p>
          </div>

          {/* Details row — toggle + bio */}
          <div className={cn('flex gap-8', isPositionRight && 'justify-end')}>
            {/* Circular CTA with hover pulse */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn('group flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-300 transition-colors duration-300 hover:border-zinc-600 hover:bg-zinc-900 dark:border-white/20 dark:hover:border-white/60 dark:hover:bg-white/10', isPositionRight && 'order-1')}
            >
              <ArrowRight
                size={22}
                className={cn('text-zinc-600 transition-all duration-300 group-hover:-rotate-45 group-hover:text-white dark:text-zinc-400 dark:group-hover:text-white', isPositionRight && 'group-hover:rotate-225 rotate-180')}
              />
            </motion.div>

            {/* Bio copy — restrained body text */}
            <div className='w-[40%]'>
              <p className={cn('text-sm leading-[1.8] text-zinc-500 dark:text-zinc-400', isPositionRight && 'text-right')}>
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
