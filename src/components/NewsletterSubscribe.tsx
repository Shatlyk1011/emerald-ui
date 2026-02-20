'use client';

import { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Film, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function SubscribeInput() {
  const [isOpen, setOpen] = useState(false);

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
        toast.success('Successfully subscribed to our newsletter!', { position: 'top-center' })
        setEmail('')
      }

    } catch (_: unknown) {
      toast.error('Failed to subscribe. Please try again later.', { position: 'top-center' })
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <MotionConfig transition={{
      type: 'spring',
      bounce: 0.1,
      duration: 0.4,
    }}>
      <motion.div
        animate={{ width: isOpen ? '320px' : '120px' }}
        className={cn("h-12 ", isOpen ? 'w-75' : 'w-30')}
        initial={false}
      >
        <div className={cn(' h-full w-full rounded-lg border ', isOpen ? 'border-border bg-card p-1' : 'border-transparent')}>
          {!isOpen ? (
            <Button onClick={() => setOpen(true)} className='w-full h-full rounded-lg'>
              + Subscribe
            </Button>
          ) : (
            <form className='flex  gap-2 h-full' onSubmit={handleSubmit}>
              <div className='flex relative w-full '>
                <input
                    id="sub"
                    className='bg-card w-full h-full rounded-md p-2 z-10 focus:outline-hidden text-foreground text-sm -tracking-one'
                    autoComplete='off'
                    placeholder='Email'
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                  <motion.label htmlFor="sub" initial={{ bottom: 10, opacity: 0 }} animate={{ bottom: -30, opacity: 100 }} transition={{ type: 'spring', bounce: 0.3, duration: 0.6, }} className='absolute z-1 flex items-center gap-1 text-[13px] text-nowrap font-medium -tracking-one text-muted-foreground'>
                    Get hand-picked updates - you won&apos;t regret
                    <button type="button" className='group'>
                      <Film className='size-4 ' />

                      <img loading='lazy' fetchPriority='low' className='absolute rounded-lg opacity-0 invisible select-none group-hover:opacity-100 group-focus:opacity-100 group-focus:visible group-hover:visible transition top-10 left-0 w-40' src="/cat.gif"></img>
                    </button>
                  </motion.label>
                </div>
                <Button type="submit" className='px-6 h-full w-11 rounded-md' disabled={isLoading} aria-label='Back'>
                  <Send className='size-4' />
                </Button>
              </form>
          )}
        </div>
      </motion.div>
    </MotionConfig>

  );
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