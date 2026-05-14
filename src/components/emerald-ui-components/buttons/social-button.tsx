'use client'

/**
 * @author: @shatlyk1011
 * @description: Social Button Component
 * @version: 1.0.0
 * @date: 2026-01-27
 * @license: MIT
 * @website: https://emerald-ui.com
 */
import { useState, FC, ReactNode, useRef } from 'react'
import { Check, Copy, Instagram, Linkedin, Share2, Twitter } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useClickOutside } from '@/hooks/use-click-outside'

const shareButtons = [
  {
    icon: Twitter,
    label: 'Twitter',
    color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    color: 'hover:text-[#E1306C] hover:bg-[#E1306C]/10',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10',
  },
]

export default function SocialButton({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <OnClickOutside onClickOutside={() => setIsExpanded(false)}>
      <div className={cn('flex items-center justify-center', className)}>
        <motion.div
          animate={{
            width: isExpanded ? 'auto' : '120px',
            height: '48px',
          }}
          className={cn(
            'relative flex items-center overflow-hidden',
            'bg-white dark:bg-zinc-900',
            'border border-zinc-200 dark:border-zinc-800',
            'shadow-sm hover:shadow-md',
            'cursor-pointer rounded-full'
          )}
          initial={false}
          onClick={() => !isExpanded && setIsExpanded(true)}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
        >
          <AnimatePresence mode='sync'>
            {!isExpanded ? (
              <motion.div
                className='absolute inset-0 flex items-center justify-center gap-2'
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key='share-text'
                transition={{ duration: 0.2 }}
              >
                <Share2 className='h-4 w-4' />
                <span className='text-sm font-medium'>Share</span>
              </motion.div>
            ) : (
              <motion.div
                className='flex items-center px-1'
                exit={{ opacity: 0, scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key='actions'
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {shareButtons.map((btn) => (
                  <button
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                      'text-zinc-600 dark:text-zinc-400',
                      btn.color
                    )}
                    key={btn.label}
                    type='button'
                    title={btn.label}
                  >
                    <btn.icon className='h-5 w-5' />
                  </button>
                ))}

                <div className='mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800' />

                <button
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                    'text-zinc-600 dark:text-zinc-400',
                    'hover:bg-zinc-100 dark:hover:bg-zinc-800',
                    copied &&
                      'bg-green-50 text-green-500 dark:bg-green-900/20 dark:text-green-500'
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCopy()
                  }}
                  type='button'
                  title='Copy Link'
                >
                  {copied ? (
                    <Check className='h-5 w-5' />
                  ) : (
                    <Copy className='h-5 w-5' />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </OnClickOutside>
  )
}

interface Props {
  children: ReactNode
  onClickOutside: () => void
  classes?: string
}

const OnClickOutside: FC<Props> = ({ children, onClickOutside, classes }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useClickOutside(wrapperRef, onClickOutside)

  return (
    <div ref={wrapperRef} className={cn(classes)}>
      {children}
    </div>
  )
}
