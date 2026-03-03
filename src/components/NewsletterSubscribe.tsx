'use client'

import { useState } from 'react'
import { Film, Send } from 'lucide-react'
import { motion, MotionConfig } from 'motion/react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const ErrorMsg = 'Failed to subscribe. Please try again later.'

export default function SubscribeInput() {
  const [isOpen, setOpen] = useState(false)

  const [email, setEmail] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })
      if (response.ok) {
        toast.success('Successfully subscribed to newsletter!', {
          position: 'top-center',
        })
        setEmail('')
        setOpen(false)
      } else {
        const error = await response
          .json()
          .then((data) => data.errors[0].message)
        throw new Error(error)
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : ErrorMsg, {
        position: 'top-center',
        duration: 5000,
        richColors: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <MotionConfig
      transition={{
        type: 'spring',
        bounce: 0.1,
        duration: 0.4,
      }}
    >
      <motion.div
        animate={{ width: isOpen ? '320px' : '120px' }}
        className={cn('h-12', isOpen ? 'w-75' : 'w-30')}
        initial={false}
      >
        <div
          className={cn(
            'h-full w-full rounded-lg border',
            isOpen ? 'border-border bg-card p-1' : 'border-transparent'
          )}
        >
          {!isOpen ? (
            <Button
              onClick={() => setOpen(true)}
              className='h-full w-full rounded-lg'
            >
              + Subscribe
            </Button>
          ) : (
            <form className='flex h-full gap-2' onSubmit={handleSubmit}>
              <div className='relative flex w-full'>
                <motion.label
                  htmlFor='sub'
                  initial={{ bottom: 10, opacity: 0 }}
                  animate={{ bottom: -30, opacity: 100 }}
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  className='-tracking-one text-muted-foreground absolute z-1 flex items-center gap-1 text-[13px] font-medium text-nowrap'
                >
                  Subscribe to get hand-picked updates
                  <button type='button' className='group'>
                    <Film className='size-4' />

                    <img
                      loading='lazy'
                      fetchPriority='low'
                      className='invisible absolute top-8 left-0 w-40 rounded-lg opacity-0 transition delay-150 select-none group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100'
                      src='/cat.gif'
                    ></img>
                  </button>
                </motion.label>
                <input
                  id='sub'
                  className='bg-card text-foreground -tracking-one z-10 h-full w-full rounded-md p-2 text-sm focus:outline-hidden'
                  autoComplete='off'
                  placeholder='Email'
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <Button
                type='submit'
                className='h-full w-11 rounded-md px-6'
                disabled={isLoading}
                aria-label='Back'
              >
                <Send className='size-4' />
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </MotionConfig>
  )
}