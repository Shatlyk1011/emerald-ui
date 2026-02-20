'use client'

import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { Film, Send } from 'lucide-react'
import { motion, MotionConfig } from 'motion/react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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
          status: 'active',
          source: 'website',
        }),
      })

      if (response.ok) {
        toast.success('Successfully subscribed to our newsletter!', {
          position: 'top-center',
        })
        setEmail('')
      }
    } catch (_: unknown) {
      toast.error('Failed to subscribe. Please try again later.', {
        position: 'top-center',
      })
    } finally {
      setLoading(false)
      setOpen(false)
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
                <motion.label
                  htmlFor='sub'
                  initial={{ bottom: 10, opacity: 0 }}
                  animate={{ bottom: -30, opacity: 100 }}
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                  className='-tracking-one text-muted-foreground absolute z-1 flex items-center gap-1 text-[13px] font-medium text-nowrap'
                >
                  Get hand-picked updates - you won&apos;t regret
                  <button type='button' className='group'>
                    <Film className='size-4' />

                    <img
                      loading='lazy'
                      fetchPriority='low'
                      className='invisible absolute top-10 left-0 w-40 rounded-lg opacity-0 transition select-none group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100'
                      src='/cat.gif'
                    ></img>
                  </button>
                </motion.label>
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

// helper functions

const useClickOutside = (
  ref: RefObject<HTMLDivElement | null>,
  onClickOutside: () => void
) => {
  console.log('here')
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

interface Props {
  children: ReactNode
  onClickOutside: () => void
  classes?: string
}

const OnClickOutside: FC<Props> = ({ children, onClickOutside, classes }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(wrapperRef, onClickOutside)

  return (
    <div ref={wrapperRef} className={cn(classes)}>
      {children}
    </div>
  )
}
